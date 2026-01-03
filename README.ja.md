# POPL Entries

**[English version](README.md)**

POPL (Proof of Protocol Ledger) エントリの公開台帳。

## 目的

このリポジトリは、AIプロトコル検証セッションのオープンで監査可能な記録として機能します。各エントリは、AIツール（主にMCPサーバー）の観測された動作を暗号学的検証とともに記録します。

## 原則

1. **1セッション = 1エントリ**: 各検証セッションは独自のディレクトリを持つ
2. **エビデンス・ファースト**: 解釈より先に生のプロトコルログ
3. **必ずコミット**: 起きたことはGitに記録する
4. **失敗もエビデンス**: エラー観測も有効なエントリ

## ディレクトリ構造

```
validation/
└── session-YYYY-MM-DD-<target>/
    ├── POPL.yml       # エントリメタデータ（必須）
    ├── events.json    # プロトコルイベントログ（必須）
    ├── tree.json      # セッション構造（任意）
    └── RUNLOG.md      # 人間が読めるメモ（任意）
```

## エントリの提出方法

### 前提条件

- [proofscan](https://github.com/proofofprotocol/proofscan) がインストール済み
- 対象MCPサーバーのパッケージ名

### 最小ワークフロー

```bash
# 1. このリポジトリをクローン
git clone https://github.com/proofofprotocol/popl_entries.git
cd popl_entries

# 2. proofscanで検証を実行
pfscan connectors add <target> --from-mcp-json '{"command":"npx","args":["-y","@example/mcp-server"]}'
pfscan scan start <target>
pfscan shell
# > tool ls
# > send <tool-name> {"param":"value"}

# 3. 成果物をエクスポート
mkdir -p validation/session-$(date +%Y-%m-%d)-<target>
pfscan events export --format json > validation/session-.../events.json

# 4. POPL.ymlを作成（下記テンプレート参照）

# 5. ハッシュを計算
sha256sum events.json

# 6. コミットしてプッシュ
git add validation/session-.../
git commit -m "validation: add session <target> (YYYY-MM-DD)"
git push origin main
```

### POPL.yml テンプレート

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

## 信頼レベル

| レベル | ラベル | 要件 |
|--------|--------|------|
| 0 | Recorded | Gitコミットのみ |
| 1 | Notarized | + IPFS + Hedera HCSタイムスタンプ |
| 2 | Attributed | + 検証済みアイデンティティ |
| 3 | Third-party | + 第三者による検証 |

## 関連リンク

- [POPL Spec](https://github.com/proofofprotocol/popl) - エントリフォーマット仕様
- [proofscan](https://github.com/proofofprotocol/proofscan) - 検証ツール

## ライセンス

[MIT](LICENSE)
