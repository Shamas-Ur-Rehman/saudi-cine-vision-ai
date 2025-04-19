
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  comingSoon?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  onClick,
  className,
  comingSoon = false
}) => {
  return (
    <div
      className={`cinema-card p-6 flex flex-col h-full transition-all duration-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div className="mb-4 flex justify-between items-start">
        <div className="h-10 w-10 rounded-lg bg-cinema-navy/10 text-cinema-highlight flex items-center justify-center">
          {icon}
        </div>
        {comingSoon && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-cinema-navy/10 text-cinema-teal border border-cinema-teal/20">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground flex-grow">{description}</p>
    </div>
  );
};

export default FeatureCard;
