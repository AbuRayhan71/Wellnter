import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  clinicalData?: ClinicalAssessment;
}

export interface ClinicalAssessment {
  symptomSummary: string;
  clinicalIndicators: string[];
  triageLevel: 'ATS 1' | 'ATS 2' | 'ATS 3' | 'ATS 4' | 'ATS 5';
  triageDescription: string;
  confidence: number;
  followUpQuestions: string[];
  clinicalReasoning: string;
  supportLevel: 'low' | 'mid' | 'high';
}

export interface SupportAnalysis {
  level: 'low' | 'mid' | 'high';
  reasoning: string;
  needsTherapist: boolean;
}

const THERAPIST_SYSTEM_PROMPT = `You are Dr. Sarah, a clinical AI therapist providing structured mental health assessments for high-performing professionals. 

Your responses must ALWAYS follow this exact clinical format:

**Empathetic Response:**
[Provide a warm, supportive response to the user's concerns]

**Symptom Summary:**
[Brief summary of reported symptoms/concerns]

**Clinical Indicators:**
• [List 2-3 key clinical indicators observed]

**AI-Suggested Triage Level:**
[ATS Level] - [Description] ([Time frame])

**AI Confidence:** [Percentage]%

**I'd like to know more:**
• [Follow-up question 1]
• [Follow-up question 2]

**Clinical Reasoning:**
[Brief explanation of assessment rationale]

Triage Levels:
- ATS 1: Immediate (Resuscitation) - Life-threatening, immediate intervention
- ATS 2: Emergency (10 minutes) - Severe symptoms requiring urgent care  
- ATS 3: Urgent (30 minutes) - Moderate symptoms needing prompt attention
- ATS 4: Semi-urgent (60 minutes) - Less urgent but needs professional care
- ATS 5: Non-urgent (120 minutes) - Routine support and monitoring

Focus on mental health conditions like anxiety, depression, burnout, stress, panic disorders, and work-related mental health issues.`;

const ANALYSIS_SYSTEM_PROMPT = `You are a mental health triage AI. Analyze the user's message and determine their support level:

LOW: General stress, minor work concerns, seeking advice, feeling motivated but tired, routine wellness check
MID: Moderate anxiety, persistent stress, mild depression symptoms, work-life balance issues, moderate burnout signs, relationship conflicts
HIGH: Severe anxiety/depression, suicidal ideation, panic attacks, severe burnout, substance abuse, trauma, crisis situations, self-harm thoughts

Respond with ONLY a JSON object:
{
  "level": "low|mid|high",
  "reasoning": "Brief explanation",
  "needsTherapist": true/false
}

Set needsTherapist to true for mid and high levels.`;

const CLINICAL_ANALYSIS_PROMPT = `Analyze this mental health conversation and provide structured clinical data in JSON format:

{
  "symptomSummary": "Brief summary of reported symptoms",
  "clinicalIndicators": ["indicator1", "indicator2", "indicator3"],
  "triageLevel": "ATS 1|ATS 2|ATS 3|ATS 4|ATS 5",
  "triageDescription": "Description with timeframe",
  "confidence": 85,
  "followUpQuestions": ["question1", "question2"],
  "clinicalReasoning": "Brief clinical reasoning",
  "supportLevel": "low|mid|high"
}

Triage Guidelines:
- ATS 1: Suicidal ideation, severe crisis, immediate danger
- ATS 2: Severe anxiety/depression, panic attacks, urgent intervention needed
- ATS 3: Moderate symptoms requiring prompt professional attention
- ATS 4: Mild-moderate symptoms, semi-urgent care
- ATS 5: General wellness, routine support`;

function extractJsonFromResponse(response: string): string {
  // Find the first opening brace and the last closing brace
  const firstBrace = response.indexOf('{');
  const lastBrace = response.lastIndexOf('}');
  
  if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
    throw new Error('No valid JSON object found in response');
  }
  
  return response.substring(firstBrace, lastBrace + 1);
}

export async function sendMessageToTherapist(messages: ChatMessage[]): Promise<{ response: string; clinicalData: ClinicalAssessment }> {
  try {
    const formattedMessages = [
      { role: 'system' as const, content: THERAPIST_SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Get clinical response
    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 800,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I\'m having trouble responding right now. Please try again.';

    // Get clinical analysis
    const clinicalCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: CLINICAL_ANALYSIS_PROMPT },
        { role: 'user', content: `User message: "${messages[messages.length - 1].content}"\n\nAI Response: "${response}"` }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.3,
      max_tokens: 400,
    });

    let clinicalData: ClinicalAssessment;
    try {
      const clinicalResponse = clinicalCompletion.choices[0]?.message?.content;
      if (!clinicalResponse) {
        throw new Error('No clinical response received');
      }
      
      // Extract only the JSON object from the response
      const jsonString = extractJsonFromResponse(clinicalResponse);
      clinicalData = JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing clinical data:', error);
      clinicalData = {
        symptomSummary: "General wellness inquiry",
        clinicalIndicators: ["Seeking support", "Professional consultation"],
        triageLevel: "ATS 5",
        triageDescription: "Non-urgent (120 minutes)",
        confidence: 75,
        followUpQuestions: ["How are you feeling today?", "What specific support do you need?"],
        clinicalReasoning: "Routine mental health support and monitoring recommended.",
        supportLevel: "low"
      };
    }

    return { response, clinicalData };
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return {
      response: 'I\'m experiencing technical difficulties. Please try again in a moment, or feel free to reach out to our support team.',
      clinicalData: {
        symptomSummary: "Technical error occurred",
        clinicalIndicators: ["System unavailable"],
        triageLevel: "ATS 5",
        triageDescription: "Non-urgent (120 minutes)",
        confidence: 0,
        followUpQuestions: ["Please try again", "Contact support if issues persist"],
        clinicalReasoning: "Technical difficulties preventing proper assessment.",
        supportLevel: "low"
      }
    };
  }
}

export async function analyzeSupportLevel(userMessage: string): Promise<SupportAnalysis> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.3,
      max_tokens: 200,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from analysis API');
    }

    // Extract only the JSON object from the response
    const jsonString = extractJsonFromResponse(response.trim());
    const analysis = JSON.parse(jsonString);
    
    if (!analysis.level || !analysis.reasoning || typeof analysis.needsTherapist !== 'boolean') {
      throw new Error('Invalid analysis response structure');
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing support level:', error);
    return {
      level: 'low',
      reasoning: 'Unable to analyze - defaulting to low support level',
      needsTherapist: false
    };
  }
}