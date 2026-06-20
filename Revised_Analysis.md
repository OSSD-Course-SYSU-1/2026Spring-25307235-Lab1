# LED 手持弹幕应用 - 项目解析文档

## 一、项目概述

本项目是一个基于 **HarmonyOS** 的手持弹幕（LED Barrage）应用，用户可以在手机/平板上配置弹幕文字、颜色、速度等参数，然后全屏滚动显示弹幕内容。本版本（4_AI）在基础弹幕功能上集成了 **AI 语音合成（TTS）** 能力，使用华为 CoreSpeechKit 实现离线中文语音播报。

| 项目属性 | 值 |
|---|---|
| 应用类型 | HarmonyOS Stage Model 应用 |
| 开发语言 | ArkTS（基于 TypeScript） |
| UI 框架 | ArkUI 声明式 UI |
| SDK 版本 | HarmonyOS SDK 6.0.0(20) |
| 目标设备 | Phone、Tablet |
| 构建系统 | Hvigor |
| 包名 | com.example.led |
| 版本 | 1.0.0 |

---

## 二、项目目录结构

```
4_Complete/
├── .gitignore
├── build-profile.json5                          # 项目级构建配置
├── hvigorfile.ts                                # 项目级 Hvigor 构建脚本
├── oh-package.json5                             # 项目级包管理配置
├── read_ppt.py                                  # Python 工具脚本（非应用代码）
├── hvigor/
│   └── hvigor-config.json5                      # Hvigor 构建系统配置
├── AppScope/
│   ├── app.json5                                # 应用级元数据
│   └── resources/
│       └── base/
│           ├── element/
│           │   └── string.json                  # 应用名称字符串："LED"
│           └── media/
│               ├── background.png               # 应用图标背景层
│               ├── foreground.png               # 应用图标前景层
│               └── layered_image.json           # 分层图标定义
└── entry/
    ├── build-profile.json5                      # Entry 模块构建配置
    ├── hvigorfile.ts                            # Entry 模块 Hvigor 构建脚本
    ├── oh-package.json5                         # Entry 模块包管理配置
    └── src/main/
        ├── module.json5                         # 模块清单（Ability、权限、页面路由）
        ├── ets/
        │   ├── entryability/
        │   │   └── EntryAbility.ets             # 应用入口 Ability（生命周期管理）
        │   ├── entrybackupability/
        │   │   └── EntryBackupAbility.ets       # 备份/恢复扩展能力
        │   ├── model/
        │   │   └── Settings.ets                 # 数据模型：Settings 类 + GradientColors 接口
        │   ├── pages/
        │   │   ├── Index.ets                    # 主页：弹幕配置与预览
        │   │   ├── Led.ets                      # LED 显示页：全屏滚动弹幕
        │   │   └── Login.ets                    # 登录页：手机号 + 密码表单
        │   └── utils/
        │       ├── ResponsiveUtil.ets           # 响应式布局工具（单例）
        │       └── Speaker.ets                  # TTS 语音合成工具
        └── resources/
            ├── base/
            │   ├── element/
            │   │   ├── color.json               # 颜色资源
            │   │   ├── float.json               # 尺寸资源
            │   │   └── string.json              # 字符串资源
            │   ├── media/
            │   │   ├── background.png           # 模块图标背景
            │   │   ├── chevron_left.png         # 返回按钮图标
            │   │   ├── foreground.png           # 模块图标前景
            │   │   ├── layered_image.json       # 分层图标配置
            │   │   ├── speaker_wave_3.png       # 语音/TTS 图标
            │   │   └── startIcon.png            # 启动图标
            │   └── profile/
            │       ├── backup_config.json       # 备份配置
            │       ├── main_pages.json          # 页面路由注册
            │       └── route_map.json           # 导航路由映射
            └── dark/
                └── element/
                    └── color.json               # 暗黑模式颜色资源
```

---

## 三、核心源码文件详解

### 3.1 `EntryAbility.ets` — 应用入口 Ability

**路径**: `entry/src/main/ets/entryability/EntryAbility.ets`

**职责**: 应用生命周期管理，是整个应用的入口点。

**核心功能**:
- `onCreate()`: 设置应用颜色模式（深色/浅色），加载 Index 页面
- `onWindowStageCreate()`: 注册窗口尺寸变化监听器，当窗口大小变化时刷新 `ResponsiveUtil` 的屏幕尺寸数据，以支持多设备自适应布局
- 导入并使用 `ResponsiveUtil` 工具类

