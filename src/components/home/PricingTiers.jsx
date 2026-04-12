// src/components/home/PricingTiers.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PricingTiers = () => {
  const tiers = [
    { name: "Starter", price: "299", color: "from-blue-500 to-blue-600" },
    { name: "Professional", price: "699", color: "from-purple-500 to-purple-600", featured: true },
    { name: "Enterprise", price: "1999", color: "from-pink-500 to-pink-600" }
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
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-sm font-medium text-purple-300">Simple Pricing</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transparent & Fair <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Pricing</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 ${
                tier.featured
                  ? 'ring-2 ring-purple-500/50 transform md:scale-105'
                  : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`}></div>
              
              <div className="relative p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">Rs. {tier.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;