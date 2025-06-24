"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Lightbulb, LayoutGrid, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const processSteps = [
  {
    icon: Lightbulb,
    key: "ourProcess.discoveryTitle",
    descriptionKey: "ourProcess.discoveryDescription",
  },
  {
    icon: LayoutGrid,
    key: "ourProcess.strategyTitle",
    descriptionKey: "ourProcess.strategyDescription",
  },
  {
    icon: Rocket,
    key: "ourProcess.executionTitle",
    descriptionKey: "ourProcess.executionDescription",
  },
];

export function OurProcessSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 bg-background" id="our-process">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("ourProcess.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("ourProcess.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center text-center p-6 bg-background/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <step.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl font-semibold mb-2">
                    {t(step.key)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(step.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 