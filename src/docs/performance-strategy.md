# ⚡ Estrategia de Performance y Optimización

> **Objetivo**: Lighthouse 95+ en todas las métricas, experiencia de usuario excepcional

## 🎯 Filosofía de Performance

### Principios Core
1. **Medir primero, optimizar después**: No optimices sin datos
2. **Performance es UX**: Cada 100ms cuenta
3. **Progressive Enhancement**: Funciona sin JS, mejor con JS
4. **Mobile First**: Optimiza para conexiones lentas

### Métricas Clave
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s
- **TBT (Total Blocking Time)**: < 200ms

---

## 📊 Baseline Performance (Astro por defecto)

### ¿Qué obtienes gratis con Astro?

✅ **Zero JavaScript por defecto**
- HTML estático puro
- CSS mínimo
- Sin hydration overhead

✅ **Optimización automática**
- Minificación de HTML/CSS/JS
- Tree shaking
- Code splitting
- Asset optimization

✅ **Islands Architecture**
- JavaScript solo donde se necesita
- Hydration selectiva
- Lazy loading automático

### Lighthouse Score Esperado (sin optimizar)
- Performance: 85-90
- Accessibility: 90-95
- Best Practices: 90-95
- SEO: 90-95

**Objetivo**: Llevar Performance a 95+

---

## 🖼️ Optimización de Imágenes

### Estrategia de Formatos

**Prioridad de formatos**:
1. **AVIF**: Mejor compresión (50% más que WebP)
2. **WebP**: Amplio soporte, buena compresión
3. **JPEG/PNG**: Fallback para navegadores antiguos

### Implementación con Astro Image

```astro
---
import { Image } from 'astro:assets'
import heroImage from '../assets/hero.jpg'
---

<Image
  src={heroImage}
  alt="Descripción"
  width={1200}
  height={630}
  format="avif"
  quality={80}
  loading="lazy"
/>
```

### Responsive Images

```astro
<Image
  src={heroImage}
  alt="Descripción"
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  format="avif"
/>
```

### Optimización Manual (antes de importar)

**Herramientas**:
- **Squoosh**: https://squoosh.app
- **ImageOptim**: https://imageoptim.com
- **Sharp CLI**: `npx @squoosh/cli --avif '{"quality":80}' images/*.jpg`

**Checklist**:
- [ ] Redimensionar a tamaño máximo necesario
- [ ] Comprimir con calidad 80-85
- [ ] Convertir a WebP/AVIF
- [ ] Generar versiones responsive (400w, 800w, 1200w)

### Lazy Loading

```astro
<!-- Above the fold (eager) -->
<Image src={hero} loading="eager" />

<!-- Below the fold (lazy) -->
<Image src={project1} loading="lazy" />
```

### Blur Placeholder (LQIP)

```astro
---
import { getImage } from 'astro:assets'
import heroImage from '../assets/hero.jpg'

const blurImage = await getImage({
  src: heroImage,
  width: 20,
  format: 'webp',
})
---

<div
  class="blur-load"
  style={`background-image: url(${blurImage.src})`}
>
  <Image src={heroImage} alt="Hero" />
</div>

<style>
  .blur-load {
    background-size: cover;
    background-position: center;
  }
  .blur-load img {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .blur-load img.loaded {
    opacity: 1;
  }
</style>
```

---

## 🎨 Optimización de CSS

### Estrategia Tailwind

**Configuración para producción**:
```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Resultado**: Solo el CSS usado se incluye (~10-20KB gzipped)

### Critical CSS

Astro automáticamente inline el CSS crítico en `<head>`.

**Manual (si es necesario)**:
```astro
---
// src/layouts/Layout.astro
---

<style is:inline>
  /* CSS crítico para above-the-fold */
  body {
    font-family: system-ui;
    margin: 0;
  }
</style>
```

### Evitar CSS-in-JS

❌ **No usar**:
- Styled Components
- Emotion
- CSS Modules con runtime

✅ **Usar**:
- Tailwind
- CSS global
- Scoped styles de Astro

---

## 📦 Optimización de JavaScript

### Estrategia de Hydration

**Directivas de Astro**:
```astro
<!-- No hydration (solo HTML) -->
<Component />

<!-- Hydrate inmediatamente -->
<Component client:load />

<!-- Hydrate cuando sea visible -->
<Component client:visible />

<!-- Hydrate cuando idle -->
<Component client:idle />

<!-- Hydrate en media query -->
<Component client:media="(max-width: 640px)" />

<!-- Solo en cliente (no SSR) -->
<Component client:only="react" />
```

**Recomendaciones**:
- Hero section: Sin JS o `client:idle`
- Carousel: `client:visible`
- Modal: `client:idle`
- Analytics: `client:idle`

### Code Splitting

Astro automáticamente hace code splitting por ruta.

**Manual (si es necesario)**:
```js
// Lazy load de componente pesado
const HeavyComponent = lazy(() => import('./HeavyComponent'))
```

### Tree Shaking

**Importar solo lo necesario**:
```js
// ❌ Malo
import _ from 'lodash'

// ✅ Bueno
import debounce from 'lodash/debounce'
```

### Bundle Analysis

```bash
# Instalar
pnpm add -D rollup-plugin-visualizer

# Configurar en astro.config.mjs
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  vite: {
    plugins: [
      visualizer({
        open: true,
        gzipSize: true,
      }),
    ],
  },
})
```

---

## 🔤 Optimización de Fuentes

### Estrategia de Carga

**1. System Fonts (más rápido)**:
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**2. Google Fonts (optimizado)**:
```astro
---
// src/layouts/Layout.astro
---

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  rel="stylesheet"
>
```

**3. Self-hosted (máximo control)**:
```astro
---
// src/layouts/Layout.astro
---

