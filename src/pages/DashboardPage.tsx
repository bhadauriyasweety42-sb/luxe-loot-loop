import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

const categoryLabels: Record<string, string> = {
  clothes: 'Clothes',
  shoes: 'Shoes',
  skincare: 'Skincare',
  accessories: 'Accessories',
};

const DashboardPage = () => {
  const { getAllProducts, username } = useShop();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const allProducts = getAllProducts();
  
  const filteredProducts = useMemo(() => {
    if (!categoryFilter || categoryFilter === 'all') {
      return allProducts;
    }
    return allProducts.filter(p => p.category === categoryFilter);
  }, [allProducts, categoryFilter]);

  const pageTitle = categoryFilter && categoryFilter !== 'all' 
    ? categoryLabels[categoryFilter] || 'Products'
    : 'All Products';

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

        <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{pageTitle}</h2>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-12 text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
