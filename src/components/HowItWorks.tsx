import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Brain, Target, Activity } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Professional Assessment',
    description: 'Complete a comprehensive assessment designed for high-performers. Evaluate stress levels, work-life balance, and career-specific mental health factors.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI-Powered Monitoring',
    description: 'Our AI continuously tracks your mental health patterns, work stress, and performance metrics to provide insights tailored to your professional lifestyle.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    number: '03',
    icon: Target,
    title: 'Executive Coaching & Support',
    description: 'Receive personalized coaching for founders and professionals, plus access to mental health experts who understand high-pressure careers.',
    color: 'from-green-500 to-green-600'
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Your Professional Wellness Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A streamlined approach to mental health designed for busy professionals. 
            Get started in minutes and maintain your wellbeing while building your career.
          </p>
        </div>

        <div className="relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    {/* Step number */}
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 mx-auto bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{step.number}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits callout */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-8">Designed specifically for the unique challenges of founders, developers, and professionals</p>
          <div className="flex items-center justify-center space-x-12 opacity-60">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-gray-400" />
              <span className="text-lg font-semibold text-gray-400">Burnout Prevention</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-8 h-8 text-gray-400" />
              <span className="text-lg font-semibold text-gray-400">Performance Coaching</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}