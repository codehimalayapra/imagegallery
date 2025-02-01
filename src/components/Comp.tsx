import React from "react";
import { nanoid } from "nanoid";
import Masonry from "react-masonry-css";
import { ImageListResponse } from "../features/ImageGallery/types";

const Images = ({ images }: { images: ImageListResponse[] }) => {
  const breakpointColumnsObj = {
    default: 3, // 3 columns by default
    1500: 2, // 2 columns for screens <= 1500px
  };

  return (
    <div className="mt-8">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-[30px]"
        columnClassName="pl-[30px] bg-clip-padding"
      >
        {images.map((image) => (
          <div
            onClick={() => window.open(image.download_url, "_blank")}
            key={nanoid()}
            className="mb-[30px]"
          >
            <img
              src={image.download_url}
              alt=""
              className="w-full h-full object-cover transform group-hover:opacity-65 transition-all duration-250"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Images;
