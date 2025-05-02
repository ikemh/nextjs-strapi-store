"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

// URL da API Strapi via variável de ambiente
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Componente para exibir cada produto com tabela de variantes e seletor de quantidade
function ProductCard({ product, observeRef }) {
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [quantities, setQuantities] = useState(() =>
    product.variants.reduce((acc, v) => ({ ...acc, [v.sku]: 1 }), {})
  );

  const toggleVariant = (sku) => {
    setSelectedVariants((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  };

  const changeQuantity = (sku, value) => {
    setQuantities((prev) => ({ ...prev, [sku]: value }));
  };

  return (
    <div
      ref={observeRef}
      className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col"
    >
      {product.imageUrl && (
        <div className="relative w-full aspect-[1000/400] rounded-lg mb-4 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h2 className="text-xl font-bold mb-2 text-black">{product.title}</h2>
      <table className="w-full mb-4 table-auto text-black">
        <thead>
          <tr>
            <th className="px-2 py-1">Selecionar</th>
            <th className="px-2 py-1">Material</th>
            <th className="px-2 py-1">Preço</th>
            <th className="px-2 py-1">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {product.variants.map((v) => (
            <tr key={v.sku} className="text-center">
              <td className="px-2 py-1">
                <input
                  type="checkbox"
                  checked={selectedVariants.includes(v.sku)}
                  onChange={() => toggleVariant(v.sku)}
                />
              </td>
              <td className="px-2 py-1">{v.material}</td>
              <td className="px-2 py-1">R$ {v.price.toFixed(2)}</td>
              <td className="px-2 py-1">
                <input
                  type="number"
                  min="1"
                  className="w-16 border rounded p-1"
                  value={quantities[v.sku]}
                  onChange={(e) =>
                    changeQuantity(v.sku, parseInt(e.target.value) || 1)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-auto py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition">
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const url = `${apiUrl}/api/produtos?populate=*&pagination[page]=${page}&pagination[pageSize]=12`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = await res.json();

        const items = (json.data || []).map((p) => ({
          id: p.id,
          title: p.title,
          imageUrl: p.image?.formats?.medium?.url
            ? `${apiUrl}${p.image.formats.medium.url}`
            : p.image?.url
              ? `${apiUrl}${p.image.url}`
              : "",
          variants: p.variants.map((v) => ({
            sku: v.sku,
            material: v.material,
            price: v.price,
          })),
        }));

        setProducts((prev) => [...prev, ...items]);
        const { pagination } = json.meta;
        setHasMore(pagination.page < pagination.pageCount);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [page]);

  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod, idx) => {
          const isLast = idx === products.length - 1;
          return (
            <ProductCard
              key={prod.id}
              product={prod}
              observeRef={isLast ? lastCardRef : null}
            />
          );
        })}
        {loading && (
          <p className="col-span-full text-center text-black">Carregando...</p>
        )}
        {!hasMore && (
          <p className="col-span-full text-center text-black">
            Fim do catálogo
          </p>
        )}
      </main>
    </div>
  );
}
