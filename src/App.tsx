/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Menu, X, ChevronRight, MessageCircle } from 'lucide-react';
import { generatePerfumeImage } from './services/imageService';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const PERFUMES = [
  { 
    id: 1, 
    name: 'SOBEL NOIR', 
    note: { en: 'Rose, Oud & Smoke', ar: 'ورد، عود ودخان' },
    description: { 
      en: 'A mysterious atmosphere combining red rose and oud with a touch of light smoke.',
      ar: 'أجواء غامضة تجمع بين عبير الورد الأحمر والعود مع لمسة دخان خفيف.'
    }
  },
  { 
    id: 2, 
    name: 'SOBEL ROYALE', 
    note: { en: 'Royal Essence', ar: 'جوهر ملكي' },
    description: { 
      en: 'A luxurious royal experience with a purple background and a golden crown reflecting luxury lighting.',
      ar: 'تجربة ملكية فاخرة تعكس الفخامة والرقي في كل رشة.'
    }
  },
  { 
    id: 3, 
    name: 'SOBEL AMBRE', 
    note: { en: 'Golden Amber', ar: 'عنبر ذهبي' },
    description: { 
      en: 'Golden amber stones with warm light for an unforgettable luxurious oriental feel.',
      ar: 'أحجار العنبر الذهبية مع ضوء دافئ لإحساس شرقي فاخر لا ينسى.'
    }
  },
  { 
    id: 4, 
    name: 'SOBEL OUD', 
    note: { en: 'Pure Oud & Incense', ar: 'عود نقي وبخور' },
    description: { 
      en: 'The scent of oud wood with incense smoke for a strong and authentic oriental atmosphere.',
      ar: 'عبق خشب العود مع دخان البخور لأجواء شرقية قوية وأصيلة.'
    }
  },
  { 
    id: 5, 
    name: 'SOBEL VELOUR', 
    note: { en: 'Lavender & Velvet', ar: 'لافندر ومخمل' },
    description: { 
      en: 'Lavender flowers with a soft background giving you a unique velvety feel.',
      ar: 'زهور اللافندر مع خلفية ناعمة تمنحك إحساساً مخملياً فريداً.'
    }
  },
];

