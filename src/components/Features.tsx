import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Activity, Users, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Built for Students',
    description: 'Designed specifically for academic environments and student life.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Smart monitoring of academic stress and study patterns.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Heart,
    title: 'Burnout Prevention',
    description: 'Early detection and intervention for academic burnout.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Activity,
    title: 'Study Optimization',
    description: 'Evidence-based strategies to improve focus and retention.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Access to therapists who understand student challenges.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data protected with enterprise-grade security.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
];

export function Features() {
  return (
    <section id="features" className="py-12 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            Why Choose Wellnter?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Built for Academic Success
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Mental health support designed specifically for students and researchers navigating academic challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-white"
            >
              <CardHeader className="pb-4">
                <div className={`w-10 sm:w-12 h-10 sm:h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}