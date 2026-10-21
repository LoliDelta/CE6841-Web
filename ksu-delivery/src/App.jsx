import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, LogOut, Plus, Minus, 
  Clock, Utensils, Store, CheckCircle, Trash2, 
  ShieldAlert, Star, Compass, Heart, ChevronRight,
  TrendingUp, Sparkles, ShoppingBag, Receipt, ArrowRight, User,
  LayoutDashboard, PackagePlus, Check, FileText, Flame, SlidersHorizontal, X,
  Bike, ChefHat, ClipboardCheck, Award, MapPin, QrCode
} from 'lucide-react';

// รูปภาพสำรองแบบ SVG Data URI กรณีผู้ใช้เพิ่มลิงก์รูปภายนอกแล้วโหลดไม่ขึ้น
const FALLBACK_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffedd5"/>
      <stop offset="100%" stop-color="#fed7aa"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#bg)"/>
  <circle cx="300" cy="210" r="95" fill="#ffffff" opacity="0.9"/>
  <circle cx="300" cy="210" r="72" fill="#fff7ed" stroke="#f97316" stroke-width="4" stroke-dasharray="8 6"/>
  <text x="300" y="222" text-anchor="middle" font-family="sans-serif" font-size="42">🍲</text>
  <text x="300" y="345" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="22" fill="#9a3412">KSU Fresh Dish</text>
