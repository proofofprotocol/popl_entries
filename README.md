# POPL Entries

**[日本語版はこちら](README.ja.md)**

Public ledger of POPL (Proof of Protocol Ledger) entries.

## Purpose

This repository serves as an open, auditable record of AI protocol validation sessions. Each entry documents observed behavior of AI tools (primarily MCP servers) with cryptographic verification.

## Principles

1. **One Session = One Entry**: Each validation session has its own directory
2. **Evidence First**: Raw protocol logs before interpretations
3. **Always Commit**: If it happened, it's in Git
4. **Failures Are Evidence**: Error observations are valid entries

## Directory Structure

```
validation/
└── session-YYYY-MM-DD-<target>/
    ├── POPL.yml       # Entry metadata (required)
    ├── events.json    # Protocol event log (required)
    ├── tree.json      # Session structure (optional)
    └── RUNLOG.md      # Human-readable notes (optional)
```

## How to Submit an Entry

### Prerequisites

- [proofscan](https://github.com/proofofprotocol/proofscan) installed
- Target MCP server package name

### Minimal Workflow

```bash
# 1. Clone this repository
git clone https://github.com/proofofprotocol/popl_entries.git
cd popl_entries

# 2. Run validation with proofscan
pfscan connectors add <target> --from-mcp-json '{"command":"npx","args":["-y","@example/mcp-server"]}'
pfscan scan start <target>
pfscan shell
# > tool ls
# > send <tool-name> {"param":"value"}

# 3. Export artifacts
mkdir -p validation/session-$(date +%Y-%m-%d)-<target>
pfscan events export --format json > validation/session-.../events.json

# 4. Create POPL.yml (see template below)

# 5. Calculate hashes
sha256sum events.json

# 6. Commit and push
git add validation/session-.../
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
