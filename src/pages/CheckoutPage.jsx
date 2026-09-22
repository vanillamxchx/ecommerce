import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, CreditCard, PackageCheck } from "lucide-react";
import MapPicker from "../components/MapPicker";
import FormField from "../components/FormField";
import { formatPHP } from "../data/products";
export default function CheckoutPage({ cart, user, onDone }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const [form, setForm] = useState({
    name: user.fullName,
    email: user.email,
    address: user.address,
  });
  const [submitted, setSubmitted] = useState(false);
  const invalid =
    !form.name || !/\S+@\S+\.\S+/.test(form.email) || !form.address;
  if (submitted)
    return (
      <main className="shell success">
        <PackageCheck size={42} />
        <p className="eyebrow">Order received</p>
        <h1>
          Your space is
          <br />
          <i>on its way.</i>
        </h1>
        <p>
          We’ll send the delivery details to {form.email}. Thank you for
          welcoming Teyvat home.
        </p>
        <Link className="button" to="/shop">
          Continue exploring <ArrowUpRight size={18} />
        </Link>
      </main>
    );
  return (
    <main className="shell checkout">
      <div className="page-heading">
        <p className="eyebrow">One last step</p>
        <h1>
          Almost <i>home.</i>
        </h1>
      </div>
      <div className="checkout-grid">
        <form
          className="checkout-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!invalid) {
              onDone({ total, items: cart, address: form.address });
              setSubmitted(true);
            }
          }}
        >
          <h2>Delivery information</h2>
          <FormField label="Full name" error={!form.name && "Required"}>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField
            label="Email address"
            error={
              form.email &&
              !/\S+@\S+\.\S+/.test(form.email) &&
              "Enter a valid email"
            }
          >
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormField>
          <FormField label="Delivery address">
            <textarea value={form.address} readOnly />
          </FormField>
          <p className="generated-note">
            Your saved address and its delivery pin are shown below.
          </p>
          <MapPicker position={user.position} />
          <div className="payment">
            <CreditCard />
            <div>
              <b>Cash on Delivery</b>
              <p>Pay your rider when your order arrives.</p>
            </div>
            <Check size={18} />
          </div>
          <button className="button full" disabled={invalid}>
            Place order — {formatPHP(total)}
          </button>
        </form>
        <aside className="summary">
          <p className="eyebrow">Your order</p>
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <span>
                {item.name} × {item.qty}
              </span>
              <b>{formatPHP(item.price * item.qty)}</b>
            </div>
          ))}
          <hr />
          <div className="total">
            <span>Total</span>
            <b>{formatPHP(total)}</b>
          </div>
        </aside>
      </div>
    </main>
  );
}
