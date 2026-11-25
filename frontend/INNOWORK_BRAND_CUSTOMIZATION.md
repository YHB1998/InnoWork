# InnuovoWork 品牌定制迁移指南

> 本文档记录了从 WeKnora 上游版本定制为 InnuovoWork 品牌时的所有改动项。
> 当前上游版本：**0.9.0**，定制目标：InnuovoWork 品牌 + UI 调整 + 功能隐藏。
> 下次升级上游版本（如 1.0.x）时，对照本文档逐条应用即可。

---

## 一、静态资源文件（需新增/替换）

| 操作 | 目标路径 | 来源 | 说明 |
|---|---|---|---|
| **新增** | `src/assets/img/innuovowork.png` | 设计提供 | InnuovoWork Logo：透明底 PNG，绿色迷你四角星 + 深海军蓝 `Innuovo` + 品牌绿 `Work`，1718×283px。替换原 `weknora.png` / `innowork.png` |
| **新增** | `src/assets/img/home-mascot-light.gif` | `frontend-v1` | 新建对话页吉祥物（亮色模式），GIF 自带挥手动效 |
| **新增** | `src/assets/img/home-mascot-dark.gif` | `frontend-v1` | 新建对话页吉祥物（暗色模式），GIF 自带挥手动效 |
| **替换** | `public/favicon.ico` | `frontend-v1` | 浏览器标签页图标，替换原 WeKnora favicon |

> `weknora.png` 保留在项目中，部分未改造的内部组件仍会引用。
> logo 文件历史：`weknora.png` → `innowork.png`（229741 bytes，深蓝渐变 + 金色点缀）→ `innuovowork.png`（1718×283，迷你星形 + 双色文字）。文件名改了之后，menu.vue 和 Login.vue 的 `<img src>` 必须同步更新。

---

## 二、品牌文案替换（6 个语言文件 × N 处）

以下 6 个文件中，**所有显示给用户看的** `WeKnora` / `WeKnoraCloud` / `WeKnoraCloud` 都要替换为 `InnuovoWork` / `InnuovoWork Cloud` / `InnuovoWorkCloud`：

- `src/i18n/locales/en-US.ts`
- `src/i18n/locales/zh-CN.ts`
- `src/i18n/locales/zh-TW.ts`
- `src/i18n/locales/ja-JP.ts`
- `src/i18n/locales/ko-KR.ts`
- `src/i18n/locales/ru-RU.ts`

### 替换规则

| 模式 | 替换为 | 说明 |
|---|---|---|
| `WeKnora`（显示字符串） | `InnuovoWork` | 品牌名 |
| `WeKnora Cloud`（显示字符串） | `InnuovoWork Cloud` | 云服务名 |
| `WeKnoraCloud`（显示字符串） | `InnuovoWorkCloud` | 无空格的拼法 |
| `WeKnora standard template` | `InnuovoWork standard template` | 沙箱模板名 |
| `WeKnora desktop template` | `InnuovoWork desktop template` | 沙箱模板名 |
| `WeKnora standard image` | `InnuovoWork standard image` | 沙箱镜像名 |
| `weknora-app` | `innuovowork-app` | 版本描述中的服务名 |
| `weknora-ui` | `innuovowork-ui` | 版本描述中的 UI 名 |
| `WeKnora CLI` | `InnuovoWork CLI` | 产品名 |
| `WeKnora Skill` | `InnuovoWork Skill` | 产品名 |
| 本地化文本中的 WeKnora | InnuovoWork | 按语言自然替换 |

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
const brandName = 'InnuovoWork'
```

i18n 中对应的键值改为：
- `首次使用 {brand}？` / `New to {brand}?`
- `创建账户并开始使用 {brand}` / `Create your account and start using {brand}`

---

## 三、单文件修改清单

### 3.1 `index.html`

```diff
-    <title>WeKnora</title>
+    <title>InnuovoWork</title>

-    <meta name="description" content="WeKnora是一款基于大语言模型的文档理解与语义检索框架，专为结构复杂、内容异构的文档场景而打造。"/>
+    <meta name="description" content="InnuovoWork是一款AI驱动的智能体工作平台，让智能体帮你完成任务执行、知识检索与内容创作，全面提升工作效率。"/>
```

### 3.2 `embed.html`

```diff
-    <title>WeKnora Embed</title>
+    <title>InnuovoWork Embed</title>
```

### 3.3 `src/components/menu.vue`（侧边栏 Logo）

```diff
-<img class="logo" src="@/assets/img/weknora.png" alt="">
+<img class="logo" src="@/assets/img/innuovowork.png" alt="InnuovoWork">
```

### 3.4 `src/views/auth/Login.vue`（登录页）

**模板改动 1 — Logo 替换**：

```diff
-    <!-- Logo - Top Left -->
-    <a href="https://github.com/Tencent/WeKnora" target="_blank" class="header-logo" :title="$t('common.github')">
-      <img src="@/assets/img/weknora.png" alt="WeKnora" class="logo-image" />
-    </a>
+    <!-- Logo - Top Left -->
+    <img class="page-logo" src="@/assets/img/innuovowork.png" alt="InnuovoWork">
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
   <img class="page-logo" src="@/assets/img/innuovowork.png" alt="InnuovoWork">

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
const brandName = 'InnuovoWork'
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

> **0.9.1 迁移修正记录**：本节改动在 0.9.1 首次迁移时实现有误——动画被放在标题**下方**、尺寸 `min(280px, 60vw)`，并用 `useTheme` + `isDark` computed + `:src` 绑定切换 GIF。已按 0.9.0 参考代码重新修正为上述结构（动画在标题**正上方**、100×100、双 `<img>` 纯 CSS 主题切换），同时删除了 `isDark` / `currentTheme` / `homeMascotLight` / `homeMascotDark` 等脚本残留和 `.mascot-img`、`:global([theme-mode="dark"])` 旧样式块。
> 修正后与 0.9.0 版全文件 diff 仅剩一处无功能差异：CSS 块顺序不同（0.9.1 中 `.dialogue-title` 在 `.dialogue-hero` 之前），不影响渲染，可保留。

### 3.6 `src/views/settings/Settings.vue`（设置菜单隐藏）

**在 `isSectionSupported` 函数之前插入**：

```ts
// 品牌定制：不展示 Ollama、WeKnora Cloud 设置页面、Skill / CLI 集成页面，
// 以及版本信息（系统信息）页面
const HIDDEN_SECTIONS = new Set(['ollama', 'weknoracloud', 'integration-claw', 'integration-cli', 'system'])
```

**在 `isSectionSupported` 函数开头插入检查**：

```diff
 const isSectionSupported = (key: string): boolean => {
+  if (HIDDEN_SECTIONS.has(key)) return false
   if (isIntegrationSection(key)) {
```

> 当前保留显示 chrome（浏览器插件）。如后续需要隐藏，把 `'integration-chrome'` 加进 Set 即可。
>
> `'system'` 对应「平台 → 版本信息」页（`SystemInfo.vue`）。加入后该导航项不再渲染，且「平台」分组只剩这一项，会整组消失；通过旧链接 `?section=system` 直达时会回退到第一个可见设置页。注意不要误伤系统管理员的「系统设置」页——它的 key 是 `system-global`，不受影响。

