import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, LogOut, Plus, Minus, 
  Clock, Utensils, Store, CheckCircle, Trash2, 
  ShieldAlert, Star, Compass, Heart, ChevronRight,
  TrendingUp, Sparkles, ShoppingBag, Receipt, ArrowRight, User,
  LayoutDashboard, PackagePlus, Check, FileText, Flame, SlidersHorizontal, X
} from 'lucide-react';

const initialMenuData = [
  { id: 1, name: "ข้าวกะเพราหมูสับไข่ดาว", price: 45, category: "คาว", restaurant: "ร้านป้าดาว อาหารตามสั่ง", rating: 4.8, prepTime: "15-20 นาที", available: true, salesCount: 42, description: "กะเพราหมูสับสูตรโบราณ รสชาติจัดจ้าน หอมใบกะเพราป่า เสิร์ฟพร้อมไข่ดาวกรอบนอกไข่แดงเยิ้ม", image: "https://images.unsplash.com/photo-1626804475297-4160aae01fdb?w=600&q=80" },
  { id: 2, name: "ข้าวผัดหมูสูตรดั้งเดิม", price: 40, category: "คาว", restaurant: "ร้านป้าดาว อาหารตามสั่ง", rating: 4.5, prepTime: "10-15 นาที", available: true, salesCount: 31, description: "ข้าวผัดไข่ใส่เนื้อหมูนุ่มหมักสูตรพิเศษ หอมกลิ่นกระทะร้อนๆ เสิร์ฟพร้อมมะนาวสดแตงกวาและต้นหอม", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80" },
  { id: 3, name: "ก๋วยเตี๋ยวเรือเส้นเล็กต้มยำ", price: 45, category: "คาว", restaurant: "ก๋วยเตี๋ยวเรือรสเด็ด", rating: 4.7, prepTime: "10-15 นาที", available: true, salesCount: 38, description: "ก๋วยเตี๋ยวเส้นเล็กเหนียวนุ่ม ปรุงรสต้มยำสูตรจี๊ดจ๊าดด้วยพริกคั่วหอมและถั่วลิสงบด ลูกชิ้นเต็มคำ", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80" },
  { id: 4, name: "ชาไทยชงเข้มเย็น", price: 25, category: "หวาน", restaurant: "ชาชงเข้ม หน้า ม.", rating: 4.9, prepTime: "5-10 นาที", available: true, salesCount: 55, description: "ชาไทยสายพันธุ์ดีต้มสดชงเข้มข้น รสชาติหวานมันกลมกล่อม ท็อปปิ้งฟองนมนุ่มๆ สูตรพิเศษ", image: "https://images.unsplash.com/photo-1558857563-b37102e95a00?w=600&q=80" },
  { id: 5, name: "บิงซูสตรอว์เบอร์รีดับเบิ้ลครีม", price: 89, category: "หวาน", restaurant: "Sweet Cafe", rating: 4.6, prepTime: "15-25 นาที", available: true, salesCount: 19, description: "น้ำแข็งไสเกล็ดหิมะเนื้อปุยนุ่มสไตล์เกาหลี ราดด้วยซอสสตรอว์เบอร์รีเข้มข้นและผลสตรอว์เบอร์รีสดรสเปรี้ยวหวาน", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  { id: 6, name: "โรตีกล้วยหอมช็อกโกแลต", price: 35, category: "หวาน", restaurant: "โรตีอินเตอร์", rating: 4.4, prepTime: "10-15 นาที", available: true, salesCount: 27, description: "แป้งโรตีนวดมือทอดจนกรอบนอกนุ่มใน สอดไส้กล้วยหอมทองหั่นแว่น ราดทับด้วยนมข้นหวานและซอสช็อกโกแลต", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80" }
];

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80";

function App() {
  // โหลดสถานะเริ่มต้นจาก Storage โดยตรงเพื่อป้องกัน Cascading Renders
  const [user, setUser] = useState(() => {
    try {
      const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
      const savedEmail = sessionStorage.getItem('userEmail');
      return isLoggedIn && savedEmail ? savedEmail : null;
    } catch {
      return null;
    }
  });

  const [menuList, setMenuList] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_menu_list');
      return saved ? JSON.parse(saved) : initialMenuData;
    } catch {
      return initialMenuData;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeView, setActiveView] = useState('customer'); // 'customer' | 'admin'
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // ตัวเลือกเสริมก่อนหยิบใส่ตะกร้า (ความเผ็ด/ความหวาน/พิเศษ)
  const [customizingItem, setCustomizingItem] = useState(null);
  const [optionLevel, setOptionLevel] = useState('ปกติ');
  const [isSpecialSize, setIsSpecialSize] = useState(false);

  // ฟอร์มเพิ่มเมนูใหม่ในฝั่ง Admin
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('คาว');
  const [newMenuRestaurant, setNewMenuRestaurant] = useState('');

  // สถานะจำลองออร์เดอร์หลังสั่งซื้อ
  const [orderStatus, setOrderStatus] = useState(null); // null | 'pending' | 'preparing' | 'delivering' | 'completed'

  // ซิงค์ข้อมูลลง LocalStorage อัตโนมัติ
  useEffect(() => {
    try {
      localStorage.setItem('ksu_menu_list', JSON.stringify(menuList));
    } catch {
      // ignore storage errors
    }
  }, [menuList]);

  useEffect(() => {
    try {
      localStorage.setItem('ksu_cart', JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ksu_favorites', JSON.stringify(favorites));
    } catch {
      // ignore storage errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('ksu_orders', JSON.stringify(orderHistory));
    } catch {
      // ignore storage errors
    }
  }, [orderHistory]);

  // ระบบเปลี่ยนสถานะออร์เดอร์จำลอง (Real-time Simulation)
  useEffect(() => {
    let timer;
    if (orderStatus && orderStatus !== 'completed') {
      timer = setTimeout(() => {
        if (orderStatus === 'pending') {
          setOrderStatus('preparing');
        } else if (orderStatus === 'preparing') {
          setOrderStatus('delivering');
        } else if (orderStatus === 'delivering') {
          setOrderStatus('completed');
        }
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  // ระบบเข้าสู่ระบบ
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim().toLowerCase();
    if (trimmedEmail.endsWith('@ksu.ac.th') && trimmedEmail.length > '@ksu.ac.th'.length) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', trimmedEmail);
      setUser(trimmedEmail);
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  // ออกจากระบบ
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    setUser(null);
    setEmailInput('');
    setCart([]);
    setOrderStatus(null);
    setIsCartOpen(false);
    setActiveView('customer');
  };

  // เปิดหน้าต่างเลือกตัวเลือกเสริม
  const openCustomizeModal = (item) => {
    if (!item.available) return;
    setCustomizingItem(item);
    setOptionLevel('ปกติ');
    setIsSpecialSize(false);
  };

  // เพิ่มสินค้าลงตะกร้าพร้อมตัวเลือกเสริม
  const confirmAddToCart = () => {
    if (!customizingItem) return;
    const extraPrice = isSpecialSize ? 10 : 0;
    const finalPrice = customizingItem.price + extraPrice;
    const optionText = `${customizingItem.category === 'คาว' ? `เผ็ด${optionLevel}` : `หวาน${optionLevel}`}${isSpecialSize ? ' • พิเศษ (+฿10)' : ' • ธรรมดา'}`;
    const cartKey = `${customizingItem.id}-${optionLevel}-${isSpecialSize ? 'sp' : 'rg'}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.cartKey === cartKey);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.cartKey === cartKey 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { 
        ...customizingItem, 
        cartKey,
        price: finalPrice,
        optionText,
        quantity: 1 
      }];
    });
    setCustomizingItem(null);
  };

  // เพิ่มจำนวนในตะกร้า
  const incrementCartItem = (cartKey) => {
    setCart(prevCart => prevCart.map(item => 
      item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // ลดจำนวนในตะกร้า
  const removeFromCart = (cartKey) => {
    setCart(prevCart => 
      prevCart.map(cartItem => {
        if (cartItem.cartKey === cartKey) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      }).filter(cartItem => cartItem.quantity > 0)
    );
  };

  const deleteFromCart = (cartKey) => {
    setCart(prevCart => prevCart.filter(item => item.cartKey !== cartKey));
  };

  // ยืนยันการสั่งซื้อและออกใบเสร็จดิจิทัล (E-Receipt)
  const handleCheckout = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
      orderId: `KSU-${Math.floor(100000 + Math.random() * 900000)}`,
      customer: user,
      items: [...cart],
      total,
      timestamp: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('th-TH'),
    };

    // อัปเดตยอดขายรายเมนู
    setMenuList(prev => prev.map(m => {
      const orderedQty = cart
        .filter(c => c.id === m.id)
        .reduce((acc, c) => acc + c.quantity, 0);
      return orderedQty > 0 ? { ...m, salesCount: (m.salesCount || 0) + orderedQty } : m;
    }));

    setOrderHistory(prev => [newOrder, ...prev]);
    setSelectedReceipt(newOrder);
    setOrderStatus('pending');
    setCart([]);
    setIsCartOpen(false);
  };

  // ระบบกดถูกใจเมนู
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // ฟังก์ชันจัดการเมนูฝั่ง Admin
  const handleAddMenu = (e) => {
    e.preventDefault();
    const numericPrice = Number(newMenuPrice);
    if (!newMenuName.trim() || !newMenuRestaurant.trim() || !numericPrice || numericPrice <= 0) return;

    const newEntry = {
      id: Date.now(),
      name: newMenuName.trim(),
      price: numericPrice,
      category: newMenuCategory,
      restaurant: newMenuRestaurant.trim(),
      rating: 5.0,
      prepTime: "10-15 นาที",
      available: true,
      salesCount: 0,
      description: "เมนูใหม่แนะนำประจำวัน ปรุงสดใหม่ทุกออร์เดอร์สำหรับนักศึกษาและบุคลากร",
      image: newMenuCategory === 'คาว'
        ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80"
        : "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80"
    };

    setMenuList(prev => [newEntry, ...prev]);
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuRestaurant('');
  };

  const toggleMenuAvailability = (id) => {
    setMenuList(prev => prev.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const deleteMenuItem = (id) => {
    setMenuList(prev => prev.filter(item => item.id !== id));
  };

  // การกรองเมนู
  const filteredMenu = menuList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = orderHistory.reduce((sum, order) => sum + order.total, 0) + 12450;

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans pb-28 text-slate-800">
      
      {/* ─── Shaded / Layered Gradient Background ─── */}
      <div className="fixed inset-0 -z-20 bg-[#FAF9F5] pointer-events-none"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blob 1: Orange/Amber Shade Top-Left */}
        <div className="absolute top-[-25%] left-[-15%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-gradient-to-tr from-orange-300/35 to-amber-200/20 blur-3xl opacity-80"></div>
        {/* Blob 2: Warm Red/Rose Shade Bottom-Right */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full bg-gradient-to-br from-rose-200/25 via-orange-100/35 to-amber-100/20 blur-3xl opacity-75"></div>
        {/* Blob 3: Soft Blue/Lavender Shade in the middle */}
        <div className="absolute top-[25%] right-[10%] w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] rounded-full bg-gradient-to-tr from-orange-100/15 via-rose-100/20 to-sky-100/30 blur-3xl opacity-60"></div>
        {/* Blob 4: Bright yellow shade for texture */}
        <div className="absolute top-[60%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-amber-100/30 blur-3xl opacity-50"></div>
      </div>

      {!user ? (
        // ──────────────── UI เข้าสู่ระบบ (Login Page) ────────────────
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-panel p-8 rounded-3xl w-full max-w-md shadow-[0_20px_50px_rgba(249,115,22,0.08)] border border-white/80 transition-all duration-300 relative">
            <div className="absolute top-3 right-4 flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
            </div>

            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4 animate-pulse">
                <Utensils className="text-white w-8 h-8" />
              </div>
              <h1 className="text-3xl font-black text-orange-600 tracking-tight">KSU Delivery</h1>
              <p className="text-slate-500 mt-2 text-sm">ระบบสั่งอาหารและบริการรับส่งภายในมหาวิทยาลัย</p>
              <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50 text-amber-800 text-[10px] font-bold px-3 py-1.5 rounded-full border border-amber-100 shadow-sm">
                <span>🔐</span>
                <span>สงวนสิทธิ์เฉพาะบัญชี @ksu.ac.th</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  อีเมลสถาบันการศึกษา
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name.su@ksu.ac.th" 
                    className={`w-full px-4 py-3.5 rounded-2xl border ${emailError ? 'border-red-400 focus:ring-red-400 bg-red-50/10' : 'border-slate-200/80 focus:ring-orange-500 bg-white/70'} focus:ring-2 focus:outline-none transition-all shadow-inner text-sm`}
                  />
                </div>
                {emailError && (
                  <div className="flex items-start gap-2 text-red-500 text-xs mt-3 bg-red-50/70 p-3 rounded-xl border border-red-100">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                    <span>อีเมลไม่ถูกต้อง โปรดใช้อีเมลมหาวิทยาลัยที่ลงท้ายด้วย <strong>@ksu.ac.th</strong> เท่านั้น</span>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-4 rounded-2xl transition-all shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <span>เข้าใช้งานระบบ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setEmailInput('student@ksu.ac.th')}
                className="w-full py-2 text-[11px] font-bold text-orange-600 hover:text-orange-700 bg-orange-50/70 hover:bg-orange-100/70 rounded-xl transition-colors"
              >
                ✨ กรอกอีเมลทดสอบอัตโนมัติ (student@ksu.ac.th)
              </button>
            </form>

            <div className="mt-8 border-t border-slate-100 pt-6 text-center space-y-1.5">
              <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">
                Kalasin University Online Project
              </span>
              <p className="text-[11px] text-slate-500 font-bold">
                คณะผู้พัฒนา: นาย ทรงยศ กองชา และ นาย ชลดรงค์ ยศรุ่งเรือง
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ──────────────── UI หลักตัวแอปพลิเคชัน (Main App Page) ────────────────
        <>
          {/* 1. Header Navigation Bar */}
          <nav className="bg-white/70 backdrop-blur-lg shadow-[0_2px_15px_rgba(0,0,0,0.02)] border-b border-white/60 py-4 px-6 sticky top-0 z-40">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-md shadow-orange-500/20">
                  <Utensils className="text-white w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-slate-800 tracking-tight leading-none">KSU Delivery</h1>
                  <span className="text-[9px] text-orange-500 font-bold uppercase tracking-widest">FOOD ORDERING SYSTEM</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* ปุ่มสลับมุมมอง ลูกค้า / ผู้ดูแลร้านค้า ตามขอบเขตบทที่ 1 */}
                <button
                  onClick={() => setActiveView(activeView === 'customer' ? 'admin' : 'customer')}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2.5 rounded-2xl transition-all border shadow-sm ${
                    activeView === 'admin'
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white/90 text-slate-700 hover:bg-orange-50 border-slate-200/80'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-orange-500" />
                  <span>{activeView === 'customer' ? 'ระบบหลังร้าน (Admin)' : 'กลับหน้าสั่งอาหาร'}</span>
                </button>

                <div className="hidden md:flex items-center gap-2.5 bg-white/90 border border-slate-100 p-1.5 pr-4 rounded-2xl shadow-sm">
                  <div className="w-7 h-7 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-slate-400 font-bold leading-none">ล็อกอินโดย</span>
                    <span className="text-xs font-bold text-slate-600 mt-1 leading-none truncate max-w-[140px]">{user}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-white hover:bg-red-500 bg-red-50 px-3.5 py-2.5 rounded-2xl transition-all active:scale-95 shadow-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </nav>

          {/* 2. ระบบสั่งอาหารและแสดงสถานะออร์เดอร์ (Simulated Live Tracking) */}
          {orderStatus && (
            <div className="max-w-6xl mx-auto mt-6 px-4">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_rgba(249,115,22,0.06)] border border-orange-100/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-100/40">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-[10px] font-black tracking-wider uppercase">Live Connection Established</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 leading-tight">
                    {orderStatus === 'pending' && '📝 ระบบเครือข่ายได้รับคำสั่งซื้อแล้ว'}
                    {orderStatus === 'preparing' && '🍳 ห้องครัวได้รับออร์เดอร์และกำลังปรุงอาหาร'}
                    {orderStatus === 'delivering' && '🛵 พนักงานจัดส่งกำลังนำอาหารไปส่งที่ตึกเรียน'}
                    {orderStatus === 'completed' && '🎉 จัดส่งอาหารสำเร็จเรียบร้อยแล้ว'}
                  </h3>
                  <p className="text-xs text-slate-400">สถานะเปลี่ยนอัตโนมัติจำลองระบบเชื่อมต่อหลังบ้านแบบเรียลไทม์</p>
                </div>

                {/* หลอดความก้าวหน้าการจัดส่ง */}
                <div className="flex items-center gap-3 grow max-w-lg">
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex p-[2px] border border-slate-200/50">
                    <div 
                      className={`h-full transition-all duration-[2000ms] rounded-full bg-gradient-to-r ${
                        orderStatus === 'completed' 
                          ? 'from-green-400 to-emerald-500 w-full' 
                          : 'from-orange-400 via-amber-500 to-orange-600'
                      } ${
                        orderStatus === 'pending' ? 'w-1/4' :
                        orderStatus === 'preparing' ? 'w-2/4' :
                        orderStatus === 'delivering' ? 'w-3/4' : 'w-full'
                      }`}
                    />
                  </div>
                  <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-orange-50/70 text-orange-600 font-bold border border-orange-100/40 text-xs shadow-sm">
                    {orderStatus === 'pending' && '25%'}
                    {orderStatus === 'preparing' && '50%'}
                    {orderStatus === 'delivering' && '75%'}
                    {orderStatus === 'completed' && '🟢'}
                  </div>
                  {orderHistory.length > 0 && (
                    <button
                      onClick={() => setSelectedReceipt(orderHistory[0])}
                      className="shrink-0 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold px-3.5 py-3 rounded-2xl transition-all flex items-center gap-1.5 border border-orange-200/60"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>ใบเสร็จ</span>
                    </button>
                  )}
                  {orderStatus === 'completed' && (
                    <button 
                      onClick={() => setOrderStatus(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-3.5 py-3 rounded-2xl transition-all hover:scale-95 shadow-sm"
                    >
                      ปิด
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeView === 'admin' ? (
            // ──────────────── มุมมองผู้ดูแลระบบและร้านค้า (Administrator Module) ────────────────
            <main className="max-w-6xl mx-auto mt-6 px-4 space-y-6 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500">Administrator Dashboard</span>
                  <h2 className="text-2xl font-black text-slate-800 mt-0.5">แผงควบคุมร้านค้าและวิเคราะห์ยอดขาย</h2>
                  <p className="text-xs text-slate-400">บริหารจัดการเมนูอาหาร สถานะคำสั่งซื้อเรียลไทม์ และสรุปสถิติรายได้</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-orange-50/90 border border-orange-100 px-4 py-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-orange-500 uppercase block">ยอดขายสะสมรวม</span>
                    <span className="text-xl font-black text-slate-800">฿{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="bg-emerald-50/90 border border-emerald-100 px-4 py-3 rounded-2xl">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">ออร์เดอร์วันนี้</span>
                    <span className="text-xl font-black text-slate-800">{orderHistory.length + 18} รายการ</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ฟอร์มเพิ่มเมนูใหม่ (CMS) */}
                <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <PackagePlus className="w-5 h-5 text-orange-500" />
                    <h3 className="font-extrabold text-base text-slate-800">เพิ่มรายการอาหารใหม่ (CMS)</h3>
                  </div>
                  <form onSubmit={handleAddMenu} className="space-y-3.5 text-xs">
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ชื่อเมนูอาหาร</label>
                      <input
                        type="text"
                        required
                        value={newMenuName}
                        onChange={(e) => setNewMenuName(e.target.value)}
                        placeholder="เช่น ข้าวหมูทอดกระเทียม"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">ชื่อร้านค้า</label>
                      <input
                        type="text"
                        required
                        value={newMenuRestaurant}
                        onChange={(e) => setNewMenuRestaurant(e.target.value)}
                        placeholder="เช่น ร้านป้าดาว อาหารตามสั่ง"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">ราคา (บาท)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={newMenuPrice}
                          onChange={(e) => setNewMenuPrice(e.target.value)}
                          placeholder="45"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-600 block mb-1">หมวดหมู่</label>
                        <select
                          value={newMenuCategory}
                          onChange={(e) => setNewMenuCategory(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                        >
                          <option value="คาว">อาหารคาว</option>
                          <option value="หวาน">ของหวาน / เครื่องดื่ม</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3 rounded-xl shadow-sm transition-all"
                    >
                      + บันทึกเมนูใหม่เข้าระบบ
                    </button>
                  </form>

                  {/* ควบคุมสถานะออร์เดอร์ปัจจุบันด้วยมือ */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <span className="font-extrabold text-xs text-slate-700 block">จำลองเปลี่ยนสถานะออร์เดอร์ล่าสุด</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                      <button onClick={() => setOrderStatus('pending')} className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700">1. รับออร์เดอร์</button>
                      <button onClick={() => setOrderStatus('preparing')} className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700">2. กำลังปรุง</button>
                      <button onClick={() => setOrderStatus('delivering')} className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700">3. กำลังจัดส่ง</button>
                      <button onClick={() => setOrderStatus('completed')} className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700">4. ส่งสำเร็จ</button>
                    </div>
                  </div>
                </div>

                {/* ตารางจัดการเมนูและสถิติยอดขายรายเมนู */}
                <div className="lg:col-span-2 bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <h3 className="font-extrabold text-base text-slate-800">รายการเมนูและสถิติยอดขาย ({menuList.length} เมนู)</h3>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[420px] overflow-y-auto custom-scrollbar pr-1">
                    {menuList.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-sm text-slate-800 truncate">{item.name}</h4>
                            <p className="text-[11px] text-slate-400">{item.restaurant} • ฿{item.price} • ขายแล้ว {item.salesCount || 0} จาน</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleMenuAvailability(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
                              item.available
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            {item.available ? 'พร้อมขาย' : 'หมดชั่วคราว'}
                          </button>
                          <button
                            onClick={() => deleteMenuItem(item.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                            title="ลบเมนู"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          ) : (
            // ──────────────── 3. เนื้อหาหลักของร้านค้า (Customer Module) ────────────────
            <main className="max-w-6xl mx-auto mt-6 px-4">
              
              {/* ส่วนค้นหาดีไซน์เด่นด้วย Shaded Background */}
              <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.02)] border border-white/60 mb-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-orange-500 font-bold tracking-wider uppercase">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Recommended for KSU Students</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">สั่งอาหารจานร้อน สะดวก รวดเร็ว</h2>
                    <p className="text-xs text-slate-400">เลือกร้านค้าพันธมิตรรอบรั้วมหาวิทยาลัยกาฬสินธุ์โดยตรง</p>
                  </div>
                  
                  {/* กล่องค้นหารายการอาหาร */}
                  <div className="relative md:w-80 shadow-sm rounded-2xl overflow-hidden border border-slate-100">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาชื่ออาหารหรือชื่อร้าน..." 
                      className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white/95 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all text-xs font-medium"
                    />
                    <Search className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* ปุ่มตัวกรองหมวดหมู่สไตล์โมเดิร์น */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
                    <button 
                      onClick={() => setSelectedCategory('all')} 
                      className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm border ${
                        selectedCategory === 'all' 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-orange-500/10' 
                          : 'bg-white/80 hover:bg-orange-50 text-slate-600 border-slate-100'
                      }`}
                    >
                      🔍 ทั้งหมด
                    </button>
                    <button 
                      onClick={() => setSelectedCategory('คาว')} 
                      className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm border ${
                        selectedCategory === 'คาว' 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-orange-500/10' 
                          : 'bg-white/80 hover:bg-orange-50 text-slate-600 border-slate-100'
                      }`}
                    >
                      🍲 อาหารคาว
                    </button>
                    <button 
                      onClick={() => setSelectedCategory('หวาน')} 
                      className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm border ${
                        selectedCategory === 'หวาน' 
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-orange-500/10' 
                          : 'bg-white/80 hover:bg-orange-50 text-slate-600 border-slate-100'
                      }`}
                    >
                      🥤 เครื่องดื่ม / ของหวาน
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-white/50 border border-slate-100/60 px-3.5 py-2 rounded-2xl shadow-sm self-start sm:self-auto">
                    <Compass className="w-3.5 h-3.5 text-orange-500 animate-spin-slow" />
                    <span>พื้นที่จัดส่ง: ทั่วบริเวณวิทยาเขต ม.กาฬสินธุ์</span>
                  </div>
                </div>
              </div>

              {/* 4. รายการอาหาร (Menu Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-white/90 backdrop-blur-xs rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                      item.available
                        ? 'hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] hover:border-orange-200/50 hover:translate-y-[-6px]'
                        : 'opacity-65 grayscale-[30%]'
                    }`}
                  >
                    <div>
                      {/* ภาพอาหาร */}
                      <div className="relative overflow-hidden aspect-[4/3] m-2.5 rounded-2xl shadow-inner">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="bg-white/95 backdrop-blur-md text-[10px] font-black px-2.5 py-1.5 rounded-xl shadow-sm flex items-center gap-1 text-slate-700 border border-slate-100">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span>{item.rating}</span>
                          </span>
                        </div>
                        <button 
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors border border-slate-100"
                        >
                          <Heart className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? 'text-red-500 fill-red-500' : ''}`} />
                        </button>
                        <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-extrabold px-3 py-1.5 rounded-xl border border-white/20">
                          {item.category === 'คาว' ? '🍲 อาหารคาว' : '🥤 ของหวาน'}
                        </span>
                      </div>

                      {/* รายละเอียด */}
                      <div className="px-5 py-3">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                          <Store className="w-3.5 h-3.5 text-orange-500" />
                          <span>{item.restaurant}</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-800 leading-snug group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-3.5">
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{item.prepTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ราคาและการสั่งซื้อ */}
                    <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-4 mt-1">
                      <span className="text-xl font-black text-slate-800">
                        <span className="text-sm font-bold text-orange-500">฿</span>
                        {item.price}
                      </span>
                      <button 
                        disabled={!item.available}
                        onClick={() => openCustomizeModal(item)}
                        className={`px-4 py-3 rounded-2xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 border shadow-sm ${
                          item.available
                            ? 'bg-orange-50 hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 text-orange-600 hover:text-white border-orange-100/60 hover:border-transparent active:scale-95 hover:shadow-orange-500/10'
                            : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.available ? 'เลือกสั่งซื้อ' : 'สินค้าหมด'}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {filteredMenu.length === 0 && (
                  <div className="col-span-full bg-white/70 backdrop-blur-md rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-700">ไม่พบข้อมูลเมนูอาหารที่คุณค้นหา</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">โปรดลองค้นหาอีกครั้งโดยใช้คำใกล้เคียง หรือสลับหมวดหมู่ค้นหาเมนูอื่นๆ</p>
                  </div>
                )}
              </div>

              {/* Footer with Developer Names */}
              <footer className="mt-16 text-center text-xs text-slate-400 space-y-1.5 pb-8 border-t border-slate-200/40 pt-8">
                <p className="font-extrabold text-slate-500 uppercase tracking-widest text-[9px]">Kalasin University Online Project</p>
                <p className="font-bold text-slate-600">คณะผู้พัฒนา: นาย ทรงยศ กองชา และ นาย ชลดรงค์ ยศรุ่งเรือง</p>
                <p>© 2026 KSU Delivery. พัฒนาขึ้นเพื่อการศึกษาวิชา CE6841</p>
              </footer>
            </main>
          )}

          {/* 5. ตะกร้าแบบลอยตัวแถบสรุปราคาด้านล่าง (Shaded Panel Cart Overlay) */}
          <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-[0_-8px_30px_rgba(0,0,0,0.03)] py-4 px-6 border-t border-slate-100/80 z-30">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-105 transition-all"
                >
                  <ShoppingCart className="w-5.5 h-5.5" />
                  {cartItemCount > 0 && (
                    <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div className="hidden sm:block">
                  <p className="text-[10px] text-slate-400 font-bold leading-none uppercase">SHOPPING BAG</p>
                  <p className="text-sm font-extrabold text-slate-700 mt-1">{cartItemCount} รายการพร้อมปรุง</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold leading-none uppercase">NET TOTAL</p>
                  <p className="text-2xl font-black text-slate-800 mt-1">
                    <span className="text-sm font-bold text-orange-500">฿</span>
                    {cartTotal}
                  </p>
                </div>
                
                <button 
                  disabled={cart.length === 0}
                  onClick={() => setIsCartOpen(true)}
                  className={`px-8 py-4 rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 ${
                    cart.length > 0 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[0.99] active:scale-[1.01]' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <span>ตรวจตะกร้า / ชำระเงิน</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 6. Modal เลือกตัวเลือกเสริมของอาหาร (ความเผ็ด/หวาน/ขนาดพิเศษ) */}
          {customizingItem && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white animate-fade-in space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={customizingItem.image}
                      alt={customizingItem.name}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-orange-500 uppercase">{customizingItem.restaurant}</span>
                      <h3 className="font-black text-base text-slate-800">{customizingItem.name}</h3>
                      <p className="text-sm font-black text-orange-600">฿{customizingItem.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCustomizingItem(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{customizingItem.category === 'คาว' ? 'เลือกระดับความเผ็ด' : 'เลือกระดับความหวาน'}</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['น้อย', 'ปกติ', 'มาก'].map(level => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setOptionLevel(level)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          optionLevel === level
                            ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-orange-50'
                        }`}
                      >
                        {customizingItem.category === 'คาว' ? `เผ็ด${level}` : `หวาน${level}`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                    <span>ขนาดปริมาณอาหาร</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsSpecialSize(false)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border text-left flex justify-between items-center ${
                        !isSpecialSize
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>ธรรมดา</span>
                      <span>+฿0</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSpecialSize(true)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold border text-left flex justify-between items-center ${
                        isSpecialSize
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>พิเศษ (เพิ่มปริมาณ)</span>
                      <span>+฿10</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={confirmAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>เพิ่มลงตะกร้า • ฿{customizingItem.price + (isSpecialSize ? 10 : 0)}</span>
                </button>
              </div>
            </div>
          )}

          {/* 7. ใบเสร็จรับเงินดิจิทัล (Digital E-Receipt Modal) */}
          {selectedReceipt && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-fade-in space-y-4">
                <div className="text-center border-b border-dashed border-slate-200 pb-4 space-y-1">
                  <div className="mx-auto w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-base text-slate-800">ใบเสร็จรับเงินดิจิทัล (E-Receipt)</h3>
                  <p className="text-[11px] text-slate-400">รหัสออร์เดอร์: {selectedReceipt.orderId}</p>
                  <p className="text-[10px] text-slate-400">{selectedReceipt.date} เวลา {selectedReceipt.timestamp} น.</p>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-1 text-xs">
                  {selectedReceipt.items.map(item => (
                    <div key={item.cartKey || item.id} className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-bold text-slate-700">{item.name} x{item.quantity}</p>
                        {item.optionText && <p className="text-[10px] text-slate-400">{item.optionText}</p>}
                      </div>
                      <span className="font-extrabold text-slate-800">฿{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>ผู้สั่งซื้อ:</span>
                    <span className="font-bold">{selectedReceipt.customer}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-800">
                    <span>ยอดชำระสุทธิ:</span>
                    <span className="text-orange-600">฿{selectedReceipt.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all"
                >
                  ปิดหน้าต่างใบเสร็จ
                </button>
              </div>
            </div>
          )}

          {/* 8. แผ่นลิ้นชักด้านข้างสำหรับตะกร้าสินค้า (Cart Drawer Modal) */}
          {isCartOpen && (
            <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs flex justify-end z-50 transition-all duration-300">
              <div className="bg-white/95 backdrop-blur-md w-full max-w-md h-full shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col justify-between animate-fade-in relative z-50 border-l border-white/40">
                <div>
                  {/* หัวตะกร้า */}
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm border border-orange-100/50">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-lg text-slate-800">รายการในตะกร้า</h3>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-400 hover:text-orange-600 font-bold transition-all flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  {/* รายการอาหารในตะกร้า */}
                  <div className="p-5 space-y-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.cartKey || item.id} className="flex items-center justify-between gap-3 border-b border-slate-50 pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                          className="w-14 h-14 object-cover rounded-2xl shrink-0 shadow-sm" 
                        />
                        <div className="grow min-w-0">
                          <h4 className="font-extrabold text-sm text-slate-800 truncate leading-snug">{item.name}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{item.optionText || item.restaurant}</p>
                          <p className="text-xs font-black text-orange-600 mt-1">฿{item.price * item.quantity}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                          <button 
                            onClick={() => removeFromCart(item.cartKey)}
                            className="w-5.5 h-5.5 rounded-lg bg-white hover:bg-orange-100 text-slate-600 hover:text-orange-600 font-bold flex items-center justify-center shadow-xs transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => incrementCartItem(item.cartKey)}
                            className="w-5.5 h-5.5 rounded-lg bg-white hover:bg-orange-100 text-slate-600 hover:text-orange-600 font-bold flex items-center justify-center shadow-xs transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => deleteFromCart(item.cartKey)}
                            className="w-5.5 h-5.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 font-bold flex items-center justify-center transition-colors ml-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {cart.length === 0 && (
                      <div className="text-center py-16 text-slate-400 space-y-3">
                        <Utensils className="mx-auto w-10 h-10 text-slate-200" />
                        <p className="text-xs font-extrabold">คุณยังไม่ได้เพิ่มเมนูลงตะกร้าเลยค่ะ</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* สรุปชำระเงินจำลอง */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>ค่าสั่งซื้อรวมทั้งหมด:</span>
                    <span className="font-extrabold text-slate-800">฿{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>ค่าจัดส่งผ่านระบบ ม.:</span>
                    <span className="font-extrabold text-emerald-500 bg-emerald-50 border border-emerald-100/50 px-2 py-0.5 rounded-md">FREE PROMO</span>
                  </div>
                  <hr className="border-slate-200/60" />
                  <div className="flex items-center justify-between text-sm font-black text-slate-800">
                    <span>ราคาสุทธิที่ต้องชำระ:</span>
                    <span className="text-xl text-orange-600">฿{cartTotal}</span>
                  </div>

                  {/* ใบชำระเงินจำลองมาตรฐาน (Static/Dynamic PromptPay QR Layout) */}
                  {cart.length > 0 && (
                    <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3.5 shadow-sm">
                      <div className="w-14 h-14 bg-slate-900 rounded-xl shrink-0 flex flex-col items-center justify-center p-1 border shadow-inner">
                        <div className="text-[7px] text-white font-extrabold tracking-widest leading-none bg-indigo-600 px-1 py-0.5 rounded-sm">PROMPT</div>
                        <div className="w-6 h-6 border-2 border-white/80 border-dashed rounded-md mt-1 opacity-70"></div>
                      </div>
                      <div className="text-left space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <Receipt className="w-3.5 h-3.5 text-indigo-500" />
                          <p className="text-xs font-extrabold text-slate-800">สแกนจ่ายผ่าน PromptPay</p>
                        </div>
                        <p className="text-[10px] text-slate-400">ระบบจำลองการสร้าง QR รหัสธุรกรรมอัตโนมัติ</p>
                      </div>
                    </div>
                  )}

                  <button 
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                    className={`w-full py-4 rounded-2xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 shadow-md ${
                      cart.length > 0
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-[0.99]'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>ชำระเงินและออกใบเสร็จดิจิทัล</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
