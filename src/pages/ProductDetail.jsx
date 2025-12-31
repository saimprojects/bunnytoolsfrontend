// src/pages/ProductDetail.jsx - Enhanced for Digital Products with Plans
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Download, 
  FileText,
  Clock,
  Shield,
  Headphones,
  Globe,
  Star,
  ChevronRight,
  Share2,
  BookOpen,
  CheckCircle,
  CreditCard,
  Zap,
  Crown,
  Check,
  Calendar
} from 'lucide-react';
import ImageGallery from '../components/products/ImageGallery';
import ReviewList from '../components/products/ReviewList';
import ProductCard from '../components/products/ProductCard';
import { getProductById, getWhatsAppNumber } from '../api/api';
import { useProducts } from '../api/hooks/useProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(null);
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);

  const { products: allProducts } = useProducts();

  useEffect(() => {
    fetchProduct();
    fetchWhatsappNumber();
  }, [id]);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      // Find related products (same category)
      const related = allProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [product, allProducts]);

  useEffect(() => {
    // Set first plan as selected by default when plans are loaded
    if (product?.plans && product.plans.length > 0) {
      setSelectedPlan(product.plans[0]);
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Product not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchWhatsappNumber = async () => {
    try {
      setLoadingWhatsapp(true);
      const number = await getWhatsAppNumber();
      setWhatsappNumber(number);
    } catch (err) {
      console.error('Error fetching WhatsApp number:', err);
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handlePurchase = async () => {
    if (!selectedPlan) {
      alert('Please select a plan first');
      return;
    }

    try {
      let number = whatsappNumber;
      
      // If WhatsApp number is not loaded, fetch it
      if (!number) {
        setLoadingWhatsapp(true);
        number = await getWhatsAppNumber();
        setWhatsappNumber(number);
      }

      const cleanNumber = number.replace('+', '');
      const message = `Hello! I want to purchase this product:\n\n📦 *Product:* ${product.title}\n📋 *Selected Plan:* ${selectedPlan.title}\n💰 *Price:* Rs. ${selectedPlan.price}\n⏰ *Duration:* ${selectedPlan.duration_months} month${selectedPlan.duration_months > 1 ? 's' : ''}\n\nPlease provide me with payment details.`;
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(url, '_blank');
    } catch (err) {
      alert('Unable to contact WhatsApp. Please try again or contact support.');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleContact = async () => {
    try {
      let number = whatsappNumber;
      
      if (!number) {
        setLoadingWhatsapp(true);
        number = await getWhatsAppNumber();
        setWhatsappNumber(number);
      }

      const cleanNumber = number.replace('+', '');
      const message = `Hello! I have a question about this product: ${product.title}`;
      const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } catch (err) {
      alert('Unable to contact WhatsApp. Please try again.');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };




  const getPlanIcon = (index) => {
    const icons = [Zap, Crown, CreditCard];
    return icons[index % icons.length];
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="animate-pulse space-y-8">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-[400px] bg-gray-200 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded-xl w-56"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">{error || "The product you're looking for doesn't exist."}</p>
          <Link 
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-brand-purple to-brand-purple-light text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-brand-purple">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/products" className="hover:text-brand-purple">Digital Products</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="sticky top-24">
              {product.images && product.images.length > 0 ? (
                <ImageGallery images={product.images} />
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No preview available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.categories?.map(category => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="px-3 py-1 bg-purple-50 text-brand-purple text-sm rounded-full hover:bg-purple-100 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              <span className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-full font-medium">
                Digital Product
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`w-5 h-5 ${
                      i < (product.rating || 4) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating || 4}.0 ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                {product.downloads || 1250}+ Downloads
              </span>
            </div>

            {/* Plan Selection Section */}
            {product.plans && product.plans.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Plan</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.plans.map((plan, index) => {
                    const PlanIcon = getPlanIcon(index);
                    const isSelected = selectedPlan?.id === plan.id;
                    
                    return (
                      <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan)}
                        className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg ${
                          isSelected 
                            ? 'border-purple-600 bg-purple-50 shadow-md' 
                            : 'border-gray-200 bg-white hover:border-purple-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                        
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <PlanIcon className={`w-5 h-5 mr-2 ${
                                index === 0 ? 'text-yellow-500' :
                                index === 1 ? 'text-purple-500' : 'text-blue-500'
                              }`} />
                              <h4 className="font-bold text-gray-900">{plan.title}</h4>
                            </div>
                            <div className="flex items-baseline">
                              <span className="text-3xl font-bold text-gray-900">Rs. {plan.price}</span>
                              <span className="text-gray-500 ml-2">
                                / {plan.duration_months} month{plan.duration_months > 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Full access to all content</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Lifetime updates</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            <span>Priority support</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                          Billed once • No hidden fees
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Selected Plan Summary */}
                {selectedPlan && (
                  <div className="mt-6 bg-gradient-to-r from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Selected Plan</h4>
                        <p className="text-gray-600">{selectedPlan.title}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">Rs. {selectedPlan.price}</div>
                        <div className="text-sm text-gray-500">
                          {selectedPlan.duration_months} month access
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={handlePurchase}
                      disabled={loadingWhatsapp}
                      className={`w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-200 transition-all flex items-center justify-center ${
                        loadingWhatsapp ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {loadingWhatsapp ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Connecting...
                        </>
                      ) : (
                        `Buy Now - Rs. ${selectedPlan.price}`
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 mt-3">
                      Secure payment • 30-day money-back guarantee
                    </p>
                  </div>
                )}
              </div>
            )}


            {/* Description */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
              <div 
                className="prose prose-lg max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
              />
            </div>
          </div>
        </div>



        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            {product.reviews && product.reviews.length > 0 ? (
              <ReviewList reviews={product.reviews} />
            ) : (
              <div className="text-center py-12">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                
                
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;