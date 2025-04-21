import { PlusIcon } from '@heroicons/react/24/outline';

interface AddButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export const AddButton = ({ onClick, label, className = '' }: AddButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium py-2 px-3 rounded-md hover:bg-indigo-50 transition-colors duration-200 ${className}`}
    >
      <PlusIcon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
};