</svg>
`);

const initialMenuData = [
  { 
    id: 1, 
    name: "ข้าวกะเพราหมูสับไข่ดาว", 
    price: 45, 
    category: "คาว", 
    restaurant: "ร้านป้าดาว อาหารตามสั่ง", 
    rating: 4.9, 
    prepTime: "10-15 นาที", 
    available: true, 
    isPopular: true,
    salesCount: 68, 
    description: "กะเพราหมูสับสูตรโบราณผัดไฟแรง รสชาติจัดจ้านหอมใบกะเพราแท้ เสิร์ฟพร้อมไข่ดาวกรอบนอกไข่แดงเยิ้ม", 
    image: "/images/kaprao.jpg" 
  },
  { 
    id: 2, 
    name: "ข้าวผัดหมูสูตรดั้งเดิม", 
    price: 40, 
    category: "คาว", 
    restaurant: "ร้านป้าดาว อาหารตามสั่ง", 
    rating: 4.7, 
    prepTime: "10-15 นาที", 
    available: true, 
    isPopular: false,
    salesCount: 44, 
    description: "ข้าวหอมมะลิผัดไข่ใส่เนื้อหมูหมักนุ่ม หอมกลิ่นกระทะร้อนๆ เสิร์ฟพร้อมมะนาวสด แตงกวา และต้นหอม", 
    image: "/images/friedrice.jpg" 
  },
  { 
    id: 3, 
    name: "ก๋วยเตี๋ยวเรือเส้นเล็กต้มยำ", 
    price: 45, 
    category: "คาว", 
    restaurant: "ก๋วยเตี๋ยวเรือรสเด็ด หน้า ม.", 
    rating: 4.8, 
    prepTime: "10-15 นาที", 
    available: true, 
    isPopular: true,
    salesCount: 59, 
    description: "ก๋วยเตี๋ยวเส้นเล็กเหนียวนุ่ม น้ำซุปต้มยำรสจี๊ดจ๊าดด้วยพริกคั่วหอมและถั่วลิสงบดใหม่ ลูกชิ้นหมูเต็มคำ", 
    image: "/images/noodle.jpg" 
  },
  { 
    id: 4, 
    name: "ตำไทยกุ้งสดรสแซ่บ", 
    price: 55, 
    category: "คาว", 
    restaurant: "ส้มตำแซ่บนัว รั้ว ม.กาฬสินธุ์", 
    rating: 4.9, 
    prepTime: "10-15 นาที", 
    available: true, 
    isPopular: true,
    salesCount: 51, 
    description: "มะละกอกรอบสับสดใหม่ ตำคลุกเคล้ากุ้งสดเนื้อเด้ง รสเปรี้ยวหวานเผ็ดครบรส โรยถั่วลิสงคั่วหอม", 
    image: "/images/somtum.jpg" 
  },
  { 
    id: 5, 
    name: "ชาไทยชงเข้มเย็น", 
    price: 25, 
    category: "หวาน", 
    restaurant: "ชาชงเข้ม หน้า ม.", 
    rating: 4.9, 
    prepTime: "5-10 นาที", 
    available: true, 
    isPopular: true,
    salesCount: 82, 
    description: "ชาไทยสายพันธุ์ดีต้มสดชงเข้มข้น รสชาติหวานมันกลมกล่อม ท็อปปิ้งฟองนมนุ่มๆ สูตรพิเศษคลายร้อน", 
    image: "/images/thaitea.jpg" 
  },
  { 
    id: 6, 
    name: "บิงซูสตรอว์เบอร์รีดับเบิ้ลครีม", 
    price: 89, 
    category: "หวาน", 
    restaurant: "Sweet Cafe KSU", 
    rating: 4.8, 
    prepTime: "15-20 นาที", 
    available: true, 
    isPopular: true,
    salesCount: 37, 
    description: "น้ำแข็งไสเกล็ดหิมะเนื้อปุยนุ่มสไตล์เกาหลี ราดซอสสตรอว์เบอร์รีเข้มข้นและสตรอว์เบอร์รีสดลูกโต", 
    image: "/images/bingsu.jpg" 
  },
  { 
    id: 7, 
    name: "แพนเค้กโรตีกล้วยหอมคาราเมล", 
    price: 39, 
    category: "หวาน", 
    restaurant: "โรตีอินเตอร์ แคมปัส", 
    rating: 4.6, 
    prepTime: "10-15 นาที", 
    available: true, 
    isPopular: false,
    salesCount: 33, 
    description: "แป้งอบร้อนหอมเนยสด สอดไส้กล้วยหอมทองสุกกำลังดี ราดทับด้วยซอสคาราเมลและน้ำผึ้งแท้", 
    image: "/images/roti.jpg" 
  },
  { 
    id: 8, 
    name: "มัทฉะลาเต้เย็นพรีเมียม", 
    price: 35, 
    category: "หวาน", 
    restaurant: "Sweet Cafe KSU", 
    rating: 4.7, 
    prepTime: "5-10 นาที", 
    available: true, 
    isPopular: false,
    salesCount: 46, 
    description: "ผงมัทฉะแท้เกรดพรีเมียมจากญี่ปุ่น ตีสดเข้ากับนมสดรสละมุน หอมกลิ่นชาเขียวแท้สดชื่นตลอดวัน", 
    image: "/images/matcha.jpg" 
  }
];

function App() {
  // โหลดสถานะเริ่มต้นจาก Storage โดยใช้คีย์ v2 เพื่อบังคับโหลดรูปภาพ Local ชุดใหม่ที่ขึ้นครบทุกอัน
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
      const saved = localStorage.getItem('ksu_menu_list_v2');
      return saved ? JSON.parse(saved) : initialMenuData;
    } catch {
      return initialMenuData;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ksu_favorites');
      return saved ? JSON.parse(saved) : [1, 5];
    } catch {
      return [1, 5];
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
  const [deliveryBuilding, setDeliveryBuilding] = useState('อาคารวิศวกรรมศาสตร์ (CE)');

  // ฟอร์มเพิ่มเมนูใหม่ในฝั่ง Admin
  const [newMenuName, setNewMenuName] = useState('');
  const [newMenuPrice, setNewMenuPrice] = useState('');
  const [newMenuCategory, setNewMenuCategory] = useState('คาว');
  const [newMenuRestaurant, setNewMenuRestaurant] = useState('');
  const [newMenuImage, setNewMenuImage] = useState('/images/kaprao.jpg');

  // สถานะจำลองออร์เดอร์หลังสั่งซื้อ
  const [orderStatus, setOrderStatus] = useState(null); // null | 'pending' | 'preparing' | 'delivering' | 'completed'

  // ซิงค์ข้อมูลลง LocalStorage อัตโนมัติ
  useEffect(() => {
    try {
      localStorage.setItem('ksu_menu_list_v2', JSON.stringify(menuList));
    } catch {
      // ignore storage errors
    }
  }, [menuList]);

  useEffect(() => {
    try {
      localStorage.setItem('ksu_cart_v2', JSON.stringify(cart));
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
      building: deliveryBuilding,
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
      rating: 4.9,
      prepTime: "10-15 นาที",
      available: true,
      isPopular: true,
      salesCount: 1,
      description: "เมนูใหม่แนะนำประจำวัน ปรุงสดใหม่ทุกออร์เดอร์สำหรับนักศึกษาและบุคลากร",
      image: newMenuImage || "/images/kaprao.jpg"
    };

    setMenuList(prev => [newEntry, ...prev]);
    setNewMenuName('');
    setNewMenuPrice('');
    setNewMenuRestaurant('');
  };

  const resetDefaultMenus = () => {
    setMenuList(initialMenuData);
    localStorage.setItem('ksu_menu_list_v2', JSON.stringify(initialMenuData));
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
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'fav'
        ? favorites.includes(item.id)
        : item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = orderHistory.reduce((sum, order) => sum + order.total, 0) + 15840;

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans pb-32 text-slate-800 selection:bg-orange-500 selection:text-white">
      
      {/* ─── Premium Shaded / Layered Mesh Gradient Background ─── */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#FFF9F2] via-[#FDFBF7] to-[#FFF3E6] pointer-events-none"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Ambient Mesh Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[75vw] h-[75vw] md:w-[48vw] md:h-[48vw] rounded-full bg-gradient-to-tr from-orange-400/25 via-amber-300/20 to-yellow-200/10 blur-3xl"></div>
        <div className="absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full bg-gradient-to-br from-rose-300/20 via-orange-200/25 to-amber-100/20 blur-3xl"></div>
        <div className="absolute top-[30%] right-[15%] w-[45vw] h-[45vw] md:w-[30vw] md:h-[30vw] rounded-full bg-gradient-to-tr from-amber-200/20 via-orange-100/20 to-sky-200/20 blur-3xl"></div>
        <div className="absolute top-[55%] left-[-8%] w-[38vw] h-[38vw] rounded-full bg-orange-200/25 blur-3xl"></div>
      </div>

      {!user ? (
        // ──────────────── UI เข้าสู่ระบบ (Login Page) ────────────────
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-panel p-8 sm:p-10 rounded-[2rem] w-full max-w-md shadow-[0_24px_60px_rgba(234,88,12,0.12)] border border-white/90 transition-all duration-300 relative overflow-hidden">
            {/* แถบสีตกแต่งด้านบนการ์ด */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500"></div>

            <div className="text-center mb-8 mt-2">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-3xl flex items-center justify-center shadow-xl shadow-orange-500/30 mb-5 transform hover:rotate-6 transition-transform">
                <Utensils className="text-white w-10 h-10" />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-orange-100/80 text-orange-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Smart Campus Food Platform</span>
              </div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent tracking-tight">
                KSU Delivery
              </h1>
              <p className="text-slate-500 mt-1.5 text-sm font-medium">
                ระบบสั่งอาหารออนไลน์มหาวิทยาลัยกาฬสินธุ์
              </p>
              <div className="inline-flex items-center gap-1.5 mt-3 bg-amber-50/90 text-amber-800 text-[11px] font-bold px-3.5 py-1.5 rounded-full border border-amber-200/70 shadow-xs">
                <span>🔐</span>
                <span>สงวนสิทธิ์เฉพาะนักศึกษาและบุคลากร (@ksu.ac.th)</span>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2">
                  อีเมลสถาบันการศึกษา (University Email)
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="student.name@ksu.ac.th" 
                    className={`w-full px-4 py-3.5 rounded-2xl border ${emailError ? 'border-red-400 focus:ring-red-400 bg-red-50/20' : 'border-slate-200 focus:ring-orange-500 bg-white/90'} focus:ring-2 focus:outline-none transition-all shadow-inner text-sm font-medium`}
                  />
                </div>
                {emailError && (
                  <div className="flex items-start gap-2 text-red-600 text-xs mt-3 bg-red-50 p-3 rounded-xl border border-red-200 animate-fade-in">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                    <span>อีเมลไม่ถูกต้อง โปรดใช้อีเมลมหาวิทยาลัยที่ลงท้ายด้วย <strong>@ksu.ac.th</strong> เท่านั้น</span>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.99] flex items-center justify-center gap-2 text-sm"
              >
                <span>เข้าสู่ระบบสั่งอาหาร</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmailInput('student@ksu.ac.th');
                  setEmailError(false);
                }}
                className="w-full py-2.5 text-xs font-extrabold text-orange-700 hover:text-orange-800 bg-orange-100/70 hover:bg-orange-200/70 rounded-xl transition-colors border border-orange-200/60"
              >
                ⚡ คลิกเพื่อกรอกอีเมลสาธิตอัตโนมัติ (student@ksu.ac.th)
              </button>
            </form>

            <div className="mt-8 border-t border-slate-200/60 pt-5 text-center space-y-1.5">
              <span className="text-[10px] text-orange-600 font-extrabold tracking-widest uppercase block">
                Kalasin University • Project CE6841
              </span>
              <p className="text-xs text-slate-600 font-bold">
                คณะผู้พัฒนา: นาย ทรงยศ กองชา และ นาย ชลดรงค์ ยศรุ่งเรือง
              </p>
            </div>
          </div>
        </div>
      ) : (
        // ──────────────── UI หลักตัวแอปพลิเคชัน (Main App Page) ────────────────
        <>
          {/* 1. Header Navigation Bar */}
          <nav className="bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] border-b border-orange-100/80 py-3.5 px-4 sm:px-6 sticky top-0 z-40">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Utensils className="text-white w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-slate-900 to-orange-700 bg-clip-text text-transparent tracking-tight leading-none">
                      KSU Delivery
                    </h1>
                    <span className="hidden sm:inline-block bg-orange-100 text-orange-700 text-[9px] font-black px-2 py-0.5 rounded-md">
                      CE6841
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider block mt-0.5">
                    ระบบสั่งอาหารออนไลน์ ม.กาฬสินธุ์
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* ปุ่มสลับมุมมอง ลูกค้า / ผู้ดูแลร้านค้า ตามขอบเขตบทที่ 1 */}
                <button
                  onClick={() => setActiveView(activeView === 'customer' ? 'admin' : 'customer')}
                  className={`flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-2.5 rounded-2xl transition-all border shadow-xs ${
                    activeView === 'admin'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-600 border-slate-200/80'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-orange-500" />
                  <span>{activeView === 'customer' ? 'ระบบหลังร้าน (Admin)' : 'หน้าสั่งอาหาร'}</span>
                </button>

                <div className="hidden md:flex items-center gap-2.5 bg-orange-50/60 border border-orange-100 p-1.5 pr-4 rounded-2xl">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] text-slate-400 font-bold leading-none">นักศึกษา/บุคลากร</span>
                    <span className="text-xs font-extrabold text-slate-700 mt-0.5 leading-none truncate max-w-[140px]">{user}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-extrabold text-red-600 hover:text-white hover:bg-red-500 bg-red-50/90 border border-red-100 px-3.5 py-2.5 rounded-2xl transition-all active:scale-95 shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </nav>

          {/* 2. ระบบแสดงสถานะออร์เดอร์แบบ Stepper 4 ขั้นตอน (Simulated Live Tracking) */}
          {orderStatus && (
            <div className="max-w-6xl mx-auto mt-6 px-4 animate-fade-in">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_15px_40px_rgba(234,88,12,0.1)] border border-orange-200/70 p-6 space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-2 bg-orange-100/80 text-orange-700 px-3 py-1 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                      </span>
                      <span className="text-[10px] font-black tracking-wider uppercase">Real-Time Order Tracking</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800">
                      {orderStatus === 'pending' && '📝 ร้านค้าได้รับคำสั่งซื้อแล้ว กำลังตรวจสอบรายการ'}
                      {orderStatus === 'preparing' && '🍳 พ่อครัวกำลังปรุงอาหารของคุณอย่างพิถีพิถัน'}
                      {orderStatus === 'delivering' && `🛵 ไรเดอร์กำลังนำอาหารไปส่งที่ ${deliveryBuilding}`}
                      {orderStatus === 'completed' && '🎉 จัดส่งอาหารถึงมือคุณเรียบร้อยแล้ว ทานให้อร่อยนะครับ!'}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {orderHistory.length > 0 && (
                      <button
                        onClick={() => setSelectedReceipt(orderHistory[0])}
                        className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-extrabold px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 border border-orange-200"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>ดูใบเสร็จดิจิทัล</span>
                      </button>
                    )}
                    {orderStatus === 'completed' && (
                      <button 
                        onClick={() => setOrderStatus(null)}
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-4 py-2.5 rounded-2xl transition-all"
                      >
                        เสร็จสิ้น
                      </button>
                    )}
                  </div>
                </div>

                {/* 4-Step Visual Progress */}
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {[
                    { key: 'pending', label: 'รับออร์เดอร์', icon: ClipboardCheck },
                    { key: 'preparing', label: 'กำลังปรุงสด', icon: ChefHat },
                    { key: 'delivering', label: 'กำลังนำส่ง', icon: Bike },
                    { key: 'completed', label: 'ส่งสำเร็จ', icon: CheckCircle }
                  ].map((step, index) => {
                    const stepOrder = ['pending', 'preparing', 'delivering', 'completed'];
                    const currentIdx = stepOrder.indexOf(orderStatus);
                    const isDone = index <= currentIdx;
                    const IconComp = step.icon;
                    return (
                      <div key={step.key} className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${
                        isDone 
                          ? 'bg-gradient-to-b from-orange-50 to-amber-50/50 border-orange-200 text-orange-700 shadow-xs' 
                          : 'bg-slate-50/60 border-slate-100 text-slate-400'
                      }`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 ${
                          isDone ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30' : 'bg-slate-200/70 text-slate-400'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] font-extrabold text-center">{step.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeView === 'admin' ? (
            // ──────────────── มุมมองผู้ดูแลระบบและร้านค้า (Administrator Module) ────────────────
            <main className="max-w-6xl mx-auto mt-6 px-4 space-y-6 animate-fade-in">
              <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100 px-2.5 py-1 rounded-full">
                    Administrator & Restaurant Portal
                  </span>
                  <h2 className="text-2xl font-black text-slate-800 mt-2">แผงควบคุมร้านค้าและวิเคราะห์ยอดขาย</h2>
                  <p className="text-xs text-slate-500">บริหารจัดการเมนูอาหาร สถานะคำสั่งซื้อเรียลไทม์ และสรุปสถิติรายได้ตามขอบเขตโครงงาน</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white px-5 py-3 rounded-2xl shadow-md shadow-orange-500/20">
                    <span className="text-[10px] font-bold uppercase block opacity-90">ยอดขายสะสมรวม</span>
                    <span className="text-xl font-black">฿{totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-xs">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase block">ออร์เดอร์ทั้งหมด</span>
                    <span className="text-xl font-black text-slate-800">{orderHistory.length + 24} รายการ</span>
                  </div>
                  <button
                    onClick={resetDefaultMenus}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-extrabold px-4 py-3 rounded-2xl transition-colors"
                  >
                    รีเซ็ตเมนูเริ่มต้น
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ฟอร์มเพิ่มเมนูใหม่ (CMS) */}
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm space-y-4">
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
                        placeholder="เช่น ข้าวหมูทอดกระเทียมพริกไทย"
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
                    <div>
                      <label className="font-bold text-slate-600 block mb-1">เลือกรูปภาพอาหาร (ในเครื่อง)</label>
                      <select
                        value={newMenuImage}
                        onChange={(e) => setNewMenuImage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                      >
                        <option value="/images/kaprao.jpg">ภาพข้าวกะเพรา / อาหารจานเดียว</option>
                        <option value="/images/friedrice.jpg">ภาพข้าวผัด</option>
                        <option value="/images/noodle.jpg">ภาพก๋วยเตี๋ยวต้มยำ</option>
                        <option value="/images/somtum.jpg">ภาพส้มตำ / ยำ</option>
                        <option value="/images/thaitea.jpg">ภาพชาไทย / เครื่องดื่มเย็น</option>
                        <option value="/images/bingsu.jpg">ภาพบิงซู / ไอศกรีม</option>
                        <option value="/images/roti.jpg">ภาพโรตี / แพนเค้ก</option>
                        <option value="/images/matcha.jpg">ภาพมัทฉะชาเขียว</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black py-3 rounded-xl shadow-md transition-all"
                    >
                      + บันทึกเมนูใหม่เข้าระบบ
                    </button>
                  </form>

                  {/* ควบคุมสถานะออร์เดอร์ปัจจุบันด้วยมือ */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <span className="font-extrabold text-xs text-slate-700 block">แผงควบคุมสถานะการจัดส่งเรียลไทม์</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                      <button onClick={() => setOrderStatus('pending')} className="py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200/60">1. รับออร์เดอร์</button>
                      <button onClick={() => setOrderStatus('preparing')} className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60">2. กำลังปรุง</button>
                      <button onClick={() => setOrderStatus('delivering')} className="py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200/60">3. กำลังจัดส่ง</button>
                      <button onClick={() => setOrderStatus('completed')} className="py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/60">4. ส่งสำเร็จ</button>
                    </div>
                  </div>
                </div>

                {/* ตารางจัดการเมนูและสถิติยอดขายรายเมนู */}
                <div className="lg:col-span-2 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-white shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <h3 className="font-extrabold text-base text-slate-800">รายการเมนูและสถิติยอดขาย ({menuList.length} เมนู)</h3>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
                    {menuList.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/90 border border-slate-100 hover:border-orange-200 transition-colors">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; }}
                            className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-xs border border-white"
                          />
                          <div className="min-w-0">
                            <h4 className="font-extrabold text-sm text-slate-800 truncate">{item.name}</h4>
                            <p className="text-[11px] text-slate-500 font-medium">{item.restaurant} • <span className="text-orange-600 font-bold">฿{item.price}</span></p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min(100, (item.salesCount || 10) * 1.2)}%` }}></div>
                              </div>
                              <span className="text-[10px] font-bold text-slate-500">ขายแล้ว {item.salesCount || 0} จาน</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => toggleMenuAvailability(item.id)}
                            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-colors ${
                              item.available
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            }`}
                          >
                            {item.available ? '● พร้อมขาย' : '○ หมดชั่วคราว'}
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
            <main className="max-w-6xl mx-auto mt-6 px-4 space-y-8">
              
              {/* Hero Banner สไตล์ Modern Food Delivery */}
              <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-slate-900 via-orange-950 to-amber-900 text-white shadow-[0_20px_50px_rgba(234,88,12,0.18)] border border-orange-500/20">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-7 p-6 sm:p-10 space-y-5 z-10">
                    <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 text-orange-300 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase backdrop-blur-md">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>KSU Campus Exclusive • ส่งฟรีทุกตึกเรียน</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black leading-tight tracking-tight">
                      อิ่มอร่อยทั่วรั้ว <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">ม.กาฬสินธุ์</span> สั่งง่าย ส่งไว ไม่คิดค่า GP
                    </h2>
                    <p className="text-xs sm:text-sm text-orange-100/80 leading-relaxed max-w-xl">
                      รวมร้านอาหารตามสั่ง ก๋วยเตี๋ยวรสเด็ด และคาเฟ่เครื่องดื่มยอดฮิตหน้ามหาวิทยาลัย สั่งล่วงหน้าไม่ต้องรอคิว พร้อมระบบติดตามสถานะปรุงสดแบบเรียลไทม์
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
                        <Award className="w-5 h-5 text-amber-400" />
                        <div>
                          <span className="text-xs font-black block">8+ เมนูยอดฮิต</span>
                          <span className="text-[10px] text-orange-200/80">คัดสรรร้านดังรอบ ม.</span>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-2.5">
                        <Bike className="w-5 h-5 text-emerald-400" />
                        <div>
                          <span className="text-xs font-black block">ส่งไว 10-20 นาที</span>
                          <span className="text-[10px] text-orange-200/80">ส่งตรงถึงอาคารเรียน</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ภาพจานเด่นด้านขวาของ Hero Banner */}
                  <div className="lg:col-span-5 h-60 lg:h-full relative overflow-hidden">
                    <img
                      src="/images/kaprao.jpg"
                      alt="KSU Featured Dish"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; }}
                      className="w-full h-full object-cover lg:scale-105 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 p-3.5 rounded-2xl shadow-xl border border-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                        #1
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold text-orange-600 uppercase block">เมนูขายดีอันดับ 1</span>
                        <p className="text-xs font-black text-slate-800">ข้าวกะเพราหมูสับไข่ดาว • ฿45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* แผงค้นหาและตัวกรองหมวดหมู่สไตล์ Glassmorphism */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_12px_35px_rgba(0,0,0,0.03)] border border-white space-y-5">
                <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                  {/* ปุ่มตัวกรองหมวดหมู่สไตล์โมเดิร์น */}
                  <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                    {[
                      { id: 'all', label: '🍽️ เมนูทั้งหมด', count: menuList.length },
                      { id: 'คาว', label: '🍲 อาหารจานหลัก', count: menuList.filter(m => m.category === 'คาว').length },
                      { id: 'หวาน', label: '🥤 ของหวาน & เครื่องดื่ม', count: menuList.filter(m => m.category === 'หวาน').length },
                      { id: 'fav', label: '❤️ เมนูที่ถูกใจ', count: favorites.length },
                    ].map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap shadow-xs border flex items-center gap-2 ${
                          selectedCategory === cat.id
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                            : 'bg-white hover:bg-orange-50/80 text-slate-600 border-slate-200/70'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  {/* กล่องค้นหารายการอาหาร */}
                  <div className="relative md:w-80">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ค้นหาชื่อเมนู หรือ ชื่อร้านอาหาร..." 
                      className="w-full px-4 py-3 pl-10 rounded-2xl bg-slate-50/90 border border-slate-200/80 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all text-xs font-semibold"
                    />
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 4. รายการอาหาร (Menu Grid - รูปขึ้นครบ 100%) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMenu.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-white/95 backdrop-blur-md rounded-[1.75rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-white overflow-hidden transition-all duration-300 flex flex-col justify-between group ${
                      item.available
                        ? 'hover:shadow-[0_22px_45px_rgba(234,88,12,0.12)] hover:border-orange-200 hover:-translate-y-1.5'
                        : 'opacity-65 grayscale-[35%]'
                    }`}
                  >
                    <div>
                      {/* ภาพอาหารพร้อมระบบป้องกันภาพเสีย 2 ชั้น */}
                      <div className="relative overflow-hidden aspect-[4/3] m-2 rounded-2xl bg-orange-50">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          loading="eager"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>

                        {/* ป้าย Rating + ขายดี */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="bg-white/95 backdrop-blur-md text-[10px] font-black px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 text-slate-800">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>{item.rating}</span>
                          </span>
                          {item.isPopular && (
                            <span className="bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl shadow-sm">
                              🔥 ขายดี
                            </span>
                          )}
                        </div>

                        {/* ปุ่มหัวใจ */}
                        <button 
                          onClick={() => toggleFavorite(item.id)}
                          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm text-slate-400 hover:text-rose-500 transition-transform active:scale-90"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
                        </button>

                        {/* ป้ายเวลาและหมวดหมู่ด้านล่างภาพ */}
                        <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white">
                          <span className="text-[10px] font-bold bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Clock className="w-3 h-3 text-orange-300" />
                            <span>{item.prepTime}</span>
                          </span>
                          <span className="bg-orange-500/90 backdrop-blur-xs text-white text-[9px] font-extrabold px-2.5 py-1 rounded-lg">
                            {item.category === 'คาว' ? 'อาหารคาว' : 'ของหวาน/น้ำ'}
                          </span>
                        </div>
                      </div>

                      {/* รายละเอียดเมนู */}
                      <div className="px-4 pt-2 pb-3">
                        <div className="flex items-center gap-1 text-[10px] font-extrabold text-orange-600 mb-1 truncate">
                          <Store className="w-3 h-3 shrink-0" />
                          <span className="truncate">{item.restaurant}</span>
                        </div>
                        <h3 className="font-black text-base text-slate-800 leading-snug group-hover:text-orange-600 transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* ราคาและปุ่มสั่งซื้อ */}
                    <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-slate-100/80 mt-1">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block leading-none">ราคาเริ่มต้น</span>
                        <span className="text-xl font-black text-slate-900">
                          <span className="text-xs font-extrabold text-orange-500 mr-0.5">฿</span>
                          {item.price}
                        </span>
                      </div>
                      <button 
                        disabled={!item.available}
                        onClick={() => openCustomizeModal(item)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 flex items-center gap-1.5 shadow-sm ${
                          item.available
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{item.available ? 'ใส่ตะกร้า' : 'หมดชั่วคราว'}</span>
                      </button>
                    </div>
                  </div>
                ))}

                {filteredMenu.length === 0 && (
                  <div className="col-span-full bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-white shadow-sm space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-700">ไม่พบข้อมูลเมนูอาหารที่คุณค้นหา</h3>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">โปรดลองค้นหาอีกครั้งโดยใช้คำใกล้เคียง หรือกดดูหมวดหมู่ทั้งหมด</p>
                    <button
                      onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold"
                    >
                      แสดงเมนูทั้งหมด
                    </button>
                  </div>
                )}
              </div>

              {/* Footer with Developer Names */}
              <footer className="mt-14 text-center text-xs text-slate-500 space-y-1.5 pb-6 border-t border-orange-200/40 pt-8">
                <div className="inline-flex items-center gap-1.5 bg-white/80 border border-orange-100 px-3.5 py-1 rounded-full text-[10px] font-extrabold text-orange-600 uppercase tracking-widest shadow-xs">
                  <Compass className="w-3 h-3" />
                  <span>Kalasin University Online Food Ordering System</span>
                </div>
                <p className="font-extrabold text-slate-700 text-sm pt-1">
                  คณะผู้พัฒนา: นาย ทรงยศ กองชา และ นาย ชลดรงค์ ยศรุ่งเรือง
                </p>
                <p className="text-[11px] text-slate-400">© 2026 KSU Delivery. โครงงานรายวิชา CE6841 มหาวิทยาลัยกาฬสินธุ์</p>
              </footer>
            </main>
          )}

          {/* 5. ตะกร้าแบบลอยตัวแถบสรุปราคาด้านล่าง (Floating Bottom Bar) */}
          <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl shadow-[0_-10px_35px_rgba(0,0,0,0.06)] py-3.5 px-4 sm:px-6 border-t border-orange-100 z-30">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3.5">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative w-12 h-12 bg-gradient-to-tr from-orange-500 to-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
                >
                  <ShoppingCart className="w-5.5 h-5.5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-black w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                      {cartItemCount}
                    </span>
                  )}
                </button>
                <div>
                  <p className="text-[10px] text-slate-400 font-extrabold leading-none uppercase tracking-wider">ตะกร้าสินค้าของคุณ</p>
                  <p className="text-sm font-black text-slate-800 mt-1">{cartItemCount} รายการ • จัดส่งฟรีใน ม.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-extrabold leading-none uppercase">ยอดสุทธิ</p>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    <span className="text-sm font-bold text-orange-500">฿</span>
                    {cartTotal}
                  </p>
                </div>
                
                <button 
                  disabled={cart.length === 0}
                  onClick={() => setIsCartOpen(true)}
                  className={`px-5 sm:px-7 py-3.5 rounded-2xl text-xs font-black transition-all shadow-md flex items-center gap-2 ${
                    cart.length > 0 
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/20 active:scale-95' 
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
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white animate-fade-in space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={customizingItem.image}
                      alt={customizingItem.name}
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; }}
                      className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-orange-100"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-orange-600 uppercase">{customizingItem.restaurant}</span>
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

                <div className="space-y-2.5">
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
                        className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
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

                <div className="space-y-2.5">
                  <label className="flex items-center gap-1.5 text-xs font-extrabold text-slate-700">
                    <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                    <span>ขนาดปริมาณอาหาร</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsSpecialSize(false)}
                      className={`py-3 px-4 rounded-xl text-xs font-extrabold border text-left flex justify-between items-center ${
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
                      className={`py-3 px-4 rounded-xl text-xs font-extrabold border text-left flex justify-between items-center ${
                        isSpecialSize
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      <span>พิเศษ (อิ่มจุใจ)</span>
                      <span>+฿10</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={confirmAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>เพิ่มลงตะกร้า • ฿{customizingItem.price + (isSpecialSize ? 10 : 0)}</span>
                </button>
              </div>
            </div>
          )}

          {/* 7. ใบเสร็จรับเงินดิจิทัล (Digital E-Receipt Modal) */}
          {selectedReceipt && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-fade-in space-y-4">
                <div className="text-center border-b border-dashed border-slate-200 pb-4 space-y-1">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-100">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Payment Verified</span>
                  <h3 className="font-black text-base text-slate-800">ใบเสร็จรับเงินดิจิทัล (E-Receipt)</h3>
                  <p className="text-xs font-bold text-orange-600">หมายเลขคำสั่งซื้อ: {selectedReceipt.orderId}</p>
                  <p className="text-[10px] text-slate-400">{selectedReceipt.date} เวลา {selectedReceipt.timestamp} น.</p>
                </div>

                <div className="space-y-2.5 max-h-52 overflow-y-auto custom-scrollbar pr-1 text-xs">
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
                    <span>จุดจัดส่ง:</span>
                    <span className="font-bold text-slate-700">{selectedReceipt.building}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>ผู้สั่งซื้อ:</span>
                    <span className="font-bold text-slate-700">{selectedReceipt.customer}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-slate-800 pt-1">
                    <span>ยอดชำระสุทธิ:</span>
                    <span className="text-orange-600">฿{selectedReceipt.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-all"
                >
                  ปิดหน้าต่างใบเสร็จ
                </button>
              </div>
            </div>
          )}

          {/* 8. แผ่นลิ้นชักด้านข้างสำหรับตะกร้าสินค้า (Cart Drawer Modal) */}
          {isCartOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50 transition-all duration-300">
              <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-fade-in relative z-50">
                <div className="overflow-y-auto custom-scrollbar">
                  {/* หัวตะกร้า */}
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
                        <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-black text-base text-slate-800">ตะกร้าสั่งอาหาร</h3>
                        <p className="text-[10px] text-slate-400 font-bold">ตรวจสอบรายการและเลือกตึกจัดส่ง</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-orange-50 text-slate-500 hover:text-orange-600 font-bold transition-all flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  {/* เลือกอาคารจัดส่งในมหาวิทยาลัย */}
                  {cart.length > 0 && (
                    <div className="px-5 pt-4">
                      <label className="flex items-center gap-1.5 text-[11px] font-extrabold text-slate-600 mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span>จุดนัดรับอาหารภายใน ม.กาฬสินธุ์</span>
                      </label>
                      <select
                        value={deliveryBuilding}
                        onChange={(e) => setDeliveryBuilding(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="อาคารวิศวกรรมศาสตร์ (CE)">อาคารวิศวกรรมศาสตร์ (CE)</option>
                        <option value="อาคารเรียนรวมและปฏิบัติการ">อาคารเรียนรวมและปฏิบัติการ</option>
                        <option value="หอพักนักศึกษาในกำกับ">หอพักนักศึกษาในกำกับ</option>
                        <option value="สำนักวิทยบริการ (ห้องสมุด)">สำนักวิทยบริการ (ห้องสมุด)</option>
                      </select>
                    </div>
                  )}

                  {/* รายการอาหารในตะกร้า */}
                  <div className="p-5 space-y-3.5">
                    {cart.map(item => (
                      <div key={item.cartKey || item.id} className="flex items-center justify-between gap-3 border border-slate-100 bg-slate-50/50 p-3 rounded-2xl">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; }}
                          className="w-14 h-14 object-cover rounded-xl shrink-0 shadow-xs" 
                        />
                        <div className="grow min-w-0">
                          <h4 className="font-extrabold text-xs text-slate-800 truncate">{item.name}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">{item.optionText || item.restaurant}</p>
                          <p className="text-xs font-black text-orange-600 mt-1">฿{item.price * item.quantity}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 bg-white p-1 rounded-xl border border-slate-200/70">
                          <button 
                            onClick={() => removeFromCart(item.cartKey)}
                            className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-orange-100 text-slate-600 hover:text-orange-600 font-bold flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-slate-800">{item.quantity}</span>
                          <button 
                            onClick={() => incrementCartItem(item.cartKey)}
                            className="w-6 h-6 rounded-lg bg-slate-50 hover:bg-orange-100 text-slate-600 hover:text-orange-600 font-bold flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => deleteFromCart(item.cartKey)}
                            className="w-6 h-6 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 font-bold flex items-center justify-center transition-colors ml-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {cart.length === 0 && (
                      <div className="text-center py-16 text-slate-400 space-y-3">
                        <Utensils className="mx-auto w-12 h-12 text-slate-200" />
                        <p className="text-xs font-extrabold">ยังไม่มีรายการอาหารในตะกร้า</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* สรุปชำระเงินจำลองพร้อม QR Code */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>ค่าอาหารรวม ({cartItemCount} รายการ):</span>
                    <span className="font-extrabold text-slate-800">฿{cartTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>ค่าจัดส่งภายในวิทยาเขต:</span>
                    <span className="font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[10px]">ส่งฟรี (฿0)</span>
                  </div>
                  <hr className="border-slate-200" />
                  <div className="flex items-center justify-between text-sm font-black text-slate-800">
                    <span>ยอดชำระสุทธิ:</span>
                    <span className="text-xl text-orange-600">฿{cartTotal}</span>
                  </div>

                  {/* คิวอาร์โค้ด PromptPay จำลอง */}
                  {cart.length > 0 && (
                    <div className="bg-white rounded-2xl p-3 border border-slate-200 flex items-center gap-3.5 shadow-xs">
                      <div className="w-14 h-14 bg-indigo-950 rounded-xl shrink-0 flex flex-col items-center justify-center p-1.5 text-white">
                        <span className="text-[7px] font-black tracking-widest bg-indigo-600 px-1.5 py-0.5 rounded-xs mb-1">PROMPTPAY</span>
                        <QrCode className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left space-y-0.5">
                        <p className="text-xs font-extrabold text-slate-800">สแกน QR PromptPay (จำลอง)</p>
                        <p className="text-[10px] text-slate-500">คลิกปุ่มด้านล่างเพื่อจำลองการชำระเงินและรับใบเสร็จ E-Receipt ทันที</p>
                      </div>
                    </div>
                  )}

                  <button 
                    disabled={cart.length === 0}
                    onClick={handleCheckout}
                    className={`w-full py-4 rounded-2xl text-xs font-black transition-all text-center flex items-center justify-center gap-2 shadow-lg ${
                      cart.length > 0
                        ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/25 active:scale-[0.99]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>ยืนยันการชำระเงินและสั่งอาหาร</span>
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
