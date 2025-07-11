import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Save, 
  User, 
  Users, 
  Briefcase, 
  Heart, 
  Activity,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PatientIntakeData {
  // Patient Information
  patientName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  contactDetails: string;
  
  // Family Information
  maritalStatus: string;
  children: string;
  livingSituation: string;
  importantRelatives: string;
  partnerWorkSituation: string;
  familyMembersAbroad: string;
  
  // Life Situation
  selfDescription: string;
  majorLifeEvents: string;
  healthImpact: string;
  socialActivities: string;
  workLifeBalance: string;
  recentChanges: string;
  
  // Occupational/Education
  educationalBackground: string;
  employmentHistory: string;
  currentJob: string;
  recentWorkChanges: string;
  
  // Medical History
  pastPsychiatricHistory: string;
  medicalHistory: string;
  currentSymptoms: string;
  triggersStressors: string;
  priorMedications: string;
  
  // Family Medical History
  familyMentalHealth: string;
  familyPhysicalHealth: string;
  familyRelationshipDynamics: string;
}

interface SessionNote {
  id: string;
  date: string;
  sessionType: 'Initial Intake' | 'Follow-up' | 'Crisis' | 'Assessment';
  duration: string;
  presentingConcerns: string;
  mentalStatusExam: string;
  interventions: string;
  homework: string;
  riskAssessment: string;
  treatmentPlan: string;
  nextAppointment: string;
  therapistNotes: string;
}

interface TherapistDocumentationProps {
  patientId?: string;
  sessionData?: any;
}

