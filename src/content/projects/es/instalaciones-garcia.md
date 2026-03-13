---
title: "Instalaciones García"
description: "Sistema centrado en el cliente optimizado para eficiencia de carga y rastreo SEO. Diseñado para maximizar el <span class='font-bold text-blue-400/50'>flujo de conversión</span> y operaciones de campo."
badge: "SOLUCIÓN_EMPRESARIAL_CORE"
techStack: ["Astro", "React", "Tailwind CSS", "Framer Motion", "Vite"]
mainImage: "/images/InstalacionesGarcias1.webp"
images: ["/images/InstalacionesGarcias1.webp", "/images/InstalacionesGarcias2.webp", "/images/InstalacionesGarcias3.webp", "/images/InstalacionesGarcias4.webp", "/images/InstalacionesGarcias5.webp", "/images/InstalacionesGarcias6.webp", "/images/InstalacionesGarcias7.webp", "/images/InstalacionesGarcias8.webp", "/images/InstalacionesGarcias9.webp", "/images/InstalacionesGarcias10.webp", "/images/InstalacionesGarcias11.webp", "/images/InstalacionesGarcias12.webp", "/images/InstalacionesGarcias13.webp"]
githubUrl: "https://github.com/GaboInsane6489/instalacionesgarciasfronted"
status: "PRD_ESTABLE"
order: 3
---
# Instalaciones García: Ingeniería de Precisión

Este proyecto es la interfaz pública (Frontend) para la empresa Instalaciones García's, líder en servicios eléctricos e industriales. El objetivo principal de esta arquitectura es convertir visitantes en clientes potenciales mediante una experiencia de usuario (UX) *premium*, de máxima velocidad y altísima confiabilidad.

## // ARQUITECTURA TÉCNICA ESTELAR

- **Astro Islands (Islas de Interactividad):** El ecosistema es mayoritariamente HTML estático renderizado en el servidor. Solo las zonas complejas (como las galerías o calculadoras en React) inyectan JavaScript, reduciendo el *bundle size* a su mínima expresión y alcanzando velocidades de carga cercanas a **0ms**.
- **View Transitions:** Implementamos el enrutador cliente de Astro. Esto permite navegar por el sistema sin recargas agresivas de la pestaña, conservando intacto el estado de las animaciones (*Glassmorphism*) y cortando el consumo de red radicalmente.
- **Lazy Loading Quirúrgico:** Cada imagen, textura y asset que no forma parte crítica del *First Contentful Paint* se carga de manera diferida, priorizando únicamente la vista inicial.

## >> ESTÁNDARES DEL PROYECTO
- **Velocidad Extrema:** Arquitectura *Island-based*.
- **Estética Premium:** Filtros de vidrio (*Glassmorphism*) y animaciones hiper-fluidas.
- **SEO Quirúrgico:** *Static Site Generation* (SSG) para indexabilidad infalible ante Google.
- **Interactividad Modular:** React actuando bajo demanda absoluta.
