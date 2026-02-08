
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Declare window extension for AI Studio key management
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    // Making it optional to match any existing environment declarations and avoid "identical modifiers" error.
    aistudio?: AIStudio;
  }
}

/**
 * Checks if an API key has been selected via the AI Studio dialog.
 */
export const isKeySelected = async (): Promise<boolean> => {
  try {
    // Safely access aistudio property
    return await window.aistudio?.hasSelectedApiKey() ?? false;
  } catch (e) {
    return false;
  }
};

/**
 * Opens the AI Studio API key selection dialog.
 */
export const openKeySelector = async (): Promise<void> => {
  try {
    // Safely access aistudio property
    await window.aistudio?.openSelectKey();
  } catch (e) {
    console.error("Failed to open key selector:", e);
  }
};

/**
 * Resets the key selection state (placeholder as the API manages its own state).
 */
export const resetKeySelection = async (): Promise<void> => {
  // Currently, re-triggering openKeySelector is the primary way to "reset" or change keys.
  return Promise.resolve();
};

// Fix: Always use process.env.API_KEY and named parameter for initialization
export const testAiConnectivity = async (): Promise<{success: boolean, message: string}> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "تحقق من الاتصال الاستراتيجي.",
    });
    // Fix: Access .text property directly
    if (response.text) {
      return { success: true, message: "✅ المحرك الاستراتيجي Gemini 3 يعمل بكامل طاقته." };
    }
    return { success: false, message: "⚠️ استجابة غير مكتملة من الخادم." };
  } catch (error: any) {
    return { success: false, message: `❌ خطأ اتصال: ${error.message}` };
  }
};

/**
 * Generates a full AI post with thinking budget.
 */
export const generateFullAIPost = async (topic: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبيراً في إنشاء المحتوى لـ YouTube Studio P, اكتب مقالاً احترافياً عن: "${topic}". 
      استخدم لغة قوية، تقسيمات واضحة، وركز على القيمة المضافة للقارئ. 
      اجعل العنوان جذاباً جداً.`,
      config: {
        thinkingConfig: { thinkingBudget: 10000 }
      }
    });
    const text = response.text || "";
    const lines = text.split('\n');
    return {
      title: lines[0].replace(/[#*]/g, '').trim(),
      content: text,
      excerpt: text.substring(0, 200).replace(/<[^>]*>?/gm, '') + "..."
    };
  } catch (error) { return null; }
};

/**
 * Generates a custom Blogger XML theme.
 */
export const generateCustomBloggerTheme = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `صمم قالب بلوجر (Blogger XML) احترافي، حديث، وسريع جداً لمدونة "YouTube Studio P" بناءً على هذا الطلب: "${prompt}". 
      يجب أن يكون التصميم متجاوباً، يدعم Tailwind CSS، ويحتوي على Bento Grid للمنشورات. 
      أخرج كود XML فقط بين علامات الكود.`,
    });
    return response.text || null;
  } catch (error) { return null; }
};

/**
 * Generates social media text for 8 platforms.
 */
export const generateSocialKit = async (title: string, excerpt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتوليد حزمة نصوص تسويقية ذكية لـ 8 منصات (X, LinkedIn, Facebook, WhatsApp, Telegram, Instagram, TikTok, Pinterest) لهذا المقال: ${title}. ${excerpt}`,
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
          },
          required: ["x", "linkedin", "facebook", "whatsapp", "telegram", "instagram", "tiktok", "pinterest"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return null; }
};

/**
 * Generates a summary for a post.
 */
export const generatePostSummary = async (content: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `قم بتلخيص المحتوى التالي باختصار شديد وبأسلوب استراتيجي:\n\n${content}`,
    });
    return response.text || "";
  } catch (error) { return ""; }
};

/**
 * Performs a deep strategic analysis of post content.
 */
export const deepStrategicAnalysis = async (content: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `قم بإجراء تحليل استراتيجي عميق للمحتوى التالي، وضح نقاط القوة والفرص المستهدفة:\n\n${content}`,
    });
    return response.text || "";
  } catch (error) { return ""; }
};

/**
 * Generates a blog cover image using gemini-2.5-flash-image.
 */
export const generateImageForPost = async (title: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `A professional, high-quality blog cover image for a technical article titled: "${title}". Cinematic, futuristic, and sharp.` }
        ]
      }
    });
    // Fix: Iterate parts to find the image as per guidelines
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) { return null; }
};

/**
 * Generates a business plan based on provided project data.
 */
export const generateBusinessPlan = async (data: { name: string, industry: string, goals: string }): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `بصفتك مستشاراً استراتيجياً، قم بتوليد خطة عمل (Business Plan) شاملة لهذا المشروع:\nالاسم: ${data.name}\nالصناعة: ${data.industry}\nالأهداف والتحديات: ${data.goals}`,
    });
    return response.text || null;
  } catch (error) { return null; }
};
