"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Brain, Lightbulb, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    key: "whyChooseUs.innovationTitle",
    descriptionKey: "whyChooseUs.innovationDescription",
  },
  {
    icon: Lightbulb,
    key: "whyChooseUs.expertiseTitle",
    descriptionKey: "whyChooseUs.expertiseDescription",
  },
  {
    icon: TrendingUp,
    key: "whyChooseUs.resultsTitle",
    descriptionKey: "whyChooseUs.resultsDescription",
  },
];

export function WhyChooseUsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 md:py-24 px-2 md:px-0 bg-gradient-to-b from-background to-secondary/10 m-auto" id="why-choose-us">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("whyChooseUs.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col items-center text-center p-6 bg-background/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl font-semibold mb-2">
                    {t(feature.key)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {t(feature.descriptionKey)}
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