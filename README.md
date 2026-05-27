# 七辰的个人网站
一个简洁优雅的个人网站，展示个人资料和联系方式。

## ✨ 功能特性

- 🎨 **随机柔和配色** - 每次刷新网站会随机从 10 种柔和配色方案中选择一种
- 🌙 **深色/浅色主题** - 支持深色和浅色模式切换
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ✨ **流畅动画** - 页面切换动画和入场动画效果
- 🔗 **快捷链接** - 长按主页按钮快速访问常用网站

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
│   ├── layout/
│   │   ├── Header.tsx      # 导航栏组件
│   │   ├── Footer.tsx      # 页脚组件
│   │   └── Layout.tsx      # 布局容器
│   ├── AnimatedRoutes.tsx   # 路由动画组件
│   └── SearchDialog.tsx     # 快捷链接对话框
├── pages/
│   ├── HomePage.tsx         # 首页
│   ├── AboutPage.tsx        # 关于页
│   └── SearchPage.tsx       # 搜索页
├── data/
│   ├── personalInfo.ts      # 个人信息数据
│   └── quickLinks.ts       # 快捷链接配置
├── theme/
│   └── theme.ts            # 主题配置（含 10 种配色方案）
├── App.tsx                 # 主应用组件
└── main.tsx                # 入口文件
```

## ⚙️ 自定义配置

### 修改个人信息

编辑 `src/data/personalInfo.ts` 文件来修改个人资料：

```typescript
export const personalInfo = {
  name: 'QICHEN',
  location: '吉林 · 长春',
  email: 'qichenstudio@qq.com',
  qq: '3654280169',
  github: 'https://github.com/qichenya',
  telegram: 'https://t.me/qichen_sama',
  linkedin: 'https://linkedin.com/in/qichen',
  avatar: 'https://github.com/qichenya.png',
  bio: '个人简介...',
  interests: ['Linux Shell'],
};
```

### 配置快捷链接

编辑 `src/data/quickLinks.ts` 文件中的 `quickLinksMarkdown` 来自定义快捷链接：

```typescript
export const quickLinksMarkdown = `# 个人网站
https://qichen.icu

# 短链接
https://4c01.cn
```

**格式说明：**
- 使用 `# 名称` 来定义链接的显示名称
- 名称后面紧跟 URL
- 每个链接组之间用空行分隔

### 添加新配色

在 `src/theme/theme.ts` 的 `colorPalettes` 数组中添加新的配色方案。

## 🎨 主题切换

点击导航栏右上角的太阳/月亮图标切换深色/浅色模式。

## 🔗 快捷链接

1. 在首页长按「ABOUT ME」按钮
2. 弹出快捷链接对话框
3. 点击任意链接在新标签页打开

## 🛠️ 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Material UI** - Material Design 3 风格组件库
- **Framer Motion** - 流畅的动画效果
- **React Router** - 路由管理
- **Vite** - 构建工具

## 📄 许可证

MIT
