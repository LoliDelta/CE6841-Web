import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, LogOut, LogIn, Plus, Minus, 
  Clock, Utensils, Store, CheckCircle, Trash2, 
  ShieldAlert, Star, Compass, MapPin, Heart, ChevronRight
} from 'lucide-react';

const menuData = [
  { id: 1, name: "ข้าวกะเพราหมูสับไข่ดาว", price: 45, category: "คาว", restaurant: "ร้านป้าดาว อาหารตามสั่ง", rating: 4.8, prepTime: "15-20 นาที", description: "กะเพราหมูสับสูตรโบราณ รสชาติจัดจ้าน หอมใบกะเพราป่า เสิร์ฟพร้อมไข่ดาวกรอบนอกไข่แดงเยิ้ม", image: "https://images.unsplash.com/photo-1626804475297-4160aae01fdb?w=600&q=80" },
  { id: 2, name: "ข้าวผัดหมูสูตรดั้งเดิม", price: 40, category: "คาว", restaurant: "ร้านป้าดาว อาหารตามสั่ง", rating: 4.5, prepTime: "10-15 นาที", description: "ข้าวผัดไข่ใส่เนื้อหมูนุ่มหมักสูตรพิเศษ หอมกลิ่นกระทะร้อนๆ เสิร์ฟพร้อมมะนาวสดแตงกวาและต้นหอม", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80" },
  { id: 3, name: "ก๋วยเตี๋ยวเรือเส้นเล็กต้มยำ", price: 45, category: "คาว", restaurant: "ก๋วยเตี๋ยวเรือรสเด็ด", rating: 4.7, prepTime: "10-15 นาที", description: "ก๋วยเตี๋ยวเส้นเล็กเหนียวนุ่ม ปรุงรสต้มยำสูตรจี๊ดจ๊าดด้วยพริกคั่วหอมและถั่วลิสงบด ลูกชิ้นเต็มคำ", image: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=600&q=80" },
  { id: 4, name: "ชาไทยชงเข้มเย็น", price: 25, category: "หวาน", restaurant: "ชาชงเข้ม หน้า ม.", rating: 4.9, prepTime: "5-10 นาที", description: "ชาไทยสายพันธุ์ดีต้มสดชงเข้มข้น รสชาติหวานมันกลมกล่อม ท็อปปิ้งฟองนมนุ่มๆ สูตรพิเศษ", image: "https://images.unsplash.com/photo-1558857563-b37102e95a00?w=600&q=80" },
  { id: 5, name: "บิงซูสตรอว์เบอร์รีดับเบิ้ลครีม", price: 89, category: "หวาน", restaurant: "Sweet Cafe", rating: 4.6, prepTime: "15-25 นาที", description: "น้ำแข็งไสเกล็ดหิมะเนื้อปุยนุ่มสไตล์เกาหลี ราดด้วยซอสสตรอว์เบอร์รีเข้มข้นและผลสตรอว์เบอร์รีสดรสเปรี้ยวหวาน", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80" },
  { id: 6, name: "โรตีกล้วยหอมช็อกโกแลต", price: 35, category: "หวาน", restaurant: "โรตีอินเตอร์", rating: 4.4, prepTime: "10-15 นาที", description: "แป้งโรตีนวดมือทอดจนกรอบนอกนุ่มใน สอดไส้กล้วยหอมทองหั่นแว่น ราดทับด้วยนมข้นหวานและซอสช็อกโกแลต", image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=80" }
];

function App() {
  const [user, setUser] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // สถานะจำลองออร์เดอร์หลังสั่งซื้อ
  const [orderStatus, setOrderStatus] = useState(null); // 'idle', 'pending', 'preparing', 'delivering', 'completed'
  const [orderTimeLeft, setOrderTimeLeft] = useState(0);

  // เช็คข้อมูลเข้าสู่ระบบใน SessionStorage
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const savedEmail = sessionStorage.getItem('userEmail');
    if (isLoggedIn && savedEmail) {
      setUser(savedEmail);
    }
  }, []);

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
      }, 6000); // เปลี่ยนสถานะทุกๆ 6 วินาที
    }
    return () => clearTimeout(timer);
  }, [orderStatus]);

  // ระบบเข้าสู่ระบบ
  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedEmail = emailInput.trim();
    if (trimmedEmail.endsWith('@ksu.ac.th')) {
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
  };

  // จัดการตะกร้าสินค้า
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => 
      prevCart.map(cartItem => {
        if (cartItem.id === itemId) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      }).filter(cartItem => cartItem.quantity > 0)
    );
  };

  const deleteFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // ยืนยันการสั่งซื้อ
  const handleCheckout = () => {
    if (cart.length === 0) return;
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

  // การกรองเมนู
  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!user) {
    // ---------------- UI เข้าสู่ระบบ (Login Page) ----------------
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* แอนิเมชันลูกบอลสีส้มตกแต่งพื้นหลัง */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-200/40 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-orange-300/30 blur-3xl"></div>

        <div className="glass-panel p-8 rounded-3xl w-full max-w-md shadow-2xl relative z-10 border border-white/60">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mb-4 animate-bounce">
              <Utensils className="text-white w-9 h-9" />
            </div>
            <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight">KSU Delivery</h1>
            <p className="text-gray-500 mt-2 text-sm">บริการสั่งอาหารออนไลน์ของมหาวิทยาลัยกาฬสินธุ์</p>
            <span className="inline-block mt-3 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
              🔒 สงวนสิทธิ์เฉพาะนักศึกษาและบุคลากร
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                อีเมลมหาวิทยาลัย (@ksu.ac.th)
              </label>
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ชื่อของคุณ.นามสกุล@ksu.ac.th" 
                className={`w-full px-4 py-3 rounded-xl border ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-orange-500'} focus:ring-2 focus:outline-none transition-all shadow-sm bg-white/70`}
              />
              {emailError && (
                <div className="flex items-center gap-1.5 text-red-500 text-xs mt-2.5 bg-red-50 p-2.5 rounded-lg">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>ขออภัย ระบบอนุญาตให้ใช้เฉพาะอีเมล @ksu.ac.th เท่านั้น</span>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-xl hover:translate-y-[-1px] active:translate-y-[1px]"
            >
              เข้าสู่ระบบด้วยเมลสถาบัน
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            © 2026 KSU Delivery. พัฒนาขึ้นเพื่อการศึกษาวิชา CE6841
          </p>
        </div>
      </div>
    );
  }

  // ---------------- UI หลักตัวแอปพลิเคชัน (Main App Page) ----------------
  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* 1. แถบนำทางด้านบน */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 py-3.5 px-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-500/20">
              <Utensils className="text-white w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-orange-600 tracking-tight leading-none">KSU Delivery</h1>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Kalasin University</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-gray-400 font-medium">บัญชีผู้ใช้</span>
              <span className="text-sm font-semibold text-gray-700">{user}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/70 px-3.5 py-2 rounded-xl transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. ตัวอัปเดตสถานะการส่งออร์เดอร์จำลอง (Order Status Component) */}
      {orderStatus && (
        <div className="max-w-6xl mx-auto mt-4 px-4">
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-sm font-bold text-orange-600">กำลังติดตามออร์เดอร์ของคุณ</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-800">
                {orderStatus === 'pending' && '📝 ระบบได้รับคำสั่งซื้อของคุณแล้ว'}
                {orderStatus === 'preparing' && '🍳 ห้องครัวกำลังปรุงอาหารจานร้อนให้คุณ'}
                {orderStatus === 'delivering' && '🛵 พนักงานจัดส่งกำลังมุ่งหน้าไปหาคุณ'}
                {orderStatus === 'completed' && '✅ จัดส่งสำเร็จแล้ว ทานให้อร่อยนะคะ!'}
              </h3>
              <p className="text-xs text-gray-400">สั่งผ่านโปรโตคอล WebSockets จำลองความคืบหน้าแบบเรียลไทม์</p>
            </div>

            {/* แถบหลอดไฟสถานะแบบวงจรวิชาการ */}
            <div className="flex items-center gap-4 grow max-w-lg">
              <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
                <div 
                  className={`h-full transition-all duration-700 bg-gradient-to-r from-orange-400 to-orange-600 ${
                    orderStatus === 'pending' ? 'w-1/4' :
                    orderStatus === 'preparing' ? 'w-2/4' :
                    orderStatus === 'delivering' ? 'w-3/4' : 'w-full bg-green-500'
                  }`}
                />
              </div>
              <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-100 text-sm">
                {orderStatus === 'pending' && '25%'}
                {orderStatus === 'preparing' && '50%'}
                {orderStatus === 'delivering' && '75%'}
                {orderStatus === 'completed' && '🎉'}
              </div>
              {orderStatus === 'completed' && (
                <button 
                  onClick={() => setOrderStatus(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
                >
                  ปิดหน้านี้
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. เนื้อหาหลักแอปพลิเคชัน */}
      <main className="max-w-6xl mx-auto mt-6 px-4">
        
        {/* ส่วนค้นหาและตัวกรองสไตล์โมเดิร์น */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8 space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">เลือกสั่งอาหารจานโปรดของคุณ</h2>
              <p className="text-xs text-gray-400">ส่งตรงถึงตึกเรียนและหอพักในมหาวิทยาลัยกาฬสินธุ์</p>
            </div>
            
            {/* กล่องค้นหารายการอาหาร */}
            <div className="relative md:w-80">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่ออาหารหรือชื่อร้านค้า..." 
                className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all shadow-inner text-sm"
              />
              <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* ปุ่มตัวกรองหมวดหมู่ */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0">
              <button 
                onClick={() => setSelectedCategory('all')} 
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                  selectedCategory === 'all' 
                    ? 'bg-orange-500 text-white shadow-orange-500/20' 
                    : 'bg-slate-100 hover:bg-orange-50 text-gray-600'
                }`}
              >
                🔍 ทั้งหมด
              </button>
              <button 
                onClick={() => setSelectedCategory('คาว')} 
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                  selectedCategory === 'คาว' 
                    ? 'bg-orange-500 text-white shadow-orange-500/20' 
                    : 'bg-slate-100 hover:bg-orange-50 text-gray-600'
                }`}
              >
                🍲 อาหารคาว
              </button>
              <button 
                onClick={() => setSelectedCategory('หวาน')} 
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                  selectedCategory === 'หวาน' 
                    ? 'bg-orange-500 text-white shadow-orange-500/20' 
                    : 'bg-slate-100 hover:bg-orange-50 text-gray-600'
                }`}
              >
                🥤 ของหวาน / เครื่องดื่ม
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-gray-400">
              <Compass className="w-3.5 h-3.5" />
              <span>ความเร็วเฉลี่ยจัดส่ง: 15-20 นาที</span>
            </div>
          </div>
        </div>

        {/* 4. รายการอาหาร (Menu Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:translate-y-[-4px]"
            >
              <div>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{item.rating}</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-orange-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-md">
                    {item.category === 'คาว' ? '🍲 อาหารคาว' : '🥤 ของหวาน'}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mb-1.5">
                    <Store className="w-3 h-3 text-orange-500" />
                    <span>{item.restaurant}</span>
                  </div>
                  <h3 className="font-extrabold text-base text-gray-800 leading-snug group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 font-semibold bg-gray-50 px-2 py-1 rounded-md">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between gap-4 mt-2">
                <span className="text-xl font-black text-gray-800">
                  <span className="text-sm font-bold text-orange-600">฿</span>
                  {item.price}
                </span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white px-4 py-2.5 rounded-2xl text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มลงตะกร้า</span>
                </button>
              </div>
            </div>
          ))}

          {filteredMenu.length === 0 && (
            <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-700">ไม่พบเมนูที่คุณกำลังมองหา</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">ลองเปลี่ยนหมวดหมู่ ค้นหาคำอื่น หรือเปลี่ยนชื่อร้านค้าในช่องค้นหาดูนะคะ</p>
            </div>
          )}
        </div>
      </main>

      {/* 5. ตะกร้าสินค้าด้านล่าง (Floating Cart Summary) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_rgb(0,0,0,0.06)] py-4 px-6 border-t border-gray-100 z-30">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 hover:bg-orange-200 transition-colors shadow-sm"
            >
              <ShoppingCart className="w-5.5 h-5.5" />
              {cartItemCount > 0 && (
                <span className="absolute top-[-6px] right-[-6px] bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </button>
            <div className="hidden sm:block">
              <p className="text-xs text-gray-400 font-semibold leading-none">สินค้าสั่งซื้อรวม</p>
              <p className="text-sm font-bold text-gray-700 mt-1">{cartItemCount} รายการเมนู</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold leading-none">ยอดรวมราคาสุทธิ</p>
              <p className="text-2xl font-black text-gray-800 mt-1">
                <span className="text-sm font-bold text-orange-600">฿</span>
                {cartTotal}
              </p>
            </div>
            
            <button 
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className={`px-8 py-3.5 rounded-2xl text-sm font-black transition-all shadow-lg flex items-center gap-2 ${
                cart.length > 0 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/20 hover:shadow-orange-500/30 hover:translate-y-[-1px]' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>ส่งคำสั่งซื้อ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 6. ลิ้นชักหน้ารายการสินค้าในตะกร้า (Cart Drawer Modal) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex justify-end z-50 transition-opacity">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-fade-in relative z-50">
            <div>
              {/* หัวตารางตะกร้า */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-orange-500 w-5 h-5" />
                  <h3 className="font-extrabold text-lg text-gray-800">ตะกร้าอาหารของคุณ</h3>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-gray-500 font-bold hover:bg-orange-100 hover:text-orange-600 transition-colors flex items-center justify-center text-sm"
                >
                  ✕
                </button>
              </div>

              {/* รายการในตะกร้า */}
              <div className="p-5 space-y-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 border-b border-gray-50 pb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 object-cover rounded-xl shrink-0" 
                    />
                    <div className="grow min-w-0">
                      <h4 className="font-bold text-sm text-gray-800 truncate">{item.name}</h4>
                      <p className="text-[10px] text-gray-400">{item.restaurant}</p>
                      <p className="text-xs font-black text-orange-600 mt-1">฿{item.price}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-orange-100 text-gray-600 hover:text-orange-600 font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => deleteFromCart(item.id)}
                        className="w-6 h-6 rounded-md bg-red-50 hover:bg-red-100 text-red-500 font-bold flex items-center justify-center text-xs transition-colors ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-12 text-gray-400 space-y-2">
                    <Utensils className="mx-auto w-10 h-10 text-gray-200" />
                    <p className="text-xs font-semibold">ไม่มีอาหารในตะกร้าของคุณ</p>
                  </div>
                )}
              </div>
            </div>

            {/* ส่วนสรุปราคาท้ายแผ่นลิ้นชัก */}
            <div className="p-5 border-t border-gray-100 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
                <span>ค่าอาหารทั้งหมด:</span>
                <span className="font-bold text-gray-800">฿{cartTotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-gray-600">
                <span>ค่าบริการนำส่งอาหาร:</span>
                <span className="font-bold text-green-600">ฟรี (โปรโมชั่น ม.)</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex items-center justify-between text-base font-black text-gray-800">
                <span>ยอดเงินที่ต้องจ่าย:</span>
                <span className="text-xl text-orange-600">฿{cartTotal}</span>
              </div>

              {/* คิวอาร์โค้ดชำระเงินมาตรฐาน */}
              {cart.length > 0 && (
                <div className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-3">
                  <div className="w-14 h-14 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-[10px] text-gray-400 border font-bold">
                    QR Code
                  </div>
                  <div className="text-left space-y-1">
                    <p className="text-xs font-black text-gray-800">ชำระเงินผ่าน PromptPay</p>
                    <p className="text-[10px] text-gray-400">สแกนจ่ายเงินสะดวก รวดเร็ว และแม่นยำ</p>
                  </div>
                </div>
              )}

              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`w-full py-3.5 rounded-2xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 shadow-md ${
                  cart.length > 0
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange-500/20'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>ยืนยันการจัดส่งและจ่ายเงิน</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
