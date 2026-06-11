# 工具制造公司网站 - Headless CMS 版

这是一个基于 **Contentful Headless CMS** 的现代化企业产品展示网站,支持云端内容管理和多端发布。

## 🎯 核心特性

### ✨ Headless CMS 架构
- ✅ **云端内容管理** - 通过 Contentful 后台管理所有内容
- ✅ **实时同步** - 修改内容后全球 CDN 即时更新
- ✅ **多人协作** - 团队成员可同时管理内容
- ✅ **版本控制** - 完整的内容历史和回滚功能
- ✅ **CDN 加速** - 全球节点加速访问速度

### 🌐 多语言支持
- ✅ **中英文双语切换** - 一键切换语言
- ✅ **自动保存偏好** - 记住用户的语言选择
- ✅ **响应式设计** - 完美适配 PC、平板、手机

### 📱 现代化功能
- ✅ **轮播图展示** - 自动播放,支持手动切换
- ✅ **产品层级结构** - 支持父子产品分类
- ✅ **品牌 Logo 展示** - 自主品牌展示区域
- ✅ **浮动联系方式** - 快速联系按钮

---

## 📚 目录

- [快速开始](#快速开始)
- [Headless CMS 设置](#headless-cms-设置)
- [本地开发](#本地开发)
- [部署指南](#部署指南)
- [内容管理](#内容管理)
- [技术栈](#技术栈)
- [常见问题](#常见问题)

---

## 🚀 快速开始

### 方式 1: 使用 Contentful (推荐)

**优势:**
- 云端存储,多设备同步
- 团队协作管理
- 版本控制和审核流程
- CDN 全球加速

**步骤:**

1. **注册 Contentful 账号**
   - 访问 [Contentful 官网](https://www.contentful.com/sign-up/)
   - 免费套餐包含 25,000 API 调用/月

2. **创建空间和获取 API Key**
   - 创建新 Space
   - 获取 Space ID 和 Delivery Token

3. **导入内容模型**
   ```bash
   npm install -g contentful-cli
   contentful login
   contentful space import --space-id YOUR_SPACE_ID --content-file contentful-model.json
   ```

4. **配置网站**
   - 访问 `setup-contentful.html`
   - 填入 Space ID 和 Access Token
   - 测试连接并保存

5. **添加内容**
   - 在 Contentful 后台添加公司信息、轮播图、产品等
   - 发布内容后网站自动更新

详细教程请参考: [CONTENTFUL_SETUP.md](CONTENTFUL_SETUP.md)

### 方式 2: 使用 LocalStorage (传统方式)

适合单人使用或临时测试:

```bash
# 启动本地服务器
python -m http.server 8080

# 或使用 Node.js
npx http-server -p 8080
```

访问 `admin.html` 进行内容管理,数据保存在浏览器 LocalStorage 中。

---

## 🔧 Headless CMS 设置

### 1. 注册和配置

参考 [CONTENTFUL_SETUP.md](CONTENTFUL_SETUP.md) 完成以下步骤:

1. 注册 Contentful 账号
2. 创建空间(Space)
3. 获取 API 密钥(Space ID + Access Token)
4. 导入内容模型

### 2. 内容模型说明

项目预定义了 5 种内容类型:

| 内容类型 | 说明 | 字段 |
|---------|------|------|
| **companyInfo** | 公司信息 | 名称、ICP、描述、电话、邮箱、地址 |
| **banner** | 轮播图 | 标题、描述、图片、排序 |
| **category** | 产品分类 | 名称、描述、图片、徽章、排序 |
| **product** | 产品 | 名称、分类、父级产品、描述、价格、图片、推荐标记 |
| **brand** | 品牌 Logo | 名称、Logo、排序 |

### 3. 网站配置

访问 `setup-contentful.html` 页面:

1. 填入 Space ID 和 Access Token
2. 点击"测试连接"验证配置
3. 点击"保存配置"

配置会保存在浏览器 LocalStorage 中。

---

## 💻 本地开发

### 环境要求

- Node.js 14+ (可选)
- 现代浏览器(Chrome、Firefox、Safari、Edge)

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

浏览器会自动打开 `http://localhost:8080`

### 项目结构

```
tool-website/
├── index.html                  # 首页
├── products.html               # 产品页面
├── admin.html                  # 后台管理页面
├── setup-contentful.html       # Contentful 设置向导 ⭐新增
├── contentful-model.json       # Contentful 内容模型定义 ⭐新增
├── CONTENTFUL_SETUP.md         # Contentful 详细设置教程 ⭐新增
├── package.json                # 项目配置 ⭐新增
├── netlify.toml                # Netlify 部署配置 ⭐新增
├── vercel.json                 # Vercel 部署配置 ⭐新增
├── css/
│   └── style.css              # 样式文件
├── js/
│   ├── main.js                # 主要功能
│   ├── i18n.js                # 多语言支持
│   ├── contentful-client.js   # Contentful API 客户端 ⭐新增
│   ├── contentful-management.js # Contentful 管理 API ⭐新增
│   └── cms-loader.js          # CMS 数据加载器 ⭐新增
└── images/                    # 图片资源
    ├── logo.png
    ├── banner*.jpg
    ├── category-*.jpg
    └── brand*.png
```

---

## 🌐 部署指南

### GitHub Pages

1. **提交代码**
   ```bash
   git add .
   git commit -m "Upgrade to Contentful Headless CMS"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - 选择 Branch: main, Folder: / (root)
   - 保存

3. **配置 Contentful**
   - 访问 `https://YOUR_USERNAME.github.io/tool-website/setup-contentful.html`
   - 填入 API 密钥

### Netlify (推荐)

1. **连接到 GitHub**
   - 访问 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择 GitHub 仓库

2. **配置环境变量**
   - 在 Site settings → Environment variables 中添加:
     - `CONTENTFUL_SPACE_ID`
     - `CONTENTFUL_ACCESS_TOKEN`

3. **部署**
   - Netlify 会自动检测 `netlify.toml` 配置
   - 每次推送代码自动重新部署

### Vercel

1. **导入项目**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "Import Project"
   - 选择 GitHub 仓库

2. **配置环境变量**
   - 添加 `CONTENTFUL_SPACE_ID`
   - 添加 `CONTENTFUL_ACCESS_TOKEN`

3. **部署**
   - Vercel 会自动检测 `vercel.json`
   - 点击 Deploy 开始部署

---

## 📝 内容管理

### 使用 Contentful 后台

1. **登录后台**
   - 访问 [Contentful Dashboard](https://app.contentful.com)
   - 选择你的 Space

2. **添加/编辑内容**
   - 点击 "Content" 标签
   - 点击 "Add entry" 添加新内容
   - 选择内容类型(公司信息、轮播图等)
   - 填写字段并发布

3. **上传图片**
   - 点击 "Media" 标签
   - 上传所有需要的图片
   - 在创建内容时从媒体库选择

4. **发布流程**
   - 编辑完成后点击右上角 "Save"
   - 点击 "Publish" 发布内容
   - 内容会通过 CDN 全球同步(通常几秒内生效)

### 使用自定义后台

访问 `admin.html` 可以使用简化的管理界面,但功能有限。

---

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标记
- **CSS3** - Flexbox、Grid、动画
- **Vanilla JavaScript** - 无框架依赖
- **Font Awesome** - 图标库

### CMS 平台
- **Contentful** - Headless CMS
- **CDN** - CloudFlare/Akamai 全球加速

### 部署平台(任选其一)
- **GitHub Pages** - 免费静态托管
- **Netlify** - 自动化部署 + 环境变量
- **Vercel** - 边缘网络加速

### API 集成
- **Content Delivery API** - 只读 API,用于前端展示
- **Management API** - 写入 API,用于后台管理(需要 Management Token)

---

## ❓ 常见问题

### Q: Contentful 收费吗?

A: 免费套餐足够小型网站使用(25,000 API 调用/月)。超出后需升级到付费计划($300/月起)。

### Q: 如果 Contentful 服务中断怎么办?

A: 当前实现有降级机制:无法连接 Contentful 时会自动使用 LocalStorage 中的数据。

### Q: 如何备份内容?

A: 使用 CLI 导出所有内容:
```bash
contentful space export --space-id YOUR_SPACE_ID
```

### Q: 网站加载速度会变慢吗?

A: 不会。Contentful 使用全球 CDN,通常比 GitHub Pages 更快。建议配置适当的缓存策略。

### Q: 可以多人协作管理内容吗?

A: 可以!免费套餐支持 2 个用户,付费套餐支持更多用户和权限管理。

### Q: 如何添加更多语言?

A: 在 Contentful 中为每个字段添加新语言变体,然后修改 `i18n.js` 添加翻译。

---

## 📞 技术支持

- [Contentful 官方文档](https://www.contentful.com/developers/docs/)
- [Contentful API 参考](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- [社区论坛](https://support.contentful.com/)

---

## 📄 许可证

MIT License

---

## 🎯 下一步

1. ✅ 完成 Contentful 配置
2. ✅ 添加所有内容
3. ⏳ 测试网站功能
4. ⏳ 部署到生产环境
5. ⏳ 配置自动部署(CI/CD)
6. ⏳ 监控和分析使用情况

---

**注意事项:**
- 不要在代码中硬编码 Management Token
- 生产环境建议使用环境变量存储敏感信息
- 定期备份 Contentful 内容
- 确保拥有所有图片和内容的版权
