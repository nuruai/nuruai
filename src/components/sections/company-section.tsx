"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Bot, Zap, Users, Target } from "lucide-react";
import Link from "next/link";

export function CompanySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const benefits = [
    {
      icon: <Bot className="h-10 w-10 text-primary" />,
      title: "AI-Powered Solutions",
      description: "Leverage cutting-edge AI technologies to create intelligent automation systems tailored to your business processes."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Efficiency Boost",
      description: "Streamline operations and eliminate repetitive tasks, allowing your team to focus on high-value activities."
    },
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Custom Integration",
      description: "Solutions built specifically for your workflows, integrating seamlessly with your existing systems and tools."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Expert Guidance",
      description: "Work with specialists who understand both the technical aspects and business implications of AI implementation."
    }
  ];

  return (
    <section id="company" className="py-24 relative bg-gradient-to-b from-background to-muted/30">
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuruai</h2>
              <Separator className="w-20 mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                An AI automation agency helping businesses and individuals 
                automate their workflows with AI-powered solutions.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16"
          >
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  At Nuruai, we believe in the transformative power of AI to 
                  revolutionize how businesses operate. Our mission is to make 
                  advanced AI technologies accessible to organizations of all sizes, 
                  helping them automate routine tasks, gain valuable insights from data, 
                  and create more efficient workflows.
                </p>
                <p className="text-lg">
                  We work closely with each client to understand their unique challenges 
                  and develop customized AI solutions that deliver measurable results, 
                  whether that&apos;s reducing operational costs, improving decision-making, 
                  or enhancing customer experiences.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <h3 className="text-2xl font-semibold text-center mb-8">How We Can Help Your Business</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4">{benefit.icon}</div>
                    <h4 className="text-xl font-medium mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="https://nuruai.vercel.app" target="_blank" rel="noopener noreferrer">
                Get in Touch <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}