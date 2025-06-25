import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, Calendar, AlertTriangle, Phone, X } from 'lucide-react';
import { sendMessageToTherapist, analyzeSupportLevel, ChatMessage, SupportAnalysis } from '@/services/groqService';

interface TherapistPrompt {
  show: boolean;
  analysis: SupportAnalysis;
}

export function TherapistChat() {
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col shadow-lg border border-gray-200 bg-white">
        <CardHeader className="bg-blue-600 text-white p-6 rounded-t-lg">
          <CardTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold">Dr. Sarah - AI Therapist</div>
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
                      Based on our conversation, I recommend speaking with one of our licensed therapists. 
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
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
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
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
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
          <div className="border-t bg-gray-50 p-4">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-500">
                This is AI support. For emergencies, contact your local crisis helpline.
              </p>
              <p className="text-xs text-gray-400">
                Secure & Private
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}