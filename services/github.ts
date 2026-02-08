
export const uploadFileToGitHub = async (
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  message: string
) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const cleanToken = token.trim();
  
  const headers: HeadersInit = {
    'Authorization': `Bearer ${cleanToken}`,
    'Accept': 'application/vnd.github+json',
  };

  let sha: string | undefined;
  
  try {
    const checkRes = await fetch(url, { headers });
    if (checkRes.ok) {
      const data = await checkRes.json();
      sha = data.sha;
    } else if (checkRes.status === 404) {
      // ملف جديد، لا مشكلة
    } else {
      const errorData = await checkRes.json();
      throw new Error(`خطأ في الوصول للملف: ${errorData.message}`);
    }
  } catch (error: any) {
    if (error.message.includes('Access')) throw error;
  }

  const base64Content = btoa(unescape(encodeURIComponent(content)));

  const body = {
    message,
    content: base64Content,
    sha,
    branch: 'main'
  };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'فشل الرفع');
  }

  return true;
};
