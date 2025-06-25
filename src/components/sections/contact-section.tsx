"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2, { message: "{{t('contactSection.validation.nameMin')}}" }),
  email: z.string().email({ message: "{{t('contactSection.validation.emailInvalid')}}" }),
  subject: z.string().min(5, { message: "{{t('contactSection.validation.subjectMin')}}" }),
  message: z.string().min(10, { message: "{{t('contactSection.validation.messageMin')}}" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xyzwrrnj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: t("contactSection.toast.successTitle"),
          description: t("contactSection.toast.successDescription"),
        });
        form.reset();
      } else {
        toast({
          title: t("contactSection.toast.failureTitle"),
          description: t("contactSection.toast.failureDescription"),
          variant: "destructive",
        });
      }
    } catch (_) {
      toast({
        title: t("contactSection.toast.errorTitle"),
        description: t("contactSection.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("contactSection.emailLabel"),
      value: "jospinndagano1@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("contactSection.phoneLabel"),
      value: "+250 725 514 275",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t("contactSection.locationLabel"),
      value: "Kigali, Rwanda",
    },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contactSection.title")}</h2>
            <Separator className="w-20 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("contactSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contactSection.form.nameLabel")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contactSection.form.namePlaceholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contactSection.form.emailLabel")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contactSection.form.emailPlaceholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contactSection.form.subjectLabel")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactSection.form.subjectPlaceholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contactSection.form.messageLabel")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("contactSection.form.messagePlaceholder")}
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("contactSection.form.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {t("contactSection.form.sendButton")}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6">{t("contactSection.contactInfoTitle")}</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 text-primary">{item.icon}</div>
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4">Working Hours</h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 9am - 6pm PST</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}