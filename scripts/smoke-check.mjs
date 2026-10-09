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
    "/lab", "/about", "/research", "/methods", "/archive", "/outputs", "/registry",
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
    if (route === "/outputs") {
      assert(html.includes("CURRENT PUBLIC OUTPUTS"), "Public outputs page should contain verified records");
      assert(html.includes("EVIDENCE BEFORE PUBLICATION"), "Output evidence rules were removed");
    }
    if (route === "/projects/idea-map") {
      assert(html.includes("RESEARCH &amp; EVIDENCE") || html.includes("RESEARCH & EVIDENCE"), "Project evidence panel missing");
      assert(html.includes("learning-demo.tsx"), "Project should link to real implementation source");
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
