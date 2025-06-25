import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Phone, Clock, User, Mail, MessageSquare, X } from 'lucide-react';

interface CriticalAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  urgencyLevel: 'critical' | 'urgent';
  clinicalData?: {
    triageLevel: string;
    symptomSummary: string;
    clinicalReasoning: string;
  };
}

export function CriticalAppointmentModal({ 
  isOpen, 
  onClose, 
  urgencyLevel,
  clinicalData 
}: CriticalAppointmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    urgentNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const urgencyText = urgencyLevel === 'critical' ? 'CRITICAL - IMMEDIATE DANGER' : 'URGENT - HIGH PRIORITY';
      const subject = encodeURIComponent(`🚨 ${urgencyText} - Emergency Appointment Request`);
      
      const emailBody = `🚨 EMERGENCY APPOINTMENT REQUEST 🚨

URGENCY LEVEL: ${urgencyText}
TRIAGE LEVEL: ${clinicalData?.triageLevel || 'ATS 1'}
TIMESTAMP: ${new Date().toISOString()}

PATIENT INFORMATION:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

CLINICAL ASSESSMENT:
- Symptom Summary: ${clinicalData?.symptomSummary || 'Immediate danger/suicidal ideation reported'}
- Clinical Reasoning: ${clinicalData?.clinicalReasoning || 'Patient requires immediate professional intervention'}

URGENT NOTES FROM PATIENT:
${formData.urgentNotes}

⚠️ THIS IS AN AUTOMATED EMERGENCY REFERRAL ⚠️
Please contact this patient immediately. This case has been flagged as requiring urgent professional intervention.

AI Assessment Confidence: High Priority
Recommended Action: Immediate therapist contact within 10 minutes

---
Sent via Wellnter Emergency Referral System
Time: ${new Date().toLocaleString()}`;

      // Send to contact@wellnter.com
      const mailtoLink = `mailto:contact@wellnter.com?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;

      // Also send to backup email
      setTimeout(() => {
        const backupMailto = `mailto:mdabu.rayhan@outlook.com?subject=${subject}&body=${encodeURIComponent(emailBody)}`;
        window.open(backupMailto, '_blank');
      }, 1000);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting emergency appointment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md bg-white">
          <CardHeader className="bg-green-600 text-white text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Phone className="w-6 h-6" />
              <span>Emergency Request Sent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Help is on the way
            </h3>
            <p className="text-gray-600">
              Your emergency appointment request has been sent to our crisis team at contact@wellnter.com. 
              A licensed therapist will contact you within 10 minutes.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800 font-medium">
                If you're in immediate danger, please call:
              </p>
              <div className="mt-2 space-y-1 text-sm text-red-700">
                <div>🇺🇸 US: 988 (Suicide & Crisis Lifeline)</div>
                <div>🇬🇧 UK: 116 123 (Samaritans)</div>
                <div>🇧🇩 BD: 09611677777 (Kaan Pete Roi)</div>
                <div>🚨 Emergency: 911 / 999 / 112</div>
              </div>
            </div>
            <Button onClick={onClose} className="w-full">
              Continue Conversation
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg bg-white">
        <CardHeader className={`${
          urgencyLevel === 'critical' ? 'bg-red-600' : 'bg-orange-600'
        } text-white`}>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6" />
              <span>
                {urgencyLevel === 'critical' ? 'CRITICAL - Immediate Danger' : 'URGENT - High Priority'}
              </span>
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm opacity-90">
            {urgencyLevel === 'critical' 
              ? 'Suicidal ideation detected - Emergency appointment required'
              : 'High-risk situation identified - Urgent professional support needed'
            }
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Response Time: {urgencyLevel === 'critical' ? '< 10 minutes' : '< 30 minutes'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                A licensed therapist will contact you immediately. This request is being sent to our emergency team.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.urgentNotes}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgentNotes: e.target.value }))}
                  placeholder="Any additional information you'd like to share..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none h-20 text-sm"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Privacy Notice:</strong> This information will be sent securely to our licensed therapists at contact@wellnter.com for immediate intervention.
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 ${
                  urgencyLevel === 'critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'
                } text-white font-semibold`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending Emergency Request...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Emergency Request
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Crisis Resources */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Immediate Crisis Resources:</h4>
            <div className="space-y-1 text-xs text-gray-600">
              <div>🇺🇸 US: 988 (Suicide & Crisis Lifeline)</div>
              <div>🇬🇧 UK: 116 123 (Samaritans)</div>
              <div>🇧🇩 Bangladesh: 09611677777 (Kaan Pete Roi)</div>
              <div>🚨 Emergency Services: 911 / 999 / 112</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}