export function TherapistDocumentation({ patientId, sessionData }: TherapistDocumentationProps) {
  const [activeTab, setActiveTab] = useState('intake');
  const [intakeData, setIntakeData] = useState<PatientIntakeData>({
    patientName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    contactDetails: '',
    maritalStatus: '',
    children: '',
    livingSituation: '',
    importantRelatives: '',
    partnerWorkSituation: '',
    familyMembersAbroad: '',
    selfDescription: '',
    majorLifeEvents: '',
    healthImpact: '',
    socialActivities: '',
    workLifeBalance: '',
    recentChanges: '',
    educationalBackground: '',
    employmentHistory: '',
    currentJob: '',
    recentWorkChanges: '',
    pastPsychiatricHistory: '',
    medicalHistory: '',
    currentSymptoms: '',
    triggersStressors: '',
    priorMedications: '',
    familyMentalHealth: '',
    familyPhysicalHealth: '',
    familyRelationshipDynamics: ''
  });

  const [sessionNote, setSessionNote] = useState<SessionNote>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    sessionType: 'Initial Intake',
    duration: '',
    presentingConcerns: '',
    mentalStatusExam: '',
    interventions: '',
    homework: '',
    riskAssessment: '',
    treatmentPlan: '',
    nextAppointment: '',
    therapistNotes: ''
  });

  const handleSaveIntake = () => {
    const subject = encodeURIComponent('Patient Intake Documentation - Wellnter');
    const body = encodeURIComponent(`INTAKE INTERVIEW PROTOCOL
Date: ${new Date().toLocaleDateString()}

=== PATIENT INFORMATION ===
• Name: ${intakeData.patientName}
• Date of birth: ${intakeData.dateOfBirth}
• Place of birth: ${intakeData.placeOfBirth}
• Contact details: ${intakeData.contactDetails}

=== FAMILY ===
• Marital/relationship status: ${intakeData.maritalStatus}
• Children (age, number): ${intakeData.children}
• Living situation (who lives at home?): ${intakeData.livingSituation}
• Important relatives, support system: ${intakeData.importantRelatives}
• Partner's work situation, availability: ${intakeData.partnerWorkSituation}
• Family members living abroad / visiting: ${intakeData.familyMembersAbroad}

=== LIFE SITUATION ===
• Self-description before current issues: ${intakeData.selfDescription}
• Major life events or turning points: ${intakeData.majorLifeEvents}
• Impact of health problems on life: ${intakeData.healthImpact}
• Social activities, hobbies: ${intakeData.socialActivities}
• Work-life balance: ${intakeData.workLifeBalance}
• Recent changes in lifestyle or stressors: ${intakeData.recentChanges}

=== OCCUPATIONAL HISTORY / EDUCATION ===
• Educational background (degree, year, place): ${intakeData.educationalBackground}
• Employment history (key jobs, achievements): ${intakeData.employmentHistory}
• Current job, role, satisfaction: ${intakeData.currentJob}
• Recent changes in work (promotion, relocation, leave): ${intakeData.recentWorkChanges}

=== MEDICAL HISTORY (ANAMNESIS) ===
• Past psychiatric history (diagnoses, treatments, hospitalizations): ${intakeData.pastPsychiatricHistory}
• Medical history (important illnesses, surgeries, accidents): ${intakeData.medicalHistory}
• Current mental health symptoms (onset, duration, severity): ${intakeData.currentSymptoms}
• Triggers or stressors: ${intakeData.triggersStressors}
• Prior medications, therapies (effectiveness): ${intakeData.priorMedications}

=== FAMILY MEDICAL HISTORY ===
• Family history (depression, anxiety, bipolar, psychosis, substance use): ${intakeData.familyMentalHealth}
• Physical health issues in close family: ${intakeData.familyPhysicalHealth}
• Relationship dynamics in the family: ${intakeData.familyRelationshipDynamics}

---
Completed by: Licensed Therapist
Platform: Wellnter Therapist Portal
Date: ${new Date().toLocaleString()}`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  const handleSaveSession = () => {
    const subject = encodeURIComponent('Session Documentation - Wellnter');
    const body = encodeURIComponent(`SESSION DOCUMENTATION
Date: ${sessionNote.date}
Session Type: ${sessionNote.sessionType}
Duration: ${sessionNote.duration}

=== PRESENTING CONCERNS ===
${sessionNote.presentingConcerns}

=== MENTAL STATUS EXAMINATION ===
${sessionNote.mentalStatusExam}

=== INTERVENTIONS USED ===
${sessionNote.interventions}

=== HOMEWORK/ASSIGNMENTS ===
${sessionNote.homework}

=== RISK ASSESSMENT ===
${sessionNote.riskAssessment}

=== TREATMENT PLAN UPDATES ===
${sessionNote.treatmentPlan}

=== NEXT APPOINTMENT ===
${sessionNote.nextAppointment}

=== THERAPIST NOTES ===
${sessionNote.therapistNotes}

---
Completed by: Licensed Therapist
Platform: Wellnter Therapist Portal
Date: ${new Date().toLocaleString()}`);
    
    window.location.href = `mailto:contact@wellnter.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Therapist Documentation</h1>
            <p className="text-gray-600">Clinical intake and session documentation</p>
          </div>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Licensed Professional
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="intake" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Intake Interview</span>
          </TabsTrigger>
          <TabsTrigger value="session" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Session Notes</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intake" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <Input
                    value={intakeData.patientName}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, patientName: e.target.value }))}
                    placeholder="Patient's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <Input
                    type="date"
                    value={intakeData.dateOfBirth}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place of Birth</label>
                  <Input
                    value={intakeData.placeOfBirth}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, placeOfBirth: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Details (Optional)</label>
                  <Input
                    value={intakeData.contactDetails}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, contactDetails: e.target.value }))}
                    placeholder="Phone, email, emergency contact"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span>Family</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital/Relationship Status</label>
                  <Input
                    value={intakeData.maritalStatus}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, maritalStatus: e.target.value }))}
                    placeholder="Single, married, divorced, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Children (Age, Number)</label>
                  <Input
                    value={intakeData.children}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, children: e.target.value }))}
                    placeholder="e.g., 2 children (ages 8, 12)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Living Situation (Who lives at home?)</label>
                <Textarea
                  value={intakeData.livingSituation}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, livingSituation: e.target.value }))}
                  placeholder="Describe current living arrangements"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Important Relatives, Support System</label>
                <Textarea
                  value={intakeData.importantRelatives}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, importantRelatives: e.target.value }))}
                  placeholder="Key family members and support network"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner's Work Situation, Availability</label>
                  <Textarea
                    value={intakeData.partnerWorkSituation}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, partnerWorkSituation: e.target.value }))}
                    placeholder="Partner's employment and availability"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Family Members Living Abroad / Visiting</label>
                  <Textarea
                    value={intakeData.familyMembersAbroad}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, familyMembersAbroad: e.target.value }))}
                    placeholder="Family members in other countries"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Life Situation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Self-description before current issues</label>
                <Textarea
                  value={intakeData.selfDescription}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, selfDescription: e.target.value }))}
                  placeholder="How patient describes themselves before current problems"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Major life events or turning points</label>
                <Textarea
                  value={intakeData.majorLifeEvents}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, majorLifeEvents: e.target.value }))}
                  placeholder="Significant life events, transitions, milestones"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Impact of health problems on life</label>
                <Textarea
                  value={intakeData.healthImpact}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, healthImpact: e.target.value }))}
                  placeholder="How mental/physical health affects daily functioning"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social activities, hobbies</label>
                  <Textarea
                    value={intakeData.socialActivities}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, socialActivities: e.target.value }))}
                    placeholder="Current interests and social engagement"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work-life balance</label>
                  <Textarea
                    value={intakeData.workLifeBalance}
                    onChange={(e) => setIntakeData(prev => ({ ...prev, workLifeBalance: e.target.value }))}
                    placeholder="How patient manages work and personal life"
                    rows={2}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recent changes in lifestyle or stressors</label>
                <Textarea
                  value={intakeData.recentChanges}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, recentChanges: e.target.value }))}
                  placeholder="Recent life changes, new stressors, transitions"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-orange-600" />
                <span>Occupational History / Education</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Educational background (degree, year, place)</label>
                <Textarea
                  value={intakeData.educationalBackground}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, educationalBackground: e.target.value }))}
                  placeholder="Educational history, degrees, institutions"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employment history (key jobs, achievements)</label>
                <Textarea
                  value={intakeData.employmentHistory}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, employmentHistory: e.target.value }))}
                  placeholder="Work history, career progression, achievements"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current job, role, satisfaction</label>
                <Textarea
                  value={intakeData.currentJob}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, currentJob: e.target.value }))}
                  placeholder="Current employment situation and satisfaction"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recent changes in work (promotion, relocation, leave)</label>
                <Textarea
                  value={intakeData.recentWorkChanges}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, recentWorkChanges: e.target.value }))}
                  placeholder="Recent work-related changes or transitions"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span>Medical History (Anamnesis)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Past psychiatric history (diagnoses, treatments, hospitalizations)</label>
                <Textarea
                  value={intakeData.pastPsychiatricHistory}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, pastPsychiatricHistory: e.target.value }))}
                  placeholder="Previous mental health diagnoses, treatments, hospitalizations"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical history (important illnesses, surgeries, accidents)</label>
                <Textarea
                  value={intakeData.medicalHistory}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                  placeholder="Significant medical history, surgeries, accidents"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current mental health symptoms (onset, duration, severity)</label>
                <Textarea
                  value={intakeData.currentSymptoms}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, currentSymptoms: e.target.value }))}
                  placeholder="Current symptoms, when they started, severity level"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Triggers or stressors</label>
                <Textarea
                  value={intakeData.triggersStressors}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, triggersStressors: e.target.value }))}
                  placeholder="Known triggers, stressors, precipitating factors"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prior medications, therapies (effectiveness)</label>
                <Textarea
                  value={intakeData.priorMedications}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, priorMedications: e.target.value }))}
                  placeholder="Previous medications, therapies, and their effectiveness"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Family Medical History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family history (depression, anxiety, bipolar, psychosis, substance use)</label>
                <Textarea
                  value={intakeData.familyMentalHealth}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, familyMentalHealth: e.target.value }))}
                  placeholder="Mental health history in family members"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Physical health issues in close family</label>
                <Textarea
                  value={intakeData.familyPhysicalHealth}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, familyPhysicalHealth: e.target.value }))}
                  placeholder="Significant physical health conditions in family"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship dynamics in the family</label>
                <Textarea
                  value={intakeData.familyRelationshipDynamics}
                  onChange={(e) => setIntakeData(prev => ({ ...prev, familyRelationshipDynamics: e.target.value }))}
                  placeholder="Family relationships, communication patterns, conflicts"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveIntake} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Intake Documentation
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="session" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Session Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Input
                    type="date"
                    value={sessionNote.date}
                    onChange={(e) => setSessionNote(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                  <select
                    value={sessionNote.sessionType}
                    onChange={(e) => setSessionNote(prev => ({ ...prev, sessionType: e.target.value as any }))}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    <option value="Initial Intake">Initial Intake</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Crisis">Crisis</option>
                    <option value="Assessment">Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <Input
                    value={sessionNote.duration}
                    onChange={(e) => setSessionNote(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 50 minutes"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Clinical Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Presenting Concerns</label>
                <Textarea
                  value={sessionNote.presentingConcerns}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, presentingConcerns: e.target.value }))}
                  placeholder="Main issues discussed in this session"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mental Status Examination</label>
                <Textarea
                  value={sessionNote.mentalStatusExam}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, mentalStatusExam: e.target.value }))}
                  placeholder="Appearance, mood, affect, thought process, cognition, insight, judgment"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Assessment</label>
                <Textarea
                  value={sessionNote.riskAssessment}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, riskAssessment: e.target.value }))}
                  placeholder="Suicide risk, self-harm, safety concerns, protective factors"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Treatment & Interventions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interventions Used</label>
                <Textarea
                  value={sessionNote.interventions}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, interventions: e.target.value }))}
                  placeholder="Therapeutic techniques, interventions, approaches used"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Homework/Assignments</label>
                <Textarea
                  value={sessionNote.homework}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, homework: e.target.value }))}
                  placeholder="Tasks, exercises, or assignments given to patient"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan Updates</label>
                <Textarea
                  value={sessionNote.treatmentPlan}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, treatmentPlan: e.target.value }))}
                  placeholder="Changes to treatment goals, plan modifications"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>Session Conclusion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment</label>
                <Textarea
                  value={sessionNote.nextAppointment}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, nextAppointment: e.target.value }))}
                  placeholder="Next appointment date, frequency, special considerations"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Therapist Notes</label>
                <Textarea
                  value={sessionNote.therapistNotes}
                  onChange={(e) => setSessionNote(prev => ({ ...prev, therapistNotes: e.target.value }))}
                  placeholder="Additional observations, clinical impressions, supervision notes"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSession} className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Session Documentation
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}