# 七辰的个人网站
一个 Nothing 风格的个人网站：纯黑底色、点阵标题与单一红色强调，展示个人资料、时间线和友链。

## ✨ 功能特性

- 🎨 **Nothing 风格设计** - 黑白配色、Doto 点阵标题、JetBrains Mono 等宽标签与单一红色强调
- 🌙 **深色/浅色主题** - 支持深色和浅色模式切换
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ✨ **流畅动画** - GSAP 驱动的入场与滚动动画
- 🔗 **友链可达性检查** - 点击友链先检测目标站点，无法访问时展示错误页而不是白屏
- 🧭 **完整的错误页** - 404 页面与链接不可达页面，均展示真实请求地址
- 🧪 **博客入口检测** - `/wiki-redirect` 会先检测 Wiki 站点可用性，再引导跳转

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看网站。

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
src/
├── components/
│   ├── layout/              # Header / Footer / Layout
│   ├── ui/                  # SkillCard / Timeline / ProjectCard
│   ├── AnimatedRoutes.tsx   # 路由表与页面切换动画
│   └── SearchDialog.tsx     # 快捷链接对话框
├── pages/
│   ├── HomePage.tsx         # 首页
│   ├── AboutPage.tsx        # 关于页
│   ├── LinksPage.tsx        # 友链页
│   ├── WikiRedirect.tsx     # 博客入口检测
│   ├── SearchPage.tsx       # 搜索页
│   ├── NotFoundPage.tsx     # 404 页面
│   ├── LinkErrorPage.tsx    # 友链不可达页面
│   └── ProjectsPage.tsx     # 项目页（暂未接入路由）
├── data/                    # personalInfo / friendLinks / skills / timeline / projects / quickLinks
├── theme/
│   └── theme.ts             # Nothing 风格主题、字体与颜色 token
├── utils/
│   └── linkCheck.ts         # 友链可达性检测
├── App.tsx                  # 主应用组件
└── main.tsx                 # 入口文件
```

## ⚙️ 自定义配置

### 修改个人信息

编辑 `src/data/personalInfo.ts` 文件来修改个人资料：

```typescript
export const personalInfo = {
  name: 'QICHEN',
  location: '吉林 · 长春',
  email: 'qichen@qichen.ink',
  qq: '3654280169',
  github: 'https://github.com/qichenya',
  telegram: 'https://t.me/qichen_sama',
  linkedin: 'https://linkedin.com/in/qichen',
  avatar: '/images/hand.png',
  bio: '个人简介...',
  interests: ['Linux'],
  focusDirections: [
    { name: 'Linux', outlined: false },
    { name: 'WAF', outlined: true },
    { name: 'Worker', outlined: true },
  ],
};
```

### 配置快捷链接

编辑 `src/data/quickLinks.ts` 中的 `quickLinksMarkdown`，使用 Markdown 列表语法：

```markdown
# 快捷链接

- [GitHub](https://github.com/qichenya)
- [Telegram](https://t.me/qichen_sama)
```

**格式说明：**
- 每条链接写成 `- [名称](URL)` 的列表项
- `parseQuickLinks` 会在渲染时解析成 `{ name, url }` 数组

### 配置友链

编辑 `src/data/friendLinks.ts` 文件来管理友链：

```typescript
export const friendLinks: FriendLink[] = [
  {
    name: '4C01',
    url: 'https://4c01.cn',
    description: '一只笨猫的个人介绍',
  },
];
```

### 调整主题色

主题定义在 `src/theme/theme.ts`：`createLightTheme` / `createDarkTheme` 中的 `palette.primary.main` 控制强调色（默认 Nothing 红 `#D71921`），`FONT_DOTS`、`FONT_MONO`、`FONT_TEXT` 控制字体栈。

## 🎨 主题切换

点击导航栏右上角的太阳/月亮图标切换深色/浅色模式，选择会保存在 `localStorage` 的 `theme` 键中。

## 🗺️ 页面路由

| 路径 | 说明 |
| --- | --- |
| `/` | 首页 |
| `/about` | 关于 |
| `/links` | 友链 |
| `/wiki-redirect` | 博客入口检测 |
| `/search` | 搜索 |
| `/link-error?target=...` | 友链不可达页 |
| 其他 | 404 页面 |

## 🛠️ 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Material UI 5** - 组件库（自定义 Nothing 风格主题）
- **GSAP** - 入场与滚动动画
- **React Router 6** - 路由管理
- **Vite 6** - 构建工具
- **Cloudflare Workers** - 静态资源托管与部署

## 🚀 部署

构建产物输出到 `dist/`，通过 `wrangler.jsonc` 配置 Cloudflare Workers 静态资源托管（含 SPA 回退）：

```bash
npm run deploy
```

也可以只构建，再把 `dist/` 交给其他静态服务器：

```bash
npm run build
```

## 📄 许可证

MIT
