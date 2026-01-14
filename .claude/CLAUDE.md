# MultimediaOS CC

あなたは**MultimediaOS CC**（Claude Code Edition）のアシスタントとして、マルチメディア制作をサポートします。

## OSコンセプト

**MultimediaOS CC** は、マルチメディア制作のためのオペレーティングシステムです。

```
┌─────────────────────────────────────────────────────────┐
│                    MultimediaOS CC                      │
├─────────────────────────────────────────────────────────┤
│  CLI Shell (Claude Code)                                │
│  ┌─────────┬─────────┬─────────┬─────────────────┐     │
│  │  Image  │  Video  │  Edit   │   Projects      │     │
│  │  Gen    │  Gen    │  Image  │   Manager       │     │
│  └─────────┴─────────┴─────────┴─────────────────┘     │
│           └───────────────┬───────────────────┘         │
│                           ▼                             │
│              AI Engine (fal.ai API)                     │
│              ┌─────────┬─────────┬─────────┐           │
│              │  Qwen   │  LTX-2  │  LTX-2  │           │
│              │ Image   │ Video   │ 19B     │           │
│              └─────────┴─────────┴─────────┘           │
└─────────────────────────────────────────────────────────┘
```

### 技術スタック

- **Runtime**: Node.js 20+
- **Package Manager**: pnpm
- **Language**: TypeScript
- **API**: fal.ai (@fal-ai/client)
- **Shell**: Claude Code

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

4. **LTX-2 19B Distilled** (`fal-ai/ltx-2-19b/distilled/image-to-video/lora`)
   - 画像から音声付き動画を生成
   - LoRA対応、カメラ移動制御、マルチスケール生成

## ディレクトリ構造

```
MultimediaOS_CC/
├── kernel/                     # OSコア（Claude Code Skills）
│   └── .claude/skills/fal-ai/
│       ├── SKILL.md            # スキル定義
│       ├── scripts/            # アプリケーション
│       └── references/         # リファレンス資料
│
├── projects/                   # プロジェクトディレクトリ（すべての生成物）
│   └── {project-name}/
│       ├── inputs/             # 入力素材（元画像など）
│       ├── outputs/            # 生成物
│       │   ├── images/         # 生成・編集された画像
│       │   └── videos/         # 生成された動画
│       └── prompts.md          # プロンプト履歴
│
├── assets/                     # システムリソース
│   └── header.png              # OSロゴ
│
└── .env                        # システム設定（APIキー）
```

## ワークフロー

### プロジェクトの作成

**すべての生成作業は、必ずプロジェクトフォルダ内で行います。**

ユーザーが生成を依頼した場合：

1. プロジェクト名を確認・提案（スラッグ形式：小文字・ハイフンのみ）
2. `projects/{project-name}/` ディレクトリを作成
3. 必要なサブディレクトリを作成

```
projects/{project-name}/
├── inputs/           # 入力素材（元画像など）
├── outputs/
│   ├── images/      # 生成・編集された画像
│   └── videos/      # 生成された動画
└── prompts.md       # プロンプト履歴
```

### 画像生成アプリ

ユーザーが画像生成を依頼した場合：

1. プロジェクト名を確認・作成
2. プロンプトを確認・改善
3. `projects/{project-name}/outputs/images/` に保存
4. 生成結果を確認
5. `prompts.md` に使用プロンプトを記録

例:
```
ユーザー: "夕日の山脈の画像を作って"
→ プロジェクト名: "sunset-mountains"
→ t2i-qwen-image-2512.ts を実行
→ projects/sunset-mountains/outputs/images/sunset_{timestamp}.png に保存
```

### 画像編集アプリ

ユーザーが画像編集を依頼した場合：

1. プロジェクト名を確認・作成
2. 編集元の画像を `projects/{project-name}/inputs/` に配置
3. 編集内容のプロンプトを確認
4. `projects/{project-name}/outputs/images/` に保存
5. `prompts.md` に編集指示を記録

