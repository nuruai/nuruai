"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";



export type ProjectCategory = "all" | "web" | "mobile" | "ai";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
    {
      id: 1,
      title: "CVComet",
      description: "An AI-powered CV and cover letter generator. It helps users create professional job application documents in seconds using smart templates and dynamic form handling.",
      image: "/cvcometImg.png",
      categories: ["web", "ai"],
      technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel ai SDK"],
      liveUrl: "https://www.cvcomet.com",
      githubUrl: "https://github.com/Jospin6"
    },
    {
      id: 2,
      title: "FilmFusion",
      description: "A web application using the TMDB API and provide users informations about films and tv shows.",
      image: "/filmfusion.png",
      categories: ["web"],
      technologies: ["React", "RestAPI", "Tailwind CSS", "TypeScript", "Redux"],
      liveUrl: "https://filmsfusion.netlify.app",
      githubUrl: "https://github.com/Jospin6/film-fusion"
    },
    {
      id: 3,
      title: "Recipe catalogue",
      description: "An app where users can find almost any recipe.",
      image: "/recipe.png",
      categories: ["web"],
      technologies: ["React", "TypeScript", "Redux"],
      liveUrl: "https://recipe-catalogue-next.netlify.app",
      githubUrl: "https://github.com/Jospin6/recipe-catalogue"
    }
  ];

export function ProjectsSection() {
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

  return (
    <section id="projects" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my recent work across web, mobile, and AI development.
            Each project represents my commitment to quality and innovation.
          </p>
        </motion.div>

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
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="pt-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {project.liveUrl && (
          <Button variant="outline" size="sm" asChild className="gap-1">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild className="gap-1">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}