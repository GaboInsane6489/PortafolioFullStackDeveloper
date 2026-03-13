import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // RUTA RELATIVA ESTRICTA:
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    mainImage: z.string(), // Mantengo mainImage para compatibilidad con datos existentes
    techStack: z.array(z.string()), // Mantengo techStack
    images: z.array(z.string()).optional(),
    status: z.string().default('ONLINE'), // ej: ONLINE, LEGACY
    order: z.number().default(99),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    badge: z.string().optional(),
  })
});

export const collections = { projects };
