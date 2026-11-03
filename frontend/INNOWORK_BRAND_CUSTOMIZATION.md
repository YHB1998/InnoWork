# InnoWork 品牌定制迁移指南

> 本文档记录了从 WeKnora 上游版本定制为 InnoWork 品牌时的所有改动项。
> 当前上游版本：**0.9.0**，定制目标：InnoWork 品牌 + UI 调整 + 功能隐藏。
> 下次升级上游版本（如 1.0.x）时，对照本文档逐条应用即可。

---

## 一、静态资源文件（需新增/替换）

| 操作 | 目标路径 | 来源 | 说明 |
|---|---|---|---|
| **新增** | `src/assets/img/innowork.png` | 设计提供 / `frontend-v1` | InnoWork Logo，替换原 `weknora.png` |
| **新增** | `src/assets/img/home-mascot-light.gif` | `frontend-v1` | 新建对话页吉祥物（亮色模式），GIF 自带挥手动效 |
| **新增** | `src/assets/img/home-mascot-dark.gif` | `frontend-v1` | 新建对话页吉祥物（暗色模式），GIF 自带挥手动效 |

> `weknora.png` 保留在项目中，部分未改造的内部组件仍会引用。

---

## 二、品牌文案替换（6 个语言文件 × N 处）

以下 6 个文件中，**所有显示给用户看的** `WeKnora` / `WeKnoraCloud` / `WeKnoraCloud` 都要替换为 `InnoWork` / `InnoWork Cloud` / `InnoWorkCloud`：

- `src/i18n/locales/en-US.ts`
- `src/i18n/locales/zh-CN.ts`
- `src/i18n/locales/zh-TW.ts`
- `src/i18n/locales/ja-JP.ts`
- `src/i18n/locales/ko-KR.ts`
- `src/i18n/locales/ru-RU.ts`

### 替换规则

| 模式 | 替换为 | 说明 |
|---|---|---|
| `WeKnora`（显示字符串） | `InnoWork` | 品牌名 |
| `WeKnora Cloud`（显示字符串） | `InnoWork Cloud` | 云服务名 |
| `WeKnoraCloud`（显示字符串） | `InnoWorkCloud` | 无空格的拼法 |
| `WeKnora standard template` | `InnoWork standard template` | 沙箱模板名 |
| `WeKnora desktop template` | `InnoWork desktop template` | 沙箱模板名 |
| `WeKnora standard image` | `InnoWork standard image` | 沙箱镜像名 |
| `weknora-app` | `innowork-app` | 版本描述中的服务名 |
| `weknora-ui` | `innowork-ui` | 版本描述中的 UI 名 |
| `WeKnora CLI` | `InnoWork CLI` | 产品名 |
| `WeKnora Skill` | `InnoWork Skill` | 产品名 |
| 本地化文本中的 WeKnora | InnoWork | 按语言自然替换 |

### ⚠️ 不可替换（技术标识符）

这些是代码 key、API 路径、协议字段，**绝对不能改**：

- 对象 key：`weknoracloud`、`weknoraCloud`、`weknoraTemplateTitle`、`weknoraDockerImage`、`weknoraDocs`、`weknoracloud` 等
- HTTP 头：`X-WeKnora-Signature`
- JWT 声明：`aud=weknora`
- API 路径：`/weknora/embed-events`
- 环境变量：`WEKNORA_BASE_URL`、`WEKNORA_API_KEY`、`WEKNORA_` 前缀
- CLI 二进制名：`weknora`
- 包名/仓库：`@lyingbug/weknora`
- localStorage key：`WeKnora_theme`、`weknora_lite_mode`
- 函数名：`searchWeKnoraDocs`、`readWeKnoraDoc`

### 特殊处理：使用 {brand} 变量占位

在登录/注册页面的欢迎文案中，0.8.3 版本用了 `{brand}` 占位符，方便再次修改品牌名。0.9.0 升级时建议保持这个做法：

```ts
// 登录页 brandName 常量（一处修改）
const brandName = 'InnoWork'
```

i18n 中对应的键值改为：
- `首次使用 {brand}？` / `New to {brand}?`
- `创建账户并开始使用 {brand}` / `Create your account and start using {brand}`

---