### 3.7 `src/config/integrations.ts`（集成预览隐藏）

**`INTEGRATION_PREVIEW_ITEMS` 只保留 2 项**，移除 api / cli / chrome / claw / mcpserver：

```ts
export const INTEGRATION_PREVIEW_ITEMS = [
  { key: 'im', icon: { type: 'icon', name: 'chat-message' } },
  { key: 'embed', icon: { type: 'icon', name: 'code' } },
  // { key: 'api', icon: { type: 'icon', name: 'secured' } },  // 可恢复
  // { key: 'mcpserver', icon: { type: 'icon', name: 'tools' } },  // 可恢复
  // { key: 'chrome', icon: { type: 'icon', name: 'extension' } },  // 可恢复
]
```

> 注意：`INTEGRATION_TABS`（类型定义）保持 7 项不变，只改预览列表。
>
> **mcpserver / api 均已隐藏**（设置「发布集成」页不再出现 MCP Server 与 API 集成入口，只剩 IM 渠道 / 嵌入）。由于 `INTEGRATION_TABS` 仍含 `mcpserver`、`api`，仅用于路由校验——直接输入 URL 仍可访问；如需连 URL 一并封死，须同时从 `INTEGRATION_TABS` 与 `INTEGRATION_TAB_CAPABILITY` 中移除对应 key。`INTEGRATION_TAB_MIN_ROLE.api = 'owner'` 保留未删，不影响隐藏效果。

### 3.8 `src/components/UserMenu.vue`（用户弹窗隐藏帮助与 GitHub 按钮）

点击右上角头像弹出的菜单底部，原本有「帮助与文档」和「GitHub（带 star 角标）」两个外链入口，品牌定制时移除。

**模板改动**：删除菜单底部的两个 `.menu-item` 块以及它们上方的分隔线：

```diff
         <div v-if="authStore.isSystemAdmin" class="menu-item" @click="handleSystemAdmin">
           <t-icon name="server" class="menu-icon" />
           <span>{{ $t('settings.navGroups.systemAdministration') }}</span>
         </div>
-        <div class="menu-divider"></div>
-        <div class="menu-item" @click="openDocs">
-          <t-icon name="help-circle" class="menu-icon" />
-          <span class="menu-text-with-icon">
-            <span>{{ $t('general.helpAndDocs') }}</span>
-            <svg class="menu-external-icon" ... />
-          </span>
-        </div>
-        <div class="menu-item" :title="$t('common.githubStarTip')" @click="openGithub">
-          <t-icon name="logo-github" class="menu-icon" />
-          <span class="menu-text-with-icon">
-            <span>{{ $t('common.github') }}</span>
-            <t-icon name="star-filled" class="menu-github-star-icon" size="16px" aria-hidden="true" />
-            <svg class="menu-external-icon" ... />
-          </span>
-        </div>
         <template v-if="!authStore.isLiteMode">
           <div class="menu-divider"></div>
           <div class="menu-item danger" @click="handleLogout">
```

**清理残留**（可选）：
- 脚本中的 `openDocs()` 与 `openGithub()` 两个函数（L515-L524）变成死代码，可一并删除
- `.menu-github-star-icon` CSS 样式块（L1078+）也不再被引用，可删

### 3.9 仓库根 `.gitattributes` + `.gitignore`（CRLF 防御）

**背景**：Windows 下 Git `core.autocrlf=true` 会把 `*.sh` 文件从仓库 LF 自动转成 CRLF 再 checkout，Docker build COPY 到容器内后 Linux 内核解析 shebang 失败（`#!/bin/sh\r` → 找不到 `/bin/sh\r`），报 `exec /docker-entrypoint.sh: no such file or directory`。**这不是脚本 BOM/CRLF 的一次性修复，而是仓库级别的防线**——上游拉代码后也必须保留。

**新增** `.gitattributes`（仓库根目录），强制 shell / docker / 源码文件在所有平台保持 LF：

```gitattributes
# Shell scripts must stay LF so Linux containers execute the shebang correctly.
*.sh text eol=lf
*.cmd text eol=lf
*.ps1 text eol=lf

# Frontend source
*.vue text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.js text eol=lf
*.json text eol=lf
*.css text eol=lf
*.html text eol=lf

# Backend source
*.go text eol=lf
*.py text eol=lf
*.yaml text eol=lf
*.yml text eol=lf
*.md text eol=lf

# Docker
Dockerfile text eol=lf
docker-entrypoint.sh text eol=lf
```

**修改** `.gitignore` 白名单——原 `.*` 规则会把 `.gitattributes` 也吞掉，必须显式放行：

```diff
 # 但不忽略特定隐藏文件和目录
 !.env.example
 !.gitignore
+!.gitattributes
 !.github/
```

> 已提交到 GitHub 的 commit `c4329eb`（message: `fix(docker): prevent CRLF corruption of shell scripts on Windows`）就是这两项改动的来源。

### 3.10 `src/i18n/locales/*.ts`（品牌文案定制，6 个语言文件）

以下两个 i18n key 在 6 个语言文件中**必须一起改**，是 0.8.3 定制版的品牌文案：

#### key 1: `platform.subtitle`（登录页品牌名「InnuovoWork」下方副标题）

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

#### key 3: `createChat.title`（新建对话页欢迎区标题，吉祥物上方）

模板 `creatChat.vue` 里的 `.dialogue-title` 绑定的就是这个 key。上游原版是"自我介绍"式的欢迎语，品牌定制改为"今天想在 InnuovoWork 里做点什么？"这种行动引导句式，en-US 和 ko-KR 上游已是此句式，其他语言文件需要改。

| 语言 | 原值（0.9.0） | 新值（品牌定制） |
|---|---|---|
| zh-CN | `Hi，我是 InnoWork，让你的知识触手可及` | `今天想在 InnuovoWork 里做点什么？` |
| zh-TW | `Hi，我是 InnoWork，讓你的知識觸手可及` | `今天想在 InnuovoWork 裡做點什麼？` |
| en-US | `What would you like to do in InnuovoWork today?` | 已是目标句式，保持不变 |
| ja-JP | `こんにちは、InnoWorkです。あなたのナレッジを、すぐそばに` | `今日は InnuovoWork で何をしますか？` |
| ko-KR | `오늘 InnuovoWork에서 무엇을 할까요?` | 已是目标句式，保持不变 |
| ru-RU | `Привет, я InnoWork — ваши знания всегда под рукой` | `Чем вы хотите заняться в InnuovoWork сегодня?` |

> **快速定位**：搜索 `createChat: {` 找到该对象（en-US/ja-JP ~L3388，zh-CN/zh-TW/ko-KR/ru-RU ~L6340），改 `title` 字段。

> **快速定位**：在各语言文件中搜索 `platform: {` 和 `auth: {` 找到对应对象，修改 `subtitle` 字段即可。注意 `auth.subtitle` 在不同语言文件里的位置可能不同——en-US/ja-JP 在文件中部（~L3036），zh-CN/zh-TW/ko-KR/ru-RU 在文件尾部（~L6687）。

### 3.11 默认智能体切换为"智能推理"（隐藏快速问答后的必改项）

