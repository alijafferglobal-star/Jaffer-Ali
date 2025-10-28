
import React from 'react';
import { WarningIcon } from './icons/WarningIcon';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative flex items-start gap-3" role="alert">
      <WarningIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div>
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
