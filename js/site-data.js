// ========================================
// 网站数据管理系统 - 基于 LocalStorage
// ========================================

const SITE_DATA_KEY = 'tool-website-data';

// 默认数据结构
const defaultData = {
    // 公司信息
    company: {
        name: '工具制造公司',
        icp: '浙ICP备XXXXXXXX号-X',
        description: '专业园林工具、电动工具制造商'
    },

    // 联系方式
    contact: {
        phone: '0579-87228379',
        email: 'sales@yourcompany.com',
        address: ''
    },

    // 轮播图（支持Base64图片）
    banners: [
        {
            id: 'banner_1',
            title: '专业工具制造商',
            description: '高品质园林工具与电动工具',
            image: 'images/banner1.jpg'  // 可以是URL或Base64
        },
        {
            id: 'banner_2',
            title: '创新技术',
            description: '领先的锂电系列解决方案',
            image: 'images/banner2.jpg'
        },
        {
            id: 'banner_3',
            title: '品质保证',
            description: '多年行业经验值得信赖',
            image: 'images/banner3.jpg'
        }
    ],

    // 产品分类
    categories: [
        {
            id: 'cat_new',
            name: '新品',
            description: '最新产品系列',
            image: 'images/category-new.jpg',
            badge: 'NEW'
        },
        {
            id: 'cat_garden',
            name: '园林工具',
            description: '专业园林设备',
            image: 'images/category-garden.jpg',
            badge: null
        },
        {
            id: 'cat_power',
            name: '电动工具',
            description: '高效电动工具',
            image: 'images/category-power.jpg',
            badge: null
        },
        {
            id: 'cat_lithium',
            name: '锂电系列',
            description: '便携式锂电工具',
            image: 'images/category-lithium.jpg',
            badge: null
        }
    ],

    // 产品列表（支持层级结构）
    products: [],

    // 品牌Logo
    brands: [
        'images/brand1.png',
        'images/brand2.png',
        'images/brand3.png',
        'images/brand4.png'
    ]
};

// ========================================
// 数据操作API
// ========================================

/**
 * 获取所有网站数据
 */
function getSiteData() {
    const data = localStorage.getItem(SITE_DATA_KEY);
    return data ? JSON.parse(data) : defaultData;
}

/**
 * 保存网站数据
 */
function saveSiteData(data) {
    localStorage.setItem(SITE_DATA_KEY, JSON.stringify(data));
    console.log('✅ Site data saved to LocalStorage');
}

/**
 * 初始化数据（首次访问时）
 */
function initializeSiteData() {
    if (!localStorage.getItem(SITE_DATA_KEY)) {
        saveSiteData(defaultData);
        console.log('✅ Site data initialized with defaults');
    }
}

/**
 * 重置为默认数据
 */
function resetToDefaults() {
    if (confirm('确定要重置所有数据为默认值吗？此操作不可恢复！')) {
        saveSiteData(defaultData);
        location.reload();
    }
}

// ========================================
// 公司信息API
// ========================================

function updateCompanyInfo(name, icp, description) {
    const data = getSiteData();
    data.company = { name, icp, description };
    saveSiteData(data);
    renderHomePage();
}

// ========================================
// 联系方式API
// ========================================

function updateContactInfo(phone, email, address) {
    const data = getSiteData();
    data.contact = { phone, email, address };
    saveSiteData(data);
    renderHomePage();
}

// ========================================
// 轮播图API
// ========================================

function addBanner(title, description, image) {
    const data = getSiteData();
    const newBanner = {
        id: 'banner_' + Date.now(),
        title,
        description,
        image
    };
    data.banners.push(newBanner);
    saveSiteData(data);
    renderHomePage();
    return newBanner;
}

function updateBanner(id, title, description, image) {
    const data = getSiteData();
    const banner = data.banners.find(b => b.id === id);
    if (banner) {
        banner.title = title || banner.title;
        banner.description = description || banner.description;
        banner.image = image || banner.image;
        saveSiteData(data);
        renderHomePage();
    }
}

function deleteBanner(id) {
    const data = getSiteData();
    data.banners = data.banners.filter(b => b.id !== id);
    saveSiteData(data);
    renderHomePage();
}

// ========================================
// 分类管理API
// ========================================

function addCategory(name, description, image, badge = null) {
    const data = getSiteData();
    const newCategory = {
        id: 'cat_' + Date.now(),
        name,
        description,
        image,
        badge
    };
    data.categories.push(newCategory);
    saveSiteData(data);
    renderHomePage();
    return newCategory;
}

function updateCategory(id, name, description, image, badge) {
    const data = getSiteData();
    const category = data.categories.find(c => c.id === id);
    if (category) {
        category.name = name || category.name;
        category.description = description || category.description;
        category.image = image || category.image;
        category.badge = badge !== undefined ? badge : category.badge;
        saveSiteData(data);
        renderHomePage();
    }
}

function deleteCategory(id) {
    const data = getSiteData();
    data.categories = data.categories.filter(c => c.id !== id);
    // 同时删除该分类下的所有产品
    data.products = data.products.filter(p => p.categoryId !== id);
    saveSiteData(data);
    renderHomePage();
}

// ========================================
// 产品管理API
// ========================================

function addProduct(name, categoryId, parentId, description, price, image) {
    const data = getSiteData();
    const newProduct = {
        id: 'prod_' + Date.now(),
        name,
        categoryId,
        parentId: parentId || null,
        description,
        price,
        image,
        createdAt: new Date().toISOString()
    };
    data.products.push(newProduct);
    saveSiteData(data);
    renderProductsPage();
    return newProduct;
}

