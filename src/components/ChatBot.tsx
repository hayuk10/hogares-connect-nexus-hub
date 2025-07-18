import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Calendar, Calculator, Home } from "lucide-react";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy Sofia, tu asesora inmobiliaria personal 🏠 ¿En qué puedo ayudarte hoy?",
      isBot: true,
      quickReplies: ["Buscar vivienda", "Agendar visita", "Calcular hipoteca", "Hablar con experto"]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      quickReplies: undefined
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular respuesta del bot con mejor lógica
    setTimeout(() => {
      let botResponse;
      
      if (messageText.toLowerCase().includes("visita") || messageText === "Agendar visita") {
        botResponse = {
          id: messages.length + 2,
          text: "¡Perfecto! Te ayudo a agendar una visita. ¿Qué inmueble te interesa? Puedo programarla para mañana mismo 📅",
          isBot: true,
          quickReplies: ["Ver disponibilidad", "Llamar ahora", "WhatsApp"]
        };
      } else if (messageText.toLowerCase().includes("hipoteca") || messageText.toLowerCase().includes("financiación") || messageText === "Calcular hipoteca") {
        botResponse = {
          id: messages.length + 2,
          text: "Te conectaré con nuestro simulador de FinanHogar. Con tasas desde 2.9% TIN y aprobación en 24h 💰",
          isBot: true,
          quickReplies: ["Abrir simulador", "Hablar con especialista", "Ver condiciones"]
        };
      } else if (messageText === "Buscar vivienda") {
        botResponse = {
          id: messages.length + 2,
          text: "¿Qué tipo de vivienda buscas? Te ayudo a encontrar opciones personalizadas en tu zona preferida 🔍",
          isBot: true,
          quickReplies: ["Piso", "Casa", "Ático", "Dúplex"]
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          text: "Entiendo. Como experta en el mercado inmobiliario del sur de Madrid, puedo ayudarte con visitas, financiación o búsqueda personalizada. ¿Qué prefieres?",
          isBot: true,
          quickReplies: ["Agendar visita", "Calcular hipoteca", "Buscar vivienda"]
        };
      }
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  return (
    <>
      {/* Enhanced Floating Chat Button */}
      <div className={`fixed bottom-24 right-4 transition-all duration-300 ${isOpen ? "scale-0" : "scale-100"}`}>
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full btn-primary-gradient shadow-glow hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
            size="lg"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">1</span>
            </div>
          </div>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-foreground text-background px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            ¿Necesitas ayuda? Pregúntame
          </div>
        </div>
      </div>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] h-[500px] z-50 animate-scale-in">
          <Card className="h-full flex flex-col shadow-glow border border-border/50 bg-card/95 backdrop-blur-lg">
            {/* Enhanced Header */}
            <CardHeader className="pb-3 bg-gradient-primary text-white rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 opacity-50"></div>
              <div className="flex items-center justify-between relative">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sofia - Asesora</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs opacity-80">Online ahora</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                      <div className={`flex items-start gap-2 max-w-[85%]`}>
                        {message.isBot && (
                          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-2xl text-sm leading-relaxed ${
                            message.isBot
                              ? "bg-muted text-foreground rounded-bl-md"
                              : "bg-primary text-white rounded-br-md"
                          }`}
                        >
                          {message.text}
                        </div>
                        {!message.isBot && (
                          <div className="w-7 h-7 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick Replies */}
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 ml-9">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs border-primary/30 hover:bg-primary/10 transition-colors"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced Input */}
              <div className="p-4 border-t border-border/30 bg-muted/20">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 border-border/50 bg-background/80"
                  />
                  <Button 
                    onClick={() => handleSendMessage()} 
                    size="sm"
                    disabled={!inputValue.trim()}
                    className="btn-primary-gradient shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickReply("Agendar visita")}
                    className="text-xs"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    Visita
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickReply("Calcular hipoteca")}
                    className="text-xs"
                  >
                    <Calculator className="h-3 w-3 mr-1" />
                    Hipoteca
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickReply("Buscar vivienda")}
                    className="text-xs"
                  >
                    <Home className="h-3 w-3 mr-1" />
                    Buscar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};