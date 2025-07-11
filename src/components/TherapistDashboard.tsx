import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { TherapistDocumentation } from '@/components/TherapistDocumentation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  User, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  Mail, 
  Phone, 
  Clock, 
  Brain,
  Mic,
  MicOff,
  Save,
  Send,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  MessageSquare,
  Activity,
  Heart,
  Shield,
  ArrowLeft,
  Menu,
  X,
  Stethoscope,
  GraduationCap,
  BookOpen,
  TrendingUp
} from 'lucide-react';

interface PatientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  atsLevel: string;
  supportLevel: 'low' | 'mid' | 'high';
  lastAssessment: Date;
  symptoms: string[];
  clinicalNotes: string;
  riskFactors: string[];
  sessionHistory: SessionRecord[];
  intakeForm: IntakeFormData;
  aiPreAssessment: {
    summary: string;
    keyFindings: string[];
    recommendedActions: string[];
    urgencyLevel: string;
    confidenceScore: number;
  };
}

interface SessionRecord {
  id: string;
  date: Date;
  duration: number;
  type: 'initial' | 'follow-up' | 'crisis';
  notes: string;
  transcript?: string;
  summary?: string;
}

interface IntakeFormData {
  // Demographics
  age: number;
  gender: string;
  occupation: string;
  education: string;
  
  // Academic Information
  currentProgram: string;
  yearOfStudy: string;
  researchArea: string;
  advisor: string;
  
  // Mental Health History
  previousTherapy: boolean;
  currentMedications: string[];
  familyHistory: string;
  
  // Current Concerns
  primaryConcerns: string[];
  stressLevel: number;
  sleepQuality: number;
  academicPerformance: string;
  
  // Risk Assessment
  suicidalIdeation: boolean;
  selfHarm: boolean;
  substanceUse: string;
  
