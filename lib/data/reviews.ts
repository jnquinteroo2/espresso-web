import { cache } from "react";
import { googleReviews } from "@/content/reviews";
import type { GoogleReview } from "@/content/types";

export const getGoogleReviews = cache((): GoogleReview[] => googleReviews);

export const getGoogleReviewsStats = cache(() => {
  const total = googleReviews.length;
  const promedio =
    googleReviews.reduce((sum, r) => sum + r.calificacion, 0) / total;
  return { total, promedio };
});
