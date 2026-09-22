import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div className="eyebrow">
          Furniture for a life well lived <span>✦</span> Philippines
        </div>
        <h1>
          Make room
          <br />
          for wonder.
        </h1>
        <p>
          Thoughtful furniture for the chapters that happen at home. Designed
          with calm in mind, inspired by the seven nations of Teyvat.
        </p>
        <Link className="button" to="/signup">
          Explore Teyvat <ArrowUpRight size={18} />
        </Link>
        <div className="hero-note">
          <b>01 — 07</b>
          <span>Curated objects, made to feel like home.</span>
        </div>
      </section>
      <section className="hero-photo">
        <div className="image-label">THE SERENITEA COLLECTION</div>
      </section>
      <section className="manifesto">
        <p>
          “A home is not a place to arrive.
          <br />
          It is a place to become.”
        </p>
        <span>— Teyvat Atelier</span>
      </section>
      <section className="values">
        <article>
          <b>01</b>
          <h3>Made to linger</h3>
          <p>Pieces with presence, made for your everyday rituals.</p>
        </article>
        <article>
          <b>02</b>
          <h3>Gently considered</h3>
          <p>Natural textures and soft forms for unhurried spaces.</p>
        </article>
        <article>
          <b>03</b>
          <h3>From our shores</h3>
          <p>Delivered with care throughout the Philippines.</p>
        </article>
      </section>
    </main>
  );
}
