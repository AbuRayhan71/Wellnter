import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X, Mic, Globe } from 'lucide-react';
import { sendMessageToTherapist, analyzeSupportLevel, ChatMessage, SupportAnalysis, ClinicalAssessment } from '@/services/groqService';
import { VoiceInput } from '@/components/VoiceInput';
import { CriticalAppointmentModal } from '@/components/CriticalAppointmentModal';

interface TherapistPrompt {
  show: boolean;
  analysis: SupportAnalysis;
  clinicalData?: ClinicalAssessment;
}

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const TOP_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' }
];

export function TherapistChat() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(TOP_LANGUAGES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI mental wellness companion. I specialize in helping students and researchers manage academic stress, thesis anxiety, research pressure, and study-life balance. How are you feeling about your studies today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [therapistPrompt, setTherapistPrompt] = useState<TherapistPrompt>({ 
    show: false, 
    analysis: { level: 'low', reasoning: '', needsTherapist: false } 
  });
  const [criticalModal, setCriticalModal] = useState<{
    show: boolean;
    urgencyLevel: 'critical' | 'urgent';
    clinicalData?: ClinicalAssessment;
  }>({ show: false, urgencyLevel: 'critical' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, therapistPrompt]);

  // Helper function to detect critical situations
  const isCriticalSituation = (message: string, clinicalData?: ClinicalAssessment): boolean => {
    const criticalKeywords = [
      'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'better off dead',
      'self harm', 'hurt myself', 'cut myself', 'overdose', 'jump off', 'hang myself',
      'no point living', 'life is meaningless', 'everyone would be better without me',
      'planning to hurt', 'thinking about dying', 'wish I was dead', 'ready to die'
    ];

    const messageText = message.toLowerCase();
    const hasCriticalKeywords = criticalKeywords.some(keyword => messageText.includes(keyword));
    const isATS1or2 = clinicalData && ['ATS 1', 'ATS 2'].includes(clinicalData.triageLevel);
    
    return hasCriticalKeywords || isATS1or2 || false;
  };

  // Helper function to check if ATS score requires appointment
  const requiresAppointment = (atsLevel: string): boolean => {
    return ['ATS 1', 'ATS 2', 'ATS 3'].includes(atsLevel);
  };

  // Helper function to get urgency level based on ATS score
  const getUrgencyLevel = (atsLevel: string): 'critical' | 'urgent' => {
    return ['ATS 1', 'ATS 2'].includes(atsLevel) ? 'critical' : 'urgent';
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Update the initial message based on selected language
    const welcomeMessages: Record<string, string> = {
      'en': "Hi! I'm your AI mental wellness companion. I specialize in helping students and researchers manage academic stress, thesis anxiety, research pressure, and study-life balance. How are you feeling about your studies today?",
      'zh': "您好！我是您的AI心理健康伴侣。我专门帮助学生和研究人员管理学术压力、论文焦虑、研究压力和学习生活平衡。您今天对学习感觉如何？",
      'hi': "नमस्ते! मैं आपकी AI मानसिक स्वास्थ्य साथी हूं। मैं छात्रों और शोधकर्ताओं की शैक्षणिक तनाव, थीसिस चिंता, अनुसंधान दबाव और अध्ययन-जीवन संतुलन प्रबंधित करने में मदद करने में विशेषज्ञ हूं। आज आप अपनी पढ़ाई के बारे में कैसा महसूस कर रहे हैं?",
      'es': "¡Hola! Soy su compañera de bienestar mental con IA. Me especializo en ayudar a estudiantes e investigadores a manejar el estrés académico, la ansiedad de tesis, la presión de investigación y el equilibrio estudio-vida. ¿Cómo se siente sobre sus estudios hoy?",
      'fr': "Salut! Je suis votre compagnon de bien-être mental IA. Je me spécialise dans l'aide aux étudiants et chercheurs pour gérer le stress académique, l'anxiété de thèse, la pression de recherche et l'équilibre étude-vie. Comment vous sentez-vous par rapport à vos études aujourd'hui?",
      'ar': "مرحباً! أنا رفيقتك في الصحة النفسية بالذكاء الاصطناعي. أتخصص في مساعدة الطلاب والباحثين في إدارة الضغط الأكاديمي وقلق الأطروحة وضغط البحث وتوازن الدراسة والحياة. كيف تشعر بشأن دراستك اليوم؟",
      'bn': "হ্যালো! আমি আপনার AI মানসিক সুস্থতার সঙ্গী। আমি ছাত্র এবং গবেষকদের একাডেমিক চাপ, থিসিস উদ্বেগ, গবেষণা চাপ এবং অধ্যয়ন-জীবনের ভারসাম্য পরিচালনা করতে সাহায্য করতে বিশেষজ্ঞ। আজ আপনি আপনার পড়াশোনা সম্পর্কে কেমন অনুভব করছেন?",
      'ru': "Привет! Я ваш ИИ-компаньон по психическому здоровью. Я специализируюсь на помощи студентам и исследователям в управлении академическим стрессом, тревогой по поводу диссертации, давлением исследований и балансом учебы и жизни. Как вы себя чувствуете по поводу учебы сегодня?",
      'pt': "Olá! Eu sou sua companheira de bem-estar mental com IA. Especializo-me em ajudar estudantes e pesquisadores a gerenciar o estresse acadêmico, ansiedade de tese, pressão de pesquisa e equilíbrio estudo-vida. Como você está se sentindo sobre seus estudos hoje?",
      'ja': "こんにちは！私はあなたのAIメンタルウェルネスコンパニオンです。学生や研究者が学術的ストレス、論文不安、研究プレッシャー、勉強と生活のバランスを管理するお手伝いを専門としています。今日は勉強についてどのように感じていますか？"
    };

    if (messages.length === 1) {
      setMessages([{
        role: 'assistant',
        content: welcomeMessages[language.code] || welcomeMessages['en'],
        timestamp: new Date()
      }]);
    }
  };

  const handleScheduleCall = () => {
    const urgencyLevel = therapistPrompt.clinicalData ? getUrgencyLevel(therapistPrompt.clinicalData.triageLevel) : 'urgent';
    const atsLevel = therapistPrompt.clinicalData?.triageLevel || 'ATS 3';
    
    const subject = encodeURIComponent(`${urgencyLevel.toUpperCase()} - Therapist Consultation Request - Wellnter`);
    const body = encodeURIComponent(`Hi,

Based on my conversation with the AI assistant, I need to schedule a consultation with one of your licensed therapists.

CLINICAL ASSESSMENT:
- ATS Triage Level: ${atsLevel}
- Support Level: ${therapistPrompt.analysis.level.toUpperCase()}
- Urgency: ${urgencyLevel.toUpperCase()}
- Language: ${selectedLanguage.name} (${selectedLanguage.nativeName})
- Symptom Summary: ${therapistPrompt.clinicalData?.symptomSummary || 'Assessment in progress'}

REASON FOR REFERRAL:
${therapistPrompt.analysis.reasoning}

CLINICAL REASONING:
${therapistPrompt.clinicalData?.clinicalReasoning || 'Professional assessment required'}

Please prioritize this request based on the ${urgencyLevel} urgency level and contact me as soon as possible.

Best regards`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  const handleDismissPrompt = () => {
    setTherapistPrompt({ 
      show: false, 
      analysis: { level: 'low', reasoning: '', needsTherapist: false } 
    });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Analyze support level first
      const analysis = await analyzeSupportLevel(textToSend);
      
      // Get AI response with clinical data
      const { response, clinicalData } = await sendMessageToTherapist([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        clinicalData: clinicalData
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check for critical situations first (suicidal ideation, immediate danger)
      if (isCriticalSituation(textToSend, clinicalData)) {
        setCriticalModal({
          show: true,
          urgencyLevel: 'critical',
          clinicalData
        });
      }
      // Show critical modal for ATS 1 and ATS 2
      else if (clinicalData && ['ATS 1', 'ATS 2'].includes(clinicalData.triageLevel)) {
        setCriticalModal({
          show: true,
          urgencyLevel: getUrgencyLevel(clinicalData.triageLevel),
          clinicalData
        });
      }
      // Show therapist prompt for ATS 3 (urgent but not critical)
      else if (clinicalData && clinicalData.triageLevel === 'ATS 3') {
        setTherapistPrompt({ 
          show: true, 
          analysis,
          clinicalData 
        });
      }
      // Also show for mid/high level support as backup
      else if (analysis.needsTherapist && (analysis.level === 'mid' || analysis.level === 'high')) {
        setTherapistPrompt({ 
          show: true, 
          analysis,
          clinicalData 
        });
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceTranscription = (transcribedText: string) => {
    setInputMessage(transcribedText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'mid': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getATSUrgencyColor = (atsLevel: string) => {
    switch (atsLevel) {
      case 'ATS 1': return 'bg-red-600';
      case 'ATS 2': return 'bg-red-500';
      case 'ATS 3': return 'bg-orange-500';
      default: return 'bg-green-500';
    }
  };

  const getSupportLevelIcon = (level: string) => {
    switch (level) {
      case 'high': return AlertTriangle;
      case 'mid': return Phone;
      default: return Calendar;
    }
  };

  const getATSIcon = (atsLevel: string) => {
    switch (atsLevel) {
      case 'ATS 1': return AlertTriangle;
      case 'ATS 2': return AlertTriangle;
      case 'ATS 3': return Phone;
      default: return Calendar;
    }
  };

  const getTriageLevelColor = (level: string) => {
    switch (level) {
      case 'ATS 1': return 'bg-red-500 text-white';
      case 'ATS 2': return 'bg-orange-500 text-white';
      case 'ATS 3': return 'bg-yellow-500 text-white';
      case 'ATS 4': return 'bg-blue-500 text-white';
      case 'ATS 5': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const renderClinicalAssessment = (clinicalData: ClinicalAssessment) => {
    return (
      <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-100 shadow-sm">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getTriageLevelColor(clinicalData.triageLevel)} shadow-sm`}>
              {clinicalData.triageLevel}
            </span>
            <div className="flex items-center space-x-2">
              <div className="text-xs sm:text-sm font-semibold text-blue-700 hidden sm:block">Confidence</div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-bold">{clinicalData.confidence}%</div>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{clinicalData.triageDescription}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-100 shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm flex items-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-2"></div>
            Follow-up Questions
          </h4>
          <ul className="space-y-1 sm:space-y-2">
            {clinicalData.followUpQuestions.slice(0, 2).map((question, index) => (
              <li key={index} className="flex items-start text-gray-700 text-xs sm:text-sm">
                <span className="text-green-600 mr-2 mt-1">•</span>
                {question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* Critical Appointment Modal */}
      <CriticalAppointmentModal
        isOpen={criticalModal.show}
        onClose={() => setCriticalModal({ show: false, urgencyLevel: 'critical' })}
        urgencyLevel={criticalModal.urgencyLevel}
        clinicalData={criticalModal.clinicalData}
      />

      {/* Therapist Recommendation Prompt */}
      {therapistPrompt.show && (
        <div className="bg-red-50 border-b">
          <div className={`${
            therapistPrompt.clinicalData 
              ? getATSUrgencyColor(therapistPrompt.clinicalData.triageLevel)
              : getSupportLevelColor(therapistPrompt.analysis.level)
          } p-3 sm:p-4 text-white relative`}>
            <Button
              onClick={handleDismissPrompt}
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="pr-8">
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Professional Support Recommended</h4>
              <p className="text-xs sm:text-sm opacity-90 mb-3">Based on our assessment, speaking with a licensed therapist would be beneficial.</p>
              <Button 
                onClick={handleScheduleCall}
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-100 text-xs sm:text-sm px-3 py-2"
              >
                <Calendar className="w-3 h-3 mr-2" />
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea className="h-80 sm:h-96 p-1 sm:p-2 bg-gray-50">
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2 sm:space-y-3">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] sm:max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                    : 'bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm'
                } p-3 sm:p-4`}>
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    {message.role === 'assistant' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Clinical Assessment Display */}
              {message.role === 'assistant' && message.clinicalData && index > 0 && (
                <div className="max-w-[90%] sm:max-w-[85%] ml-8 sm:ml-10">
                  {renderClinicalAssessment(message.clinicalData)}
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm p-3 sm:p-4 max-w-[90%] sm:max-w-[85%]">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Language Selector */}
      <div className="px-1 sm:px-2 py-2 sm:py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <select 
              value={selectedLanguage.code}
              onChange={(e) => {
                const language = TOP_LANGUAGES.find(lang => lang.code === e.target.value);
                if (language) handleLanguageChange(language);
              }}
              className="text-xs sm:text-sm bg-transparent border-none focus:outline-none text-gray-700"
            >
              {TOP_LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.flag} {language.nativeName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
            <span>AI Ready</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-1 sm:p-2 border-t border-gray-200">
        <div className="flex space-x-2 sm:space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="How are you feeling?"
            placeholder="How are you feeling about your studies?"
            disabled={isLoading}
            className="flex-1 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-10 sm:h-12 rounded-xl text-sm sm:text-base px-3 sm:px-4"
          />
          <VoiceInput 
            onTranscription={handleVoiceTranscription}
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 h-10 sm:h-12 rounded-xl"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <p className="text-xs sm:text-sm text-gray-500">
            🔊 Voice input • Secure & Private
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMessages([{
                role: 'assistant',
                content: selectedLanguage.code === 'en' 
                  ? "Hi! I'm your AI mental wellness companion. I specialize in helping high-performing individuals — from students and researchers to tech professionals — manage stress, stay balanced, and avoid burnout. How are you feeling today?"
                  : messages[0].content,
                timestamp: new Date()
              }]);
              setTherapistPrompt({ 
                show: false, 
                analysis: { level: 'low', reasoning: '', needsTherapist: false } 
              });
              setCriticalModal({ show: false, urgencyLevel: 'critical' });
            }}
            className="text-xs sm:text-sm text-blue-600 bg-white hover:bg-white px-3 py-1.5 rounded-lg font-medium border border-blue-200 shadow-sm"
          >
            New Chat
          </Button>
        </div>
      </div>

      {/* Bottom Warning */}
      <div className="bg-gray-800 text-white p-1 sm:p-2">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            <span className="text-xs sm:text-sm font-medium">Research Prototype Only</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-300">
            🔒 Encrypted • 🌍 10 Languages • ⚡ Real-time AI
          </div>
        </div>
      </div>
    </div>
  );
}