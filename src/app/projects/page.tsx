"use client";
import { ProjectCard, ProjectCategory, projects } from "@/components/sections/projects-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Project() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.categories.includes(activeCategory));

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web" },
    { id: "ai", label: "AI" }
  ];
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/projects-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my recent work across web, mobile, and AI development.
            Each project represents my commitment to quality and innovation.
          </p>
        </motion.div>
      </div>
      <section className="max-w-5xl mx-auto py-12 px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id as ProjectCategory)}
                className="mb-2"
              >
                {category.label}
              </Button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
      </section>
    </div>
  );
}