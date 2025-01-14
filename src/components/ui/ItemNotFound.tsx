import { Frown } from "lucide-react";

interface ItemNotFoundProps {
  message?: string;
  section?: boolean;
  className?: string;
}

const ItemNotFound: React.FC<ItemNotFoundProps> = ({
  message,
  section,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        section
          ? "h-[calc(100vh-70vh)] container mx-auto"
          : "h-[calc(100vh-14rem)] container mx-auto"
      }`}
    >
      <Frown size={70} />
      <p
        className={`mt-4 text-xl font-semibold ${
          className ? className : "text-gray-600"
        } `}
      >
        {message ? message : "Something Went Wrong!!!"}
      </p>
    </div>
  );
};
export default ItemNotFound;
