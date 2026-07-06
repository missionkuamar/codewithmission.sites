// components/WhatPeopleSay.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Star, Quote } from 'lucide-react';

const WhatPeopleSay = () => {
  const { currentTheme, currentMood } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO, TechCorp',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      description: 'Absolutely outstanding work! The attention to detail and creativity exceeded our expectations. Delivered the project ahead of schedule.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager, InnovateLabs',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      description: 'One of the best developers I have worked with. The code quality is exceptional and communication was seamless throughout.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Founder, StartupHub',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      description: 'Transformed our idea into a stunning web application. The UI/UX design is beautiful and very intuitive for our users.',
    },
    {
      id: 4,
      name: 'David Kim',
      position: 'CTO, FutureTech',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 5,
      description: 'Technical expertise is top-notch. Solved complex problems with elegant solutions. Highly recommended!',
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What People{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="text-xl opacity-75 max-w-2xl mx-auto">
            Hear from my clients and colleagues about their experience working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`${currentTheme.card} ${currentMood} p-6 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl relative group`}
            >
              <Quote className="absolute top-4 right-4 opacity-10 w-12 h-12" />
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm opacity-75">{testimonial.position}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="opacity-90 leading-relaxed">"{testimonial.description}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatPeopleSay;