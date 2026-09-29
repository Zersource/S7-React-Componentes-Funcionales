// App.jsx
// Componente raiz. Concentra el estado de la aplicacion (carrito,
// visibilidad del panel y filtros) y lo distribuye a los componentes
// hijos mediante props, junto con las funciones que lo modifican.

import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Filtros from "./components/Filtros";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import productos from "./data/products.json";
import { precioFinal } from "./utils/precios";
import "./App.css";

const CLAVE_CARRITO = "technova-carrito-s7";

// Lee el carrito guardado (si existe y es valido). Se usa como
// inicializador perezoso de useState, asi solo corre una vez.
function cargarCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    const datos = guardado ? JSON.parse(guardado) : [];
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function App() {
  // ---- Estado ----
  const [carrito, setCarrito] = useState(cargarCarritoGuardado); // [{ producto, cantidad }]
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  // ---- Efecto: persistir el carrito cada vez que cambia ----
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch {
      // Si el navegador bloquea el almacenamiento, la app sigue funcionando
    }
  }, [carrito]);

  // ---- Acciones sobre el carrito ----
  function agregarAlCarrito(producto) {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.producto.id === producto.id);
      if (existente) {
        // Ya esta en el carrito: solo se incrementa la cantidad
        return prev.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
    setCarritoAbierto(true);
  }

  function aumentarCantidad(idProducto) {
    setCarrito((prev) =>
      prev.map((item) =>
        item.producto.id === idProducto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  function disminuirCantidad(idProducto) {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.producto.id === idProducto
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0) // al llegar a 0 se elimina
    );
  }

  function eliminarDelCarrito(idProducto) {
    setCarrito((prev) =>
      prev.filter((item) => item.producto.id !== idProducto)
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  // useCallback mantiene estable la referencia para el useEffect de Cart
  const cerrarCarrito = useCallback(() => setCarritoAbierto(false), []);

  // ---- Valores derivados del estado ----
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCarrito = carrito.reduce(
    (acc, item) => acc + precioFinal(item.producto) * item.cantidad,
    0
  );

  const categorias = [...new Set(productos.map((p) => p.categoria))];
  const texto = busqueda.trim().toLowerCase();
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoria === "Todos" || p.categoria === categoria;
    const coincideTexto =
      texto === "" ||
      [p.nombre, p.marca, p.descripcion].some((campo) =>
        campo.toLowerCase().includes(texto)
      );
    return coincideCategoria && coincideTexto;
  });

  return (
    <>
      <Navbar
        cantidadCarrito={cantidadTotal}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />

      <main className="container py-4">
        <h1 className="h4 mb-3">Catalogo de productos</h1>
        <Filtros
          busqueda={busqueda}
          categoria={categoria}
          categorias={categorias}
          onBuscar={setBusqueda}
          onCategoria={setCategoria}
        />
        <ProductList
          productos={productosFiltrados}
          onAgregar={agregarAlCarrito}
        />
      </main>

      <footer className="container py-3 text-center text-muted small border-top">
        TechNova Store &middot; Actividad formativa Semana 7 &middot; React + Vite
      </footer>

      {/* El panel del carrito solo se monta cuando carritoAbierto es true */}
      {carritoAbierto && (
        <Cart
          items={carrito}
          cantidadTotal={cantidadTotal}
          total={totalCarrito}
          onAumentar={aumentarCantidad}
          onDisminuir={disminuirCantidad}
          onEliminar={eliminarDelCarrito}
          onVaciar={vaciarCarrito}
          onCerrar={cerrarCarrito}
        />
      )}
    </>
  );
}

export default App;
