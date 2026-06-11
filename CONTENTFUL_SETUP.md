# Contentful Headless CMS 设置指南

## 📋 目录

1. [快速开始](#快速开始)
2. [注册和配置](#注册和配置)
3. [导入内容模型](#导入内容模型)
4. [添加内容](#添加内容)
5. [本地开发](#本地开发)
6. [部署到生产环境](#部署到生产环境)

---

## 🚀 快速开始

### 什么是 Headless CMS?

Headless CMS(无头CMS)将内容管理与前端展示分离,通过API提供内容。相比传统的LocalStorage方案:

**优势:**
- ✅ 云端存储,多设备同步访问
- ✅ 多人协作管理内容
- ✅ 版本控制和内容审核流程
- ✅ CDN全球加速
- ✅ 专业的内容建模工具

**适用场景:**
- 多个网站需要共享内容
- 团队协作管理
- 需要内容审核流程
- 多端发布(Web/App/小程序)

---

## 📝 注册和配置

### 步骤 1: 注册 Contentful

1. 访问 [Contentful 官网](https://www.contentful.com/sign-up/)
2. 使用邮箱或GitHub账号注册
3. 选择免费套餐(Starter Plan)

**免费套餐包含:**
- 2个用户
- 每月25,000条API记录
- 5个空间(Spaces)
- 无限资产(Media)

### 步骤 2: 创建空间(Space)

1. 登录后点击 **"Create space"**
2. 选择 **"Create from scratch"**
3. 填写信息:
   - Space name: `Tool Website`
   - Region: `EU (Europe)` 或 `US (North America)`
4. 点击 **"Create space"**

### 步骤 3: 获取 API 密钥

1. 进入空间后,点击顶部导航 **"Settings" → "API keys"**
2. 点击 **"Add API key"**
3. 填写名称: `Website Delivery API`
4. 复制以下信息(稍后需要填入):
   - **Space ID**: 例如 `abc123def456`
   - **Delivery API access token**: 例如 `xyz789...`

⚠️ **重要:** 只使用 **Delivery Token**(只读),不要使用 Preview 或 Management Token!

---

## 📦 导入内容模型

### 方法 1: 使用 CLI 工具(推荐)

```bash
# 1. 安装 Contentful CLI
npm install -g contentful-cli

# 2. 登录
contentful login

# 3. 在项目根目录执行导入
cd d:/QODER/tool-website
contentful space import \
  --space-id YOUR_SPACE_ID \
  --content-file contentful-model.json
```

### 方法 2: 手动创建

1. 在 Contentful 界面点击 **"Content model"**
2. 点击 **"Add content type"**
3. 按照 `contentful-model.json` 中的定义逐个创建字段

**需要创建的内容类型:**
- `companyInfo` - 公司信息
- `banner` - 轮播图
- `category` - 产品分类
- `product` - 产品
- `brand` - 品牌Logo

详细字段定义请参考 `contentful-model.json` 文件。

---

## ✍️ 添加内容

### 1. 上传媒体资源

1. 点击 **"Media"** 标签
2. 点击 **"Upload asset"**
3. 上传所有图片:
   - Banner图片(建议尺寸: 1920x800px)
   - 分类图片(建议尺寸: 800x600px)
   - 产品图片(建议尺寸: 800x800px)
   - 品牌Logo(建议尺寸: 400x400px)

### 2. 添加公司信息

1. 点击 **"Content"** 标签
2. 点击 **"Add entry"** → **"公司信息"**
3. 填写:
   - 公司名称
   - ICP备案号
   - 公司描述
   - 联系电话
   - 邮箱
   - 地址
4. 点击右上角 **"Publish"**

### 3. 添加轮播图

1. 点击 **"Add entry"** → **"轮播图"**
2. 填写标题、描述
3. 从媒体库选择图片
4. 设置排序(0, 1, 2...)
5. 发布

重复以上步骤添加所有轮播图。

### 4. 添加产品分类

1. 点击 **"Add entry"** → **"产品分类"**
2. 填写分类名称、描述
3. 上传分类图片
4. 可选: 添加徽章(如 "NEW")
5. 设置排序
6. 发布

### 5. 添加产品

1. 点击 **"Add entry"** → **"产品"**
2. 填写产品信息:
   - 产品名称
   - 所属分类(链接到已创建的分类)
   - 父级产品(可选,用于层级结构)
   - 产品描述
   - 价格
   - 产品图片
   - 是否推荐
3. 发布

### 6. 添加品牌Logo

1. 点击 **"Add entry"** → **"品牌Logo"**
2. 填写品牌名称
3. 上传Logo图片
4. 设置排序
5. 发布

---

## 💻 本地开发

### 步骤 1: 配置网站

1. 打开浏览器访问: `http://localhost/setup-contentful.html`
2. 填入 Space ID 和 Access Token
3. 点击 **"保存配置"**
4. 点击 **"测试连接"** 验证配置

### 步骤 2: 预览网站

访问 `http://localhost/index.html`,网站会自动从 Contentful 加载内容。

### 步骤 3: 修改内容

有两种方式修改内容:

**方式 A: Contentful 后台(推荐)**
- 直接在 [Contentful Dashboard](https://app.contentful.com) 编辑
- 修改后点击 Publish
- 刷新网站即可看到更新

**方式 B: 自定义后台管理**
- 访问 `admin.html`
- 使用集成管理界面操作

---

## 🌐 部署到生产环境

### GitHub Pages 部署

1. **提交代码到 GitHub:**

```bash
git add .
git commit -m "Upgrade to Contentful Headless CMS"
git push origin main
```

2. **配置环境变量(推荐):**

为了安全,不应该在前端代码中硬编码 API Token。

**选项 1: 使用 Netlify/Vercel 部署**
- 在平台设置中添加环境变量:
  - `CONTENTFUL_SPACE_ID`
  - `CONTENTFUL_ACCESS_TOKEN`

**选项 2: 继续使用前端的 LocalStorage 配置**
- 适合小型项目和个人网站
- 在首次访问时通过 setup 页面配置

3. **启用自动缓存:**

Contentful 自带 CDN 缓存,内容发布后通常在几秒内全球同步。

---

## 🔧 高级配置

### 内容预览

在 Contentful 中配置预览 URL:

1. Settings → Webhooks
2. 添加 Webhook 指向你的开发环境
3. 每次发布内容时自动触发预览更新

### 多语言支持

当前模型支持中英文双语:

```json
{
  "title": {
    "zh-CN": "专业工具制造商",
    "en-US": "Professional Tool Manufacturer"
  }
}
```

### 自定义域名

如果使用 GitHub Pages,可以配置自定义域名:

1. 在仓库 Settings → Pages → Custom domain
2. 添加 CNAME 文件
3. 在 DNS 服务商处配置 CNAME 记录

---

## ❓ 常见问题

### Q: Contentful 收费吗?

A: 免费套餐足够小型网站使用。如果超出限制(月API调用>25,000次),需要升级到付费计划($300/月起)。

### Q: 图片存储在哪里?

A: 图片存储在 Contentful 的 CDN 上,全球加速访问。免费套餐包含无限的媒体资源。

### Q: 如何备份内容?

A: 可以使用 Contentful CLI 导出所有内容:

```bash
contentful space export --space-id YOUR_SPACE_ID
```

### Q: 网站加载速度会变慢吗?

A: 不会。Contentful 使用全球 CDN,通常比 GitHub Pages 更快。建议添加适当的缓存策略。

### Q: 如果 Contentful 服务中断怎么办?

A: 当前实现有降级机制:如果无法连接 Contentful,会自动使用 LocalStorage 中的数据。

---

## 📞 技术支持

- [Contentful 官方文档](https://www.contentful.com/developers/docs/)
- [Contentful API 参考](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- [社区论坛](https://support.contentful.com/)

---

## 🎯 下一步

1. ✅ 完成 Contentful 配置
2. ✅ 添加所有内容
3. ⏳ 测试网站功能
4. ⏳ 提交代码到 GitHub
5. ⏳ 配置自动部署
6. ⏳ 监控和分析使用情况