品牌定制后快速问答（`builtin-quick-answer`）已被管理员停用/隐藏，用户下拉里只剩智能推理一个内置选项。但代码中有**十几处** fallback 硬编码成 `BUILTIN_QUICK_ANSWER_ID`，导致：

- 新用户 / localStorage 无 `selectedAgentId` → 选中"不存在"的快速问答
- 切换空间时 `clearTenantScopedClientState` 重置回快速问答
- `agent-mode.ts` 里判断管线的函数默认走 RAG 管线而非 Agent 管线

**修复**：所有 fallback 统一改为 `BUILTIN_SMART_REASONING_ID`。

#### 需要改的生产文件（5 文件）

| 文件 | 改动 |
|---|---|
| `src/stores/settings.ts` | `defaultSettings.selectedAgentId` 初始值 + `isQuickAnswerMode` / `selectedAgentId` getter + `getSelectedAgentId()` method，共 4 处 |
| `src/stores/auth.ts` | `clearTenantScopedClientState` 里重置 localStorage 的 `selectedAgentId`（同时 `BUILTIN_QUICK_ANSWER_ID` import → `BUILTIN_SMART_REASONING_ID`） |
| `src/utils/agent-mode.ts` | 4 个函数（`isQuickAnswerAgentId` / `isAgentStreamAgentId` / `customAgentStreamMode` / `reconcileBuiltinAgentMode`）的 fallback，文件重写 |
| `src/components/Input-field.vue` | `selectedAgentId` computed getter + `selectedAgent` 兜底对象（id/name/agent_mode 一起改）+ `ensureSelectedAgentNotDisabled` 的 `currentId` fallback，共 3 处 |

#### 需要同步改的测试文件（2 文件，避免测试行为不一致挂掉）

| 文件 | 改动 |
|---|---|
| `src/stores/settingsStorage.test.mjs` | `reconcileBuiltinAgentMode` fallback + `makeDefaults` 的 `isAgentEnabled`（`false`→`true`）和 `selectedAgentId` |
| `src/utils/agent-mode.test.mjs` | 3 个函数的 fallback + `isQuickAnswerAgentId(undefined)` 断言从 `true` 改为 `false` |

#### 关键注意点

1. **不要动 `selectAgent` 方法里的显式判断**（L470-474）——那是用户主动选择智能体后的 `isAgentEnabled` 同步，不是 fallback，改了会影响正常切换逻辑
2. **不要改 `ensureSelectedAgentNotDisabled` 里的兜底优先级**——它本来就是"智能推理 → 快速问答 → 第一个可用"，刚好符合定制后的期望
3. **auth.ts 的 import 必须同步改**——只换变量名不换 import 会产生 `找不到名称 "BUILTIN_SMART_REASONING_ID"` 的 TypeScript 错误
4. **老用户兼容**——localStorage 里已存 `builtin-quick-answer` 的用户不会被强制覆盖（尊重用户已存偏好），但空间切换时会被重置到 smart-reasoning
5. **兜底对象的 i18n key 别写错**——改 Input-field.vue 兜底对象的 `name` 时，`input` 命名空间下"智能推理"对应的 key 是 `input.agentMode`，**不是** `input.smartReasoning`（后者在 `search` 命名空间，不在 `input` 下）。写错的话下拉里会显示原始 key 名 `input.smartReasoning` 而不是翻译文本

#### 智能体模式相关 i18n key 速查

`input` 命名空间下的 key（zh-CN / en-US）：

| key | zh-CN | en-US | 说明 |
|---|---|---|---|
| `input.normalMode` | 快速问答 | Quick Answer | RAG 模式（品牌定制已隐藏） |
| `input.normalModeDesc` | 基于知识库的 RAG 问答 | Knowledge base RAG Q&A | 描述 |
| `input.agentMode` | **智能推理** | Smart Reasoning | Agent 模式（品牌定制默认） |
| `input.agentModeDesc` | 多步思考，深度分析 | Multi-step thinking, deep analysis | 描述 |

> 注意：`smartReasoning` 这个 key 确实存在，但在 `search` 命名空间下（用于搜索页的引擎选择），和这里无关。别搞混。

**验证**：所有 fallback 改完后 grep `\|\| BUILTIN_QUICK_ANSWER_ID`（生产代码）应返回 0 条。

### 3.12 `src/components/AgentSelector.vue`（内置智能体名称透传后端配置）

**背景**：品牌定制后后端可能会修改内置智能体的名称（如 `builtin-smart-reasoning` 改名为"默认智能体"），但前端 `AgentSelector.vue` 的 `builtinAgents` computed 会**无条件覆盖**后端返回的 name/description：

```js
// 改前：不管后端配了什么名字，强制覆盖成 i18n 硬编码
return { ...agent, name: t('input.agentMode'), description: t('input.agentModeDesc') };
```

**结果**：AgentSelector 下拉卡片里永远显示"智能推理"（i18n），永远不会显示后端配置的"默认智能体"。但 Input-field 顶部按钮却正确显示——因为它走的是 `selectedAgent` computed，直接使用 API 原始数据，**没经过** AgentSelector 这层覆盖。同一个内置智能体在两个地方显示不同名字，非常困惑。

**修复**：只有当后端返回空字符串时才 fallback 到 i18n 默认值，否则让后端配置的名字透传：

```diff
- return { ...agent, name: t('input.normalMode'), description: t('input.normalModeDesc') };
+ return {
+   ...agent,
+   name: agent.name?.trim() || t('input.normalMode'),
+   description: agent.description?.trim() || t('input.normalModeDesc'),
+ };

- return { ...agent, name: t('input.agentMode'), description: t('input.agentModeDesc') };
+ return {
+   ...agent,
+   name: agent.name?.trim() || t('input.agentMode'),
+   description: agent.description?.trim() || t('input.agentModeDesc'),
+ };
```

两处 builtin 分支（快速问答 + 智能推理）都一样处理。

**为什么不能直接删掉 map 覆盖**：如果上游后端某些环境确实不返回 name（返回空字符串或 null），直接透传会导致下拉里是空的。保留 fallback 是对的，只是不能**无条件覆盖**。

### 3.13 `src/views/agent/AgentEditorModal.vue`（新建智能体默认值定制）

**背景**：上游新建智能体时有三处默认值与品牌定制后的期望不符：类型默认 `rag-qa`（会自动带入 RAG 系统提示词 / 检索工具 / 知识库范围）、长期记忆默认开启、「基础」分组工具默认全部不勾选。定制后统一改为：类型「自定义」、长期记忆关闭、基础工具默认勾选，让新建表单更"干净"，由用户按需开启。

#### 改动 1 — 智能体类型默认「自定义」

```diff
-    // 智能推理下的类型预设：新建 agent 时默认给 RAG 问答（最常用场景）。
-    // 编辑既有 agent 时会被 agent 自己保存的 agent_type 覆盖。
-    agent_type: 'rag-qa' as AgentType,
+    // 智能推理下的类型预设：新建 agent 时默认给「自定义」，由用户自行选择
+    // 工具 / 提示词 / 知识库；编辑既有 agent 时会被其保存的 agent_type 覆盖。
+    agent_type: 'custom' as AgentType,
```

