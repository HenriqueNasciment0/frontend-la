"use client";

import { GetCategories } from "@/api/endpoints/category";
// import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { useCategoryStore } from "@/app/stores/category-store";

export default function NewCategory() {
  // const t = useTranslations("NewCategory");
  const { upCategory, setUpCategory } = useCategoryStore();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await GetCategories();
      setCategories(categories);
    };

    fetchCategories();

    if (upCategory) {
      setUpCategory(false);
    }
  }, [upCategory, setUpCategory]);

  return (
    <div className="flex flex-1 items-center justify-center">
      <DataTable data={categories} />
    </div>
  );
}
