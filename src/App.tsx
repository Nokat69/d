/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Menu, X, ChevronRight } from 'lucide-react';
import { generatePerfumeImage } from './services/imageService';

const PERFUMES = [
  { id: 1, name: 'Sovereign', note: 'Oud & Amber', description: 'A majestic blend of traditional oud with modern warmth.' },
  { id: 2, name: 'Oasis', note: 'Bergamot & Sea Salt', description: 'Refreshing as a hidden spring in the heart of the desert.' },
  { id: 3, name: 'Beloved', note: 'Rose & Musk', description: 'An intimate fragrance that captures the essence of devotion.' },
  { id: 4, name: 'Eternal', note: 'Sandalwood & Vanilla', description: 'A timeless scent that lingers like a cherished memory.' },
  { id: 5, name: 'Legacy', note: 'Leather & Spices', description: 'Bold and sophisticated, honoring the heritage of Fikri Belhamadia.' },
];

export default function App() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const img = await generatePerfumeImage();
        setHeroImage(img);
      } catch (error) {
        console.error('Failed to load image:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImage();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2ED] selection:bg-[#5A5A40] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-8 md:px-12 backdrop-blur-sm bg-black/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#004D2C] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl font-serif font-bold text-white leading-none mb-1">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif tracking-[0.2em] uppercase leading-none">SOBEL</span>
            <span className="text-[8px] tracking-[0.4em] uppercase opacity-50">PERFUME</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">
          <a href="#about" className="hover:opacity-100 transition-opacity">The Founder</a>
          <a href="#collection" className="hover:opacity-100 transition-opacity">Collection</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-xl font-serif tracking-widest uppercase"
          >
            <a href="#about" onClick={() => setIsMenuOpen(false)}>The Founder</a>
            <a href="#collection" onClick={() => setIsMenuOpen(false)}>Collection</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          {heroImage ? (
            <motion.img 
              key="hero-image"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.7 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={heroImage} 
              alt="SOBEL Luxury Perfume" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-[#0a0a0a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 opacity-60 font-medium">
              Medina, Saudi Arabia
            </h2>
            <h1 className="text-6xl md:text-9xl font-serif font-light mb-8 tracking-tight leading-none">
              Crafting <br />
              <span className="italic">Timeless Scents</span>
            </h1>
            <p className="text-sm md:text-lg font-light tracking-widest uppercase opacity-80 mb-12 max-w-xl mx-auto leading-relaxed">
              نصوغ عطراً لا يزول
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="px-8 py-4 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.3em] backdrop-blur-md bg-white/5">
                Coming Soon | قريباً الإطلاق
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
        >
          <div className="w-[1px] h-16 bg-white" />
        </motion.div>
      </section>

      {/* Founder Section */}
      <section id="about" className="py-32 px-6 md:px-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-[10px] uppercase tracking-[0.4em] mb-8 text-[#5A5A40] font-bold">The Visionary</h3>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Fikri Belhamadia <br />
              <span className="text-2xl md:text-3xl opacity-60 italic">Founder of SOBEL</span>
            </h2>
            <p className="text-lg font-light leading-relaxed opacity-70 mb-8 font-serif">
              A Moroccan soul with a heart for exploration, Fikri Belhamadia is a traveler and a lover of nature. His passion for the earth's botanicals and the art of plant care led him on a lifelong journey of discovery. After years of wandering through diverse landscapes and mastering the delicate balance of natural elements, he decided to channel his experiences into crafting unique, evocative fragrances that tell the story of his travels.
            </p>
            <div className="flex items-center gap-4 text-sm tracking-widest uppercase opacity-50">
              <MapPin size={16} />
              <span>Medina, KSA | Moroccan Heritage</span>
            </div>
          </div>
          <div className="order-1 md:order-2 relative aspect-[3/4] overflow-hidden rounded-2xl">
             <img 
              src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Fragrance" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-black/10" />
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-32 px-6 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.4em] mb-4 text-[#5A5A40] font-bold">The Collection</h3>
              <h2 className="text-5xl md:text-7xl font-serif">Five Essences</h2>
            </div>
            <p className="max-w-md text-sm uppercase tracking-widest opacity-50 leading-loose">
              Each fragrance is a chapter of a story. A journey from the desert dunes to the heart of the sanctuary.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-1">
            {PERFUMES.map((perfume, idx) => (
              <motion.div 
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-[#0a0a0a] p-12 border border-white/5 hover:bg-[#111] transition-all duration-500 cursor-default"
              >
                <span className="text-[10px] font-mono opacity-30 mb-12 block">0{perfume.id}</span>
                <h4 className="text-2xl font-serif mb-4 group-hover:text-[#5A5A40] transition-colors">{perfume.name}</h4>
                <p className="text-[10px] uppercase tracking-widest mb-8 opacity-60">{perfume.note}</p>
                <p className="text-xs font-light leading-relaxed opacity-40 group-hover:opacity-80 transition-opacity">
                  {perfume.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-5xl md:text-8xl font-serif mb-12 tracking-tighter">
              Experience <br />
              <span className="italic">The Eternal.</span>
            </h2>
            <div className="flex flex-wrap gap-12">
              <a href="https://wa.me/+966539334406" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">WhatsApp</span>
              </a>
              <a href="mailto:sobel.fikri@gmail.com" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Email</span>
              </a>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">Boutique</h5>
                <p className="text-sm font-light leading-relaxed opacity-70">
                  Al Madinah Al Munawwarah<br />
                  Kingdom of Saudi Arabia
                </p>
              </div>
              <div>
                <h5 className="text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">Inquiries</h5>
                <p className="text-sm font-light leading-relaxed opacity-70">
                  sobel.fikri@gmail.com
                </p>
              </div>
            </div>
            
            <div className="pt-12 mt-12 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] opacity-30">
              <span>&copy; 2024 SOBEL</span>
              <span>By Fikri Belhamadia</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Cursor / Accent */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="w-16 h-16 rounded-full bg-[#004D2C] flex items-center justify-center text-white shadow-2xl animate-pulse cursor-pointer border border-white/10">
          <span className="text-2xl font-serif font-bold leading-none mb-1">S</span>
        </div>
      </div>
    </div>
  );
}
