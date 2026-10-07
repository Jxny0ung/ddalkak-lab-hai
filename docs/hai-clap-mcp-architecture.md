# DDALKAK LAB — Clap HAI → MCP Company Architecture

## Status

**Current:** interaction prototype  
**Not yet connected:** autonomous agents, MCP tool calls, external account actions

This document separates what exists today from the future company architecture.

## 1. Current interaction

```text
User
  ↓ explicit microphone permission
Browser microphone
  ↓
Web Audio API / AnalyserNode
  ↓
local transient detector
  ├─ RMS
  ├─ peak amplitude
  ├─ crest factor
  └─ high-frequency energy ratio
  ↓
double-clap window
180–900 ms
  ↓
DDALKAK CORE UI activation
```

No audio recording, upload, speech recognition, or server-side audio processing is required for the current prototype.

## 2. Why this is HAI

The clap gesture is treated as an interaction design problem rather than a novelty effect.

Design requirements:

- **Discoverability:** the gesture must be explained.
- **Consent:** microphone access starts only after an explicit user action.
- **Feedback:** first clap, second clap, listening, and active state are visible.
- **Override:** a manual activation path remains available.
- **Calibration:** sensitivity can be adjusted and false positives are acknowledged.
- **Privacy:** raw microphone audio remains local.
- **Recoverability:** the user can stop listening and reset the interaction.

## 3. Future MCP company

```text
Human intent
    ↓
DDALKAK CORE
interpret / clarify
    ↓
Agent Router
plan / choose role
    ↓
Approval Gate
scope / user confirmation
    ↓
MCP Client
    ↓
MCP Gateway
auth / routing / audit
    ↓
┌──────────┬─────────┬─────────┬──────────┬──────────┐
│ GitHub   │ Drive   │ Browser │ Calendar │ Vercel   │
└──────────┴─────────┴─────────┴──────────┴──────────┘
    ↓
tool result + evidence
    ↓
Verifier
    ↓
Human-visible result + audit log
```

## 4. Company roles

The animated company scene is a visual model, not a claim that these autonomous workers exist today.

- **Scout / Research:** gather permitted context and source candidates.
- **Analyst / Evidence:** structure evidence, compare outputs, flag uncertainty.
- **Builder / Prototype:** create code, documents, analyses, or artifacts.
- **Operator / Release:** validate, deploy, monitor, and record status.
- **MCP Gateway:** controls tool access and produces a tool-call audit trail.

## 5. Permission model for future implementation

A future MCP-backed version should not let an agent perform every action merely because a connector exists.

Recommended levels:

1. **Read** — search or inspect
2. **Draft** — prepare a proposed action
3. **Approve** — user confirms a material action
4. **Execute** — tool call runs within the approved scope
5. **Verify** — retrieve post-action state
6. **Log** — store action, inputs, outputs, time, tool, and approval state

High-impact actions should remain approval-gated.

## 6. Open-source references

### Browser audio

- Web Audio API specification  
  https://github.com/WebAudio/web-audio-api
- Meyda — real-time JavaScript audio feature extraction  
  https://github.com/meyda/meyda

The current prototype intentionally avoids a new audio dependency. Meyda is a useful upgrade path if research requires additional spectral features.

### MCP

- Official TypeScript SDK  
  https://github.com/modelcontextprotocol/typescript-sdk
- MCP reference servers  
  https://github.com/modelcontextprotocol/servers
- MCP Inspector  
  https://github.com/modelcontextprotocol/inspector

The official TypeScript SDK currently separates client and server packages and supports tools, resources, prompts, transports, and auth helpers. Reference servers are educational examples, not automatically production-ready; the threat model and permissions must be designed for the actual product.

### AI application layer

- Vercel AI SDK  
  https://github.com/vercel/ai

This is a possible later layer for model streaming and tool-facing UI. It is not required by the current clap prototype.

## 7. Next implementation stages

```text
v0.1  local double-clap detector              ← current
v0.2  interaction event log + usability test
v0.3  CORE command palette
v0.4  agent-router prototype with fake tools
v0.5  first read-only MCP server
v0.6  MCP Inspector tests
v0.7  explicit approval gates
v0.8  real connector sandbox
v0.9  verifier + audit ledger
v1.0  limited production workflow
```

Do not skip from a visual company simulation directly to unsupervised write-capable tools.
