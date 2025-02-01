import { ImageListResponse } from "../types";
import { getOptimizedImageUrl } from "./GetOptimizedImage";

export const assignRowSpan = (images: ImageListResponse[]) => {
  const arr = images.splice(-6).map((item) => ({
    ...item,
    renderURL: getOptimizedImageUrl(item, "webp"),
    rowSpan: "row-span-1",
  }));

  return [
    ...images.map((img, index) => ({
      ...img,
      renderURL: getOptimizedImageUrl(img, "webp"),
      rowSpan:
        index === 2
          ? "row-span-1"
          : Math.random() > 0.4
          ? "row-span-2"
          : "row-span-1",
    })),
    ...arr,
  ];
};