#### 改动 2 — 长期记忆默认关闭

```diff
-    // 长期记忆：默认跟随空间设置。写 true 与不写等价，只有 false 才会
-    // 让这个智能体单独不读记忆。
-    memory_enabled: true,
+    // 长期记忆：品牌定制后新建 agent 默认关闭，用户需要时再手动打开。
+    // 编辑既有 agent 时会被其保存的值覆盖。
+    memory_enabled: false,
```

#### 改动 3 — 基础 + 知识库工具默认勾选

「基础」分组 4 个工具（`thinking` 思考 / `todo_write` 制定计划 / `ask_user` 向用户提问 / `search_conversations` 回顾历史对话）+「知识库检索（RAG）」分组 4 个工具（`search_knowledge` 检索知识库 / `read_document` 阅读文档 / `list_documents` 浏览文档列表 / `query_knowledge_graph` 查询知识图谱），默认全部勾选：

```diff
-    allowed_tools: [] as string[],
+    // 品牌定制：新建 agent 默认勾选「基础」分组的 4 个工具
+    // （思考 / 制定计划 / 向用户提问 / 回顾历史对话）以及「知识库检索（RAG）」
+    // 分组的 4 个工具（检索知识库 / 阅读文档 / 浏览文档列表 / 查询知识图谱），
+    // 省去每次手动勾选。
+    allowed_tools: [
+      'thinking', 'todo_write', 'ask_user', 'search_conversations',
+      'search_knowledge', 'read_document', 'list_documents', 'query_knowledge_graph',
+    ] as string[],
```

> `thinking` / `todo_write` 会显著增加 token 消耗（上游注释特意默认不勾选）。如果只想默认勾「向用户提问」和「回顾历史对话」，从数组里删掉前两个即可。
>
> `query_knowledge_graph` 需要图谱索引（`allOf: ['graph']`）。没有图谱知识库时该卡片会置灰并显示不满足原因，勾选状态仍会随表单保存；运行时由工具注册器按能力过滤，不会真的调用到不可用的工具。`read_document` / `list_documents` 属于辅助工具（`auxiliary`），没有知识库时同样置灰。

**联动逻辑（无需额外改）**：
- 初始化新建表单时，`if (defaultTypeId && defaultTypeId !== 'custom')` 已显式跳过预设应用，所以 `custom` 不会自动填充系统提示词 / 工具。
- `custom` 在 `config/agent_type_presets.yaml` 中是没有 `config:` 块的空预设，因此切换类型时同样不会覆盖任何表单值。
- 编辑已有智能体时，表单会被该智能体保存的 `agent_type` / `memory_enabled` / `allowed_tools` 覆盖，不受这些默认值影响；旧数据缺 `memory_enabled` 时仍由既有兼容逻辑补成 `true`。
- 新建分支已把 `keepAllowedToolsUnset` 置为 `false`，基础工具列表会作为显式选择随表单提交，不会被当作"未设置"。

> 注意：这些默认值只在**新建**分支生效，位置都在 `defaultFormData` 里；不要只改下拉/开关的 UI 默认值，否则提交时仍会写入旧值。

### 3.14 `src/views/settings/TenantInfo.vue`（删除空间按钮仅系统管理员可见）

**背景**：上游"删除空间"按钮（危险操作区）对空间 Owner 可见，但品牌定制后希望仅平台系统管理员（`isSystemAdmin`）能看到，避免普通 Owner 误删空间。

**改动**：`showDeleteDangerZone` 计算属性的权限判断从 `hasRole('owner')` 改为 `isSystemAdmin`：

```diff
 const showDeleteDangerZone = computed(() => {
   if (loading.value || error.value || !tenantInfo.value) return false
   if (Number(tenantInfo.value.id) !== activeTenantNumericId.value) return false
-  return authStore.hasRole('owner')
+  return authStore.isSystemAdmin
 })
```

**注意**：前端只控制 UI 显示，服务端 `deleteTenant` 接口的权限校验不受影响。如后端仍允许普通 Owner 调用删除 API，需同步修改后端权限守卫。

### 3.15 默认智能体可由环境变量指定（含共享空间自动识别）

**背景**：3.11 把所有 fallback 从 `BUILTIN_QUICK_ANSWER_ID` 改到了 `BUILTIN_SMART_REASONING_ID`，但品牌定制希望能通过**环境变量**指定一个自定义智能体作为对话页面默认选中项，而且这个默认智能体如果是**跨空间共享**过来的，也要能正确识别并补 `sourceTenantId`。

#### 改动 1 — 新增 `resolveFallbackAgentId()` 统一入口（`src/utils/agent-mode.ts`）

在 agent-mode.ts 开头新增一个 `resolveFallbackAgentId()` 函数，统一封装"对话页面默认智能体"的解析逻辑：

```diff
+// 品牌定制：运行时/构建时配置的默认自定义智能体 ID（留空回退内置智能推理）
+
+/**
+ * 解析"对话页面默认智能体"的 fallback 值。
+ * 优先级链（参考项目 MAX_FILE_SIZE_MB / DEFAULT_LOCALE 等运行时配置模式）：
+ *   1. 运行时 window.__RUNTIME_CONFIG__.DEFAULT_CUSTOM_AGENT_ID（Docker 可动态改，重启容器生效）
+ *   2. 构建时 import.meta.env.VITE_DEFAULT_CUSTOM_AGENT_ID（Vite build 时注入）
+ *   3. 内置智能推理 BUILTIN_SMART_REASONING_ID（兜底）
+ *
+ * 运行时若返回的 agent 在当前空间不可用（被停用或根本不存在），
+ * ensureSelectedAgentNotDisabled 会自动纠偏回 BUILTIN_SMART_REASONING_ID，
+ * 此处无需关心可用性检查。
+ */
+export function resolveFallbackAgentId(): string {
+  const runtimeConfig = (typeof window !== 'undefined')
+    ? (window as Window & { __RUNTIME_CONFIG__?: Record<string, unknown> }).__RUNTIME_CONFIG__
+    : undefined
+  const runtime = typeof runtimeConfig?.DEFAULT_CUSTOM_AGENT_ID === 'string'
+    ? runtimeConfig.DEFAULT_CUSTOM_AGENT_ID.trim()
+    : ''
+  if (runtime) return runtime
+  const build = (import.meta.env.VITE_DEFAULT_CUSTOM_AGENT_ID as string | undefined)?.trim() || ''
+  if (build) return build
+  return BUILTIN_SMART_REASONING_ID
+}
```

#### 改动 2 — 4 个生产文件的 fallback 统一改用 `resolveFallbackAgentId()`

以下所有"agent ID 为空时的兜底"原来硬编码 `BUILTIN_SMART_REASONING_ID`（3.11 的结果），现在全部替换为 `resolveFallbackAgentId()`：

**`src/stores/settings.ts`（4 处）**

