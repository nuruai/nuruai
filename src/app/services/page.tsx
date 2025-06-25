"use client";

import { ServiceCard } from "@/components/sections/services-section";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code, Bot, Cpu, Lightbulb, TrendingUp, Shield, Layers, Globe, GraduationCap } from "lucide-react";


const serviceIcons = [
  <Code className="h-6 w-6" />,
  <Cpu className="h-6 w-6" />,
  <Bot className="h-6 w-6" />,
  <Lightbulb className="h-6 w-6" />,
  <TrendingUp className="h-6 w-6" />,
  <Shield className="h-6 w-6" />,
  <Layers className="h-6 w-6" />,
  <Globe className="h-6 w-6" />,
  <GraduationCap className="h-6 w-6" />,
];

export default function Service() {
  const { t } = useTranslation();
  const services = [
    {
      icon: serviceIcons[0],
      title: t("servicesSection.servicesList.0.title"),
      description: t("servicesSection.servicesList.0.description"),
      features: t("servicesSection.servicesList.0.features", { returnObjects: true }) as string[],
    },
    {
      icon: serviceIcons[1],
      title: t("servicesSection.servicesList.1.title"),
      description: t("servicesSection.servicesList.1.description"),
      features: t("servicesSection.servicesList.1.features", { returnObjects: true }) as string[],
    },
    {
      icon: serviceIcons[2],
      title: t("servicesSection.servicesList.2.title"),
      description: t("servicesSection.servicesList.2.description"),
      features: t("servicesSection.servicesList.2.features", { returnObjects: true }) as string[],
    },
  ];
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/services-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("servicesPage.title")}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("servicesPage.subtitle")}
          </p>
        </motion.div>
      </div>
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}