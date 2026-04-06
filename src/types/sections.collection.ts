import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { button } from "./pages.collection";

export const bookACallSection = defineCollection({
  loader: glob({
    pattern: "book-a-call.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    content: z.string(),
    button: button,
  }),
});

export const ctaSection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    book_call: z.object({
      title: z.string(),
      content: z.string(),
      avatar: z.string(),
      button: button,
    }),
  }),
});

export const faqsSection = defineCollection({
  loader: glob({ pattern: "faqs.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    faqs_list: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
});

export const featuresSection = defineCollection({
  loader: glob({ pattern: "features.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    features: z.array(
      z.object({
        title: z.string(),
        icon: z.string(),
      }),
    ),
  }),
});

export const getProjectDoneSection = defineCollection({
  loader: glob({
    pattern: "get-project-done.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    content: z.string(),
    project_step: z.array(
      z.object({
        step_name: z.string(),
        title: z.string(),
        content: z.string(),
        button: button,
        bullet_points: z.array(z.string()),
        highlight_pass: z.object({
          title: z.string(),
          content: z.string(),
          list: z.array(
            z.object({
              title: z.string(),
              icon: z.string(),
            }),
          ),
        }),
      }),
    ),
  }),
});

export const pricingSection = defineCollection({
  loader: glob({ pattern: "pricing.{md,mdx}", base: "src/content/sections" }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    pricing_list: z.array(
      z.object({
        plan: z.string(),
        price: z.union([z.number(), z.string()]),
        price_prefix: z.string(),
        discount: z.string(),
        type: z.string(),
        features: z.object({
          title: z.string(),
          items: z.array(z.string()),
        }),
        buttons: z.array(
          z.object({
            button: button,
          }),
        ),
      }),
    ),
    book_a_call: z.object({
      enable: z.boolean(),
      title: z.string(),
      features: z.array(z.string()),
      button: button,
    }),
  }),
});

export const testimonialSection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        designation: z.string(),
        avatar: z.string(),
        content: z.string(),
        company_icon: z.string(),
      }),
    ),
    client_logos: z.array(z.string()),
  }),
});
