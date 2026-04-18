import React, { useState, useEffect, useMemo, useRef, useCallback, memo } from 'react';
import { 
  Home, 
  History, 
  PlusCircle, 
  PieChart, 
  Settings, 
  Coffee, 
  Car, 
  ShoppingBag, 
  Zap, 
  MoreHorizontal, 
  Smartphone, 
  CreditCard, 
  Banknote, 
  Trash2,
  Wallet,
  ChevronRight,
  ShieldAlert,
  LogOut,
  Camera,
  User,
  Eye,  
  EyeOff
} from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

// --- SUPABASE IMPORT ---
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CLOUD CONNECTION ---
const supabaseUrl = 'https://dyzydjfendembmtnqwyn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5enlkamZlbmRlbWJtdG5xd3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNTQ1MjEsImV4cCI6MjA5MDkzMDUyMX0.8BHQ6EjwzUfPn3Y45xtZsKOBm5Sxd_ez_TlXFpKCCcE';

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);

// --- CUSTOM THEME CONSTANTS (Coffee White / iOS Style) ---
const theme = {
  bg: 'bg-[#F9F8F6]', // Soft off-white / milk
  card: 'bg-[#FFFFFF]',
  textPrimary: 'text-[#3E2723]', // Deep espresso
  textSecondary: 'text-[#8D6E63]', // Soft latte
  accent: 'bg-[#A67B5B]', // Caramel accent
  accentHover: 'hover:bg-[#8B6347]',
  accentText: 'text-[#A67B5B]',
  danger: 'text-[#C05650]',
  dangerBg: 'bg-[#C05650]',
  success: 'text-[#6D8C70]',
  border: 'border-[#EAE6DF]',
};

// --- HELPER FUNCTIONS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const getCategoryIcon = (category, className = "w-5 h-5") => {
  switch (category) {
    case 'Food': return <Coffee className={className} />;
    case 'Transport': return <Car className={className} />;
    case 'Shop': return <ShoppingBag className={className} />;
    case 'Bills & Utilities': return <Zap className={className} />;
    default: return <MoreHorizontal className={className} />;
  }
};

const getPaymentIcon = (method, className = "w-4 h-4") => {
  switch (method) {
    case 'Gpay': 
      return (
        <svg className={className} viewBox="-2 -2 28 28" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
        </svg>
      );
    case 'Debit/Credit': return <CreditCard className={className} />;
    case 'Cash': return <Banknote className={className} />;
    default: return <Wallet className={className} />;
  }
};

// --- ANIMATED ICONS (Framer-Motion) ---
const LoaderPinwheelIcon = ({ isActive, size = 28 }) => {
  const controls = useAnimation();
  useEffect(() => { isActive ? controls.start("animate") : controls.start("normal") }, [isActive, controls]);
  return (
    <div onMouseEnter={() => !isActive && controls.start("animate")} onMouseLeave={() => !isActive && controls.start("normal")}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
        <motion.g animate={controls} initial="normal" transition={{ type: "spring", stiffness: 50, damping: 10 }} variants={{ normal: { rotate: 0 }, animate: { rotate: 360, transition: { repeat: Infinity, duration: 1, ease: "linear" } } }}>
          <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
          <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
          <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        </motion.g>
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
  );
};

const HistoryAnimatedIcon = ({ isActive, size = 28 }) => {
  const controls = useAnimation();
  useEffect(() => { isActive ? controls.start("animate") : controls.start("normal") }, [isActive, controls]);
  return (
    <div onMouseEnter={() => !isActive && controls.start("animate")} onMouseLeave={() => !isActive && controls.start("normal")}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
        <motion.g animate={controls} initial="normal" transition={{ type: "spring", stiffness: 250, damping: 25 }} variants={{ normal: { rotate: "0deg" }, animate: { rotate: "-50deg" } }}>
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </motion.g>
        <motion.line animate={controls} initial="normal" transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} variants={{ normal: { rotate: 0, originX: "0%", originY: "100%" }, animate: { rotate: -360, originX: "0%", originY: "100%" } }} x1="12" x2="12" y1="12" y2="7" />
        <motion.line animate={controls} initial="normal" transition={{ duration: 0.5, ease: "easeInOut" }} variants={{ normal: { rotate: 0, originX: "0%", originY: "0%" }, animate: { rotate: -45, originX: "0%", originY: "0%" } }} x1="12" x2="16" y1="12" y2="14" />
      </svg>
    </div>
  );
};

const ChartPieAnimatedIcon = ({ isActive, size = 28 }) => {
  const controls = useAnimation();
  useEffect(() => { isActive ? controls.start("animate") : controls.start("normal") }, [isActive, controls]);
  return (
    <div onMouseEnter={() => !isActive && controls.start("animate")} onMouseLeave={() => !isActive && controls.start("normal")}>
      <svg fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>
        <motion.path animate={controls} initial="normal" d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" transition={{ type: "spring", stiffness: 250, damping: 15, bounce: 0.6 }} variants={{ normal: { translateX: 0, translateY: 0 }, animate: { translateX: 1.1, translateY: -1.1 } }} />
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      </svg>
    </div>
  );
};

const CogAnimatedIcon = ({ isActive, size = 28 }) => {
  const controls = useAnimation();
  useEffect(() => { isActive ? controls.start("animate") : controls.start("normal") }, [isActive, controls]);
  return (
    <div onMouseEnter={() => !isActive && controls.start("animate")} onMouseLeave={() => !isActive && controls.start("normal")}>
      <motion.svg animate={controls} initial="normal" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transition={{ type: "spring", stiffness: 50, damping: 10 }} variants={{ normal: { rotate: 0 }, animate: { rotate: 180 } }} viewBox="0 0 24 24" width={size}>
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" />
        <path d="M12 22v-2" />
        <path d="m17 20.66-1-1.73" />
        <path d="M11 10.27 7 3.34" />
        <path d="m20.66 17-1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <path d="M14 12h8" />
        <path d="M2 12h2" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m17 3.34-1 1.73" />
        <path d="m11 13.73-4 6.93" />
      </motion.svg>
    </div>
  );
};

