import leatherJacketImg from '@/assets/products/leather-jacket.jpg';
import summerDressImg from '@/assets/products/summer-dress.jpg';
import whiteSneakersImg from '@/assets/products/white-sneakers.jpg';
import skincareSerumImg from '@/assets/products/skincare-serum.jpg';
import denimJeansImg from '@/assets/products/denim-jeans.jpg';
import moisturizerImg from '@/assets/products/moisturizer.jpg';
import cashmereSweaterImg from '@/assets/products/cashmere-sweater.jpg';
import sunglassesImg from '@/assets/products/sunglasses.jpg';
import silkBlouseImg from '@/assets/products/silk-blouse.jpg';
import runningShoesImg from '@/assets/products/running-shoes.jpg';
import lipGlossImg from '@/assets/products/lip-gloss.jpg';
import highHeelsImg from '@/assets/products/high-heels.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: 'clothes' | 'shoes' | 'skincare' | 'accessories';
  rating: number;
  description: string;
}

export const products: Product[] = [
  {
    id: "P1",
    name: "Classic Leather Jacket",
    price: 12999,
    stock: 5,
    image: leatherJacketImg,
    category: "clothes",
    rating: 4.8,
    description: "Premium quality genuine leather jacket with a timeless biker design. Features durable zippers, snap buttons, and a quilted lining for warmth. Perfect for layering in any season."
  },
  {
    id: "P2",
    name: "Elegant Summer Dress",
    price: 4999,
    stock: 8,
    image: summerDressImg,
    category: "clothes",
    rating: 4.5,
    description: "Flowing white summer dress crafted from lightweight cotton. V-neckline with delicate spaghetti straps and a romantic ruffled hem. Ideal for beach outings and garden parties."
  },
  {
    id: "P3",
    name: "White Minimalist Sneakers",
    price: 6999,
    stock: 12,
    image: whiteSneakersImg,
    category: "shoes",
    rating: 4.7,
    description: "Clean, versatile white sneakers made with premium leather upper and cushioned sole. The perfect everyday shoe that pairs with anything from jeans to suits."
  },
  {
    id: "P4",
    name: "Glow Revive Serum",
    price: 2499,
    stock: 15,
    image: skincareSerumImg,
    category: "skincare",
    rating: 4.9,
    description: "Advanced hydrating serum with hyaluronic acid and vitamin C. Brightens skin, reduces fine lines, and provides deep moisture. Suitable for all skin types."
  },
  {
    id: "P5",
    name: "Slim Fit Denim Jeans",
    price: 3999,
    stock: 10,
    image: denimJeansImg,
    category: "clothes",
    rating: 4.3,
    description: "Classic indigo wash slim-fit jeans crafted from premium stretch denim. Features a comfortable mid-rise waist, five-pocket styling, and a modern tapered leg."
  },
  {
    id: "P6",
    name: "Luxury Face Moisturizer",
    price: 1899,
    stock: 20,
    image: moisturizerImg,
    category: "skincare",
    rating: 4.6,
    description: "Rich, nourishing face cream with shea butter and ceramides. Provides 24-hour hydration while strengthening the skin barrier. Fragrance-free and dermatologist tested."
  },
  {
    id: "P7",
    name: "Cashmere Turtleneck Sweater",
    price: 8999,
    stock: 4,
    image: cashmereSweaterImg,
    category: "clothes",
    rating: 4.7,
    description: "Luxuriously soft 100% cashmere turtleneck in a warm camel tone. Ribbed cuffs and hem, relaxed fit. An investment piece that elevates any winter wardrobe."
  },
  {
    id: "P8",
    name: "Aviator Sunglasses",
    price: 3499,
    stock: 7,
    image: sunglassesImg,
    category: "accessories",
    rating: 4.4,
    description: "Classic aviator sunglasses with gold-tone metal frames and gradient UV400 lenses. Adjustable nose pads for a comfortable fit. Comes with a premium carrying case."
  },
  {
    id: "P9",
    name: "Silk Blouse – Blush Pink",
    price: 5499,
    stock: 6,
    image: silkBlouseImg,
    category: "clothes",
    rating: 4.6,
    description: "Elegant silk blouse in a flattering blush pink shade. Features a relaxed collar, button-front closure, and rolled-up sleeves. Transitions beautifully from office to evening."
  },
  {
    id: "P10",
    name: "Performance Running Shoes",
    price: 7499,
    stock: 9,
    image: runningShoesImg,
    category: "shoes",
    rating: 4.5,
    description: "Lightweight, responsive running shoes with breathable mesh upper and cushioned midsole. Designed for both short sprints and long-distance runs. Available in black/red."
  },
  {
    id: "P11",
    name: "Velvet Lip Gloss Set",
    price: 1299,
    stock: 25,
    image: lipGlossImg,
    category: "skincare",
    rating: 4.2,
    description: "Set of 3 luxurious lip glosses in trending shades. Long-lasting, non-sticky formula enriched with vitamin E. Provides a gorgeous high-shine finish."
  },
  {
    id: "P12",
    name: "Stiletto Pumps – Nude",
    price: 5999,
    stock: 3,
    image: highHeelsImg,
    category: "shoes",
    rating: 4.8,
    description: "Sophisticated nude stiletto pumps with a 4-inch heel. Crafted from smooth faux suede with a padded insole for comfort. A wardrobe essential for formal occasions."
  }
];
