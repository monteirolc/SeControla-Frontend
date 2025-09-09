import { Trash2 } from "lucide-react";

type TrashProps = {
  size?: number;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Trash({ size = 24, onClick, disabled = false }: TrashProps) {
  return (
    <button onClick={onClick} disabled={disabled} 
      className="p-2 rounded bg-transparent text-red-500 hover:text-red-800 disabled:opacity-50 border-none">
      <Trash2 size={size} />
    </button>
  );
}