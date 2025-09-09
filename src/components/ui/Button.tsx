import {ReactNode} from "react";

type ButtonProps = {
  label: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({ label, type = "button", onClick, disabled, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition ${className}
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
    >
      {label}
    </button>
  );
}
