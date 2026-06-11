// ========================================
// CMS 数据加载器 - 支持 Contentful API
// ========================================

/**
 * 从CMS加载并渲染首页内容
 */
async function loadAndRenderHomePage() {
    try {
        console.log('🔄 Loading content from Contentful...');

        // 检查是否已配置Contentful
        const config = localStorage.getItem('contentful-config');
        if (!config) {
            console.warn('⚠️ Contentful not configured, using local data');
            renderHomePage(); // 使用LocalStorage数据
            return;
        }

        // 更新API配置
        const { spaceId, accessToken } = JSON.parse(config);
        window.CONTENTFUL_CONFIG.spaceId = spaceId;
        window.CONTENTFUL_CONFIG.accessToken = accessToken;

        // 从Contentful获取所有内容
        const content = await window.ContentfulAPI.getAllContent();

        if (!content.company) {
            console.warn('⚠️ No company data found in Contentful');
            renderHomePage(); // 降级到LocalStorage
            return;
        }

        console.log('✅ Content loaded from Contentful:', content);

        // 渲染公司信息
        renderCompanyInfo(content.company);

        // 渲染轮播图
        if (content.banners && content.banners.length > 0) {
            renderBanners(content.banners);
        }

        // 渲染产品分类
        if (content.categories && content.categories.length > 0) {
            renderCategories(content.categories);
        }

        // 渲染品牌Logo
        if (content.brands && content.brands.length > 0) {
            renderBrands(content.brands);
        }

        console.log('✅ Home page rendered with Contentful data');

    } catch (error) {
        console.error('❌ Error loading from Contentful:', error);
        console.log('⚠️ Falling back to LocalStorage data');
        renderHomePage(); // 错误时降级到LocalStorage
    }
}

/**
 * 渲染公司信息
 */
function renderCompanyInfo(company) {
    // 更新公司名称
    const companyNameEl = document.querySelector('.company-name');
    if (companyNameEl) {
        companyNameEl.textContent = company.name || '工具制造公司';
    }

    // 更新联系方式链接
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink && company.phone) {
        phoneLink.href = `tel:${company.phone}`;
    }

    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink && company.email) {
        emailLink.href = `mailto:${company.email}`;
    }

    // 更新页脚信息
    const copyrightEl = document.querySelector('[data-i18n="company.copyright"]');
    if (copyrightEl && company.name) {
        copyrightEl.textContent = `COPYRIGHT © ${company.name} ALL RIGHTS RESERVED.`;
    }

    const icpLink = document.querySelector('[data-i18n="company.icp"]');
    if (icpLink && company.icp) {
        icpLink.textContent = company.icp;
    }
}

/**
 * 渲染轮播图
 */
function renderBanners(banners) {
    const slides = document.querySelectorAll('.slide');

    banners.forEach((banner, index) => {
        if (slides[index]) {
            const slide = slides[index];
            const img = slide.querySelector('img');
            const h2 = slide.querySelector('h2');
            const p = slide.querySelector('p');

            // 更新图片
            if (img && banner.imageUrl) {
                img.src = banner.imageUrl;
            }

            // 更新标题和描述
            if (h2) h2.textContent = banner.title || '';
            if (p) p.textContent = banner.description || '';
        }
    });
}

/**
 * 渲染产品分类
 */
function renderCategories(categories) {
    const categoryCards = document.querySelectorAll('.category-card');

    categories.forEach((category, index) => {
        if (categoryCards[index]) {
            const card = categoryCards[index];
            const img = card.querySelector('img');
            const badge = card.querySelector('.category-badge');
            const h3 = card.querySelector('h3');
            const p = card.querySelector('p');

            // 更新图片
            if (img && category.imageUrl) {
                img.src = category.imageUrl;
            }

            // 更新徽章
            if (badge) {
                if (category.badge) {
                    badge.textContent = category.badge;
                    badge.style.display = 'block';
                } else {
                    badge.style.display = 'none';
                }
            }

            // 更新名称和描述
            if (h3) h3.textContent = category.name || '';
            if (p) p.textContent = category.description || '';
        }
    });
}

/**
 * 渲染品牌Logo
 */
function renderBrands(brands) {
    const brandImages = document.querySelectorAll('.brand-item img');

    brands.forEach((brand, index) => {
        if (brandImages[index] && brand.logoUrl) {
            brandImages[index].src = brand.logoUrl;
        }
    });
}

/**
 * 加载产品页面数据
 */
async function loadAndRenderProductsPage() {
    try {
        console.log('🔄 Loading products from Contentful...');

        const config = localStorage.getItem('contentful-config');
        if (!config) {
            console.warn('⚠️ Contentful not configured');
            renderProductsPage();
            return;
        }

        const { spaceId, accessToken } = JSON.parse(config);
        window.CONTENTFUL_CONFIG.spaceId = spaceId;
        window.CONTENTFUL_CONFIG.accessToken = accessToken;

        // 获取所有分类
        const categories = await window.ContentfulAPI.getCategories();

        // 获取每个分类下的产品
        const productsByCategory = {};
        for (const category of categories) {
            const products = await window.ContentfulAPI.getProducts(category.id);
            productsByCategory[category.id] = products;
        }

        console.log('✅ Products loaded:', { categories, productsByCategory });

        // 这里可以添加产品页面的渲染逻辑
        // 由于products.html的具体结构未知,暂时只记录日志

    } catch (error) {
        console.error('❌ Error loading products:', error);
    }
}

// ========================================
// 页面加载时自动执行
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 检测当前页面并加载相应数据
    if (window.location.pathname.includes('products.html')) {
        loadAndRenderProductsPage();
    } else {
        loadAndRenderHomePage();
    }
});
