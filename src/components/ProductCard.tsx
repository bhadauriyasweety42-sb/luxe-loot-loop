import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/lib/productData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useShop();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.stock <= 0) {
      toast.error('This item is out of stock');
      return;
    }
    addToCart(product.id);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group cursor-pointer rounded-lg bg-card shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            inWishlist
              ? 'bg-accent text-accent-foreground'
              : 'bg-background/80 text-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <Heart className="h-4 w-4" fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/50">
            <span className="rounded-md bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted-foreground'
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">{product.rating}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">
            ₹{product.price.toLocaleString()}
          </span>
          <span className={`text-xs font-medium ${product.stock > 0 ? 'text-accent' : 'text-destructive'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
