"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Bot, Cpu, Lightbulb, TrendingUp, Shield, Layers, Globe, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  index: number;
}

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

export const ServiceCard = ({ icon, title, description, features, index }: ServiceCardProps) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary mb-4">
            {icon}
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild variant="ghost" className="w-full mt-4">
            <Link href="#contact" className="w-full flex items-center justify-between">
              <span>{t("servicesSection.learnMore")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export function ServicesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("servicesSection.title")}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("servicesSection.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
}