# xixiaolian

西小联相关展示与交互原型仓库。

## 目录

- [`index.html`](./index.html)：现有西小联运营推广手册，保持原样。
- [`images/`](./images/)：运营推广手册使用的现有图片资源，保持原样。
- [`prototypes/xiaolian-link/`](./prototypes/xiaolian-link/)：小联帮你链最新确认交互原型（v0.6）。

## 运行小联帮你链原型

原型为零构建依赖的静态 HTML，可直接打开：

```bash
open prototypes/xiaolian-link/index.html
```

也可以启动本地静态服务器：

```bash
cd prototypes/xiaolian-link
python3 -m http.server 4173
```

浏览器访问 `http://localhost:4173/`。

## 基础检查

需要 Node.js 18 或更高版本：

```bash
cd prototypes/xiaolian-link
npm run check
```

详细运行方式、交互范围、测试结果和已知限制见[原型说明](./prototypes/xiaolian-link/README.md)。
