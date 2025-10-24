import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();
  const product = products.find(p => p.slug === slug);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#3d4f5c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#3d4f5c] mb-4">Product Not Found</h1>
          <Link to="/" className="text-[#3d4f5c] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#3d4f5c] hover:text-[#2d3f4c] transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="relative animate-slideInLeft" style={{ opacity: 0 }}>
            <div className="sticky top-32">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="animate-slideInRight" style={{ opacity: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3d4f5c] mb-6">
              {product.title}
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mt-12 p-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl animate-fadeIn delay-200" style={{ opacity: 0 }}>
              <h2 className="text-2xl font-bold text-[#3d4f5c] mb-6">
                Interested in this product?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact us today to discuss your requirements and receive a detailed quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+96171981996"
                  className="bg-[#3d4f5c] text-white px-8 py-3 rounded-lg hover:bg-[#2d3f4c] transition font-semibold text-center shadow-lg"
                >
                  +961 71 981 996
                </a>
                <a
                  href="tel:+2250150191162"
                  className="bg-[#3d4f5c] text-white px-8 py-3 rounded-lg hover:bg-[#2d3f4c] transition font-semibold text-center shadow-lg"
                >
                  +225 01 50 19 11 62
                </a>
              </div>
            </div>

            <div className="mt-8 animate-fadeIn delay-300" style={{ opacity: 0 }}>
              <h3 className="text-xl font-bold text-[#3d4f5c] mb-4">Our Expertise</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Over 30 years of manufacturing experience
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Premium quality materials and craftsmanship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Custom fabrication to your specifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Professional installation available
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold text-[#3d4f5c] mb-8 text-center animate-fadeIn delay-400" style={{ opacity: 0 }}>
            Other Products
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug}`}
                  className="group animate-scaleIn"
                  style={{ animationDelay: `${(index + 5) * 0.1}s`, opacity: 0 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                    <img
                      src={relatedProduct.imageUrl}
                      alt={relatedProduct.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-[#3d4f5c] group-hover:text-[#2d3f4c] transition">
                        {relatedProduct.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
