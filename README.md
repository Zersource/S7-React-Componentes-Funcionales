# TechNova Store - Componentes funcionales en React

Actividad formativa **Semana 7** - Desarrollo Frontend I (PFY2201), Duoc UC.
Continuación del eCommerce TechNova Store de la semana 6, reescrito con **React + Vite**
usando componentes funcionales, `useState`, `useEffect` y renderizado condicional.

- **Alumno:** Sergio Mascareno
- **Demo (GitHub Pages):** https://zersource.github.io/S7-React-Componentes-Funcionales/
- **Repositorio:** https://github.com/Zersource/S7-React-Componentes-Funcionales

## Funcionalidades

| Funcionalidad | Descripción |
|---|---|
| Listado de productos | 8 productos con nombre, marca, precio normal, precio oferta, descripción corta e imagen |
| Carrito de compras | Agregar productos, aumentar/disminuir cantidad, eliminar y vaciar |
| Contador | Badge en la barra de navegación y "Total de productos" dentro del carrito |
| Total | Suma del precio final (oferta si existe, si no el normal) por la cantidad de cada producto |
| Filtros | Búsqueda por texto (nombre, marca, descripción) y filtro por categoría |
| Persistencia | El carrito se conserva al recargar la página (`localStorage`) |
| Accesibilidad básica | `aria-label` en botones, `role="dialog"` en el carrito y cierre con la tecla Escape |

## Conceptos de React aplicados

- **Componentes funcionales y props:** cada pieza de la interfaz es un componente que recibe datos y funciones por props.
- **`useState`:** estado del carrito, visibilidad del panel, texto de búsqueda y categoría (en `App.jsx`).
- **`useEffect`:** persistencia del carrito en `localStorage` (`App.jsx`) y manejo de la tecla Escape con limpieza del listener (`Cart.jsx`).
- **`useCallback`:** referencia estable de `cerrarCarrito` para el efecto de `Cart`.
- **Renderizado condicional:**
  - precio de oferta tachado vs. precio normal (`ProductCard`)
  - badge del carrito solo si hay productos (`Navbar`)
  - carrito vacío vs. carrito con productos y resumen de totales (`Cart`)
  - panel del carrito montado solo cuando está abierto (`App`)
  - mensaje cuando los filtros no encuentran productos (`ProductList`)
- **Eventos:** `onClick` (agregar, quitar, eliminar, vaciar, abrir/cerrar) y `onChange` (búsqueda y categoría).
- **Estado elevado ("lifting state up"):** el estado vive en `App` y se distribuye hacia abajo.

## Estructura del proyecto

```
S7-React-Componentes-Funcionales/
├── index.html                 # Punto de entrada (Bootstrap 5.3.3 por CDN)
├── vite.config.js             # base: ruta del repositorio para GitHub Pages
├── package.json
├── capturas/                  # Evidencias de funcionamiento
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx               # Monta <App /> en el DOM
    ├── App.jsx                # Estado global, acciones del carrito y filtros
    ├── App.css                # Estilos propios (panel del carrito, cards)
    ├── index.css              # Reset mínimo
    ├── components/
    │   ├── Navbar.jsx         # Barra superior + botón/contador del carrito
    │   ├── Filtros.jsx        # Búsqueda y categoría (inputs controlados)
    │   ├── ProductList.jsx    # Grid de productos / mensaje sin resultados
    │   ├── ProductCard.jsx    # Tarjeta de un producto
    │   ├── Cart.jsx           # Panel del carrito
    │   ├── CartItem.jsx       # Fila del carrito (cantidad, subtotal, eliminar)
    │   └── CartTotal.jsx      # Total de productos y monto a pagar
    ├── data/
    │   └── products.json      # Catálogo de productos
    ├── utils/
    │   ├── precios.js         # formatearPrecio() y precioFinal()
    │   └── imagenes.js        # Resuelve la URL de cada imagen vía Vite
    └── assets/productos/      # Imágenes de los productos
```

## Cómo ejecutarlo

Requisitos: Node.js 20.19 o superior (o 22.12+), exigido por Vite 8.

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo (http://localhost:5173/S7-React-Componentes-Funcionales/)
npm run lint       # análisis estático (oxlint)
npm run build      # genera la carpeta dist/ para producción
npm run preview    # sirve el build localmente
```

## Despliegue en GitHub Pages

El sitio se publica desde la rama `gh-pages` (no desde `main`):

```bash
npm run deploy     # ejecuta el build y publica dist/ en la rama gh-pages
```

`vite.config.js` define `base: '/S7-React-Componentes-Funcionales/'`; si el repositorio cambia de nombre,
ese valor debe actualizarse para que carguen los archivos.

## Decisiones de diseño

- **Panel del carrito controlado por React:** en la semana 6 el carrito usaba el Offcanvas de Bootstrap, que
  manipula el DOM directamente. En React se reemplazó por un componente montado condicionalmente, usando
  Bootstrap solo para estilos, para no mezclar dos formas de controlar el mismo elemento.
- **Precio final centralizado:** `precioFinal()` y `formatearPrecio()` viven en `utils/precios.js` y se reutilizan
  en todos los componentes, evitando duplicar la regla oferta/normal.
- **Productos repetidos se agrupan** por cantidad (igual que en la semana 6) en vez de duplicar filas.
- **Imágenes:** son ilustraciones generadas (sin texto incrustado) usadas como placeholders del catálogo.

## Validación realizada

- `npm run lint` (oxlint): 0 errores, 0 advertencias.
- `npm run build`: compila sin errores.
- HTML validado con **vnu.jar** (Nu HTML Checker), tanto `index.html` como el DOM renderizado por React (catálogo y carrito abierto): 0 errores.
- Verificaciones automatizadas con Playwright sobre el build de producción (43 comprobaciones: listado e
  imágenes, ofertas, agrupación, totales, +/−, eliminar, vaciar, filtros, persistencia en `localStorage`,
  tecla Escape, ausencia de errores en consola y diseño responsivo a 390, 768 y 1440 px sin scroll horizontal).
- Evidencias visuales en `capturas/`.