```diff
-import { BUILTIN_QUICK_ANSWER_ID, BUILTIN_SMART_REASONING_ID } from "@/api/agent";
+import { BUILTIN_QUICK_ANSWER_ID, BUILTIN_SMART_REASONING_ID } from "@/api/agent";
+import { isAgentStreamAgentId, resolveFallbackAgentId } from "@/utils/agent-mode";

  selectedAgentId: BUILTIN_SMART_REASONING_ID,  // 改默认值
+ selectedAgentId: resolveFallbackAgentId(),    // 默认智能体：env 指定的自定义智能体 > 内置智能推理

- (state.settings.selectedAgentId || BUILTIN_SMART_REASONING_ID) === BUILTIN_QUICK_ANSWER_ID
+ (state.settings.selectedAgentId || resolveFallbackAgentId()) === BUILTIN_QUICK_ANSWER_ID

- selectedAgentId: (state) => state.settings.selectedAgentId || BUILTIN_SMART_REASONING_ID,
+ selectedAgentId: (state) => state.settings.selectedAgentId || resolveFallbackAgentId(),

- return this.settings.selectedAgentId || BUILTIN_SMART_REASONING_ID;
+ return this.settings.selectedAgentId || resolveFallbackAgentId();
```

**`src/stores/auth.ts`（1 处 + import 换）**

```diff
-import { BUILTIN_SMART_REASONING_ID } from '@/api/agent'
+import { resolveFallbackAgentId } from '@/utils/agent-mode'
...
- parsed.selectedAgentId = BUILTIN_SMART_REASONING_ID
+ parsed.selectedAgentId = resolveFallbackAgentId()
```

**`src/utils/agent-mode.ts`（4 个函数的 fallback）**

`isQuickAnswerAgentId`、`isAgentStreamAgentId`、`customAgentStreamMode`、`reconcileBuiltinAgentMode` 四个函数里的 `agentId || BUILTIN_SMART_REASONING_ID` 全部改为 `agentId || resolveFallbackAgentId()`。

**`src/components/Input-field.vue`（2 处）**

```diff
+import { resolveFallbackAgentId } from '@/utils/agent-mode';
...
-  get: () => settingsStore.selectedAgentId || BUILTIN_SMART_REASONING_ID,
+  get: () => settingsStore.selectedAgentId || resolveFallbackAgentId(),
...
-  const currentId = settingsStore.selectedAgentId || BUILTIN_SMART_REASONING_ID
+  const currentId = settingsStore.selectedAgentId || resolveFallbackAgentId()
```

#### 改动 3 — 共享智能体自动识别（`src/components/Input-field.vue`，`ensureSelectedAgentNotDisabled`）

这是最关键的修复：`resolveFallbackAgentId()` 只返回 agent ID，但共享智能体还需要 `selectedAgentSourceTenantId`（源空间 ID）。原来的逻辑在补 `sourceTenantId` 之前就直接用 ID 查"我的智能体"列表——找不到就回退到内置智能推理了。

**新增的第一步（共享智能体自动识别）** 放在停用纠偏之前：

```diff
 const ensureSelectedAgentNotDisabled = () => {
   if (settingsStore.selectedAgentSourceTenantId) return
   const currentId = settingsStore.selectedAgentId || resolveFallbackAgentId()

+  // === 1. 共享智能体自动识别 ===
+  // env 指定的默认 agent 可能是跨空间共享过来的。先查 own agents 列表，
+  // 找不到再查 sharedAgents —— 匹配到就补 sourceTenantId，让后端从
+  // 源空间解析这个 agent 的模型配置/知识库/MCP。
+  const iAmOwner = agents.value.some(a => a.id === currentId)
+  if (!iAmOwner) {
+    const shared = orgStore.sharedAgents?.find(s => s.agent?.id === currentId)
+    if (shared?.agent && shared.source_tenant_id) {
+      // 直接写字段，绕过 selectAgent 里重置 KB/文件的逻辑 —— 那是给
+      // 用户手动切换用的；这里只是补缺失的 sourceTenantId，不该清空状态。
+      settingsStore.settings.selectedAgentSourceTenantId = String(shared.source_tenant_id)
+      localStorage.setItem('WeKnora_settings', JSON.stringify(settingsStore.settings))
+      return
+    }
+  }
+
+  // === 2. 停用纠偏（仅限当前空间 own/builtin agent）===
   if (!disabledOwnAgentIds.value.includes(currentId)) return
```

**时序保证**：`ensureSelectedAgentNotDisabled` 在 `chatResources.ensureAgents()` 之后调用，而 `ensureAgents` 内部已 `Promise.all` 并行加载了 own agents + `orgStore.fetchSharedAgents()`，所以 `orgStore.sharedAgents` 一定在查找前就已就绪。

#### 改动 4 — 部署配置链路（4 个文件）

**`docker-entrypoint.sh`**（frontend/Dockerfile 容器内 nginx 启动时生成 `config.js`）：

```diff
 cat > /usr/share/nginx/html/config.js << EOF
 window.__RUNTIME_CONFIG__ = {
   MAX_FILE_SIZE_MB: ${FILE_MB},
   MAX_SKILL_BUNDLE_SIZE_MB: ${SKILL_MB},
   DEFAULT_LOCALE: "${RUNTIME_DEFAULT_LOCALE}",
+  DEFAULT_CUSTOM_AGENT_ID: "${DEFAULT_CUSTOM_AGENT_ID:-}"
 };
 EOF
```

**`public/config.js`**（本地 dev 模式默认值，Docker 环境会被 entrypoint 覆盖）：

```diff
 window.__RUNTIME_CONFIG__ = {
   ...
   DEFAULT_LOCALE: '',
+  // Optional: brand custom default agent id. 留空则回退内置「智能推理」。
+  // Docker 部署时在 .env 里设 DEFAULT_CUSTOM_AGENT_ID=你的agentID 即可，重启前端容器生效。
+  DEFAULT_CUSTOM_AGENT_ID: '',
 };
```

**`docker-compose.yml`**（frontend 服务 environment 段新增变量透传）：

```diff
     environment:
       - MAX_FILE_SIZE_MB=${MAX_FILE_SIZE_MB:-50}
       - MAX_SKILL_BUNDLE_SIZE_MB=${MAX_SKILL_BUNDLE_SIZE_MB:-256}
       - DEFAULT_LOCALE=${DEFAULT_LOCALE:-}
+      # 品牌定制：对话页面默认选中的自定义智能体 ID。留空或未设置时回退内置「智能推理」。
+      # 改完只需要重启 frontend 容器（无需重建镜像）。
+      - DEFAULT_CUSTOM_AGENT_ID=${DEFAULT_CUSTOM_AGENT_ID:-}
       - APP_HOST=${APP_HOST:-app}
```

**`.env.example`**（根目录部署模板，在 `DEFAULT_LOCALE` 旁边加一段注释）：

```diff
 # 前端界面默认语言（BCP-47）...
 # DEFAULT_LOCALE=en-US
+# 对话页面默认智能体：指定一个自定义智能体 ID（字符串）。
+# 优先级：此变量 > 构建时 VITE_DEFAULT_CUSTOM_AGENT_ID > 内置「智能推理」。
+# 运行时若该 agent 在当前空间不存在或被停用，会自动回退到「智能推理」。
+# 留空或未设置时默认用内置「智能推理」。改完重启 frontend 容器即生效，无需重建镜像。
+# DEFAULT_CUSTOM_AGENT_ID=
```

#### 配置优先级与使用方式

