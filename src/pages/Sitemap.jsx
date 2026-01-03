// 📁 src/pages/Sitemap.jsx
import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/api';
import { useProducts } from '../api/hooks/useProducts';

const Sitemap = () => {
  const [sitemapContent, setSitemapContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();
  
  useEffect(() => {
    generateSitemap();
  }, [products]);

  const generateSitemap = async () => {
    try {
      // Get all products (if not already loaded)
      let allProducts = products;
      if (!allProducts || allProducts.length === 0) {
        const response = await getProducts();
        allProducts = response.data || [];
      }

      const baseUrl = 'https://www.bunnytools.store';
      const date = new Date().toISOString().split('T')[0];
      
      // Static pages
      const staticPages = [
        { path: '', priority: '1.0', changefreq: 'daily' },
        { path: '/products', priority: '0.9', changefreq: 'daily' },
        { path: '/about', priority: '0.8', changefreq: 'monthly' },
        { path: '/contact', priority: '0.8', changefreq: 'monthly' },
        { path: '/solutions', priority: '0.8', changefreq: 'monthly' },
        { path: '/reviews', priority: '0.7', changefreq: 'weekly' },
        { path: '/refund-policy', priority: '0.5', changefreq: 'yearly' },
      ];

      // Generate XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemap.org/schemas/sitemap/0.9 http://www.sitemap.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

      // Add static pages
      staticPages.forEach(page => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;
      });

      // Add product pages
      allProducts.forEach(product => {
        xml += `  <url>\n`;
        xml += `    <loc>${baseUrl}/product/${product.id}</loc>\n`;
        xml += `    <lastmod>${date}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.8</priority>\n`;
        xml += `  </url>\n`;
      });

      xml += `</urlset>`;

      setSitemapContent(xml);
    } catch (error) {
      console.error('Error generating sitemap:', error);
      // Fallback to basic sitemap
      setSitemapContent(generateBasicSitemap());
    } finally {
      setLoading(false);
    }
  };

  const generateBasicSitemap = () => {
    const baseUrl = 'https://www.bunnytools.store';
    const date = new Date().toISOString().split('T')[0];
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/solutions</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/reviews</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/refund-policy</loc>
    <lastmod>${date}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemapContent);
    alert('Sitemap copied to clipboard!');
  };

  const downloadSitemap = () => {
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <span className="ml-4 text-gray-700">Generating sitemap...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              BunnyTools.store Sitemap
            </h1>
            <p className="text-gray-600 mb-6">
              Dynamic XML sitemap for SEO optimization. Submit this to Google Search Console.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={copyToClipboard}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy XML
              </button>
              
              <button
                onClick={downloadSitemap}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download sitemap.xml
              </button>
              
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View sitemap.xml
              </a>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to Submit to Google Search Console
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Search Console</a></li>
              <li>Select your property (bunnytools.store)</li>
              <li>Click on "Sitemaps" in the left sidebar</li>
              <li>Enter "sitemap.xml" in the "Add a new sitemap" field</li>
              <li>Click "Submit"</li>
              <li>Wait 24-48 hours for Google to crawl your site</li>
            </ol>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">XML Preview</h2>
              <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">Live sitemap</span>
            </div>
            <pre className="p-6 bg-gray-900 text-gray-300 overflow-x-auto text-sm">
              <code>{sitemapContent}</code>
            </pre>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {sitemapContent.split('<url>').length - 1}
              </div>
              <div className="text-gray-600">Total URLs</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {products?.length || 0}
              </div>
              <div className="text-gray-600">Product Pages</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                7+
              </div>
              <div className="text-gray-600">Static Pages</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;