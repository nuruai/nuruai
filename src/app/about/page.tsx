"use client"
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { t } from "i18next";

export default function About() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/apropos.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
        {/* <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">À propos de Nuruai</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Nuruai est une entreprise innovante spécialisée dans les solutions d'intelligence artificielle et la transformation digitale.</p>
        </div> */}
      </div>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
        <p className="text-lg leading-relaxed">
          {t('about.paragraph1')}
        </p>
        <p className="text-lg leading-relaxed mt-4">
          {t('about.paragraph2')}
        </p>
        <h2 className="text-2xl font-semibold mb-4 mt-6">Notre équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <img src="/me.jpg" alt="CEO" className="w-24 h-24 mx-auto rounded-full mb-2 object-cover" />
            <h3 className="font-bold">Jospin Ndagano</h3>
            <p className="text-sm text-gray-500">CEO & Fondateur</p>
          </div>
          {/* <div className="bg-white rounded-lg shadow p-4 text-center">
            <img src="/team2.jpg" alt="CTO" className="w-24 h-24 mx-auto rounded-full mb-2 object-cover" />
            <h3 className="font-bold">Fatou Ndiaye</h3>
            <p className="text-sm text-gray-500">CTO</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <img src="/team3.jpg" alt="Lead IA" className="w-24 h-24 mx-auto rounded-full mb-2 object-cover" />
            <h3 className="font-bold">Mohamed Traoré</h3>
            <p className="text-sm text-gray-500">Lead IA</p>
          </div> */}
        </div>
      </section>
    </div>
  );
}