| 优先级 | 来源 | 生效时机 | 设置方法 |
|---|---|---|---|
| 1 | `window.__RUNTIME_CONFIG__.DEFAULT_CUSTOM_AGENT_ID` | **运行时**（Docker 入口脚本生成的 `config.js`） | `.env` 里设 `DEFAULT_CUSTOM_AGENT_ID=xxx` → `docker compose restart frontend` |
| 2 | `import.meta.env.VITE_DEFAULT_CUSTOM_AGENT_ID` | **构建时**（Vite `npm run build` 注入） | `frontend/Dockerfile` build arg 传 `VITE_DEFAULT_CUSTOM_AGENT_ID=xxx` → 重建镜像 |
| 3 | `BUILTIN_SMART_REASONING_ID` | 兜底 | 无需配置 |

**推荐用优先级 1**（`.env` + 重启容器），和项目里的 `DEFAULT_LOCALE`、`MAX_FILE_SIZE_MB` 保持一致——改了环境变量不用重建镜像，生产运维最方便。

#### 关键注意点

1. **3.15 是 3.11 的进阶**：3.11 把所有 fallback 从 `BUILTIN_QUICK_ANSWER_ID` 改到 `BUILTIN_SMART_REASONING_ID`，3.15 在此基础上统一改成 `resolveFallbackAgentId()`。升级时两步顺序做——先 3.11（兜底值改对），再 3.15（统一入口）。
2. **`selectAgent` 方法里的显式判断不要动**（`settings.ts` L470-474）：那是用户主动选择智能体后的 `isAgentEnabled` 同步，不是 fallback。
3. **`ensureSelectedAgentNotDisabled` 的停用纠偏逻辑保持不动**：共享智能体的停用状态由源空间决定，本地 `disabledOwnAgentIds` 列表不适用——所以跳过停用检查、直接设 `sourceTenantId` 是正确的。
4. **localStorage 兼容**：用户 localStorage 里已存 `selectedAgentId` 的话不会被强制覆盖（尊重已存偏好）；但切换空间时 `clearTenantScopedClientState` 会重置到 `resolveFallbackAgentId()`。
5. **`import.meta.env.VITE_*` 的 IDE 报红**：VS Code 可能报"ImportMeta 上不存在 env 属性"——因为本地 tsc 没加载 Vite 的 `vite-env.d.ts` 类型声明。**实际构建不受影响**（Vite 编译期会处理），项目其他 11 处 `import.meta.env.VITE_*` 用法同理。
6. **测试文件**：本次改动**不涉及**测试文件修改——`resolveFallbackAgentId` 函数签名纯同步、无副作用，单元测试如果需要验证可以 mock `window.__RUNTIME_CONFIG__`；但 3.11 改的测试（`settingsStorage.test.mjs`、`agent-mode.test.mjs`）里直接对比 `BUILTIN_SMART_REASONING_ID` 的断言**不需要因为 3.15 而改**——3.15 只是把 `BUILTIN_SMART_REASONING_ID` 包了一层函数调用，测试行为不变。

#### 验证清单

1. 新建用户（localStorage 空）打开对话页 → 默认选中 env 指定的智能体
2. 该智能体是跨空间共享过来的 → 顶部按钮显示正确名称、`selectedAgentSourceTenantId` 已自动填充
3. env 指定的智能体在当前空间被停用或不存在 → 自动回退到内置「智能推理」
4. 清空 env（不设 `DEFAULT_CUSTOM_AGENT_ID`）→ 默认选中内置「智能推理」
5. 切换空间 → `clearTenantScopedClientState` 重置后仍用 env 指定的值
6. 已有 localStorage 存了 `selectedAgentId` 的老用户 → 尊重已存偏好，不被强制覆盖

---

### 3.16 `src/stores/settings.ts`（0.9.1 类型错误修复，0.9.0 无此项）

0.9.1 上游 `getSuggestedQuestionsParams` action（`frontend/src/stores/settings.ts` L467-L488）在 `vue-tsc --noEmit -p tsconfig.app.json` 下报 3 类错误：

- 「非类型化函数调用不能接受类型参数」
- 「没有与此调用匹配的重载」
- 「只有在使用 `--downlevelIteration` 标志时，才允许对...进行展开」

**根因**：`loadAndReconcileSettings<Settings, ...>` 是泛型函数，Pinia 对象式 store 的 state 里 `settings` 的 `selectedTags` 被推断为 `unknown`，导致 `tags.reduce<Record<string, string[]>>(...)` 的泛型实参非法；同时 tsconfig target 不支持 `Set` 展开语法。

**修复（两处，均在 `getSuggestedQuestionsParams` 内）**：

```ts
// 修复前（报错）
const tags = this.settings.selectedTags || [];
const tagScopes = Object.entries(tags.reduce<Record<string, string[]>>((scopes, tag) => {
  ...
}, {})).map(([knowledge_base_id, ids]) => ({
  knowledge_base_id,
  tag_ids: [...new Set(ids)],
}))

// 修复后
const tags: Settings['selectedTags'] = this.settings.selectedTags || [];
const tagScopes = Object.entries(tags.reduce<Record<string, string[]>>((scopes, tag) => {
  ...
}, {})).map(([knowledge_base_id, ids]) => ({
  knowledge_base_id,
  tag_ids: Array.from(new Set(ids)),
}))
```

1. **显式类型注解** `const tags: Settings['selectedTags']` → 消除前两个错误（`reduce` 泛型实参恢复合法）
2. **`Array.from(new Set(ids))` 替代 `[...new Set(ids)]`** → 消除 `downlevelIteration` 错误，行为完全等价

> 验证：`cd frontend; npx vue-tsc --noEmit -p tsconfig.app.json`，`settings.ts` 应 0 错误。
> 注意：0.9.1 上游自带 `SandboxConfigEditorDrawer.vue` / `StorageBackendSettings.vue` 共 36 个 ref 类型推断错误，与品牌定制无关，**不要**为了清零而改动这两个文件。

### 3.17 `src/views/settings/Settings.vue`（「模型管理」与「数据与扩展」四项改为仅系统管理员可见，0.9.0 无此项）

**「模型管理」（`models`）** 与 **「数据与扩展」分组中的向量数据库引擎（`vectorstore`）/ 解析引擎（`parser`）/ 存储引擎（`storage`）/ 沙箱配置（`sandbox`）** 五个设置页，上游默认 `SETTINGS_SECTION_MIN_ROLE` 为 `'admin'`（空间管理员及以上可见）。品牌定制要求：**仅系统管理员（`authStore.isSystemAdmin`）可见，空间 Owner / Admin 也不可见**。

**实现方式**：不动 `src/config/settingsAccess.ts` 的上游权限表（避免破坏 `settingsAccess.test.ts` 的 deepEqual 断言），也**不要**把这些 key 塞进 `SYSTEM_ADMIN_SETTINGS_SECTIONS`（该集合同时驱动 `content-wrapper--full` 布局类，会改变页面的版式）。改为在 `Settings.vue` 内、`HIDDEN_SECTIONS`（3.6）之后新增品牌定制集合：

