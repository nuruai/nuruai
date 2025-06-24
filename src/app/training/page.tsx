"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { BookOpen, Users, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Training() {
  const { t } = useTranslation();
  const translatedTrainings = t('training.trainingList', { returnObjects: true }) as { title: string, description: string }[];

  const trainingIcons = [
    <BookOpen key="book" className="h-10 w-10 text-primary" />,
    <Users key="users" className="h-10 w-10 text-primary" />,
    <Video key="video" className="h-10 w-10 text-primary" />
  ];

  const trainings = Array.isArray(translatedTrainings) ? translatedTrainings.map((training, index) => ({
    ...training,
    icon: trainingIcons[index]
  })) : [];
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/training-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('training.title')}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('training.subtitle')}
          </p>
        </motion.div>
      </div>
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainings.map((training, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{training.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{training.title}</h3>
                    <p className="text-muted-foreground">{training.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}