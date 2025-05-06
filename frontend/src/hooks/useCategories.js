import { useState, useEffect } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function useCategories(pageSize = 100) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiUrl) {
      const msg = "❌ NEXT_PUBLIC_API_URL não está definida";
      console.error(msg);
      setError(msg);
      return;
    }

    const url = `${apiUrl}/api/categorias?pagination[pageSize]=${pageSize}&sort=id:asc`;
    console.log("🔍 Fetching categorias from:", url);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((j) => {
        const cats = j.data.map((c) => c.nome);
        setCategories(cats);
        if (cats.length > 0) setSelectedCategory(cats[0]);
        setError(null);
      })
      .catch((e) => {
        console.error("❌ Erro ao buscar categorias:", e);
        setError(e.message || "Erro desconhecido");
      });
  }, [pageSize]);

  return { categories, selectedCategory, setSelectedCategory, error };
}
