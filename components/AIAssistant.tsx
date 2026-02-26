
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { isKeySelected, openKeySelector } from '../services/gemini.ts';

interface AIAssistantProps {
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  const startSession = async () => {
    setError(null);
    const hasKey = await isKeySelected();
    if (!hasKey) {
      setError('المفتاح غير مفعل. يرجى اختيار مفتاح API أولاً.');
      return;
    }

    setIsConnecting(true);
    const apiKey = process.env.API_KEY;
    if (!apiKey || apiKey === "undefined") {
      setIsConnecting(false);
      setError('لم يتم العثور على مفتاح API في البيئة.');
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const inputContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputContext.createMediaStreamSource(stream);
            const processor = inputContext.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const base64 = encode(new Uint8Array(int16.buffer));
              sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(processor);
            processor.connect(inputContext.destination);
          },
          onmessage: async (message) => {
            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString) {
              const audioCtx = audioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              const buffer = await decodeAudioData(decode(base64EncodedAudioString), audioCtx, 24000, 1);
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(audioCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.outputTranscription) {
              setTranscription(prev => prev + ' ' + message.serverContent!.outputTranscription!.text);
            }
          },
          onclose: () => setIsActive(false),
          onerror: (e) => {
            console.error("Live AI Error:", e);
            setError('حدث خطأ في الاتصال. قد يكون المفتاح غير صالح أو لا يدعم ميزة الصوت المباشر.');
            setIsConnecting(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `أنت الآن "المنسق الأعلى لسرب بصيرة PRO" المخصص لمدونة tosh5.shop. 
          مهمتك هي إرشاد المستخدم في إدارة "سرب الوكلاء الذكيين" (الكاتب، المصمم، محلل SEO). 
          تحدث بلهجة استراتيجية وقوية ومهنية بالعربية. 
          مهمتك تتضمن: إرشاد المستخدم في إدارة "سرب الوكلاء الذكيين" (الكاتب، المصمم، محلل SEO)، تقديم حلول للمشكلات التقنية، تحديد الميزات المفقودة في التطبيق، اقتراح فرص ربحية، ربط الترندات العالمية وقواميس البحث، وتحسين أرشفة المدونات. 
          عندما يسأل المستخدم "هل هناك مساعد آخر؟" وضح له أنك تدير سرباً كاملاً من الوكلاء المتخصصين وكل وكيل له وظيفة في هذا التطبيق. 
          أرشده دائماً لاستخدام "مصنع المقالات" و "القالب الماسي" للوصول للعالمية.`
        },
      });
      sessionRef.current = await sessionPromise;
    } catch (e: any) {
      console.error(e);
      setError('فشل الوصول للميكروفون أو الاتصال بالخادم.');
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    setIsActive(false);
  };

  const handleActivateKey = async () => {
    await openKeySelector();
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-[600] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 text-right">
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 max-w-2xl w-full shadow-5xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 blur-[120px] opacity-20"></div>
        
        <div className="relative z-10 text-center space-y-8">
           <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center text-5xl transition-all duration-500 shadow-2xl ${isActive ? 'bg-emerald-600 scale-110' : error ? 'bg-rose-600' : 'bg-blue-600'}`}>
              {error ? '⚠️' : isActive ? '📡' : '🎙️'}
           </div>
           
           <h2 className="text-3xl font-black text-white italic">منسق سرب بصيرة PRO</h2>
           
           {error ? (
             <div className="space-y-6 animate-in fade-in duration-500">
               <p className="text-rose-400 font-bold leading-relaxed">{error}</p>
               <button 
                 onClick={handleActivateKey}
                 className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-blue-600 hover:text-white transition-all shadow-xl"
               >
                 تفعيل مفتاح API الآن ⚡
               </button>
             </div>
           ) : (
             <>
               <p className="text-slate-400 font-bold leading-relaxed">تحدث الآن مع المنسق الأعلى لتوجيه سرب الوكلاء الذكيين في إدارة مدونتك.</p>
               
               <div className="h-24 bg-black/40 rounded-3xl p-6 border border-white/5 overflow-y-auto text-sm text-blue-300 font-bold italic">
                 {transcription || 'بانتظار صوتك لتوجيه السرب...'}
               </div>

               <div className="flex gap-4">
                 {!isActive ? (
                   <button onClick={startSession} disabled={isConnecting} className="flex-1 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-4xl active:scale-95">
                     {isConnecting ? 'جاري ربط السرب...' : 'تفعيل الاتصال الصوتي 🎙️'}
                   </button>
                 ) : (
                   <button onClick={stopSession} className="flex-1 py-6 bg-rose-600 text-white rounded-[2rem] font-black text-xl hover:bg-rose-700 transition-all shadow-4xl active:scale-95">
                     إنهاء الجلسة الاستراتيجية ⏹️
                   </button>
                 )}
               </>
             )}
             
             <button onClick={onClose} className="px-8 bg-white/5 text-slate-500 rounded-[2rem] font-bold hover:text-white transition-colors">إغلاق</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
