"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownIcon, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation, Trans } from "react-i18next";

export function HeroSection() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-chart-1/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-chart-2/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-4"
              >
                <Trans i18nKey="hero.title">
                  Building <span className="text-primary">intelligent</span> digital experiences
                </Trans>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-muted-foreground max-w-md"
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="https://calendly.com/nuruai/30min" target="_blank" rel="noopener noreferrer">
                {t('hero.getInTouch')} <ArrowRight className="h-4 w-4" />
                  {/* {t('hero.viewProjects')} <ArrowRight className="h-4 w-4" /> */}
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="#contact">
                  {t('hero.getInTouch')}
                </Link>
              </Button> */}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-chart-1/50 to-chart-2/50 ${theme === 'dark' ? 'opacity-70' : 'opacity-30'}`}></div>
              <div className="absolute inset-0 backdrop-blur-3xl rounded-2xl"></div>
              <div className="absolute inset-4 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="text-4xl font-bold mb-2">Nuruai</div>
                  <div className="text-muted-foreground">{t('hero.agency')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDownIcon className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}