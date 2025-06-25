import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X, ChevronUp, ChevronDown, MessageCircle, Activity, Brain } from 'lucide-react';
import { sendMessageToTherapist, analyzeSupportLevel, ChatMessage, SupportAnalysis, ClinicalAssessment } from '@/services/groqService';
import { VoiceInput } from '@/components/VoiceInput';

interface TherapistPrompt {
  show: boolean;
  analysis: SupportAnalysis;
  clinicalData?: ClinicalAssessment;
}

export function TherapistChat() {
  const [isExpanded, setIsExpanded] = useState(false);
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, therapistPrompt]);

  // Helper function to check if ATS score requires appointment
  const requiresAppointment = (atsLevel: string): boolean => {
    return ['ATS 1', 'ATS 2', 'ATS 3'].includes(atsLevel);
  };

  // Helper function to get urgency level based on ATS score
  const getUrgencyLevel = (atsLevel: string): 'critical' | 'urgent' | 'moderate' => {
    switch (atsLevel) {
      case 'ATS 1': return 'critical';
      case 'ATS 2': return 'urgent';
      case 'ATS 3': return 'moderate';
      default: return 'moderate';
    }
  };

  const handleScheduleCall = () => {
    const urgencyLevel = therapistPrompt.clinicalData ? getUrgencyLevel(therapistPrompt.clinicalData.triageLevel) : 'moderate';
    const atsLevel = therapistPrompt.clinicalData?.triageLevel || 'ATS 3';
    
    const subject = encodeURIComponent(`${urgencyLevel.toUpperCase()} - Therapist Consultation Request - Wellnter`);
    const body = encodeURIComponent(`Hi,

Based on my conversation with Dr. Sarah (AI), I need to schedule a consultation with one of your licensed therapists.

CLINICAL ASSESSMENT:
- ATS Triage Level: ${atsLevel}
- Support Level: ${therapistPrompt.analysis.level.toUpperCase()}
- Urgency: ${urgencyLevel.toUpperCase()}
- Symptom Summary: ${therapistPrompt.clinicalData?.symptomSummary || 'Assessment in progress'}

REASON FOR REFERRAL:
${therapistPrompt.analysis.reasoning}

CLINICAL REASONING:
${therapistPrompt.clinicalData?.clinicalReasoning || 'Professional assessment required'}

Please prioritize this request based on the ${urgencyLevel} urgency level and contact me as soon as possible.

Best regards`);
    
    window.location.href = `mailto:mdabu.rayhan@outlook.com?subject=${subject}&body=${body}`;
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

      // Show therapist prompt if ATS score is 3 or higher (ATS 1, ATS 2, ATS 3)
      if (clinicalData && requiresAppointment(clinicalData.triageLevel)) {
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

      {/* Input Area - Matching UNSW style with Voice Input */}
      <div className="bg-white border border-gray-200 rounded-b-xl shadow-sm">
        {/* Language Selector */}
        <div className="px-6 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">🌐</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Language</span>
              <select className="ml-2 text-sm border border-gray-200 rounded px-2 py-1 bg-white">
                <option>🇺🇸 English</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Azure Whisper AI Ready</span>
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
              placeholder="Tell me about your symptoms or use voice input..."
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
              🔊 Voice input powered by Azure Whisper AI • Secure & Private
            </p>
            <button 
              onClick={() => {
                setMessages([messages[0]]);
                setTherapistPrompt({ 
                  show: false, 
                  analysis: { level: 'low', reasoning: '', needsTherapist: false } 
                });
              }}
              className="text-xs text-blue-600 hover:text-blue-700 underline"
            >
              Start a new conversation
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Warning - Matching UNSW style */}
      <div className="mt-4 bg-gray-800 text-white rounded-xl p-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span className="text-sm font-medium">
            🚨 AI Prototype for research use only — not for clinical decision-making
          </span>
        </div>
      </div>
    </div>
  );
}