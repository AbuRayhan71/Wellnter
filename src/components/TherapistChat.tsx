import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X, ChevronUp, ChevronDown, MessageCircle, Activity } from 'lucide-react';
import { sendMessageToTherapist, analyzeSupportLevel, ChatMessage, SupportAnalysis, ClinicalAssessment } from '@/services/groqService';

interface TherapistPrompt {
  show: boolean;
  analysis: SupportAnalysis;
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
  const [therapistPrompt, setTherapistPrompt] = useState<TherapistPrompt>({ show: false, analysis: { level: 'low', reasoning: '', needsTherapist: false } });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, therapistPrompt]);

  const handleScheduleCall = () => {
    const subject = encodeURIComponent('Therapist Consultation Request - Wellnter');
    const body = encodeURIComponent(`Hi,

Based on my conversation with Dr. Sarah (AI), I would like to schedule a consultation with one of your licensed therapists.

Support Level Identified: ${therapistPrompt.analysis.level.toUpperCase()}
Reason: ${therapistPrompt.analysis.reasoning}

Please let me know your availability for a consultation call.

Best regards`);
    
    window.location.href = `mailto:mdabu.rayhan@outlook.com?subject=${subject}&body=${body}`;
  };

  const handleDismissPrompt = () => {
    setTherapistPrompt({ show: false, analysis: { level: 'low', reasoning: '', needsTherapist: false } });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    try {
      // Analyze support level first
      const analysis = await analyzeSupportLevel(currentInput);
      
      // Get AI response with clinical data
      const { response, clinicalData } = await sendMessageToTherapist([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        clinicalData: clinicalData
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show therapist prompt if mid or high level support needed
      if (analysis.needsTherapist && (analysis.level === 'mid' || analysis.level === 'high')) {
        setTherapistPrompt({ show: true, analysis });
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

  const getSupportLevelIcon = (level: string) => {
    switch (level) {
      case 'high': return AlertTriangle;
      case 'mid': return Phone;
      default: return Calendar;
    }
  };

  const getTriageLevelColor = (level: string) => {
    switch (level) {
      case 'ATS 1': return 'bg-red-600 text-white';
      case 'ATS 2': return 'bg-orange-600 text-white';
      case 'ATS 3': return 'bg-yellow-600 text-white';
      case 'ATS 4': return 'bg-blue-600 text-white';
      case 'ATS 5': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderClinicalAssessment = (clinicalData: ClinicalAssessment) => {
    return (
      <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="space-y-4">
          {/* Symptom Summary */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Symptom Summary:</h4>
            <p className="text-gray-700 bg-white p-3 rounded border-l-4 border-blue-500">
              {clinicalData.symptomSummary}
            </p>
          </div>

          {/* Clinical Indicators */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Clinical Indicators:</h4>
            <ul className="space-y-1">
              {clinicalData.clinicalIndicators.map((indicator, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {indicator}
                </li>
              ))}
            </ul>
          </div>

          {/* Triage Level */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">AI-Suggested Triage Level:</h4>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getTriageLevelColor(clinicalData.triageLevel)}`}>
                  {clinicalData.triageLevel}
                </span>
                <span className="text-gray-700">{clinicalData.triageDescription}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{clinicalData.confidence}%</div>
              <div className="text-sm text-gray-500">AI Confidence</div>
            </div>
          </div>

          {/* Follow-up Questions */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">I'd like to know more:</h4>
            <ul className="space-y-2">
              {clinicalData.followUpQuestions.map((question, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <span className="text-blue-500 mr-2">•</span>
                  {question}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Reasoning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded">
            <h4 className="font-semibold text-amber-800 mb-1">Clinical Reasoning:</h4>
            <p className="text-amber-700 text-sm">{clinicalData.clinicalReasoning}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className={`transition-all duration-300 ease-in-out shadow-lg border border-gray-200 bg-white ${
        isExpanded ? 'h-[800px]' : 'h-auto'
      }`}>
        {/* Header - Always visible */}
        <CardHeader 
          className="bg-blue-600 text-white p-4 rounded-t-lg cursor-pointer hover:bg-blue-700 transition-colors"
          onClick={toggleExpanded}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Wellnter Mental Health Assistant</div>
                <div className="text-sm opacity-90 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  AI-Powered Clinical Interface • Click to {isExpanded ? 'minimize' : 'start assessment'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isExpanded && messages.length > 1 && (
                <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
                  {messages.length - 1} assessment{messages.length > 2 ? 's' : ''}
                </div>
              )}
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronUp className="w-5 h-5" />
              )}
            </div>
          </CardTitle>
        </CardHeader>

        {/* Expandable Content */}
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <CardContent className="flex flex-col h-[700px] p-0">
            {/* Therapist Recommendation Prompt */}
            {therapistPrompt.show && (
              <div className="p-4 border-b bg-gray-50">
                <div className={`${getSupportLevelColor(therapistPrompt.analysis.level)} rounded-lg p-4 text-white relative`}>
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
                      {React.createElement(getSupportLevelIcon(therapistPrompt.analysis.level), { 
                        className: 'w-4 h-4' 
                      })}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">
                        {therapistPrompt.analysis.level === 'high' ? 'High Priority Support Needed' : 'Professional Support Recommended'}
                      </h4>
                      <p className="text-sm opacity-90 mb-4">
                        Based on our clinical assessment, I recommend speaking with one of our licensed therapists. 
                        {therapistPrompt.analysis.level === 'high' 
                          ? ' This appears to require immediate professional attention.'
                          : ' They can provide more specialized support for your situation.'
                        }
                      </p>
                      <Button 
                        onClick={handleScheduleCall}
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                        size="sm"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Call with Therapist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div key={index} className="space-y-4">
                    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-900 border border-gray-200'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {message.role === 'assistant' && (
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {message.role === 'user' && (
                            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="w-3 h-3 text-white" />
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
                        </div>
                      </div>
                    </div>
                    
                    {/* Clinical Assessment Display */}
                    {message.role === 'assistant' && message.clinicalData && index > 0 && (
                      <div className="ml-4">
                        {renderClinicalAssessment(message.clinicalData)}
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-[85%]">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
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

            {/* Input Area */}
            <div className="border-t bg-gray-50 p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell me about your symptoms..."
                  disabled={isLoading}
                  className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 px-6 h-12"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-500">
                  🚨 AI Prototype for research use only — not for clinical decision-making
                </p>
                <p className="text-xs text-gray-400">
                  Secure & Private • Clinical Interface
                </p>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Collapsed Preview */}
        {!isExpanded && messages.length > 1 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-600 truncate">
                  Last assessment: {messages[messages.length - 1].clinicalData?.symptomSummary || 'Clinical evaluation in progress'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {messages[messages.length - 1].clinicalData?.triageLevel || 'Assessment'} • {formatTime(messages[messages.length - 1].timestamp)}
                </p>
              </div>
              <Button
                onClick={toggleExpanded}
                variant="outline"
                size="sm"
                className="ml-4 text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                View Assessment
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}