
export const cleanProjectId = (input: string) => {
  return input.replace(/(^\w+:|^)\/\//, '')
              .replace('.vercel.app', '')
              .replace('/', '')
              .trim();
};

export const getVercelDeploymentStatus = async (token: string, projectId: string) => {
  const cleanId = cleanProjectId(projectId);
  const url = `https://api.vercel.com/v9/projects/${cleanId}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token.trim()}`,
      }
    });

    if (response.status === 401) throw new Error("التوكن غير صالح (401 Unauthorized)");
    if (response.status === 404) throw new Error("المشروع غير موجود في Vercel");
    if (!response.ok) throw new Error("خطأ في الاتصال بخادم Vercel");
    
    return await response.json();
  } catch (e: any) {
    throw e;
  }
};
