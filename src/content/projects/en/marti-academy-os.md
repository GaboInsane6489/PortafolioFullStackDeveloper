---
title: "Martí Academy OS"
description: "High-scale educational infrastructure engineered to handle massive academic state. Features <span class='text-amber-500/50'>atomic data synchronization</span>, modular component architecture, and high-concurrency event handling."
badge: "EDTECH_OPERATING_SYSTEM"
techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "PostgreSQL"]
mainImage: "/images/MartiAcademyOS1.webp"
images: ["/images/MartiAcademyOS1.webp", "/images/MartiAcademyOS2.webp"]
githubUrl: "https://github.com/GaboInsane6489/Marti-Academy-OS"
status: "STABLE_DEPLOYMENT"
order: 1
---
# Martí Academy OS: The Educational Operating System

Martí Academy OS is an integrated digital ecosystem designed as the official "operating system" for Colegio José Martí. It centralizes academic management, enhances institutional community interaction, and drives student performance through a modern, secure, and highly scalable architecture.

## // TECHNICAL ARCHITECTURE

- **Frontend Core:** Built on Next.js 15+ (App Router) utilizing React 19 features. It ensures a high-fidelity, immediate response interface.
- **Glassmorphic Styling:** Tailored with Tailwind CSS 4.0, integrating custom glassmorphism utilities to support the "Deep Dark Aesthetic" that reduces cognitive load and enhances focus.
- **Backend & Data Orchestration:** Powered by Supabase, utilizing PostgreSQL with strict Row Level Security (RLS) policies. Authentication is managed via OAuth, and dynamic data delivery is orchestrated through centralized React hooks.
- **Advanced Navigation:** Features immersive side-panel infrastructures, such as the `SubjectDrawer`, allowing deep data exploration without losing context.

## [ CORE_MODULES ]
- **Gamification Engine:** Active synchronization of XP, Daily Streaks, and an internal Merit Wallet to recognize real student effort.
- **Role-Based Access Control (RBAC):** Edge-based middleware routing (`src/proxy.js`) secured with heavily optimized cookie caching for sub-100ms response times.
- **Feature-First Modularity:** Codebase is strictly organized by domain bounds (`src/features/`), prioritizing code encapsulation and long-term maintainability.
