'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import {
  Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote, Minus, CornerUpLeft, CornerUpRight, Type, Pilcrow
} from "lucide-react";

export default function NewArticlePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, { message: t("newArticlePage.validation.titleMin") }),
    content: z.string().min(10, { message: t("newArticlePage.validation.contentMin") }),
    image: z.any().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      image: undefined,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    if (values.image && values.image[0]) {
      formData.append('image', values.image[0]);
    }

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || t("newArticlePage.toast.createErrorDescription"));
      }

      toast({
        title: t("newArticlePage.toast.successTitle"),
        description: t("newArticlePage.toast.successDescription"),
      });
      router.push('/admin/dashboard'); // Redirect to an admin dashboard after success
    } catch (err: any) {
      toast({
        title: t("newArticlePage.toast.errorTitle"),
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="container mx-auto p-4 mt-[80px]">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{t("newArticlePage.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("newArticlePage.form.titleLabel")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("newArticlePage.form.titlePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("newArticlePage.form.contentLabel")}</FormLabel>
                      <FormControl>
                        <TiptapEditor content={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>
                        {t("newArticlePage.form.contentDescription")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>{t("newArticlePage.form.imageLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          accept="image/*"
                          onChange={(event) => onChange(event.target.files)}
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
                      {t("newArticlePage.form.publishing")}
                    </>
                  ) : (
                    t("newArticlePage.form.publishButton")
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Paragraph,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-md min-h-[200px] p-2">
      <div className="flex flex-wrap gap-1 mb-2">
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          variant={editor?.isActive('bold') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          variant={editor?.isActive('italic') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          disabled={!editor?.can().chain().focus().toggleStrike().run()}
          variant={editor?.isActive('strike') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          disabled={!editor?.can().chain().focus().toggleCode().run()}
          variant={editor?.isActive('code') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().setParagraph().run()}
          variant={editor?.isActive('paragraph') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Pilcrow className="h-4 w-4" />
        </Button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Button
            key={level}
            type="button"
            onClick={() => editor?.chain().focus().toggleHeading({ level: level as any }).run()}
            variant={editor?.isActive('heading', { level: level as any }) ? 'secondary' : 'outline'}
            size="sm"
          >
            <List className="h-4 w-4" />
          </Button>
        ))}
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          variant={editor?.isActive('bulletList') ? 'secondary' : 'outline'}
          size="sm"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          variant={editor?.isActive('blockquote') ? 'secondary' : 'outline'}
          size="sm"
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          size="sm"
          variant="outline"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          size="sm"
          variant="outline"
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          size="sm"
          variant="outline"
        >
          <CornerUpLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          size="sm"
          variant="outline"
        >
          <CornerUpRight className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};
