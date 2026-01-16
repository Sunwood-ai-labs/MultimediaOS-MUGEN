#!/usr/bin/env tsx
/**
 * t2i-ideogram-v3.ts
 *
 * MODEL: fal-ai/ideogram/v3
 * TYPE: Text to Image (T2I)
 *
 * Ideogram V3 - 高品質な画像、ポスター、ロゴを生成
 * 優れたタイポグラフィ処理とリアルな出力に最適化
 *
 * 使用方法:
 *   node t2i-ideogram-v3.ts "A beautiful sunset" --size landscape_16_9
 *   node t2i-ideogram-v3.ts "Logo design for a coffee shop" --preset LOGO_DESIGN
 *   node t2i-ideogram-v3.ts "Poster with text" --style REALISTIC --speed TURBO
 *
 * パラメータ制約:
 *   --size: square_hd | square | portrait_4_3 | portrait_16_9 | landscape_4_3 | landscape_16_9
 *   --style: AUTO | GENERAL | REALISTIC | DESIGN
 *   --preset: スタイルプリセット（80S_ILLUSTRATION, WATERCOLOR, etc.）
 *   --speed: TURBO | BALANCED | QUALITY
 *   --num: 1-4 (デフォルト: 1)
 */

import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// .envファイルを読み込む（プロジェクトルートから）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../../../");
const envPath = path.resolve(projectRoot, ".env");
dotenv.config({ path: envPath });

// 環境変数からAPIキーを取得
const FAL_KEY = process.env.FAL_KEY;

if (!FAL_KEY) {
  console.error("エラー: FAL_KEY環境変数が設定されていません");
  console.error("プロジェクトルートの .env ファイルを確認してください");
  process.exit(1);
}

fal.config({
  credentials: FAL_KEY
});

// 型定義
type ImageSize =
  | "square_hd"
  | "square"
  | "portrait_4_3"
  | "portrait_16_9"
  | "landscape_4_3"
  | "landscape_16_9"
  | { width: number; height: number };

type StyleType = "AUTO" | "GENERAL" | "REALISTIC" | "DESIGN";
type RenderingSpeed = "TURBO" | "BALANCED" | "QUALITY";

// スタイルプリセット一覧
type StylePreset =
  | "80S_ILLUSTRATION"
  | "90S_NOSTALGIA"
  | "ABSTRACT_ORGANIC"
  | "ANALOG_NOSTALGIA"
  | "ART_BRUT"
  | "ART_DECO"
  | "ART_POSTER"
  | "AURA"
  | "AVANT_GARDE"
  | "BAUHAUS"
  | "BLUEPRINT"
  | "BLURRY_MOTION"
  | "BRIGHT_ART"
  | "C4D_CARTOON"
  | "CHILDRENS_BOOK"
  | "COLLAGE"
  | "COLORING_BOOK_I"
  | "COLORING_BOOK_II"
  | "CUBISM"
  | "DARK_AURA"
  | "DOODLE"
  | "DOUBLE_EXPOSURE"
  | "DRAMATIC_CINEMA"
  | "EDITORIAL"
  | "EMOTIONAL_MINIMAL"
  | "ETHEREAL_PARTY"
  | "EXPIRED_FILM"
  | "FLAT_ART"
  | "FLAT_VECTOR"
  | "FOREST_REVERIE"
  | "GEO_MINIMALIST"
  | "GLASS_PRISM"
  | "GOLDEN_HOUR"
  | "GRAFFITI_I"
  | "GRAFFITI_II"
  | "HALFTONE_PRINT"
  | "HIGH_CONTRAST"
  | "HIPPIE_ERA"
  | "ICONIC"
  | "JAPANDI_FUSION"
  | "JAZZY"
  | "LONG_EXPOSURE"
  | "MAGAZINE_EDITORIAL"
  | "MINIMAL_ILLUSTRATION"
  | "MIXED_MEDIA"
  | "MONOCHROME"
  | "NIGHTLIFE"
  | "OIL_PAINTING"
  | "OLD_CARTOONS"
  | "PAINT_GESTURE"
  | "POP_ART"
  | "RETRO_ETCHING"
  | "RIVIERA_POP"
  | "SPOTLIGHT_80S"
  | "STYLIZED_RED"
  | "SURREAL_COLLAGE"
  | "TRAVEL_POSTER"
  | "VINTAGE_GEO"
  | "VINTAGE_POSTER"
  | "WATERCOLOR"
  | "WEIRD"
  | "WOODBLOCK_PRINT";

interface GenerateImageOptions {
  prompt: string;
  negativePrompt?: string;
  imageSize?: ImageSize;
  style?: StyleType;
  stylePreset?: StylePreset;
  renderingSpeed?: RenderingSpeed;
  numImages?: number;
  seed?: number;
  expandPrompt?: boolean;
}

