import { FieldError } from 'react-hook-form';

interface ErrorMessageProps {
  message?: string | FieldError | undefined;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  const errorMessage = typeof message === 'string' ? message : message.message;

  return (
    <p className="mt-1 text-sm text-red-600" role="alert">
      {errorMessage}
    </p>
  );
};
