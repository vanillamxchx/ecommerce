import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, MapPin, PackageCheck } from "lucide-react";
import MapPicker from "../components/MapPicker";
import { pinFromAddress } from "../data/address";
import { formatPHP } from "../data/products";
import FormField from "../components/FormField";
export default function ProfilePage({ user, onUpdate, orders }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(user);
  const updateAddress = (address) =>
    setDraft({ ...draft, address, position: pinFromAddress(address) });
  const save = () => {
    onUpdate(draft);
    setEditing(false);
  };
  return (
    <main className="shell profile">
      <div className="page-heading">
        <p className="eyebrow">Your circle</p>
        <h1>
          Hello, <i>{user.username}.</i>
        </h1>
        <p>Keep your details ready for the next thing that feels like home.</p>
      </div>
      <div className="profile-grid">
        <section className="profile-card">
          <div className="avatar">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
          <h2>{user.fullName}</h2>
          <p>@{user.username}</p>
          <hr />
          <div className="info-line">
            <span>Email</span>
            <b>{user.email}</b>
          </div>
        </section>
        <section className="delivery-card">
          <div className="card-title">
            <div>
              <p className="eyebrow">Delivery details</p>
              <h2>Your address</h2>
            </div>
            <button
              className="text-button"
              onClick={() => setEditing(!editing)}
            >
              {editing ? "Cancel" : "Edit details"}
            </button>
          </div>
          {editing ? (
            <>
              <div className="edit-fields">
                <FormField label="Full name">
                  <input
                    value={draft.fullName}
                    onChange={(e) =>
                      setDraft({ ...draft, fullName: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Delivery address">
                  <textarea
                    value={draft.address}
                    onChange={(e) => updateAddress(e.target.value)}
                    placeholder="Enter a Metro Manila delivery address"
                  />
                </FormField>
              </div>
              <MapPicker position={draft.position} />
              <button className="button" onClick={save}>
                Save delivery details <Check size={17} />
              </button>
            </>
          ) : (
            <>
              <div className="address-view">
                <MapPin />
                <div>
                  <b>{user.fullName}</b>
                  <p>{user.address}</p>
                </div>
              </div>
              <MapPicker position={user.position} />
            </>
          )}
        </section>
      </div>
      <section className="orders-section">
        <div className="card-title">
          <div>
            <p className="eyebrow">Your home, in motion</p>
            <h2>Orders</h2>
          </div>
          <span className="order-count">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>
        {orders.length ? (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-row" key={order.id}>
                <div>
                  <b>{order.id}</b>
                  <p>
                    {order.date} ·{" "}
                    {order.items.reduce((sum, item) => sum + item.qty, 0)} piece
                    {order.items.reduce((sum, item) => sum + item.qty, 0) !== 1
                      ? "s"
                      : ""}
                  </p>
                </div>
                <div className="order-items">
                  {order.items.map((item) => item.name).join(", ")}
                </div>
                <b>{formatPHP(order.total)}</b>
                <span className="order-status">{order.status}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <PackageCheck size={25} />
            <div>
              <b>No orders yet</b>
              <p>When you check out, your furniture order will appear here.</p>
            </div>
            <Link className="text-button" to="/shop">
              Browse shop
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
