# Bitácora · Alexander Corrales Ospina

Portafolio tipo bitácora con paso de página horizontal. Sitio estático (HTML, CSS, JS), sin dependencias ni build.

## Estructura
- `index.html` — header, sidebar de íconos y vistas (Proyectos, Acerca de mí, Contacto)
- `css/styles.css` — temas light/dark y animación de paso de página
- `js/data.js` — **contenido editable** (proyectos, descripciones, contacto)
- `js/main.js` — libro, navegación (rueda, teclado, táctil) y tema

## Personalización rápida
- Color de acento: variable `--accent` en `css/styles.css`
- Proyectos: arreglo `projects` en `js/data.js`

## Local
```bash
npx serve .
```

## Despliegue
Vercel (proyecto estático, sin build). Cada push a `main` despliega a producción.
