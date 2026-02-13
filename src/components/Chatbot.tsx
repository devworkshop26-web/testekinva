'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  RefreshCw,
  Loader2,
  Globe,
  Zap,
  Settings,
  Briefcase,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/* ==============================
    COMPOSANTS UI SIMULÉS
================================ */
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`flex items-center justify-center rounded-xl font-semibold text-sm transition-all h-10 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const useLanguage = () => ({
  content: {
    chatbot: {
      title: 'Rakoto IA',
      welcome:
        'Bonjour ! Je suis Rakoto IA, le chatbot officiel de Kinva. Comment puis-je vous aider ?',
      placeholder: 'Écrivez votre message...',
      error: "Une erreur est survenue lors du traitement de votre demande.",
    },
  },
});

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

/* ==============================
    CONFIG (COULEURS & STYLE)
================================ */
const BRAND_CLASSES = {
  bg: 'bg-teal-600',
  bgHover: 'hover:bg-teal-700',
  text: 'text-teal-600',
  ring: 'focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600',
  userBubble: 'bg-teal-600 text-white rounded-br-none shadow-md shadow-teal-900/10',
} as const;

const N8N_WEBHOOK_URL = 'https://kinva.app.n8n.cloud/webhook/chat';
const STORAGE_KEY = 'kinva_chat_messages';
const SESSION_ID_KEY = 'kinva_chat_session';
const SESSION_STATUS_KEY = 'kinva_chat_status';

const QUICK_MESSAGES = [
  { text: 'Je veux créer un site web', icon: Globe },
  { text: 'Quels sont vos tarifs ?', icon: Zap },
  { text: "J'ai besoin d'un chatbot IA", icon: MessageCircle },
  { text: 'Je veux un devis', icon: Briefcase },
  { text: 'Comment fonctionne Rakoto IA ?', icon: Lightbulb },
  { text: 'Services Kinva', icon: Settings },
];

/* ==============================
   ✅ FIX AFFICHAGE \n / /n
   - Convertit "\\n" ou "/n" en vrais retours + hard-break Markdown
================================ */
const normalizeNewlinesForMarkdown = (raw: string) => {
  if (typeof raw !== 'string') return '';
  let text = raw
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\/n/g, '\n');

  const looksLikePlainLines =
    text.includes('\n') &&
    !text.includes('\n\n') &&
    !/^\s*[-*+]\s+/m.test(text) &&
    !/^\s*\d+\.\s+/m.test(text) &&
    !/```/.test(text);

  if (looksLikePlainLines) {
    text = text.replace(/\n/g, '  \n');
  }

  return text;
};

