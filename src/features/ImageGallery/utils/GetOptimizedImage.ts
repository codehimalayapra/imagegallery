import { ImageListResponse } from "../types";

export function getOptimizedImageUrl(
  image: ImageListResponse,
  format: string = "webp"
): string {
  const { id } = image; // Extract the image ID
  // added customer size for better load time sacrificing image quality (could be better from api)
  return `https://picsum.photos/id/${id}/1000/1000.${format}`;
}
