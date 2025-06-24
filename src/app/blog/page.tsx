"use client"
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const BlogPage: FC = () => {
  const { t } = useTranslation();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/blog-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blog</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Retrouvez nos articles sur l'intelligence artificielle, la tech et la transformation digitale.
          </p>
        </motion.div>
      </div>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <img src="/blog1.jpg" alt="Article 1" className="w-full h-40 object-cover rounded mb-3" />
            <div className='p-3'>
              <h3 className="font-bold mb-1">L'impact de l'IA sur les PME</h3>
              <p className="text-gray-400 text-sm mb-2">Découvrez comment l'intelligence artificielle transforme les petites et moyennes entreprises.</p>
              <a href="#" className="text-primary underline">Lire l'article</a>
            </div>
          </Card>
          <Card>
            <img src="/blog2.jpg" alt="Article 2" className="w-full h-40 object-cover rounded mb-3" />
            <div className='p-3'>
              <h3 className="font-bold mb-1">Automatisation & Emploi : mythes et réalités</h3>
              <p className="text-gray-400 text-sm mb-2">Un tour d'horizon des idées reçues sur l'automatisation et son impact sur le marché du travail.</p>
              <a href="#" className="text-primary underline">Lire l'article</a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
