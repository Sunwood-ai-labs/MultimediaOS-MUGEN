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

## 4. LTX-2 19B Distilled Image to Video (音声付き動画生成)

**モデルID**: `fal-ai/ltx-2-19b/distilled/image-to-video/lora`

**機能**: 画像から音声付き動画を生成するLoRA推論エンドポイント。カメラ移動の制御、マルチスケール生成、カスタムLoRAの使用に対応しています。

### 入力パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `image_url` | string | 必須 | 元画像のURL |
| `prompt` | string | 必須 | 動画生成のプロンプト |
| `num_frames` | integer | 121 | 生成するフレーム数 |
| `video_size` | VideoSize | `auto` | 生成動画のサイズ |
| `generate_audio` | boolean | true | 音声を生成するかどうか |
| `use_multiscale` | boolean | true | マルチスケール生成を使用するか |
| `fps` | float | 25 | フレームレート |
| `acceleration` | AccelerationEnum | `none` | 加速レベル |
| `camera_lora` | CameraLoRAEnum | `none` | カメラLoRAの種類 |
| `camera_lora_scale` | float | 1.0 | カメラLoRAのスケール |
| `negative_prompt` | string | デフォルト値あり | ネガティブプロンプト |
| `enable_prompt_expansion` | boolean | - | プロンプト拡張を有効化 |
| `enable_safety_checker` | boolean | true | セーフティチェッカーを有効化 |
| `video_output_type` | VideoOutputTypeEnum | `"X264 (.mp4)"` | 出力形式 |
| `video_quality` | VideoQualityEnum | `high` | 動画品質 |
| `video_write_mode` | VideoWriteModeEnum | `balanced` | 書き込みモード |
| `loras` | list<LoRAInput> | 必須 | 使用するLoRA |

### video_size の値

- `auto`: 自動
- `square_hd`: 正方形（高解像度）
- `square`: 正方形
- `portrait_4_3`: 縦長 4:3
- `portrait_16_9`: 縦長 16:9
- `landscape_4_3`: 横長 4:3
- `landscape_16_9`: 横長 16:9

カスタムサイズも指定可能:
```json
{
  "video_size": {
    "width": 1280,
    "height": 720
  }
}
```

### acceleration の値

- `none`: なし
- `regular`: 通常
- `high`: 高
- `full`: 最大

### camera_lora の値

- `dolly_in`: ドリーイン（被写体に近づく）
- `dolly_out`: ドリーアウト（被写体から離れる）
- `dolly_left`: ドリーレフト（左に移動）
- `dolly_right`: ドリーライト（右に移動）
- `jib_up`: ジブアップ（上昇）
- `jib_down`: ジブダウン（下降）
- `static`: スタティック（固定）
- `none`: なし

### video_output_type の値

- `X264 (.mp4)`: MP4形式
- `VP9 (.webm)`: WebM形式
- `PRORES4444 (.mov)`: ProRes形式
- `GIF (.gif)`: GIF形式

### video_quality の値

- `low`: 低
- `medium`: 中
- `high`: 高
- `maximum`: 最大

### video_write_mode の値

- `fast`: 高速
- `balanced`: バランス
- `small`: 小サイズ

### プロンプトの例

```
"A woman stands still amid a busy neon-lit street at night. The camera slowly dollies in toward her face as people blur past, their motion emphasizing her calm presence. City lights flicker and reflections shift across her denim jacket."

"Gentle camera movement with subtle zoom"

"Cinematic slow motion with dramatic lighting"

"Continue the scene naturally, maintaining the same style and motion."
```

---

## 5. Ideogram V3 (画像生成)

**モデルID**: `fal-ai/ideogram/v3`

**機能**: 高品質な画像、ポスター、ロゴを生成。優れたタイポグラフィ処理とリアルな出力に最適化されており、商用およびクリエイティブ用途に適しています。

### 入力パラメータ