```ts
// 品牌定制：「模型管理」（models）与「数据与扩展」的向量数据库引擎 / 解析引擎 /
// 存储引擎 / 沙箱配置页面仅系统管理员（is_system_admin）可见，空间 Owner / Admin
// 不再显示入口，直接输入 ?section=... 也会命中无权限面板
const SYSTEM_ADMIN_ONLY_SECTIONS = new Set(['models', 'vectorstore', 'parser', 'storage', 'sandbox'])
```

并在 `canSeeSection` 函数**开头**插入检查（先于 integration / SYSTEM_ADMIN_SECTIONS 分支）：

```ts
const canSeeSection = (key: string): boolean => {
  if (SYSTEM_ADMIN_ONLY_SECTIONS.has(key)) {
    return authStore.isSystemAdmin
  }
  if (isIntegrationSection(key)) {
    ...
```

**生效范围**：
- 左侧导航 `navItems` 按 `canSeeSection` 过滤 → 五个入口对非系统管理员消失。「模型管理」分组（`models_runtime`）的另两项 `ollama` / `weknoracloud` 已被 `HIDDEN_SECTIONS`（3.6）移除，因此非系统管理员视角下**整个「模型管理」分组标题也不再渲染**（`navGroups` 末尾已有 `.filter(g => g.items.length > 0)`）；「数据与扩展」分组仍剩 `websearch`（admin+ 可见），分组标题保留。
- 内容区同样有 `v-if="!canSeeSection(currentSection)"` 检查 → 直接 URL `?section=models|vectorstore|parser|storage|sandbox` 命中「无权限」面板，不会渲染设置组件。

> 边界：这是**前端可见性**控制。这五个页面调用的后端接口（models / vector-store / parser / storage / sandbox 配置 API）上游按空间角色鉴权，空间管理员若绕过 UI 直接调 API 仍可访问；如需彻底封死，须同步修改 Go 后端路由守卫（`router.go` 对应分组改为系统管理员中间件）。
> 注意：隐藏「模型管理」后，普通空间成员无法自行配置对话模型，模型完全依赖系统管理员在 `model-catalog`（模型库，本就仅系统管理员可见）中统一维护并下发，请确认这符合产品预期。

---

## 四、升级到新版本时的操作顺序

1. **拉取上游新版本代码**（覆盖 frontend 目录）
2. **对比静态资源**：确认上游是否新增了需要替换的 logo / gif / svg
3. **复制定制资源**：`innuovowork.png`、`home-mascot-*.gif`、`favicon.ico` 复制到新项目
4. **仓库根 `.gitattributes` + `.gitignore`**（3.9）：这是仓库级防线，必须最先应用，否则后续 Docker build 会因为 CRLF 报 `no such file or directory`
5. **逐文件应用 Login.vue 修改**：按 3.4 清单改，**注意同时改模板 + 脚本 + CSS + 清理残留**
6. **逐文件应用其他组件修改**：3.1~3.3、3.5、3.6、3.7（含隐藏 mcpserver / api）、3.8、3.16（0.9.1 `settings.ts` 类型错误修复）、3.17（0.9.1 「模型管理」与「数据与扩展」四项仅系统管理员可见）
7. **i18n 品牌替换**（6 个语言文件）：
   - 全局替换 WeKnora → InnuovoWork（跳过不可替换清单）
   - 按 3.10 节修改 `platform.subtitle` 和 `auth.subtitle` 两个 key（必须逐文件手动改，因为每个语言新值不同）
   - 按 3.10 key 3 修改 `createChat.title`（新建对话页欢迎语，zh-CN/zh-TW/ja-JP/ru-RU 需改，en-US/ko-KR 上游已是目标句式）
8. **功能隐藏配置**：Settings.vue `HIDDEN_SECTIONS`（含 `system` 版本信息页）+ integrations.ts `INTEGRATION_PREVIEW_ITEMS`
9. **默认智能体切换为智能推理**（3.11）：所有 fallback 从 `BUILTIN_QUICK_ANSWER_ID` 改到 `BUILTIN_SMART_REASONING_ID`，生产 5 文件 + 测试 2 文件，改完 grep 确认无遗漏
10. **内置智能体名称透传后端配置**（3.12）：AgentSelector.vue `builtinAgents` computed 改为 `agent.name?.trim() || t(...)`，让后端配置的"默认智能体"能显示到下拉卡片里
11. **新建智能体默认值定制**（3.13）：`defaultFormData.config` 中 `agent_type` 改 `custom`、`memory_enabled` 改 `false`、`allowed_tools` 改为基础 4 工具 + 知识库检索 4 工具
12. **删除空间按钮权限收紧**（3.14）：`TenantInfo.vue` 的 `showDeleteDangerZone` 从 `hasRole('owner')` 改为 `isSystemAdmin`
13. **默认智能体可由环境变量指定**（3.15，3.11 的进阶）：新增 `resolveFallbackAgentId()` 统一入口、4 个生产文件 fallback 改用它、`ensureSelectedAgentNotDisabled` 加共享智能体自动识别、部署配置链路 4 文件（entrypoint / config.js / compose / .env.example）。改完 grep `resolveFallbackAgentId` 确认 4 生产文件 + agent-mode.ts 都已覆盖；grep `\|\| BUILTIN_SMART_REASONING_ID` 确认生产代码中只剩 agent-mode.ts 内部的正确用法
14. **验证**：启动 dev server，逐个页面检查品牌显示、隐藏功能（含设置里不再出现「版本信息」）、登录页布局（无滚动条）、明暗主题吉祥物切换、**默认选中智能推理而非快速问答**、**AgentSelector 下拉卡片显示后端配置的名称（如"默认智能体"）而非 i18n 硬编码**、**新建智能体时类型默认「自定义」、长期记忆默认关闭、基础与知识库检索工具默认勾选**、**非系统管理员 Owner 看不到删除空间按钮**、**未配置 DEFAULT_CUSTOM_AGENT_ID 时行为同 3.11**、**配置后默认选中 env 指定的智能体（含共享智能体自动补 sourceTenantId）**
15. **容器验证**：`docker compose build frontend && docker compose up frontend`，确认不再报 `exec /docker-entrypoint.sh: no such file or directory`；再在 `.env` 设 `DEFAULT_CUSTOM_AGENT_ID=xxx` → `docker compose restart frontend`，`cat /usr/share/nginx/html/config.js` 确认值正确注入，浏览器 DevTools 里 `window.__RUNTIME_CONFIG__?.DEFAULT_CUSTOM_AGENT_ID` 返回设定值

---

## 五、已验证不需要改动的文件

| 文件 | 原因 |
|---|---|
| `src/assets/theme/theme.css` | 上游和定制版都是绿色品牌色主题，完全一致 |
| `src/views/settings/WeKnoraCloudSettings.vue` | 已在 HIDDEN_SECTIONS 中隐藏，无需改内部文案 |
| `src/views/settings/SystemInfo.vue` | 版本信息页已通过 HIDDEN_SECTIONS 隐藏（3.6），i18n 也已覆盖显示文本，无需改动 |
| `src/assets/img/` 下其他图标 | 功能图标，不涉及品牌 |

---

## 六、定制版本信息

