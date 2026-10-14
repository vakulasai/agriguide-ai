'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Calendar,
  Sparkles,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { AIMessage } from '@/types';

interface AIAssistantViewProps {
  onAddCalendarTask?: (taskTitle: string, category: string) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({ onAddCalendarTask }) => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'When should I apply fertilizer for tomatoes?',
      timestamp: '10:24 AM',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: `For tomatoes, you should apply the first fertilizer 2–3 weeks after transplanting.

Use organic compost or well-rotted manure. For better yield, you can also add a balanced organic fertilizer (e.g., NPK 4-4-4) every 15 days during the vegetative stage.

Would you like me to add this to your crop calendar?`,
      timestamp: '10:25 AM',
      suggestedActions: [
        { label: '📅 Add to Calendar', actionType: 'add_calendar', payload: { title: 'Apply organic NPK fertilizer to tomatoes', category: 'Fertilizer' } },
        { label: 'More Details', actionType: 'more_details' },
        { label: 'Ask Another', actionType: 'ask_another' },
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();
      if (data.success) {
        const assistantMsg: AIMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: data.message,
          timestamp: data.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedActions: data.suggestedActions,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      const fallbackMsg: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: 'Soil and moisture conditions are critical. Ensure compost is thoroughly decomposed to prevent root scorch, and keep nitrogen balanced with phosphorus during flowering.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: [
          { label: 'More Details', actionType: 'more_details' },
          { label: 'Ask Another', actionType: 'ask_another' }
        ]
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: string; payload?: any }) => {
    if (action.actionType === 'add_calendar') {
      if (onAddCalendarTask) {
        onAddCalendarTask(action.payload?.title || 'Apply organic fertilizer', 'Fertilizer');
      }
      setActionNotice('✓ Task successfully added to your Crop Calendar!');
      setTimeout(() => setActionNotice(null), 4000);
    } else if (action.actionType === 'more_details') {
      handleSendMessage('Can you provide more detailed dosages and nutrient ratios?');
    } else if (action.actionType === 'ask_another') {
      setInputMessage('What companion plants help protect tomatoes from pests?');
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[78vh] flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
      {/* Header matching reference image Panel 5 */}
      <div className="p-4 px-6 border-b border-gray-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
            <Bot className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base leading-tight">AI Farming Assistant</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700">Online</span>
              <span className="text-gray-300">•</span>
              <span className="text-[11px] text-gray-400">Agronomic Advisory Model</span>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                sender: 'assistant',
                text: 'Hello! I am your AgriGuide AI agronomist. How can I assist your farm today?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          title="Reset conversation"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-semibold text-center flex items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#fbfdfc]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-2xl ${
                isUser ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-[#154734] text-white rounded-br-sm'
                    : 'bg-white border border-gray-200/90 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <p
                  className={`text-[10px] mt-2 text-right ${
                    isUser ? 'text-emerald-200' : 'text-gray-400'
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>

              {/* Action Chips matching screenshot */}
              {!isUser && msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {msg.suggestedActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleActionClick(action)}
                      className="px-3 py-1.5 bg-white border border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 text-emerald-800 font-semibold text-xs rounded-xl shadow-xs transition-all active:scale-95"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-xl w-32 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] text-gray-400 ml-1">Thinking...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar matching screenshot */}
      <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-3 bg-[#154734] hover:bg-[#1a553e] disabled:opacity-40 text-white rounded-2xl transition-all shadow-sm active:scale-95"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