| パラメータ | 型 | デフォルト | 説明 |
|-----------|------|-----------|------|
| `prompt` | string | 必須 | 画像生成のためのプロンプト |
| `negative_prompt` | string | `""` | ネガティブプロンプト |
| `image_size` | ImageSize | `square_hd` | 生成画像のサイズ |
| `style` | StyleEnum | - | スタイルタイプ (`AUTO`, `GENERAL`, `REALISTIC`, `DESIGN`) |
| `style_preset` | StylePresetEnum | - | スタイルプリセット（下記参照） |
| `rendering_speed` | RenderingSpeedEnum | `"BALANCED"` | レンダリング速度 (`TURBO`, `BALANCED`, `QUALITY`) |
| `num_images` | integer | 1 | 生成する画像数 |
| `seed` | integer | ランダム | 乱数シード |
| `expand_prompt` | boolean | true | MagicPromptを使用するかどうか |

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

### style の値

- `AUTO`: 自動
- `GENERAL`: 一般的なスタイル
- `REALISTIC`: リアルなスタイル
- `DESIGN`: デザイン重視のスタイル

### style_preset の値

`80S_ILLUSTRATION`, `90S_NOSTALGIA`, `ABSTRACT_ORGANIC`, `ANALOG_NOSTALGIA`, `ART_BRUT`, `ART_DECO`, `ART_POSTER`, `AURA`, `AVANT_GARDE`, `BAUHAUS`, `BLUEPRINT`, `BLURRY_MOTION`, `BRIGHT_ART`, `C4D_CARTOON`, `CHILDRENS_BOOK`, `COLLAGE`, `COLORING_BOOK_I`, `COLORING_BOOK_II`, `CUBISM`, `DARK_AURA`, `DOODLE`, `DOUBLE_EXPOSURE`, `DRAMATIC_CINEMA`, `EDITORIAL`, `EMOTIONAL_MINIMAL`, `ETHEREAL_PARTY`, `EXPIRED_FILM`, `FLAT_ART`, `FLAT_VECTOR`, `FOREST_REVERIE`, `GEO_MINIMALIST`, `GLASS_PRISM`, `GOLDEN_HOUR`, `GRAFFITI_I`, `GRAFFITI_II`, `HALFTONE_PRINT`, `HIGH_CONTRAST`, `HIPPIE_ERA`, `ICONIC`, `JAPANDI_FUSION`, `JAZZY`, `LONG_EXPOSURE`, `MAGAZINE_EDITORIAL`, `MINIMAL_ILLUSTRATION`, `MIXED_MEDIA`, `MONOCHROME`, `NIGHTLIFE`, `OIL_PAINTING`, `OLD_CARTOONS`, `PAINT_GESTURE`, `POP_ART`, `RETRO_ETCHING`, `RIVIERA_POP`, `SPOTLIGHT_80S`, `STYLIZED_RED`, `SURREAL_COLLAGE`, `TRAVEL_POSTER`, `VINTAGE_GEO`, `VINTAGE_POSTER`, `WATERCOLOR`, `WEIRD`, `WOODBLOCK_PRINT`

### rendering_speed の値

- `TURBO`: 最速（品質はやや低下）
- `BALANCED`: バランス型
- `QUALITY`: 最高品質（時間がかかる）

### プロンプトの例

```
"The Bone Forest stretched across the horizon, its trees fashioned from the ossified remains of ancient leviathans that once swam through the sky. Shamans with antlers growing from their shoulders and eyes that revealed the true nature of any being they beheld conducted rituals to commune with the spirits that still inhabited the calcified grove. In sky writes \"Ideogram V3 in fal.ai\""

"Logo design for a coffee shop, minimalist style"

"Vintage travel poster of Paris, art deco style"

"Typography poster with inspirational quote"

"Product photography of a luxury watch, studio lighting"
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

### 音声付き動画生成

```javascript
const result = await fal.subscribe("fal-ai/ltx-2-19b/distilled/image-to-video/lora", {
  input: {
    image_url: "https://example.com/image.jpg",
    prompt: "A woman stands still amid a busy neon-lit street at night. The camera slowly dollies in toward her face.",
    num_frames: 121,
    video_size: "auto",
    generate_audio: true,
    use_multiscale: true,
    fps: 25,
    loras: [{
      path: "",
      scale: 1
    }]
  }
});
```

### Ideogram V3 画像生成

```javascript
const result = await fal.subscribe("fal-ai/ideogram/v3", {
  input: {
    prompt: "Logo design for a coffee shop, minimalist style",
    image_size: "square_hd",
    style: "DESIGN",
    style_preset: "FLAT_VECTOR",
    rendering_speed: "BALANCED",
    expand_prompt: true
  }
});
```
