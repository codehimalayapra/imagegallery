import { ErrorAntenaSVG } from "../../assets/svg";

export const GenericError = ({ errorMessage }: { errorMessage?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-6">
      <ErrorAntenaSVG className="w-62 h-62 md:w-90 md:h-90 text-gray-400" />
      <p className="text-gray-600 mt-4 text-lg md:text-xl font-medium text-center px-4">
        {errorMessage ?? "Something went wrong! Please try again later."}
      </p>
    </div>
  );
};
