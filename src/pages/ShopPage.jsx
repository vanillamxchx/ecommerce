import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Plus, Search } from "lucide-react";
import { products, formatPHP } from "../data/products";

function ProductCard({ product, onAdd }) {
  return (
    <article className="product">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <span>{product.tone}</span>
        </div>
      </Link>
      <div className="product-info">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.category}</p>
        </div>
        <b>{formatPHP(product.price)}</b>
      </div>
      <button onClick={() => onAdd(product)} className="add">
        Add to bag <Plus size={16} />
      </button>
    </article>
  );
}
export default function ShopPage({ onAdd }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 6));
  const shown = filtered.slice((page - 1) * 6, page * 6);
  return (
    <main className="shell shop">
      <div className="page-heading">
        <p className="eyebrow">The collection — 2026</p>
        <h1>
          Objects with
          <br />
          <i>good energy.</i>
        </h1>
        <p>Gathered for homes that grow with you.</p>
      </div>
      <div className="controls">
        <div className="search">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search the collection"
          />
        </div>
        <div className="filters">
          {categories.map((item) => (
            <button
              className={item === category ? "active" : ""}
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {shown.map((product) => (
          <ProductCard product={product} onAdd={onAdd} key={product.id} />
        ))}
      </div>
      {filtered.length > 6 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next <ArrowUpRight size={15} />
          </button>
        </div>
      )}
    </main>
  );
}
