
export const cleanSiteId = (input: string) => {
  return input.replace(/(^\w+:|^)\/\//, '')
              .replace('.netlify.app', '')
              .replace('/', '')
              .trim();
};

export const updateNetlifyEnv = async (token: string, siteId: string, key: string, value: string) => {
  const cleanId = cleanSiteId(siteId);
  const siteUrl = `https://api.netlify.com/api/v1/sites/${cleanId}`;
  
  const response = await fetch(siteUrl, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token.trim()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      build_settings: {
        env: {
          [key]: value
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'فشل تحديث متغيرات البيئة');
  }
  return true;
};

export const getNetlifySiteStatus = async (token: string, siteId: string) => {
  const cleanId = cleanSiteId(siteId);
  if (!token.startsWith('nfp_')) throw new Error("التوكن يجب أن يبدأ بـ nfp_ (Personal Access Token)");
  
  const url = `https://api.netlify.com/api/v1/sites/${cleanId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
      }
    });

    if (response.status === 401) throw new Error("التوكن غير صالح (401 Unauthorized)");
    if (response.status === 404) throw new Error("الموقع غير موجود (404 Not Found)");
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "خطأ غير معروف في خادم Netlify");
    }
    
    return await response.json();
  } catch (e: any) {
    if (e.message.includes('Failed to fetch')) throw new Error("مشكلة في اتصال الإنترنت أو حجب (CORS)");
    throw e;
  }
};

export const getNetlifyDeploys = async (token: string, siteId: string) => {
  const cleanId = cleanSiteId(siteId);
  const url = `https://api.netlify.com/api/v1/sites/${cleanId}/deploys`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token.trim()}`,
    }
  });
  if (!response.ok) return [];
  return await response.json();
};
