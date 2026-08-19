import { cache } from "react";
import { methodsShopItems } from "@/content/methods-shop";
import type { CategoriaMethodsShop, MethodsShopItem } from "@/content/types";

export const getMethodsShopItems = cache((): MethodsShopItem[] => methodsShopItems);

export const getMethodsShopItemsByCategoria = cache((categoria: CategoriaMethodsShop): MethodsShopItem[] =>
  methodsShopItems.filter((item) => item.categoria === categoria),
);

export const getMethodsShopItemBySlug = cache((slug: string): MethodsShopItem | undefined =>
  methodsShopItems.find((item) => item.slug === slug),
);

export const getMethodsShopCategoriaCount = cache((categoria: CategoriaMethodsShop): number =>
  methodsShopItems.filter((item) => item.categoria === categoria).length,
);
