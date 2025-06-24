import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface SupportAnalysis {
  level: 'low' | 'mid' | 'high';
  reasoning: string;
  needsTherapist: boolean;
}

const THERAPIST_SYSTEM_PROMPT = `You are Dr. Sarah, a compassionate and professional AI therapist specializing in mental health support for high-performing professionals, founders, and developers. 

Your approach:
- Be warm, empathetic, and non-judgmental
- Use evidence-based therapeutic techniques (CBT, mindfulness, stress management)
- Understand the unique pressures of startup life, coding, and high-achievement careers
- Provide practical, actionable advice
- Recognize signs of burnout, anxiety, and work-related stress
- Encourage professional help when needed
- Keep responses concise but meaningful (2-4 sentences typically)
- Use a supportive, professional tone

Remember: You're here to provide immediate support and guidance, but always encourage users to seek professional help for serious mental health concerns.`;

const ANALYSIS_SYSTEM_PROMPT = `You are a mental health assessment AI. Analyze the user's message and determine their support level needed:

LOW: General stress, minor work concerns, seeking advice, feeling motivated but tired
MID: Moderate anxiety, work-life balance issues, persistent stress, mild depression symptoms, relationship conflicts, moderate burnout signs
HIGH: Severe anxiety/depression, suicidal thoughts, panic attacks, severe burnout, substance abuse mentions, trauma, crisis situations

Respond with ONLY a JSON object in this exact format:
{
  "level": "low|mid|high",
  "reasoning": "Brief explanation of why this level was chosen",
  "needsTherapist": true/false
}

Set needsTherapist to true for mid and high levels.`;

export async function sendMessageToTherapist(messages: ChatMessage[]): Promise<string> {
  try {
    const formattedMessages = [
      { role: 'system' as const, content: THERAPIST_SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I\'m having trouble responding right now. Please try again.';
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return 'I\'m experiencing technical difficulties. Please try again in a moment, or feel free to reach out to our support team.';
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

    // Parse the JSON response
    const analysis = JSON.parse(response.trim());
    
    // Validate the response structure
    if (!analysis.level || !analysis.reasoning || typeof analysis.needsTherapist !== 'boolean') {
      throw new Error('Invalid analysis response structure');
    }

    return analysis;
  } catch (error) {
    console.error('Error analyzing support level:', error);
    // Default to low level if analysis fails
    return {
      level: 'low',
      reasoning: 'Unable to analyze - defaulting to low support level',
      needsTherapist: false
    };
  }
}