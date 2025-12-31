// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import ScrollToTop from './components/layout/ScrollToTop';
import LoadingSpinner from './components/layout/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import SoftwareSolutionsPage from './pages/SoftwareSolutionsPage'; 
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';
import ReviewsPage from './pages/ReviewsPage'; // Import ReviewsPage

// Providers
import { ProductsProvider } from './context/ProductsContext';

// Custom wrapper component for scroll handling
const RouteWrapper = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Force scroll to top on every route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return children;
};

function App() {
  return (
    <ProductsProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-grow">
            <React.Suspense fallback={<LoadingSpinner fullScreen />}>
              <RouteWrapper>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/solutions" element={<SoftwareSolutionsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} /> {/* Add this line */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </RouteWrapper>
            </React.Suspense>
          </main>
          
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;