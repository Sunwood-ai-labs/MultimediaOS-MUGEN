# fal.ai モデル仕様

このドキュメントは、fal.aiスキルで使用する各モデルの仕様を説明します。

## 1. Qwen Image 2512 (画像生成)

**モデルID**: `fal-ai/qwen-image-2512/lora`

**機能**: テキストプロンプトから画像を生成するLoRA推論エンドポイント。テキスト描画が改善され、より自然なテクスチャとリアルな人間生成が可能です。

### 入力パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `prompt` | string | 必須 | 画像生成のためのプロンプト |
| `negative_prompt` | string | `""` | ネガティブプロンプト |
| `image_size` | ImageSize | `landscape_4_3` | 生成画像のサイズ |
| `num_inference_steps` | integer | 28 | 推論ステップ数 |
| `guidance_scale` | float | 4 | ガイダンススケール |
| `seed` | integer | ランダム | 乱数シード（再現性のため） |
| `num_images` | integer | 1 | 生成する画像数 |
| `enable_safety_checker` | boolean | true | セーフティチェッカーを有効化 |
| `output_format` | OutputFormatEnum | `"png"` | 出力形式 (`jpeg`, `png`, `webp`) |
| `acceleration` | AccelerationEnum | `"regular"` | 加速レベル (`none`, `regular`, `high`) |
| `loras` | list<LoraWeight> | `[]` | 使用するLoRA（最大3つ） |

### image_size の値

- `square_hd`: 正方形（高解像度）
- `square`: 正方形
- `portrait_4_3`: 縦長 4:3
- `portrait_16_9`: 縦長 16:9
- `landscape_4_3`: 横長 4:3
- `landscape_16_9`: 横長 16:9

カスタムサイズも指定可能:
```json
{
  "image_size": {
    "width": 1280,
    "height": 720
  }
}
```

### プロンプトの例

```
"Single red rose in a clear glass vase on white marble streaked with black and gold veins, harsh directional shadow, high contrast, editorial style, clean negative space."

"A serene landscape with mountains at sunset, warm golden light, dramatic clouds, photorealistic, 8k quality."

"A futuristic cyberpunk city at night, neon lights, rain-soaked streets, highly detailed, cinematic lighting."
```

---

## 2. Qwen Image Edit 2511 (画像編集)

**モデルID**: `fal-ai/qwen-image-edit-2511/lora`

**機能**: 既存の画像を編集するLoRA推論エンドポイント。

### 入力パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `image_url` | string | 必須 | 編集する画像のURL |
| `prompt` | string | 必須 | 編集指示 |
| `negative_prompt` | string | `""` | ネガティブプロンプト |
| `strength` | float | 0.8 | 編集の強さ (0-1) |
| `num_inference_steps` | integer | 28 | 推論ステップ数 |
| `guidance_scale` | float | 4 | ガイダンススケール |
| `seed` | integer | ランダム | 乱数シード |
| `enable_safety_checker` | boolean | true | セーフティチェッカーを有効化 |
| `output_format` | OutputFormatEnum | `"png"` | 出力形式 |

### 編集プロンプトの例

```
"Make the sky blue and cloudy"
"Add sunglasses to the person"
"Change the background to a beach"
"Enhance the lighting and contrast"
"Remove the objects in the foreground"
```

---

## 3. LTX-2 Image to Video (動画生成)

**モデルID**: `fal-ai/ltx-2/image-to-video/fast`

**機能**: 画像から動画を生成する高速モデル。

### 入力パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `image_url` | string | 必須 | 元画像のURL |
| `prompt` | string | オプション | 動画生成のプロンプト |
| `duration` | float | 4.0 | 動画の長さ（秒） |
| `fps` | integer | 24 | フレームレート |
| `motion_scale` | float | 1.0 | 動きのスケール |

### 動画プロンプトの例

```
"Gentle camera movement"
"Slow pan from left to right"
"Subtle zoom in"
"Cinematic slow motion"
"Dynamic action sequence"
```

---

## 使用例

### 画像生成

```javascript
const result = await fal.subscribe("fal-ai/qwen-image-2512/lora", {
  input: {
    prompt: "A beautiful sunset over mountains",
    image_size: "landscape_16_9",
    num_inference_steps: 28,
    guidance_scale: 4
  }
});
```

### 画像編集

```javascript
const result = await fal.subscribe("fal-ai/qwen-image-edit-2511/lora", {
  input: {
    image_url: "https://example.com/image.jpg",
    prompt: "Make the sky blue and cloudy",
    strength: 0.7
  }
});
```

### 動画生成

```javascript
const result = await fal.subscribe("fal-ai/ltx-2/image-to-video/fast", {
  input: {
    image_url: "https://example.com/image.jpg",
    prompt: "Gentle camera movement",
    duration: 4.0,
    fps: 24
  }
});
```