---

### 3.2 `Index.ets` — 主页（弹幕配置与预览）

**路径**: `entry/src/main/ets/pages/Index.ets`

**职责**: 应用的主页面，提供弹幕参数配置和实时预览功能。

**核心功能**:
- **标题栏**: 显示应用名称和用户头像（点击头像跳转至 Login 页面）
- **弹幕预览区**: 使用 Marquee 组件实时展示弹幕效果，支持渐变背景色
- **配置面板**（可滚动）:
  - 文字内容输入（TextArea）
  - 字体大小调节（Slider: 88/168/248 三档）
  - 字体粗细选择（Select: Lighter/Normal/Bold/Bolder）
  - 滚动速度选择（Select: 多档速度）
  - 镜像显示开关（Toggle）
  - 夜间模式开关（Toggle）
  - 文字颜色选择（Select: 多种预设颜色）
  - 背景主题选择（Select: 多种渐变主题）
- **"显示弹幕"按钮**: 将所有配置封装为 `Settings` 对象，通过 Navigation 路由跳转到 Led 页面

**依赖**: `Settings`、`GradientColors`（数据模型）、`ResponsiveUtil`（响应式布局）

---

### 3.3 `Led.ets` — LED 全屏显示页

**路径**: `entry/src/main/ets/pages/Led.ets`

**职责**: 全屏横屏展示滚动弹幕内容，是应用的核心展示页面。

**核心功能**:
- 通过 `NavDestination.onReady()` 接收 `Settings` 配置参数
- 横屏全屏显示，使用 Marquee 组件滚动弹幕文字
- 支持的配置项: 字体大小、字体粗细、文字颜色、滚动速度、镜像显示、夜间模式、渐变背景
- 顶部菜单栏包含返回按钮和 **TTS 语音播报按钮**
- `aboutToDisappear()` 时清理 TTS 引擎资源

**依赖**: `Settings`（数据模型）、`Speaker`（TTS 语音工具）

---

### 3.4 `Login.ets` — 登录页

**路径**: `entry/src/main/ets/pages/Login.ets`

**职责**: 用户登录表单页面。

**核心功能**:
- 手机号输入框（最大 11 位）
- 密码输入框（最大 20 位，支持密码可见性切换）
- 登录按钮（目前仅打印日志到控制台，未接入真实认证后端）

**依赖**: `ResponsiveUtil`（响应式布局）

> **注意**: 此页面为 UI 占位/演示功能，暂无实际认证逻辑。

---

### 3.5 `Settings.ets` — 数据模型

**路径**: `entry/src/main/ets/model/Settings.ets`

**职责**: 定义弹幕配置的数据结构。

**核心内容**:

```typescript
// 渐变颜色接口
interface GradientColors {
  colors: Array<[string, number]>  // [颜色值, 位置比例] 数组
}

// 弹幕设置类
class Settings {
  content: string          // 弹幕文字内容
  fontSize: number         // 字体大小
  fontWeight: FontWeight   // 字体粗细
  marqueeSpeed: number     // 滚动速度
  isMirror: boolean        // 是否镜像显示
  fontColor: string        // 文字颜色
  gradientColors: GradientColors  // 渐变背景色配置
  isNightMode: boolean     // 是否夜间模式
}
```

**用途**: 在 Index 页面构建 Settings 对象，通过 Navigation 传递给 Led 页面使用。

---

### 3.6 `ResponsiveUtil.ets` — 响应式布局工具

**路径**: `entry/src/main/ets/utils/ResponsiveUtil.ets`

**职责**: 提供多设备自适应布局的缩放和判断工具。

**核心功能**:
- **单例模式**: 全局唯一实例
- 基于设计稿基准尺寸（375×667）进行等比缩放
- `scale(value)`: 等比缩放
- `scaleFont(value)`: 字体缩放
- `scaleWidth(value)`: 宽度缩放
- `scaleHeight(value)`: 高度缩放
- `isLargeScreen()`: 判断是否大屏设备
- `isTablet()`: 判断是否平板
- `getDeviceType()`: 获取设备类型
- `getPadding()`: 获取适配内边距
- `getMaxWidth()`: 获取最大内容宽度
- `refreshScreenSize()`: 刷新屏幕尺寸（窗口变化时调用）

**依赖**: `@kit.ArkUI` 的 `display` 模块

---

### 3.7 `Speaker.ets` — TTS 语音合成工具

**路径**: `entry/src/main/ets/utils/Speaker.ets`

