import { useState } from "react";
import { ImageListResponse } from "../types";

export const ImageCard = ({ image }: { image: ImageListResponse }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {/* couldn't use anchor tag as it wasn't compatible with Mansonry package */}
      <div
        onClick={() => window.open(image.download_url, "_blank")}
        // For 'Tab' key usuage
        tabIndex={0}
        role="link"
        aria-label={`View image by ${image.author}`}
        rel="noopener noreferrer"
        className={`${
          !isLoaded ? "inset-0 bg-gray-200 dark:bg-gray-600 animate-pulse" : ""
        } rounded-lg bg-black overflow-hidden shadow-lg transition-all duration-300 rounded-xl relative group cursor-zoom-in mb-[10px] md:mb-[20px] focus:outline-none focus:ring-4 focus:ring-blue-500`}
        // for enter key press with 'Tab' selected item
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            window.open(image.download_url, "_blank");
          }
        }}
      >
        <img
          src={image.download_url}
          alt={image.author}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          width={100}
          height={100}
          className="w-full h-full object-cover transform group-hover:opacity-65 transition-all duration-250"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
          <p className="text-xs md:text-lg font-semibold drop-shadow-md">
            {image.author}
          </p>
        </div>
      </div>
    </>
  );
};