## 三、单文件修改清单

### 3.1 `index.html`

```diff
-    <title>WeKnora</title>
+    <title>InnoWork</title>

-    <meta name="description" content="WeKnora是一款基于大语言模型的文档理解与语义检索框架，专为结构复杂、内容异构的文档场景而打造。"/>
+    <meta name="description" content="InnoWork是一款AI驱动的智能体工作平台，让智能体帮你完成任务执行、知识检索与内容创作，全面提升工作效率。"/>
```

### 3.2 `embed.html`

```diff
-    <title>WeKnora Embed</title>
+    <title>InnoWork Embed</title>
```

### 3.3 `src/components/menu.vue`（侧边栏 Logo）

```diff
-<img class="logo" src="@/assets/img/weknora.png" alt="">
+<img class="logo" src="@/assets/img/innowork.png" alt="InnoWork">
```

### 3.4 `src/views/auth/Login.vue`（登录页）

**模板改动 1 — Logo 替换**：

```diff
-    <!-- Logo - Top Left -->
-    <a href="https://github.com/Tencent/WeKnora" target="_blank" class="header-logo" :title="$t('common.github')">
-      <img src="@/assets/img/weknora.png" alt="WeKnora" class="logo-image" />
-    </a>
+    <!-- Logo - Top Left -->
+    <img class="page-logo" src="@/assets/img/innowork.png" alt="InnoWork">
```

**⚠️ 同时必须补充 `.page-logo` CSS 样式块**（0.8.3 新增，0.9.0 原本没有）：

```less
/* 左上角 Logo:透明底 PNG,反白处理以适配绿色渐变背景 */
.page-logo {
  position: fixed;
  top: 26px;
  left: 28px;
  width: 150px;
  height: auto;
  z-index: 100;
  pointer-events: none;
  filter: brightness(0) invert(1);  /* 反白,绿色背景上显示白色 logo */
}

@media (max-width: 768px) {
  .page-logo { width: 110px; top: 18px; left: 18px; }
}
@media (max-width: 480px) {
  .page-logo { width: 90px; top: 14px; left: 14px; }
}
```

> 如果只改 HTML class 不改 CSS，logo 会按原图尺寸显示，导致过大或位置错误。

**模板改动 2 — 删除顶部 header-links 整块**：

删除从 `<!-- Header Links - Top Right -->` 开始到 `</div>` 结束的整个 `<div class="header-links">` 块，包含：
- 官方网站链接（`weknora.weixin.qq.com`）
- GitHub 链接（`github.com/Tencent/WeKnora`）
- 语言切换下拉框（`language-switch`）

> 品牌定制不需要这些外链入口，统一从登录页移除。

**模板改动 3 — 删除左侧 showcase 整个区域**（展示区 + 轮播都删）：

0.8.3 把原来的「左侧展示区 + 右侧表单」双栏布局，改为**登录页居中单栏布局**——品牌名 + 表单垂直排列。整个 `.showcase-section`（含轮播、特性标签、描述文本）全部删除，替换为 `.login-center > .brand` 文字品牌块。

```diff
 <div class="login-layout">
   <div class="animated-bg">...</div>
   <img class="page-logo" src="@/assets/img/innowork.png" alt="InnoWork">

-  <!-- Left Showcase Section -->
-  <div class="showcase-section">
-    <div class="showcase-content">
-      <p class="showcase-subtitle">...</p>
-      <p class="showcase-description">...</p>
-      <div class="feature-tags">...</div>
-      <div class="carousel-container">
-        <swiper ...>...</swiper>
-      </div>
-    </div>
-  </div>
-
-  <!-- Right Form Section -->
-  <div class="form-section">
-    <div class="form-panel">...
+  <main class="login-center">
+    <!-- Brand - 文字品牌名 -->
+    <div class="brand">
+      <h1 class="brand-name">{{ brandName }}</h1>
+      <p class="brand-tagline">{{ $t('platform.subtitle') }}</p>
+    </div>
+
+    <div class="form-panel">...
```