// コマンドライン引数の解析
function parseArgs(): GenerateImageOptions {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("使用方法: node t2i-ideogram-v3.ts <prompt> [options]");
    console.error("");
    console.error("オプション:");
    console.error("  --size <size>              画像サイズ (square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9)");
    console.error("  --style <style>            スタイルタイプ (AUTO, GENERAL, REALISTIC, DESIGN)");
    console.error("  --preset <preset>          スタイルプリセット (WATERCOLOR, POP_ART, etc.)");
    console.error("  --speed <speed>            レンダリング速度 (TURBO, BALANCED, QUALITY)");
    console.error("  --num <number>             生成する画像数 (デフォルト: 1)");
    console.error("  --seed <number>            乱数シード");
    console.error("  --negative <prompt>        ネガティブプロンプト");
    console.error("  --no-expand                プロンプト拡張を無効化");
    console.error("");
    console.error("スタイルプリセット一覧:");
    console.error("  80S_ILLUSTRATION, 90S_NOSTALGIA, ABSTRACT_ORGANIC, ANALOG_NOSTALGIA,");
    console.error("  ART_BRUT, ART_DECO, ART_POSTER, AURA, AVANT_GARDE, BAUHAUS,");
    console.error("  BLUEPRINT, BLURRY_MOTION, BRIGHT_ART, C4D_CARTOON, CHILDRENS_BOOK,");
    console.error("  COLLAGE, COLORING_BOOK_I, COLORING_BOOK_II, CUBISM, DARK_AURA,");
    console.error("  DOODLE, DOUBLE_EXPOSURE, DRAMATIC_CINEMA, EDITORIAL, EMOTIONAL_MINIMAL,");
    console.error("  ETHEREAL_PARTY, EXPIRED_FILM, FLAT_ART, FLAT_VECTOR, FOREST_REVERIE,");
    console.error("  GEO_MINIMALIST, GLASS_PRISM, GOLDEN_HOUR, GRAFFITI_I, GRAFFITI_II,");
    console.error("  HALFTONE_PRINT, HIGH_CONTRAST, HIPPIE_ERA, ICONIC, JAPANDI_FUSION,");
    console.error("  JAZZY, LONG_EXPOSURE, MAGAZINE_EDITORIAL, MINIMAL_ILLUSTRATION,");
    console.error("  MIXED_MEDIA, MONOCHROME, NIGHTLIFE, OIL_PAINTING, OLD_CARTOONS,");
    console.error("  PAINT_GESTURE, POP_ART, RETRO_ETCHING, RIVIERA_POP, SPOTLIGHT_80S,");
    console.error("  STYLIZED_RED, SURREAL_COLLAGE, TRAVEL_POSTER, VINTAGE_GEO,");
    console.error("  VINTAGE_POSTER, WATERCOLOR, WEIRD, WOODBLOCK_PRINT");
    console.error("");
    console.error("例:");
    console.error('  node t2i-ideogram-v3.ts "A beautiful sunset" --size landscape_16_9');
    console.error('  node t2i-ideogram-v3.ts "Logo design for a coffee shop" --preset FLAT_VECTOR');
    console.error('  node t2i-ideogram-v3.ts "Poster with text" --style REALISTIC --speed TURBO');
    process.exit(1);
  }

  const options: GenerateImageOptions = {
    prompt: args[0]
  };

  let i = 1;
  while (i < args.length) {
    switch (args[i]) {
      case "--size":
        options.imageSize = args[++i] as ImageSize;
        break;
      case "--style":
        options.style = args[++i] as StyleType;
        break;
      case "--preset":
        options.stylePreset = args[++i] as StylePreset;
        break;
      case "--speed":
        options.renderingSpeed = args[++i] as RenderingSpeed;
        break;
      case "--num":
        options.numImages = parseInt(args[++i]);
        break;
      case "--seed":
        options.seed = parseInt(args[++i]);
        break;
      case "--negative":
        options.negativePrompt = args[++i];
        break;
      case "--no-expand":
        options.expandPrompt = false;
        break;
      default:
        console.error(`不明なオプション: ${args[i]}`);
        process.exit(1);
    }
    i++;
  }

  return options;
}

// プロンプトからファイル名を生成
function generateFilename(prompt: string, seed?: number, index: number = 0): string {
  const timestamp = Date.now();
  const seedSuffix = seed ? `_seed${seed}` : "";
  const indexSuffix = index > 0 ? `_${index}` : "";
  // プロンプトの先頭部分を抽出（ファイル名用）
  const promptSlug = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .split("_")
    .slice(0, 3)
    .join("_");
  return `${promptSlug}_${timestamp}${seedSuffix}${indexSuffix}.png`;
}

// 画像をダウンロードして保存
async function downloadImage(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
}

// 画像生成を実行
async function generateImage(options: GenerateImageOptions) {
  console.log("Ideogram V3で画像生成を開始します...");
  console.log(`プロンプト: ${options.prompt}`);

  try {
    const result = await fal.subscribe("fal-ai/ideogram/v3", {
      input: {
        prompt: options.prompt,
        negative_prompt: options.negativePrompt || "",
        image_size: options.imageSize || "square_hd",
        style: options.style,
        style_preset: options.stylePreset,
        rendering_speed: options.renderingSpeed || "BALANCED",
        num_images: options.numImages || 1,
        seed: options.seed,
        expand_prompt: options.expandPrompt !== false
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      }
    });

    console.log("\n✓ 画像生成が完了しました！");
    console.log(`リクエストID: ${result.requestId}`);
    console.log(`シード: ${result.data.seed}`);

    // 出力ディレクトリを作成
    const outputDir = path.join(__dirname, "../../../outputs/images/generated");
    fs.mkdirSync(outputDir, { recursive: true });

    console.log("\n生成された画像:");

    for (let i = 0; i < result.data.images.length; i++) {
      const image = result.data.images[i];
      const filename = generateFilename(options.prompt, result.data.seed, i);
      const outputPath = path.join(outputDir, filename);

      // 画像をダウンロード
      await downloadImage(image.url, outputPath);

      console.log(`  [${i + 1}] ${filename}`);
      console.log(`      パス: ${outputPath}`);
      console.log(`      URL: ${image.url}`);
    }

    return result;
  } catch (error) {
    console.error("\n✗ エラーが発生しました:");
    if (error instanceof Error) {
      console.error(error.message);
    }
    throw error;
  }
}

// メイン処理
async function main() {
  const options = parseArgs();
  await generateImage(options);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
