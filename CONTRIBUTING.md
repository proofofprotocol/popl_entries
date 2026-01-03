# Contributing to POPL Entries

Thank you for contributing to the POPL public ledger.

## How to Contribute

### Adding a Validation Entry

1. **Fork** this repository
2. **Run** a validation session using [proofscan](https://github.com/proofofprotocol/proofscan)
3. **Create** a session directory: `validation/session-YYYY-MM-DD-<target>/`
4. **Include** required artifacts:
   - `POPL.yml` - Entry metadata
   - `events.json` - Protocol event log
5. **Calculate** SHA-256 hashes for artifacts
6. **Submit** a Pull Request

### Entry Requirements

- One PR = One validation session
- All artifacts must have correct hashes in POPL.yml
- Follow the [POPL Entry Spec v0.0](https://github.com/proofofprotocol/popl/blob/main/SPEC/popl-entry-v0.0.md)

### Quality Guidelines

- **No fabricated data**: Only submit real validation sessions
- **Include failures**: Error observations are valid entries
- **Be specific**: Document exact versions and environments

## Code of Conduct

- Be respectful and professional
- Focus on evidence, not opinions
- Help others improve their submissions

## Questions?

Open an issue for any questions about the submission process.
