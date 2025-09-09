type Option = {
  id: string | number;
  label: string;
};

type ComboBoxProps = {
  defaultLabel: string;
  options: Option[];
  value: string | number;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function ComboBox({ defaultLabel, options, value, onChange, disabled }: ComboBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{defaultLabel}</label>
      <select
        className="px-3 py-2 border rounded-lg dark:bg-gray-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
