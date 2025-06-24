"use client";

import { ServiceCard, services } from "@/components/sections/services-section";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Service() {
  const { t } = useTranslation();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/services-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Specialized solutions to help your business thrive in the digital world.
            From web development to advanced AI systems.
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