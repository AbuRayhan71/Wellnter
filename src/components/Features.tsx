import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Heart, Activity, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Stress & Burnout Prevention',
    description: 'AI monitoring specifically designed for high-stress careers. Track work patterns, stress levels, and mental fatigue before burnout occurs.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Heart,
    title: 'Executive Coaching',
    description: 'Personalized mental health support tailored for founders and professionals. Build resilience while scaling your career or business.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Activity,
    title: 'Performance Optimization',
    description: 'Integrate fitness and wellness into your busy schedule. Optimize energy levels, focus, and productivity through targeted coaching.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Users,
    title: 'Professional Network',
    description: 'Connect with mental health professionals who understand the unique challenges of founders, developers, and high-achieving professionals.',
    color: 'from-purple-500 to-purple-600'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Built for High Performers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform understands the unique mental health challenges faced by founders, 
            developers, and professionals in high-pressure environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
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