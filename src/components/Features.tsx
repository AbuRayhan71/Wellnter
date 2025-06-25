import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Activity, Users, Shield, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Monitoring',
    description: 'Advanced algorithms track stress patterns, work habits, and mental health indicators specifically designed for high-pressure careers.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Heart,
    title: 'Burnout Prevention',
    description: 'Proactive identification of burnout risks with personalized interventions before critical stress levels are reached.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Activity,
    title: 'Performance Optimization',
    description: 'Integrate wellness practices into your workflow to boost productivity, focus, and sustained high performance.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'Access to licensed therapists and coaches who understand the unique challenges of founders and tech professionals.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    description: 'Enterprise-grade security with end-to-end encryption. Your mental health data remains completely private and secure.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Target,
    title: 'Goal-Oriented Coaching',
    description: 'Set and achieve wellness goals that align with your professional objectives and personal growth targets.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-6">
            Why Choose Wellnter
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Built for High Performers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform understands the unique mental health challenges faced by founders, 
            developers, and professionals in high-pressure environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 bg-white"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
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