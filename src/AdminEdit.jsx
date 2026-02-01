// src/AdminEdit.jsx
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Search, Edit2, Save, X, Plus, Trash2, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminEdit() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null); // ID ของเมนูที่กำลังแก้ (null = ไม่ได้แก้)
  
  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    ingredients: []
  });

  const [status, setStatus] = useState(''); // ข้อความแจ้งสถานะ

  // 1. Fetch Data
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const { data, error } = await supabase.from('recipes').select('*').order('name');
    if (data) setRecipes(data);
  };

  // 2. Filter Logic
  const filteredRecipes = recipes.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Start Editing
  const handleEditClick = (recipe) => {
    setEditingId(recipe.id);
    setFormData({
      name: recipe.name,
      category: recipe.category,
      ingredients: [...recipe.ingredients] // Clone array
    });
    setStatus('');
  };

  // 4. Handle Ingredient Changes
  const handleIngredientChange = (index, value) => {
    const newIngs = [...formData.ingredients];
    newIngs[index] = value;
    setFormData({ ...formData, ingredients: newIngs });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    const newIngs = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngs });
  };

  // 5. Save Changes to Supabase
  const handleSave = async () => {
    setStatus('กำลังบันทึก...');
    
    // กรองส่วนผสมที่เป็นช่องว่างออก
    const cleanIngredients = formData.ingredients.filter(i => i.trim() !== '');

    const { error } = await supabase
      .from('recipes')
      .update({
        name: formData.name,
        category: formData.category,
        ingredients: cleanIngredients
      })
      .eq('id', editingId);

    if (error) {
      setStatus('Error: ' + error.message);
    } else {
      setStatus('บันทึกสำเร็จ!');
      setEditingId(null);
      fetchRecipes(); // ดึงข้อมูลใหม่มาแสดง
      
      // Clear status after 2s
      setTimeout(() => setStatus(''), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} /> กลับหน้าหลัก
        </button>
        <h1 className="text-xl font-bold text-gray-800">จัดการสูตรกาแฟ 🛠️</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-4 sticky top-4 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อเมนู หรือ รหัส..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Status Message */}
        {status && (
          <div className={`mb-4 p-3 rounded-lg text-center font-bold ${status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status}
          </div>
        )}

        {/* List / Edit Form */}
        <div className="space-y-4">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              
              {editingId === recipe.id ? (
                // --- Edit Mode ---
                <div className="p-6 bg-blue-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-blue-800">แก้ไขเมนู: {recipe.id}</h3>
                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-red-500"><X /></button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-gray-500">ชื่อเมนู</label>
                      <input 
                        className="w-full p-2 border rounded" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500">หมวดหมู่</label>
                      <input 
                        className="w-full p-2 border rounded" 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})} 
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-500 block mb-2">ส่วนผสม</label>
                      {formData.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input 
                            className="flex-1 p-2 border rounded text-sm"
                            value={ing}
                            onChange={(e) => handleIngredientChange(idx, e.target.value)}
                          />
                          <button onClick={() => removeIngredient(idx)} className="text-red-400 hover:text-red-600 p-2">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      <button onClick={addIngredient} className="text-sm text-blue-600 flex items-center gap-1 font-bold mt-2 hover:bg-blue-100 p-2 rounded">
                        <Plus size={16} /> เพิ่มส่วนผสม
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button onClick={handleSave} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-green-700">
                      <Save size={18} /> บันทึก
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300">
                      ยกเลิก
                    </button>
                  </div>
                </div>

              ) : (
                // --- View Mode ---
                <div className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <h3 className="font-bold text-gray-800">{recipe.name}</h3>
                    <p className="text-xs text-gray-500">{recipe.category} • {recipe.ingredients.length} ส่วนผสม</p>
                  </div>
                  <button 
                    onClick={() => handleEditClick(recipe)}
                    className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {filteredRecipes.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              ไม่พบเมนูที่ค้นหา
            </div>
          )}
        </div>

      </div>
    </div>
  );
}