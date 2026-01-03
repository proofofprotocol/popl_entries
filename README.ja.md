# POPL Entries

**[English version](README.md)**

POPL (Proof of Protocol Ledger) エントリの公開台帳。

## 目的

このリポジトリは、AIプロトコル検証セッションのオープンで監査可能な記録として機能します。
各エントリは、AIツール（主にMCPサーバーおよび関連ツール）の**観測された動作**を
暗号学的検証とともに記録します。

## 原則

1. **1セッション = 1エントリ**  
   各検証セッションは独自のディレクトリを持つ。

2. **エビデンス・ファースト**  
   解釈より先に生のプロトコルログ。

3. **必ずコミット**  
   起きたことはGitに記録する。

4. **失敗もエビデンス**  
   エラーや失敗した実行も有効な観測結果。

5. **公開成果物の検証も重要**  
   公開成果物（npm / npx実行など）の検証も第一級のエビデンスとして扱う。

## ディレクトリ構造

```text
validation/
├── session-YYYY-MM-DD-<target>/        # 特定のMCPセッションの検証
│   ├── POPL.yml                        # エントリメタデータ（必須）
│   ├── events.json                     # プロトコルイベントログ（必須）
│   ├── tree.json                       # セッション/RPC構造（推奨）
│   ├── RUNLOG.md                       # 人間が読める検証サマリー（推奨）
│   ├── validation-run.log              # コマンド実行ログ（推奨）
│   └── rpc-detail.txt                  # 主要RPCの完全なrequest/response（推奨）
│
└── proofscan-vX.Y.Z-<scope>/           # 公開ツールの検証（推奨）
    ├── POPL.yml
    ├── RUNLOG.md
    ├── validation-run.log
    └── rpc-detail.txt
```

## 推奨される成果物

MCPサーバー検証と公開ツール検証の両方において、以下の成果物を強く推奨します：

- **validation-run.log** — 実行されたコマンドとアクションの時系列記録
- **rpc-detail.txt** — 重要なRPC（例：tools/call）の完全なrequest/responseキャプチャ
- **tree.json** — セッションとRPC関係の構造的ビュー
- **RUNLOG.md** — 何を検証したか、なぜ検証したかの人間が読める説明

これらの成果物は、監査可能性、再現性、長期的価値を大幅に向上させます。

## エントリの提出方法

### 前提条件

- [proofscan](https://github.com/proofofprotocol/proofscan) がインストール済み
- 対象MCPサーバーまたはツールパッケージ名

### 最小ワークフロー

```bash
# 1. リポジトリをクローン
git clone https://github.com/proofofprotocol/popl_entries.git
cd popl_entries

# 2. proofscanで検証を実行
pfscan connectors add <target> --from-mcp-json '{"command":"npx","args":["-y","@example/mcp-server"]}'
pfscan scan start <target>

# 3. ツール操作を実行（該当する場合）
pfscan tool ls <target>
pfscan tool show <target> <tool>
pfscan tool call <target> <tool> --args '{...}'

# 4. 検証ディレクトリを作成
mkdir -p validation/session-YYYY-MM-DD-<target>

# 5. 成果物をエクスポートまたは収集
# events.json, tree.json, validation-run.log, rpc-detail.txt, RUNLOG.md

# 6. SHA256ハッシュを含むPOPL.ymlを作成

# 7. コミットしてプッシュ
git add validation/session-YYYY-MM-DD-<target>
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
