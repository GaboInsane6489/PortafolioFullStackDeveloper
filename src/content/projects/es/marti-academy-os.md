---
title: "Martí Academy OS"
description: "Infraestructura educativa de alta escala construida para manejar flujos académicos masivos. Incluye <span class='text-amber-500/50'>sincronización atómica de datos</span> y manejo de eventos de alta concurrencia."
badge: "SISTEMA_OPERATIVO_EDTECH"
techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL"]
mainImage: "/images/MartiAcademyOS1.webp"
images: ["/images/MartiAcademyOS1.webp", "/images/MartiAcademyOS2.webp"]
githubUrl: "https://github.com/GaboInsane6489/Marti-Academy-OS"
status: "DESPLIEGUE_ESTABLE"
order: 1
---
# Martí Academy OS: El Sistema Operativo Institucional

Martí Academy OS es un ecosistema digital avanzado diseñado como el "sistema operativo" oficial del Colegio José Martí. Su misión es centralizar la gestión académica, potenciar a la comunidad institucional y motivar el rendimiento estudiantil mediante una arquitectura moderna, segura y altamente escalable.

## // ARQUITECTURA TÉCNICA DE ALTO RENDIMIENTO

- **Frontend Core:** Construido sobre Next.js 15+ (App Router) y utilizando las características más recientes de React 19. Ofrece una interfaz de alta fidelidad con respuestas inmediatas.
- **Estética Glassmorphism:** Estilizado meticulosamente con Tailwind CSS 4.0. Utiliza una estética oscura profunda (*Deep Dark Aesthetic*) que reduce la carga cognitiva y mejora el enfoque del estudiante.
- **Backend y Orquestación de Datos:** Respaldado enteramente por Supabase (PostgreSQL). Implementa políticas estrictas de *Row Level Security* (RLS) para proteger los datos de menores, manejando la sesión en el *Edge*.
- **Navegación Inmersiva:** Incorpora infraestructura de paneles laterales (*Drawers* y *Modals*) para explorar las asignaturas sin perder el contexto de la aplicación, manteniendo el estado fluido.

## [ CORE_MODULES ]
- **Motor de Gamificación:** Sincronización activa de *XP*, Rachas Diarias (*Streaks*) y una billetera de méritos para reconocer el esfuerzo real.
- **Control de Acceso Basado en Roles (RBAC):** Middleware de enrutamiento optimizado mediante caché de cookies en el borde (sub-100ms).
- **Modularidad Feature-First:** Base de código estrictamente organizada por dominios funcionales (`src/features/`), garantizando encapsulamiento y mantenibilidad a nivel *Enterprise*.
