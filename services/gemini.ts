
import { GoogleGenAI, Type, Modality } from "@google/genai";

export const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey || apiKey === "undefined") return null;
  try {
    return new GoogleGenAI({ apiKey: apiKey });
  } catch (e) {
    console.error("AI Initialization Failed:", e);
    return null;
  }
};

export const testAiConnectivity = async (): Promise<{success: boolean, message: string}> => {
  const ai = getAIClient();
  if (!ai) return { success: false, message: "يرجى تفعيل مفتاح API للاتصال بمحرك Gemini Flash." };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "ping",
    });
    if (response.text) {
      return { success: true, message: "النظام متصل بمحرك Gemini Flash المجاني بنجاح." };
    }
    return { success: false, message: "استجابة غير متوقعة من الخادم." };
  } catch (error: any) {
    return { success: false, message: `خطأ في الاتصال: ${error.message}` };
  }
};

export const isKeySelected = async (): Promise<boolean> => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY && process.env.API_KEY !== "undefined";
};

export const openKeySelector = async () => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.openSelectKey) {
    await (window as any).aistudio.openSelectKey();
    return true; 
  }
  return false;
};

export const resetKeySelection = async () => {
    localStorage.removeItem('baseera_ai_active');
    return true;
};

export const getStrategicSearchResponse = async (prompt: string) => {
  const ai = getAIClient();
  if (!ai) return { text: "برجاء تفعيل المحرك المجاني.", chunks: [] };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] }
    });
    
    return {
      text: response.text || "",
      chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    return { text: "حدث خطأ في معالجة الطلب عبر الفلاش.", chunks: [] };
  }
};

export const fetchTrendingTopics = async () => {
  const ai = getAIClient();
  if (!ai) return "";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "ما هي أهم الترندات التقنية الحالية لمدونة tosh5.shop؟",
      config: { tools: [{ googleSearch: {} }] }
    });
    return response.text || "";
  } catch (error) {
    return "بانتظار تفعيل رادار البحث...";
  }
};

export const generateSocialKit = async (title: string, excerpt: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتوليد حزمة نصوص للسوشيال ميديا لهذا المقال: ${title}. ${excerpt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            x: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            facebook: { type: Type.STRING },
            whatsapp: { type: Type.STRING },
            telegram: { type: Type.STRING },
            instagram: { type: Type.STRING },
            tiktok: { type: Type.STRING },
            pinterest: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return null;
  }
};

export const generateImageForPost = async (prompt: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `High quality strategic digital art for: ${prompt}` }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    return part?.inlineData ? `data:image/png;base64,${part.inlineData.data}` : null;
  } catch (error: any) {
    return null;
  }
};

export const generatePostSummary = async (content: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `لخص هذا المحتوى لمدونة tosh5.shop: ${content}`,
    });
    return response.text || null;
  } catch (error) { return null; }
};

export const deepStrategicAnalysis = async (content: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بإجراء تحليل استراتيجي لهذا المحتوى: ${content}`,
    });
    return response.text || null;
  } catch (error) { return null; }
};

export const generateFullAIPost = async (topic: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `اكتب مقالاً استراتيجياً كاملاً لمدونة tosh5.shop عن: ${topic}.`,
    });
    const text = response.text;
    return {
      title: text.split('\n')[0].replace('#', '').trim(),
      content: text,
      excerpt: text.substring(0, 200).replace(/<[^>]*>?/gm, '') + "..."
    };
  } catch (error) { return null; }
};

export const generateCustomBloggerTheme = async (prompt: string) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `صمم قالب بلوجر (Blogger XML) لـ tosh5.shop بناءً على: "${prompt}". أخرج كود XML فقط.`,
    });
    return response.text || null;
  } catch (error) {
    return null;
  }
};

export const generateBusinessPlan = async (data: { name: string; industry: string; goals: string }) => {
  const ai = getAIClient();
  if (!ai) return null;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `إنشاء خطة عمل لشركة "${data.name}" في قطاع "${data.industry}". الأهداف: ${data.goals}.`,
    });
    return response.text || null;
  } catch (error) {
    return null;
  }
};