**职责**: 封装华为 CoreSpeechKit 的文字转语音（TTS）能力。

**核心功能**:
- 构造函数中创建 TTS 引擎（语言: zh-CN，离线模式，语音: 聆小珊女声 #13）
- `startSpeak(content)`: 将文字合成并朗读
- `stopSpeak()`: 停止朗读
- `shutdownEngine()`: 释放 TTS 引擎资源

**依赖**: `@kit.CoreSpeechKit`（textToSpeech）、`@kit.BasicServicesKit`（BusinessError）、`@kit.PerformanceAnalysisKit`（hilog）

> **这是本版本（4_AI）的核心 AI 特性**，实现了弹幕内容的语音播报能力。

---

## 四、配置文件详解

### 4.1 `AppScope/app.json5` — 应用级配置

定义应用的身份信息：
- `bundleName`: com.example.led
- `versionCode`: 1000000
- `versionName`: 1.0.0
- `icon` 和 `label`: 引用 resources 中的图标和名称

### 4.2 `entry/src/main/module.json5` — 模块清单

核心配置：
- 定义 `EntryAbility` 为主 Ability（带 HOME 启动意图）
- 定义 `EntryBackupAbility` 为备份扩展
- 设备类型: phone、tablet
- 页面路由: `$profile:main_pages`
- 导航路由: `$profile:route_map`

### 4.3 `main_pages.json` — 静态页面路由

注册两个静态页面：
- `pages/Index` — 主页
- `pages/Login` — 登录页

### 4.4 `route_map.json` — 导航路由映射

注册两个动态导航目标：
- `Led` → `LedBuilder`（在 Led.ets 中定义）
- `Login` → `LoginBuilder`（在 Login.ets 中定义）

### 4.5 `build-profile.json5` — 项目构建配置

- 目标 SDK: 6.0.0(20)
- 运行时 OS: HarmonyOS
- 包含单个 entry 模块

---

## 五、页面导航流程

```
应用启动
  │
  ▼
EntryAbility.onCreate()
  │
  ▼
加载 Index 页面（Navigation 根页面）
  │
  ├── 点击"显示弹幕" ──→ pushPathByName('Led', Settings) ──→ Led 页面（全屏弹幕 + TTS）
  │
  └── 点击头像 ──→ pushPathByName('Login', null) ──→ Login 页面（登录表单）
```

---

## 六、文件依赖关系

```
EntryAbility.ets
  ├── imports → ResponsiveUtil
  └── loads → pages/Index

Index.ets
  ├── imports → Settings, GradientColors
  ├── imports → ResponsiveUtil
  └── navigates → 'Led' (携带 Settings), 'Login'

Led.ets
  ├── imports → Settings
  └── imports → Speaker

Login.ets
  └── imports → ResponsiveUtil

Settings.ets
  └── 独立数据模型，无项目内依赖

ResponsiveUtil.ets
  └── imports → @kit.ArkUI (display)

Speaker.ets
  └── imports → @kit.CoreSpeechKit, @kit.BasicServicesKit, @kit.PerformanceAnalysisKit
```

---

## 七、技术栈总览

| 分类 | 技术/框架 |
|---|---|
| 操作系统 | HarmonyOS |
| 开发语言 | ArkTS（TypeScript 扩展） |
| UI 框架 | ArkUI 声明式（@ComponentV2, @Local, @Builder） |
| 应用模型 | Stage Model（UIAbility） |
| 构建工具 | Hvigor |
| TTS 引擎 | @kit.CoreSpeechKit（离线中文语音合成） |
| 日志系统 | @kit.PerformanceAnalysisKit（hilog） |
| 备份能力 | @kit.CoreFileKit（BackupExtensionAbility） |
| 显示适配 | @kit.ArkUI（display, window） |
| 外部依赖 | 无（仅使用系统 Kit，无第三方库） |

---

## 八、备注

1. **AI 特性**: 本版本（4_AI）的核心增强是 `Speaker.ets` 提供的 TTS 语音播报功能，使用华为 CoreSpeechKit 实现离线中文语音合成
2. **多设备适配**: 通过 `ResponsiveUtil` 单例实现手机/平板/大屏的自适应布局
3. **夜间模式**: Index 和 Led 页面均支持夜间模式切换
4. **Login 页面**: 当前仅为 UI 演示，无真实认证后端
5. **read_ppt.py**: 项目中包含一个无关的 Python 脚本（用于提取 PPT 文本），不属于 HarmonyOS 应用代码
