// src/Quiz.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { 
  ArrowLeft, CheckCircle, XCircle, Loader2, 
  BrainCircuit, Zap, Flame, Trophy, Clock, PlayCircle, RotateCcw, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz() {
  const navigate = useNavigate();

  // --- Data States ---
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Game Session States ---
  const [gameMode, setGameMode] = useState('setup'); // 'setup' | 'playing' | 'summary'
  const [targetQuestions, setTargetQuestions] = useState(5); // จำนวนข้อที่เลือก
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0); // ข้อปัจจุบัน
  const [historyLog, setHistoryLog] = useState([]); // เก็บประวัติการตอบ

  // --- Gameplay States ---
  const [question, setQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // --- Timer States ---
  const [timeLeft, setTimeLeft] = useState(15);
  const [initialTime, setInitialTime] = useState(15);
  const timerRef = useRef(null);

  // 1. Fetch Data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('recipes').select('*');
      if (!error && data) {
        setRecipes(data);
      }
      setLoading(false);
    };
    fetchData();
    return () => clearInterval(timerRef.current);
  }, []);

  // 2. Timer Logic
  useEffect(() => {
    if (gameMode === 'playing' && question && !isAnswered) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            handleTimeOut();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [question, isAnswered, gameMode]);

  // --- Functions ---

  const startGame = (amount) => {
    setTargetQuestions(amount);
    setScore(0);
    setStreak(0);
    setCurrentQuestionIdx(0);
    setHistoryLog([]);
    setGameMode('playing');
    generateQuestion();
  };

  const generateQuestion = () => {
    if (!recipes || recipes.length < 4) return;

    setSelectedChoice(null);
    setIsAnswered(false);
    
    // Random Time (8-20s)
    const randomSec = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    setInitialTime(randomSec);
    setTimeLeft(randomSec);
    
    // Logic สุ่มโจทย์
    const correct = recipes[Math.floor(Math.random() * recipes.length)];
    let choices = [correct];
    while (choices.length < 4) {
      const random = recipes[Math.floor(Math.random() * recipes.length)];
      if (!choices.find(c => c.id === random.id)) {
        choices.push(random);
      }
    }
    choices.sort(() => Math.random() - 0.5);
    setQuestion({ answer: correct, choices: choices });
  };

  const handleTimeOut = () => {
    clearInterval(timerRef.current);
    setIsAnswered(true);
    setStreak(0);
    recordHistory('timeout');
  };

  const handleAnswer = (choice) => {
    if (isAnswered) return;
    clearInterval(timerRef.current);
    
    setSelectedChoice(choice);
    setIsAnswered(true);

    const isCorrect = choice.id === question.answer.id;
    
    if (isCorrect) {
      // Score Formula: Base(10) + Speed(TimeLeft) + Streak(x2)
      const speedBonus = Math.ceil(timeLeft);
      const streakBonus = streak * 2;
      setScore(prev => prev + 10 + speedBonus + streakBonus);
      setStreak(prev => prev + 1);
      recordHistory('correct');
    } else {
      setStreak(0);
      recordHistory('wrong');
    }
  };

  const recordHistory = (status) => {
    setHistoryLog(prev => [...prev, {
      question: question.answer.name,
      status: status // 'correct' | 'wrong' | 'timeout'
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestionIdx + 1 >= targetQuestions) {
      setGameMode('summary'); // จบเกม
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
      generateQuestion();
    }
  };

  // --- RENDER ---

  if (loading) return (
    <div className="h-screen bg-green-900 flex items-center justify-center text-white">
      <Loader2 className="animate-spin mr-2" /> กำลังเชื่อมต่อ Supabase...
    </div>
  );

  // ================= 1. SETUP SCREEN (เลือกจำนวนข้อ) =================
  if (gameMode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex flex-col items-center justify-center p-6 relative overflow-hidden text-white font-sans">
        
        {/* Background Decor */}
        <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-yellow-500 rounded-full blur-[120px] opacity-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="z-10 w-full max-w-sm text-center"
        >
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-full inline-block mb-6 shadow-2xl border border-white/10">
            <BrainCircuit size={56} className="text-yellow-400" />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Speed Quiz</h1>
          <p className="text-green-200 mb-10 text-sm">ท้าทายความจำ แข่งกับเวลา!</p>
          
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-green-300/50 mb-2">เลือกจำนวนข้อสอบ</p>
            {[5, 10, 20].map((num) => (
              <button 
                key={num}
                onClick={() => startGame(num)}
                className="group w-full bg-white/5 border border-white/10 hover:bg-white/20 hover:border-yellow-400/50 p-4 rounded-xl flex items-center justify-between transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-green-500/20 w-10 h-10 rounded-lg flex items-center justify-center text-green-300 font-bold">
                    {num}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg">{num} ข้อ</div>
                    <div className="text-[10px] text-gray-400">Random Timer</div>
                  </div>
                </div>
                <PlayCircle size={24} className="text-white/20 group-hover:text-yellow-400 transition-colors" />
              </button>
            ))}
          </div>

          <button onClick={() => navigate('/')} className="mt-8 text-green-300/50 hover:text-white text-sm flex items-center justify-center gap-2">
            <ArrowLeft size={14} /> กลับหน้าหลัก
          </button>
        </motion.div>
      </div>
    );
  }

  // ================= 2. SUMMARY SCREEN (สรุปผล) =================
  if (gameMode === 'summary') {
    const correctCount = historyLog.filter(h => h.status === 'correct').length;
    const percent = Math.round((correctCount / targetQuestions) * 100);

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 relative font-sans">
        <div className="w-full max-w-md mt-10 text-center z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-yellow-400"></div>
            
            <div className="inline-block p-4 rounded-full bg-yellow-50 mb-4">
              <Trophy size={48} className="text-yellow-500" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800">Quiz Complete!</h2>
            <div className="text-gray-400 text-xs uppercase font-bold tracking-widest mt-1">Final Score</div>
            
            <div className="text-6xl font-black text-green-600 my-4 tracking-tighter">
              {score}
            </div>
            
            <div className="flex justify-center gap-4 text-sm font-medium text-gray-600 bg-gray-50 p-3 rounded-xl">
               <span className="text-green-600">ถูก {correctCount}</span>
               <span className="text-gray-300">/</span>
               <span>{targetQuestions} ข้อ</span>
            </div>
          </motion.div>

          <div className="mt-6 flex gap-3">
             <button onClick={() => setGameMode('setup')} className="flex-1 bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 hover:bg-green-700 transition">
                <RotateCcw size={18} /> เล่นอีกครั้ง
             </button>
             <button onClick={() => navigate('/')} className="px-6 bg-gray-200 text-gray-600 rounded-xl hover:bg-gray-300">
                <Home size={20} />
             </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= 3. PLAYING SCREEN (เล่นเกม) =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex flex-col relative overflow-hidden font-sans text-white">
      
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-green-500 rounded-full blur-[120px] opacity-20"></div>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center p-4 z-10">
        <div className="flex flex-col">
            <span className="text-[10px] text-green-300/60 font-bold uppercase tracking-wider">QUESTION</span>
            <span className="text-xl font-bold">{currentQuestionIdx + 1} <span className="text-sm text-green-300/40">/ {targetQuestions}</span></span>
        </div>
        
        {/* Score & Streak */}
        <div className="flex gap-3">
             <div className="flex items-center gap-2 bg-black/20 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
                <Trophy size={14} className="text-yellow-400" />
                <span className="font-bold text-sm">{score}</span>
             </div>
             <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 transition-colors ${streak > 2 ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' : 'bg-black/20 text-gray-300'}`}>
                <Flame size={14} className={streak > 2 ? 'animate-pulse text-orange-400' : ''} />
                <span className="font-bold text-sm">x{streak}</span>
             </div>
        </div>
      </div>

      {/* --- TIMER BAR --- */}
      <div className="px-6 pb-2">
        <div className="flex justify-between text-xs text-green-200 mb-1 opacity-70">
            <span className="flex items-center gap-1"><Clock size={10}/> Time Limit</span>
            <span className="font-mono">{Math.ceil(timeLeft)}s</span>
        </div>
        <div className="h-2 bg-white/10 w-full relative rounded-full overflow-hidden">
            <motion.div 
                className={`h-full rounded-full ${timeLeft < 5 ? 'bg-red-500 shadow-[0_0_10px_red]' : 'bg-yellow-400'}`}
                initial={{ width: "100%" }}
                animate={{ width: `${(timeLeft / initialTime) * 100}%` }}
                transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
            />
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 z-10 pb-24">
        
        <AnimatePresence mode='wait'>
          {question && (
            <motion.div 
                key={question.answer.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="w-full max-w-md"
            >
                {/* Question Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-4 opacity-70 text-green-200 text-xs font-bold uppercase tracking-widest">
                        <BrainCircuit size={14} /> Guess the Menu
                    </div>
                    
                    {/* Ingredients List */}
                    <div className="flex flex-wrap gap-2">
                        {question.answer.ingredients.map((ing, idx) => (
                            <motion.span 
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white/90 text-green-900 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm"
                            >
                                {ing}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Choices Grid */}
                <div className="grid grid-cols-1 gap-3">
                    {question.choices.map((choice, idx) => {
                        let btnStyle = "bg-white/5 border-white/10 hover:bg-white/10 text-white"; // Default
                        let icon = null;

                        if (isAnswered) {
                            if (choice.id === question.answer.id) {
                                btnStyle = "bg-green-500 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.5)] scale-[1.02]";
                                icon = <CheckCircle className="text-white" />;
                            } else if (choice.id === selectedChoice?.id) {
                                btnStyle = "bg-red-500/80 border-red-500 text-white opacity-50";
                                icon = <XCircle className="text-white" />;
                            } else {
                                btnStyle = "bg-white/5 border-white/5 text-gray-400 opacity-30";
                            }
                        }

                        return (
                            <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                disabled={isAnswered}
                                onClick={() => handleAnswer(choice)}
                                className={`
                                    p-4 rounded-xl border-2 font-bold text-lg text-left transition-all duration-200 flex justify-between items-center backdrop-blur-sm
                                    ${btnStyle}
                                `}
                            >
                                <span className="truncate mr-2">{choice.name}</span>
                                {icon}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- NEXT BUTTON (Floating Bottom) --- */}
      <AnimatePresence>
        {isAnswered && (
            <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="fixed bottom-0 left-0 right-0 p-4 bg-black/40 backdrop-blur-md z-20 border-t border-white/10"
            >
                <button 
                    onClick={nextQuestion}
                    className="w-full max-w-md mx-auto bg-yellow-400 text-yellow-900 py-3.5 rounded-xl font-bold text-xl shadow-lg hover:scale-[1.02] transition-transform flex justify-center items-center gap-2"
                >
                    {currentQuestionIdx + 1 >= targetQuestions ? 'สรุปคะแนน 🏆' : 'ข้อต่อไป'} <Zap fill="currentColor" size={20} />
                </button>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}