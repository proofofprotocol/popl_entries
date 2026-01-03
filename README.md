# POPL Entries

**[日本語版はこちら](README.ja.md)**

Public ledger of POPL (Proof of Protocol Ledger) entries.

## Purpose

This repository serves as an open, auditable record of AI protocol validation sessions.
Each entry documents **observed behavior** of AI tools (primarily MCP servers and related tooling)
with cryptographic verification.

## Principles

1. **One Session = One Entry**  
   Each validation session has its own directory.

2. **Evidence First**  
   Raw protocol logs come before interpretation.

3. **Always Commit**  
   If it happened, it belongs in Git.

4. **Failures Are Evidence**  
   Errors and unsuccessful executions are valid observations.

5. **Publish Validation Matters**  
   Validation of *published artifacts* (e.g. npm / npx execution) is treated as first-class evidence.

## Directory Structure

```text
validation/
├── session-YYYY-MM-DD-<target>/        # Validation of a specific MCP session
│   ├── POPL.yml                        # Entry metadata (required)
│   ├── events.json                     # Protocol event log (required)
│   ├── tree.json                       # Session/RPC structure (recommended)
│   ├── RUNLOG.md                       # Human-readable validation summary (recommended)
│   ├── validation-run.log              # Command execution log (recommended)
│   └── rpc-detail.txt                  # Full request/response for key RPCs (recommended)
│
└── proofscan-vX.Y.Z-<scope>/           # Validation of published tools (recommended)
    ├── POPL.yml
    ├── RUNLOG.md
    ├── validation-run.log
    └── rpc-detail.txt
```

## Recommended Artifacts

For both MCP server validation and published tool validation, the following artifacts
are strongly recommended:

- **validation-run.log** — Chronological record of executed commands and actions
- **rpc-detail.txt** — Full request/response capture for critical RPCs (e.g. tools/call)
- **tree.json** — Structural view of sessions and RPC relationships
- **RUNLOG.md** — Human-readable explanation of what was validated and why

These artifacts significantly improve auditability, reproducibility, and long-term value.

## How to Submit an Entry

### Prerequisites

- [proofscan](https://github.com/proofofprotocol/proofscan) installed
- Target MCP server or tool package name

### Minimal Workflow

```bash
# 1. Clone repository
git clone https://github.com/proofofprotocol/popl_entries.git
cd popl_entries

# 2. Run validation with proofscan
pfscan connectors add <target> --from-mcp-json '{"command":"npx","args":["-y","@example/mcp-server"]}'
pfscan scan start <target>

# 3. Perform tool operations if applicable
pfscan tool ls <target>
pfscan tool show <target> <tool>
pfscan tool call <target> <tool> --args '{...}'

# 4. Create validation directory
mkdir -p validation/session-YYYY-MM-DD-<target>

# 5. Export or collect artifacts
# events.json, tree.json, validation-run.log, rpc-detail.txt, RUNLOG.md

# 6. Create POPL.yml with SHA256 hashes

# 7. Commit and push
git add validation/session-YYYY-MM-DD-<target>
git commit -m "validation: add session <target> (YYYY-MM-DD)"
git push origin main
```

### POPL.yml Template

```yaml
popl:
  spec: popl-entry-v0.0

entry:
  id: session-YYYY-MM-DD-<target>
  title: "Validation: <Target Name>"
  observed_at: "YYYY-MM-DDTHH:MM:SSZ"

target:
  type: mcp-server
  name: "<package-name>"
  version: "<version>"

trust:
  level: 0
  label: "Recorded"

artifacts:
  - path: events.json
    hash: "sha256:<hash>"
```

## Trust Levels

| Level | Label | Requirements |
|-------|-------|--------------|
| 0 | Recorded | Git commit only |
| 1 | Notarized | + IPFS + Hedera HCS timestamp |
| 2 | Attributed | + Verified identity |
| 3 | Third-party | + Independent verification |

## Related

- [POPL Spec](https://github.com/proofofprotocol/popl) - Entry format specification
- [proofscan](https://github.com/proofofprotocol/proofscan) - Validation tooling

## License

[MIT](LICENSE)
