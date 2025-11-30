import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MessageSquare, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, skills, experiences, projects, education, certifications, extracurricular } from '../data';

const getSystemInstruction = () => {
  return `You are a professional and friendly AI assistant for Anurag Kumar Singh's portfolio website.
Your role is to answer visitor questions about Anurag's skills, experience, projects, and education based strictly on the provided context.

Context Data:
Name: ${personalInfo.name}
Role: ${personalInfo.role}
Summary: ${personalInfo.summary}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}

Skills:
${skills.map(c => `- ${c.title}: ${c.skills.join(', ')}`).join('\n')}

Experience:
${experiences.map(e => `- ${e.role} at ${e.company} (${e.date}, ${e.type}): ${e.description.join(' ')}`).join('\n')}

Projects:
${projects.map(p => `- ${p.title} (${p.role}, ${p.date}): ${p.description.join(' ')} Technologies: ${p.tech.join(', ')}`).join('\n')}

Education:
${education.map(e => `- ${e.degree} at ${e.institution} (${e.date}), Score: ${e.score}, Location: ${e.location}`).join('\n')}

Certifications: ${certifications.join(', ')}

Extracurricular: ${extracurricular.role} at ${extracurricular.org} (${extracurricular.date}): ${extracurricular.description.join(' ')}

Guidelines:
1. Be concise, enthusiastic, and professional.
2. If asked about contact info, provide the email or mention the contact section.
3. If asked about something not in the context, politely say you don't have that information and suggest contacting Anurag directly.
4. Keep responses relatively short (under 100 words) unless detailed explanation is asked.
5. Be proactive! After answering a user's question, offer to share specific details about a related project (like the Sangwan Trading Institute Website) or a specific skill (like React or Python) to keep the conversation engaging.
6. Always aim to highlight Anurag's strengths in web development and problem-solving.
`;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hi there! I'm Anurag's AI assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Safe API Key retrieval that works for both Local Vite and Production
  const getApiKey = () => {
    // 1. Try Vite environment variable (Local)
    // Using (import.meta as any) to bypass TypeScript error if types aren't configured
    const viteKey = (import.meta as any).env?.VITE_API_KEY;
    if (viteKey) return viteKey;

    // 2. Try process.env (Production/Node)
    // Wrapped in try-catch to prevent "process is not defined" error in browser
    try {
      return process.env.API_KEY;
    } catch (e) {
      return undefined;
    }
  };

  const initChat = () => {
    try {
      const apiKey = getApiKey();
      
      if (!apiKey) {
        console.error("API Key is missing. Please set VITE_API_KEY in .env file (local) or API_KEY (production).");
        return;
      }
      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: {
          systemInstruction: getSystemInstruction(),
        }
      });
      setChatSession(chat);
    } catch (e) {
      console.error("Failed to initialize chat", e);
    }
  };

  useEffect(() => {
    if (isOpen && !chatSession) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      let currentChat = chatSession;
      
      // Re-initialize if session is lost or not created
      if (!currentChat) {
         const apiKey = getApiKey();
         if (apiKey) {
            const ai = new GoogleGenAI({ apiKey });
            currentChat = ai.chats.create({
              model: 'gemini-2.0-flash',
              config: {
                systemInstruction: getSystemInstruction(),
              }
            });
            setChatSession(currentChat);
         }
      }

      if (currentChat) {
        const result = await currentChat.sendMessage({ message: userMessage });
        const responseText = result.text;
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "API Key is missing. Please configure VITE_API_KEY in your .env file." }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold font-heading">AI Assistant</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <Sparkles size={10} /> Powered by Gemini
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my projects..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-transparent focus:border-primary focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;