"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Copy, Check, Server, Users } from "lucide-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import ConfettiEffect from "@/components/ConfettiEffect";
import StatsSection from "@/components/StatsSection";

import Logo from "@/assets/logo-runkko.webp";

// Helper for particles with mobile optimization
function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    x: (Math.random() - 0.5) * 60,
    y: (Math.random() - 0.5) * 60,
    duration: Math.random() * 2 + 3,
  }));
}

// Default performance settings for SSR
const defaultPerformanceSettings = {
  particleCount: 50,
  enableParticles: true,
  animationDuration: 0.8,
  enableComplexAnimations: true,
};

// Detect mobile devices (client-side only)
const getClientPerformanceSettings = () => {
  if (typeof window === 'undefined') return defaultPerformanceSettings;
  
  const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return {
    particleCount: mobile ? 15 : 50,
    enableParticles: !mobile || (mobile && window.devicePixelRatio <= 2),
    animationDuration: mobile ? 0.4 : 0.8,
    enableComplexAnimations: !mobile,
  };
};

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [serverIP, setServerIP] = useState("À venir...");
  const [qcmStep, setQcmStep] = useState(0);
  const [qcmDone, setQcmDone] = useState(false);
  const [qcmError, setQcmError] = useState(false);
  const [particles, setParticles] = useState<
    { left: number; top: number; x: number; y: number; duration: number }[]
  >([]);
  const [performanceSettings, setPerformanceSettings] = useState(defaultPerformanceSettings);
  const [mounted, setMounted] = useState(false);

  // Memoize QCM questions to prevent re-renders
  const qcmQuestions = useMemo(() => [
    {
      question: "Quel jour a été créé ta chaîne youtube :",
      answers: ["12 Mars 2024", "53 Février 2048", "23 Février 2024"],
      correct: 2,
    },
    {
      question: "Qui est ton meilleur ami :",
      answers: ["Goldmine2011", "Zenith999", "Este_Ytb", "Jean Luc Mélenchon"],
      correct: 2,
    },
    {
      question: "Pour qui Zenith999 a t il voté lors des dernières élections présidentielles :",
      answers: ["Emmanuel Macron", "Marine Lepen", "Eric Z"],
      correct: 2,
    },
  ], []);

  // Initialize client-side only features after mount
  useEffect(() => {
    setMounted(true);
    
    const settings = getClientPerformanceSettings();
    setPerformanceSettings(settings);
    
    if (settings.enableParticles) {
      setParticles(generateParticles(settings.particleCount));
    }

    // Handle resize for responsive particle count
    const handleResize = () => {
      const newSettings = getClientPerformanceSettings();
      setPerformanceSettings(newSettings);
      if (newSettings.enableParticles) {
        setParticles(generateParticles(newSettings.particleCount));
      } else {
        setParticles([]);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Optimized QCM handler with useCallback
  const handleQcmAnswer = useCallback((idx: number) => {
    if (idx === qcmQuestions[qcmStep].correct) {
      setQcmError(false);
      const delay = performanceSettings.animationDuration * 1000 * 0.5;
      setTimeout(() => {
        if (qcmStep < qcmQuestions.length - 1) {
          setQcmStep(qcmStep + 1);
        } else {
          setQcmDone(true);
          setServerIP("À venir...");
        }
      }, delay);
    } else {
      setQcmError(true);
      setTimeout(() => setQcmError(false), 1200);
    }
  }, [qcmStep, qcmQuestions, performanceSettings.animationDuration]);

  const copyToClipboard = useCallback(async () => {
    if (serverIP !== "À venir...") {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      setServerIP("IP copiée !");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [serverIP]);

  // Optimized animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LazyMotion features={domAnimation}>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          {/* Static loading state matching the initial render */}
          <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="flex justify-center items-center flex-col text-center z-10 px-4">
              <div className="mb-8">
                <Image
                  src={Logo}
                  alt="Logo Runkko"
                  width={256}
                  height={256}
                  className="object-cover drop-shadow-xl rounded-2xl"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                100 ABONNÉS
              </h1>
              <p className="text-lg md:text-2xl text-blue-200 font-semibold">
                Félicitations Runkko ! 🎉
              </p>
            </div>
            <div className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start bg-white/10">
                <div className="w-1 h-3 bg-white rounded-full mt-1"></div>
              </div>
              <span className="mt-2 text-xs text-white/70">Scroll</span>
            </div>
          </section>
          {/* ...rest of static content... */}
        </div>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Conditional confetti effect */}
      {performanceSettings.enableComplexAnimations && (
        <ConfettiEffect duration={6000} />
      )}

      {/* Hero Section */}
      <m.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: performanceSettings.animationDuration }}
      >
        {/* Optimized particles - only render when mounted */}
        {performanceSettings.enableParticles && particles.length > 0 && (
          <div className="absolute inset-0 pointer-events-none will-change-transform">
            {particles.map((p, i) => (
              <m.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                animate={{
                  x: [0, p.x, 0],
                  y: [0, p.y, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  transform: 'translate3d(0,0,0)',
                }}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center items-center flex-col text-center z-10 px-4">
          <m.div
            variants={scaleVariants}
            transition={{ 
              duration: performanceSettings.animationDuration,
              type: performanceSettings.enableComplexAnimations ? "spring" : "tween",
              bounce: performanceSettings.enableComplexAnimations ? 0.5 : 0
            }}
            className="mb-8"
          >
            <Image
              src={Logo}
              alt="Logo Runkko"
              width={256}
              height={256}
              className="object-cover drop-shadow-xl rounded-2xl"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </m.div>

          <m.h1
            className="text-4xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            variants={fadeInVariants}
            transition={{ delay: 0.3, duration: performanceSettings.animationDuration }}
          >
            100 ABONNÉS
          </m.h1>

          <m.p
            className="text-lg md:text-2xl text-blue-200 font-semibold"
            variants={fadeInVariants}
            transition={{ delay: 0.5, duration: performanceSettings.animationDuration }}
          >
            Félicitations Runkko ! 🎉
          </m.p>
        </div>

        {/* Simplified scroll indicator */}
        <m.div
          className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start bg-white/10">
            <div className="w-1 h-3 bg-white rounded-full mt-1 animate-bounce"></div>
          </div>
          <span className="mt-2 text-xs text-white/70">Scroll</span>
        </m.div>
      </m.section>

      {/* Sections with optimized animations */}
      <m.section
        className="bg-white py-12 md:py-16 px-2 md:px-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        transition={{ duration: performanceSettings.animationDuration }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            variants={scaleVariants}
            transition={{ duration: performanceSettings.animationDuration }}
            className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 md:mb-8"
          >
            <Users className="w-8 md:w-10 h-8 md:h-10 text-white" />
          </m.div>

          <m.h2
            className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8"
            variants={fadeInVariants}
            transition={{ delay: 0.2, duration: performanceSettings.animationDuration }}
          >
            Une aventure spéciale t'attend !
          </m.h2>

          <m.div
            className="text-sm md:text-lg text-gray-600 leading-relaxed space-y-4 md:space-y-6"
            variants={fadeInVariants}
            transition={{ delay: 0.4, duration: performanceSettings.animationDuration }}
          >
            <p>Pour célébrer tes 100 abonnés, nous avons préparé quelque chose de très spécial ! 🎮</p>
            <p>Une enquête mystérieuse t'attend, et si tu réussis à la résoudre, tu découvriras un serveur Minecraft exclusif où une surprise t'attend...</p>
            <p className="text-purple-600 font-semibold">Es-tu prêt à relever le défi ? 🕵️‍♂️</p>
          </m.div>
        </div>
      </m.section>

      {/* Lazy load stats section */}
      <StatsSection />

      {/* QCM Section with optimized animations */}
      <m.section
        className="bg-gradient-to-br from-purple-50 via-blue-100 to-indigo-100 py-12 md:py-16 px-2 md:px-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        transition={{ duration: performanceSettings.animationDuration }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <m.h2
            className="text-xl md:text-3xl font-bold text-purple-800 mb-6 md:mb-8"
            variants={fadeInVariants}
            transition={{ delay: 0.2, duration: performanceSettings.animationDuration }}
          >
            L'Enquête Mystère : QCM
          </m.h2>
          {!qcmDone ? (
            <m.div
              key={qcmStep}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: performanceSettings.animationDuration }}
              className={`rounded-2xl shadow-xl bg-white/80 p-6 md:p-8 border-2 ${
                qcmError ? "border-red-400" : "border-transparent"
              }`}
              style={{ minHeight: 240 }}
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-purple-700 font-bold text-sm md:text-base">
                  Question {qcmStep + 1} / {qcmQuestions.length}
                </span>
                <div className="flex gap-1">
                  {qcmQuestions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 md:w-4 h-2 rounded-full transition-all duration-300 ${
                        i < qcmStep ? "bg-green-400" : i === qcmStep ? "bg-purple-400" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-purple-900">
                {qcmQuestions[qcmStep].question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {qcmQuestions[qcmStep].answers.map((ans, idx) => (
                  <m.button
                    key={idx}
                    whileHover={performanceSettings.enableComplexAnimations ? {
                      scale: 1.05,
                      backgroundColor: "#e9d5ff",
                    } : {}}
                    whileTap={{ scale: 0.98 }}
                    className={`transition-all duration-200 bg-purple-100 text-purple-900 font-bold py-3 px-4 md:px-6 rounded-xl shadow-md border-2 text-sm md:text-base ${
                      qcmError ? "border-red-300" : "border-transparent"
                    }`}
                    onClick={() => handleQcmAnswer(idx)}
                    disabled={qcmError}
                  >
                    {ans}
                  </m.button>
                ))}
              </div>
              {qcmError && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 md:mt-6 text-red-500 font-semibold text-sm md:text-base"
                >
                  Mauvaise réponse ! Réessaie...
                </m.div>
              )}
            </m.div>
          ) : (
            <m.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: performanceSettings.animationDuration }}
              className="flex flex-col items-center rounded-2xl shadow-xl bg-white/80 p-6 md:p-8 border-2 border-green-300"
            >
              <p className="text-lg md:text-xl font-bold text-green-700 mb-4">
                Voilà tu as réussi le QCM ! 🎉
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                Tu peux maintenant accéder au serveur Minecraft grâce à cette IP : <span className="font-mono font-bold">{serverIP}</span>
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-2">
                Et grâce au modpack <span className="font-bold">Demande le à Goldmine2011</span>
              </p>
            </m.div>
          )}
        </div>
      </m.section>

      {/* Server section with optimized styling */}
      <m.section
        className="bg-gradient-to-r from-green-600 to-emerald-600 py-12 md:py-16 px-2 md:px-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        transition={{ duration: performanceSettings.animationDuration }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <m.div
            variants={scaleVariants}
            transition={{ duration: performanceSettings.animationDuration }}
            className="inline-flex items-center justify-center w-16 md:w-20 h-16 md:h-20 bg-white rounded-full mb-6 md:mb-8"
          >
            <Server className="w-8 md:w-10 h-8 md:h-10 text-green-600" />
          </m.div>

          <m.h2
            className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8"
            variants={fadeInVariants}
            transition={{ delay: 0.2, duration: performanceSettings.animationDuration }}
          >
            Serveur Minecraft Spécial
          </m.h2>

          <m.p
            className="text-base md:text-lg text-green-100 mb-8 md:mb-12"
            variants={fadeInVariants}
            transition={{ delay: 0.4, duration: performanceSettings.animationDuration }}
          >
            Résous l'enquête pour débloquer l'accès au serveur !
          </m.p>

          <m.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl"
            variants={scaleVariants}
            transition={{ delay: 0.6, duration: performanceSettings.animationDuration }}
          >
            <h3 className="text-lg md:text-2xl font-bold text-white mb-4">IP du Serveur</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <m.div
                className="bg-black/20 px-4 md:px-6 py-3 md:py-4 rounded-lg font-mono text-base md:text-xl text-white flex-1 text-center select-all"
                whileHover={performanceSettings.enableComplexAnimations ? { scale: 1.02 } : {}}
              >
                {serverIP}
              </m.div>

              <m.button
                onClick={copyToClipboard}
                className={`bg-white/20 hover:bg-white/30 p-3 md:p-4 rounded-lg transition-colors shadow-lg ${
                  serverIP === "À venir..." ? "opacity-50 cursor-not-allowed" : ""
                }`}
                whileHover={performanceSettings.enableComplexAnimations && serverIP !== "À venir..." ? { scale: 1.1 } : {}}
                whileTap={{ scale: 0.95 }}
                disabled={serverIP === "À venir..."}
                aria-label="Copier l'IP du serveur"
              >
                {copied ? <Check className="w-5 md:w-6 h-5 md:h-6 text-green-300" /> : <Copy className="w-5 md:w-6 h-5 md:h-6 text-white" />}
              </m.button>
            </div>

            <p className="text-green-100 mt-4 text-xs md:text-sm">
              {serverIP === "À venir..." ? "L'IP sera révélée après avoir résolu l'enquête !" : copied ? "IP copiée dans le presse-papier !" : "Clique pour copier l'IP"}
            </p>
          </m.div>
        </div>
      </m.section>

      {/* Footer */}
      <m.footer
        className="bg-gray-900 py-8 md:py-10 px-2 md:px-4"
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        transition={{ duration: performanceSettings.animationDuration }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <m.p
            className="text-gray-400 text-sm md:text-lg"
            variants={fadeInVariants}
            transition={{ delay: 0.2, duration: performanceSettings.animationDuration }}
          >
            Bonne chance pour ton enquête, Runkko ! 🎯
          </m.p>

          <m.div
            className="mt-4 md:mt-6 text-gray-500 text-xs md:text-base"
            variants={fadeInVariants}
            transition={{ delay: 0.4, duration: performanceSettings.animationDuration }}
          >
            Créé avec ❤️ pour célébrer tes 100 abonnés
          </m.div>
        </div>
      </m.footer>
    </div>
    </LazyMotion>
  );
}
