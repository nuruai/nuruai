"use client";
import { itServices } from "@/components/sections/it-solutions-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { t } from "i18next";
import {
    Code,
    Database,
    Megaphone,
    Search,
    Settings,
    Laptop,
    Users,
    FileText,
    DollarSign,
    Lightbulb,
    Palette,
    BarChart,
    BookOpen
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ItSolution() {
    const { t } = useTranslation();
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    return (
        <div>
            <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/solution_it.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/60" />
                <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("itSolutions.title")}</h2>
                    <Separator className="w-20 mx-auto mb-6" />
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("itSolutions.description")}
                    </p>
                </motion.div>
            </div>
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-semibold mb-8 text-center">Nos solutions IT phares</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {itServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col items-center text-center p-6 bg-background/70 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <CardHeader>
                                    <service.icon className="h-10 w-10 text-primary mb-4" />
                                    <CardTitle className="text-xl font-semibold mb-2">
                                        {t(service.key)}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {t(service.descriptionKey)}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}