const AnimatedSplashWalletIcon = ({ size = 80, color = "currentColor" }) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ perspective: "400px" }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <motion.path
        d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M20 12v4h-4a2 2 0 0 1 0 -4h4"
        style={{ originX: "50%", originY: "50%", transformStyle: "preserve-3d" }}
        animate={{ rotateY: [0, 25, 0], x: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
};

// --- REUSABLE PROFILE CARD COMPONENT ---
function ProfileCard({ ownerName, profileImage, setProfileImage }) {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // This now triggers cloud save via App component wrapper
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center px-1">
      <div className="ui-card">
        <div className="ui-card-photo-wrapper group cursor-pointer" onClick={triggerFileInput}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <div className="w-[105px] h-[105px] rounded-[30%] overflow-hidden border-4 border-[#8b4513] bg-[#EAE6DF] relative shadow-[inset_0_-.2em_0_.5em_rgba(0,0,0,0.15)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center text-[#8D6E63] opacity-50">
                <Camera size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <Camera size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="ui-card-title">{ownerName} <br/>
            <span>Python Developer & CODER</span>
        </div>
        <div className="ui-card-socials">
            <a href="https://www.instagram.com/san_maverick08" target="_blank" rel="noopener noreferrer" className="ui-card-socials-btn instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://github.com/Sandept" target="_blank" rel="noopener noreferrer" className="ui-card-socials-btn github">
                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/san-dept87" target="_blank" rel="noopener noreferrer" className="ui-card-socials-btn linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" viewBox="0 0 512 512" height="512"><path d="m51.326 185.85h90.011v270.872h-90.011zm45.608-130.572c-30.807 0-50.934 20.225-50.934 46.771 0 26 19.538 46.813 49.756 46.813h.574c31.396 0 50.948-20.814 50.948-46.813-.589-26.546-19.551-46.771-50.344-46.771zm265.405 124.209c-47.779 0-69.184 26.28-81.125 44.71v-38.347h-90.038c1.192 25.411 0 270.872 0 270.872h90.038v-151.274c0-8.102.589-16.174 2.958-21.978 6.519-16.174 21.333-32.923 46.182-32.923 32.602 0 45.622 24.851 45.622 61.248v144.926h90.024v-155.323c0-83.199-44.402-121.911-103.661-121.911z"></path></svg>
            </a>
        </div>
      </div>
    </div>
  );
}

