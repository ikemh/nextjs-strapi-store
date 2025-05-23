// hooks/useProducts.js - COM RATE LIMITING PARA TROCA DE CATEGORIA
import { useRef, useCallback, useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/fetcher";

const PAGE_SIZE = 4;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ✅ RATE LIMITER PARA TROCA DE CATEGORIA
class CategoryChangeRateLimiter {
  constructor() {
    this.lastChangeTime = 0;
    this.pendingChanges = new Map();
    this.minInterval = 1000; // Mínimo 1 segundo entre trocas
    this.maxPendingChanges = 4; // Máximo 3 mudanças na fila
  }

  requestCategoryChange(category, callback) {
    const now = Date.now();
    const timeSinceLastChange = now - this.lastChangeTime;

    // Se pode mudar imediatamente
    if (
      timeSinceLastChange >= this.minInterval &&
      this.pendingChanges.size === 0
    ) {
      this.lastChangeTime = now;
      callback(category);
      return;
    }

    // Se já tem muitas mudanças pendentes, ignora
    if (this.pendingChanges.size >= this.maxPendingChanges) {
      return;
    }

    // Cancela mudança anterior para a mesma categoria
    if (this.pendingChanges.has(category)) {
      clearTimeout(this.pendingChanges.get(category));
    }

    // Agenda mudança
    const timeoutId = setTimeout(() => {
      this.pendingChanges.delete(category);
      this.lastChangeTime = Date.now();
      callback(category);
    }, this.minInterval);

    this.pendingChanges.set(category, timeoutId);
  }

  cancelPendingChanges() {
    this.pendingChanges.forEach((timeoutId) => clearTimeout(timeoutId));
    this.pendingChanges.clear();
  }

  getStatus() {
    return {
      pendingChanges: this.pendingChanges.size,
      lastChangeTime: this.lastChangeTime,
      canChangeNow: Date.now() - this.lastChangeTime >= this.minInterval,
    };
  }
}

// ✅ INSTÂNCIA GLOBAL
const categoryRateLimiter = new CategoryChangeRateLimiter();

export default function useProducts(selectedCategory) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [isChangingCategory, setIsChangingCategory] = useState(false);
  const previousCategoryRef = useRef(selectedCategory);

  // ✅ DETECÇÃO DE MUDANÇA DE CATEGORIA COM RATE LIMITING
  useEffect(() => {
    // Se categoria não mudou, ignora
    if (selectedCategory === previousCategoryRef.current) {
      return;
    }

    setIsChangingCategory(true);

    // Solicita mudança via rate limiter
    categoryRateLimiter.requestCategoryChange(
      selectedCategory,
      (approvedCategory) => {
        setActiveCategory(approvedCategory);
        previousCategoryRef.current = approvedCategory;
        setIsChangingCategory(false);
      }
    );

    // Cleanup ao desmontar
    return () => {
      if (isChangingCategory) {
        categoryRateLimiter.cancelPendingChanges();
      }
    };
  }, [selectedCategory]);

  // ✅ SWR INFINITE usando categoria ATIVA (protegida)
  const getKey = (pageIndex, previousPage) => {
    if (!activeCategory) return null;
    if (previousPage && previousPage.data.length < PAGE_SIZE) return null;
    return (
      `${apiUrl}/api/produtos?populate=*&` +
      `filters[categoria][nome][$eq]=${encodeURIComponent(activeCategory)}` +
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
          imageUrl: p.image?.url || p.image?.formats?.medium?.url || "",
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

  // ✅ RESET CONTROLADO quando categoria ativa muda
  useEffect(() => {
    if (activeCategory) {
      console.log(`🔄 Resetando dados para categoria: ${activeCategory}`);
      setSize(1);
    }
  }, [activeCategory, setSize]);

  // ✅ DEBUG: Status do rate limiter
  useEffect(() => {
    const interval = setInterval(() => {
      const status = categoryRateLimiter.getStatus();
      if (status.pendingChanges > 0) {
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    products,
    lastRef,
    isValidating: isValidating || isChangingCategory,
    isReachingEnd,
    error,
    // ✅ INFO ADICIONAL PARA DEBUG
    categoryInfo: {
      requested: selectedCategory,
      active: activeCategory,
      isChanging: isChangingCategory,
      rateLimiterStatus: categoryRateLimiter.getStatus(),
    },
  };
}
