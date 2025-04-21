import { TrashIcon } from '@heroicons/react/24/outline';

interface RemoveButtonProps {
  onClick: () => void;
  className?: string;
}

export const RemoveButton = ({ onClick, className = '' }: RemoveButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200 ${className}`}
      aria-label="削除"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};