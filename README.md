# 工具制造公司网站

这是一个响应式的企业产品展示网站，参考了 [safuntool.com](https://cn.safuntool.com/) 的设计风格。

##  主要功能

- ✅ **中英文双语切换** - 支持中文和英文两种语言，一键切换
- ✅ **后台管理系统** - 纯前端后台管理页面，可修改公司信息、联系方式等
- ✅ **响应式设计** - 完美适配PC、平板、手机
- ✅ **产品筛选功能** - 按分类筛选展示产品
- ✅ **轮播图展示** - 自动播放，支持手动切换
- ✅ **数据本地存储** - 后台配置保存在浏览器LocalStorage中

## 项目结构

```
tool-website/
├── index.html          # 首页（支持多语言）
── products.html       # 产品页面
├── admin.html          # 后台管理页面 新增
├── css/
│   └── style.css      # 样式文件
├── js/
│   ├── main.js        # JavaScript功能
│   ── i18n.js        # 多语言支持 ⭐新增
├── images/            # 图片资源目录
│   ├── logo.png       # Logo（需要替换）
│   ├── banner1.jpg    # 轮播图1（需要替换）
│   ├── banner2.jpg    # 轮播图2（需要替换）
│   ├── banner3.jpg    # 轮播图3（需要替换）
│   ├── category-*.jpg # 分类图片（需要替换）
│   ├── brand*.png     # 品牌Logo（需要替换）
│   └── product*.jpg   # 产品图片（需要替换）
└── products/          # 产品详情页目录（待创建）
```

## 快速开始

### 方法1：使用本地服务器

```bash
# 进入项目目录
cd tool-website

# 启动本地服务器（Python 3）
python -m http.server 8080

# 或者使用 Python 2
python -m SimpleHTTPServer 8080

# 或者使用 Node.js (需要先安装 http-server)
npx http-server -p 8080
```

然后在浏览器中访问 `http://localhost:8080`

### 方法2：直接打开

直接在浏览器中打开 `index.html` 文件（部分功能可能需要服务器环境）。

## 自定义配置

### ⭐ 推荐使用后台管理（更简单！）

**方式1：使用后台管理页面（推荐）**

1. 访问 `http://localhost:8000/admin.html`
2. 在"公司信息"标签页修改：
   - 公司名称
   - ICP备案号
   - 公司简介
3. 在"联系方式"标签页修改：
   - 联系电话
   - 联系邮箱
   - 联系地址
4. 点击"保存"按钮，数据自动保存到浏览器
5. 返回首页即可看到更新效果

**方式2：直接编辑HTML文件（传统方式）**

编辑 `index.html` 和 `products.html`：
- 公司名称：搜索 "您的公司名称" 并替换
- 联系电话：搜索电话号码并替换
- 邮箱地址：搜索邮箱并替换
- ICP备案号：搜索 "浙ICP备" 并替换

### 2. 中英文切换

网站已内置中英文双语支持：

- 点击导航栏右上角的 **"English"** 或 **"中文"** 按钮即可切换语言
- 语言偏好会自动保存，下次访问时保持上次选择的语言
- 所有页面内容（导航、轮播图、产品分类等）都会同步切换

如需添加更多语言或修改翻译，编辑 `js/i18n.js` 文件中的 `translations` 对象。

### 3. 替换图片资源

将以下图片放入 `images/` 目录：

**必需图片：**
- `logo.png` - 公司Logo（建议尺寸：200x50px）
- `banner1.jpg`, `banner2.jpg`, `banner3.jpg` - 轮播图（建议尺寸：1920x500px）
- `category-new.jpg` - 新品分类图（建议尺寸：400x300px）
- `category-garden.jpg` - 园林工具分类图
- `category-power.jpg` - 电动工具分类图
- `category-lithium.jpg` - 锂电系列分类图
- `brand1.png` ~ `brand4.png` - 品牌Logo（建议透明背景PNG）
- `product1.jpg` ~ `product6.jpg` - 产品图片（建议尺寸：400x300px）

### 3. 修改配色方案

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #ff6b35;      /* 主色调（橙色）*/
    --secondary-color: #004e89;    /* 次要色（蓝色）*/
    --dark-color: #1a1a2e;         /* 深色 */
    --light-color: #f8f9fa;        /* 浅色背景 */
}
```

### 5. 添加更多产品

在 `products.html` 中复制产品卡片模板：

```html
<div class="product-card" data-category="分类">
    <div class="product-image">
        <img src="images/productX.jpg" alt="产品名称">
    </div>
    <div class="product-info">
        <h3 class="product-title">产品名称</h3>
        <p class="product-description">产品描述</p>
        <div class="product-footer">
            <span class="product-price">¥XXX.XX</span>
            <a href="#" class="product-link">查看详情 <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
</div>
```

分类选项：`new`（新品）、`garden`（园林工具）、`power`（电动工具）、`lithium`（锂电系列）

## 功能特性

- ✅ **中英文双语切换** - 支持中文和英文，一键切换，自动保存语言偏好
- ✅ **后台管理系统** - 纯前端后台，可修改公司信息、联系方式、产品管理等
- ✅ **数据导出导入** - 支持将配置导出为JSON文件，方便备份和迁移
- ✅ 响应式设计，支持PC、平板、手机
- ✅ 自动轮播图（5秒切换）
- ✅ 触摸滑动支持（移动端）
- ✅ 产品分类筛选
- ✅ 平滑滚动动画
- ✅ 回到顶部按钮
- ✅ 浮动联系方式
- ✅ 移动端汉堡菜单

## 技术栈

- HTML5
- CSS3（Flexbox、Grid）
- Vanilla JavaScript（无依赖）
- Font Awesome 图标库

## 浏览器兼容性

- Chrome（推荐）
- Firefox
- Safari
- Edge
- IE11+（部分CSS3特性可能不支持）

## 后续优化建议

1. 添加产品详情页面
2. 集成联系表单功能
3. 添加在线客服系统
4. SEO优化（meta标签、sitemap等）
5. 性能优化（图片懒加载、代码压缩等）
6. 添加多语言支持

## 许可证

MIT License

---

**注意事项：**
- 所有图片资源需要您自行准备并替换
- 建议在正式部署前进行充分测试
- 如需商用，请确保拥有所有图片和内容的版权
