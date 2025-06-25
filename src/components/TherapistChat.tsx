import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X, ChevronUp, ChevronDown, MessageCircle, Activity, Brain, Globe } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(TOP_LANGUAGES[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Dr. Sarah, your AI therapist specializing in mental health support for high-performing professionals. I understand the unique pressures of startup life, coding, and building careers. How are you feeling today?",
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
      'en': "Hi! I'm Dr. Sarah, your AI therapist specializing in mental health support for high-performing professionals. I understand the unique pressures of startup life, coding, and building careers. How are you feeling today?",
      'zh': "您好！我是莎拉博士，您的AI治疗师，专门为高绩效专业人士提供心理健康支持。我理解创业生活、编程和职业发展的独特压力。您今天感觉如何？",
      'hi': "नमस्ते! मैं डॉ. सारा हूं, आपकी AI थेरेपिस्ट जो उच्च प्रदर्शन करने वाले पेशेवरों के लिए मानसिक स्वास्थ्य सहायता में विशेषज्ञ है। मैं स्टार्टअप जीवन, कोडिंग और करियर निर्माण के अनूठे दबावों को समझती हूं। आज आप कैसा महसूस कर रहे हैं?",
      'es': "¡Hola! Soy la Dra. Sarah, su terapeuta de IA especializada en apoyo de salud mental para profesionales de alto rendimiento. Entiendo las presiones únicas de la vida de las startups, la programación y la construcción de carreras. ¿Cómo se siente hoy?",
      'fr': "Salut! Je suis Dr. Sarah, votre thérapeute IA spécialisée dans le soutien en santé mentale pour les professionnels performants. Je comprends les pressions uniques de la vie des startups, du codage et de la construction de carrière. Comment vous sentez-vous aujourd'hui?",
      'ar': "مرحباً! أنا د. سارة، معالجتك بالذكاء الاصطناعي المتخصصة في دعم الصحة النفسية للمهنيين عالي الأداء. أفهم الضغوط الفريدة لحياة الشركات الناشئة والبرمجة وبناء المهن. كيف تشعر اليوم؟",
      'bn': "হ্যালো! আমি ডাঃ সারাহ, আপনার AI থেরাপিস্ট যিনি উচ্চ-পারফরমিং পেশাদারদের জন্য মানসিক স্বাস্থ্য সহায়তায় বিশেষজ্ঞ। আমি স্টার্টআপ জীবন, কোডিং এবং ক্যারিয়ার গড়ার অনন্য চাপগুলি বুঝি। আজ আপনি কেমন অনুভব করছেন?",
      'ru': "Привет! Я доктор Сара, ваш ИИ-терапевт, специализирующийся на поддержке психического здоровья высокоэффективных профессионалов. Я понимаю уникальные давления стартап-жизни, программирования и построения карьеры. Как вы себя чувствуете сегодня?",
      'pt': "Olá! Eu sou a Dra. Sarah, sua terapeuta de IA especializada em apoio à saúde mental para profissionais de alto desempenho. Entendo as pressões únicas da vida de startups, programação e construção de carreira. Como você está se sentindo hoje?",
      'ja': "こんにちは！私はサラ博士です。高パフォーマンス専門家のためのメンタルヘルスサポートを専門とするAIセラピストです。スタートアップ生活、コーディング、キャリア構築の独特なプレッシャーを理解しています。今日はいかがお過ごしですか？"
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

Based on my conversation with Dr. Sarah (AI), I need to schedule a consultation with one of your licensed therapists.

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
    // Optionally auto-send the transcribed message
    // handleSendMessage(transcribedText);
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderClinicalAssessment = (clinicalData: ClinicalAssessment) => {
    return (
      <div className="mt-4 space-y-4">
        {/* Triage Level Card - Matching UNSW style */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getTriageLevelColor(clinicalData.triageLevel)}`}>
                {clinicalData.triageLevel}
              </span>
              <span className="text-gray-700 font-medium">{clinicalData.triageDescription}</span>
              {requiresAppointment(clinicalData.triageLevel) && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                  APPOINTMENT REQUIRED
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{clinicalData.confidence}%</div>
            </div>
          </div>
        </div>

        {/* Follow-up Questions - Green background like UNSW */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-3">I'd like to know more:</h4>
          <ul className="space-y-2">
            {clinicalData.followUpQuestions.map((question, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="text-green-600 mr-2 font-bold">•</span>
                {question}
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Reasoning - Orange background like UNSW */}
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">Clinical Reasoning:</h4>
          <p className="text-orange-700">{clinicalData.clinicalReasoning}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Critical Appointment Modal */}
      <CriticalAppointmentModal
        isOpen={criticalModal.show}
        onClose={() => setCriticalModal({ show: false, urgencyLevel: 'critical' })}
        urgencyLevel={criticalModal.urgencyLevel}
        clinicalData={criticalModal.clinicalData}
      />

      {/* Header - Always visible, matching UNSW style */}
      <div className="bg-white border border-gray-200 rounded-t-xl shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Wellnter Mental Health Assistant</h2>
              <p className="text-sm text-blue-600 font-medium">AI-Powered Chat Interface - Research Prototype</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">Mental Health</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
              <Brain className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-purple-700 font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-red-50 px-3 py-1 rounded-full">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700 font-medium">Emergency Care</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white border-x border-gray-200 min-h-[600px] flex flex-col">
        {/* Therapist Recommendation Prompt - Enhanced for ATS scores */}
        {therapistPrompt.show && (
          <div className="p-4 border-b bg-red-50">
            <div className={`${
              therapistPrompt.clinicalData 
                ? getATSUrgencyColor(therapistPrompt.clinicalData.triageLevel)
                : getSupportLevelColor(therapistPrompt.analysis.level)
            } rounded-lg p-4 text-white relative`}>
              <Button
                onClick={handleDismissPrompt}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-white hover:bg-white/20 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="flex items-start space-x-3 pr-8">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  {React.createElement(
                    therapistPrompt.clinicalData 
                      ? getATSIcon(therapistPrompt.clinicalData.triageLevel)
                      : getSupportLevelIcon(therapistPrompt.analysis.level), 
                    { className: 'w-4 h-4' }
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">
                    {therapistPrompt.clinicalData && requiresAppointment(therapistPrompt.clinicalData.triageLevel)
                      ? `${therapistPrompt.clinicalData.triageLevel} - Professional Appointment Required`
                      : therapistPrompt.analysis.level === 'high' 
                        ? 'High Priority Support Needed' 
                        : 'Professional Support Recommended'
                    }
                  </h4>
                  <p className="text-sm opacity-90 mb-4">
                    {therapistPrompt.clinicalData && requiresAppointment(therapistPrompt.clinicalData.triageLevel)
                      ? `Based on your ${therapistPrompt.clinicalData.triageLevel} clinical assessment, you need to speak with a licensed therapist. This level requires professional intervention within the recommended timeframe.`
                      : `Based on our clinical assessment, I recommend speaking with one of our licensed therapists. ${
                          therapistPrompt.analysis.level === 'high' 
                            ? 'This appears to require immediate professional attention.'
                            : 'They can provide more specialized support for your situation.'
                        }`
                    }
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button 
                      onClick={handleScheduleCall}
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                      size="sm"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Urgent Appointment
                    </Button>
                    {therapistPrompt.clinicalData && (
                      <span className="text-xs opacity-75">
                        {therapistPrompt.clinicalData.triageDescription}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6 bg-gray-50">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <div key={index} className="space-y-4">
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                      : 'bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm'
                  } p-4`}>
                    <div className="flex items-start space-x-3">
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Clinical Assessment Display - Matching UNSW layout */}
                {message.role === 'assistant' && message.clinicalData && index > 0 && (
                  <div className="max-w-[80%]">
                    {renderClinicalAssessment(message.clinicalData)}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md shadow-sm p-4 max-w-[80%]">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-600">Analyzing symptoms...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
      </div>

      {/* Input Area - Enhanced with Language Selector */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm">
        {/* Language Selector Bar */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">Language Support</span>
              </div>
              
              {/* Language Dropdown */}
              <div className="relative">
                <select 
                  value={selectedLanguage.code}
                  onChange={(e) => {
                    const language = TOP_LANGUAGES.find(lang => lang.code === e.target.value);
                    if (language) handleLanguageChange(language);
                  }}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  {TOP_LANGUAGES.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.flag} {language.name} ({language.nativeName})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Language Status */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 border border-gray-200">
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="text-sm font-medium text-gray-700">{selectedLanguage.nativeName}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Azure Whisper AI Ready</span>
              </div>
            </div>
          </div>
          
          {/* Language Features */}
          <div className="mt-3 flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Real-time Translation</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Voice Recognition</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Cultural Context</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Clinical Accuracy</span>
            </div>
          </div>
        </div>

        {/* Input Field */}
        <div className="p-6">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Tell me about your symptoms in ${selectedLanguage.name}...`}
              disabled={isLoading}
              className="flex-1 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl"
            />
            <VoiceInput 
              onTranscription={handleVoiceTranscription}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-6 h-12 rounded-xl font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-gray-500">
              🔊 Voice input powered by Azure Whisper AI • Supports {TOP_LANGUAGES.length} languages • Secure & Private
            </p>
            <button 
              onClick={() => {
                setMessages([{
                  role: 'assistant',
                  content: selectedLanguage.code === 'en' 
                    ? "Hi! I'm Dr. Sarah, your AI therapist specializing in mental health support for high-performing professionals. I understand the unique pressures of startup life, coding, and building careers. How are you feeling today?"
                    : messages[0].content,
                  timestamp: new Date()
                }]);
                setTherapistPrompt({ 
                  show: false, 
                  analysis: { level: 'low', reasoning: '', needsTherapist: false } 
                });
                setCriticalModal({ show: false, urgencyLevel: 'critical' });
              }}
              className="text-xs text-blue-600 hover:text-blue-700 underline font-medium"
            >
              Start New Conversation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Warning - Enhanced with Language Support */}
      <div className="mt-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium">
              🚨 AI Prototype for research use only — not for clinical decision-making
            </span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-300">
            <span>🌍 {TOP_LANGUAGES.length} Languages Supported</span>
            <span>•</span>
            <span>🔒 End-to-End Encrypted</span>
            <span>•</span>
            <span>🏥 Clinical Grade AI</span>
            <span>•</span>
            <span>⚡ Real-time Processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}