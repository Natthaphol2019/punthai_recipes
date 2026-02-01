// src/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { ArrowLeft, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function Quiz() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [question, setQuestion] = useState(null); // { answer: Recipe, choices: [Recipe, Recipe, ...] }
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลจาก Supabase ตอนเข้าหน้าเว็บ
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    // ดึงข้อมูลทั้งหมดจากตาราง recipes
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) {
      console.error('Error fetching recipes:', error);
    } else {
      setRecipes(data);
      generateQuestion(data); // สร้างคำถามข้อแรก
    }
    setLoading(false);
  };

  // 2. ระบบสุ่มคำถาม
  const generateQuestion = (data) => {
    if (!data || data.length < 4) return; // ต้องมีข้อมูลอย่างน้อย 4 เมนูถึงจะเล่นได้

    // สุ่มคำตอบที่ถูก 1 ข้อ
    const correct = data[Math.floor(Math.random() * data.length)];
    
    // สุ่มตัวหลอก 3 ข้อ (ต้องไม่ซ้ำกับข้อถูก)
    let choices = [correct];
    while (choices.length < 4) {
      const random = data[Math.floor(Math.random() * data.length)];
      // เช็คว่าไม่ซ้ำกับที่มีอยู่แล้ว
      if (!choices.find(c => c.id === random.id)) {
        choices.push(random);
      }
    }

    // สลับตำแหน่งช้อยส์ (Shuffle) ไม่ให้ข้อถูกอยู่ที่เดิมตลอด
    choices.sort(() => Math.random() - 0.5);

    setQuestion({ answer: correct, choices: choices });
    setSelectedChoice(null);
  };

  const handleAnswer = (choice) => {
    if (selectedChoice) return; // ห้ามกดซ้ำ
    setSelectedChoice(choice);
    
    if (choice.id === question.answer.id) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    generateQuestion(recipes);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;
  if (!question) return <div className="text-center p-10">กำลังโหลดข้อมูล หรือข้อมูลไม่เพียงพอ...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <button onClick={() => navigate('/')} className="p-2 bg-white rounded-full shadow hover:bg-gray-50">
          <ArrowLeft size={20} />
        </button>
        <div className="font-bold text-lg bg-yellow-400 px-4 py-1 rounded-full text-yellow-900 shadow">
          คะแนน: {score}
        </div>
      </div>

      {/* Card คำถาม */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
        <div className="bg-green-700 p-4 text-white text-center">
          <h2 className="text-lg font-semibold opacity-90">เมนูนี้คืออะไร?</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
             {/* แสดงส่วนผสม (โจทย์) */}
             {question.answer.ingredients.map((ing, index) => (
               <div key={index} className="flex items-center gap-3 bg-green-50 p-2 rounded-lg border border-green-100">
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <span className="text-gray-700 font-medium">{ing}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Choices (ตัวเลือก) */}
      <div className="w-full max-w-md grid grid-cols-1 gap-3 mb-20">
        {question.choices.map((choice, index) => {
          // ตรวจสอบสถานะเพื่อเปลี่ยนสีปุ่ม
          let btnClass = "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"; // ปกติ
          
          if (selectedChoice) {
            if (choice.id === question.answer.id) {
              btnClass = "bg-green-500 border-green-600 text-white shadow-lg scale-105"; // เฉลยข้อถูก (สีเขียว)
            } else if (choice.id === selectedChoice.id) {
              btnClass = "bg-red-500 border-red-600 text-white"; // กดผิด (สีแดง)
            } else {
              btnClass = "bg-gray-100 border-gray-200 text-gray-400 opacity-50"; // ข้ออื่นๆ ตอนเฉลยแล้ว
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswer(choice)}
              disabled={!!selectedChoice}
              className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 shadow-sm flex justify-between items-center ${btnClass}`}
            >
              {choice.name}
              {selectedChoice && choice.id === question.answer.id && <CheckCircle />}
              {selectedChoice && choice.id === selectedChoice.id && choice.id !== question.answer.id && <XCircle />}
            </button>
          );
        })}
      </div>

      {/* ปุ่มไปข้อต่อไป (ขึ้นมาเมื่อตอบแล้ว) */}
      {selectedChoice && (
        <div className="fixed bottom-6 w-full max-w-md px-4">
          <button 
            onClick={nextQuestion}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-xl shadow-xl hover:bg-blue-700 transition-transform active:scale-95"
          >
            ข้อต่อไป ➔
          </button>
        </div>
      )}
    </div>
  );
}