<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>

<style is:global>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }
</style>
```

### Font Display Strategy

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap; /* Muestra fallback, luego swap */
}
```

**Opciones**:
- `swap`: Mejor para UX (evita FOIT)
- `optional`: Mejor para performance (usa fallback si tarda)
- `fallback`: Balance entre ambos

### Subsetting

**Reducir tamaño de fuente**:
```bash
# Instalar glyphhanger
npm install -g glyphhanger

# Generar subset
glyphhanger --subset=inter.woff2 --formats=woff2 --whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
```

---

## 🚀 Optimización de Carga

### Preloading

**Recursos críticos**:
```astro
<head>
  <!-- Fuente crítica -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- Imagen hero -->
  <link rel="preload" href="/images/hero.avif" as="image">
  
  <!-- CSS crítico (Astro lo hace automáticamente) -->
</head>
```

### Prefetching

**Para navegación anticipada**:
```astro
---
// src/components/ProjectCard.astro
---

<a href={`/projects/${slug}`} rel="prefetch">
  Ver proyecto
</a>
```

Astro automáticamente prefetchea links con `rel="prefetch"`.

### DNS Prefetch

```astro
<head>
  <!-- Para recursos externos -->
  <link rel="dns-prefetch" href="https://www.google-analytics.com">
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
</head>
```

---

## 📱 Optimización Mobile

### Responsive Images

```astro
<Image
  src={heroImage}
  alt="Hero"
  widths={[400, 800, 1200]}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
/>
```

### Touch Targets

```css
/* Mínimo 44x44px para touch */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
}
```

### Viewport Meta

```astro
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## 🎭 Optimización de Animaciones

### Usar CSS cuando sea posible

```css
/* ✅ GPU-accelerated */
.element {
  transform: translateX(100px);
  opacity: 0.5;
  transition: transform 0.3s, opacity 0.3s;
}

/* ❌ Evitar (causa reflow) */
.element {
  left: 100px;
  width: 200px;
}
```

### Reduce Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Will-Change

```css
/* Solo para animaciones que están por ocurrir */
.element:hover {
  will-change: transform;
}

.element {
  transform: scale(1.1);
}

.element:not(:hover) {
  will-change: auto;
}
```

---

## 🔍 SEO Performance

### Structured Data

```astro
---
// src/layouts/Layout.astro
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gabriel González",
  "jobTitle": "Full Stack Developer",
  "url": "https://tudominio.com",
  "sameAs": [
    "https://github.com/GaboInsane6489",
    "https://linkedin.com/in/gabriel-gonzalez-fullstack"
  ]
}
---

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

### Sitemap

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://tudominio.com',
  integrations: [sitemap()],
})
```

---

## 📊 Monitoreo de Performance

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://tudominio.com
            https://tudominio.com/projects
          uploadArtifacts: true
```

### Web Vitals Tracking

```astro
---
// src/components/WebVitals.astro
---

<script>
  import { getCLS, getFID, getLCP } from 'web-vitals'

  function sendToAnalytics(metric) {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      non_interaction: true,
    })
  }

  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getLCP(sendToAnalytics)
</script>
```

### Performance Budget

```js
// lighthouserc.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

---

## 🎯 Checklist de Optimización

### Imágenes
- [ ] Convertidas a WebP/AVIF
- [ ] Comprimidas (quality 80-85)
- [ ] Responsive (múltiples tamaños)
- [ ] Lazy loading (excepto above-the-fold)
- [ ] Alt text descriptivo
- [ ] Dimensiones explícitas (width/height)

### CSS
- [ ] Tailwind purge configurado
- [ ] Critical CSS inlined
- [ ] Sin CSS-in-JS con runtime
- [ ] Minificado en producción

### JavaScript
- [ ] Hydration selectiva (client:visible, client:idle)
- [ ] Code splitting por ruta
- [ ] Tree shaking habilitado
- [ ] Bundle < 100KB
- [ ] Sin dependencias innecesarias

### Fuentes
- [ ] Preload de fuentes críticas
- [ ] font-display: swap
- [ ] Subset si es posible
- [ ] WOFF2 format
- [ ] < 100KB total

### Carga
- [ ] Preload de recursos críticos
- [ ] DNS prefetch para externos
- [ ] Prefetch de rutas anticipadas
- [ ] Service Worker (opcional)

### SEO
- [ ] Sitemap generado
- [ ] Robots.txt configurado
- [ ] Meta tags completos
- [ ] Structured data
- [ ] Canonical URLs

### Accesibilidad
- [ ] Contraste WCAG AA (4.5:1)
- [ ] Navegación por teclado
- [ ] ARIA labels
- [ ] Alt text en imágenes
- [ ] Focus visible

### Monitoreo
- [ ] Google Analytics configurado
- [ ] Web Vitals tracking
- [ ] Lighthouse CI (opcional)
- [ ] Error tracking (Sentry, opcional)

---

## 🏆 Objetivos Finales

### Lighthouse Scores
- **Performance**: 95+ ✅
- **Accessibility**: 95+ ✅
- **Best Practices**: 95+ ✅
- **SEO**: 95+ ✅

### Core Web Vitals
- **LCP**: < 2.5s ✅
- **FID**: < 100ms ✅
- **CLS**: < 0.1 ✅

### Bundle Sizes
- **Total Page Size**: < 500KB ✅
- **JavaScript**: < 100KB ✅
- **CSS**: < 50KB ✅
- **Images**: Optimizadas ✅

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0  
**Autor**: Gabriel González
