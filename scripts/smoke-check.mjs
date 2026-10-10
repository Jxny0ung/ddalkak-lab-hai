// Post-build black-box smoke test. Uses Node only; no browser automation or API key.
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

async function reservePort() {
  const listener = createServer();
  await new Promise((resolve, reject) => {
    listener.once("error", reject);
    listener.listen(0, "127.0.0.1", resolve);
  });
  const address = listener.address();
  const port = typeof address === "object" && address ? address.port : 0;
  await new Promise((resolve) => listener.close(resolve));
  if (!port) throw new Error("Could not allocate a local port");
  return port;
}

const port = await reservePort();
const origin = `http://127.0.0.1:${port}`;
const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], {
  env: { ...process.env, NODE_ENV: "production" },
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
for (const stream of [app.stdout, app.stderr]) {
  stream.on("data", (chunk) => {
    logs = (logs + chunk.toString()).slice(-5000);
  });
}

async function request(path) {
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(7000), redirect: "manual" });
  const html = await response.text();
  return { response, html };
}

function assert(value, message) {
  if (!value) throw new Error(message);
}

let succeeded = false;
try {
  // Wait for the real Next server, not just a compiled bundle.
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (app.exitCode !== null) throw new Error("Next server exited while starting");
    try {
      const { response } = await request("/");
      if (response.status === 200) {
        ready = true;
        break;
      }
    } catch {}
    await delay(400);
  }
  assert(ready, "Next server did not start within 32 seconds");

  const routes = [
    "/", "/projects", "/projects/idea-map", "/projects/prompt-builder",
    "/projects/business-dashboard", "/projects/clap-interface", "/learn",
    "/lab", "/about", "/people", "/research", "/methods", "/archive", "/registry", "/outputs",
    "/handbook", "/system", "/projects?category=Data",
    "/sitemap.xml", "/robots.txt",
  ];
  for (const route of routes) {
    const { response, html } = await request(route);
    assert(response.status === 200, `${route}: expected 200, got ${response.status}`);
    assert(html.length > 40, `${route}: empty response`);
    if (route === "/projects?category=Data") {
      assert(html.includes("공개된 프로젝트가 아직 없습니다"), "Empty Data category lacks an explanation");
    }
    if (route === "/") {
      assert(html.includes("RESEARCH BEHIND THE BUILD"), "Homepage research bridge missing");
      assert(html.includes("DDALKAK"), "Homepage signature CORE missing");
    }
    if (route === "/") {
      assert(html.includes("04 / OUTPUTS"), "Homepage verified outputs link missing");
      assert(html.includes("접근 방법"), "Project cards do not disclose their method");
    }
    if (route === "/outputs") {
      assert(html.includes("공개 웹사이트 소스코드"), "Outputs: source verification missing");
      assert(html.includes("공개 확인 자료 없음"), "Outputs: empty achievements not labeled");
    }
    if (route === "/projects/idea-map") {
      assert(html.includes("RESEARCH QUESTION"), "Project detail missing research question");
      assert(html.includes("접근 방법"), "Project detail missing method");
      assert(html.includes("src/components/learning-demo.tsx"), "Project detail must link directly to its real source");
      assert(html.includes("사용자 대상 효과 검증 전"), "Project detail missing validation disclosure");
    }
    if (route === "/research") {
      assert(html.includes("AI as a research tool"), "AI-as-tool / HAI distinction missing");
    }
    if (route === "/people") {
      for (const name of ["김예빈", "엄태연", "김민아"]) {
        assert(html.includes(name), `Missing researcher profile: ${name}`);
      }
      assert(html.includes("사용자 경험"), "People page missing field descriptions");
      assert(html.includes("/researchers/kim-ye-bin.avif"), "Researcher portraits not linked");
      assert(html.includes("개인 소개"), "People page lacks provenance disclosure");
    }
    if (route === "/lab") {
      assert(html.includes("Clap-to-Activate"), "Lab clap prototype was removed");
      const policy = response.headers.get("permissions-policy") ?? "";
      assert(policy.includes("microphone=(self)"), `Lab microphone policy incorrect: ${policy}`);
      assert(!policy.includes("microphone=()"), `Lab microphone policy is contradictory: ${policy}`);
    }
    if (route === "/") {
      const policy = response.headers.get("permissions-policy") ?? "";
      assert(policy.includes("microphone=()"), `Homepage microphone should be denied: ${policy}`);
    }
    console.log(`PASS ${response.status} ${route}`);
  }
  const { response: notFound } = await request("/projects/unknown-sample-route");
  assert(notFound.status === 404, `Unknown project should 404, got ${notFound.status}`);
  console.log("PASS 404 /projects/unknown-sample-route");
  console.log("Smoke checks completed: key routes, empty state and microphone policy.");
  succeeded = true;
} finally {
  app.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => app.once("exit", resolve)),
    delay(1800),
  ]);
  if (!succeeded) console.error("Next app log tail:\n" + logs);
}
