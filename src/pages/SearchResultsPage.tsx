import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { useShop } from '@/context/ShopContext';
import noResultsImg from '@/assets/no-results.png';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { getAllProducts } = useShop();

  const results = query.trim()
    ? getAllProducts().filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Search Results for "<span className="text-accent">{query}</span>"
        </h1>
        <p className="text-muted-foreground mb-8">
          {results.length} {results.length === 1 ? 'item' : 'items'} found
        </p>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {results.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <img src={noResultsImg} alt="No results found" className="h-64 w-64 object-contain mb-6" />
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              Oops! Nothing here! 🙀
            </h2>
            <p className="text-muted-foreground max-w-md">
              Our cat searched every shelf and couldn't find "{query}". Try a different search or browse our collection!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
