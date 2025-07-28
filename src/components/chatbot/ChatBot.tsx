import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Minimize2, Phone, Mail, Calculator } from "lucide-react";
import { ChatMessage } from "@/types";

interface ChatBotProps {
  onClose?: () => void;
  currentUser?: any;
  onOpenCalculator?: () => void;
  onOpenInvestors?: () => void;
  onContactFinanhogar?: () => void;
  onNavigateToInvestors?: () => void;
  onNavigateToVIP?: () => void;
  onScheduleVisit?: () => void;
}

export const ChatBot = ({ 
  onClose,
  currentUser,
  onOpenCalculator,
  onOpenInvestors,
  onContactFinanhogar,
  onNavigateToInvestors,
  onNavigateToVIP,
  onScheduleVisit
}: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "Quiero financiación",
    "Agendar visita",
    "Información de precios",
    "Contactar asesor"
  ];

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage: ChatMessage = {
      id: "welcome",
      text: "¡Hola! Soy tu asistente virtual de Hogares Connect. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
      quickReplies: quickReplies
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000 + Math.random() * 1000);
  };

  const addMessage = (text: string, isBot: boolean = false, quickReplies?: string[]) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      isBot,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getBotResponse = (userMessage: string): { text: string; quickReplies?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("financiación") || message.includes("hipoteca") || message.includes("préstamo")) {
      return {
        text: "Te puedo ayudar con información sobre financiación. Tenemos simuladores y asesoramiento personalizado con FinanHogar. ¿Qué necesitas?",
        quickReplies: ["Simular hipoteca", "Hablar con experto", "Tipos de interés"]
      };
    }
    
    if (message.includes("visita") || message.includes("agendar") || message.includes("ver")) {
      return {
        text: "Puedes agendar visitas directamente desde las fichas de propiedades. ¿Hay alguna propiedad específica que te interese?",
        quickReplies: ["Ver propiedades", "Buscar zona", "Contactar agente"]
      };
    }
    
    if (message.includes("precio") || message.includes("coste") || message.includes("€")) {
      return {
        text: "Los precios varían según la zona y características. Tenemos propiedades desde 285.000€. ¿Qué rango de precio buscas?",
        quickReplies: ["Hasta 300k€", "300k-400k€", "Más de 400k€"]
      };
    }
    
    if (message.includes("simular") || message.includes("calculadora")) {
      onOpenCalculator?.();
      return {
        text: "¡Perfecto! He abierto nuestro simulador financiero para que puedas calcular tu cuota mensual personalizada.",
        quickReplies: ["Necesito asesoramiento", "Ver más propiedades"]
      };
    }
    
    if (message.includes("asesor") || message.includes("experto") || message.includes("contactar")) {
      onContactFinanhogar?.();
      return {
        text: "Te he puesto en contacto con nuestro equipo de FinanHogar. Un especialista te contactará en breve.",
        quickReplies: ["Mientras tanto...", "Ver propiedades", "Más información"]
      };
    }
    
    if (message.includes("zona") || message.includes("ubicación") || message.includes("área")) {
      return {
        text: "Trabajamos principalmente en la zona sur de Madrid: Getafe, Fuenlabrada, Leganés, Móstoles. ¿Qué zona te interesa más?",
        quickReplies: ["Getafe", "Fuenlabrada", "Leganés", "Otras zonas"]
      };
    }
    
    // Default responses
    const defaultResponses = [
      {
        text: "Entiendo. ¿Puedo ayudarte con algo más específico? Estoy aquí para asistirte con propiedades y financiación.",
        quickReplies: quickReplies
      },
      {
        text: "¿Te gustaría que te ayude a buscar propiedades o necesitas información sobre financiación?",
        quickReplies: ["Buscar propiedades", "Información financiación", "Hablar con humano"]
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    addMessage(text);
    setInputValue("");

    // Simulate bot typing and response
    simulateTyping();
    setTimeout(() => {
      const response = getBotResponse(text);
      addMessage(response.text, true, response.quickReplies);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full btn-primary-gradient shadow-glow hover:shadow-xl transition-all z-50"
        aria-label="Abrir chat de asistencia"
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-ping"></div>
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 transition-all duration-300 bg-card/95 backdrop-blur-lg border border-border/50 shadow-glow ${
        isMinimized ? 'h-14' : 'h-96'
      }`}>
        <CardHeader className="p-3 bg-gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-medium">Asistente Hogares</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs opacity-90">En línea</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                aria-label={isMinimized ? "Expandir chat" : "Minimizar chat"}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  onClose?.();
                }}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                aria-label="Cerrar chat"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-lg p-2 ${
                    message.isBot 
                      ? 'bg-muted text-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    
                    {/* Quick replies for bot messages */}
                    {message.isBot && message.quickReplies && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs h-6 px-2 bg-background/80 border-border/50 hover:bg-primary hover:text-primary-foreground"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/30">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                  className="btn-primary-gradient"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Quick action buttons */}
              <div className="flex gap-1 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickReply("Simular hipoteca")}
                  className="text-xs h-6 px-2"
                >
                  <Calculator className="h-3 w-3 mr-1" />
                  Simular
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickReply("Contactar asesor")}
                  className="text-xs h-6 px-2"
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Llamar
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};