import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import { Star, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct, addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
  const navigate = useNavigate();
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Product not found.</p>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-secondary">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-accent">{product.category}</span>
              <h1 className="font-display text-3xl font-bold text-foreground mt-1">{product.name}</h1>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted-foreground'}`} />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{product.rating} / 5</span>
            </div>

            <p className="font-display text-4xl font-bold text-foreground">₹{product.price.toLocaleString()}</p>

            <p className={`text-sm font-medium ${product.stock > 0 ? 'text-accent' : 'text-destructive'}`}>
              {product.stock > 0 ? `${product.stock} items in stock` : 'Out of Stock'}
            </p>

            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  if (product.stock <= 0) { toast.error('Out of stock'); return; }
                  addToCart(product.id);
                  toast.success('Added to cart');
                }}
                disabled={product.stock === 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => {
                  if (inWishlist) { removeFromWishlist(product.id); toast.info('Removed from wishlist'); }
                  else { addToWishlist(product.id); toast.success('Added to wishlist'); }
                }}
                className={`rounded-md px-4 py-3 transition-colors ${
                  inWishlist ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="rounded-lg bg-secondary p-4 text-xs text-muted-foreground space-y-1">
              <p><strong>Product ID:</strong> {product.id}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Data Structure:</strong> Stored in Hash Table with key "{product.id}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
