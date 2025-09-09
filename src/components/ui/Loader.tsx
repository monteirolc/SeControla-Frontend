import { LoaderCircle } from "lucide-react";

type LoaderProps = {
  size?: number;
  animated?: boolean;
};
export default function Loader({ size = 48, animated = true }: LoaderProps) {
  return (
    <div className="flex justify-center items-center">
      <LoaderCircle className={`${animated ? "animate-spin" : ""}`} size={size} />
    </div>
  );
}