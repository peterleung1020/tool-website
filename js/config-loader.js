// 配置文件加载器
let siteConfig = null;

// 从 config.json 加载配置
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            console.warn('Config file not found, using defaults');
            return;
        }
        
        siteConfig = await response.json();
        console.log('Config loaded:', siteConfig);
        
        // 应用配置到页面
        applyConfigToPage();
    } catch (error) {
        console.error('Failed to load config:', error);
    }
}

// 将配置应用到页面
function applyConfigToPage() {
    if (!siteConfig) return;

    // 更新公司信息
    if (siteConfig.company) {
        const companyNameElements = document.querySelectorAll('[data-i18n="company.name"], .company-name');
        companyNameElements.forEach(el => {
            if (el && !el.hasAttribute('data-i18n')) {
                el.textContent = siteConfig.company.name || el.textContent;
            }
        });

        const icpElements = document.querySelectorAll('[data-i18n="company.icp"]');
        icpElements.forEach(el => {
            el.textContent = siteConfig.company.icp || el.textContent;
        });
    }

    // 更新联系方式
    if (siteConfig.contact) {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.href = `tel:${siteConfig.contact.phone}`;
        });

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${siteConfig.contact.email}`;
        });
    }

    // 更新轮播图
    if (siteConfig.banners && siteConfig.banners.length > 0) {
        const slides = document.querySelectorAll('.slide');
        siteConfig.banners.forEach((banner, index) => {
            if (slides[index]) {
                const img = slides[index].querySelector('img');
                if (img) img.src = banner.image;
                
                const title = slides[index].querySelector('h2[data-i18n]');
                if (title) {
                    title.removeAttribute('data-i18n');
                    title.textContent = banner.title;
                }
                
                const desc = slides[index].querySelector('p[data-i18n]');
                if (desc) {
                    desc.removeAttribute('data-i18n');
                    desc.textContent = banner.description;
                }
            }
        });
    }

    // 更新产品分类
    if (siteConfig.categories && siteConfig.categories.length > 0) {
        const categoryCards = document.querySelectorAll('.category-card');
        siteConfig.categories.forEach((category, index) => {
            if (categoryCards[index]) {
                const card = categoryCards[index];
                const img = card.querySelector('img');
                if (img) img.src = category.image;
                
                const title = card.querySelector('h3[data-i18n]');
                if (title) {
                    title.removeAttribute('data-i18n');
                    title.textContent = category.name;
                }
                
                const desc = card.querySelector('p[data-i18n]');
                if (desc) {
                    desc.removeAttribute('data-i18n');
                    desc.textContent = category.description;
                }
            }
        });
    }

    // 更新品牌Logo
    if (siteConfig.brands && siteConfig.brands.length > 0) {
        const brandImages = document.querySelectorAll('.brand-item img');
        siteConfig.brands.forEach((brandSrc, index) => {
            if (brandImages[index]) {
                brandImages[index].src = brandSrc;
            }
        });
    }
}

// 导出配置供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadConfig, applyConfigToPage, getConfig: () => siteConfig };
}
