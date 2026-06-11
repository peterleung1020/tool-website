// ========================================
// Contentful API 客户端
// ========================================

// Contentful配置 - 请替换为您的实际Space ID和Access Token
const CONTENTFUL_CONFIG = {
    spaceId: 'YOUR_SPACE_ID',  // 在 https://app.contentful.com 创建空间后获取
    accessToken: 'YOUR_ACCESS_TOKEN'  // Delivery API Token (只读)
};

// API基础URL
const CONTENTFUL_API = `https://cdn.contentful.com/spaces/${CONTENTFUL_CONFIG.spaceId}`;

/**
 * 从Contentful获取公司信息
 */
async function getCompanyInfo() {
    try {
        const response = await fetch(
            `${CONTENTFUL_API}/entries?content_type=companyInfo&limit=1`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`
                }
            }
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].fields;
        }
        return null;
    } catch (error) {
        console.error('Error fetching company info:', error);
        return null;
    }
}

/**
 * 从Contentful获取轮播图列表
 */
async function getBanners() {
    try {
        const response = await fetch(
            `${CONTENTFUL_API}/entries?content_type=banner&order=fields.order`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();

        // 同时获取图片资源
        const assetsResponse = await fetch(
            `${CONTENTFUL_API}/assets`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`
                }
            }
        );
        const assetsData = await assetsResponse.json();
        const assets = {};
        assetsData.items.forEach(asset => {
            assets[asset.sys.id] = asset.fields.file.url;
        });

        // 将图片链接替换为实际URL
        return data.items.map(item => ({
            ...item.fields,
            imageUrl: assets[item.fields.image.sys.id]
        }));
    } catch (error) {
        console.error('Error fetching banners:', error);
        return [];
    }
}

/**
 * 从Contentful获取产品分类
 */
async function getCategories() {
    try {
        const response = await fetch(
            `${CONTENTFUL_API}/entries?content_type=category&order=fields.order`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();

        // 获取图片资源
        const assetsResponse = await fetch(
            `${CONTENTFUL_API}/assets`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`
                }
            }
        );
        const assetsData = await assetsResponse.json();
        const assets = {};
        assetsData.items.forEach(asset => {
            assets[asset.sys.id] = asset.fields.file.url;
        });

        return data.items.map(item => ({
            id: item.sys.id,
            ...item.fields,
            imageUrl: item.fields.image ? assets[item.fields.image.sys.id] : null
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

/**
 * 从Contentful获取产品列表(支持层级结构)
 */
async function getProducts(categoryId = null) {
    try {
        let url = `${CONTENTFUL_API}/entries?content_type=product`;
        if (categoryId) {
            url += `&fields.category.sys.id=${categoryId}`;
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        // 获取所有分类引用
        const includes = data.includes || {};
        const categories = {};
        (includes.Entry || []).forEach(entry => {
            categories[entry.sys.id] = entry;
        });

        // 获取图片资源
        const assetsResponse = await fetch(
            `${CONTENTFUL_API}/assets`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`
                }
            }
        );
        const assetsData = await assetsResponse.json();
        const assets = {};
        assetsData.items.forEach(asset => {
            assets[asset.sys.id] = asset.fields.file.url;
        });

        // 构建产品数据
        const products = data.items.map(item => ({
            id: item.sys.id,
            ...item.fields,
            imageUrl: item.fields.image ? assets[item.fields.image.sys.id] : null,
            categoryName: item.fields.category && categories[item.fields.category.sys.id]
                ? categories[item.fields.category.sys.id].fields.name
                : ''
        }));

        // 构建树形结构
        return buildProductTree(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

/**
 * 构建产品树形结构
 */
function buildProductTree(products) {
    const productMap = {};
    const tree = [];

    // 创建映射
    products.forEach(product => {
        product.children = [];
        productMap[product.id] = product;
    });

    // 构建树
    products.forEach(product => {
        if (product.parentProduct) {
            const parentId = product.parentProduct.sys.id;
            if (productMap[parentId]) {
                productMap[parentId].children.push(product);
            } else {
                tree.push(product);
            }
        } else {
            tree.push(product);
        }
    });

    return tree;
}

/**
 * 从Contentful获取品牌列表
 */
async function getBrands() {
    try {
        const response = await fetch(
            `${CONTENTFUL_API}/entries?content_type=brand&order=fields.order`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();

        // 获取图片资源
        const assetsResponse = await fetch(
            `${CONTENTFUL_API}/assets`,
            {
                headers: {
                    'Authorization': `Bearer ${CONTENTFUL_CONFIG.accessToken}`
                }
            }
        );
        const assetsData = await assetsResponse.json();
        const assets = {};
        assetsData.items.forEach(asset => {
            assets[asset.sys.id] = asset.fields.file.url;
        });

        return data.items.map(item => ({
            id: item.sys.id,
            ...item.fields,
            logoUrl: assets[item.fields.logo.sys.id]
        }));
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
}

/**
 * 获取所有内容(用于首页渲染)
 */
async function getAllContent() {
    const [company, banners, categories, products, brands] = await Promise.all([
        getCompanyInfo(),
        getBanners(),
        getCategories(),
        getProducts(),
        getBrands()
    ]);

    return {
        company,
        banners,
        categories,
        products,
        brands
    };
}

// 导出API
if (typeof window !== 'undefined') {
    window.ContentfulAPI = {
        getCompanyInfo,
        getBanners,
        getCategories,
        getProducts,
        getBrands,
        getAllContent
    };
}
