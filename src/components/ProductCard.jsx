// ProductCard.jsx
// Componente funcional que representa un unico producto del catalogo.
// Recibe el producto y una funcion onAgregar como props, y decide
// mediante renderizado condicional si muestra precio de oferta o normal.

import { resolverImagen } from "../utils/imagenes";
import { formatearPrecio } from "../utils/precios";

function ProductCard({ producto, onAgregar }) {
  const tieneOferta = producto.precioOferta !== null;

  return (
    <div className="col">
      <div className="card h-100 shadow-sm producto-card">
        <img
          src={resolverImagen(producto.imagen)}
          className="card-img-top"
          alt={producto.nombre}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-secondary align-self-start mb-2">
            {producto.marca}
          </span>
          <h2 className="card-title h6">{producto.nombre}</h2>
          <p className="card-text text-muted small flex-grow-1">
            {producto.descripcion}
          </p>

          {/* Renderizado condicional del precio: oferta vs normal */}
          <div className="mb-2">
            {tieneOferta ? (
              <>
                <span className="text-decoration-line-through text-muted me-2">
                  {formatearPrecio(producto.precioNormal)}
                </span>
                <span className="fw-bold text-danger">
                  {formatearPrecio(producto.precioOferta)}
                </span>
              </>
            ) : (
              <span className="fw-bold">
                {formatearPrecio(producto.precioNormal)}
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary mt-auto"
            onClick={() => onAgregar(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
