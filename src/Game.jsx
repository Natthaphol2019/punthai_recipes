// src/Game.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { 
  ArrowLeft, Coffee, Trash2, Check, X, Loader2, Sparkles, 
  RotateCcw, ArrowRight, Trophy, AlertCircle, Timer, Star 
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
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoreLog, setScoreLog] = useState([]);

  // --- Gameplay States ---
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selected, setSelected] = useState([]);
  const [feedback, setFeedback] = useState(null);
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
    setScoreLog([]);
    setCurrentQuestionIndex(0);
    setGameMode('playing');
    randomRecipe();
  };

  // 3. Random Recipe
  const randomRecipe = () => {
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
    const newLog = [...scoreLog, { 
      question: currentOrder.name, 
      result: result, 
      timestamp: new Date()
    }];
    setScoreLog(newLog);

    if (currentQuestionIndex + 1 >= totalQuestions) {
      setGameMode('summary');
      saveSessionToDB(newLog);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      randomRecipe();
    }
  };

  const handleRetry = () => {
    setSelected([]);
    setFeedback(null);
  };

  // 6. Save to DB
  const saveSessionToDB = async (finalLog) => {
    const correctCount = finalLog.filter(l => l.result === 'correct').length;
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

  if (loading) return (
    <div className="h-screen bg-green-900 flex items-center justify-center text-white">
        <Loader2 className="animate-spin mr-2" /> กำลังโหลดสูตร...
    </div>
  );

  // ----------------------------------------------------
  // 1. SETUP SCREEN (Theme: Dark Gradient Premium)
  // ----------------------------------------------------
  if (gameMode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden font-sans">
        
        {/* Background Decos */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-10"></div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="z-10 w-full max-w-sm"
        >
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full inline-block mb-6 shadow-2xl border border-white/10">
                <Coffee size={48} className="text-yellow-400" />
            </div>
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Challenge Mode</h1>
            <p className="text-green-200 mb-10 text-sm">เลือกจำนวนข้อสอบ เพื่อวัดระดับความแม่นยำ</p>
            
            <div className="space-y-4">
            {[5, 10, 20].map((num, idx) => (
                <motion.button 
                    key={num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => startGame(num)}
                    className="group w-full relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all duration-300"
                >
                    <div className="p-5 flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/20 p-2 rounded-lg text-green-300 font-bold text-xl w-12 h-12 flex items-center justify-center">
                                {num}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white">ข้อสอบ {num} ข้อ</div>
                                <div className="text-xs text-green-300/60">Practice Session</div>
                            </div>
                        </div>
                        <ArrowRight size={20} className="text-white/50 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </motion.button>
            ))}
            </div>

            <button 
                onClick={() => navigate('/')}
                className="mt-8 text-green-300/50 hover:text-white text-sm flex items-center justify-center gap-2 transition-colors"
            >
                <ArrowLeft size={14} /> กลับหน้าหลัก
            </button>
        </motion.div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. SUMMARY SCREEN (Theme: Light Clean with Confetti vibe)
  // ----------------------------------------------------
  if (gameMode === 'summary') {
    const correctCount = scoreLog.filter(l => l.result === 'correct').length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md text-center mb-6 mt-10 border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative BG in Card */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-yellow-400"></div>

          <div className="inline-block p-5 rounded-full bg-yellow-50 mb-4 shadow-inner">
            <Trophy size={64} className="text-yellow-500 drop-shadow-sm" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">Session Complete!</h2>
          <p className="text-gray-400 text-sm">ผลการทดสอบของคุณ</p>
          
          <div className="my-6">
             <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-green-400">
                {scorePercent}%
             </span>
          </div>
          
          <div className="flex justify-center gap-4 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl">
             <div className="flex items-center gap-1 text-green-600"><Check size={16}/> ถูก {correctCount}</div>
             <div className="w-px bg-gray-300"></div>
             <div className="flex items-center gap-1 text-gray-400"><Timer size={16}/> รวม {totalQuestions} ข้อ</div>
          </div>
        </motion.div>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm overflow-hidden mb-6 border border-gray-100">
          <div className="bg-gray-50 px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <History size={14} /> Score Log
          </div>
          <div className="max-h-60 overflow-y-auto">
            {scoreLog.map((log, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                <div className="flex items-center gap-3 w-2/3">
                    <span className="text-gray-300 text-xs font-mono">{String(idx+1).padStart(2,'0')}</span>
                    <span className="font-semibold text-gray-700 text-sm truncate">{log.question}</span>
                </div>
                {log.result === 'correct' 
                    ? <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-md"><Check size={12}/> PASS</div>
                    : <div className="flex items-center gap-1 text-red-500 text-xs font-bold bg-red-50 px-2 py-1 rounded-md"><X size={12}/> FAIL</div>
                }
                </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setGameMode('setup')}
          className="w-full max-w-md bg-green-800 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 hover:bg-green-900 transition-transform active:scale-95"
        >
          <RotateCcw /> สอบใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. PLAYING SCREEN (Theme: Clean focus Mode)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden font-sans">
      
      {/* Header & Progress Bar */}
      <div className="bg-white pt-4 pb-2 px-4 shadow-sm z-20 sticky top-0">
         <div className="flex justify-between items-center mb-3">
             <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">QUESTION</span>
                 <span className="text-xl font-black text-gray-800">
                    {String(currentQuestionIndex + 1).padStart(2, '0')} 
                    <span className="text-gray-300 text-base font-medium">/{totalQuestions}</span>
                 </span>
             </div>
             <button onClick={() => setGameMode('setup')} className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-full font-bold hover:bg-red-100 transition">
                QUIT
             </button>
         </div>
         {/* Progress Bar */}
         <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
             ></motion.div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-44">
        
        {/* Order Ticket */}
        <div className="mx-4 mt-4 relative">
             <div className="absolute inset-0 bg-green-800 rounded-2xl rotate-1 opacity-20 translate-y-2"></div>
             <div className="relative bg-gradient-to-br from-green-700 to-emerald-800 p-6 rounded-2xl shadow-xl text-white text-center overflow-hidden">
                {/* Texture */}
                <div className="absolute top-0 right-0 p-10 bg-white opacity-5 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                
                <p className="text-green-200 text-[10px] mb-2 font-bold uppercase tracking-[0.2em]">Incoming Order</p>
                <h1 className="text-2xl font-extrabold leading-tight drop-shadow-md mb-3">{currentOrder.name}</h1>
                <div className="inline-flex items-center gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                    <Coffee size={12} /> {currentOrder.category}
                </div>
             </div>
        </div>

        {/* Selected Ingredients Area */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-end mb-2 px-1">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Selected Items ({selected.length})</h3>
            {selected.length > 0 && !feedback && (
              <button onClick={() => setSelected([])} className="text-xs text-red-500 flex items-center gap-1 font-bold bg-red-50 px-2 py-1 rounded hover:bg-red-100 transition">
                <Trash2 size={12} /> CLEAR
              </button>
            )}
          </div>
          <div className="bg-white rounded-2xl p-4 min-h-[100px] shadow-sm border border-gray-200 flex flex-wrap gap-2 content-start transition-all">
            <AnimatePresence>
              {selected.map((item, idx) => (
                <motion.button
                  key={`${item}-${idx}`}
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                  onClick={() => toggleIngredient(item)}
                  disabled={!!feedback}
                  className="bg-blue-50 text-blue-700 pl-3 pr-2 py-1.5 rounded-lg text-xs font-bold border border-blue-100 flex items-center gap-1 hover:bg-blue-100 transition"
                >
                  {item} <X size={12} className="opacity-40 hover:opacity-100" />
                </motion.button>
              ))}
            </AnimatePresence>
            {selected.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 py-4 gap-2">
                    <div className="p-2 bg-gray-50 rounded-full"><Sparkles size={16} /></div>
                    <span className="text-xs italic">เลือกส่วนผสมด้านล่างเพื่อเริ่มปรุง...</span>
                </div>
            )}
          </div>
        </div>

        {/* Categories Filter Pills */}
        <div className="sticky top-[76px] z-10 bg-gray-50/95 backdrop-blur py-3 mt-4 border-b border-gray-100/50">
          <div className="flex overflow-x-auto px-4 gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                    whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm border
                    ${activeCategory === cat 
                        ? 'bg-gray-800 text-white border-gray-800 scale-105 shadow-md' 
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients Grid */}
        <div className="px-4 grid grid-cols-2 gap-2 pb-6 pt-2">
          {filteredIngredients.map((ing) => {
            const isSelected = selected.includes(ing);
            return (
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                key={ing}
                onClick={() => {
                   if (!feedback) {
                     if (selected.includes(ing)) setSelected(selected.filter(i => i !== ing));
                     else setSelected([...selected, ing]);
                   }
                }}
                disabled={!!feedback}
                className={`
                    p-3 rounded-xl text-xs font-bold text-left transition-all border shadow-sm relative overflow-hidden
                    ${isSelected 
                        ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'}
                `}
              >
                <span className="relative z-10">{ing}</span>
                {isSelected && <motion.div layoutId="highlight" className="absolute inset-0 bg-white/10" />}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* --- Action Bar & Feedback Modal --- */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 safe-area-bottom z-30">
        {!feedback ? (
          <button
            onClick={checkAnswer}
            disabled={selected.length === 0}
            className={`
                w-full py-4 rounded-2xl font-bold text-base shadow-lg transition-all flex justify-center items-center gap-2 transform active:scale-95
                ${selected.length === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 text-white shadow-green-200'}
            `}
          >
            CONFIRM ORDER <ArrowRight size={18} />
          </button>
        ) : (
          // --- SMART FEEDBACK MODAL ---
          <motion.div 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-gray-100 -m-4 p-6"
          >
            <div className={`text-center mb-6 font-bold text-xl flex justify-center items-center gap-2 ${feedback === 'correct' ? 'text-green-600' : 'text-red-500'}`}>
               {feedback === 'correct' 
                    ? <><div className="bg-green-100 p-2 rounded-full"><Check size={24} /></div> Order Complete!</> 
                    : <><div className="bg-red-100 p-2 rounded-full"><X size={24} /></div> Order Failed!</>
               }
            </div>

            {/* List เปรียบเทียบ */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-sm space-y-3 max-h-48 overflow-y-auto border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recipe Check</p>
              
              {/* Correct */}
              {currentOrder.ingredients.filter(i => selected.includes(i)).map(i => (
                 <div key={i} className="flex gap-3 items-center text-gray-700 font-medium bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                   <div className="text-green-500"><CheckCircleIcon size={16} /></div> {i}
                 </div>
              ))}

              {/* Missing */}
              {currentOrder.ingredients.filter(i => !selected.includes(i)).map(i => (
                 <div key={i} className="flex gap-3 items-center text-gray-700 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                   <div className="text-red-500"><AlertCircle size={16} /></div> 
                   <span>ลืมใส่: <span className="text-red-600 font-bold">{i}</span></span>
                 </div>
              ))}

              {/* Excess */}
              {selected.filter(i => !currentOrder.ingredients.includes(i)).map(i => (
                 <div key={i} className="flex gap-3 items-center text-gray-400 font-medium bg-gray-100 p-2 rounded-lg decoration-slice">
                   <div className="text-gray-400"><X size={16} /></div> 
                   <span className="line-through">เกินมา: {i}</span>
                 </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleRetry}
                className="flex-1 bg-gray-100 text-gray-600 py-3.5 rounded-2xl font-bold hover:bg-gray-200 flex justify-center gap-2 items-center transition-colors"
              >
                <RotateCcw size={18} /> Retry
              </button>
              <button 
                onClick={() => handleNextQuestion(feedback)}
                className={`flex-1 py-3.5 rounded-2xl font-bold text-white shadow-lg flex justify-center gap-2 items-center transition-transform active:scale-95 ${feedback === 'correct' ? 'bg-green-600' : 'bg-gray-800'}`}
              >
                {currentQuestionIndex + 1 >= totalQuestions ? 'Finish' : 'Next'} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Simple Icons
const CheckCircleIcon = ({size}) => <Check size={size} />;