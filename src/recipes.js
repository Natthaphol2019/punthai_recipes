// src/recipes.js
export const recipes = [
  // ==========================================
  // หมวด 1: Standard Frappe Beverage (ปั่น 16oz)
  // ==========================================
  {
    id: "EF",
    name: "Espresso Frappe (เอสเพรสโซ่ปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "นมข้นหวาน (2 oz)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "CF",
    name: "Cappuccino Frappe (คาปูชิโน่ปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "นมข้นหวาน (1.5 oz)",
      "น้ำเชื่อมทรายขาว (1 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "นมสด (ฟองนม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "LF",
    name: "Double Latte Frappe (ดับเบิ้ลลาเต้ปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "นมสด (1 oz)",
      "นมข้นหวาน (1.5 oz)",
      "น้ำเชื่อมทรายขาว (1 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "MF",
    name: "Mocha Frappe (มอคค่าปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำร้อน (1 oz)",
      "ผงโกโก้ (1 ช้อน)",
      "นมข้นหวาน (1.5 oz)",
      "นมมิกซ์ (1 oz)",
      "ช็อกโกแลตซอส (2 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "CLF",
    name: "Caramel Latte Frappe (คาราเมลลาเต้ปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมคาราเมล (1 ปั๊ม)",
      "นมข้นหวาน (2 oz)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "HLF",
    name: "Hazelnut Latte Frappe (ฮาเซลนัทลาเต้ปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมฮาเซลนัท (1 ปั๊ม)",
      "นมข้นหวาน (2 oz)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "TTF",
    name: "Thai Tea Frappe (ชาไทยปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงชาไทย (1 ช้อน)",
      "MBS (7 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "CHF",
    name: "Chocolate Frappe (ช็อกโกแลตปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "นมสด (5 oz)",
      "นมข้นหวาน (2 oz)",
      "ผงโกโก้ (2 ช้อน)",
      "ช็อกโกแลตซอส (2 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "MKF",
    name: "Milky Frappe (นมสดปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "นมสด (6 oz)",
      "นมข้นหวาน (1.5 oz)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "GTF",
    name: "Green Tea Frappe (ชาเขียวปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "ใบชาเขียว (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงชาเขียว (1 ช้อน)",
      "MBS (5 ปั๊ม)", // *** แก้ไขจาก 4 เป็น 5 ตามที่แจ้ง ***
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "CCF",
    name: "Cookie & Cream Frappe (คุกกี้แอนด์ครีมปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "นมสด (6 oz)",
      "นมข้นหวาน (1.5 oz)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "ช็อกโกแลตคุกกี้ (2 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "SF",
    name: "Strawberry Smoothie (สตรอว์เบอร์รีปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "น้ำกรอง (3 oz)",
      "น้ำสตรอว์เบอร์รีเข้มข้น (3 oz)",
      "ผงมะนาว (0.5 ช้อนชา)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "HLSF",
    name: "Honey Lemon Smoothie (น้ำผึ้งมะนาวปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "น้ำกรอง (4 oz)",
      "น้ำผึ้ง (2.5 oz)",
      "ผงมะนาว (2.5 ช้อนชา)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "OF",
    name: "Orange Squash Smoothie (ส้มปั่น)",
    category: "Frappe (16oz)",
    ingredients: [
      "น้ำกรอง (4 oz)",
      "น้ำส้มเข้มข้น (2 oz)",
      "น้ำเชื่อมทรายขาว (4 ปั๊ม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },

  // ==========================================
  // หมวด 2: Standard Iced Beverage (เย็น 22oz)
  // ==========================================
  {
    id: "IA",
    name: "Iced Americano (อเมริกาโน่เย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำกรอง (6 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IHA",
    name: "Iced Honey Americano (อเมริกาโน่น้ำผึ้งเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำผึ้ง (1 oz)",
      "น้ำกรอง (4 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IE",
    name: "Iced Espresso (เอสเพรสโซ่เย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมทรายแดง (3 ปั๊ม)",
      "นมมิกซ์ (4 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IC",
    name: "Iced Cappuccino (คาปูชิโน่เย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมทรายแดง (3 ปั๊ม)",
      "นมมิกซ์ (3 oz)",
      "นมสด (ฟองนม 50ml)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IM",
    name: "Iced Mocha (มอคค่าเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมทรายแดง (3 ปั๊ม)",
      "ช็อกโกแลตซอส (1 ปั๊ม)",
      "นมมิกซ์ (3 oz)",
      "นมสด (ฟองนม 50ml)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "ICH",
    name: "Iced Double Chocolate (ช็อกโกแลตเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "น้ำร้อน (3 oz)",
      "ผงโกโก้ (2 ช้อน)",
      "นมข้นหวาน (2 oz)",
      "ช็อกโกแลตซอส (2 ปั๊ม)",
      "นมมิกซ์ (3 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IL2",
    name: "Iced Double Latte (ดับเบิ้ลลาเต้เย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "น้ำเชื่อมทรายแดง (3 ปั๊ม)",
      "นมสด (5 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IPC",
    name: "Punthai Chaiyo (พันธุ์ไทยไชโยเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "Espresso (2 shot)",
      "MBS (6 ปั๊ม)",
      "นมสด (3 oz)",
      "นมสด (ฟองนม 50ml)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "ITT",
    name: "Iced Double Thai Tea (ชาไทยเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงชาไทย (1 ช้อน)",
      "MBS (4 ปั๊ม)",
      "นมสด (ฟองนม 50ml)", 
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IGT",
    name: "Iced Green Tea Latte (ชาเขียวเย็น 22oz)",
    category: "Iced (22oz)",
    ingredients: [
      "ใบชาเขียว (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงชาเขียว (1 ช้อน)",
      "MBS (4 ปั๊ม)",
      "นมสด (1 oz)", // *** แก้ไขจาก นมมิกซ์ เป็น นมสด ตามภาพที่แจ้ง ***
      "น้ำแข็งแก้ว 22oz"
    ]
  },

  // ==========================================
  // หมวด 3: Standard Iced Beverage (เย็น 16oz)
  // ==========================================
  {
    id: "IMK",
    name: "Iced Milk (นมสดเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "นมสด (8 oz)",
      "น้ำเชื่อมทรายขาว (1 ปั๊ม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ILC",
    name: "Iced Caramel Latte (คาราเมลลาเต้เย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "Espresso (1 shot)",
      "น้ำเชื่อมทรายแดง (2 ปั๊ม)",
      "น้ำเชื่อมคาราเมล (1 ปั๊ม)",
      "นมสด (5 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ILH",
    name: "Iced Hazelnut Latte (ฮาเซลนัทลาเต้เย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "Espresso (1 shot)",
      "น้ำเชื่อมทรายแดง (2 ปั๊ม)",
      "น้ำเชื่อมฮาเซลนัท (1 ปั๊ม)",
      "นมสด (5 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "PUN",
    name: "Iced PunThai Coffee (พันธุ์ไทยคอฟฟี่เย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "Espresso (2 shot)",
      "MBS (6 ปั๊ม)",
      "นมสด (3 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ITM",
    name: "Iced Three Musketeers (สามทหารเสือเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำร้อน (1 oz)",
      "ผงโกโก้ (1 ช้อน)",
      "MBS (5 ปั๊ม total)", 
      "นมสด (3 oz)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ITG",
    name: "Iced Triple Gangs (สามสหายเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาพรีเมียม (1 ช้อน)",
      "น้ำสกัดชา (1 oz)",
      "MBS (5 ปั๊ม total)",
      "นมสด (3 oz)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IGE",
    name: "Iced Green Tea Espresso (กรีนทีเอสเพรสโซ่เย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "กรีนทีมิ๊กซ์ (1.5 oz)",
      "MBS (3 ปั๊ม)",
      "นมสด (3.5 oz)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IVT",
    name: "Iced PunThai Lover Tea (พันธุ์ไทยเลิฟเวอร์ทีเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "กรีนทีมิ๊กซ์ (1.5 oz)",
      "MBS (3 ปั๊ม)",
      "นมสด (3 oz)",
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (1.5 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IES",
    name: "Iced Espresso Som (เอสเพรสโซ่ส้มเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "เจเล่ไลท์รสส้ม (1 ถ้วย)",
      "น้ำส้มเข้มข้น (1 oz)",
      "น้ำกรอง (1 oz)",
      "น้ำเชื่อมทรายขาว (2 ปั๊ม)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "CHL",
    name: "Iced Coffee Honey Lemon (กาแฟน้ำผึ้งมะนาว)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำร้อน (2 oz)",
      "ผงมะนาว (1 ช้อนชา)",
      "น้ำผึ้ง (1.5 oz)",
      "น้ำกรอง (2.5 oz)",
      "Espresso (1 shot)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IBT",
    name: "Iced Black Tea (ชาดำเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "น้ำเชื่อมทรายขาว (8 ปั๊ม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ILT",
    name: "Iced Lemon Tea (ชามะนาวเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงมะนาว (1 ช้อนชา)",
      "น้ำเชื่อมทรายขาว (9 ปั๊ม)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IMC",
    name: "Iced Mapeed Coffee (กาแฟส้มมะปี๊ด)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำมะปี๊ดผสมน้ำผึ้ง (6 oz)",
      "น้ำเชื่อมทรายขาว (3 ปั๊ม)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IMT",
    name: "Iced Mapeed Tea (ชาไทยส้มมะปี๊ด)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (1.5 oz)",
      "น้ำมะปี๊ดผสมน้ำผึ้ง (6 oz)",
      "น้ำเชื่อมทรายขาว (3 ปั๊ม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IPA",
    name: "Iced Palm Sugar Coffee Latte (กาแฟโตนดเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำเชื่อมน้ำตาลโตนด (1 oz)",
      "น้ำกะทิ-อร่อยดี (3 oz)",
      "นมสด (1 oz)",
      "MBS (3 ปั๊ม)",
      "Espresso (1 shot)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IMP",
    name: "Iced Palm Sugar Milk (โตนดนมสด)",
    category: "Iced (16oz)",
    ingredients: [
      "ไข่มุกบุก (2 ช้อนโต๊ะ)", 
      "นมสด (5 oz)",
      "MBS (3 ปั๊ม)",
      "น้ำเชื่อมน้ำตาลโตนด (16 กรัม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ICP",
    name: "Iced Palm Sugar Tea (ชานมโตนด)",
    category: "Iced (16oz)",
    ingredients: [
      "ไข่มุกบุก (2 ช้อนโต๊ะ)", 
      "ใบชาไทย (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงชาไทย (1 ช้อน)",
      "MBS (4 ปั๊ม)",
      "น้ำเชื่อมน้ำตาลโตนด (16 กรัม)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IHL",
    name: "Iced Honey Lemon (น้ำผึ้งมะนาวเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำร้อน (3 oz)",
      "ผงมะนาว (2 ช้อนชา)",
      "น้ำผึ้ง (2 oz)",
      "น้ำกรอง (2 oz)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "PBT",
    name: "Iced Nan Tea Peach (ชาน่านอัสสัมพีชบลอซซั่ม)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาอัสสัม (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "น้ำเชื่อมพีช (1 oz)",
      "น้ำเชื่อมทรายขาว (1 ปั๊ม)",
      "ผงมะนาว (1 ช้อนชา)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "PLT",
    name: "Iced Nan Tea Plum & Lime (ชาน่านอัสสัมบ๊วยน้ำผึ้งมะนาว)",
    category: "Iced (16oz)",
    ingredients: [
      "ใบชาอัสสัม (1 ช้อน)",
      "น้ำสกัดชา (5 oz)",
      "ผงมะนาว (1 ช้อนชา)",
      "น้ำผึ้ง (1 oz)",
      "น้ำเชื่อมทรายขาว (3 ปั๊ม)",
      "บ๊วยเค็ม (2 เม็ด)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "SS",
    name: "Italian Strawberry Soda (สตรอว์เบอร์รีโซดา)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำสตรอว์เบอร์รีเข้มข้น (1.5 oz)",
      "น้ำโซดา (5.5 oz)", 
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "OS",
    name: "Italian Orange Soda (ส้มโซดา)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำส้มเข้มข้น (1.5 oz)",
      "น้ำเชื่อมทรายขาว (2 ปั๊ม)",
      "น้ำโซดา (5 oz)", 
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IPS",
    name: "Punthai Sparkling (พันธุ์ไทยสปาร์คกิ้งเย็น)",
    category: "Iced (16oz)",
    ingredients: [
      "น้ำเชื่อม Blue Sky (2 ปั๊ม)",
      "น้ำมะนาว (2 ช้อนชา)",
      "น้ำโซดา (3 oz)",
      "เจเล่สตรอว์เบอร์รี (1 ถ้วย)",
      "น้ำสตรอว์เบอร์รีเข้มข้น (10 ml)",
      "น้ำกรอง (20 ml)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },

  // ==========================================
  // หมวด 4: Standard Matcha Beverage (มัทฉะ)
  // ==========================================
  {
    id: "IML",
    name: "Iced Matcha Latte (มัทฉะลาเต้)",
    category: "Matcha",
    ingredients: [
      "นมสด (4 oz)",
      "MBS (3 ปั๊ม)",
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "น้ำร้อน (1 oz)",
      "น้ำกรอง (1 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IMJ",
    name: "Iced Matcha Jelly Latte (มัทฉะเจลลี่ลาเต้)",
    category: "Matcha",
    ingredients: [
      "เจลลี่แดง (1 ถุง)",
      "นมสด (4 oz)",
      "MBS (3 ปั๊ม)",
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "น้ำร้อน (1 oz)",
      "น้ำกรอง (1 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IMG",
    name: "Iced Matcha Honey Lemon (มัทฉะน้ำผึ้งมะนาวเย็น)",
    category: "Matcha",
    ingredients: [
      "น้ำร้อน (3 oz)",
      "ผงมะนาว (1 ช้อนชา)",
      "น้ำผึ้ง (1.5 oz)",
      "น้ำกรอง (3 oz)",
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "มะนาวหั่นแว่น (1 ชิ้น)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "MGTF",
    name: "Matcha Green Tea Frappe (ชาเขียวมัทฉะปั่น)",
    category: "Matcha",
    ingredients: [
      "ผงชาเขียวมัทฉะ (2 ช้อน)",
      "นมสด (5 oz)",
      "MBS (6 ปั๊ม)",
      "น้ำเชื่อมทรายขาว (2 ปั๊ม)",
      "ผงเฟรปเป้ (1 ช้อน)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "IML2",
    name: "Iced Double Matcha Latte (ดับเบิ้ลมัทฉะลาเต้ 22oz)",
    category: "Matcha",
    ingredients: [
      "นมสด (5 oz)",
      "MBS (4 ปั๊ม)",
      "ผงชาเขียวมัทฉะ (2 ช้อน)",
      "น้ำร้อน (1 oz)",
      "น้ำกรอง (1 oz)",
      "น้ำแข็งแก้ว 22oz"
    ]
  },
  {
    id: "IMU",
    name: "Iced Pure Matcha (เพียวมัทฉะเย็น)",
    category: "Matcha",
    ingredients: [
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "น้ำร้อน (1 oz)",
      "น้ำกรอง (6 oz)",
      "น้ำแข็งแก้ว 16oz"
    ]
  },
  {
    id: "ML",
    name: "Hot Matcha Latte (มัทฉะลาเต้ร้อน)",
    category: "Matcha",
    ingredients: [
      "นมสด (200 ml)",
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "น้ำเชื่อมทรายขาว (2 ปั๊ม)"
    ]
  },
  {
    id: "MU",
    name: "Hot Pure Matcha (เพียวมัทฉะร้อน)",
    category: "Matcha",
    ingredients: [
      "ผงชาเขียวมัทฉะ (1 ช้อน)",
      "น้ำร้อน (9 oz)" 
    ]
  }
];

// รวบรวมวัตถุดิบทั้งหมดสำหรับทำปุ่มกด
export const allIngredients = Array.from(new Set(
  recipes.flatMap(r => r.ingredients)
)).sort();