  // Support System
  socialSupport: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

const mockPatients: PatientData[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    phone: '+1 (555) 123-4567',
    atsLevel: 'ATS 2',
    supportLevel: 'high',
    lastAssessment: new Date('2025-01-15'),
    symptoms: ['Severe anxiety', 'Panic attacks', 'Academic burnout', 'Sleep disturbances'],
    clinicalNotes: 'PhD student experiencing severe thesis anxiety with panic attacks during research presentations. Patient reports feeling overwhelmed by dissertation deadlines and imposter syndrome. Requires immediate intervention and ongoing support.',
    riskFactors: ['Social isolation', 'Perfectionism', 'Financial stress', 'Family pressure'],
    aiPreAssessment: {
      summary: 'High-functioning PhD student presenting with severe academic anxiety, panic symptoms, and burnout. AI assessment indicates significant distress related to thesis completion and career uncertainty. Patient demonstrates insight but requires immediate professional intervention.',
      keyFindings: [
        'Severe anxiety symptoms (9/10 severity)',
        'Panic attacks triggered by academic presentations',
        'Sleep disruption affecting cognitive function',
        'Perfectionist tendencies contributing to stress',
        'Strong academic background but declining performance'
      ],
      recommendedActions: [
        'Immediate anxiety management techniques',
        'Cognitive behavioral therapy for academic anxiety',
        'Sleep hygiene intervention',
        'Stress management workshops',
        'Consider psychiatric consultation for medication evaluation'
      ],
      urgencyLevel: 'High - Requires immediate attention',
      confidenceScore: 92
    },
    sessionHistory: [
      {
        id: 's1',
        date: new Date('2025-01-15'),
        duration: 50,
        type: 'initial',
        notes: 'Initial assessment completed. High anxiety levels related to thesis defense. Patient expressed concerns about academic performance and future career prospects.',
        summary: 'Patient presents with severe academic anxiety and panic symptoms. Immediate intervention required.'
      },
      {
        id: 's2',
        date: new Date('2025-01-10'),
        duration: 45,
        type: 'follow-up',
        notes: 'Follow-up session. Patient showing some improvement with coping strategies. Still experiencing sleep difficulties.',
        summary: 'Gradual improvement noted. Continue current treatment plan.'
      }
    ],
    intakeForm: {
      age: 28,
      gender: 'Female',
      occupation: 'PhD Student',
      education: 'Masters in Computer Science',
      currentProgram: 'PhD Computer Science',
      yearOfStudy: '4th Year',
      researchArea: 'Machine Learning',
      advisor: 'Dr. Johnson',
      previousTherapy: true,
      currentMedications: ['Sertraline 50mg'],
      familyHistory: 'Mother has anxiety disorder',
      primaryConcerns: ['Thesis anxiety', 'Panic attacks', 'Imposter syndrome'],
      stressLevel: 9,
      sleepQuality: 3,
      academicPerformance: 'Declining',
      suicidalIdeation: false,
      selfHarm: false,
      substanceUse: 'Occasional alcohol',
      socialSupport: 'Limited',
      emergencyContact: {
        name: 'Michael Chen',
        relationship: 'Brother',
        phone: '+1 (555) 987-6543'
      }
    }
  },
  {
    id: '2',
    name: 'James Rodriguez',
    email: 'j.rodriguez@university.edu',
    phone: '+1 (555) 234-5678',
    atsLevel: 'ATS 3',
    supportLevel: 'mid',
    lastAssessment: new Date('2025-01-14'),
    symptoms: ['Study stress', 'Procrastination', 'Mild depression', 'Time management issues'],
    clinicalNotes: 'Undergraduate student struggling with time management and motivation. Reports difficulty concentrating during study sessions and feeling overwhelmed by coursework.',
    riskFactors: ['Academic pressure', 'Family expectations', 'Financial concerns'],
    aiPreAssessment: {
      summary: 'Third-year engineering student experiencing moderate academic stress and motivational challenges. AI assessment suggests underlying time management and organizational difficulties contributing to academic underperformance.',
      keyFindings: [
        'Moderate stress levels (6/10)',
        'Procrastination patterns affecting grades',
        'Mild depressive symptoms',
        'Good social support system',
        'Responsive to structured interventions'
      ],
      recommendedActions: [
        'Time management and study skills training',
        'Cognitive behavioral techniques for procrastination',
        'Academic coaching sessions',
        'Stress reduction techniques',
        'Regular check-ins for progress monitoring'
      ],
      urgencyLevel: 'Moderate - Standard intervention timeline',
      confidenceScore: 85
    },
    sessionHistory: [
      {
        id: 's3',
        date: new Date('2025-01-14'),
        duration: 40,
        type: 'initial',
        notes: 'Initial consultation. Student reports academic stress and time management difficulties. No immediate risk factors identified.',
        summary: 'Moderate academic stress. Recommend cognitive behavioral therapy techniques.'
      }
    ],
    intakeForm: {
      age: 21,
      gender: 'Male',
      occupation: 'Undergraduate Student',
      education: 'High School Diploma',
      currentProgram: 'Bachelor of Engineering',
      yearOfStudy: '3rd Year',
      researchArea: 'N/A',
      advisor: 'N/A',
      previousTherapy: false,
      currentMedications: [],
      familyHistory: 'No known mental health issues',
      primaryConcerns: ['Academic stress', 'Time management', 'Low motivation'],
      stressLevel: 6,
      sleepQuality: 5,
      academicPerformance: 'Average',
      suicidalIdeation: false,
      selfHarm: false,
      substanceUse: 'None',
      socialSupport: 'Good',
      emergencyContact: {
        name: 'Maria Rodriguez',
        relationship: 'Mother',
        phone: '+1 (555) 876-5432'
      }
    }
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'e.watson@university.edu',
    phone: '+1 (555) 345-6789',
    atsLevel: 'ATS 1',
    supportLevel: 'high',
    lastAssessment: new Date('2025-01-16'),
    symptoms: ['Suicidal ideation', 'Severe depression', 'Academic failure anxiety', 'Social withdrawal'],
    clinicalNotes: 'URGENT: Masters student expressing suicidal thoughts related to academic failure. Immediate crisis intervention required. Patient has been struggling with research project and feels hopeless about future.',
    riskFactors: ['Suicidal ideation', 'Social isolation', 'Academic failure', 'Previous mental health history'],
    aiPreAssessment: {
      summary: 'CRITICAL: Masters student in clinical psychology presenting with active suicidal ideation and severe depression. AI crisis detection protocols activated. Patient requires immediate professional intervention and safety planning.',
      keyFindings: [
        'Active suicidal ideation with plan',
        'Severe depression (10/10 severity)',
        'Academic failure triggering hopelessness',
        'History of self-harm behaviors',
        'Substance use as coping mechanism'
      ],
      recommendedActions: [
        'IMMEDIATE: Crisis intervention and safety planning',
        'Emergency contact notification',
        'Psychiatric evaluation for hospitalization',
        'Remove access to means of self-harm',
        'Intensive therapy and monitoring'
      ],
      urgencyLevel: 'CRITICAL - Immediate intervention required',
      confidenceScore: 98
    },
    sessionHistory: [
      {
        id: 's4',
        date: new Date('2025-01-16'),
        duration: 60,
        type: 'crisis',
        notes: 'CRISIS SESSION: Patient expressed suicidal thoughts. Safety plan implemented. Emergency contact notified. Immediate follow-up scheduled.',
        summary: 'CRITICAL: Suicidal ideation present. Crisis intervention protocols activated.'
      }
    ],
    intakeForm: {
      age: 25,
      gender: 'Female',
      occupation: 'Masters Student',
      education: 'Bachelor of Psychology',
      currentProgram: 'Masters in Clinical Psychology',
      yearOfStudy: '2nd Year',
      researchArea: 'Cognitive Behavioral Therapy',
      advisor: 'Dr. Smith',
      previousTherapy: true,
      currentMedications: ['Fluoxetine 20mg', 'Lorazepam 0.5mg PRN'],
      familyHistory: 'Father has depression, Grandmother had bipolar disorder',
      primaryConcerns: ['Suicidal thoughts', 'Academic failure', 'Research anxiety', 'Future uncertainty'],
      stressLevel: 10,
      sleepQuality: 2,
      academicPerformance: 'Failing',
      suicidalIdeation: true,
      selfHarm: true,
      substanceUse: 'Heavy alcohol use',
      socialSupport: 'Very limited',
      emergencyContact: {
        name: 'David Watson',
        relationship: 'Father',
        phone: '+1 (555) 111-2222'
      }
    }
  }
];

