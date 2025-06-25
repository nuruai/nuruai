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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("blogPage.title")}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("blogPage.subtitle")}
          </p>
        </motion.div>
      </div>
      <section className="max-w-4xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <img src="/blog1.jpg" alt={t("blogPage.articles.0.imageAlt")} className="w-full h-40 object-cover rounded mb-3" />
            <div className='p-3'>
              <h3 className="font-bold mb-1">{t("blogPage.articles.0.title")}</h3>
              <p className="text-gray-400 text-sm mb-2">{t("blogPage.articles.0.description")}</p>
              <a href="#" className="text-primary underline">{t("blogPage.readArticle")}</a>
            </div>
          </Card>
          <Card>
            <img src="/blog2.jpg" alt={t("blogPage.articles.1.imageAlt")} className="w-full h-40 object-cover rounded mb-3" />
            <div className='p-3'>
              <h3 className="font-bold mb-1">{t("blogPage.articles.1.title")}</h3>
              <p className="text-gray-400 text-sm mb-2">{t("blogPage.articles.1.description")}</p>
              <a href="#" className="text-primary underline">{t("blogPage.readArticle")}</a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
