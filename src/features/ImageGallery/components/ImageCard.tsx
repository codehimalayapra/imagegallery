import { useState } from "react";
import { ImageListResponse } from "../types";

export const ImageCard = ({ image }: { image: ImageListResponse }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <a
      href={image.download_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-lg bg-black overflow-hidden shadow-lg transition-all duration-300 ${
        image.rowSpan
      } rounded-xl relative group cursor-zoom-in ${!isLoaded && "invisible"}`}
    >
      <img
        src={image.renderURL}
        alt={image.author}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover transform group-hover:opacity-65 transition-all duration-250"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
        <p className="text-lg font-semibold drop-shadow-md">{image.author}</p>
      </div>
    </a>
  );
};
