# Validation Sessions

Each subdirectory contains one POPL validation session.

## Naming Convention

```
session-YYYY-MM-DD-<target>/
```

Example: `session-2026-01-02-time/`

## Required Files

| File | Description |
|------|-------------|
| `POPL.yml` | Entry metadata with artifact hashes |
| `events.json` | Raw protocol event log |

## Optional Files

| File | Description |
|------|-------------|
| `tree.json` | Session tree structure |
| `RUNLOG.md` | Human-readable session notes |

## Verification

```bash
# Verify all event hashes
for dir in session-*/; do
  echo "Checking $dir"
  cd "$dir"
  sha256sum -c <(grep -A1 "events.json" POPL.yml | grep hash | sed 's/.*sha256://' | xargs -I{} echo "{} events.json")
  cd ..
done
```
