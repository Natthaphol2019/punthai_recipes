// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Game from './Game';
import Admin from './Admin';
import Quiz from './Quiz'; // <--- 1. เพิ่มบรรทัดนี้

function Home() {
  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center justify-center p-6 text-white text-center">
      <h1 className="text-4xl font-bold mb-2">Punthai Barista</h1>
      <p className="text-green-200 mb-8 text-sm">ฝึกจำสูตร กาแฟพันธุ์ไทย</p>
      
      <div className="w-full max-w-xs space-y-4">
        {/* ปุ่มไปหน้า Simulator (เดิม) */}
        <Link to="/game" className="block bg-white text-green-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition">
          ☕️ ฝึกชง (จำส่วนผสม)
        </Link>

        {/* ปุ่มไปหน้า Quiz (ใหม่) */}
        <Link to="/quiz" className="block bg-yellow-400 text-yellow-900 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition">
          ❓ ทายชื่อเมนู (Quiz)
        </Link>
      </div>

      <Link to="/admin" className="fixed bottom-4 text-xs opacity-40 hover:opacity-100 underline">
        Admin Upload
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/quiz" element={<Quiz />} /> {/* <--- 2. เพิ่มบรรทัดนี้ */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}