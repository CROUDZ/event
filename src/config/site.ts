// Configuration du site - Tu peux modifier ces valeurs facilement
export const siteConfig = {
  // Informations principales
  streamerName: "Runkko",
  milestone: "100 ABONNÉS",

  // Serveur Minecraft
  serverIP: "À venir...", // Change ça quand tu auras l'IP réelle

  // Textes personnalisables
  heroSubtitle: "Félicitations Runkko ! 🎉",
  eventTitle: "Une aventure spéciale t'attend !",
  eventDescription: {
    line1:
      "Pour célébrer tes 100 abonnés, nous avons préparé quelque chose de très spécial ! 🎮",
    line2:
      "Une enquête mystérieuse t'attend, et si tu réussis à la résoudre, tu découvriras un serveur Minecraft exclusif où une surprise t'attend...",
    line3: "Es-tu prêt à relever le défi ? 🕵️‍♂️",
  },

  // Images
  logo: {
    enabled: true, // ✅ Logo activé avec l'avatar Minecraft de Runkko
    path: "/logo-runkko.webp", // Avatar Minecraft de Runkko
    alt: "Avatar Minecraft de Runkko",
  },

  // Couleurs (classes Tailwind CSS)
  colors: {
    primary: "from-purple-900 via-blue-900 to-indigo-900",
    accent: "from-yellow-400 to-orange-500",
    minecraft: "from-green-600 to-emerald-600",
  },

  // Métadonnées
  meta: {
    title: "Runkko - 100 Abonnés Célébration !",
    description:
      "Une aventure spéciale pour célébrer les 100 abonnés de Runkko ! Résous l'enquête et découvre le serveur Minecraft exclusif.",
  },
};
