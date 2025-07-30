import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Heart, Search } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onAction: () => void;
  actionLabel: string;
  icon?: 'building' | 'heart' | 'search';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  onAction,
  actionLabel,
  icon = 'building'
}) => {
  const IconComponent = {
    building: Building,
    heart: Heart,
    search: Search
  }[icon];

  return (
    <div className="text-center py-12">
      <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button onClick={onAction} variant="outline">
        {actionLabel}
      </Button>
    </div>
  );
};