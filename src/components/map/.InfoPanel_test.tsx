import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseStation } from '../types/baseStation';
import { Radio, MapPin, Zap, Signal } from 'lucide-react';

interface InfoPanelProps {
  station: BaseStation | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ station }) => {
  if (!station) {
    return (
      <Card className="absolute top-4 right-4 z-10 p-4 bg-search-bg backdrop-blur-sm border-border/50 shadow-elevated w-80">
        <div className="text-center text-muted-foreground py-8">
          <Radio className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Наведите курсор на сектор для просмотра информации</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="absolute top-4 right-4 z-10 p-4 bg-info-panel border-border/50 shadow-elevated w-80">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Radio className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">{station.name}</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {station.type.toUpperCase()}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Адрес</p>
              <p className="text-sm text-muted-foreground">{station.address}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Zap className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">ID станции</p>
              <p className="text-sm text-muted-foreground">{station.id}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Signal className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-medium">Секторы ({station.sectors.length})</h4>
          </div>
          
          <div className="space-y-2">
            {station.sectors.map((sector) => (
              <div
                key={sector.id}
                className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/30"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getSectorColor(sector.technology) }}
                  />
                  <div>
                    <p className="text-sm font-medium">Сектор {sector.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {sector.azimuth}° | {sector.beamwidth}° | {sector.range}м
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary"
                  className="text-xs"
                  style={{ 
                    backgroundColor: getSectorColor(sector.technology) + '20',
                    color: getSectorColor(sector.technology)
                  }}
                >
                  {sector.technology}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Координаты:</span>
            <span>{station.lat.toFixed(6)}, {station.lng.toFixed(6)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

function getSectorColor(technology: string): string {
  switch (technology) {
    case '2G':
      return '#22C55E';
    case '3G':
      return '#3B82F6';
    case '4G':
      return '#F59E0B';
    case '5G':
      return '#8B5CF6';
    default:
      return '#6B7280';
  }
}

export default InfoPanel;