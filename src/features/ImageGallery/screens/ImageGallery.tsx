import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CrossIconSVG, SearchIconSVG, Spinner } from "../../../assets/svg";
import { QueryNotFound } from "../../../components";
import { ImageGridLoader } from "../../../components/Common/ImageGridLoader";
import { ImageCard } from "../components";
import { API_URL_BASE, PAGE_SIZE } from "../constant";
import { ImageListResponse } from "../types";
import { assignRowSpan } from "../utils";

export const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<ImageListResponse[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageListResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  //Debounce search
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchImages = async () => {
      if (page === 1) {
        setLoading(true);
      }

      try {
        const res = await fetch(
          `${API_URL_BASE}/list?page=${page}&limit=${PAGE_SIZE}`
        );
        const data: ImageListResponse[] = await res.json();
        const updatedData = assignRowSpan(data);

        setImages((prev) => [...prev, ...updatedData]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }

      setLoading(false);
    };

    fetchImages();
  }, [page]);

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

      {loading && <ImageGridLoader size={6} />}

      <InfiniteScroll
        dataLength={(searchTerm ? filteredImages : images).length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={true}
        loader={
          <div className="flex justify-center my-30">
            <Spinner className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-200 fill-blue-600" />
          </div>
        }
        endMessage={<p>No more data to load.</p>}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 p-4 auto-rows-auto">
          {(searchTerm ? filteredImages : images).map((image) => (
            <ImageCard image={image} key={image.id} />
          ))}
        </div>
      </InfiniteScroll>

      {searchTerm && !filteredImages.length && <QueryNotFound />}
    </main>
  );
};
