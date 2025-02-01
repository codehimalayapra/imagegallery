export const ImageGridLoader = ({ size }: { size: number }) => {
  return Array.from({ length: size }).map((_, index) => (
    <div
      key={`skeleton-scroll-${index}`}
      className="bg-gray-300 animate-pulse w-full h-64 rounded-lg"
    ></div>
  ));
};
