
'use client'
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, ShoppingCart, User, Package, Star, Truck, ShieldCheck, Heart,
  Sparkles, Filter, ChevronRight, Settings, Plus, Trash2, Pencil, Upload,
  Save, Download, RefreshCw
} from "lucide-react";

const INITIAL_BRAND = "ZADORA";
const INITIAL_HERO = {
  title: "جُملة راقية بلمسة ZADORA",
  subtitle:
    "اطلب بالكرتونة أو حد أدنى 12 قطعة — أسعار واضحة، خامات مضمونة، وصور جاهزة لزيادة مبيعاتك فورًا.",
  image:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1600&auto=format&fit=crop",
};

const INITIAL_CATEGORIES = [
  { name: "مطبخ", image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1200&auto=format&fit=crop" },
  { name: "تخزين وتنظيم", image: "https://images.unsplash.com/photo-1582582429416-2f3a27730854?q=80&w=1200&auto=format&fit=crop" },
  { name: "مشروبات ومجات", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop" },
  { name: "ديكور", image: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop" },
  { name: "منسوجات", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=1200&auto=format&fit=crop" },
  { name: "بلاستيك واستالس", image: "https://images.unsplash.com/photo-1542444592-1e6c9f952a25?q=80&w=1200&auto=format&fit=crop" },
];

const INITIAL_PRODUCTS = [
  { id: 1, title: "طقم تلاجة بيركس – 3 قطع", price: 420, oldPrice: 480, rating: 4.7, reviews: 126, image: "https://images.unsplash.com/photo-1601050690290-27f9864c06c0?q=80&w=1200&auto=format&fit=crop", badge: "الأكثر طلبًا", minQty: 12, category:"مطبخ" },
  { id: 2, title: "لانش بوكس حراري", price: 165, oldPrice: 199, rating: 4.6, reviews: 98, image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=1200&auto=format&fit=crop", badge: "عرض خاص", minQty: 24, category:"تخزين وتنظيم" },
  { id: 3, title: "مج سيراميك مطفي", price: 85, oldPrice: 110, rating: 4.4, reviews: 210, image: "https://images.unsplash.com/photo-1523365280197-f1783db9fe62?q=80&w=1200&auto=format&fit=crop", badge: "جديد", minQty: 24, category:"مشروبات ومجات" },
  { id: 4, title: "علب تخزين محكمة – 6 قطع", price: 350, oldPrice: 399, rating: 4.8, reviews: 73, image: "https://images.unsplash.com/photo-1592840496694-26d035b08cc6?q=80&w=1200&auto=format&fit=crop", badge: "الأفضل قيمة", minQty: 6, category:"تخزين وتنظيم" },
];

const INITIAL_BENEFITS = [
  { icon: Truck, title: "شحن سريع", desc: "توصيل لكل المحافظات خلال 24-72 ساعة" },
  { icon: ShieldCheck, title: "ضمان واستبدال", desc: "استبدال القطع المكسورة خلال 7 أيام" },
  { icon: Package, title: "جملة بالكرتونة", desc: "حد أدنى 12 قطعة فقط" },
];

const LS = { brand: "zadora_brand", hero: "zadora_hero", products: "zadora_products", categories: "zadora_categories" };
const getLS = (k, fallback) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };

function ImageInput({ value, onChange, label }) {
  const [preview, setPreview] = useState(value || "");
  useEffect(() => setPreview(value || ""), [value]);
  const handle = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = String(ev.target?.result);
      setPreview(url);
      onChange?.(url);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium">{label}</div>}
      {preview ? (
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border bg-white">
          <img src={preview} alt="preview" className="w-full h-full object-cover"/>
        </div>
      ) : (
        <div className="aspect-[4/3] w-full rounded-xl border grid place-items-center text-gray-400">لا توجد صورة</div>
      )}
      <label className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer hover:bg-gray-50">
        <Upload className="w-4 h-4"/> رفع صورة
        <input type="file" accept="image/*" className="hidden" onChange={handle} />
      </label>
    </div>
  );
}

function Header({ brand, onToggleAdmin }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-rose-600" />
          <span className="font-bold text-xl tracking-tight">{brand}</span>
        </div>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2 w-[520px]">
          <div className="relative flex-1">
            <input className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="إبحث عن منتج (مج، طقم عشاء، تخزين…)" dir="rtl" />
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button className="rounded-xl border px-4 py-2 hover:bg-gray-50" dir="rtl">
            <Filter className="inline w-4 h-4 ml-1" />تصفية
          </button>
        </div>
        <nav className="flex items-center gap-1 ml-2">
          <button className="rounded-full p-2 hover:bg-gray-100" title="لوحة التحكم" onClick={onToggleAdmin}>
            <Settings className="w-5 h-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100" title="حسابي"><User className="w-5 h-5" /></button>
          <button className="rounded-full p-2 hover:bg-gray-100" title="المفضلة"><Heart className="w-5 h-5" /></button>
          <button className="rounded-full p-2 hover:bg-gray-100 relative" title="السلة">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] px-1.5 rounded-full">3</span>
          </button>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-3">
        <div className="md:hidden relative">
          <input className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="إبحث عن منتج" dir="rtl" />
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

function PromoHero({ hero }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-4">
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-2 relative overflow-hidden rounded-2xl bg-neutral-900 text-white">
          <img src={hero.image} alt="promo" className="absolute inset-0 w-full h-full object-cover opacity-70"/>
          <div className="relative p-8 md:p-12">
            <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">{hero.title}</h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base text-white/90">{hero.subtitle}</p>
            <button className="mt-5 inline-flex items-center gap-1 rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white/90">
              تسوق الآن <ChevronRight className="w-4 h-4"/>
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative overflow-hidden rounded-2xl bg-rose-600 text-white">
          <img src="https://images.unsplash.com/photo-1549778399-f94fd24d4697?q=80&w=1600&auto=format&fit=crop" alt="promo" className="absolute inset-0 w-full h-full object-cover opacity-40"/>
          <div className="relative p-8">
            <h3 className="text-xl md:text-2xl font-extrabold">ZADORA Box</h3>
            <p className="mt-2 text-sm text-white/90">باكدچ متنوعة جاهزة للعرض في المحل</p>
            <button className="mt-4 inline-flex items-center gap-1 rounded-xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white/90">
              شوف البوكس <ChevronRight className="w-4 h-4"/>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BenefitsBar({ benefits }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-6">
      <div className="grid sm:grid-cols-3 gap-3">
        {benefits.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4 rounded-2xl border p-4 bg-white">
            <div className="rounded-2xl p-3 bg-rose-50">
              <Icon className="w-6 h-6 text-rose-600" />
            </div>
            <div className="text-right">
              <div className="font-semibold">{title}</div>
              <div className="text-sm text-gray-600">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories({ categories }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg md:text-xl font-bold">تسوق بالأقسام</h3>
        <a className="text-rose-600 hover:underline cursor-pointer">عرض الكل</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <a key={cat.name} className="group relative block overflow-hidden rounded-2xl border bg-white">
            <img src={cat.image} alt={cat.name} className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
            <div className="absolute bottom-2 right-2 text-white text-sm font-semibold">{cat.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ p }) {
  return (
    <div className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={p.image} alt={p.title} className="w-full h-56 object-cover"/>
        {p.badge && (
          <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs px-2 py-1 rounded-full">{p.badge}</span>
        )}
        <button className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-sm rounded-xl px-3 py-1 hover:bg-white flex items-center gap-1">
          <Package className="w-4 h-4"/> حد أدنى: {p.minQty}
        </button>
      </div>
      <div className="p-3" dir="rtl">
        <h4 className="font-semibold line-clamp-2 min-h-[44px]">{p.title}</h4>
        <div className="flex items-center gap-1 mt-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.round(p.rating) ? "fill-current" : "opacity-30"}`} />
          ))}
          <span className="text-xs text-gray-500 mr-1">({p.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-extrabold">{p.price} ج.م</span>
          <span className="text-sm line-through text-gray-400">{p.oldPrice} ج.م</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="flex-1 rounded-xl bg-rose-600 text-white py-2 font-semibold hover:bg-rose-700">أضف للسلة</button>
          <button className="rounded-xl border px-3 py-2 hover:bg-gray-50" title="إضافة للمفضلة"><Heart className="w-5 h-5"/></button>
        </div>
      </div>
    </div>
  );
}

function ProductsGrid({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg md:text-xl font-bold">الأكثر مبيعًا</h3>
        <div className="flex items-center gap-2 text-sm">
          <span>ترتيب:</span>
          <select className="border rounded-xl px-2 py-1 focus:outline-none">
            <option>الأكثر مبيعًا</option>
            <option>الأحدث</option>
            <option>السعر: من الأقل للأعلى</option>
            <option>السعر: من الأعلى للأقل</option>
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      <div className="rounded-2xl bg-neutral-900 text-white overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-extrabold">قائمة التجار البريدية</h3>
            <p className="mt-2 text-white/80">خصومات خاصة بالجملة + عروض صناديق جاهزة أسبوعيًا.</p>
            <div className="mt-5 flex items-center gap-2">
              <input className="flex-1 rounded-xl px-3 py-2 text-neutral-900" placeholder="اكتب بريدك الإلكتروني" dir="rtl"/>
              <button className="rounded-xl bg-rose-600 px-4 py-2 font-semibold hover:bg-rose-700">اشترك</button>
            </div>
          </div>
          <div className="relative min-h-[220px]">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop" alt="newsletter" className="absolute inset-0 w-full h-full object-cover opacity-70"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ brand }) {
  return (
    <footer className="mt-10 border-t">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-8 text-right">
        <div className="col-span-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-rose-600" />
            <span className="font-bold text-lg">{brand}</span>
          </div>
          <p className="mt-3 text-sm text-gray-600">منصة جملة للأدوات المنزلية: حد أدنى 12 قطعة، شحن سريع، وضمان استبدال.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">خدمة العملاء</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a className="hover:underline">سياسة الاسترجاع</a></li>
            <li><a className="hover:underline">الشحن والتسليم</a></li>
            <li><a className="hover:underline">طرق الدفع</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">الشركة</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a className="hover:underline">من نحن</a></li>
            <li><a className="hover:underline">انضم كتاجر/مورد</a></li>
            <li><a className="hover:underline">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">تابعنا</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a className="hover:underline">Facebook</a></li>
            <li><a className="hover:underline">Instagram</a></li>
            <li><a className="hover:underline">TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} {brand}. All rights reserved.</div>
    </footer>
  );
}

function AdminPanel({ brand, setBrand, hero, setHero, categories, setCategories, products, setProducts, onClose }) {
  const [tab, setTab] = useState("products");
  const emptyProduct = { id:"", title:"", price:0, oldPrice:0, rating:4.5, reviews:0, badge:"", minQty:12, category:"", image:"" };
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  const resetForm = () => { setForm(emptyProduct); setEditingId(null); };
  const upsertProduct = () => {
    if (!form.title) return alert("اكتب اسم المنتج");
    const parsed = {
      ...form,
      id: editingId ?? (products.length ? Math.max(...products.map(p=>Number(p.id)||0))+1 : 1),
      price: Number(form.price||0),
      oldPrice: Number(form.oldPrice||0),
      rating: Number(form.rating||0),
      reviews: Number(form.reviews||0),
      minQty: Number(form.minQty||0)
    };
    if (editingId) setProducts(products.map(p => (String(p.id)===String(editingId) ? parsed : p)));
    else setProducts([...products, parsed]);
    resetForm();
  };
  const editProduct = (p) => { setForm({...p}); setEditingId(p.id); setTab("products"); };
  const deleteProduct = (id) => { if(confirm("مسح المنتج؟")) setProducts(products.filter(p=>String(p.id)!==String(id))); };

  const [catForm, setCatForm] = useState({ name:"", image:"" });
  const [editingCat, setEditingCat] = useState(null);
  const upsertCategory = () => {
    if(!catForm.name) return alert("اكتب اسم القسم");
    if (editingCat) setCategories(categories.map(c=> c.name===editingCat ? {...catForm} : c));
    else {
      if (categories.some(c=>c.name===catForm.name)) return alert("القسم موجود بالفعل");
      setCategories([...categories, {...catForm}]);
    }
    setCatForm({ name:"", image:"" }); setEditingCat(null);
  };
  const editCategory = (c) => { setCatForm({...c}); setEditingCat(c.name); setTab("categories"); };
  const deleteCategory = (name) => { if(confirm("مسح القسم؟")) setCategories(categories.filter(c=>c.name!==name)); };

  const exportJSON = () => {
    const data = { brand, hero, categories, products };
    const blob = new Blob([JSON.stringify(data,null,2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "zadora_store_export.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const importJSON = (e) => {
    const file = e.target.files?.[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev)=>{
      try{
        const data = JSON.parse(String(ev.target?.result||"{}"));
        if(data.brand) setBrand(data.brand);
        if(data.hero) setHero(data.hero);
        if(Array.isArray(data.categories)) setCategories(data.categories);
        if(Array.isArray(data.products)) setProducts(data.products);
      }catch{ alert("ملف غير صالح"); }
    };
    reader.readAsText(file);
  };
  const resetAll = () => {
    if(!confirm("إرجاع كل شيء للوضع الافتراضي؟")) return;
    setBrand(INITIAL_BRAND);
    setHero(INITIAL_HERO);
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(LS.brand);
    localStorage.removeItem(LS.hero);
    localStorage.removeItem(LS.categories);
    localStorage.removeItem(LS.products);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur">
      <div className="absolute inset-0 md:inset-auto md:right-0 md:top-0 md:bottom-0 md:w-[780px] bg-white rounded-none md:rounded-l-3xl shadow-2xl overflow-auto">
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b p-4 flex items-center justify-between">
          <div className="font-bold">لوحة التحكم</div>
          <div className="flex items-center gap-2">
            <label className="rounded-xl border px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4"/> استيراد
              <input type="file" accept="application/json" className="hidden" onChange={importJSON} />
            </label>
            <button onClick={exportJSON} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"><Save className="w-4 h-4"/>تصدير</button>
            <button onClick={resetAll} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"><RefreshCw className="w-4 h-4"/>إرجاع الافتراضي</button>
            <button onClick={onClose} className="rounded-xl bg-rose-600 text-white px-4 py-2 text-sm">إغلاق</button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {[
              {key:"products", label:"المنتجات"},
              {key:"categories", label:"الأقسام"},
              {key:"settings", label:"الإعدادات"},
            ].map(t=> (
              <button key={t.key} onClick={()=>setTab(t.key)} className={`rounded-xl px-4 py-2 text-sm border ${tab===t.key?"bg-rose-600 text-white border-rose-600":"hover:bg-gray-50"}`}>{t.label}</button>
            ))}
          </div>

          {tab==="settings" && (
            <div className="grid md:grid-cols-2 gap-4" dir="rtl">
              <div className="space-y-2">
                <label className="text-sm font-medium">اسم البراند</label>
                <input value={brand} onChange={e=>setBrand(e.target.value)} className="w-full rounded-xl border px-3 py-2" placeholder="ZADORA"/>
                <label className="text-sm font-medium">عنوان الهيرو</label>
                <input value={hero.title} onChange={e=>setHero({...hero, title:e.target.value})} className="w-full rounded-xl border px-3 py-2"/>
                <label className="text-sm font-medium">وصف الهيرو</label>
                <textarea value={hero.subtitle} onChange={e=>setHero({...hero, subtitle:e.target.value})} className="w-full rounded-xl border px-3 py-2 min-h-[112px]"/>
              </div>
              <ImageInput value={hero.image} onChange={(url)=>setHero({...hero, image:url})} label="صورة الهيرو"/>
            </div>
          )}

          {tab==="categories" && (
            <CategoriesAdmin categories={categories} setCategories={setCategories}/>
          )}

          {tab==="products" && (
            <ProductsAdmin categories={categories} products={products} setProducts={setProducts} form={form} setForm={setForm} editingId={editingId} setEditingId={setEditingId} upsertProduct={upsertProduct} resetForm={resetForm} editProduct={editProduct} deleteProduct={deleteProduct}/>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoriesAdmin({ categories, setCategories }){
  const [catForm, setCatForm] = useState({ name:"", image:"" });
  const [editingCat, setEditingCat] = useState(null);

  const upsertCategory = () => {
    if(!catForm.name) return alert("اكتب اسم القسم");
    if (editingCat) setCategories(categories.map(c=> c.name===editingCat ? {...catForm} : c));
    else {
      if (categories.some(c=>c.name===catForm.name)) return alert("القسم موجود بالفعل");
      setCategories([...categories, {...catForm}]);
    }
    setCatForm({ name:"", image:"" }); setEditingCat(null);
  };
  const editCategory = (c) => { setCatForm({...c}); setEditingCat(c.name); };
  const deleteCategory = (name) => { if(confirm("مسح القسم؟")) setCategories(categories.filter(c=>c.name!==name)); };

  return (
    <div className="grid md:grid-cols-3 gap-4" dir="rtl">
      <div className="md:col-span-1 space-y-3">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="اسم القسم" value={catForm.name} onChange={e=>setCatForm({...catForm, name:e.target.value})}/>
        <ImageInput value={catForm.image} onChange={(url)=>setCatForm({...catForm, image:url})} label="صورة القسم"/>
        <div className="flex gap-2">
          <button onClick={upsertCategory} className="flex-1 rounded-xl bg-rose-600 text-white py-2 font-semibold"><Plus className="w-4 h-4 inline ml-1"/>حفظ</button>
          {editingCat && <button onClick={()=>{setCatForm({name:"",image:""}); setEditingCat(null);}} className="rounded-xl border px-3">إلغاء</button>}
        </div>
      </div>
      <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
        {categories.map(c=> (
          <div key={c.name} className="rounded-2xl border overflow-hidden bg-white">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover"/>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="font-semibold">{c.name}</div>
              <div className="flex gap-2">
                <button className="rounded-xl border px-3 py-1 hover:bg-gray-50" onClick={()=>editCategory(c)}><Pencil className="w-4 h-4"/></button>
                <button className="rounded-xl border px-3 py-1 hover:bg-gray-50" onClick={()=>deleteCategory(c.name)}><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsAdmin({ categories, products, setProducts, form, setForm, editingId, setEditingId, upsertProduct, resetForm, editProduct, deleteProduct }){
  return (
    <div className="grid md:grid-cols-3 gap-4" dir="rtl">
      <div className="md:col-span-1 space-y-3">
        <input className="w-full rounded-xl border px-3 py-2" placeholder="اسم المنتج" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
        <div className="grid grid-cols-2 gap-2">
          <input className="rounded-xl border px-3 py-2" placeholder="السعر" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
          <input className="rounded-xl border px-3 py-2" placeholder="السعر قبل" type="number" value={form.oldPrice} onChange={e=>setForm({...form, oldPrice:e.target.value})}/>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input className="rounded-xl border px-3 py-2" placeholder="تقييم" type="number" step="0.1" value={form.rating} onChange={e=>setForm({...form, rating:e.target.value})}/>
          <input className="rounded-xl border px-3 py-2" placeholder="مراجعات" type="number" value={form.reviews} onChange={e=>setForm({...form, reviews:e.target.value})}/>
          <input className="rounded-xl border px-3 py-2" placeholder="حد أدنى" type="number" value={form.minQty} onChange={e=>setForm({...form, minQty:e.target.value})}/>
        </div>
        <input className="w-full rounded-xl border px-3 py-2" placeholder="شارة (جديد/عرض خاص)" value={form.badge} onChange={e=>setForm({...form, badge:e.target.value})}/>
        <select className="w-full rounded-xl border px-3 py-2" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
          <option value="">اختر القسم</option>
          {categories.map(c=> <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <ImageInput value={form.image} onChange={(url)=>setForm({...form, image:url})} label="صورة المنتج"/>
        <div className="flex gap-2">
          <button onClick={upsertProduct} className="flex-1 rounded-xl bg-rose-600 text-white py-2 font-semibold"><Plus className="w-4 h-4 inline ml-1"/>{editingId?"تحديث":"إضافة"}</button>
          {editingId && <button onClick={resetForm} className="rounded-xl border px-3">إلغاء</button>}
        </div>
      </div>

      <div className="md:col-span-2 grid sm:grid-cols-2 gap-3">
        {products.map(p=> (
          <div key={p.id} className="rounded-2xl border bg-white overflow-hidden">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover"/>
            </div>
            <div className="p-3">
              <div className="font-semibold line-clamp-2">{p.title}</div>
              <div className="text-sm text-gray-500 mt-1">{p.category}</div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-lg font-extrabold">{p.price} ج.م</span>
                <span className="text-sm line-through text-gray-400">{p.oldPrice} ج.م</span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button className="rounded-xl border px-3 py-1 hover:bg-gray-50" onClick={()=>editProduct(p)}><Pencil className="w-4 h-4"/></button>
                <button className="rounded-xl border px-3 py-1 hover:bg-gray-50" onClick={()=>deleteProduct(p.id)}><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Storefront(){
  const [brand, setBrand] = useState(() => getLS(LS.brand, INITIAL_BRAND));
  const [hero, setHero] = useState(() => getLS(LS.hero, INITIAL_HERO));
  const [categories, setCategories] = useState(() => getLS(LS.categories, INITIAL_CATEGORIES));
  const [products, setProducts] = useState(() => getLS(LS.products, INITIAL_PRODUCTS));
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(()=>{ localStorage.setItem(LS.brand, JSON.stringify(brand)); },[brand]);
  useEffect(()=>{ localStorage.setItem(LS.hero, JSON.stringify(hero)); },[hero]);
  useEffect(()=>{ localStorage.setItem(LS.categories, JSON.stringify(categories)); },[categories]);
  useEffect(()=>{ localStorage.setItem(LS.products, JSON.stringify(products)); },[products]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header brand={brand} onToggleAdmin={()=>setAdminOpen(true)} />
      <PromoHero hero={hero} />
      <BenefitsBar benefits={INITIAL_BENEFITS} />
      <Categories categories={categories} />
      <ProductsGrid products={products} />
      <Newsletter />
      <Footer brand={brand} />
      {adminOpen && (
        <AdminPanel brand={brand} setBrand={setBrand} hero={hero} setHero={setHero} categories={categories} setCategories={setCategories} products={products} setProducts={setProducts} onClose={()=>setAdminOpen(false)} />
      )}
    </div>
  );
}
