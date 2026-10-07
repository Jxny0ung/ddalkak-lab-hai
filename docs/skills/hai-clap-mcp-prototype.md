# Skill — HAI Clap + MCP Prototype

## Name

`hai-clap-mcp-prototype`

## Purpose

Build and extend DDALKAK LAB interaction prototypes that turn explicit human signals into auditable AI actions.

## Trigger

Use this workflow when asked to:

- add a new human input gesture
- improve clap-to-activate
- add a DDALKAK CORE interaction
- prototype an agent role or AI company department
- connect the prototype to MCP
- add a new MCP tool to the future agent architecture

## Required inputs

- user signal or UI action
- intended system response
- permission level
- tool or data source, if any
- failure / override behavior
- privacy boundary

## Workflow

```text
Human signal
→ Explicit consent
→ Local detection / input parsing
→ Visible feedback
→ Intent object
→ Agent plan
→ Permission check
→ MCP tool selection
→ Approval gate when needed
→ Tool execution
→ Post-action verification
→ Audit log
→ User-visible result
```

## Current implementation rule

The current clap prototype:

- must request microphone permission explicitly
- must not record or upload raw audio
- must provide a manual fallback
- must allow stopping the microphone
- must expose sensitivity rather than pretending detection is perfect
- should calibrate against the local noise floor before accepting clap events
- should throttle purely visual meter updates instead of re-rendering at audio-frame frequency
- must provide reduced-motion behavior for the rotating reactor visual
- must label MCP company behavior as future / prototype until actually connected

## Future MCP rule

Before enabling a new MCP tool:

1. define whether the action is read, draft, write, delete, send, publish, deploy, or purchase
2. define the smallest scope required
3. decide whether human approval is required
4. define a post-action verification call
5. define the audit record
6. test through MCP Inspector or an equivalent controlled harness
7. never put tokens or credentials in the public repository

## Validation

- ESLint passes
- production build passes
- microphone can start and stop
- manual fallback works
- double-clap activation updates the UI
- all non-audio routes still render
- future MCP functions are not falsely represented as live
- public docs describe privacy and permissions
