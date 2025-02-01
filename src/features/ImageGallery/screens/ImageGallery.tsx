import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { CrossIconSVG, SearchIconSVG, Spinner } from "../../../assets/svg";
import { QueryNotFound } from "../../../components";
import { ImageCard } from "../components";
import { API_URL_BASE, PAGE_SIZE } from "../constant";
import { ImageListResponse } from "../types";

const breakpointColumnsObj = {
  default: 3, // 3 columns by default
  1500: 2, // 2 columns for screens <= 1500px
};

export const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageListResponse[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageListResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  //Debounce search
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchImages = async () => {
    try {
      const res = await fetch(
        `${API_URL_BASE}/list?page=${page}&limit=${PAGE_SIZE}`
      );
      const data: ImageListResponse[] = await res.json();
      // const updatedData = assignRowSpan(data);

      setImages((prev) => prev.concat(data));
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  // Implemented debounce for lower load on server if the call was made to server
  useEffect(() => {
    setFilteredImages(
      images.filter((image) =>
        image.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [debouncedSearchTerm]);

  return (
    <main className="px-4 xl:px-40">
      <div className="sticky top-0 bg-white z-10 py-4">
        <div className="relative">
          <SearchIconSVG className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200" />
          <input
            placeholder="Search by author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <CrossIconSVG />
            </button>
          )}
        </div>
      </div>

      <InfiniteScroll
        dataLength={(searchTerm ? filteredImages : images).length}
        next={fetchImages}
        hasMore={true}
        loader={
          <div
            className={`flex justify-center my-30 ${searchTerm && "hidden"}`}
          >
            <Spinner className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600" />
          </div>
        }
        endMessage={<p>No more data to load.</p>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-[20px]"
          columnClassName="pl-[20px] bg-clip-padding"
        >
          {(searchTerm ? filteredImages : images).map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </Masonry>
      </InfiniteScroll>

      {searchTerm && !filteredImages.length && <QueryNotFound />}
    </main>
  );
};
