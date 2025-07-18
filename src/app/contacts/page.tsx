"use client";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "{{t('contactPage.validation.nameMin')}}" }),
  email: z.string().email({ message: "{{t('contactPage.validation.emailInvalid')}}" }),
  subject: z.string().min(5, { message: "{{t('contactPage.validation.subjectMin')}}" }),
  message: z.string().min(10, { message: "{{t('contactPage.validation.messageMin')}}" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { t } = useTranslation();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
          title: t("contactPage.toast.successTitle"),
          description: t("contactPage.toast.successDescription"),
        });
        form.reset();
      } else {
        toast({
          title: t("contactPage.toast.failureTitle"),
          description: t("contactPage.toast.failureDescription"),
          variant: "destructive",
        });
      }
    } catch (_) {
      toast({
        title: t("contactPage.toast.errorTitle"),
        description: t("contactPage.toast.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }


  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: t("contactPage.emailLabel"),
      value: "jospinndagano1@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: t("contactPage.phoneLabel"),
      value: "+250 725 514 275",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: t("contactPage.locationLabel"),
      value: "Kigali, Rwanda",
    },
  ];

  return (
    <div>
      <div className="relative h-[350px] flex items-center justify-center text-white" style={{ backgroundImage: "url('/contacts.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/60" />
        <motion.div variants={itemVariants} className="text-center z-10 pt-10 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contactPage.title")}</h2>
          <Separator className="w-20 mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contactPage.subtitle")}
          </p>
        </motion.div>
      </div>
      <section className="max-w-4xl mx-auto py-12 px-4">
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
                        <FormLabel>{t("contactPage.form.nameLabel")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactPage.form.namePlaceholder")} {...field} />
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
                        <FormLabel>{t("contactPage.form.emailLabel")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactPage.form.emailPlaceholder")} {...field} />
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
                      <FormLabel>{t("contactPage.form.subjectLabel")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contactPage.form.subjectPlaceholder")} {...field} />
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
                      <FormLabel>{t("contactPage.form.messageLabel")}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("contactPage.form.messagePlaceholder")}
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
                      {t("contactPage.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("contactPage.form.sendButton")}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div>
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6">{t("contactPage.contactInfoTitle")}</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 text-primary">{item.icon}</div>
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-muted-foreground text-sm">{item.value}</p>
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
      </section>
    </div>
  );
}