import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import { products, formatPHP } from "../data/products";
export default function ProductDetailPage({ onAdd }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  if (!product) return <Navigate to="/shop" />;
  return (
    <main className="shell detail">
      <Link to="/shop" className="back">
        <ChevronLeft size={17} /> Back to collection
      </Link>
      <div className="detail-grid">
        <div className="detail-photo">
          <img src={product.image} alt={product.name} />
        </div>
        <section>
          <p className="eyebrow">
            {product.tone} / {product.category}
          </p>
          <h1>{product.name}</h1>
          <b className="price">{formatPHP(product.price)}</b>
          <p className="description">{product.desc}</p>
          <div className="stock">
            <span></span> {product.stock} pieces ready to find a home
          </div>
          <button className="button full" onClick={() => onAdd(product)}>
            Add to bag <Plus size={18} />
          </button>
          <div className="detail-meta">
            <span>Solid wood / natural finish</span>
            <span>Delivery across the Philippines</span>
          </div>
        </section>
      </div>
    </main>
  );
}
