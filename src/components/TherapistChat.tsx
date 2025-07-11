import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X, Globe, Lightbulb } from 'lucide-react';
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

const TOP_25_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'zh', name: 'Chinese (Mandarin)', flag: '🇨🇳', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'th', name: 'Thai', flag: '🇹🇭', nativeName: 'ไทย' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Bahasa Indonesia' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱', nativeName: 'Polski' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱', nativeName: 'Nederlands' },
  { code: 'uk', name: 'Ukrainian', flag: '🇺🇦', nativeName: 'Українська' },
  { code: 'fa', name: 'Persian (Farsi)', flag: '🇮🇷', nativeName: 'فارسی' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪', nativeName: 'Kiswahili' },
  { code: 'ro', name: 'Romanian', flag: '🇷🇴', nativeName: 'Română' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', nativeName: 'தமிழ்' }
];

const CHAT_SUGGESTIONS = [
  {
    category: "Academic Stress",
    suggestions: [
      "I'm feeling overwhelmed with my coursework",
      "I have thesis anxiety and can't focus",
      "I'm experiencing imposter syndrome",
      "I'm struggling with research pressure"
    ]
  },
  {
    category: "Study Issues",
    suggestions: [
      "I can't concentrate while studying",
      "I'm procrastinating on important assignments",
      "I feel burned out from studying",
      "I'm having trouble with work-life balance"
    ]
  },
  {
    category: "Emotional Support",
    suggestions: [
      "I'm feeling anxious about my future",
      "I'm dealing with academic depression",
      "I feel isolated and lonely",
      "I'm having panic attacks before exams"
    ]
  },
  {
    category: "Quick Check-ins",
    suggestions: [
      "How can I manage stress better?",
      "What are some study techniques for anxiety?",
      "I need help with time management",
      "Can you help me with breathing exercises?"
    ]
  }
];
export function TherapistChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI mental wellness companion. I specialize in helping students and researchers manage academic stress, thesis anxiety, research pressure, and study-life balance. How are you feeling about your studies today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(TOP_25_LANGUAGES[0]);
  const [showSuggestions, setShowSuggestions] = useState(true);
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
      'ja': "こんにちは！私はあなたのAIメンタルウェルネスコンパニオンです。学生や研究者が学術的ストレス、論文不安、研究プレッシャー、勉強と生活のバランスを管理するお手伝いを専門としています。今日は勉強についてどのように感じていますか？",
      'tr': "Merhaba! Ben sizin AI zihinsel sağlık yardımcınızım. Öğrencilerin ve araştırmacıların akademik stresi, tez kaygısı, araştırma baskısı ve çalışma-yaşam dengesini yönetmelerine yardımcı olmada uzmanım. Bugün çalışmalarınız hakkında nasıl hissediyorsunuz?",
      'de': "Hallo! Ich bin Ihr KI-Begleiter für mentales Wohlbefinden. Ich spezialisiere mich darauf, Studenten und Forschern beim Umgang mit akademischem Stress, Thesis-Angst, Forschungsdruck und der Work-Study-Balance zu helfen. Wie fühlen Sie sich heute bezüglich Ihres Studiums?",
      'ko': "안녕하세요! 저는 당신의 AI 정신 건강 동반자입니다. 학생과 연구자들이 학업 스트레스, 논문 불안, 연구 압박, 학습-생활 균형을 관리하는 데 도움을 주는 것을 전문으로 합니다. 오늘 공부에 대해 어떻게 느끼고 계신가요?",
      'it': "Ciao! Sono il tuo compagno AI per il benessere mentale. Mi specializzo nell'aiutare studenti e ricercatori a gestire lo stress accademico, l'ansia da tesi, la pressione della ricerca e l'equilibrio studio-vita. Come ti senti riguardo ai tuoi studi oggi?",
      'vi': "Xin chào! Tôi là người bạn đồng hành AI về sức khỏe tinh thần của bạn. Tôi chuyên giúp sinh viên và nhà nghiên cứu quản lý căng thẳng học tập, lo lắng về luận văn, áp lực nghiên cứu và cân bằng học tập-cuộc sống. Hôm nay bạn cảm thấy thế nào về việc học của mình?",
      'th': "สวัสดี! ฉันเป็นผู้ช่วย AI ด้านสุขภาพจิตของคุณ ฉันเชี่ยวชาญในการช่วยนักเรียนและนักวิจัยจัดการกับความเครียดทางการศึกษา ความวิตกกังวลเรื่องวิทยานิพนธ์ แรงกดดันจากการวิจัย และความสมดุลระหว่างการเรียนกับชีวิต วันนี้คุณรู้สึกอย่างไรเกี่ยวกับการเรียนของคุณ?",
      'ur': "ہیلو! میں آپ کا AI ذہنی صحت کا ساتھی ہوں۔ میں طلباء اور محققین کی تعلیمی تناؤ، مقالے کی پریشانی، تحقیقی دباؤ، اور مطالعہ-زندگی کے توازن کو سنبھالنے میں مدد کرنے میں مہارت رکھتا ہوں۔ آج آپ اپنی تعلیم کے بارے میں کیسا محسوس کر رہے ہیں؟",
      'id': "Halo! Saya adalah pendamping AI kesehatan mental Anda. Saya mengkhususkan diri membantu mahasiswa dan peneliti mengelola stres akademik, kecemasan tesis, tekanan penelitian, dan keseimbangan belajar-hidup. Bagaimana perasaan Anda tentang studi Anda hari ini?",
      'pl': "Cześć! Jestem Twoim towarzyszem AI w zakresie zdrowia psychicznego. Specjalizuję się w pomaganiu studentom i badaczom w radzeniu sobie ze stresem akademickim, lękiem przed pracą dyplomową, presją badawczą i równowagą nauka-życie. Jak czujesz się dziś w związku ze swoimi studiami?",
      'nl': "Hallo! Ik ben je AI-begeleider voor mentaal welzijn. Ik ben gespecialiseerd in het helpen van studenten en onderzoekers bij het omgaan met academische stress, scriptieangst, onderzoeksdruk en de balans tussen studie en leven. Hoe voel je je vandaag over je studie?",
      'uk': "Привіт! Я ваш AI-супутник з психічного здоров'я. Я спеціалізуюся на допомозі студентам та дослідникам у керуванні академічним стресом, тривогою щодо дисертації, дослідницьким тиском та балансом навчання-життя. Як ви почуваєтеся сьогодні щодо своїх досліджень?",
      'fa': "سلام! من همراه هوش مصنوعی سلامت روان شما هستم. من در کمک به دانشجویان و محققان برای مدیریت استرس تحصیلی، اضطراب پایان‌نامه، فشار تحقیق و تعادل تحصیل-زندگی تخصص دارم. امروز در مورد تحصیلاتتان چه احساسی دارید؟",
      'sw': "Hujambo! Mimi ni mwenzako wa AI wa afya ya akili. Ninafanya kazi ya kusaidia wanafunzi na watafiti kudhibiti mkazo wa kitaaluma, wasiwasi wa tasnifu, shinikizo la utafiti, na uwiano wa masomo-maisha. Leo unahisije kuhusu masomo yako?",
      'ro': "Salut! Sunt însoțitorul tău AI pentru bunăstarea mentală. Mă specializez în a ajuta studenții și cercetătorii să gestioneze stresul academic, anxietatea legată de teză, presiunea cercetării și echilibrul studiu-viață. Cum te simți astăzi în legătură cu studiile tale?",
      'ta': "வணக்கம்! நான் உங்கள் AI மனநல துணைவர். மாணவர்கள் மற்றும் ஆராய்ச்சியாளர்கள் கல்வி மன அழுத்தம், ஆய்வுக் கட்டுரை பதட்டம், ஆராய்ச்சி அழுத்தம் மற்றும் படிப்பு-வாழ்க்கை சமநிலையை நிர்வகிக்க உதவுவதில் நான் நிபுணத்துவம் பெற்றுள்ளேன். இன்று உங்கள் படிப்பைப் பற்றி எப்படி உணர்கிறீர்கள்?"
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setShowSuggestions(false);
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
          {/* Suggestions - Show only at the beginning */}
          {showSuggestions && messages.length === 1 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mx-2">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Quick Start Suggestions</h3>
              </div>
              
              <div className="space-y-4">
                {CHAT_SUGGESTIONS.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">{category.category}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {category.suggestions.map((suggestion, suggestionIndex) => (
                        <Button
                          key={suggestionIndex}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left justify-start h-auto py-2 px-3 text-xs sm:text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  💡 Click any suggestion above or type your own message below
                </p>
              </div>
            </div>
          )}
          
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
                const language = TOP_25_LANGUAGES.find(lang => lang.code === e.target.value);
                if (language) handleLanguageChange(language);
              }}
              className="text-xs sm:text-sm bg-transparent border-none focus:outline-none text-gray-700"
            >
              {TOP_25_LANGUAGES.map((language) => (
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
          {!showSuggestions && messages.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSuggestions(true)}
              className="text-xs sm:text-sm text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg"
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Show Suggestions
            </Button>
          )}
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