import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import Cards from '../components/Cards';
import { ProductsContext } from '../components/productsProvider';

export default function ProductDetailPage() {
  const location = useLocation();
  const { product: productSummary } = location.state || {};
  const { products } = React.useContext(ProductsContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (productSummary?.id) {
      const fullProduct = products.find((p) => p.id === productSummary.id);
      setProduct(fullProduct);

      // Get random related products
      const randomProducts = products
        .filter((p) => p.id !== productSummary.id) // Exclude the current product
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 4); // Limit to 4 products
      setRelatedProducts(randomProducts);
    }
  }, [productSummary, products]);

  if (!product) return <p>Product not found.</p>;

  const handleAddToWishlist = (product) => {

    if (localStorage.getItem('isSignedIn') !== 'true') {
      Swal.fire({
        title: 'Not Logged In',
        text: 'Please log in to add items to your cart.',
        icon: 'warning',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/SignUp.jsx'); 
      });
      return;
    }
    const { id, title, image, price } = product;
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
    const isProductInWishlist = wishlist.some(item => item.id === id);
  
    if (!isProductInWishlist) {
      wishlist.push({ id, title, image, price });
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert(`${title} has been added to your wishlist!`);
    } else {
      alert(`${title} is already in your wishlist.`);
    }
  };
  return (
    <div className='max-w-screen-xl mx-auto px-[90px] mt-20'>
      <h3 className='my-20'>
        <span className='text-Text1'> <a href="/">Home /</a> {product.category} / </span> {product.title}
      </h3>
      <ProductDetail product={product} />
      
      <div className='flex items-center mb-8'>
        <div className="h-[40px] w-[20px] bg-Secondary2 mr-2 rounded"></div>
        <span className='text-Secondary2 font-semibold'>Related Items</span>
      </div>
      
      <div className='flex gap-8 mb-[140px]'>
        {relatedProducts.map((relatedProduct) => (
          <Cards key={relatedProduct.id} product={relatedProduct} onAddToWishlist={handleAddToWishlist} />
        ))}
      </div>
    </div>
  );
}
