import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone } from 'lucide-react';
import { sendMessageToTherapist, analyzeSupportLevel, ChatMessage, SupportAnalysis } from '@/services/groqService';

interface TherapistPrompt {
  show: boolean;
  analysis: SupportAnalysis;
}

export function TherapistChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Dr. Sarah, your AI therapist. I'm here to provide mental health support specifically for high-performing professionals like yourself. How are you feeling today?",
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
      
      // Get AI response
      const response = await sendMessageToTherapist([...messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
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
      case 'high': return 'from-red-500 to-red-600';
      case 'mid': return 'from-orange-500 to-orange-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const getSupportLevelIcon = (level: string) => {
    switch (level) {
      case 'high': return AlertTriangle;
      case 'mid': return Phone;
      default: return Calendar;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card className="h-[700px] flex flex-col shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-6">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-lg">Dr. Sarah - AI Therapist</div>
              <div className="text-sm opacity-90 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Online • Specialized in high-performer wellness
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Therapist Recommendation Prompt */}
          {therapistPrompt.show && (
            <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <Card className={`border-l-4 bg-gradient-to-r ${getSupportLevelColor(therapistPrompt.analysis.level)} border-0 shadow-lg`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      {React.createElement(getSupportLevelIcon(therapistPrompt.analysis.level), { 
                        className: `w-5 h-5 ${therapistPrompt.analysis.level === 'high' ? 'text-red-600' : therapistPrompt.analysis.level === 'mid' ? 'text-orange-600' : 'text-green-600'}` 
                      })}
                    </div>
                    <div className="flex-1 text-white">
                      <h4 className="font-semibold text-lg mb-2">
                        {therapistPrompt.analysis.level === 'high' ? 'High Priority Support Needed' : 'Professional Support Recommended'}
                      </h4>
                      <p className="text-sm opacity-90 mb-4">
                        Based on our conversation, I recommend speaking with one of our licensed therapists. 
                        {therapistPrompt.analysis.level === 'high' 
                          ? ' This appears to require immediate professional attention.'
                          : ' They can provide more specialized support for your situation.'
                        }
                      </p>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={handleScheduleCall}
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                          size="sm"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Call with Therapist
                        </Button>
                        <Button 
                          onClick={handleDismissPrompt}
                          variant="outline"
                          className="border-white text-white hover:bg-white/10"
                          size="sm"
                        >
                          Continue Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-50 text-gray-900 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 max-w-[80%] shadow-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-gradient-to-r from-gray-50 to-blue-50/30 p-6 rounded-b-lg">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind... (Press Enter to send)"
                disabled={isLoading}
                className="flex-1 h-14 text-base bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="h-14 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-gray-500">
                This is AI support. For emergencies, contact your local crisis helpline.
              </p>
              <p className="text-xs text-gray-400">
                Powered by advanced AI • Secure & Private
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}