> **注意 1**：不需要 `.form-section` 包裹层，`login-center` 直接包含 `form-panel`。
> **注意 2**：这个改动同时要清掉所有 swiper 相关的 import（`Swiper`, `Autoplay`, `EffectFade`, `Pagination`, CSS）、截图图片 import（`screenshot1-4.svg`）、`modules` / `slides` 数据变量。
> **注意 3**：同时删除登录/注册表单内部的 `.login-features` 特性列表块（含 3 个 `.feature-item`：✓ 多模态解析 / 混合搜索引擎 / RAG问答 等），0.8.3 也已经移除了这些营销性质的标签。

**CSS 改动 4 — 新增 `.login-center` / `.brand` 布局样式 + login-layout 调整**：

```less
/* login-layout: 使用 flex-start + padding-top 控制位置,避免内容溢出产生滚动条 */
.login-layout {
  display: flex;
  align-items: flex-start;      /* 不要用 center,会导致内容过多时溢出 */
  justify-content: center;
  padding: 10vh 20px 20px;     /* 顶部留 10vh 让整体下移,无滚动条 */
  box-sizing: border-box;
  overflow: hidden;
}

.login-center {
  width: 100%;
  max-width: 460px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand {
  text-align: center;
  margin-bottom: 32px;

  .brand-name {
    margin: 0;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  }

  .brand-tagline {
    margin: 10px 0 0;
    font-size: var(--app-text-md);
    color: rgba(255, 255, 255, 0.85);
  }
}

/* form-panel 已在原 0.9.0 代码中存在,max-width 480px */
.form-panel {
  width: 100%;
  max-width: 480px;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
}
```

> 同时删除旧的 `.showcase-section`、`.showcase-content`、`.showcase-subtitle`、`.showcase-description`、`.feature-tags`、`.tag`、`.carousel-container`、`.screenshot-swiper`、`.slide-content`、`.slide-image`、`.form-section`、`.login-features`、`.feature-item` 等 CSS 块，以及响应式断点和暗色模式中的对应残留。

**脚本改动 1 — 品牌常量**（在 import 之后添加）：

```ts
// 品牌名(定制占位,替换正式名称时只需改这一处)
const brandName = 'InnoWork'
```

**脚本改动 2 — 默认语言强制中文**（在业务逻辑 `onMounted(async () => {` 开头插入）：

```ts
onMounted(async () => {
  // 未显式保存过语言偏好时,登录页强制使用简体中文
  if (!localStorage.getItem('locale')) {
    locale.value = 'zh-CN'
  }

  // ... 原有业务逻辑
})
```

### 3.5 `src/views/creatChat/creatChat.vue`（新建对话页欢迎区）

**模板改动**（title 外层包上 dialogue-hero + mascot-wrap）：

```diff
+            <div class="dialogue-hero">
+                <!-- 云朵玩偶动画(引用自 PI-Desktop 欢迎页吉祥物,GIF 自带挥手动效) -->
+                <div class="mascot-wrap" aria-hidden="true">
+                    <img class="mascot mascot-light" src="@/assets/img/home-mascot-light.gif" alt="" draggable="false">
+                    <img class="mascot mascot-dark" src="@/assets/img/home-mascot-dark.gif" alt="" draggable="false">
+                </div>
-            <div class="dialogue-title" style="--wails-draggable: drag">
-                <span style="--wails-draggable: drag">{{ $t('createChat.title') }}</span>
-            </div>
+                <div class="dialogue-title" style="--wails-draggable: drag">
+                    <span style="--wails-draggable: drag">{{ $t('createChat.title') }}</span>
+                </div>
+            </div>
```

**样式改动**（在 `.dialogue-title` 之前插入）：

```less
.dialogue-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.mascot-wrap {
    width: 100px;
    height: 100px;
    flex: 0 0 auto;
    overflow: hidden;
    user-select: none;
}

.mascot {
    display: none;
    width: 100px;
    height: 100px;
    object-fit: contain;
    pointer-events: none;
    -webkit-user-drag: none;
}

.mascot-light {
    display: block;
}

html[theme-mode="dark"] .mascot-light {
    display: none;
}

html[theme-mode="dark"] .mascot-dark {
    display: block;
}
```

### 3.6 `src/views/settings/Settings.vue`（设置菜单隐藏）

**在 `isSectionSupported` 函数之前插入**：

