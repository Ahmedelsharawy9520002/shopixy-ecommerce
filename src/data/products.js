export const products = [
  {
    id: 1,
    name: "Classic White Tee",
    category: "Men",
    price: 25.0,
    description: "A comfortable, everyday classic white tee made from 100% fine cotton.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
    inStock: true
  },
  {
    id: 2,
    name: "Denim Jacket",
    category: "Unisex",
    price: 89.99,
    description: "Vintage washed denim jacket with functional pockets and a relaxed fit.",
    sizes: ["M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
    inStock: true
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    category: "Women",
    price: 45.0,
    description: "Lightweight summer dress featuring a delicate floral pattern.",
    sizes: ["XS", "S", "M"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
    inStock: true
  },
  {
    id: 4,
    name: "Athletic Running Shoes",
    category: "Men",
    price: 110.0,
    description: "Breathable run-ready shoes with advanced cushioning and support.",
    sizes: ["8", "9", "10", "11", "12"],
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    inStock: true
  },
  {
    id: 5,
    name: "Oversized Knit Sweater",
    category: "Women",
    price: 55.0,
    description: "Cozy knit sweater for chilly evenings, featuring a relaxed oversized silhouette.",
    sizes: ["S", "M", "L"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    inStock: true
  },
  {
    id: 6,
    name: "Chino Pants",
    category: "Men",
    price: 40.0,
    description: "Versatile chino pants suitable for both casual and semi-formal occasions.",
    sizes: ["30", "32", "34", "36"],
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=600",
    inStock: true
  }
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id) => {
  return products.find((p) => p.id === parseInt(id));
};

export const getCategories = () => {
  const categories = products.map(p => p.category);
  return [...new Set(categories)]; // Unique categories
};
