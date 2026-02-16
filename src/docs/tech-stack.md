# 🛠️ Stack Tecnológico y Decisiones de Arquitectura

> **Filosofía**: Performance first, developer experience second, user experience always

## 🎯 Principios de Decisión

### 1. Performance sobre Features
- Priorizar velocidad de carga
- Minimizar JavaScript en el cliente
- Optimizar assets agresivamente
- Medir todo con Lighthouse

### 2. Simplicidad sobre Complejidad
- Usar la herramienta más simple que funcione
- Evitar over-engineering
- Preferir soluciones nativas cuando sea posible
- Mantener el bundle pequeño

### 3. Mantenibilidad sobre Cleverness
- Código legible > Código "inteligente"
- Documentación clara
- Convenciones consistentes
- Separación de concerns

## 🏗️ Stack Principal

### Core Framework: Astro 5.x

**¿Por qué Astro?**
- ✅ **Islands Architecture**: JavaScript solo donde se necesita
- ✅ **SSG por defecto**: Máxima velocidad, hosting económico
- ✅ **Multi-framework**: Usa React, Vue, Svelte según necesidad
- ✅ **Content Collections**: Sistema de contenido type-safe
- ✅ **View Transitions**: Navegación SPA sin complejidad
- ✅ **Excelente DX**: Fast refresh, TypeScript, Vite

**Alternativas consideradas**:
- ❌ **Next.js**: Demasiado pesado para un portafolio estático
- ❌ **Gatsby**: Más lento en build, menos activo
- ❌ **11ty**: Menos features out-of-the-box
- ⚠️ **SvelteKit**: Excelente opción, pero menos ecosistema

**Decisión**: Astro es el framework ideal para portafolios que priorizan performance.

---

### Styling: Tailwind CSS 4.x

**¿Por qué Tailwind?**
- ✅ **Utility-first**: Desarrollo rápido
- ✅ **Purge automático**: CSS mínimo en producción
- ✅ **Consistencia**: Design system integrado
- ✅ **Responsive**: Mobile-first por defecto
- ✅ **Dark mode**: Built-in support
- ✅ **Customización**: Totalmente configurable

**Alternativas consideradas**:
- ❌ **CSS Modules**: Más verboso, menos rápido
- ❌ **Styled Components**: Runtime overhead
- ❌ **Vanilla CSS**: Menos productivo
- ⚠️ **UnoCSS**: Más rápido, pero menos maduro

**Decisión**: Tailwind 4.x ofrece el mejor balance entre DX y performance.

**Configuración recomendada**:
```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... tu paleta personalizada
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

---

### Icons: Astro Icon + Iconify

**¿Por qué Astro Icon?**
- ✅ **100,000+ iconos**: Acceso a todo Iconify
- ✅ **Tree-shaking**: Solo los iconos usados
- ✅ **SVG inline**: No hay requests HTTP
- ✅ **Type-safe**: Autocompletado en IDE
- ✅ **Optimización automática**: SVGO integrado

**Uso**:
```astro
---
import { Icon } from 'astro-icon/components'
---

<Icon name="tabler:brand-github" class="w-6 h-6" />
```

**Alternativas consideradas**:
- ❌ **React Icons**: Requiere React en todo el sitio
- ❌ **Font Awesome**: Más pesado, menos flexible
- ❌ **SVG sprites**: Más manual

---

### Carousel: Embla Carousel

**¿Por qué Embla?**
- ✅ **Vanilla JS**: No depende de framework
- ✅ **Ligero**: ~3KB gzipped
- ✅ **Accesible**: Keyboard navigation, ARIA
- ✅ **Performante**: GPU-accelerated
- ✅ **Flexible**: Altamente customizable

**Alternativas consideradas**:
- ❌ **Swiper**: Más pesado (~40KB)
- ❌ **Slick**: jQuery dependency
- ⚠️ **Keen Slider**: Buena opción, similar a Embla

---

### Forms: Web3Forms

**¿Por qué Web3Forms?**
- ✅ **Serverless**: No necesitas backend
- ✅ **Gratis**: Plan generoso
- ✅ **Spam protection**: reCAPTCHA integrado
- ✅ **Email notifications**: Instantáneas
- ✅ **No JavaScript requerido**: Funciona sin JS

**Alternativas consideradas**:
- ❌ **Formspree**: Menos features en plan gratis
- ❌ **Netlify Forms**: Limitado a Netlify
- ⚠️ **EmailJS**: Buena opción, similar

**Implementación**:
```astro
<form action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

