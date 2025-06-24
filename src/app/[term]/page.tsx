"use client"
import { useTranslation } from "react-i18next";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";

interface SectionItem {
  icone: string;
  title: string;
  description: string;
}

interface Section {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  items: SectionItem[];
}

export default function TermPage({ params }: { params: { term: string } }) {
  const { t } = useTranslation();
  const sections: Section[] = [
    {
      key: "webDevelopment",
      title: "Développement Web",
      subtitle: "Créer des sites web et applications performants.",
      description: "Les technologies modernes pour créer des applications web.",
      imageUrl: "/filmfusion.png",
      items: [
        {
          icone: "💻",
          title: "React",
          description: "Bibliothèque JavaScript pour construire des interfaces utilisateur.",
        },
        {
          icone: "⚙️",
          title: "Next.js",
          description: "Framework React pour le rendu côté serveur et le routing.",
        },
      ],
    },
    {
      key: "mobileDevelopment",
      title: "Design UI/UX",
      subtitle: "Concevoir des interfaces utilisateur attrayantes.",
      description: "Créer des expériences utilisateur intuitives et esthétiques.",
      imageUrl: "/cvcometImg.png",
      items: [
        {
          icone: "🎨",
          title: "Figma",
          description: "Outil collaboratif pour le design d'interfaces.",
        },
        {
          icone: "📐",
          title: "Wireframes",
          description: "Esquisses des interfaces avant le développement.",
        },
      ],
    },
  ];

  const { term } = params;
  const currentSection = sections.find((section) => section.key === term);

  if (!currentSection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t("section.notFoundTitle")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t("section.notFoundDescription", { slug: term })}
        </p>
        <button onClick={() => window.history.back()} className="text-blue-500 hover:underline">
          {t("section.goBack")}
        </button>
      </div>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 md:py-24 pt-32 px-4 md:px-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            {currentSection.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {currentSection.subtitle}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {currentSection.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src={currentSection.imageUrl}
            alt={currentSection.title}
            className="rounded-lg shadow-xl max-w-full h-auto"
          />
        </motion.div>
      </div>

      <div className="container mx-auto mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t("section.keyFeatures")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSection.items.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 + 0.4 }}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icone}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}