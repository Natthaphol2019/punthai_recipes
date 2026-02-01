// src/Game.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { 
  ArrowLeft, Coffee, Trash2, Check, X, Loader2, Sparkles, 
  History, RotateCcw, ArrowRight, Save, Trophy, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper: แยกหมวดหมู่วัตถุดิบ ---
const getIngredientCategory = (name) => {
  const n = name.toLowerCase();
  if (n.includes('espresso') || n.includes('กาแฟ')) return 'Coffee ☕️';
  if (n.includes('นม') || n.includes('milk') || n.includes('mbs') || n.includes('ครีม') || n.includes('ฟอง')) return 'Milk 🥛';
  if (n.includes('น้ำเชื่อม') || n.includes('ไซรัป') || n.includes('ซอส') || n.includes('น้ำผึ้ง') || n.includes('น้ำตาล')) return 'Syrup 🍯';
  if (n.includes('ผง') || n.includes('matcha') || n.includes('cocoa')) return 'Powder 🍵';
  if (n.includes('โซดา') || n.includes('น้ำ') || n.includes('น้ำแข็ง') || n.includes('ชา')) return 'Base/Tea 🧊';
  return 'Topping 🍒';
};

export default function Game() {
  const navigate = useNavigate();

  // --- Data States ---
  const [dbRecipes, setDbRecipes] = useState([]);
  const [dbIngredients, setDbIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Game Session States ---
  const [gameMode, setGameMode] = useState('setup'); // setup, playing, summary
  const [totalQuestions, setTotalQuestions] = useState(5); // จำนวนข้อที่จะสอบ
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreLog, setScoreLog] = useState([]); // เก็บประวัติถูก/ผิดแต่ละข้อ

  // --- Gameplay States ---
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null); // null, 'correct', 'wrong'
  const [activeCategory, setActiveCategory] = useState('All');

  // Categories
  const categories = ['All', 'Coffee ☕️', 'Milk 🥛', 'Syrup 🍯', 'Powder 🍵', 'Base/Tea 🧊', 'Topping 🍒'];

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('recipes').select('*');
      if (!error && data) {
        setDbRecipes(data);
        const allIngs = Array.from(new Set(data.flatMap(r => r.ingredients))).sort();
        setDbIngredients(allIngs);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // 2. Start Game Logic
  const startGame = (amount) => {
    setTotalQuestions(amount);
    setScoreLog([]); // รีเซ็ตคะแนน
    setCurrentQuestionIndex(0);
    setGameMode('playing');
    randomRecipe();
  };

  // 3. Random Recipe
  const randomRecipe = () => {
    // สุ่มโจทย์ใหม่
    const random = dbRecipes[Math.floor(Math.random() * dbRecipes.length)];
    setCurrentOrder(random);
    setSelected([]);
    setFeedback(null);
    setActiveCategory('All');
  };

  // 4. Check Answer Logic
  const checkAnswer = () => {
    const required = [...currentOrder.ingredients].sort();
    const userSelected = [...selected].sort();
    const isCorrect = JSON.stringify(required) === JSON.stringify(userSelected);

    setFeedback(isCorrect ? 'correct' : 'wrong');
  };

  // 5. Handle Next / Retry
  const handleNextQuestion = (result) => {
    // บันทึกผลของข้อปัจจุบัน
    const newLog = [...scoreLog, { 
      question: currentOrder.name, 
      result: result, // 'correct' or 'wrong'
      timestamp: new Date()
    }];
    setScoreLog(newLog);

    // เช็คว่าครบจำนวนข้อยัง
    if (currentQuestionIndex + 1 >= totalQuestions) {
      setGameMode('summary'); // จบเกม ไปหน้าสรุป
      saveSessionToDB(newLog); // บันทึกลง DB
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      randomRecipe(); // ไปข้อต่อไป
    }
  };

  const handleRetry = () => {
    // ล้างสถานะเพื่อทำข้อเดิมใหม่
    setSelected([]);
    setFeedback(null);
  };

  // 6. Save to DB
  const saveSessionToDB = async (finalLog) => {
    const correctCount = finalLog.filter(l => l.result === 'correct').length;
    // สมมติว่ามีตาราง game_history (ถ้าไม่มีก็ไม่ error แค่ไม่บันทึก)
    await supabase.from('scores').insert([{ 
      player_name: 'Barista Trainee', 
      score: correctCount,
      details: `เล่น ${totalQuestions} ข้อ ถูก ${correctCount} ข้อ`
    }]);
  };

  // --- Filter Logic ---
  const filteredIngredients = useMemo(() => {
    if (activeCategory === 'All') return dbIngredients;
    return dbIngredients.filter(ing => getIngredientCategory(ing) === activeCategory);
  }, [activeCategory, dbIngredients]);

  // ================= RENDER SECTIONS =================

  // Loading Screen
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  // 1. SETUP SCREEN (หน้าเลือกจำนวนข้อ)
  if (gameMode === 'setup') {
    return (
      <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-6 text-white text-center">
        <Coffee size={80} className="mb-4 text-green-200" />
        <h1 className="text-3xl font-bold mb-2">Barista Challenge</h1>
        <p className="text-green-100 mb-8 opacity-80">พร้อมสอบวัดระดับความจำหรือยัง?</p>
        
        <div className="w-full max-w-xs space-y-3">
          <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">เลือกจำนวนข้อสอบ</p>
          {[5, 10, 20].map(num => (
            <button 
              key={num}
              onClick={() => startGame(num)}
              className="w-full bg-white text-green-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition flex justify-between px-6 items-center"
            >
              <span>📝 สอบ {num} ข้อ</span>
              <ArrowRight size={20} className="opacity-50" />
            </button>
          ))}
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-8 py-3 text-green-200 hover:text-white underline text-sm"
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  // 2. SUMMARY SCREEN (หน้าสรุปผลเมื่อจบเกม)
  if (gameMode === 'summary') {
    const correctCount = scoreLog.filter(l => l.result === 'correct').length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center mb-6 mt-10">
          <div className="inline-block p-4 rounded-full bg-yellow-100 mb-4">
            <Trophy size={48} className="text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">จบการทดสอบ!</h2>
          <div className="text-6xl font-black text-green-600 my-4">{scorePercent}%</div>
          <p className="text-gray-500">คุณทำได้ {correctCount} จาก {totalQuestions} ข้อ</p>
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-500 uppercase">ประวัติการตอบ</div>
          {scoreLog.map((log, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border-b last:border-0">
              <span className="font-medium text-gray-700 text-sm truncate w-2/3">{idx+1}. {log.question}</span>
              {log.result === 'correct' 
                ? <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">ถูกต้อง</span>
                : <span className="text-red-500 font-bold text-xs bg-red-100 px-2 py-1 rounded">ผิดพลาด</span>
              }
            </div>
          ))}
        </div>

        <button 
          onClick={() => setGameMode('setup')}
          className="w-full max-w-md bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
        >
          <RotateCcw /> สอบใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // 3. PLAYING SCREEN (หน้าเล่นเกม)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans">
      
      {/* Header */}
      <div className="bg-white px-4 py-3 shadow-sm z-20 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2">
           <div className="font-bold text-gray-700 text-lg">ข้อที่ {currentQuestionIndex + 1} <span className="text-gray-300">/ {totalQuestions}</span></div>
        </div>
        <button onClick={() => setGameMode('setup')} className="text-xs text-red-500 bg-red-50 px-3 py-1 rounded-full">เลิกทำ</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-44">
        
        {/* Order Ticket */}
        <div className="mx-4 mt-4 py-6 bg-green-700 rounded-2xl shadow-lg text-white relative overflow-hidden text-center">
          <p className="text-green-200 text-xs mb-1 font-bold uppercase tracking-widest">MENU ORDER</p>
          <h1 className="text-2xl font-bold leading-tight">{currentOrder.name}</h1>
          <div className="mt-2 inline-block bg-black/20 px-3 py-1 rounded-full text-xs">{currentOrder.category}</div>
        </div>

        {/* Selected Ingredients */}
        <div className="px-4 mt-4">
          <div className="flex justify-between items-end mb-2 px-1">
            <h3 className="text-gray-500 text-xs font-bold uppercase">ส่วนผสมที่เลือก ({selected.length})</h3>
            {selected.length > 0 && !feedback && (
              <button onClick={() => setSelected([])} className="text-xs text-red-500 flex items-center gap-1 font-bold">
                <Trash2 size={12} /> ล้าง
              </button>
            )}
          </div>
          <div className="bg-white rounded-xl p-3 min-h-[80px] shadow-sm border border-gray-200 flex flex-wrap gap-2">
            <AnimatePresence>
              {selected.map((item, idx) => (
                <motion.button
                  key={`${item}-${idx}`}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  onClick={() => toggleIngredient(item)}
                  disabled={!!feedback}
                  className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 flex items-center gap-1"
                >
                  {item}
                </motion.button>
              ))}
            </AnimatePresence>
            {selected.length === 0 && <div className="text-gray-300 text-xs italic m-auto">เลือกส่วนผสมด้านล่าง...</div>}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="sticky top-[50px] z-10 bg-gray-50/95 backdrop-blur py-2 mt-2">
          <div className="flex overflow-x-auto px-4 gap-2 no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border ${activeCategory === cat ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="px-4 grid grid-cols-2 gap-2 pb-4">
          {filteredIngredients.map((ing) => {
            const isSelected = selected.includes(ing);
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={ing}
                onClick={() => {
                   if (!feedback) {
                     if (selected.includes(ing)) setSelected(selected.filter(i => i !== ing));
                     else setSelected([...selected, ing]);
                   }
                }}
                disabled={!!feedback}
                className={`p-3 rounded-xl text-xs font-bold text-left transition-all border shadow-sm ${isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 hover:border-blue-300'}`}
              >
                {ing}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* --- Action Bar & Feedback Modal --- */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-gray-100 safe-area-bottom z-30">
        {!feedback ? (
          <button
            onClick={checkAnswer}
            disabled={selected.length === 0}
            className={`w-full py-3.5 rounded-xl font-bold text-base shadow-lg transition-all flex justify-center items-center gap-2 ${selected.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-green-600 text-white'}`}
          >
            ส่งคำตอบ <Coffee size={18} />
          </button>
        ) : (
          // --- SMART FEEDBACK MODAL ---
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 -m-4 p-6">
            <div className={`text-center mb-4 font-bold text-xl flex justify-center items-center gap-2 ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
               {feedback === 'correct' ? <><CheckCircleIcon /> ถูกต้อง!</> : <><XCircleIcon /> ยังไม่ถูกนะ!</>}
            </div>

            {/* List เปรียบเทียบที่ดูง่าย */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-2 max-h-48 overflow-y-auto">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">ตรวจสอบส่วนผสม:</p>
              
              {/* 1. ส่วนที่ถูก (User ใส่ & Recipe มี) */}
              {currentOrder.ingredients.filter(i => selected.includes(i)).map(i => (
                 <div key={i} className="flex gap-2 items-center text-green-700 font-medium">
                   <Check size={16} /> {i}
                 </div>
              ))}

              {/* 2. ส่วนที่ขาด (Recipe มี & User ไม่ใส่) */}
              {currentOrder.ingredients.filter(i => !selected.includes(i)).map(i => (
                 <div key={i} className="flex gap-2 items-center text-red-500 font-medium">
                   <AlertCircle size={16} /> ลืมใส่: {i}
                 </div>
              ))}

              {/* 3. ส่วนที่เกิน (User ใส่ & Recipe ไม่มี) */}
              {selected.filter(i => !currentOrder.ingredients.includes(i)).map(i => (
                 <div key={i} className="flex gap-2 items-center text-orange-500 font-medium line-through decoration-orange-500">
                   <X size={16} /> เกินมา: {i}
                 </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleRetry}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 flex justify-center gap-2 items-center"
              >
                <RotateCcw size={18} /> แก้ตัว
              </button>
              <button 
                onClick={() => handleNextQuestion(feedback)}
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg flex justify-center gap-2 items-center ${feedback === 'correct' ? 'bg-green-600' : 'bg-blue-600'}`}
              >
                {currentQuestionIndex + 1 >= totalQuestions ? 'ดูผลสอบ 🏆' : 'ข้อต่อไป ➔'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Icon Components for Clean Code
const CheckCircleIcon = () => <div className="bg-green-100 p-1 rounded-full"><Check size={24} /></div>;
const XCircleIcon = () => <div className="bg-red-100 p-1 rounded-full"><X size={24} /></div>;