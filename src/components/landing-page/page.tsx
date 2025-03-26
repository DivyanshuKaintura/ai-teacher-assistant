'use client';

import React from 'react';
import Image from 'next/image';
import bg_image from '../../../public/bg1.jpg'
// import TeacherAssignmentUpload from '../teacher/upload-assignment-form/page';
import TeacherUploadLandingButton from '../teacher/open-form/page'
import StudentStatusCheck from '../student/verify/page';
import {
  BookOpen,
  Clock,
  Target,
  Brain,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/navbar/page';
import Footer from '@/components/footer/page';
import AssignmentUploadPortal from '@/components/upload-assignment/page';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  };

  const features = [
    {
      icon: <BookOpen className="text-sky-700" size={48} />,
      title: 'Automated Grading',
      description: 'Intelligent, consistent assignment evaluation.',
    },
    {
      icon: <Brain className="text-sky-700" size={48} />,
      title: 'Personalized Insights',
      description: 'Adaptive learning recommendations.',
    },
    {
      icon: <Clock className="text-sky-700" size={48} />,
      title: 'Efficiency Boost',
      description: 'Streamline educational workflows.',
    },
    {
      icon: <Target className="text-sky-700" size={48} />,
      title: 'Precise Assessment',
      description: 'Data-driven educational evaluation.',
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50" >
          <Navbar/ >
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative pt-16"
      >
        {/* Hero Section */}
        <section className="relative text-white overflow-hidden h-[calc(100vh-4rem)] min-h-[600px] flex items-center">
          {/* Darkened Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={bg_image}
              alt="Educational Background"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              className="opacity-80"
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-700/20 to-sky-400/10 z-10"></div>

          <div className="container mx-auto px-6 relative z-20">
            <motion.div
              variants={itemVariants}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
                Transforming Education with AI
              </h1>
              <p className="text-xl mb-10 text-sky-100">
                Intelligent assessment and personalized learning insights
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/signup"
                className="
                  bg-amber-500 text-white 
                  px-8 py-4 rounded-full 
                  text-lg font-semibold 
                  shadow-xl hover:bg-amber-600 
                  transition duration-300
                "
              >
                Discover Our Solution
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* UN SDG 4 Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex justify-center mb-8">
                <Globe className="text-sky-700" size={64} />
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">
                Aligned with UN Sustainable Development Goal 4
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                Our AI Educational Platform Advances Quality Education
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {['Inclusive Learning', 'Equitable Access', 'Quality Education'].map(
                  (title, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="
                        bg-sky-50 p-6 rounded-xl 
                        border border-sky-100 
                        hover:shadow-lg 
                        transition duration-300
                      "
                    >
                      <CheckCircle2 className="text-sky-700 mb-4" size={48} />
                      <h3 className="font-bold text-xl mb-3 text-gray-800">
                        {title}
                      </h3>
                      <p className="text-gray-600">
                        Advanced educational technologies
                      </p>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <TeacherUploadLandingButton />
        <StudentStatusCheck />

        {/* <AssignmentUploadPortal /> */}

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                Key Features
              </h2>
              <p className="text-xl text-gray-600">
                Innovative tools for modern educators
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="
                    bg-white p-8 rounded-xl 
                    shadow-md hover:shadow-xl 
                    transition duration-300 
                    text-center
                    border border-gray-100
                  "
                >
                  <div className="flex justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default LandingPage;