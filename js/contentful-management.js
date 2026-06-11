// ========================================
// Contentful Management API 客户端
// 用于后台管理操作
// ========================================

const MANAGEMENT_API_BASE = 'https://api.contentful.com/spaces';

/**
 * 获取Management Token(需要用户手动配置)
 */
function getManagementToken() {
    const config = localStorage.getItem('contentful-management-config');
    if (!config) {
        throw new Error('Management API not configured. Please add your Management Token in settings.');
    }
    return JSON.parse(config).managementToken;
}

/**
 * 创建或更新公司信息
 */
async function upsertCompanyInfo(data) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    try {
        // 先查询是否已存在
        const response = await fetch(
            `${MANAGEMENT_API_BASE}/${config.spaceId}/entries?content_type=companyInfo&limit=1`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/vnd.contentful.management.v1+json'
                }
            }
        );
        const result = await response.json();

        if (result.items && result.items.length > 0) {
            // 更新现有条目
            const entryId = result.items[0].sys.id;
            const version = result.items[0].sys.version;
            return await updateEntry(entryId, data, version);
        } else {
            // 创建新条目
            return await createEntry('companyInfo', data);
        }
    } catch (error) {
        console.error('Error upserting company info:', error);
        throw error;
    }
}

/**
 * 创建轮播图条目
 */
async function createBanner(data) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    try {
        // 先上传图片
        const assetId = await uploadImage(data.image, `banner-${Date.now()}`);

        // 创建条目
        const entryData = {
            fields: {
                title: { 'zh-CN': data.title },
                description: { 'zh-CN': data.description },
                image: { 'zh-CN': { sys: { type: 'Link', linkType: 'Asset', id: assetId } } },
                order: { 'zh-CN': data.order || 0 }
            }
        };

        const response = await fetch(
            `${MANAGEMENT_API_BASE}/${config.spaceId}/entries`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/vnd.contentful.management.v1+json',
                    'X-Contentful-Content-Type': 'banner'
                },
                body: JSON.stringify(entryData)
            }
        );

        const result = await response.json();

        // 发布条目
        await publishEntry(result.sys.id);

        return result;
    } catch (error) {
        console.error('Error creating banner:', error);
        throw error;
    }
}

/**
 * 上传图片到Contentful
 */
async function uploadImage(fileUrl, fileName) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    try {
        // 如果是Base64,需要先转换
        let uploadData;
        if (fileUrl.startsWith('data:')) {
            // Base64转Blob
            const blob = await fetch(fileUrl).then(r => r.blob());
            uploadData = blob;
        } else {
            // URL直接上传
            uploadData = fileUrl;
        }

        // 创建上传
        const uploadResponse = await fetch(
            `${MANAGEMENT_API_BASE}/${config.spaceId}/uploads`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/octet-stream'
                },
                body: uploadData instanceof Blob ? uploadData : await fetch(uploadData).then(r => r.blob())
            }
        );

        const uploadResult = await uploadResponse.json();
        const uploadId = uploadResult.sys.id;

        // 创建Asset
        const assetData = {
            fields: {
                title: { 'zh-CN': fileName },
                file: {
                    'zh-CN': {
                        contentType: 'image/jpeg',
                        fileName: `${fileName}.jpg`,
                        uploadFrom: {
                            sys: {
                                type: 'Link',
                                linkType: 'Upload',
                                id: uploadId
                            }
                        }
                    }
                }
            }
        };

        const assetResponse = await fetch(
            `${MANAGEMENT_API_BASE}/${config.spaceId}/assets`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/vnd.contentful.management.v1+json'
                },
                body: JSON.stringify(assetData)
            }
        );

        const assetResult = await assetResponse.json();

        // 处理Asset
        await processAsset(assetResult.sys.id);

        return assetResult.sys.id;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
}

/**
 * 处理Asset(使其可用)
 */
async function processAsset(assetId) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    await fetch(
        `${MANAGEMENT_API_BASE}/${config.spaceId}/assets/${assetId}/files/zh-CN/process`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json'
            }
        }
    );

    // 发布Asset
    await fetch(
        `${MANAGEMENT_API_BASE}/${config.spaceId}/assets/${assetId}/published`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json'
            }
        }
    );
}

/**
 * 创建条目
 */
async function createEntry(contentTypeId, data) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    const response = await fetch(
        `${MANAGEMENT_API_BASE}/${config.spaceId}/entries`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json',
                'X-Contentful-Content-Type': contentTypeId
            },
            body: JSON.stringify({ fields: data })
        }
    );

    return await response.json();
}

/**
 * 更新条目
 */
async function updateEntry(entryId, data, version) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    const response = await fetch(
        `${MANAGEMENT_API_BASE}/${config.spaceId}/entries/${entryId}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json',
                'X-Contentful-Version': version
            },
            body: JSON.stringify({ fields: data })
        }
    );

    return await response.json();
}

/**
 * 发布条目
 */
async function publishEntry(entryId) {
    const token = getManagementToken();
    const config = JSON.parse(localStorage.getItem('contentful-config'));

    await fetch(
        `${MANAGEMENT_API_BASE}/${config.spaceId}/entries/${entryId}/published`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/vnd.contentful.management.v1+json'
            }
        }
    );
}

// 导出API
if (typeof window !== 'undefined') {
    window.ContentfulManagement = {
        upsertCompanyInfo,
        createBanner,
        uploadImage
    };
}
