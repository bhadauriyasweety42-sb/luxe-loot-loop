import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';

const Index = () => {
  const { getAllProducts } = useShop();
  const allProducts = getAllProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Fashion collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:py-44">
          <div className="max-w-lg">
            <h1 className="font-display text-5xl font-bold text-primary-foreground sm:text-6xl leading-tight">
              Elevate Your Style
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Curated fashion, shoes & skincare — handpicked for the modern you.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90 transition-colors">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Collection</h2>
            <p className="mt-1 text-muted-foreground">Our top picks for this season</p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="font-display text-xl font-bold text-secondary-foreground">LUXE<span className="text-accent">.</span></p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">Home</Link>
              <Link to="/dashboard" className="hover:text-accent">Products</Link>
              <Link to="/contact" className="hover:text-accent">Contact</Link>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
