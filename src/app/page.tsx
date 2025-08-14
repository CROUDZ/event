"use client";

import { motion } from "framer-motion";
import { Copy, Check, Server, Users } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import ConfettiEffect from "@/components/ConfettiEffect";
import StatsSection from "@/components/StatsSection";

import Logo from "@/assets/logo-runkko.webp";

// Helper for particles
function generateParticles(count: number) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    duration: Math.random() * 3 + 2,
  }));
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [serverIP, setServerIP] = useState("À venir...");
  const [particles, setParticles] = useState<
    { left: number; top: number; x: number; y: number; duration: number }[]
  >([]);

  // Only generate particles on client to avoid SSR hydration mismatch
  useEffect(() => {
    setParticles(generateParticles(50));
  }, []);

  const copyToClipboard = async () => {
    if (serverIP !== "À venir...") {
      await navigator.clipboard.writeText(serverIP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Effet de confettis */}
      <ConfettiEffect duration={8000} />

      {/* Hero Section avec l'image logo */}
      <motion.section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Effet de particules animées */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30"
              animate={{
                x: [0, p.x, 0],
                y: [0, p.y, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
              }}
            />
          ))}
        </div>

        <div className="flex justify-center items-center flex-col text-center z-10 px-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            className="mb-8"
          >
            <Image
              src={Logo}
              alt="Logo Runkko"
              width={256}
              height={256}
              className=" object-cover drop-shadow-xl rounded-2xl"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            100 ABONNÉS
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-blue-200 font-semibold"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Félicitations Runkko ! 🎉
          </motion.p>
        </div>

        {/* Scroll indicator amélioré */}
        <motion.div
          className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center items-start bg-white/10 shadow-lg">
            <div className="w-2 h-4 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="mt-2 text-xs text-white/70">Scroll</span>
        </motion.div>
      </motion.section>

      {/* Section explicative */}
      <motion.section
        className="bg-white py-16 px-2 md:px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8 shadow-lg"
          >
            <Users className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Une aventure spéciale t'attend !
          </motion.h2>

          <motion.div
            className="text-base md:text-lg text-gray-600 leading-relaxed space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>
              Pour célébrer tes 100 abonnés, nous avons préparé quelque chose de très spécial ! 🎮
            </p>
            <p>
              Une enquête mystérieuse t'attend, et si tu réussis à la résoudre, tu découvriras un serveur Minecraft exclusif où une surprise t'attend...
            </p>
            <p className="text-purple-600 font-semibold">
              Es-tu prêt à relever le défi ? 🕵️‍♂️
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Section statistiques animées */}
      <StatsSection />

      {/* Section serveur Minecraft */}
      <motion.section
        className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 px-2 md:px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-8 shadow-lg"
          >
            <Server className="w-10 h-10 text-green-600" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Serveur Minecraft Spécial
          </motion.h2>

          <motion.p
            className="text-lg text-green-100 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Résous l'enquête pour débloquer l'accès au serveur !
          </motion.p>

          <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              IP du Serveur
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <motion.div
                className="bg-black/20 px-6 py-4 rounded-lg font-mono text-lg md:text-xl text-white flex-1 text-center select-all"
                whileHover={{ scale: 1.02 }}
              >
                {serverIP}
              </motion.div>

              <motion.button
                onClick={copyToClipboard}
                className={`bg-white/20 hover:bg-white/30 p-4 rounded-lg transition-colors shadow-lg ${
                  serverIP === "À venir..."
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                whileHover={{ scale: serverIP === "À venir..." ? 1 : 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={serverIP === "À venir..."}
                aria-label="Copier l'IP du serveur"
              >
                {copied ? (
                  <Check className="w-6 h-6 text-green-300" />
                ) : (
                  <Copy className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>

            <p className="text-green-100 mt-4 text-sm">
              {serverIP === "À venir..."
                ? "L'IP sera révélée après avoir résolu l'enquête !"
                : copied
                ? "IP copiée dans le presse-papier !"
                : "Clique pour copier l'IP"}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 py-10 px-2 md:px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-gray-400 text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Bonne chance pour ton enquête, Runkko ! 🎯
          </motion.p>

          <motion.div
            className="mt-6 text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Créé avec ❤️ pour célébrer tes 100 abonnés
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
