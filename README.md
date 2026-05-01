# 星际猎人 - 配队站

一站式《星际猎人》（原《无尽的拉格朗日》）配队平台，整合完整的舰船数据、智能配队推荐、蓝图加点模拟、模块搭配工具等功能。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 5
- **样式方案**: Tailwind CSS
- **状态管理**: Zustand
- **数据可视化**: ECharts

## 功能特性

### 已完成功能
- ✅ **舰船图鉴**: 199 艘舰船完整数据
- ✅ **多维度筛选**: 势力、类型、稀有度、站位搜索
- ✅ **响应式布局**: 支持多种屏幕尺寸
- ✅ **暗色主题**: 深空黑设计风格

### 待开发功能
- ⏳ **智能配队**: 拖拽式舰队编组
- ⏳ **蓝图加点**: 可视化强化树模拟器
- ⏳ **模块搭配**: 超主力舰模块系统配置
- ⏳ **克制分析**: 阵容克制关系分析
- ⏳ **阵容分享**: 玩家社区功能
- ⏳ **数据统计**: 舰船使用率统计

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问：http://localhost:5173/

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
/workspace/
├── src/
│   ├── components/         # 组件
│   │   ├── ShipCard/      # 舰船卡片
│   │   ├── ShipTable/     # 舰船表格
│   │   └── ...
│   ├── data/              # 数据
│   │   ├── ships.json     # 199 艘舰船数据
│   │   └── factions.json  # 势力数据
│   ├── types/             # TypeScript 类型
│   ├── store/             # Zustand 状态管理
│   └── utils/             # 工具函数
├── scripts/               # 数据处理脚本
└── ...
```

## 数据处理

如果需要重新处理 Excel 数据：

```bash
node --no-warnings --experimental-modules scripts/parse-excel.js
```

## 设计规范

### 配色方案
- 背景：深空黑 (#0A0E17)
- 卡片：暗蓝灰 (#131A2B)
- 主色调：星际蓝 (#4A9EFF)
- 强调色：引擎橙 (#FF6B35)

### 开发说明
详细的项目总结和后续开发计划请查看 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)。

---

**项目已成功初始化！** 🚀
