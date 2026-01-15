<img src="https://github.com/Sunwood-ai-labs/MultimediaOS-MUGEN/releases/download/v1.0.0/release-header-v1.0.0.png" alt="M.U.G.E.N. ~ MultimediaOS CC ~ V1.0.0"/>

# v1.0.0 - Initial Launch / 最初のリリース

**リリース日 / Release Date:** 2026-01-15

---

## 日本語 / Japanese

### 概要

**MultimediaOS CC** の初公開リリースです！

このリリースは、AI搭載のマルチメディア制作ワークスペースとしての第一歩を标志着します。fal.ai API を活用した画像生成・編集・動画生成機能を、Claude Code の Skills として統合したオペレーティングシステムのような環境を提供します。

重力から解放された創造性を、CLIから解き放ちましょう。

### 新機能 ✨

#### コア機能
- **画像生成 (Text-to-Image)**: `fal-ai/qwen-image-2512/lora` モデルを使用した高品質な画像生成
- **画像編集 (Image-to-Image)**: `fal-ai/qwen-image-edit-2511/lora` モデルによる自然言語での画像編集
- **動画生成 (Image-to-Video)**: `fal-ai/ltx-2/image-to-video/fast` で高速な動画生成
- **音声付き動画生成**: `fal-ai/ltx-2-19b/distilled/image-to-video/lora` による高品質な音声付き動画

#### プロジェクト管理
- **プロジェクト構造**: `projects/{name}/` ディレクトリでの素材と生成物の管理
- **プロンプト履歴**: `prompts.md` での使用プロンプトの記録
- **自動命名**: タイムスタンプ付きの一意なファイル命名規則

#### Claude Code Skills
- **fal-ai スキル**: `/fal-ai` スラッシュコマンドで全機能にアクセス
- **環境設定**: `.env` ファイルでの API キー管理

#### ドキュメント
- **アーキテクチャ図**: SVG形式のシステムアーキテクチャ可視化
- **モデルリファレンス**: 各fal.aiモデルの詳細ドキュメント
- **M.U.G.E.N. ブランディング**: 独自のビジュアルアイデンティティ

### 設定・改善 🔧

- **TypeScript構成**: 厳格な型チェックと最適化
- **環境変数管理**: dotenvによる安全な`.env`ファイルの読み込み
- **依存関係ロック**: pnpm-lock.yamlによる依存関係の固定
- **Git構成**: `.claude/outputs/`の除外、適切な`.gitignore`設定

### バグ修正 🐛

- **`.env`ファイルパス修正**: プロジェクトルートからの正しいパス解決
- **スクリプトパス修正**: 各スクリプトでの環境変数ファイルの読み込み修正

---

## English

### Overview

The first public release of **MultimediaOS CC**!

This release marks the first step as an AI-powered multimedia creative workspace. It provides an OS-like environment that integrates image generation, editing, and video generation powered by fal.ai API as Claude Code Skills.

Unleash your creativity from the CLI, liberated from gravity.

### What's New ✨

#### Core Features
- **Image Generation (Text-to-Image)**: High-quality image generation using `fal-ai/qwen-image-2512/lora` model
- **Image Editing (Image-to-Image)**: Natural language image editing with `fal-ai/qwen-image-edit-2511/lora` model
- **Video Generation (Image-to-Video)**: Fast video generation with `fal-ai/ltx-2/image-to-video/fast`
- **Audio-Enabled Video**: High-quality video with audio using `fal-ai/ltx-2-19b/distilled/image-to-video/lora`

#### Project Management
- **Project Structure**: Manage assets and outputs in `projects/{name}/` directories
- **Prompt History**: Track used prompts in `prompts.md`
- **Auto-Naming**: Unique file naming with timestamps

#### Claude Code Skills
- **fal-ai Skill**: Access all features via `/fal-ai` slash command
- **Environment Config**: API key management via `.env` file

#### Documentation
- **Architecture Diagram**: SVG system architecture visualization
- **Model Reference**: Detailed documentation for each fal.ai model
- **M.U.G.E.N. Branding**: Unique visual identity

### Changes & Improvements 🔧

- **TypeScript Config**: Strict type checking and optimization
- **Environment Management**: Secure `.env` file loading with dotenv
- **Dependency Locking**: Fixed dependencies with pnpm-lock.yaml
- **Git Configuration**: Excluded `.claude/outputs/`, proper `.gitignore` setup

### Bug Fixes 🐛

- **`.env` Path Fix**: Correct path resolution from project root
- **Script Path Fix**: Fixed environment variable file loading in each script

---

## インストール / Installation

```bash
# Clone repository
git clone https://github.com/aslan-farajullaev/fal-ai-multimedia-workspace.git
cd fal-ai-multimedia-workspace

# Setup environment
cp .env.example .env
# Edit .env and add your FAL_KEY

# Install dependencies
cd .claude/skills/fal-ai/scripts
pnpm install
```

## 使用方法 / Usage

```bash
# Image generation
/fal-ai t2i "A beautiful sunset" --project my-project

# Image editing
/fal-ai i2i input.jpg "Make the sky blue" --project my-project

# Video generation
/fal-ai i2v input.jpg --duration 5 --project my-project

# Video with audio
/fal-ai i2v-audio input.jpg --prompt "Camera zooms in" --project my-project
```

## 次のステップ / Next Steps

- モデルのバージョンアップ対応
- より多くのfal.aiモデルの追加
- プロジェクト管理機能の強化
- バッチ処理のサポート

---

**Welcome to the future of multimedia creation!**
**マルチメディア制作の未来へようこそ！**
