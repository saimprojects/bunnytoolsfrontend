// src/components/home/ToolsComparison.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ToolsComparison = () => {
  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out",
      features: [
        { text: "3 Tools Access", included: true },
        { text: "Basic Features", included: true },
        { text: "Email Support", included: false },
        { text: "Advanced Analytics", included: false },
        { text: "Priority Support", included: false },
        { text: "Unlimited Tools", included: false }
      ]
    },
    {
      name: "Pro",
      price: "Rs. 499",
      period: "/month",
      description: "Most popular",
      popular: true,
      features: [
        { text: "50+ Tools Access", included: true },
        { text: "All Features", included: true },
        { text: "Email Support", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Priority Support", included: false },
        { text: "Unlimited Tools", included: false }
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large teams",
      features: [
        { text: "All Tools Unlimited", included: true },
        { text: "All Features", included: true },
        { text: "24/7 Phone Support", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Dedicated Manager", included: true },
        { text: "Custom Integration", included: true }
      ]
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
            <span className="text-sm font-medium text-purple-300">Compare Plans</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your Perfect <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Plan</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/20'
                  : 'bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-purple-500/20 hover:border-purple-500/50'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={!plan.popular ? { y: -10 } : {}}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                
                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                    : 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border border-purple-500/50 hover:from-purple-600/50 hover:to-pink-600/50'
                }`}>
                  Get Started
                </button>
                
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    >
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsComparison;