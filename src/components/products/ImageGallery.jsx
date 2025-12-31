// src/components/products/ImageGallery.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';

const ImageGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-gray-600">No images available</p>
        </div>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, selectedIndex]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={selectedImage.image}
          alt={`Product image ${selectedIndex + 1}`}
          className="w-full h-[400px] object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
          onClick={() => setIsFullscreen(true)}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* Zoom Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white hover:shadow-lg transition-all"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                idx === selectedIndex
                  ? 'border-brand-purple ring-2 ring-purple-100'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={img.image}
                alt={`Thumbnail ${idx + 1}`}
                className="h-20 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Fullscreen Navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          
          {/* Fullscreen Image */}
          <div className="max-w-6xl max-h-[80vh]">
            <img
              src={selectedImage.image}
              alt={`Product image ${selectedIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
          
          {/* Thumbnails in Fullscreen */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-3 rounded-full transition-all ${
                    idx === selectedIndex
                      ? 'w-8 bg-white'
                      : 'w-3 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;