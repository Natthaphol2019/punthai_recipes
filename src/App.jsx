// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // ใช้ Animation
import { Coffee, BrainCircuit, Settings, Upload, Edit3, Sparkles } from 'lucide-react';

// Import Pages
import Game from './Game';
import Quiz from './Quiz';
import Admin from './Admin';
import AdminEdit from './AdminEdit';

function Home() {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden font-sans">
      
      {/* Background Decoration (Floating Circles) */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-10"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-md flex flex-col items-center"
      >
        {/* Logo / Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-full inline-block mb-4 shadow-2xl border border-white/10">
            <Coffee size={48} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-2 drop-shadow-md">
            Punthai <span className="text-yellow-400">Recipes</span>
          </h1>
          <p className="text-green-200 text-sm tracking-widest uppercase font-medium">
            Barista Training Simulator
          </p>
        </motion.div>
        
        {/* Menu Buttons */}
        <div className="w-full space-y-4 mb-12">
          
          {/* Button 1: Simulator */}
          <motion.div variants={itemVariants}>
            <Link to="/game" className="group relative block w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-[1.02] shadow-xl">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <Coffee size={32} className="text-green-300" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Barista Training</h3>
                  <p className="text-xs text-green-200">จำส่วนผสม ฝึกชงตามออเดอร์</p>
                </div>
                <Sparkles className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>

          {/* Button 2: Quiz */}
          <motion.div variants={itemVariants}>
            <Link to="/quiz" className="group relative block w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/20 transition-all duration-300 transform group-hover:scale-[1.02] shadow-xl">
                <div className="bg-yellow-500/20 p-3 rounded-xl">
                  <BrainCircuit size={32} className="text-yellow-300" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">Menu Challenge</h3>
                  <p className="text-xs text-yellow-200">ทายชื่อเมนู จากส่วนผสม</p>
                </div>
                <Sparkles className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer Admin Links */}
        <motion.div variants={itemVariants} className="flex gap-6 text-xs text-green-300/40 font-medium">
          <Link to="/admin" className="flex items-center gap-1 hover:text-green-200 transition-colors">
            <Upload size={12} /> Upload Data
          </Link>
          <span className="opacity-20">|</span>
          <Link to="/admin-edit" className="flex items-center gap-1 hover:text-green-200 transition-colors">
            <Settings size={12} /> Manage System
          </Link>
        </motion.div>

      </motion.div>

      {/* Version Tag */}
      <div className="absolute bottom-2 right-4 text-[10px] text-white/10">v2.0.0</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-edit" element={<AdminEdit />} />
      </Routes>
    </BrowserRouter>
  );
}