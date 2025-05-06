import { useRef, useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";

const PAGE_SIZE = 12;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useProducts(selectedCategory) {
  const getKey = (pageIndex, previousPage) => {
    if (!selectedCategory) return null;
    if (previousPage && previousPage.data.length < PAGE_SIZE) return null;
    return (
      `${apiUrl}/api/produtos?populate=*&` +
      `filters[categoria][nome][$eq]=${encodeURIComponent(selectedCategory)}` +
      `&sort=id:asc&pagination[page]=${pageIndex + 1}` +
      `&pagination[pageSize]=${PAGE_SIZE}`
    );
  };

  const { data, size, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    fetcher
  );

  const products = data
    ? data.flatMap((page) =>
        page.data.map((p) => ({
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
        }))
      )
    : [];

  const isReachingEnd = data && data[data.length - 1].data.length < PAGE_SIZE;

  const observer = useRef();
  const lastRef = useCallback(
    (node) => {
      if (isValidating || isReachingEnd) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSize(size + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isValidating, isReachingEnd, size, setSize]
  );

  useEffect(() => {
    if (selectedCategory) setSize(1);
  }, [selectedCategory]);

  return {
    products,
    lastRef,
    isValidating,
    isReachingEnd,
    error,
  };
}