```ts
// 品牌定制：不展示 Ollama、WeKnora Cloud 设置页面与 Skill、CLI 集成页面
const HIDDEN_SECTIONS = new Set(['ollama', 'weknoracloud', 'integration-claw', 'integration-cli'])
```

**在 `isSectionSupported` 函数开头插入检查**：

```diff
 const isSectionSupported = (key: string): boolean => {
+  if (HIDDEN_SECTIONS.has(key)) return false
   if (isIntegrationSection(key)) {
```

> 当前保留显示 chrome（浏览器插件）。如后续需要隐藏，把 `'integration-chrome'` 加进 Set 即可。

### 3.7 `src/config/integrations.ts`（集成预览隐藏）

**`INTEGRATION_PREVIEW_ITEMS` 只保留 4 项**，移除 cli / chrome / claw：

```ts
export const INTEGRATION_PREVIEW_ITEMS = [
  { key: 'im', icon: { type: 'icon', name: 'chat-message' } },
  { key: 'embed', icon: { type: 'icon', name: 'code' } },
  { key: 'api', icon: { type: 'icon', name: 'secured' } },
  { key: 'mcpserver', icon: { type: 'icon', name: 'tools' } },
  // { key: 'chrome', icon: { type: 'icon', name: 'extension' } },  // 可恢复
]
```

> 注意：`INTEGRATION_TABS`（类型定义）保持 7 项不变，只改预览列表。chrome 当前已恢复显示。

### 3.8 `src/i18n/locales/*.ts`（品牌文案定制，6 个语言文件）

以下两个 i18n key 在 6 个语言文件中**必须一起改**，是 0.8.3 定制版的品牌文案：

#### key 1: `platform.subtitle`（登录页品牌名「InnoWork」下方副标题）

| 语言 | 原值（0.9.0） | 新值（品牌定制） |
|---|---|---|
| zh-CN | `大模型驱动的企业级知识框架` | `AI 驱动的智能体工作平台` |
| zh-TW | `大型語言模型驅動的企業級知識框架` | `AI 驅動的智慧代理工作平台` |
| en-US | `LLM-Powered Enterprise Knowledge Framework` | `AI-Powered Agent Workspace` |
| ja-JP | `LLM駆動のエンタープライズ向けナレッジフレームワーク` | `AI 駆動のエージェント作業プラットフォーム` |
| ko-KR | `대규모 언어 모델 기반 엔터프라이즈 지식 프레임워크` | `AI 기반 에이전트 작업 플랫폼` |
| ru-RU | `Корпоративная платформа знаний на базе больших языковых моделей` | `Платформа работы с ИИ-агентами` |

#### key 2: `auth.subtitle`（登录表单标题「登录」下方副标题）

| 语言 | 原值（0.9.0） | 新值（品牌定制） |
|---|---|---|
| zh-CN | `RAG 问答、ReAct 智能体与 Wiki 知识库，大模型驱动的企业级知识框架` | `用 AI 助手与智能体自动化处理任务、检索知识、协同办公` |
| zh-TW | `RAG 問答、ReAct 智慧代理與 Wiki 知識庫，大型語言模型驅動的企業級知識框架` | `用 AI 助手與智慧代理自動化處理任務、檢索知識、協同辦公` |
| en-US | `RAG Q&A, ReAct Agent and Wiki — an LLM-powered enterprise knowledge framework` | `Automate tasks, retrieve knowledge and collaborate with AI assistants and agents` |
| ja-JP | `RAG質問応答、ReActエージェント、Wiki。LLMが支える企業向けナレッジフレームワーク` | `AI アシスタントとエージェントでタスク自動化、知識検索、協働作業` |
| ko-KR | `RAG Q&A, ReAct 에이전트, Wiki 지식베이스 — 대규모 언어 모델 기반 엔터프라이즈 지식 프레임워크` | `AI 어시스턴트와 에이전트로 작업 자동화, 지식 검색, 협업` |
| ru-RU | `RAG, ReAct-агент и Wiki — корпоративный фреймворк знаний на основе больших моделей` | `Автоматизация задач, поиск знаний и совместная работа с ИИ-помощниками и агентами` |

