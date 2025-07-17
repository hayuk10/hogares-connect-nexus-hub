import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, User, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy el asistente de Hogares Connect. ¿En qué puedo ayudarte hoy? 😊",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const quickReplies = [
    "Ver pisos disponibles",
    "Agendar una visita",
    "Información sobre financiación",
    "Hablar con un asesor"
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes("piso") || lowerText.includes("casa")) {
      return "Perfecto, tengo varias opciones que podrían interesarte. ¿Qué zona prefieres y cuál es tu presupuesto aproximado?";
    }
    if (lowerText.includes("visita") || lowerText.includes("agendar")) {
      return "¡Genial! Te ayudo a agendar una visita. ¿Ya tienes algún inmueble en mente o quieres que te sugiera algunos?";
    }
    if (lowerText.includes("financ") || lowerText.includes("hipoteca")) {
      return "Te conecto con FinanHogar para ayudarte con la financiación. Pueden ofrecerte las mejores condiciones del mercado. ¿Quieres que calculemos tu capacidad de compra?";
    }
    
    return "Entiendo. ¿Podrías darme más detalles para ayudarte mejor? También puedes hablar directamente con uno de nuestros asesores.";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 btn-primary-gradient shadow-elegant z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 z-50">
      <Card className="h-full flex flex-col shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 btn-primary-gradient text-white">
          <CardTitle className="text-sm font-medium">
            Asistente Hogares
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-2 text-sm ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'btn-primary-gradient text-white'
                  }`}
                >
                  {message.text}
                </div>
                
                {!message.isBot && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-2 border-t">
              <div className="grid grid-cols-2 gap-1">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => handleSendMessage(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage(inputMessage)}
                size="sm"
                className="btn-primary-gradient"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};