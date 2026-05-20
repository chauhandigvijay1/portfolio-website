"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().trim().min(2, "please enter your name"),
  email: z.string().trim().email("please enter a valid email"),
  company: z.string().trim().max(120).optional(),
  subject: z.string().trim().min(3, "add a short subject"),
  message: z.string().trim().min(20, "tell me a bit more about the project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000").replace(
  /\/$/,
  "",
);

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const response = await fetch(`${apiBaseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      throw new Error(payload.message || "Unable to send message right now.");
    }

    toast.success(payload.message || "Message sent.");
    reset();
  };

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(async (values) => {
        try {
          await onSubmit(values);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Something went wrong.");
        }
      })}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="type-section-eyebrow text-white/50">
            name
          </span>
          <Input
            {...register("name")}
            placeholder="Digvijay Kumar Singh"
            className="h-12 rounded-2xl border-white/12 bg-white/[0.05] px-4 text-white shadow-none placeholder:text-white/40"
          />
          {errors.name ? (
            <span className="text-xs lowercase text-rose-500">{errors.name.message}</span>
          ) : null}
        </label>

        <label className="space-y-2">
          <span className="type-section-eyebrow text-white/50">
            email
          </span>
          <Input
            {...register("email")}
            placeholder="you@example.com"
            className="h-12 rounded-2xl border-white/12 bg-white/[0.05] px-4 text-white shadow-none placeholder:text-white/40"
          />
          {errors.email ? (
            <span className="text-xs lowercase text-rose-500">{errors.email.message}</span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr]">
        <label className="space-y-2">
          <span className="type-section-eyebrow text-white/50">
            company
          </span>
          <Input
            {...register("company")}
            placeholder="optional"
            className="h-12 rounded-2xl border-white/12 bg-white/[0.05] px-4 text-white shadow-none placeholder:text-white/40"
          />
        </label>

        <label className="space-y-2">
          <span className="type-section-eyebrow text-white/50">
            subject
          </span>
          <Input
            {...register("subject")}
            placeholder="project inquiry"
            className="h-12 rounded-2xl border-white/12 bg-white/[0.05] px-4 text-white shadow-none placeholder:text-white/40"
          />
          {errors.subject ? (
            <span className="text-xs lowercase text-rose-500">{errors.subject.message}</span>
          ) : null}
        </label>
      </div>

      <label className="space-y-2">
        <span className="type-section-eyebrow text-white/50">message</span>
        <Textarea
          {...register("message")}
          placeholder="share the product, role, or collaboration you have in mind"
          className="min-h-36 rounded-[1.5rem] border-white/12 bg-white/[0.05] px-4 py-4 text-white shadow-none placeholder:text-white/40"
        />
        {errors.message ? (
          <span className="text-xs lowercase text-rose-500">{errors.message.message}</span>
        ) : null}
      </label>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 rounded-full bg-white px-8 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a0612] shadow-none transition hover:bg-white/90"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            sending
          </>
        ) : (
          <>
            send message
            <SendHorizonal className="size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
