import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  X, 
  Calendar, 
  Home, 
  TrendingDown, 
  Gift, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Notification } from '@/types';
import { faker } from '@faker-js/faker';

interface NotificationSystemProps {
  className?: string;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Generate mock notifications
  useEffect(() => {
    const generateNotifications = (): Notification[] => {
      const mockNotifications: Notification[] = [];
      const types: Notification['type'][] = [
        'visit_confirmed', 
        'new_property', 
        'price_drop', 
        'referral_reward', 
        'financing_approved'
      ];

      for (let i = 0; i < 12; i++) {
        const type = faker.helpers.arrayElement(types);
        let title = '';
        let message = '';
        
        switch (type) {
          case 'visit_confirmed':
            title = 'Visita confirmada';
            message = `Tu visita para el ${faker.date.future().toLocaleDateString('es-ES')} ha sido confirmada`;
            break;
          case 'new_property':
            title = 'Nueva propiedad disponible';
            message = `Nueva propiedad en ${faker.helpers.arrayElement(['Getafe', 'Leganés', 'Móstoles'])} que coincide con tus criterios`;
            break;
          case 'price_drop':
            title = 'Bajada de precio';
            message = `Una propiedad de tus favoritos ha bajado ${faker.number.int({ min: 5000, max: 20000 })}€`;
            break;
          case 'referral_reward':
            title = 'Recompensa por referido';
            message = `Has ganado ${faker.number.int({ min: 200, max: 500 })}€ por tu referido exitoso`;
            break;
          case 'financing_approved':
            title = 'Financiación aprobada';
            message = 'Tu solicitud de financiación ha sido pre-aprobada';
            break;
        }

        mockNotifications.push({
          id: faker.string.uuid(),
          userId: 'current_user',
          type,
          title,
          message,
          isRead: faker.datatype.boolean(0.3), // 30% ya leídas
          createdAt: faker.date.recent({ days: 7 }),
          actionUrl: faker.helpers.maybe(() => '/properties/123', { probability: 0.6 }),
          imageUrl: type === 'new_property' ? `https://picsum.photos/60/60?random=${i}` : undefined
        });
      }

      return mockNotifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    };

    const mockNotifications = generateNotifications();
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    setUnreadCount(0);
  };

  const removeNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId);
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notification && !notification.isRead) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'visit_confirmed':
        return <Calendar className="h-4 w-4 text-green-500" />;
      case 'new_property':
        return <Home className="h-4 w-4 text-blue-500" />;
      case 'price_drop':
        return <TrendingDown className="h-4 w-4 text-orange-500" />;
      case 'referral_reward':
        return <Gift className="h-4 w-4 text-purple-500" />;
      case 'financing_approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Ahora mismo';
    } else if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours}h`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days}d`;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className={`relative ${className}`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 border-2 border-background">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Notificaciones</CardTitle>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Marcar como leídas
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                Tienes {unreadCount} notificación{unreadCount !== 1 ? 'es' : ''} sin leer
              </p>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No tienes notificaciones</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-muted/50 cursor-pointer border-l-2 ${
                        notification.isRead 
                          ? 'border-transparent opacity-70' 
                          : 'border-primary bg-primary/5'
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.imageUrl ? (
                            <img 
                              src={notification.imageUrl} 
                              alt="" 
                              className="w-6 h-6 rounded object-cover"
                            />
                          ) : (
                            getNotificationIcon(notification.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="text-sm font-medium text-foreground truncate">
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-1 ml-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {formatTime(notification.createdAt)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-1 hover:bg-destructive/10 hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.actionUrl && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 mt-1 text-xs text-primary"
                            >
                              Ver detalles →
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};