"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, Database, Server, GitBranch, Layers, 
  Cpu, Container, Braces, AirplayIcon, Terminal
} from "lucide-react";

interface SkillCategoryProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
  delay: number;
}

const SkillCategory = ({ icon, title, skills, delay }: SkillCategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-md bg-primary/10 text-primary mr-4">
              {icon}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="py-1.5"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const skillCategories = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "TailwindCSS", "HTML/CSS", "shadcn/ui", "Redux", "Framer Motion"],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Backend",
      skills: ["Ruby on Rails", "FastAPI", "Python"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Databases",
      skills: ["PostgreSQL", "Redis"],
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI & Machine Learning",
      skills: ["Python", "n8n"],
    },
    {
      icon: <Container className="h-6 w-6" />,
      title: "DevOps",
      skills: ["Docker", "CI/CD", "Vercel"],
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: "Version Control",
      skills: ["Git", "GitHub"],
    },
    {
      icon: <AirplayIcon className="h-6 w-6" />,
      title: "Testing",
      skills: ["Jest", "Cypress", "React Testing Library", "Pytest", "RSpec"],
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Tools & Utilities",
      skills: ["Webpack", "Babel", "ESLint", "Prettier", "npm/yarn", "Vite"],
    }
  ];

  return (
    <section id="skills" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit that enables me to build robust, scalable applications
            and implement cutting-edge AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              icon={category.icon}
              title={category.title}
              skills={category.skills}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}