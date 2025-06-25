"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, BrainCircuit, Code, Megaphone, Search, Users, Video } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TrainingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();
  const translatedTrainings = t('training.trainingList', { returnObjects: true }) as { title: string, description: string }[];

  // const trainingIcons = [
  //     <BookOpen key="book" className="h-10 w-10 text-primary" />,
  //     <Users key="users" className="h-10 w-10 text-primary" />,
  //     <Video key="video" className="h-10 w-10 text-primary" />
  // ];
  const trainingIcons = [
      <Search key="search" className="h-10 w-10 text-primary" />,
      <BrainCircuit key="brain" className="h-10 w-10 text-primary" />,
      <Users key="users" className="h-10 w-10 text-primary" />,
      <Megaphone key="megaphone" className="h-10 w-10 text-primary" />,
      <Code key="code" className="h-10 w-10 text-primary" />,
      <BookOpen key="book" className="h-10 w-10 text-primary" />,
      <Video key="video" className="h-10 w-10 text-primary" />,
    ];

  const trainings = Array.isArray(translatedTrainings) ? translatedTrainings.map((training, index) => ({
      ...training,
      icon: trainingIcons[index]
  })) : [];

  return (
    <section id="training" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('training.title')}</h2>
              <Separator className="w-20 mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t('training.subtitle')}
              </p>
            </motion.div>
          </div>

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
        </motion.div>
      </div>
    </section>
  );
}
