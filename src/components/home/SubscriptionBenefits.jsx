// src/components/home/SubscriptionBenefits.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Cloud, 
  Users, 
  BarChart, 
  Lock, 
  Zap, 
  Globe, 
  Headphones 
} from 'lucide-react';

const SubscriptionBenefits = () => {
  const benefits = [
    {
      icon: Cloud,
      title: "Cloud-Based Access",
      description: "Access your tools from anywhere, anytime on any device"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite unlimited team members to collaborate seamlessly"
    },
    {
      icon: BarChart,
      title: "Advanced Analytics",
      description: "Track usage, performance metrics, and productivity insights"
    },
    {
      icon: Lock,
      title: "Military-Grade Security",
      description: "Your data is encrypted with industry-leading security protocols"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with 99.8% uptime guarantee"
    },
    {
      icon: Globe,
      title: "Global Support",
      description: "Support in 30+ languages with local specialists"
    },
    {
      icon: Headphones,
      title: "Priority Support",
      description: "Dedicated account manager and 24/7 technical assistance"
    },
    {
      icon: Check,
      title: "Regular Updates",
      description: "Continuous feature improvements and security patches"
    }
  ];

  return (
    <section className="py-24 px-4 lg:px-8 relative">
      <div className="container mx-auto">
        <motion.div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6 backdrop-blur-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Check className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">Subscription Benefits</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Everything Included in Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Subscription</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive features designed to maximize your productivity and success
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-purple-500/20 p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.1)'
              }}
            >
              <motion.div 
                className="h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 10 }}
              >
                <benefit.icon className="w-6 h-6 text-white" />
              </motion.div>
              
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
              
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionBenefits;