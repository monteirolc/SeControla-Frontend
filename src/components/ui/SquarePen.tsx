import { SquarePen as SP } from "lucide-react";

type SquarePenProps = {
  size?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export default function SquarePen({ size = 24, onClick, disabled = false }: SquarePenProps){
  return(
    <button onClick={onClick} disabled={disabled}
      className="p-2 rounded bg-transparent text-blue-500 hover:text-blue-800 disabled:opacity-50 border-none">
      <SP size={size}/>
    </button>
  )
}