---

## 🚀 Deployment & Hosting

### Platform: Vercel

**¿Por qué Vercel?**
- ✅ **Astro support nativo**: Zero config
- ✅ **Edge Network**: CDN global
- ✅ **Preview deployments**: Por cada PR
- ✅ **Analytics**: Web Vitals tracking
- ✅ **Serverless Functions**: Si se necesitan
- ✅ **Custom domains**: Gratis con SSL

**Alternativas consideradas**:
- ⚠️ **Netlify**: Igualmente buena opción
- ⚠️ **Cloudflare Pages**: Excelente performance
- ❌ **GitHub Pages**: Menos features
- ❌ **Self-hosted**: Más complejo

**Configuración**:
```json
// vercel.json (opcional)
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

---

## 📦 Package Manager: pnpm

**¿Por qué pnpm?**
- ✅ **Más rápido**: 2x más rápido que npm
- ✅ **Eficiente**: Ahorra espacio en disco
- ✅ **Strict**: Evita phantom dependencies
- ✅ **Monorepo support**: Si crece el proyecto

**Alternativas**:
- ⚠️ **npm**: Más lento, pero funciona
- ⚠️ **yarn**: Buena opción
- ❌ **bun**: Muy nuevo, menos estable

---

## 🔧 Tooling

### Linting: ESLint + Prettier

**ESLint**:
```js
// eslint.config.js
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      // Tus reglas custom
    },
  },
]
```

**Prettier**:
```js
// .prettierrc.mjs
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
}
```

### Type Checking: TypeScript (progresivo)

**Estrategia**:
- Empezar con `allowJs: true`
- Migrar archivos críticos a `.ts`
- Usar JSDoc para type hints en `.js`
- No forzar TypeScript en todo

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false
  }
}
```

---

## 📊 Analytics

### Google Analytics 4

**Setup básico**:
```astro
---
// src/components/Analytics.astro
const GA_ID = import.meta.env.PUBLIC_GA_ID
---

{GA_ID && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
    <script define:vars={{ GA_ID }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', GA_ID);
    </script>
  </>
)}
```

**Alternativas**:
- ⚠️ **Plausible**: Privacy-friendly, paid
- ⚠️ **Fathom**: Privacy-friendly, paid
- ⚠️ **Vercel Analytics**: Integrado, limitado

---

## 🎨 Mediano Plazo

### Blog: MDX + Content Collections

**Setup**:
```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
})

export const collections = { blog }
```

### i18n: Astro i18n

**Configuración**:
```js
// astro.config.mjs
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
})
```

### Syntax Highlighting: Shiki

**Built-in en Astro**:
```astro
---
// Automático en code blocks
---

```js
console.log('Highlighted!')
```
```

---

## 🌟 Largo Plazo

### Database: Supabase

**¿Cuándo agregarlo?**
- User accounts
- Bookmarks sincronizados
- Comments system
- Analytics custom

**Setup**:
```js
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
)
```

### GitHub API

**Para dashboard de actividad**:
```js
// src/lib/github.ts
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN

export async function getRepos() {
  const res = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })
  return res.json()
}
```

---

## 📈 Performance Budget

### Targets
- **Total Page Size**: < 500KB
- **JavaScript**: < 100KB
- **CSS**: < 50KB
- **Images**: Optimizadas (WebP/AVIF)
- **Fonts**: < 100KB, preloaded

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Core Web Vitals
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

---

## 🔒 Security

### Content Security Policy
```astro
---
// src/layouts/Layout.astro
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com;
`
---

<meta http-equiv="Content-Security-Policy" content={csp}>
```

### Environment Variables
```env
# .env (no commitear)
PUBLIC_GA_ID=G-XXXXXXXXXX
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=xxx
GITHUB_TOKEN=ghp_xxx
```

---

## 📚 Recursos

### Documentación
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)

### Inspiración
- [Astro Themes](https://astro.build/themes)
- [Tailwind UI](https://tailwindui.com)
- [Awwwards](https://www.awwwards.com)

---

**Última actualización**: Febrero 2026  
**Versión**: 1.0.0  
**Autor**: Gabriel González
