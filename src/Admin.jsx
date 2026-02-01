// src/Admin.jsx
import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // import ง่ายๆ แบบนี้เลย
import { recipes } from './recipes';

export default function Admin() {
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    setStatus('กำลังอัปโหลด...');
    const { error } = await supabase.from('recipes').upsert(recipes, { onConflict: 'id' });
    if (error) setStatus('Error: ' + error.message);
    else setStatus('สำเร็จ! อัปโหลดเรียบร้อย');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Upload</h1>
      <button onClick={handleUpload} className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg">
        อัปโหลดสูตรเข้า Database
      </button>
      {status && <p className="mt-4 text-lg">{status}</p>}
    </div>
  );
}