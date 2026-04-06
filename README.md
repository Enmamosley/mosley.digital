# Mosley Digital Services

Sitio web oficial de **Mosley Digital Services** — agencia de desarrollo web, sistemas a medida y soluciones digitales en Monterrey, NL.

## Tech Stack

- [Astro 6](https://astro.build/) — Framework principal (SSG)
- [React 19](https://react.dev/) — Componentes interactivos
- [Tailwind CSS 4](https://tailwindcss.com/) — Estilos utilitarios
- [GSAP](https://gsap.com/) — Animaciones y scroll triggers
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático
- [Sharp](https://sharp.pixelplumbing.com/) — Optimización de imágenes

## Estructura del Proyecto

```
src/
├── config/          # Configuración del sitio, menú, redes sociales, tema
├── content/         # Contenido en Markdown (blog, work, secciones)
├── layouts/         # Layouts base, componentes, partials, shortcodes
├── lib/             # Utilidades y parsers
├── pages/           # Rutas del sitio
├── styles/          # CSS base, componentes, utilidades
└── types/           # Esquemas de colecciones (Zod)
```

## Desarrollo

```bash
# Instalar dependencias
yarn install

# Servidor de desarrollo
yarn dev

# Build de producción
yarn build

# Preview local del build
yarn preview
```

## Deploy

El sitio se despliega en **Cloudflare Workers**:

```bash
# Build + deploy
yarn deploy:cf-workers

# Preview con Wrangler
yarn preview:cf-workers
```

## Licencia

Código propietario — Mosley Digital Services. Todos los derechos reservados.