| 项目 | 值 |
|---|---|
| 上游基准版本 | WeKnora 0.9.0 |
| 品牌名 | **InnuovoWork**（2026-11-03 从 InnoWork 改名） |
| Logo 资产 | `innuovowork.png`（透明底、迷你绿色四角星 + 深蓝 Innuovo + 品牌绿 Work，1718×283px），menu.vue 引用宽度 130px |
| 隐藏的设置页 | ollama、weknoracloud、integration-claw、integration-cli、system（版本信息，3.6） |
| 隐藏的集成预览 | cli、claw（chrome 已恢复显示） |
| 用户弹窗隐藏入口 | 帮助与文档、GitHub（3.8） |
| 新增的欢迎页元素 | 云朵吉祥物 GIF（明/暗双主题） |
| 登录页布局 | 单栏居中（品牌名 + 表单），无 showcase / 轮播 / 特性标签 |
| 登录页位置 | `login-layout { align-items: flex-start; padding: 10vh 20px 20px }` 防滚动条 |
| 登录页副标题（品牌名下方） | `platform.subtitle` = 「AI 驱动的智能体工作平台」 |
| 登录页副标题（表单下方） | `auth.subtitle` = 「用 AI 助手与智能体自动化处理任务、检索知识、协同办公」 |
| 仓库级 CRLF 防御 | `.gitattributes` + `.gitignore` 白名单（3.9，commit `c4329eb`） |
| 新建对话页欢迎语 | `createChat.title` = 「今天想在 InnuovoWork 里做点什么？」（3.10 key 3） |
| 默认智能体 | 可配置（3.15）：环境变量 `DEFAULT_CUSTOM_AGENT_ID`（Docker 运行时，推荐）→ 构建时 `VITE_DEFAULT_CUSTOM_AGENT_ID` → 内置「智能推理」（`builtin-smart-reasoning`）。共享智能体自动补 `sourceTenantId`（跨空间共享场景）；未配置时行为同 3.11（兜底智能推理） |
| 内置智能体名称透传 | 后端配置的 name/description 优先，空串才 fallback i18n（3.12）；已将内置智能体改名为「默认智能体」 |
| 新建智能体默认值 | 类型「自定义」（`custom`）、长期记忆关闭、基础 4 工具（思考 / 制定计划 / 向用户提问 / 回顾历史对话）+ 知识库检索 4 工具（检索知识库 / 阅读文档 / 浏览文档列表 / 查询知识图谱）默认勾选（3.13） |
| 删除空间按钮权限 | 仅系统管理员（`isSystemAdmin`）可见，普通 Owner 隐藏（3.14） |

---

## 七、常见陷阱（升级时别再犯）

| 陷阱 | 说明 |
|---|---|
| **只改 HTML 不改 CSS** | `header-logo` → `page-logo` 必须同步加 `.page-logo` 样式块（含响应式 + 反白滤镜），否则 logo 按原图尺寸显示会过大 |
| **模板改了不关闭合标签** | 删 showcase-section 改布局时多留一个 `</div>` 或少关一个，Vue 会报 "Element is missing end tag"，改完一定要 `GetDiagnostics` |
| **只改模板不清 CSS 残留** | swiper import / 截图图片 / `.showcase-section` / `.login-features` / `.form-section` / `.form-section` / `.feature-item` 等残留样式必须一起删，否则可能有看不见的溢出或暗色模式样式干扰 |
| **用 `align-items: center` + 内容** | 内容多时会超出 viewport 产生滚动条，用 `flex-start` + `padding-top: 10vh` 更安全 |
| **忘了改 `auth.subtitle`** | 它和 `platform.subtitle` 是两个不同的 key，分别在品牌名下方和表单标题下方，必须同时改 |
| **`{brand}` 占位符** | `firstTime` / `registerSubtitle` 等 key 已经用 `{brand}` 占位，不要硬编码 InnuovoWork，方便下次换品牌名 |
| **只改默认值忘了 fallback** | 智能体默认值不止一个 `defaultSettings.selectedAgentId`——settings getter、auth store 空间重置、agent-mode.ts 的 4 个判断函数、Input-field.vue 兜底对象，全是 `|| BUILTIN_QUICK_ANSWER_ID`，漏改任何一处都会让新用户/切换空间/管线判断回到不存在的快速问答 |
| **只改生产代码不改测试** | agent-mode.test.mjs 和 settingsStorage.test.mjs 里的 fallback 和默认值必须同步改，否则 `isQuickAnswerAgentId(undefined)` 行为反转导致测试挂掉 |
| **变量名换了 import 没换** | auth.ts 里把 `BUILTIN_QUICK_ANSWER_ID` 换成 `BUILTIN_SMART_REASONING_ID` 后 import 行必须同步改，否则 TypeScript 报 `找不到名称` |
| **兜底对象的 i18n key 写错** | `input` 命名空间下智能推理是 `input.agentMode` 不是 `input.smartReasoning`（后者在 `search` 命名空间），写错会显示原始 key 名而非翻译文本，很难一眼看出是 i18n 问题 |
| **内置智能体名字被前端覆盖** | AgentSelector.vue `builtinAgents` computed 里 `{ ...agent, name: t('input.agentMode') }` 会无条件覆盖后端返回的名字。后端改名成"默认智能体"后下拉卡片还是"智能推理"。必须改成 `agent.name?.trim() \|\| t(...)` 让后端配置优先透传 |
| **忘了 `.gitattributes`，容器崩** | Windows 上 `core.autocrlf=true` 会把 `*.sh` 转成 CRLF，Docker shebang 解析失败报 `no such file or directory`。**仓库根 `.gitattributes` 必须在任何构建验证之前就位**，不是事后修脚本的事 |
| **只修脚本不管 `.gitignore`** | 仓库根 `.gitignore` 原 `.*` 规则会吞掉 `.gitattributes`，必须白名单放行 `!.gitattributes`，否则下次 clone 这个文件就没了 |
| **隐藏版本信息却误伤系统设置** | 「版本信息」的 section key 是 `system`，「系统设置」是 `system-global`。往 `HIDDEN_SECTIONS` 里加 `system` 不会影响系统管理员页；反过来只删导航项不加 Set 的话，`?section=system` 仍能直接访问到页面 |
| **只改下拉/开关默认值不改 `defaultFormData`** | 新建智能体的类型、长期记忆、基础工具都来自 `defaultFormData.config`（`agent_type` / `memory_enabled` / `allowed_tools`），不是组件的默认 prop。只改 UI 默认值会导致提交时仍写入旧配置；同时确认 `custom` 仍在 `config/agent_type_presets.yaml` 中（否则下拉显示原始 id 且无法回选） |
| **默认勾了思考 / 制定计划还抱怨 token 高** | 基础 4 工具里的 `thinking`、`todo_write` 每轮都会额外消耗 token；如果不需要默认勾选，从 `defaultFormData.config.allowed_tools` 数组里移除即可，不要在上游注释里改语义 |
| **删除空间按钮忘了改后端权限** | `TenantInfo.vue` 里 `showDeleteDangerZone` 从 `hasRole('owner')` 改为 `isSystemAdmin` 只是前端 UI 控制。如果后端 `DELETE /api/tenant/{id}` 仍只校验 Owner 角色，普通 Owner 仍可通过 API 直接调用删除接口，必须同步收紧后端权限守卫 |
