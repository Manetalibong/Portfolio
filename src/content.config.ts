import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaTitle: z.string().max(70).optional(),
    metaDescription: z.string().max(160).optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    features: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const serviceAreas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/serviceAreas" }),
  schema: z.object({
    city: z.string(),
    state: z.string(),
    description: z.string(),
    metaTitle: z.string().max(70).optional(),
    metaDescription: z.string().max(160).optional(),
    image: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaTitle: z.string().max(70).optional(),
    metaDescription: z.string().max(160).optional(),
    author: z.string().default("Admin"),
    date: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/portfolio" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { services, serviceAreas, blog, portfolio };
