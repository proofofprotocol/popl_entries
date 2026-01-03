# Contributing to POPL Entries

Thank you for contributing to the POPL public ledger.

This repository values **observed facts** over opinions or simulations.

## How to Contribute

### Adding a Validation Entry

1. **Fork** this repository
2. **Run** a validation session using [proofscan](https://github.com/proofofprotocol/proofscan)
3. **Create** a validation directory:
   `validation/session-YYYY-MM-DD-<target>/`
4. **Include** required artifacts:
   - `POPL.yml`
   - `events.json`
5. **Calculate** SHA-256 hashes for all referenced artifacts
6. **Submit** a Pull Request

### Entry Requirements

- One PR = One validation entry
- All artifacts must have correct hashes in `POPL.yml`
- Follow the [POPL Entry Spec v0.0](https://github.com/proofofprotocol/popl)

## Recommended Artifacts

For complete and auditable validation entries, contributors SHOULD include:

- `validation-run.log` — execution trace and command log
- `rpc-detail.txt` — full request/response for critical RPCs
- `tree.json` — session and RPC structure
- `RUNLOG.md` — human-readable validation summary

### Tool Execution Rule

If a validation includes **tool execution** (`tools/call`),
a corresponding `rpc-detail.txt` is **strongly recommended**.

## Validation Methods

Validation entries may be produced by:

- Manual execution by humans
- Automated CI pipelines
- AI-assisted validation agents (e.g. Genspark, Claude)

AI-assisted validation is acceptable if:

- All artifacts reflect real observed behavior
- No data is fabricated or simulated
- Execution environment and versions are clearly documented

## Published Artifact Validation

Validation of **published artifacts** (e.g. `npx proofscan@latest`) is encouraged.

Such entries should clearly state:

- Execution mode (npm / npx)
- Tool version
- Environment details
- Validation scope

## Evidence Curation (Important)

Re-running a validation is **not required** if:

- Original execution artifacts already exist
- The task is to structure, hash, and commit evidence
- No new behavior is introduced

POPL prioritizes **recording observed facts**, not repeated execution.

## Code of Conduct

- Be respectful and professional
- Focus on evidence, not opinions
- Help others improve their submissions

## Questions?

Open an issue for any questions about contributing or validation rules.
