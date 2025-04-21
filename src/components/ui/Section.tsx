import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, children, className = '' }: SectionProps) => {
  return (
    <section className={`mb-8 ${className}`}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6 pb-2 border-b border-gray-200">
          {title}
        </h2>
        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
};