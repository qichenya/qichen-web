# 个人网站

一个使用 React + Material Design 3 风格构建的个人网站。

## 功能特性

- 🎨 **随机柔和配色** - 每次刷新网站会随机从 10 种柔和配色方案中选择一种
- 🌙 **深色/浅色主题** - 支持深色和浅色模式切换
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ✨ **流畅动画** - 页面切换动画和入场动画效果
- 🔍 **快捷搜索** - 长按主页按钮选择搜索引擎，快速跳转到 Google、Bing 或百度

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Material UI** - Material Design 3 风格组件库
- **Framer Motion** - 流畅的动画效果
- **React Router** - 路由管理
- **Vite** - 构建工具

## 快速开始

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

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # 导航栏组件
│   │   ├── Footer.tsx      # 页脚组件
│   │   └── Layout.tsx      # 布局容器
│   ├── AnimatedRoutes.tsx  # 路由动画组件
│   └── SearchDialog.tsx    # 搜索对话框
├── pages/
│   ├── HomePage.tsx        # 首页
│   ├── AboutPage.tsx       # 关于页
│   └── SearchPage.tsx      # 搜索页
├── data/
│   └── personalInfo.ts     # 个人信息数据
├── theme/
│   └── theme.ts            # 主题配置（含 10 种配色方案）
├── App.tsx                 # 主应用组件
└── main.tsx                # 入口文件
```

## 使用说明

### 搜索功能

1. 在首页长按「ABOUT ME」按钮
2. 选择搜索引擎（Google、Bing、百度）
3. 输入搜索内容
4. 按回车或点击搜索按钮

### 主题切换

- 点击导航栏右上角的太阳/月亮图标切换深色/浅色模式

## 自定义配置

### 修改个人信息

编辑 `src/data/personalInfo.ts` 文件来修改个人资料。

### 添加新配色

在 `src/theme/theme.ts` 的 `colorPalettes` 数组中添加新的配色方案。

## 许可证

MIT