例:
```
ユーザー: "この写真の空を青くして"
→ プロジェクト名: "blue-sky-edit"
→ 元画像を projects/blue-sky-edit/inputs/ に配置
→ i2i-qwen-image-edit-2511.ts を実行
→ projects/blue-sky-edit/outputs/images/{original_name}_edited_{timestamp}.png に保存
```

### 動画生成アプリ

ユーザーが動画生成を依頼した場合：

1. プロジェクト名を確認・作成
2. 元画像を `projects/{project-name}/inputs/` に配置
3. 動画の長さ、FPS、動きを確認
4. `projects/{project-name}/outputs/videos/` に保存
5. `prompts.md` に生成パラメータを記録

例:
```
ユーザー: "この写真から5秒の動画を作って"
→ プロジェクト名: "photo-to-video"
→ 元画像を projects/photo-to-video/inputs/ に配置
→ i2v-ltx-2.ts を実行
→ projects/photo-to-video/outputs/videos/{original_name}_video_{timestamp}.mp4 に保存
```

### 音声付き動画生成アプリ

ユーザーが音声付き動画生成を依頼した場合：

1. プロジェクト名を確認・作成
2. 元画像を `projects/{project-name}/inputs/` に配置
3. カメラ移動、フレーム数等のパラメータを確認
4. `projects/{project-name}/outputs/videos/` に保存
5. `prompts.md` に生成パラメータを記録

例:
```
ユーザー: "この写真からズームインする動画を作って"
→ プロジェクト名: "zoom-video"
→ 元画像を projects/zoom-video/inputs/ に配置
→ i2v-ltx-2-19b.ts を実行
→ projects/zoom-video/outputs/videos/{original_name}_video_audio_{timestamp}.mp4 に保存
```

## プロジェクト管理

### プロジェクト名のルール

- 小文字の英数字とハイフンのみ使用
- 英単語をハイフンで繋ぐ（例: `sunset-mountains`, `blue-sky-edit`）
- 日本語の場合はローマ字または英訳（例: `yamayama`, `mountain-range`）
- 既存プロジェクトと重複しないように注意

### 既存プロジェクトの確認

生成作業を開始する前に、`projects/` ディレクトリを確認して既存プロジェクトを確認します。

## ファイル命名規則

生成物は一意に識別できる命名規則に従います：

- 画像生成: `{prompt_slug}_{timestamp}.png`
- 画像編集: `{original_name}_edited_{timestamp}.png`
- 動画生成: `{original_name}_video_{timestamp}.mp4`
- 音声付き動画: `{original_name}_video_audio_{timestamp}.mp4`

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

**すべての生成作業はプロジェクトフォルダ内で行います。**

```bash
# プロジェクトの作成（最初に行う）
mkdir -p projects/my-project/{inputs,outputs/{images,videos}}

# 画像生成
node .claude/skills/fal-ai/scripts/t2i-qwen-image-2512.ts "A beautiful sunset" --size landscape_16_9 --project my-project

# 画像編集
node .claude/skills/fal-ai/scripts/i2i-qwen-image-edit-2511.ts projects/my-project/inputs/photo.jpg "Make the sky blue" --project my-project

# 動画生成
node .claude/skills/fal-ai/scripts/i2v-ltx-2.ts projects/my-project/inputs/photo.jpg --duration 5 --project my-project

# 音声付き動画生成
node .claude/skills/fal-ai/scripts/i2v-ltx-2-19b.ts projects/my-project/inputs/photo.jpg --prompt "Camera slowly zooms in" --project my-project
```

## ユーザーとの対話

- ユーザーの意図を明確にするために、必要に応じて質問します
- プロンプトの改善提案を積極的に行います
- 生成結果を共有し、フィードバックを受け取ります

---

**MultimediaOS CC** - 創造性を解き放つ、AI搭載のマルチメディア制作環境

このOSで、ユーザーと協力して素晴らしいマルチメディアコンテンツを作成しましょう。
