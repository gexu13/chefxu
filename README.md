# ChefXu - 许大厨的健康餐

一个基于 Node.js 和 Express 的健康食谱分享平台，用户可以分享健康食谱、查看他人作品并进行评价。

## 🌟 功能特性

- **食谱管理**
  - 创建、编辑、删除健康食谱
  - 上传多张图片展示食谱
  - 食谱描述和详情查看

- **评价系统**
  - 对食谱进行星级评分（1-5星）
  - 添加文字评价
  - 管理自己的评价（删除）

- **用户认证**
  - 用户注册和登录
  - Session 管理
  - 权限控制（只能编辑/删除自己创建的食谱）

- **图片管理**
  - 图片上传到 Cloudinary 云存储
  - 自动生成缩略图
  - 图片删除功能

## 🛠️ 技术栈

### 后端
- **Node.js** - JavaScript 运行环境
- **Express** - Web 应用框架
- **MongoDB** - 数据库
- **Mongoose** - MongoDB 对象建模工具
- **Passport.js** - 用户认证中间件
- **Joi** - 数据验证库
- **Multer** - 文件上传处理
- **Cloudinary** - 图片云存储服务

### 前端
- **EJS** - 模板引擎
- **Bootstrap 5** - CSS 框架
- **JavaScript** - 客户端脚本

### 安全与工具
- **Helmet** - HTTP 安全头设置
- **express-mongo-sanitize** - MongoDB 注入防护
- **connect-flash** - Flash 消息提示
- **express-session** - Session 管理

## 📁 项目结构

```
ChefXu/
├── app.js                 # 应用入口文件
├── package.json           # 项目依赖配置
├── models/                # 数据模型
│   ├── recipe.js         # 食谱模型
│   ├── review.js         # 评价模型
│   └── user.js           # 用户模型
├── controllers/           # 控制器
│   ├── recipes.js        # 食谱控制器
│   ├── reviews.js        # 评价控制器
│   └── users.js          # 用户控制器
├── routes/                # 路由定义
│   ├── recipeRoutes.js   # 食谱路由
│   ├── reviewRoutes.js   # 评价路由
│   └── userRoute.js      # 用户路由
├── middleware.js          # 中间件（认证、验证、权限）
├── validation/            # 数据验证 Schema
│   ├── recipeSchema.js   # 食谱验证
│   ├── reviewSchema.js   # 评价验证
│   └── joiExtension.js   # Joi 扩展
├── views/                 # 视图模板
│   ├── home.ejs          # 首页
│   ├── error.ejs         # 错误页面
│   ├── recipes/          # 食谱相关页面
│   ├── users/            # 用户相关页面
│   ├── layouts/          # 布局模板
│   └── partials/         # 部分模板
├── public/                # 静态资源
│   ├── css/              # 样式文件
│   └── js/               # JavaScript 文件
├── cloudinary/            # Cloudinary 配置
│   └── index.js
└── utilities/             # 工具类
    └── ExpressError.js   # 错误处理
```

## 🚀 快速开始

### 前置要求

- Node.js (推荐 v14+)
- MongoDB (本地安装或使用 MongoDB Atlas)
- Cloudinary 账号（用于图片存储）

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd ChefXu
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   在项目根目录创建 `.env` 文件：
   ```env
   # MongoDB 连接（可选，默认使用本地 MongoDB）
   MONGODB_URL=mongodb://127.0.0.1:27017/chefXu
   
   # Session 密钥
   SECRET=your-secret-key-here
   
   # Cloudinary 配置（可选，可以通过环境变量自动配置）
   # CLOUDINARY_CLOUD_NAME=your-cloud-name
   # CLOUDINARY_KEY=your-api-key
   # CLOUDINARY_SECRET=your-api-secret
   # 或使用 CLOUDINARY_URL 环境变量
   
   # 服务器端口（可选，默认 3000）
   PORT=3000
   
   # 环境类型
   NODE_ENV=development
   ```

4. **启动 MongoDB**
   
   如果使用本地 MongoDB，确保服务已启动：
   ```bash
   # macOS (使用 Homebrew)
   brew services start mongodb-community
   
   # 或直接启动
   mongod
   ```

5. **启动应用**
   ```bash
   npm start
   ```
   
   或使用 nodemon（开发环境自动重启）：
   ```bash
   npx nodemon app.js
   ```

6. **访问应用**
   
   在浏览器中打开：`http://localhost:3000`

## 📝 主要功能说明

### 食谱功能

- **查看所有食谱** - `GET /recipes`
- **创建新食谱** - `GET /recipes/new` → `POST /recipes`
- **查看食谱详情** - `GET /recipes/:id`
- **编辑食谱** - `GET /recipes/:id/edit` → `PATCH /recipes/:id`
- **删除食谱** - `DELETE /recipes/:id`

### 评价功能

- **添加评价** - `POST /recipes/:cid/reviews`
- **删除评价** - `DELETE /recipes/:cid/reviews/:rid`

### 用户功能

- **注册** - `GET /register` → `POST /register`
- **登录** - `GET /login` → `POST /login`
- **登出** - `GET /logout`

## 🔐 权限控制

- 未登录用户只能浏览食谱和评价
- 登录用户可以创建、编辑、删除自己的食谱
- 用户只能删除自己创建的评价
- 编辑和删除操作会验证作者身份

## 🖼️ 图片上传

- 图片通过 Multer 中间件处理
- 上传到 Cloudinary 云存储
- 支持多张图片上传
- 自动生成缩略图
- 删除食谱时会自动删除相关图片

## 🔒 安全特性

- **Helmet** - 设置安全 HTTP 头
- **express-mongo-sanitize** - 防止 MongoDB 注入攻击
- **Joi 验证** - 输入数据验证和 HTML 转义
- **Passport.js** - 安全的用户认证
- **Session 管理** - 安全的会话存储

## 🌐 API 路由

```
GET     /                           # 首页
GET     /recipes                    # 所有食谱
GET     /recipes/new                # 新建食谱表单
POST    /recipes                    # 创建食谱
GET     /recipes/:id                # 食谱详情
GET     /recipes/:id/edit           # 编辑表单
PATCH   /recipes/:id                # 更新食谱
DELETE  /recipes/:id                # 删除食谱
POST    /recipes/:cid/reviews       # 添加评价
DELETE  /recipes/:cid/reviews/:rid  # 删除评价
GET     /register                   # 注册页面
POST    /register                   # 用户注册
GET     /login                      # 登录页面
POST    /login                      # 用户登录
GET     /logout                     # 用户登出
```

## 📦 数据模型

### Recipe (食谱)
- `title` - 标题
- `description` - 描述
- `images` - 图片数组（包含 url 和 filename）
- `author` - 作者（User ID）
- `reviews` - 评价数组（Review ID）

### Review (评价)
- `body` - 评价内容
- `rating` - 评分（1-5）
- `author` - 作者（User ID）

### User (用户)
- `username` - 用户名
- `email` - 邮箱
- `password` - 密码（已加密）

## 🐛 故障排除

### MongoDB 连接失败
- 确保 MongoDB 服务正在运行
- 检查 `MONGODB_URL` 环境变量是否正确
- 确认数据库名称是否正确

### 图片上传失败
- 检查 Cloudinary 配置是否正确
- 确认网络连接正常
- 检查文件大小和格式是否支持

### 会话问题
- 确保 `SECRET` 环境变量已设置
- 检查 MongoDB 连接（Session 存储在 MongoDB）

## 📄 许可证

ISC

## 👤 作者

Gavin Xu

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者。
