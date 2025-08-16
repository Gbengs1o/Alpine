"use client";

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { nanoid } from 'nanoid';
import { Bot, CornerDownLeft, User } from 'lucide-react';
import { continueConversation, ChatInput } from '@/ai/flows/chat-flow';
import { AskAiButton } from './ask-ai-button';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userInput: Message = { id: nanoid(), role: 'user', content: input };
    setMessages((prev) => [...prev, userInput]);
    setInput('');
    setIsLoading(true);

    try {
      const chatInput: ChatInput = {
        history: [...messages, userInput].map(m => ({ role: m.role, content: m.content })),
      };
      
      const response = await continueConversation(chatInput);
      
      const modelResponse: Message = { id: nanoid(), role: 'model', content: response };
      setMessages((prev) => [...prev, modelResponse]);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      const errorResponse: Message = { id: nanoid(), role: 'model', content: "Sorry, I'm having trouble connecting. Please try again later." };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AskAiButton onClick={() => setIsOpen(!isOpen)} />

      <div className={cn(
        "fixed bottom-24 right-4 w-[calc(100%-2rem)] max-w-md h-[70vh] max-h-[600px] z-50 rounded-2xl bg-white shadow-2xl flex flex-col transition-all duration-500 ease-in-out",
        "dark:bg-gray-900 dark:border dark:border-gray-700",
        isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      )}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b dark:border-gray-700 rounded-t-2xl bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">AI Assistant</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Alpine AI</p>
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <div key={msg.id} className={cn(
              "flex items-start gap-3 animate-fade-in-slide",
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )} style={{ animationDelay: `${index * 100}ms`}}>
              {msg.role === 'model' && <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />}
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-800 dark:text-gray-200'
              )}>
                {msg.content}
              </div>
              {msg.role === 'user' && <User className="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
               <Bot className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
               <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-gray-100 dark:bg-gray-800">
                  <Skeleton className="w-24 h-4" />
               </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3 rounded-full bg-gray-100 border-gray-200 focus:ring-primary focus:border-primary transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 hover:bg-primary/90 transition-all"
              aria-label="Send message"
            >
              <CornerDownLeft className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