const TRANSLATIONS = {
  en: {
    nav: { story: 'The Story', collection: 'Collection', contact: 'Contact' },
    hero: { subtitle: 'SOBEL PERFUME', title: 'Crafting', titleItalic: 'Timeless Scents', btn: 'Explore Collection' },
    story: { subtitle: 'Our Heritage', title: 'A Journey of', titleItalic: 'Botanical Mastery', text: '"Fikri Belhamadia\'s journey began with a single jasmine petal in the gardens of Medina. A Moroccan soul with a deep reverence for nature, he spent years mastering the delicate balance of floral essences. SOBEL is the culmination of his travels—a tribute to the timeless beauty of the earth\'s most precious botanicals."', founder: 'Fikri Belhamadia, Founder' },
    collection: { subtitle: 'The Collection', title: 'Signature Essences' },
    contact: { title: 'Embrace the', titleItalic: 'Sublime.', boutique: 'Boutique', address: 'Al Madinah Al Munawwarah, Kingdom of Saudi Arabia', inquiries: 'Inquiries', copyright: '© 2024 SOBEL PERFUME', author: 'By Fikri Belhamadia' }
  },
  ar: {
    nav: { story: 'قصتنا', collection: 'المجموعة', contact: 'اتصل بنا' },
    hero: { subtitle: 'سوبيل للعطور', title: 'صناعة', titleItalic: 'عطور خالدة', btn: 'استكشف المجموعة' },
    story: { subtitle: 'تراثنا', title: 'رحلة من', titleItalic: 'الإتقان النباتي', text: '"بدأت رحلة فكري بلمادية ببتلة ياسمين واحدة في حدائق المدينة المنورة. روح مغربية بتقدير عميق للطبيعة، قضى سنوات في إتقان التوازن الدقيق للخلاصات الزهرية. سوبيل هو ذروة أسفاره - تحية للجمال الخالد لأثمن نباتات الأرض."', founder: 'فكري بلمادية، المؤسس' },
    collection: { subtitle: 'المجموعة', title: 'جواهرنا العطرية' },
    contact: { title: 'رائحة', titleItalic: 'فيها هيبة.', boutique: 'البوتيك', address: 'المدينة المنورة، المملكة العربية السعودية', inquiries: 'الاستفسارات', copyright: '© 2024 سوبيل للعطور', author: 'بواسطة فكري بلمادية' }
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleSelectKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      await window.aistudio.openSelectKey();
      window.location.reload();
    }
  };

  return (
    <div className={`min-h-screen bg-[#fdfcf8] text-[#1a1a1a] selection:bg-[#004d2c] selection:text-white ${lang === 'ar' ? 'font-modern-arabic' : 'font-sans'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-16 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-4">
          <img 
            src="https://lh3.googleusercontent.com/d/1-ohtqevsbA-pZtGsu6uflgugf_qugWGB" 
            alt="SOBEL Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[9px] uppercase tracking-[0.25em] font-semibold text-white/70">
          <a href="#about" className="hover:text-white transition-colors">{t.nav.story}</a>
          <a href="#collection" className="hover:text-white transition-colors">{t.nav.collection}</a>
          <a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a>
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-3 py-1 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-[10px]"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="text-white text-[10px] border border-white/20 px-2 py-1 rounded"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: lang === 'en' ? '100%' : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'en' ? '100%' : '-100%' }}
            className="fixed inset-0 z-40 bg-[#fdfcf8] flex flex-col items-center justify-center gap-10 text-lg font-serif tracking-widest uppercase"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)}>{t.nav.story}</a>
            <a href="#collection" onClick={() => setIsMenuOpen(false)}>{t.nav.collection}</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fdfcf8]">
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-sm text-red-600 text-[10px] uppercase tracking-widest">
                {error}
                {needsApiKey && (
                  <button 
                    onClick={handleSelectKey}
                    className="ml-4 underline hover:text-red-800 transition-colors"
                  >
                    Select API Key
                  </button>
                )}
              </div>
            )}
            <h2 className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-8 text-[#004d2c] font-bold">
              {t.hero.subtitle}
            </h2>
            <h1 className={`text-5xl md:text-8xl mb-10 tracking-tight leading-[1.1] text-[#1a1a1a] ${lang === 'ar' ? 'font-modern-arabic font-bold' : 'font-serif font-light'}`}>
              {t.hero.title} <br />
              <span className={`${lang === 'ar' ? '' : 'italic font-normal'}`}>{t.hero.titleItalic}</span>
            </h1>
            
            <motion.a 
              href="#collection"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-[#004d2c] text-white text-[9px] uppercase tracking-[0.3em] rounded-sm hover:bg-[#00361f] transition-colors duration-500"
            >
              {t.hero.btn}
            </motion.a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20"
        >
          <div className="w-[1px] h-12 bg-[#1a1a1a]" />
        </motion.div>
      </section>

      {/* Story Section */}
      <section id="about" className="py-40 px-6 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[3/2] overflow-hidden rounded-sm shadow-2xl bg-[#f5f2ed]">
              <img 
                src="https://lh3.googleusercontent.com/d/1YsCnKiGxAbQ4dk-Cq-LhZ_pRX1eEk5z-" 
                alt="SOBEL Perfume Collection" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-10 ${lang === 'en' ? '-right-10' : '-left-10'} w-48 h-48 border border-[#004d2c]/20 rounded-full hidden md:block`} />
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="text-[9px] uppercase tracking-[0.4em] text-[#004d2c] font-bold">{t.story.subtitle}</h3>
              <h2 className={`text-3xl md:text-5xl leading-tight text-[#1a1a1a] ${lang === 'ar' ? 'font-modern-arabic font-bold' : 'font-serif'}`}>
                {t.story.title} <br />
                <span className={`${lang === 'ar' ? '' : 'italic'}`}>{t.story.titleItalic}</span>
              </h2>
            </div>
            <p className="text-base md:text-lg font-light leading-relaxed text-[#1a1a1a]/70 font-serif italic">
              {t.story.text}
            </p>
            <div className="pt-6 flex items-center gap-6">
              <div className="w-12 h-[1px] bg-[#004d2c]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#1a1a1a]/40">{t.story.founder}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-40 px-6 md:px-24 bg-[#fdfcf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
            <h3 className="text-[9px] uppercase tracking-[0.5em] text-[#004d2c] font-bold">{t.collection.subtitle}</h3>
            <h2 className={`text-5xl md:text-7xl text-[#1a1a1a] ${lang === 'ar' ? 'font-modern-arabic font-bold' : 'font-serif'}`}>{t.collection.title}</h2>
            <div className="w-20 h-[1px] bg-[#004d2c] mx-auto mt-8" />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {PERFUMES.map((perfume, idx) => (
              <motion.div 
                key={perfume.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="group bg-white p-10 border border-[#004d2c]/5 hover:border-[#004d2c]/20 transition-all duration-700 shadow-sm hover:shadow-xl text-center"
              >
                <span className="text-[9px] font-sans text-[#004d2c] mb-8 block font-bold tracking-widest">0{perfume.id}</span>
                <h4 className="text-xl font-serif mb-4 text-[#1a1a1a] group-hover:text-[#004d2c] transition-colors">{perfume.name}</h4>
                <p className="text-[8px] uppercase tracking-[0.2em] mb-8 text-[#1a1a1a]/40 font-bold">{perfume.note[lang]}</p>
                <p className="text-[11px] font-light leading-relaxed text-[#1a1a1a]/60 italic">
                  {perfume.description[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="py-40 px-6 md:px-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-24">
          <div className="col-span-1 md:col-span-2 space-y-12">
            <h2 className={`text-5xl md:text-8xl tracking-tighter leading-none ${lang === 'ar' ? 'font-modern-arabic font-bold' : 'font-serif'}`}>
              {t.contact.title} <br />
              <span className={`${lang === 'ar' ? 'text-[#004d2c]' : 'italic text-[#004d2c]'}`}>{t.contact.titleItalic}</span>
            </h2>
            <div className="flex flex-wrap gap-10">
              <a href="https://wa.me/+966539334406" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#004d2c] group-hover:border-[#004d2c] transition-all duration-500">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/40">WhatsApp</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-medium">+966 53 933 4406</span>
                </div>
              </a>
              <a href="mailto:sobel.fikri@gmail.com" className="group flex items-center gap-5">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <Mail size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-white/40">{t.contact.inquiries}</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] font-medium">sobel.fikri@gmail.com</span>
                </div>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-between space-y-16 md:space-y-0">
            <div className="space-y-10">
              <div>
                <h5 className="text-[9px] uppercase tracking-[0.4em] mb-4 text-[#004d2c] font-bold">{t.contact.boutique}</h5>
                <p className="text-xs font-light leading-relaxed text-white/60">
                  {t.contact.address}
                </p>
              </div>
              <div>
                <h5 className="text-[9px] uppercase tracking-[0.4em] mb-4 text-[#004d2c] font-bold">{t.contact.inquiries}</h5>
                <p className="text-xs font-light leading-relaxed text-white/60">
                  sobel.fikri@gmail.com
                </p>
              </div>
            </div>
            
            <div className="pt-12 border-t border-white/10 flex items-center justify-between text-[8px] uppercase tracking-[0.3em] text-white/30 font-bold">
              <span>{t.contact.copyright}</span>
              <span>{t.contact.author}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action */}
      <div 
        className={`fixed bottom-10 ${lang === 'en' ? 'right-10' : 'left-10'} z-50 flex flex-col items-end gap-4`}
        onMouseEnter={() => setIsContactHovered(true)}
        onMouseLeave={() => setIsContactHovered(false)}
      >
        <AnimatePresence>
          {isContactHovered && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 mb-2"
            >
              <motion.a 
                href="https://wa.me/966500000000" 
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#25D366] border border-gray-100"
              >
                <MessageCircle size={20} />
              </motion.a>
              <motion.a 
                href="mailto:sobel.fikri@gmail.com" 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center text-[#004d2c] border border-gray-100"
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white shadow-2xl cursor-pointer border border-white/20"
        >
          <img 
            src="https://lh3.googleusercontent.com/d/1-ohtqevsbA-pZtGsu6uflgugf_qugWGB" 
            alt="S" 
            className="w-8 h-8 object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}
