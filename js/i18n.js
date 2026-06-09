// 国际化(i18n)多语言支持
const i18n = {
    // 当前语言
    currentLang: 'zh',

    // 语言配置
    translations: {
        zh: {
            // 导航菜单
            'nav.home': '首页',
            'nav.products': '产品',
            'nav.about': '关于我们',
            'nav.contact': '联系',
            'nav.menu': '菜单',
            'nav.phone': '电话',

            // 公司信息
            'company.name': '您的公司名称',
            'company.copyright': 'COPYRIGHT © 您的公司名称 ALL RIGHTS RESERVED.',
            'company.icp': '浙ICP备XXXXXXXX号-X',

            // 首页内容
            'home.title': '工具制造公司 - 专业园林工具、电动工具制造商',
            'home.hero.slide1.title': '专业工具制造商',
            'home.hero.slide1.desc': '高品质园林工具与电动工具',
            'home.hero.slide2.title': '创新技术',
            'home.hero.slide2.desc': '领先的锂电系列解决方案',
            'home.hero.slide3.title': '品质保证',
            'home.hero.slide3.desc': '多年行业经验值得信赖',

            // 产品中心
            'home.products.title': '产品中心',
            'home.products.new': '新品',
            'home.products.new.desc': '最新产品系列',
            'home.products.garden': '园林工具',
            'home.products.garden.desc': '专业园林设备',
            'home.products.power': '电动工具',
            'home.products.power.desc': '高效电动工具',
            'home.products.lithium': '锂电系列',
            'home.products.lithium.desc': '便携式锂电工具',
            'home.products.viewMore': '查看更多',

            // 品牌展示
            'home.brands.title': '自主品牌',

            // 页脚
            'footer.privacy': '隐私政策',
            'footer.terms': '使用条款',

            // 产品页面
            'products.title': '产品中心 - 工具制造公司',
            'products.pageTitle': '产品中心',
            'products.filter.all': '全部',
            'products.filter.new': '新品',
            'products.filter.garden': '园林工具',
            'products.filter.power': '电动工具',
            'products.filter.lithium': '锂电系列',
            'products.viewDetails': '查看详情',

            // 语言切换
            'lang.switch': 'English',
            'lang.current': '中文'
        },

        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.products': 'Products',
            'nav.about': 'About Us',
            'nav.contact': 'Contact',
            'nav.menu': 'Menu',
            'nav.phone': 'Phone',

            // Company Info
            'company.name': 'Your Company Name',
            'company.copyright': 'COPYRIGHT © Your Company Name ALL RIGHTS RESERVED.',
            'company.icp': 'Zhejiang ICP No.XXXXXXXX-X',

            // Home Content
            'home.title': 'Tool Manufacturing Co. - Professional Garden & Power Tools Manufacturer',
            'home.hero.slide1.title': 'Professional Tool Manufacturer',
            'home.hero.slide1.desc': 'High-quality garden and power tools',
            'home.hero.slide2.title': 'Innovative Technology',
            'home.hero.slide2.desc': 'Leading lithium series solutions',
            'home.hero.slide3.title': 'Quality Assurance',
            'home.hero.slide3.desc': 'Years of industry experience you can trust',

            // Products Center
            'home.products.title': 'Product Center',
            'home.products.new': 'New Products',
            'home.products.new.desc': 'Latest product series',
            'home.products.garden': 'Garden Tools',
            'home.products.garden.desc': 'Professional garden equipment',
            'home.products.power': 'Power Tools',
            'home.products.power.desc': 'Efficient power tools',
            'home.products.lithium': 'Lithium Series',
            'home.products.lithium.desc': 'Portable lithium tools',
            'home.products.viewMore': 'View More',

            // Brands
            'home.brands.title': 'Our Brands',

            // Footer
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Use',

            // Products Page
            'products.title': 'Product Center - Tool Manufacturing Co.',
            'products.pageTitle': 'Product Center',
            'products.filter.all': 'All',
            'products.filter.new': 'New',
            'products.filter.garden': 'Garden',
            'products.filter.power': 'Power Tools',
            'products.filter.lithium': 'Lithium',
            'products.viewDetails': 'View Details',

            // Language Switch
            'lang.switch': '中文',
            'lang.current': 'English'
        }
    },

    // 获取翻译文本
    t(key) {
        return this.translations[this.currentLang][key] || key;
    },

    // 设置语言
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('language', lang);
            this.updatePageContent();
            document.documentElement.lang = lang;
        }
    },

    // 获取当前语言
    getLanguage() {
        const saved = localStorage.getItem('language');
        return saved && this.translations[saved] ? saved : 'zh';
    },

    // 更新页面内容
    updatePageContent() {
        // 更新所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // 更新带有 data-i18n-placeholder 的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // 更新页面标题
        const titleElement = document.querySelector('title');
        if (titleElement && this.t('home.title')) {
            titleElement.textContent = this.t('home.title');
        }

        // 更新语言切换按钮
        const langSwitchBtn = document.getElementById('langSwitchBtn');
        if (langSwitchBtn) {
            langSwitchBtn.innerHTML = `<i class="fas fa-globe"></i> ${this.t('lang.switch')}`;
        }
    },

    // 初始化
    init() {
        this.setLanguage(this.getLanguage());
    }
};

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    i18n.init();
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
