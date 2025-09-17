type DateProps = {
  type?: "date" | "datetime-local";
  text: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function DateUi({ type="date", text, value,  onChange, disabled = false }: DateProps) {
  return (
    <div className="flex items-center gap-2">
        <label className="block text-sm mb-1">{text}</label>
        <input
          type={type}
          className="px-3 py-2 border rounded-lg dark:bg-gray-800"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
          />
    </div>
  );

}

export function DateUpText({ type, text, value,  onChange, disabled = false }: DateProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <label className="block text-sm mb-1">{text}</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type={type}
          className="px-3 py-2 border rounded-lg dark:bg-gray-800"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={disabled}
        />
      </div>
    </>
  );
}
