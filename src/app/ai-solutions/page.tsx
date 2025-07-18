"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { t } from "i18next";
import { 
  Mail, 
  Headset, 
  Sparkles, 
  Newspaper, 
  ShoppingCart, 
  BarChart, 
  Users, 
  Share2, 
  PieChart 
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Solution() {
  const { t } = useTranslation();
  const translatedSolutions = t('aiSolutions.solutionsList', { returnObjects: true }) as { title: string, description: string }[];

  const solutionIcons = [
    <Mail key="mail" className="h-10 w-10 text-primary" />,
    <Headset key="headset" className="h-10 w-10 text-primary" />,
    <Sparkles key="sparkles" className="h-10 w-10 text-primary" />,
    <Newspaper key="newspaper" className="h-10 w-10 text-primary" />,
    <ShoppingCart key="shoppingCart" className="h-10 w-10 text-primary" />,
    <BarChart key="barChart" className="h-10 w-10 text-primary" />,
    <Users key="users" className="h-10 w-10 text-primary" />,
    <Share2 key="share2" className="h-10 w-10 text-primary" />,
    <PieChart key="pieChart" className="h-10 w-10 text-primary" />,
];

  const solutions = Array.isArray(translatedSolutions) ? translatedSolutions.map((solution, index) => ({
    ...solution,
    icon: solutionIcons[index % solutionIcons.length]
  })) : [];
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/solution_ia.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('aiSolutions.title')}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('aiSolutions.subtitle')}
          </p>
        </motion.div>
      </div>
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Nos solutions phares</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4 p-3 rounded-full bg-primary/10">{solution.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}