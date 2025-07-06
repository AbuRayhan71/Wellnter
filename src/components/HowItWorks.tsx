import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Brain, Target, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Academic Assessment',
    description: 'Complete a comprehensive assessment designed for students and researchers. We evaluate academic stress levels, study-life balance, and education-specific mental health factors.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    number: '02',
    icon: Brain,
    title: 'Academic Stress Analysis',
    description: 'Our AI continuously monitors your mental health patterns, study stress, research pressure, and academic performance metrics to provide insights tailored to student life.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    number: '03',
    icon: Target,
    title: 'Academic-Focused Support',
    description: 'Receive targeted coaching and access to mental health experts who understand the unique pressures of student life, research deadlines, and academic environments.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

const benefits = [
  'Reduce academic burnout by 70%',
  'Improve study-life balance',
  'Increase focus and retention',
  'Build academic resilience'
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Your Academic Wellness Journey
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            A streamlined approach to mental health designed specifically for students and researchers. 
            Get started in minutes and maintain your wellbeing while pursuing academic excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line - Hidden on mobile */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 z-0" style={{ width: 'calc(100% - 2rem)' }}></div>
              )}
              
              <Card className="relative z-10 bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto ${step.bgColor} rounded-full flex items-center justify-center shadow-sm`}>
                      <step.icon className={`w-6 sm:w-8 h-6 sm:h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 sm:w-8 h-6 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Benefits Section - Mobile optimized */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Proven Results for Students & Researchers
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Join students and researchers who have transformed their academic wellbeing and performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-sm sm:text-base">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}