> **快速定位**：在各语言文件中搜索 `platform: {` 和 `auth: {` 找到对应对象，修改 `subtitle` 字段即可。注意 `auth.subtitle` 在不同语言文件里的位置可能不同——en-US/ja-JP 在文件中部（~L3036），zh-CN/zh-TW/ko-KR/ru-RU 在文件尾部（~L6687）。

---

## 四、升级到新版本时的操作顺序

1. **拉取上游新版本代码**（覆盖 frontend 目录）
2. **对比静态资源**：确认上游是否新增了需要替换的 logo / gif / svg
3. **复制定制资源**：`innowork.png`、`home-mascot-*.gif` 复制到新项目
4. **逐文件应用 Login.vue 修改**：按 3.4 清单改，**注意同时改模板 + 脚本 + CSS + 清理残留**
5. **逐文件应用其他组件修改**：3.1~3.3、3.5、3.6、3.7
6. **i18n 品牌替换**（6 个语言文件）：
   - 全局替换 WeKnora → InnoWork（跳过不可替换清单）
   - 按 3.8 节修改 `platform.subtitle` 和 `auth.subtitle` 两个 key（必须逐文件手动改，因为每个语言新值不同）
7. **功能隐藏配置**：Settings.vue `HIDDEN_SECTIONS` + integrations.ts `INTEGRATION_PREVIEW_ITEMS`
8. **验证**：启动 dev server，逐个页面检查品牌显示、隐藏功能、登录页布局（无滚动条）、明暗主题吉祥物切换

---

## 五、已验证不需要改动的文件

| 文件 | 原因 |
|---|---|
| `src/assets/theme/theme.css` | 上游和定制版都是绿色品牌色主题，完全一致 |
| `src/views/settings/WeKnoraCloudSettings.vue` | 已在 HIDDEN_SECTIONS 中隐藏，无需改内部文案 |
| `src/views/settings/SystemInfo.vue` | i18n 已覆盖所有显示文本 |
| `src/assets/img/` 下其他图标 | 功能图标，不涉及品牌 |

---

## 六、定制版本信息

| 项目 | 值 |
|---|---|
| 上游基准版本 | WeKnora 0.9.0 |
| 品牌名 | InnoWork |
| 隐藏的设置页 | ollama、weknoracloud、integration-claw、integration-cli |
| 隐藏的集成预览 | cli、claw（chrome 已恢复显示） |
| 新增的欢迎页元素 | 云朵吉祥物 GIF（明/暗双主题） |
| 登录页布局 | 单栏居中（品牌名 + 表单），无 showcase / 轮播 / 特性标签 |
| 登录页位置 | `login-layout { align-items: flex-start; padding: 10vh 20px 20px }` 防滚动条 |
| 登录页副标题（品牌名下方） | `platform.subtitle` = 「AI 驱动的智能体工作平台」 |
| 登录页副标题（表单下方） | `auth.subtitle` = 「用 AI 助手与智能体自动化处理任务、检索知识、协同办公」 |

---

## 七、常见陷阱（升级时别再犯）

| 陷阱 | 说明 |
|---|---|
| **只改 HTML 不改 CSS** | `header-logo` → `page-logo` 必须同步加 `.page-logo` 样式块（含响应式 + 反白滤镜），否则 logo 按原图尺寸显示会过大 |
| **模板改了不关闭合标签** | 删 showcase-section 改布局时多留一个 `</div>` 或少关一个，Vue 会报 "Element is missing end tag"，改完一定要 `GetDiagnostics` |
| **只改模板不清 CSS 残留** | swiper import / 截图图片 / `.showcase-section` / `.login-features` / `.form-section` / `.form-section` / `.feature-item` 等残留样式必须一起删，否则可能有看不见的溢出或暗色模式样式干扰 |
| **用 `align-items: center` + 内容** | 内容多时会超出 viewport 产生滚动条，用 `flex-start` + `padding-top: 10vh` 更安全 |
| **忘了改 `auth.subtitle`** | 它和 `platform.subtitle` 是两个不同的 key，分别在品牌名下方和表单标题下方，必须同时改 |
| **`{brand}` 占位符** | `firstTime` / `registerSubtitle` 等 key 已经用 `{brand}` 占位，不要硬编码 InnoWork，方便下次换品牌名 |