export function TherapistDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'intake' | 'sessions' | 'notes'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGeneratingNotes, setIsGeneratingNotes] = useState(false);

  // Auto-select first patient for demo purposes
  useEffect(() => {
    if (mockPatients.length > 0 && !selectedPatient) {
      setSelectedPatient(mockPatients[0]);
    }
  }, [selectedPatient]);

  const getATSColor = (atsLevel: string) => {
    switch (atsLevel) {
      case 'ATS 1': return 'bg-red-600 text-white';
      case 'ATS 2': return 'bg-red-500 text-white';
      case 'ATS 3': return 'bg-orange-500 text-white';
      case 'ATS 4': return 'bg-yellow-500 text-white';
      case 'ATS 5': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSupportLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'mid': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleEscalateToMD = (patient: PatientData) => {
    const subject = encodeURIComponent(`URGENT - MD Consultation Required - ${patient.name}`);
    const body = encodeURIComponent(`URGENT MEDICAL CONSULTATION REQUEST

Patient: ${patient.name}
Email: ${patient.email}
Phone: ${patient.phone}

CLINICAL ASSESSMENT:
- ATS Triage Level: ${patient.atsLevel}
- Support Level: ${patient.supportLevel.toUpperCase()}
- Last Assessment: ${patient.lastAssessment.toLocaleDateString()}

AI PRE-ASSESSMENT SUMMARY:
${patient.aiPreAssessment.summary}

PRESENTING SYMPTOMS:
${patient.symptoms.map(symptom => `- ${symptom}`).join('\n')}

CLINICAL NOTES:
${patient.clinicalNotes}

RISK FACTORS:
${patient.riskFactors.map(factor => `- ${factor}`).join('\n')}

AI RECOMMENDED ACTIONS:
${patient.aiPreAssessment.recommendedActions.map(action => `- ${action}`).join('\n')}

REASON FOR ESCALATION:
This patient requires immediate medical evaluation and potential psychiatric consultation. Please prioritize this case based on ${patient.aiPreAssessment.urgencyLevel}.

AI Confidence Score: ${patient.aiPreAssessment.confidenceScore}%

Therapist: Dr. [Your Name]
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`);
    
    window.location.href = `mailto:medical@wellnter.com?subject=${subject}&body=${body}`;
  };

  const generateAISuggestions = async (notes: string) => {
    setIsGeneratingNotes(true);
    
    // Simulate GPT API call
    try {
      // In a real implementation, this would call GPT API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestions = [
        "Consider exploring cognitive behavioral therapy techniques for anxiety management",
        "Recommend mindfulness exercises for stress reduction during study sessions",
        "Suggest academic accommodation discussion with university disability services",
        "Follow up on sleep hygiene practices and consider sleep study referral",
        "Assess need for psychiatric consultation for medication evaluation",
        "Implement grounding techniques for panic attack management",
        "Explore perfectionism patterns and their impact on academic performance"
      ];
      setAiSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating AI suggestions:', error);
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const generateSessionSummary = async () => {
    setIsGeneratingNotes(true);
    
    try {
      // Simulate GPT API call for session summary
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const summary = `Session Summary (AI Generated):

PATIENT PRESENTATION:
- Patient appeared anxious but engaged throughout session
- Demonstrated good insight into current stressors
- Cooperative with therapeutic interventions

KEY TOPICS DISCUSSED:
- Academic pressure and thesis-related anxiety
- Coping strategies for managing panic symptoms
- Sleep disturbances and their impact on daily functioning
- Support system utilization

INTERVENTIONS PROVIDED:
- Psychoeducation about anxiety and panic responses
- Breathing techniques for acute anxiety management
- Cognitive restructuring for catastrophic thinking patterns

PATIENT RESPONSE:
- Receptive to interventions and willing to practice techniques
- Expressed motivation for continued treatment
- Demonstrated understanding of safety planning

TREATMENT PLAN:
- Continue weekly sessions focusing on CBT techniques
- Implement daily mindfulness practice
- Monitor sleep patterns and anxiety levels
- Follow up on academic accommodations

RISK ASSESSMENT:
- No current suicidal ideation
- Good safety awareness
- Stable support system

NEXT SESSION GOALS:
- Review homework assignments
- Practice anxiety management techniques
- Explore academic stress reduction strategies`;

      setSessionNotes(prev => prev + "\n\n" + summary);
    } catch (error) {
      console.error('Error generating session summary:', error);
    } finally {
      setIsGeneratingNotes(false);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start audio recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real implementation, this would stop recording and generate transcript
    const mockTranscript = "Patient discussed increased anxiety levels related to upcoming thesis defense. Reported difficulty sleeping and concentration issues. Expressed concerns about imposter syndrome and fear of failure. Therapist provided psychoeducation about anxiety responses and introduced breathing techniques.";
    setSessionNotes(prev => prev + "\n\nSession Transcript (AI Generated):\n" + mockTranscript);
    generateAISuggestions(mockTranscript);
  };

  const handleDocumentPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowDocumentation(true);
  };

  const handleEarlyAccess = () => {
    const subject = encodeURIComponent('Early Access Registration - Wellnter');
    const body = encodeURIComponent(`Hi,

I'm interested in registering for early access to Wellnter.

Please let me know the next steps.

Best regards`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  if (showDocumentation) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/wellnter-logo.png" 
                alt="Wellnter Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-2xl sm:text-3xl font-bold">
                <span className="text-blue-600">Wellnter</span>
                <span className="text-gray-600 text-lg ml-2">Therapist Portal</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowDocumentation(false)}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </nav>

        <TherapistDocumentation 
          patientId={selectedPatient?.id} 
          sessionData={selectedPatient}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/wellnter-logo.png" 
              alt="Wellnter Logo" 
              className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="text-2xl sm:text-3xl font-bold">
              <span className="text-blue-600">Wellnter</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
            <a href="/therapist" className="text-blue-600 font-medium">Therapist Portal</a>
            <a href="/features" className="text-gray-600 hover:text-blue-600 transition-colors">What We Do</a>
            <a href="/how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
            <Button 
              onClick={handleEarlyAccess}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Get Early Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg bg-transparent"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              <a 
                href="/" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/therapist" 
                className="block text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Therapist Portal
              </a>
              <a 
                href="/features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                What We Do
              </a>
              <a 
                href="/how-it-works" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <a 
                href="/about" 
                className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <Button 
                onClick={() => {
                  handleEarlyAccess();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        )}
      </nav>

      <div className="bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Therapist Dashboard</h1>
              <p className="text-gray-600">Wellnter Clinical Platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="w-4 h-4 mr-1" />
                Online
              </Badge>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-160px)]">
          {/* Patient List Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Active Patients</h2>
              <Input placeholder="Search patients..." className="w-full" />
            </div>
            
            <div className="p-4 space-y-3">
              {mockPatients.map((patient) => (
                <Card 
                  key={patient.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md bg-white border ${
                    selectedPatient?.id === patient.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <Badge className={`text-xs ${getATSColor(patient.atsLevel)}`}>
                        {patient.atsLevel}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        {patient.email}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs border ${getSupportLevelColor(patient.supportLevel)}`}>
                          {patient.supportLevel.toUpperCase()} RISK
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {patient.lastAssessment.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {selectedPatient ? (
              <div className="p-6">
                {/* Patient Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.intakeForm.currentProgram} • {selectedPatient.intakeForm.yearOfStudy}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getATSColor(selectedPatient.atsLevel)} px-3 py-1`}>
                        {selectedPatient.atsLevel}
                      </Badge>
                      <Button 
                        onClick={() => handleEscalateToMD(selectedPatient)}
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Escalate to MD
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Last seen: {selectedPatient.lastAssessment.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Pre-Assessment Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 rounded-t-lg">
                    <h3 className="text-white font-semibold text-lg flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Pre-Assessment Summary
                    </h3>
                    <p className="text-purple-100 text-sm">
                      Confidence Score: {selectedPatient.aiPreAssessment.confidenceScore}% • {selectedPatient.aiPreAssessment.urgencyLevel}
                    </p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {selectedPatient.aiPreAssessment.summary}
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                          Key Findings
                        </h4>
                        <ul className="space-y-2">
                          {selectedPatient.aiPreAssessment.keyFindings.map((finding, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-700">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Stethoscope className="w-4 h-4 mr-2 text-green-600" />
                          Recommended Actions
                        </h4>
                        <ul className="space-y-2">
                          {selectedPatient.aiPreAssessment.recommendedActions.map((action, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <ArrowLeft className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0 rotate-180" />
                              <span className="text-sm text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                  <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                      {[
                        { id: 'overview', label: 'Overview', icon: Eye },
                        { id: 'intake', label: 'Intake Form', icon: FileText },
                        { id: 'sessions', label: 'Sessions', icon: MessageSquare },
                        { id: 'notes', label: 'Clinical Notes', icon: Edit }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                            activeTab === tab.id
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          <tab.icon className="w-4 h-4" />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="p-6 bg-white">
                    {activeTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Current Symptoms */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Symptoms</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Risk Factors */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Factors</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedPatient.riskFactors.map((factor, index) => (
                              <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Clinical Notes */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinical Notes</h3>
                          <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedPatient.clinicalNotes}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'intake' && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Demographics */}
                          <Card className="bg-white border border-gray-200">
                            <CardHeader className="bg-gray-50">
                              <CardTitle className="text-lg">Demographics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 bg-white">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Age:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.age}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Gender:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.gender}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Occupation:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.occupation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Education:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.education}</span>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Academic Information */}
                          <Card className="bg-white border border-gray-200">
                            <CardHeader className="bg-gray-50">
                              <CardTitle className="text-lg flex items-center">
                                <GraduationCap className="w-5 h-5 mr-2" />
                                Academic Information
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 bg-white">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Program:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.currentProgram}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Year:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.yearOfStudy}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Research Area:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.researchArea}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Advisor:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.advisor}</span>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Mental Health Assessment */}
                          <Card className="bg-white border border-gray-200">
                            <CardHeader className="bg-gray-50">
                              <CardTitle className="text-lg flex items-center">
                                <Heart className="w-5 h-5 mr-2" />
                                Mental Health Assessment
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 bg-white">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Stress Level:</span>
                                <Badge className={`${selectedPatient.intakeForm.stressLevel >= 7 ? 'bg-red-500' : selectedPatient.intakeForm.stressLevel >= 4 ? 'bg-orange-500' : 'bg-green-500'} text-white`}>
                                  {selectedPatient.intakeForm.stressLevel}/10
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Sleep Quality:</span>
                                <Badge className={`${selectedPatient.intakeForm.sleepQuality <= 3 ? 'bg-red-500' : selectedPatient.intakeForm.sleepQuality <= 6 ? 'bg-orange-500' : 'bg-green-500'} text-white`}>
                                  {selectedPatient.intakeForm.sleepQuality}/10
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Academic Performance:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.academicPerformance}</span>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Risk Assessment */}
                          <Card className="bg-white border border-gray-200">
                            <CardHeader className="bg-gray-50">
                              <CardTitle className="text-lg flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Risk Assessment
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 bg-white">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Suicidal Ideation:</span>
                                {selectedPatient.intakeForm.suicidalIdeation ? (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                ) : (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Self Harm:</span>
                                {selectedPatient.intakeForm.selfHarm ? (
                                  <XCircle className="w-5 h-5 text-red-500" />
                                ) : (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                )}
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Substance Use:</span>
                                <span className="font-medium">{selectedPatient.intakeForm.substanceUse}</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}

                    {activeTab === 'sessions' && (
                      <div className="space-y-4">
                            onClick={() => handleDocumentPatient(patient)}
                          <h3 className="text-lg font-semibold text-gray-900">Session History</h3>
                          <Button size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            Document
                          </Button>
                        </div>

                        <>
                        {selectedPatient.sessionHistory.length > 0 ? (
                          <div className="space-y-4">
                            {selectedPatient.sessionHistory.map((session) => (
                              <Card key={session.id} className="bg-white border border-gray-200">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {session.type.charAt(0).toUpperCase() + session.type.slice(1)} Session
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        {session.date.toLocaleDateString()} • {session.duration} minutes
                                      </p>
                                    </div>
                                    <Badge variant="outline">
                                      {session.type}
                                    </Badge>
                                  </div>
                                  
                                  <p className="text-gray-700 mb-3">{session.notes}</p>
                                  
                                  {session.summary && (
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                      <h5 className="font-medium text-blue-900 mb-1">AI Summary</h5>
                                      <p className="text-blue-800 text-sm">{session.summary}</p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>No sessions recorded yet</p>
                          </div>
                        )}
                        </>
                        </>
                      </div>
                    )}

                    {activeTab === 'notes' && (
                      <div className="space-y-6">
                        {/* Session Recording */}
                        <Card className="bg-white border border-gray-200">
                          <CardHeader className="bg-gray-50">
                            <CardTitle className="flex items-center space-x-2">
                              <Brain className="w-5 h-5 text-blue-600" />
                              <span>AI-Assisted Session Notes</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4 bg-white">
                            <div className="flex items-center space-x-4">
                              <Button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                              >
                                {isRecording ? (
                                  <>
                                    <MicOff className="w-4 h-4 mr-2" />
                                    Stop Recording
                                  </>
                                ) : (
                                  <>
                                    <Mic className="w-4 h-4 mr-2" />
                                    Start Recording
                                  </>
                                )}
                              </Button>
                              
                              {isRecording && (
                                <div className="flex items-center space-x-2 text-red-600">
                                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                                  <span className="text-sm font-medium">Recording in progress...</span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Session Notes
                                </label>
                                <textarea
                                  value={sessionNotes}
                                  onChange={(e) => setSessionNotes(e.target.value)}
                                  placeholder="Enter session notes here. AI will assist with suggestions and formatting."
                                  className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                />
                              </div>

                              {aiSuggestions.length > 0 && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                  <h4 className="font-medium text-blue-900 mb-3">AI Suggestions</h4>
                                  <ul className="space-y-2">
                                    {aiSuggestions.map((suggestion, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <Brain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-blue-800 text-sm">{suggestion}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <div className="flex space-x-3">
                                <Button 
                                  onClick={() => generateAISuggestions(sessionNotes)}
                                  disabled={isGeneratingNotes}
                                  className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                  {isGeneratingNotes ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                      Generating...
                                    </>
                                  ) : (
                                    <>
                                      <Brain className="w-4 h-4 mr-2" />
                                      Get AI Suggestions
                                    </>
                                  )}
                                </Button>
                                <Button 
                                  onClick={generateSessionSummary}
                                  disabled={isGeneratingNotes}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  {isGeneratingNotes ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                      Generating...
                                    </>
                                  ) : (
                                    <>
                                      <FileText className="w-4 h-4 mr-2" />
                                      Generate Summary
                                    </>
                                  )}
                                </Button>
                                <Button variant="outline">
                                  <Save className="w-4 h-4 mr-2" />
                                  Save Notes
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Patient</h3>
                  <p className="text-gray-600">Choose a patient from the sidebar to view their information</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home */}
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/'}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}