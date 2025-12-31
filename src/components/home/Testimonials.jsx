// src/components/home/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Ahmed Raza",
      role: "CEO, TechSolutions Inc.",
      content: "DigitalBuddy transformed our digital infrastructure completely. Their products and support are exceptional!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed"
    },
    {
      name: "Sara Khan",
      role: "Marketing Director",
      content: "The digital marketing services helped us increase our online presence by 300% in just 3 months!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
    },
    {
      name: "Ali Hassan",
      role: "Startup Founder",
      content: "Their custom web development solution saved us months of development time. Highly recommended!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali"
    },
    {
      name: "Fatima Ahmed",
      role: "E-commerce Manager",
      content: "The e-commerce platform they built for us is seamless and boosted our sales significantly.",
      rating: 4,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
    },
    {
      name: "Omar Sheikh",
      role: "IT Manager",
      content: "Reliable hardware solutions with excellent after-sales support. Great partnership!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar"
    }
  ];

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-50 border border-yellow-100 mb-6">
            <Star className="w-4 h-4 text-yellow-500 mr-2 fill-current" />
            <span className="text-sm font-medium text-yellow-700">Testimonials</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience.
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Quote className="absolute -top-6 -left-6 w-12 h-12 text-purple-100 -z-10" />
          
          <div 
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            
            <div className="relative">
              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
                "{testimonials[activeIndex].content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  className="h-14 w-14 rounded-full bg-gradient-to-r from-brand-purple to-purple-600 p-1"
                />
                <div className="ml-4">
                  <div className="font-bold text-gray-900 text-lg">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
              <button
                onClick={prevSlide}
                className="h-10 w-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="h-10 w-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-brand-purple hover:text-white hover:border-brand-purple transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-brand-purple' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Small Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 line-clamp-3">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-20 bg-gradient-to-r from-brand-purple to-purple-700 rounded-3xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-purple-200">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-purple-200">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-purple-200">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-200">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;