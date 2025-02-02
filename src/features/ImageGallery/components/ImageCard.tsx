import { useState } from "react";
import { ImageListResponse } from "../types";

export const ImageCard = ({ image }: { image: ImageListResponse }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      onClick={() => window.open(image.download_url, "_blank")}
      rel="noopener noreferrer"
      className={`${
        !isLoaded && "invisible"
      } rounded-lg bg-black overflow-hidden shadow-lg transition-all duration-300 rounded-xl relative group cursor-zoom-in mb-[20px]`}
    >
      <img
        src={image.download_url}
        alt={image.author}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        className="w-full h-full object-cover transform group-hover:opacity-65 transition-all duration-250"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
        <p className="text-lg font-semibold drop-shadow-md">{image.author}</p>
      </div>
    </div>
  );
};