// --- GLOBAL STYLES COMPONENT ---
const GlobalStyles = memo(function GlobalStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --shape-color-01: #A67B5B;
          --shape-color-02: #3E2723;
          --shape-color-03: #6D8C70;
        }

        /* FORCE ALL ELEMENTS TO USE MONTSERRAT */
        html, body, * {
          font-family: "Montserrat", sans-serif !important;
        }

        html, body {
          height: 100%;
          overflow: hidden; /* Locks body to behave like a native app */
          overscroll-behavior-y: none; /* Prevents mobile pull-to-refresh */
          margin: 0;
          padding: 0;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #F9F8F6;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* GPU-accelerated layers for smooth compositing */
        .gpu-layer {
          transform: translateZ(0);
          will-change: transform;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .scroll-container {
          -webkit-overflow-scrolling: touch;
          transform: translateZ(0);
        }
        /* Reduce paint areas with containment */
        .contain-layout {
          contain: layout style;
        }
        .contain-strict {
          contain: strict;
        }

        /* Uiverse Burst Animation CSS */
        .burst-container {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          pointer-events: none;
          z-index: 0;
        }
        .burst-container svg {
          position: absolute;
          top: -50px;
          left: -50px;
          width: 100px;
          height: 100px;
          opacity: 0;
        }
        .spin-burst svg {
          animation: pop-burst 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .spin-burst svg:nth-child(1) { --tx: 0px; --ty: -75px; --scale: 1.1; animation-delay: 0s; }
        .spin-burst svg:nth-child(2) { --tx: 55px; --ty: -55px; --scale: 0.8; animation-delay: 0.05s; }
        .spin-burst svg:nth-child(3) { --tx: 75px; --ty: 0px; --scale: 1.3; animation-delay: 0s; }
        .spin-burst svg:nth-child(4) { --tx: 55px; --ty: 55px; --scale: 0.9; animation-delay: 0.1s; }
        .spin-burst svg:nth-child(5) { --tx: 0px; --ty: 75px; --scale: 1.2; animation-delay: 0.05s; }
        .spin-burst svg:nth-child(6) { --tx: -55px; --ty: 55px; --scale: 0.7; animation-delay: 0s; }
        .spin-burst svg:nth-child(7) { --tx: -75px; --ty: 0px; --scale: 1.1; animation-delay: 0.1s; }
        .spin-burst svg:nth-child(8) { --tx: -55px; --ty: -55px; --scale: 1.4; animation-delay: 0.05s; }
        .spin-burst svg:nth-child(9) { --tx: -30px; --ty: -85px; --scale: 0.8; animation-delay: 0s; }

        @keyframes pop-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(0) rotate(0deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(var(--scale)) rotate(180deg); }
        }

        /* Uiverse Payment Method Radial Menu */
        .pm-container { position: relative; width: 60px; height: 60px; display: flex; justify-content: center; align-items: center; margin: 0 auto; z-index: 10; }
        .pm-checkbox { position: absolute; width: 60px; height: 60px; opacity: 0; z-index: 20; cursor: pointer; }
        .pm-button-menu {
          position: absolute; z-index: 10;
          background-color: #FFFFFF; border: 2px solid #EAE6DF; color: #3E2723;
          width: 60px; height: 60px; border-radius: 50%;
          display: flex; justify-content: center; align-items: center;
          box-shadow: 0px 4px 15px rgba(62, 39, 35, 0.1);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .pm-option {
          position: absolute; background-color: #F9F8F6; border: 2px solid #EAE6DF; color: #8D6E63;
          z-index: 1; width: 50px; height: 50px; border-radius: 50%; cursor: pointer;
          display: flex; justify-content: center; align-items: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0px 3px 10px rgba(62, 39, 35, 0.05);
          opacity: 0; scale: 0.5; pointer-events: none;
        }
        .pm-checkbox:hover ~ .pm-button-menu, .pm-checkbox:checked ~ .pm-button-menu {
          background-color: #3E2723; color: #FFFFFF; border-color: #3E2723; scale: 0.95;
        }
        .pm-checkbox:checked ~ .pm-option { opacity: 1; scale: 1; pointer-events: auto; }
        .pm-option:hover { background-color: #A67B5B; color: #FFFFFF; border-color: #A67B5B; scale: 1.1; }
        .pm-checkbox:checked ~ .pm-option-a { transition-delay: 0.05s; transform: translate(-70px, -35px); }
        .pm-checkbox:checked ~ .pm-option-b { transition-delay: 0.15s; transform: translate(0px, -85px); }
        .pm-checkbox:checked ~ .pm-option-c { transition-delay: 0.25s; transform: translate(70px, -35px); }
        .pm-icon-rotate { transition: transform 0.3s ease; }
        .pm-checkbox:checked ~ .pm-button-menu .pm-icon-rotate { transform: rotate(180deg) scale(0.8); }

        /* Uiverse Profile Portfolio Card CSS */
        .ui-card {
          --font-color: #3E2723;
          --font-color-sub: #8D6E63;
          --bg-color: #FFFFFF;
          --main-color: #A67B5B;
          width: 260px;
          height: 290px;
          background: var(--bg-color);
          border: 3px solid var(--main-color);
          box-shadow: 7px 7px 0px var(--main-color);
          border-radius: 8px; /* Straight rectangle style */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          padding: 20px 0;
          transition: all 0.3s ease;
        }
        .ui-card-photo-wrapper { width: 110px; height: 110px; position: relative; margin-bottom: 15px; }
        .ui-card-title { text-align: center; color: var(--font-color); font-size: 28px; font-weight: 700; letter-spacing: -0.5px; font-family: "Montserrat", sans-serif !important; margin-top: 10px; line-height: 1.1; }
        .ui-card-title span { display: block; font-size: 10px; color: var(--font-color-sub); font-weight: 600; text-transform: uppercase; letter-spacing: 0.35em; margin-top: 8px; }
        .ui-card-socials { display: flex; height: 0; opacity: 0; margin-top: 15px; gap: 20px; transition: 0.5s; }
        .ui-card-socials-btn { width: 25px; height: 25px; border: none; background: transparent; cursor: pointer; }
        .ui-card-socials-btn svg { width: 100%; height: 100%; fill: var(--main-color); }
        .ui-card:hover > .ui-card-socials { opacity: 1; height: 35px; }
        .ui-card-socials-btn:hover { transform: translateY(-5px); transition: all 0.15s; }

        /* Uiverse Login Form CSS */
        .form-container {
          width: 100%;
          background-color: #FFFFFF;
          padding: 40px 30px;
          font-size: 14px;
          color: #3E2723;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          border-radius: 24px;
          border: 1px solid #EAE6DF;
          box-shadow: 0px 10px 30px rgba(62, 39, 35, 0.08);
        }
        .form-container button:active { scale: 0.95; }
        .form-container .logo-container { text-align: center; font-weight: 800; font-size: 32px; letter-spacing: -1px; }
        .form-container .form { display: flex; flex-direction: column; }
        .form-container .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-container .form-group label { display: block; margin-bottom: 5px; font-weight: 700; color: #8D6E63; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
        .form-container .form-group input {
          width: 100%; padding: 16px 45px 16px 16px; border-radius: 12px; font-family: inherit;
          border: 2px solid #EAE6DF; background-color: #F9F8F6; color: #3E2723; font-weight: 600;
          transition: all 0.2s ease;
        }
        .form-container .form-group input::placeholder { opacity: 0.4; font-weight: 500; }
        .form-container .form-group input:focus { outline: none; border-color: #A67B5B; background-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(166, 123, 91, 0.1); }
        .form-container .form-submit-btn {
          display: flex; justify-content: center; align-items: center; color: #fff;
          background-color: #3E2723; border: none; width: 100%; padding: 16px; gap: 8px;
          margin: 24px 0 12px 0; cursor: pointer; border-radius: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;
          transition: all 0.2s ease; box-shadow: 0 8px 20px rgba(62, 39, 35, 0.15);
        }
        .form-container .form-submit-btn:hover { background-color: #A67B5B; transform: translateY(-2px); box-shadow: 0 12px 25px rgba(166, 123, 91, 0.25); }

        @keyframes shrink { from { width: 100%; } to { width: 0%; } }
        @keyframes grow { from { width: 0%; } to { width: 100%; } }
      `}} />
    </>
  );
});

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  // Application Core State
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Login State
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Data State
  const TABS = ['dashboard', 'history', 'spin', 'analysis', 'settings'];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [direction, setDirection] = useState(0); 
  const [burstKey, setBurstKey] = useState(0); 
  const [transactions, setTransactions] = useState([]);
  const [settings, setSettings] = useState({
    ownerName: 'S A N · D E P T',
    initialBalance: 0
  });
  const [profileImage, setProfileImage] = useState(null);

  // Touch & Modal State — use refs for touch to avoid re-renders during swipe
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');

  // Derived Financial Data
  const { totalSpent, totalIncome, currentBalance } = useMemo(() => {
    let spent = 0;
    let income = 0;

    transactions.forEach(t => {
      if (t.type === 'spend') spent += parseFloat(t.amount);
      if (t.type === 'income') income += parseFloat(t.amount);
    });

    const current = parseFloat(settings.initialBalance) + income - spent;
    return { totalSpent: spent, totalIncome: income, currentBalance: current };
  }, [transactions, settings.initialBalance]);

  // Load Data from Supabase when Authenticated
  useEffect(() => {
    if (isAuthenticated && supabase) {
      const fetchData = async () => {
        try {
          // Fetch Settings
          const { data: settingsData, error: settingsError } = await supabase
            .from('user_settings')
            .select('*')
            .eq('id', 1)
            .single();

          if (settingsError && settingsError.code !== 'PGRST116') {
             console.error("Cloud Load Settings Error:", settingsError.message);
          }

          if (settingsData) {
            setSettings({ ownerName: settingsData.ownerName, initialBalance: settingsData.initialBalance });
            if (settingsData.profileImage) setProfileImage(settingsData.profileImage);
          } else {
            // Create default settings if it's a completely blank database
            await supabase.from('user_settings').insert([{ id: 1, ownerName: 'S A N · D E P T', initialBalance: 0 }]);
          }

          // Fetch Transactions
          const { data: txData, error: txError } = await supabase
            .from('transactions')
            .select('*')
            .order('timestamp', { ascending: false });

          if (txError) {
             console.error("Cloud Load Transactions Error:", txError.message);
          }

          if (txData) {
            setTransactions(txData);
          }
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);


  // Handle 5-second Loading Timer
  useEffect(() => {
    if (isAppLoading) {
      const timer = setTimeout(() => {
        setIsAppLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAppLoading]);

  // Handle 5-second Exit Timer -> Returns to Login
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(false);
        setIsAuthenticated(false);
        setActiveTab('dashboard'); // Reset tab for next login
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isExiting]);

  // Handle User Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginStatus === 'granted') return; 

    // Using Base64 obfuscation for "San.dept87" so password is not plainly visible
    if (btoa(loginPassword) === 'U2FuLmRlcHQ4Nw==') {
      setLoginStatus('granted');
      setTimeout(() => {
        setIsAuthenticated(true);
        setLoginPassword('');
        setLoginStatus(null);
      }, 1000);
    } else {
      setLoginStatus('denied');
    }
  };

  // Tab Navigation Handler
  const handleTabChange = useCallback((newTab) => {
    setActiveTab(prev => {
      const currentIndex = TABS.indexOf(prev);
      const newIndex = TABS.indexOf(newTab);
      if (currentIndex !== newIndex) {
        setDirection(newIndex > currentIndex ? 1 : -1);
        return newTab;
      }
      return prev;
    });
  }, []);

  // Swipe Handlers — using refs to avoid re-renders on every touch pixel
  const onTouchStart = useCallback((e) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);
  const onTouchMove = useCallback((e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      setActiveTab(prev => {
        const currentIndex = TABS.indexOf(prev);
        let nextTab = prev;
        if (isLeftSwipe && currentIndex < TABS.length - 1) nextTab = TABS[currentIndex + 1];
        if (isRightSwipe && currentIndex > 0) nextTab = TABS[currentIndex - 1];
        if (nextTab !== prev) {
          setDirection(TABS.indexOf(nextTab) > currentIndex ? 1 : -1);
        }
        return nextTab;
      });
    }
  }, []);

  // --- SUPABASE DATA WRAPPERS ---

  // Handle Transactions
  const handleAddTransaction = async (transaction) => {
    const newTx = {
      ...transaction,
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now()
    };
    
    // Update local UI instantly
    setTransactions([newTx, ...transactions]);
    handleTabChange('dashboard');

    // Save to Cloud
    if (supabase) {
      const { error } = await supabase.from('transactions').insert([newTx]);
      if (error) console.error("Cloud Save Error:", error.message);
    } else {
      console.log("Saved locally (Cloud not connected)");
    }
  };

  const handleDeleteTransaction = async (id) => {
    // Update local UI instantly
    setTransactions(transactions.filter(t => t.id !== id));
    
    // Delete from Cloud
    if (supabase) {
      const { error } = await supabase.from('transactions').delete().eq('id', id);
      if (error) console.error("Cloud Delete Error:", error.message);
    }
  };

  const handleClearData = async () => {
    if (deletePassword === 'San.dept') {
      // Clear Local State
      setTransactions([]);
      setSettings({ ownerName: 'S A N · D E P T', initialBalance: 0 });
      setProfileImage(null);
      setIsDeleteModalOpen(false);
      setDeletePassword('');
      setDeleteError('');
      handleTabChange('dashboard');

      // Clear Cloud State
      if (supabase) {
        // Delete all transactions (by finding records where ID is not blank)
        const { error: txError } = await supabase.from('transactions').delete().neq('id', '00000000-0000-0000-0000-000000000000'); 
        if (txError) console.error("Cloud Clear Error:", txError.message);
        
        // Reset Settings
        const { error: settingsError } = await supabase.from('user_settings').update({ 
          ownerName: 'S A N · D E P T', 
          initialBalance: 0, 
          profileImage: null 
        }).eq('id', 1);
        if (settingsError) console.error("Cloud Settings Reset Error:", settingsError.message);
      }
    } else {
      setDeleteError('Incorrect password.');
    }
  };

  const updateSettingsWrapper = async (newSettings) => {
    setSettings(newSettings);
    if (supabase) {
      const { error } = await supabase.from('user_settings').upsert([{ id: 1, ...newSettings }]);
      if (error) console.error("Cloud Update Settings Error:", error.message);
    }
  };

  const updateProfileImageWrapper = async (newImage) => {
    setProfileImage(newImage);
    if (supabase) {
      const { error } = await supabase.from('user_settings').update({ profileImage: newImage }).eq('id', 1);
      if (error) console.error("Cloud Update Image Error:", error.message);
    }
  };

  const handleSpinClick = () => {
    handleTabChange('spin');
    setBurstKey(prev => prev + 1);
  };

  return (
    <div className={`h-[100dvh] w-full ${theme.bg} selection:bg-[#A67B5B] selection:text-white overflow-hidden`}>
      <GlobalStyles />
      
      <AnimatePresence mode="wait">
        
        {/* ================================================== */}
        {/* 1. STARTING SPLASH SCREEN                          */}
        {/* ================================================== */}
        {isAppLoading && (
          <motion.div 
            key="splash" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-md mx-auto h-[100dvh] relative shadow-2xl bg-[#F9F8F6] overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center animate-in zoom-in-95 duration-700 mt-[-4rem]">
              <AnimatedSplashWalletIcon size={120} color="#A67B5B" />
            </div>
            
            <div className="flex flex-col items-center animate-in fade-in duration-700 mt-24">
              <h1 className="text-5xl font-bold tracking-tight text-[#3E2723] flex items-baseline">
              Wault<span className="text-[#A67B5B] mx-1">
              </h1>
              <p className="text-[#8D6E63] text-xs font-bold uppercase tracking-[0.2em] mt-3 mb-10">Track · your · Expenses</p>
              
              <div className="w-64 flex flex-col items-center">
                 <p className="text-[#8D6E63] text-[10px] uppercase tracking-[0.3em] font-bold mb-3 animate-pulse">
                   Loading...
                 </p>
                 <div className="w-full h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden">
                   <div className="h-full bg-[#A67B5B] rounded-full" style={{ animation: 'grow 5s linear forwards' }} />
                 </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================== */}
        {/* 2. LOGIN PAGE                                      */}
        {/* ================================================== */}
        {!isAppLoading && !isAuthenticated && (
          <motion.div 
            key="login" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-md mx-auto h-[100dvh] relative shadow-2xl bg-[#F9F8F6] overflow-hidden flex flex-col items-center justify-center p-6"
          >
            <div className="form-container">
              <div className="logo-container">Spen <span className="text-[#A67B5B]">·</span> Trc</div>
              <p className="text-center text-[#8D6E63] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 -mt-4">Track · your · Expenses</p>
              
              <form className="form" onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="password">Security Password</label>
                  <div className="relative flex items-center">
                    <input
                      required
                      placeholder="Enter your password"
                      name="password"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value); 
                        setLoginStatus(null); // Clear error when typing
                      }}
                      disabled={loginStatus === 'granted'}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-[#8D6E63] hover:text-[#3E2723] transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {loginStatus === 'granted' && (
                  <p className="text-[#6D8C70] text-sm font-bold text-center mt-2 tracking-wide animate-pulse">
                    ACCESS GRANTED
                  </p>
                )}
                {loginStatus === 'denied' && (
                  <p className="text-[#C05650] text-sm font-bold text-center mt-2 tracking-wide animate-pulse">
                    ACCESS DENIED
                  </p>
                )}
                
                <button 
                  type="submit" 
                  className={`form-submit-btn ${loginStatus === 'granted' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loginStatus === 'granted'}
                >
                  {loginStatus === 'granted' ? 'Authenticating...' : 'Access'}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ================================================== */}
        {/* 3. MAIN DASHBOARD APPLICATION                      */}
        {/* ================================================== */}
        {!isAppLoading && isAuthenticated && (
          <motion.div 
            key="main" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }} 
            className="max-w-md mx-auto h-[100dvh] relative shadow-2xl bg-[#F9F8F6] overflow-hidden flex flex-col"
          >
            {/* Tab Content */}
            <div 
              className="flex-1 overflow-x-hidden overflow-y-auto hide-scrollbar relative z-0 scroll-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTab}
                  custom={direction}
                  variants={{
                    initial: (dir) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
                    animate: { x: 0, opacity: 1, transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] } },
                    exit: (dir) => ({ x: dir > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] } })
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="p-6 pb-32 min-h-full gpu-layer"
                >
                  {activeTab === 'dashboard' && (
                    <Dashboard 
                      settings={settings} 
                      currentBalance={currentBalance} 
                      totalSpent={totalSpent} 
                      totalIncome={totalIncome} 
                      profileImage={profileImage}
                      setProfileImage={updateProfileImageWrapper}
                    />
                  )}
                  {activeTab === 'history' && (
                    <HistoryTab transactions={transactions} onDelete={handleDeleteTransaction} />
                  )}
                  {activeTab === 'spin' && (
                    <SpinTab onAdd={handleAddTransaction} />
                  )}
                  {activeTab === 'analysis' && (
                    <AnalysisTab transactions={transactions} totalSpent={totalSpent} />
                  )}
                  {activeTab === 'settings' && (
                    <SettingsTab 
                      settings={settings} 
                      setSettings={updateSettingsWrapper}
                      currentBalance={currentBalance}
                      totalIncome={totalIncome}
                      totalSpent={totalSpent}
                      onClearRequest={() => setIsDeleteModalOpen(true)}
                      onExitRequest={() => setIsExiting(true)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Fade-Out Mask (Hides content scrolling under the Nav) */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/90 to-transparent z-30 pointer-events-none gpu-layer"></div>

            {/* Bottom Navigation */}
            <nav className="absolute bottom-6 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#EAE6DF] rounded-[2rem] shadow-[0_10px_40px_rgba(62,39,35,0.12)] z-40 gpu-layer contain-layout">
              <div className="flex justify-around items-center px-1 py-2.5">
                <NavItem isActive={activeTab === 'dashboard'} onClick={() => handleTabChange('dashboard')}>
                  <LoaderPinwheelIcon isActive={activeTab === 'dashboard'} size={26} />
                </NavItem>
                
                <NavItem isActive={activeTab === 'history'} onClick={() => handleTabChange('history')}>
                  <HistoryAnimatedIcon isActive={activeTab === 'history'} size={26} />
                </NavItem>
                
                <div className="relative -top-7 flex flex-col items-center">
                  <div className="relative cursor-pointer" onClick={handleSpinClick}>
                    <button 
                      className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-150 active:scale-95 ${
                        activeTab === 'spin' ? theme.accent : 'bg-[#3E2723]'
                      } text-white ring-4 ring-[#F9F8F6] gpu-layer`}
                    >
                      <PlusCircle size={28} className={`transition-transform duration-500 ${activeTab === 'spin' ? 'rotate-45' : ''}`} />
                    </button>
                    <div key={burstKey} className={`burst-container ${burstKey > 0 ? 'spin-burst' : ''}`}>
                      {[1,2,3,4,5,6,7,8,9].map(i => (
                        <svg key={i} viewBox="0 0 300 300"><use href={`#shape-0${i}`} /></svg>
                      ))}
                    </div>
                  </div>
                </div>

                <NavItem isActive={activeTab === 'analysis'} onClick={() => handleTabChange('analysis')}>
                  <ChartPieAnimatedIcon isActive={activeTab === 'analysis'} size={26} />
                </NavItem>
                
                <NavItem isActive={activeTab === 'settings'} onClick={() => handleTabChange('settings')}>
                  <CogAnimatedIcon isActive={activeTab === 'settings'} size={26} />
                </NavItem>
              </div>
            </nav>

            {/* Exit Splash Screen Overlay (Shows on top of Main App) */}
            <AnimatePresence>
              {isExiting && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-[100] bg-[#FAFAFA] flex flex-col items-center justify-center overflow-hidden"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-0 w-full h-32 bg-red-400/20 blur-[50px] -translate-y-1/2 pointer-events-none"
                  />
                  
                  <motion.div 
                    initial={{ scale: 0.5, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.1 }}
                    className="relative z-10 w-[260px] bg-white border-[3px] border-[#151515] rounded-[20px] shadow-[8px_8px_0px_#151515] flex flex-col items-center justify-center py-8 px-6"
                  >
                    <div className="w-[85px] h-[85px] rounded-full border-[3px] border-[#151515] bg-[#ED7D7D] flex items-center justify-center mb-5 overflow-hidden relative">
                      {profileImage ? (
                         <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                         <User size={40} className="text-white" strokeWidth={2.5} />
                      )}
                    </div>

                    <h2 className="text-[#151515] text-[22px] font-black italic uppercase tracking-wide mb-4">
                      Signing Out
                    </h2>

                    <div className="w-full h-2.5 rounded-full border-[2px] border-[#151515] bg-white p-[1px] mb-4">
                      <div className="h-full bg-[#ED7D7D] rounded-full w-0" style={{ animation: 'grow 5s linear forwards' }} />
                    </div>

                    <p className="text-[#8D6E63] text-xs font-medium">
                      This is <span className="text-[#151515] font-black italic text-[15px] tracking-tight ml-1">SAN • DEPT!</span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Custom Password Modal */}
            <AnimatePresence>
              {isDeleteModalOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                >
                  <div className={`${theme.card} w-full max-w-sm rounded-3xl p-6 shadow-2xl transform transition-all`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <ShieldAlert className="text-red-600 w-6 h-6" />
                      </div>
                      <h3 className={`text-xl font-bold ${theme.textPrimary} mb-2`}>Wipe All Data?</h3>
                      <p className={`text-sm ${theme.textSecondary} mb-6`}>
                        This action cannot be undone. Please enter your security password to continue.
                      </p>
                      
                      <input 
                        type="password"
                        placeholder="Enter password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className={`w-full p-4 rounded-xl border ${deleteError ? 'border-red-400 bg-red-50' : theme.border} bg-[#F9F8F6] focus:outline-none focus:ring-2 focus:ring-[#A67B5B] mb-2`}
                      />
                      {deleteError && <p className="text-red-500 text-xs text-left w-full mb-4 pl-1">{deleteError}</p>}
                      
                      <div className="flex gap-3 w-full mt-4">
                        <button 
                          onClick={() => { setIsDeleteModalOpen(false); setDeleteError(''); setDeletePassword(''); }}
                          className={`flex-1 py-3.5 rounded-xl font-semibold bg-[#F0EBE1] ${theme.textPrimary}`}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleClearData}
                          className="flex-1 py-3.5 rounded-xl font-semibold bg-red-600 text-white shadow-md shadow-red-600/20"
                        >
                          Wipe Data
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUBCOMPONENTS ---

const NavItem = memo(function NavItem({ isActive, onClick, children }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center justify-center w-14 h-14 transition-colors duration-150 ${isActive ? theme.accentText : theme.textSecondary}`}
    >
      <div className={`transition-transform duration-150 ${isActive ? 'scale-110' : 'scale-100'}`}>
        {children}
      </div>
    </button>
  );
});

const Dashboard = memo(function Dashboard({ settings, currentBalance, totalSpent, totalIncome, profileImage, setProfileImage }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className={`text-sm font-medium ${theme.textSecondary}`}>{getGreeting()},</h2>
        <h1 className={`text-sm font-bold uppercase tracking-wider mt-0.5 ${theme.textPrimary}`}>Portfolio Owner</h1>
      </div>

      <div className="mb-10 mt-2">
        <ProfileCard ownerName={settings.ownerName} profileImage={profileImage} setProfileImage={setProfileImage} />
      </div>

      <div className={`${theme.textPrimary} bg-gradient-to-br from-[#FFFFFF] to-[#F5EFE6] rounded-3xl p-6 shadow-[0_8px_30px_rgb(62,39,35,0.06)] border border-white mb-2 relative overflow-hidden contain-layout`}>
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#A67B5B] opacity-5 rounded-full blur-2xl contain-strict"></div>
        
        <p className="text-sm font-medium text-[#8D6E63] mb-1">Total Balance</p>
        <h2 className="text-4xl font-extrabold tracking-tight mb-6">
          {formatCurrency(currentBalance)}
        </h2>
        
        <div className="flex justify-between border-t border-[#EAE6DF] pt-4">
          <div>
            <p className="text-xs font-medium text-[#8D6E63] mb-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6D8C70]"></span> Income
            </p>
            <p className="text-lg font-bold text-[#6D8C70]">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-[#8D6E63] mb-1 flex items-center gap-1 justify-end">
              Spent <span className="w-2 h-2 rounded-full bg-[#C05650]"></span>
            </p>
            <p className="text-lg font-bold text-[#C05650]">{formatCurrency(totalSpent)}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

const HistoryTab = memo(function HistoryTab({ transactions, onDelete }) {
  const grouped = useMemo(() => {
    const groups = {};
    transactions.forEach(tx => {
      const dateObj = new Date(tx.date);
      const year = dateObj.getFullYear();
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const key = `${year} - ${month}`;
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return groups;
  }, [transactions]);

  return (
    <div className="pb-6">
      <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-6`}>History</h2>
      
      {Object.keys(grouped).length === 0 ? (
        <div className="text-center py-20">
          <History className="w-16 h-16 text-[#D7CCC8] mx-auto mb-4" />
          <p className={`${theme.textSecondary}`}>Your financial journey starts here.</p>
        </div>
      ) : (
        Object.keys(grouped).map(groupKey => (
          <div key={groupKey} className="mb-8">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary} mb-3 pl-1`}>
              {groupKey}
            </h3>
            <div className="bg-white rounded-3xl shadow-sm border border-[#EAE6DF] overflow-hidden">
              {grouped[groupKey].map((tx, index) => (
                <div 
                  key={tx.id} 
                  className={`p-4 flex items-center justify-between ${index !== grouped[groupKey].length - 1 ? 'border-b border-[#F5F2ED]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full ${tx.type === 'spend' ? 'bg-[#FFF3F2] text-[#C05650]' : 'bg-[#F2F7F4] text-[#6D8C70]'}`}>
                      {tx.type === 'spend' ? getCategoryIcon(tx.category, "w-5 h-5") : <Wallet className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${theme.textPrimary}`}>
                        {tx.type === 'spend' ? tx.category : 'Income added'}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[11px] ${theme.textSecondary}`}>{tx.date.split('-').reverse().join('-')} • {tx.time}</span>
                        <span className="text-[10px] bg-[#F0EBE1] text-[#8D6E63] px-1.5 py-0.5 rounded flex items-center gap-1">
                          {getPaymentIcon(tx.method, "w-3 h-3")} {tx.method}
                        </span>
                      </div>
                      {tx.note && <p className="text-xs text-[#8D6E63] mt-1 italic max-w-[150px] truncate">"{tx.note}"</p>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`font-bold whitespace-nowrap ${tx.type === 'spend' ? theme.danger : theme.success}`}>
                      {tx.type === 'spend' ? '-' : '+'}{formatCurrency(tx.amount)}
                    </span>
                    <button 
                      onClick={() => onDelete(tx.id)}
                      className="text-[#D7CCC8] hover:text-[#C05650] transition-colors p-1"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
});

const SpinTab = memo(function SpinTab({ onAdd }) {
  const [type, setType] = useState('spend');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Food');
  const [method, setMethod] = useState('Gpay');
  const [isPmMenuOpen, setIsPmMenuOpen] = useState(false);

  const categories = ['Food', 'Transport', 'Shop', 'Bills & Utilities', 'Others'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) return;
    
    onAdd({
      type,
      amount: parseFloat(amount),
      note,
      category: type === 'spend' ? category : null,
      method
    });
    
    setAmount('');
    setNote('');
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-6`}>New Entry</h2>
      
      <div className="bg-[#EAE6DF] p-1 rounded-xl flex mb-8 max-w-[240px] mx-auto">
        <button 
          onClick={() => setType('spend')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${type === 'spend' ? 'bg-white text-[#3E2723] shadow-sm' : 'text-[#8D6E63]'}`}
        >
          Spend
        </button>
        <button 
          onClick={() => setType('income')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${type === 'income' ? 'bg-white text-[#3E2723] shadow-sm' : 'text-[#8D6E63]'}`}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center bg-white p-6 rounded-3xl shadow-sm border border-[#EAE6DF]">
          <p className={`text-sm font-medium ${theme.textSecondary} mb-2`}>Enter Amount</p>
          <div className="flex items-center justify-center text-4xl font-bold text-[#3E2723]">
            <span className="mr-1 text-2xl text-[#8D6E63]">₹</span>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="0"
              step="any"
              className="w-full max-w-[180px] bg-transparent border-none outline-none text-center placeholder-[#D7CCC8]"
              required
            />
          </div>
        </div>

        <div className="flex items-start w-full flex-row py-6 pl-12 pr-4 isolate [unicode-bidi:isolate] bg-[#F5EFE6] rounded-2xl relative before:content-[''] before:absolute before:w-1.5 before:h-4/5 before:bg-[#A67B5B] before:z-[10] before:left-5 before:top-1/2 before:-translate-y-1/2 before:rounded-full">
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note: Write down your spending reason..."
            rows="4"
            className="w-full bg-transparent outline-none text-[#3E2723] font-medium placeholder-[#A89F91] whitespace-pre-wrap resize-none text-base"
          />
        </div>

        {type === 'spend' && (
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wide ${theme.textSecondary} mb-3 pl-1`}>Category</label>
            <div className="grid grid-cols-5 gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                    category === cat 
                      ? 'border-[#A67B5B] bg-[#F5EFE6] text-[#A67B5B]' 
                      : 'border-[#EAE6DF] bg-white text-[#8D6E63] hover:bg-[#F9F8F6]'
                  }`}
                >
                  {getCategoryIcon(cat, "w-6 h-6 mb-1")}
                  <span className="text-[9px] font-medium text-center leading-tight">{cat.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 pb-2 text-center relative">
          {isPmMenuOpen && (
            <div className="fixed inset-0 z-[5]" onClick={() => setIsPmMenuOpen(false)}></div>
          )}

          <label className={`block text-xs font-bold uppercase tracking-wide ${theme.textSecondary} mb-12`}>
            Payment Method: <span className="text-[#3E2723] ml-1 px-2 py-1 bg-[#F5EFE6] rounded-md">{method}</span>
          </label>
          
          <div className="pm-container relative z-10">
            <input 
              type="checkbox" 
              className="pm-checkbox" 
              checked={isPmMenuOpen}
              onChange={(e) => setIsPmMenuOpen(e.target.checked)}
            />
            <div className="pm-button-menu">
              <div className="pm-icon-rotate">
                {isPmMenuOpen ? <PlusCircle size={28} className="rotate-45" /> : getPaymentIcon(method, "w-8 h-8")}
              </div>
            </div>
            
            <button type="button" className="pm-option pm-option-a group" onClick={() => {setMethod('Cash'); setIsPmMenuOpen(false);}}>
              {getPaymentIcon('Cash', "w-5 h-5")}
              <span className="absolute -top-6 text-[10px] font-bold text-[#3E2723] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Cash</span>
            </button>
            <button type="button" className="pm-option pm-option-b group" onClick={() => {setMethod('Gpay'); setIsPmMenuOpen(false);}}>
              {getPaymentIcon('Gpay', "w-5 h-5")}
              <span className="absolute -top-6 text-[10px] font-bold text-[#3E2723] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Gpay</span>
            </button>
            <button type="button" className="pm-option pm-option-c group" onClick={() => {setMethod('Debit/Credit'); setIsPmMenuOpen(false);}}>
              {getPaymentIcon('Debit/Credit', "w-5 h-5")}
              <span className="absolute -top-6 text-[10px] font-bold text-[#3E2723] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Card</span>
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className={`w-full py-4 mt-4 rounded-2xl font-bold text-white text-lg shadow-lg transition-transform active:scale-[0.98] ${
            type === 'spend' ? 'bg-[#E57373] shadow-[#E57373]/20' : 'bg-[#6D8C70] shadow-[#6D8C70]/20'
          }`}
        >
          {type === 'spend' ? 'S P E N D' : 'I N C O M E'}
        </button>
      </form>
      <div className="text-center mt-4 text-[10px] text-[#A89F91]"></div>
    </div>
  );
});

const AnalysisTab = memo(function AnalysisTab({ transactions, totalSpent }) {
  const categoryData = useMemo(() => {
    const data = {};
    transactions.filter(t => t.type === 'spend').forEach(tx => {
      data[tx.category] = (data[tx.category] || 0) + parseFloat(tx.amount);
    });
    
    return Object.entries(data)
      .map(([name, amount]) => ({ name, amount, percentage: totalSpent > 0 ? (amount / totalSpent) * 100 : 0 }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions, totalSpent]);

  return (
    <div className="pb-4">
      <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-6`}>Analysis</h2>
      
      <div className="bg-[#3E2723] text-white p-6 rounded-3xl shadow-xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <PieChart className="w-24 h-24" />
        </div>
        <p className="text-[#D7CCC8] text-sm font-medium mb-1">Total Spended</p>
        <h3 className="text-3xl font-bold">{formatCurrency(totalSpent)}</h3>
      </div>

      <h3 className={`text-sm font-bold uppercase tracking-wider ${theme.textSecondary} mb-4 pl-1`}>Spending by Category</h3>
      
      {categoryData.length === 0 ? (
        <div className={`text-center py-10 bg-white rounded-3xl border border-[#EAE6DF] ${theme.textSecondary}`}>
          No spending data available yet.
        </div>
      ) : (
        <div className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-[#EAE6DF]">
          {categoryData.map(cat => (
            <div key={cat.name}>
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-[#A67B5B]">{getCategoryIcon(cat.name, "w-4 h-4")}</div>
                  <span className={`font-semibold text-sm ${theme.textPrimary}`}>{cat.name}</span>
                </div>
                <div className="text-right">
                  <span className={`block font-bold text-sm text-[#3E2723]`}>{formatCurrency(cat.amount)}</span>
                </div>
              </div>
              <div className="w-full bg-[#F0EBE1] rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-[#A67B5B] h-2.5 rounded-full transition-[width] duration-1000 ease-out" 
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-right mt-1 text-[#8D6E63]">{cat.percentage.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

const SettingsTab = memo(function SettingsTab({ settings, setSettings, currentBalance, totalIncome, totalSpent, onClearRequest, onExitRequest }) {
  const [manualBalance, setManualBalance] = useState('');

  const handleSaveBalance = () => {
    if (manualBalance !== '' && !isNaN(manualBalance)) {
      const newCurrent = parseFloat(manualBalance);
      const newInitial = newCurrent - totalIncome + totalSpent;
      setSettings({ ...settings, initialBalance: newInitial });
      setManualBalance('');
    }
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-6`}>Settings</h2>

      <div className="bg-white rounded-3xl shadow-sm border border-[#EAE6DF] overflow-hidden mb-6">
        <div className="p-5 border-b border-[#F5F2ED] flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F5EFE6] rounded-full flex items-center justify-center text-[#A67B5B]">
            <Wallet size={24} />
          </div>
          <div>
            <p className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary}`}>Wallet Owner</p>
            <input 
              type="text" 
              value={settings.ownerName}
              onChange={(e) => setSettings({...settings, ownerName: e.target.value})}
              className={`font-bold text-lg bg-transparent outline-none ${theme.textPrimary} border-b border-transparent focus:border-[#A67B5B] transition-colors`}
            />
          </div>
        </div>

        <div className="p-5">
          <p className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary} mb-3`}>Balance Adjustment</p>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className={theme.textPrimary}>Actual Current Balance</span>
              <span className="font-bold">{formatCurrency(currentBalance)}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8D6E63] font-medium">₹</span>
                <input 
                  type="number"
                  placeholder="Override balance..."
                  value={manualBalance}
                  onChange={(e) => setManualBalance(e.target.value)}
                  className="w-full bg-[#F9F8F6] border border-[#EAE6DF] rounded-xl py-3 pl-8 pr-3 outline-none focus:border-[#A67B5B] text-sm font-medium"
                />
              </div>
              <button 
                onClick={handleSaveBalance}
                className="bg-[#3E2723] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md active:scale-95 transition-transform"
              >
                Save
              </button>
            </div>
            <p className="text-[10px] text-[#8D6E63] leading-tight">
              Saving a new balance will mathematically adjust your initial wallet state without deleting your transaction history.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#EAE6DF] p-5">
        <p className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary} mb-1`}>Danger Zone</p>
        <p className="text-xs text-[#8D6E63] mb-4">Permanently delete all transactions and reset balance.</p>
        
        <button 
          onClick={onClearRequest}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 rounded-xl font-bold border border-red-100 transition-colors hover:bg-red-100"
        >
          <Trash2 size={18} />
          Restore & Clear all Data
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#EAE6DF] p-5 mt-6">
        <p className={`text-xs font-bold uppercase tracking-wider ${theme.textSecondary} mb-4`}>System</p>
        <button 
          onClick={onExitRequest}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F9F8F6] text-[#3E2723] rounded-xl font-bold border border-[#EAE6DF] transition-colors hover:bg-[#F0EBE1]"
        >
          <LogOut size={18} />
          Exit Application
        </button>
      </div>

      <div className="text-center mt-4 text-[10px] text-[#A89F91]">
      </div>
    </div>
  );
});