function updateProduct(id, name, categoryId, parentId, description, price, image) {
    const data = getSiteData();
    const product = data.products.find(p => p.id === id);
    if (product) {
        product.name = name || product.name;
        product.categoryId = categoryId || product.categoryId;
        product.parentId = parentId !== undefined ? parentId : product.parentId;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        saveSiteData(data);
        renderProductsPage();
    }
}

function deleteProduct(id) {
    const data = getSiteData();
    // 递归删除子产品
    function deleteWithChildren(productId) {
        data.products = data.products.filter(p => p.id !== productId);
        const children = data.products.filter(p => p.parentId === productId);
        children.forEach(child => deleteWithChildren(child.id));
    }
    
    deleteWithChildren(id);
    saveSiteData(data);
    renderProductsPage();
}

function getProductTree(categoryId = null) {
    const data = getSiteData();
    const products = categoryId 
        ? data.products.filter(p => p.categoryId === categoryId)
        : data.products;
    
    // 构建树形结构
    const topLevel = products.filter(p => !p.parentId);
    const tree = topLevel.map(product => ({
        ...product,
        children: products.filter(p => p.parentId === product.id)
    }));
    
    return tree;
}

// ========================================
// 品牌管理API
// ========================================

function updateBrand(index, imageUrl) {
    const data = getSiteData();
    if (index >= 0 && index < data.brands.length) {
        data.brands[index] = imageUrl;
        saveSiteData(data);
        renderHomePage();
    }
}

// ========================================
// 页面渲染函数
// ========================================

/**
 * 渲染首页内容
 */
function renderHomePage() {
    const data = getSiteData();
    
    // 更新公司信息
    const companyNameEl = document.querySelector('.company-name');
    if (companyNameEl) companyNameEl.textContent = data.company.name;
    
    // 更新联系方式链接
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) phoneLink.href = `tel:${data.contact.phone}`;
    
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) emailLink.href = `mailto:${data.contact.email}`;
    
    // 更新页脚信息
    const copyrightEl = document.querySelector('[data-i18n="company.copyright"]');
    if (copyrightEl) copyrightEl.textContent = `COPYRIGHT © ${data.company.name} ALL RIGHTS RESERVED.`;
    
    const icpLink = document.querySelector('[data-i18n="company.icp"]');
    if (icpLink) icpLink.textContent = data.company.icp;
    
    // 更新轮播图
    const slides = document.querySelectorAll('.slide');
    data.banners.forEach((banner, index) => {
        if (slides[index]) {
            const img = slides[index].querySelector('img');
            if (img) img.src = banner.image;
            
            const h2 = slides[index].querySelector('h2');
            if (h2) h2.textContent = banner.title;
            
            const p = slides[index].querySelector('p');
            if (p) p.textContent = banner.description;
        }
    });
    
    // 更新产品分类
    const categoryCards = document.querySelectorAll('.category-card');
    data.categories.forEach((category, index) => {
        if (categoryCards[index]) {
            const card = categoryCards[index];
            const img = card.querySelector('img');
            if (img) img.src = category.image;
            
            const badge = card.querySelector('.category-badge');
            if (badge) {
                if (category.badge) {
                    badge.textContent = category.badge;
                    badge.style.display = 'block';
                } else {
                    badge.style.display = 'none';
                }
            }
            
            const h3 = card.querySelector('h3');
            if (h3) h3.textContent = category.name;
            
            const p = card.querySelector('p');
            if (p) p.textContent = category.description;
        }
    });
    
    // 更新品牌Logo
    const brandImages = document.querySelectorAll('.brand-item img');
    data.brands.forEach((brandSrc, index) => {
        if (brandImages[index]) {
            brandImages[index].src = brandSrc;
        }
    });
    
    console.log('✅ Home page rendered with latest data from LocalStorage');
}

/**
 * 渲染产品页面
 */
function renderProductsPage() {
    const data = getSiteData();
    
    // 这里可以添加产品页面的渲染逻辑
    console.log('✅ Products page rendered with latest data from LocalStorage');
}

// ========================================
// 初始化和事件监听
// ========================================

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeSiteData();
    
    // 检测当前页面类型并渲染
    if (window.location.pathname.includes('products.html')) {
        renderProductsPage();
    } else {
        renderHomePage();
    }
    
    // 监听LocalStorage变化（多标签页同步）
    window.addEventListener('storage', function(e) {
        if (e.key === SITE_DATA_KEY) {
            console.log('🔄 Data changed in another tab, refreshing...');
            if (window.location.pathname.includes('products.html')) {
                renderProductsPage();
            } else {
                renderHomePage();
            }
        }
    });
});

// 导出API供全局使用
if (typeof window !== 'undefined') {
    window.SiteData = {
        get: getSiteData,
        save: saveSiteData,
        reset: resetToDefaults,
        company: { update: updateCompanyInfo },
        contact: { update: updateContactInfo },
        banners: { add: addBanner, update: updateBanner, delete: deleteBanner },
        categories: { add: addCategory, update: updateCategory, delete: deleteCategory },
        products: { 
            add: addProduct, 
            update: updateProduct, 
            delete: deleteProduct,
            getTree: getProductTree
        },
        brands: { update: updateBrand }
    };
}
