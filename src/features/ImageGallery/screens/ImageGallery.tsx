import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry from "react-masonry-css";
import { CrossIconSVG, SearchIconSVG, Spinner } from "../../../assets/svg";
import { QueryNotFound } from "../../../components";
import { ImageCard } from "../components";
import { API_URL_BASE, PAGE_SIZE } from "../constant";
import { ImageListResponse } from "../types";
import { GenericError } from "../../../components/Errors/GenericError";

const breakpointColumnsObj = {
  default: 3, // 3 columns by default
  1500: 2, // 2 columns for screens <= 1500px
};

export const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageListResponse[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageListResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // set state as 2 purely for visual reason (better images), in real world should be one
  const [page, setPage] = useState(2);
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchImages = async () => {
    try {
      const res = await fetch(
        `${API_URL_BASE}/list?page=${page}&limit=${PAGE_SIZE}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: ImageListResponse[] = await res.json();

      setImages((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
      setError(null); // Reset error state on successful fetch
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images. Please try again later."); // Set error state
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
  }, [debouncedSearchTerm, images]);

  return (
    <main className="px-4 xl:px-40">
      <div className="sticky top-0 bg-white z-10 py-4">
        <div className="relative">
          <SearchIconSVG
            id="search-icon"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors duration-200"
            aria-hidden="true"
          />
          <input
            placeholder="Search by author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            aria-label="Search by author"
            aria-labelledby="search-icon"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              onKeyDown={(e) => e.key === "Enter" && setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Clear search input"
            >
              <CrossIconSVG />
            </button>
          )}
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center my-4" aria-live="assertive">
          <GenericError errorMessage={error} />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={(searchTerm ? filteredImages : images).length}
          next={fetchImages}
          hasMore={true}
          loader={
            <div
              className={`flex justify-center my-30 ${searchTerm && "hidden"}`}
              aria-live="polite"
            >
              <Spinner
                className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600"
                aria-label="Loading more images"
              />
            </div>
          }
          endMessage={<p>No more data to load.</p>}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-[10px] md:-ml-[20px]"
            columnClassName="pl-[10px] md:pl-[20px] bg-clip-padding"
          >
            {(searchTerm ? filteredImages : images).map((image) => (
              <ImageCard image={image} key={image.id} />
            ))}
          </Masonry>
        </InfiniteScroll>
      )}

      {searchTerm && !filteredImages.length && <QueryNotFound />}
    </main>
  );
};