/* ==============================
    MAIN COMPONENT
================================ */
export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // ✅ AJOUT: ref du container scroll
  const { content } = useLanguage();
  const { chatbot } = content;

  const isWelcomeScreen = messages.length === 1 && messages[0].id === 'rabe-welcome';

  const getSessionId = () => {
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      const loadedMessages = JSON.parse(savedMessages);
      setMessages(
        loadedMessages.length > 0
          ? loadedMessages
          : [{ id: 'rabe-welcome', role: 'model', text: chatbot.welcome }]
      );
    } else {
      setMessages([{ id: 'rabe-welcome', role: 'model', text: chatbot.welcome }]);
    }

    const savedStatus = localStorage.getItem(SESSION_STATUS_KEY);
    if (savedStatus === 'finished') setIsSessionExpired(true);
  }, [chatbot.welcome]);

  useEffect(() => {
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 'rabe-welcome')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // ✅ MODIF: si on est sur l’écran d’accueil (Quick messages), scroll vers le haut
  // sinon, scroll en bas comme avant
  useEffect(() => {
    if (!isOpen) return;

    if (isWelcomeScreen) {
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading, isWelcomeScreen]);

  const handleNewChat = () => {
    setIsResetting(true);
    setTimeout(() => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
      localStorage.removeItem(SESSION_STATUS_KEY);
      setMessages([{ id: 'rabe-welcome', role: 'model', text: chatbot.welcome }]);
      setIsSessionExpired(false);
      setIsResetting(false);
    }, 800);
  };

  const handleSend = async (overrideInput?: string) => {
    if (isLoading || isResetting || isSessionExpired) return;
    const text = typeof overrideInput === 'string' ? overrideInput : input;
    if (!text?.trim()) return;

    const sessionId = getSessionId();
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'user', text }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, chatInput: text }),
      });
      const data = await res.json();
      const responseData = Array.isArray(data) ? data[0] : data;

      if (responseData?.conversation_finished === true) {
        setIsSessionExpired(true);
        localStorage.setItem(SESSION_STATUS_KEY, 'finished');
      }

      const rawBotText =
        responseData?.output || (typeof data === 'string' ? data : chatbot.error);

      const botText = normalizeNewlinesForMarkdown(rawBotText);

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + '_bot', role: 'model', text: botText },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString() + '_err', role: 'model', text: chatbot.error },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Bouton Flottant */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 ${BRAND_CLASSES.bg} ${BRAND_CLASSES.bgHover} text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[420px] h-[75vh] max-h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* --- HEADER --- */}
            <div className="bg-slate-900 text-white p-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-500/10 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800">
                      <img
                        src="/Rakoto.png"
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-sm">
                      <Sparkles size={12} className="text-teal-300" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm leading-none mb-1">{chatbot.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {messages.length > 1 && !isSessionExpired && (
                    <div className="relative group">
                      <button
                        onClick={handleNewChat}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                        title="Nouveau chat"
                      >
                        <RefreshCw size={18} className={isResetting ? 'animate-spin' : ''} />
                      </button>

                      <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-2.5 py-1.5 rounded-xl border border-slate-700/70 bg-slate-900/95 text-[11px] font-semibold text-slate-100 shadow-xl whitespace-nowrap">
                          Nouveau chat
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="relative z-10 mt-1.5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-teal-400 font-bold">
                  En ligne
                </span>
              </div>
            </div>

            {/* Zone de Messages */}
            <div
              ref={scrollContainerRef} // ✅ AJOUT: permet le scrollTo top smooth
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
            >
              <AnimatePresence mode="wait">
                {isResetting ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center"
                  >
                    <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                  </motion.div>
                ) : (
                  <>
                    {isWelcomeScreen ? (
                      <div className="flex flex-col items-center text-center space-y-6 py-6">
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-3"
                        >
                          <img
                            src="/Rakoto.png"
                            className="w-20 h-20 rounded-full mx-auto shadow-xl border-4 border-white"
                            alt="Rakoto"
                          />
                          <h2 className="text-xl font-bold text-slate-800">
                            Comment puis-je vous aider ?
                          </h2>
                          <p className="text-sm text-slate-500 px-6">{chatbot.welcome}</p>
                        </motion.div>
                        <div className="grid grid-cols-1 gap-2 w-full px-2">
                          {QUICK_MESSAGES.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSend(q.text)}
                              className="flex items-center gap-3 p-3 text-left text-sm font-medium bg-white border border-slate-200 rounded-2xl hover:border-teal-500 hover:bg-teal-50/50 transition-all shadow-sm group"
                            >
                              <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-teal-100 transition-colors">
                                <q.icon
                                  size={16}
                                  className="text-slate-600 group-hover:text-teal-600"
                                />
                              </div>
                              {q.text}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          } gap-2`}
                        >
                          {msg.role === 'model' && (
                            <img
                              src="/Rakoto.png"
                              className="w-8 h-8 rounded-full shadow-sm self-end mb-1"
                              alt="Bot"
                            />
                          )}
                          <div
                            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                              msg.role === 'user'
                                ? BRAND_CLASSES.userBubble
                                : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                            }`}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.role === 'model'
                                ? normalizeNewlinesForMarkdown(msg.text)
                                : msg.text}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))
                    )}

                    {isLoading && (
                      <div className="flex gap-2">
                        <img
                          src="/Rakoto.png"
                          className="w-8 h-8 rounded-full animate-pulse"
                          alt="Bot"
                        />
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              {isSessionExpired ? (
                <Button
                  onClick={handleNewChat}
                  className={`${BRAND_CLASSES.bg} ${BRAND_CLASSES.bgHover} text-white w-full shadow-lg`}
                >
                  <RefreshCw className="w-4 h-4 mr-2" /> Nouvelle conversation
                </Button>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={chatbot.placeholder}
                    className={`flex-1 px-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-teal-500/20 transition-all ${
                      isLoading ? 'opacity-50 pointer-events-none' : ''
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className={`p-2.5 rounded-xl transition-all ${
                      !input.trim() || isLoading
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-teal-600 text-white shadow-md shadow-teal-600/20 hover:scale-105'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
