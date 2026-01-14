# fal.ai Multimedia Workspace

あなたは**fal.ai Multimedia Workspace**のアシスタントとして、マルチメディア制作をサポートします。

## プロジェクト概要

このワークスペースは、fal.ai APIを使って画像生成・動画制作・画像編集を行うための環境です。

### 技術スタック

- **Runtime**: Node.js 20+
- **Package Manager**: pnpm
- **Language**: TypeScript
- **API**: fal.ai (@fal-ai/client)

### 使用するモデル

1. **Qwen Image 2512** (`fal-ai/qwen-image-2512/lora`)
   - テキストから画像を生成
   - 高品質なテキスト描画、リアルなテクスチャ

2. **Qwen Image Edit 2511** (`fal-ai/qwen-image-edit-2511/lora`)
   - 画像を編集
   - 自然言語で編集指示

3. **LTX-2** (`fal-ai/ltx-2/image-to-video/fast`)
   - 画像から動画を生成
   - 高速な動画生成

## ディレクトリ構造

```
fal-ai-multimedia-workspace/
├── .claude/
│   ├── CLAUDE.md              # このファイル
│   └── skills/
│       └── fal-ai/            # fal.aiスキル
│           ├── SKILL.md
│           ├── references/
│           └── scripts/
├── assets/                    # ヘッダー画像等
├── outputs/                   # 生成物の保存場所
│   ├── images/               # 生成画像
│   │   ├── generated/        # テキストから生成
│   │   └── edited/           # 編集された画像
│   └── videos/               # 生成動画
│       └── generated/        # 画像から生成
├── projects/                  # プロジェクト別の作業ディレクトリ
└── .env.example              # 環境変数テンプレート
```

## ワークフロー

### 画像生成

ユーザーが画像生成を依頼した場合：

1. プロンプトを確認・改善
2. `outputs/images/generated/` に保存
3. 生成結果を確認

例:
```
ユーザー: "夕日の山脈の画像を作って"
→ generate-image スクリプトを実行
→ outputs/images/generated/sunset_{timestamp}.png に保存
```

### 画像編集

ユーザーが画像編集を依頼した場合：

1. 編集元の画像パスを確認
2. 編集内容のプロンプトを確認
3. `outputs/images/edited/` に保存

例:
```
ユーザー: "この写真の空を青くして"
→ edit-image スクリプトを実行
→ outputs/images/edited/{original_name}_edited_{timestamp}.png に保存
```

### 動画生成

ユーザーが動画生成を依頼した場合：

1. 元画像のパスを確認
2. 動画の長さ、FPS、動きを確認
3. `outputs/videos/generated/` に保存

例:
```
ユーザー: "この写真から5秒の動画を作って"
→ image-to-video スクリプトを実行
→ outputs/videos/generated/{original_name}_video_{timestamp}.mp4 に保存
```

## プロジェクト管理

### 新規プロジェクトの作成

ユーザーが新規プロジェクトを開始する場合、`projects/` の下にプロジェクトディレクトリを作成します：

```
projects/my-project/
├── inputs/      # 入力画像・素材
├── outputs/     # 生成物
└── prompts.md   # 使用したプロンプトの記録
```

## ファイル命名規則

生成物は一意に識別できる命名規則に従います：

- 画像生成: `{prompt_slug}_{timestamp}.png`
- 画像編集: `{original_name}_edited_{timestamp}.png`
- 動画生成: `{original_name}_video_{timestamp}.mp4`

## セキュリティ

- **APIキーの保護**: `.env` ファイルは `.gitignore` に含まれ、コミットされません
- **環境変数**: 必ず `FAL_KEY` 環境変数からAPIキーを取得します
- **センシティブ情報**: 生成物にセンシティブな情報が含まれないよう注意します

## コミット時の注意

- `.env` ファイルは絶対にコミットしない
- 生成物（画像・動画）は基本的にコミットしない（必要な場合はGitHub Releases等を使用）
- プロジェクト設定の変更は明確なコミットメッセージで

## よくあるタスク

### セットアップ

```bash
# 環境変数の設定
cp .env.example .env
# .envファイルを編集してFAL_KEYを設定

# 依存関係のインストール
cd .claude/skills/fal-ai/scripts
pnpm install
```

### スクリプト実行

```bash
# 画像生成
node .claude/skills/fal-ai/scripts/generate-image.ts "A beautiful sunset" --size landscape_16_9

# 画像編集
node .claude/skills/fal-ai/scripts/edit-image.ts photo.jpg "Make the sky blue"

# 動画生成
node .claude/skills/fal-ai/scripts/image-to-video.ts photo.jpg --duration 5
```

## ユーザーとの対話

- ユーザーの意図を明確にするために、必要に応じて質問します
- プロンプトの改善提案を積極的に行います
- 生成結果を共有し、フィードバックを受け取ります

---

このワークスペースで、ユーザーと協力して素晴らしいマルチメディアコンテンツを作成しましょう。
