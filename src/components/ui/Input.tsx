type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, type = "text", value, onChange }: InputProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium text-gray-900 dark:text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="px-3 py-2 border bg-gray-500 dark:bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
