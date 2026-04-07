import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  draft: z.boolean(),
  page_header: z
    .object({
      title: z.string(),
      subtitle: z.string().optional(),
      badge: z.string(),
    })
    .optional(),
};

export const button = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
  icon: z.string().optional(),
});

export const homePage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      badge: z.string(),
      button: button,
    }),
    features: z.array(
      z.object({
        title: z.string(),
        icon: z.string(),
      }),
    ),
    the_standard: z.object({
      enable: z.boolean(),
      title: z.string(),
      icon: z.string().optional(),
      list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
          bullet_points: z.array(z.string()).optional(),
        }),
      ),
    }),
    recent_work: z.object({
      enable: z.boolean(),
      title: z.string(),
    }),
    ready_to_choose_us: z.object({
      title: z.string(),
      featured_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }),
  }),
});

export const aboutPage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    ...commonFields,
    gallery_list: z.array(z.string()),
    our_story: z.object({
      enable: z.boolean(),
      title: z.string(),
      story: z.object({
        title: z.string(),
        content: z.string(),
        image: z.string(),
        years_experience: z.object({
          number: z.number(),
          suffix: z.string(),
          prefix: z.string(),
          text: z.string(),
        }),
        projects_completed: z.object({
          number: z.number(),
          suffix: z.string(),
          prefix: z.string(),
          text: z.string(),
        }),
        awards_won: z.object({
          number: z.number(),
          suffix: z.string(),
          prefix: z.string(),
          text: z.string(),
        }),
      }),
    }),
    team_members: z.object({
      enable: z.boolean(),
      title: z.string(),
      list: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          image: z.string(),
          social_links: z.array(
            z.object({
              name: z.string(),
              url: z.string(),
              icon: z.string(),
            }),
          ),
        }),
      ),
    }),
  }),
});

export const blogListPage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const blogSinglePage = defineCollection({
  loader: glob({
    pattern: "**/!(-index|_index).{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
    ...commonFields,
    tags: z.array(z.string()),
  }),
});

export const contactPage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
    contact_form: z.object({
      title: z.string(),
      services: z.array(z.string()),
    }),
  }),
});

export const servicesListPage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/services" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const workListPage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/work" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const workSinglePage = defineCollection({
  loader: glob({
    pattern: "**/!(-index|_index).{md,mdx}",
    base: "src/content/work",
  }),
  schema: z.object({
    ...commonFields,
    subtitle: z.string(),
    color_shape: z.string(),
    weight: z.number().optional(),
    featured: z.boolean().optional(),
    project_info: z.object({
      client: z.string(),
      role: z.array(z.string()),
      recognition: z.string(),
      year: z.number(),
      link: z.string().optional(),
    }),
    project_gallery_images: z.array(z.string()),
  }),
});

export const regularpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});
