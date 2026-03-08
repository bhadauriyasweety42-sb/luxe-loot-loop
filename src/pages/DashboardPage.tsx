import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';

const DashboardPage = () => {
  const { getAllProducts, username } = useShop();
  const allProducts = getAllProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Hello, {username.split('@')[0]} 👋
          </h1>
          <p className="text-muted-foreground mt-1">Browse our curated collection</p>
        </div>

        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Product Catalog</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
