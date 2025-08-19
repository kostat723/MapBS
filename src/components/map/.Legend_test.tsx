import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Legend: React.FC = () => {
  const technologies = [
    { name: '2G', color: '#22C55E', description: 'GSM/EDGE' },
    { name: '3G', color: '#3B82F6', description: 'UMTS/HSPA' },
    { name: '4G', color: '#F59E0B', description: 'LTE/LTE-A' },
    { name: '5G', color: '#8B5CF6', description: '5G NR' },
  ];

  const stationTypes = [
    { name: 'Macro', color: '#8B5CF6', description: 'Макросота' },
    { name: 'Micro', color: '#3B82F6', description: 'Микросота' },
    { name: 'Pico', color: '#10B981', description: 'Пикосота' },
  ];

  return (
    <Card className="absolute bottom-4 left-4 z-10 p-4 bg-search-bg backdrop-blur-sm border-border/50 shadow-elevated">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2">Технологии</h4>
          <div className="grid grid-cols-2 gap-2">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
                <div>
                  <span className="text-sm font-medium">{tech.name}</span>
                  <p className="text-xs text-muted-foreground">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/30 pt-3">
          <h4 className="text-sm font-semibold mb-2">Типы станций</h4>
          <div className="space-y-1">
            {stationTypes.map((type) => (
              <div key={type.name} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: type.color }}
                />
                <span className="text-sm">{type.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Legend;