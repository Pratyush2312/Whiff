import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SignatureCollection from "../components/SignatureCollection";
import Whiff from "../components/Whiff";
import Whatsapp from "../components/Whatsapp";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      <main id="main-content">
        {/* Chapter 01 — The first impression */}
        <section id="hero" aria-label="Discover Whiff">
          <Hero />
        </section>

        {/* Keep the WhatsApp shortcut available across the page */}
        <Whatsapp />

        {/* Chapter 02 — Discover the collection */}
        <section id="signature-collection" aria-label="Signature collection">
          <SignatureCollection />
        </section>

        {/* Chapter 03 — The story behind the fragrance */}
        <section id="our-story" aria-label="The Whiff philosophy">
          <Whiff />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
