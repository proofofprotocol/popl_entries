# Security Policy

## Scope

This repository contains validation evidence only. No executable code is included.

## Reporting Issues

### Hash Mismatch

If you discover that an artifact hash in POPL.yml does not match the actual file:

1. Open an issue with:
   - Entry ID (session directory name)
   - Expected hash (from POPL.yml)
   - Actual hash (computed by you)
2. Do NOT submit PRs to "fix" hashes

### Fabricated Evidence

If you suspect an entry contains fabricated data:

1. Open an issue with specific concerns
2. Provide evidence supporting your claim
3. Maintainers will investigate

### Contact

For sensitive security concerns: open a private issue or contact maintainers directly.

## Verification

All entries can be independently verified:

```bash
# Verify artifact hash
sha256sum validation/session-*/events.json

# Compare with POPL.yml
grep "hash:" validation/session-*/POPL.yml
```

## Trust Model

This ledger operates on a trust-but-verify model:

- **Level 0**: Git commit only (no external verification)
- **Level 1+**: External timestamps (IPFS, Hedera) provide stronger guarantees

See [Trust Levels](https://github.com/proofofprotocol/popl/blob/main/SPEC/levels.md) for details.
