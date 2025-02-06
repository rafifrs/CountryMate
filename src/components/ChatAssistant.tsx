// src/components/ChatAssistant.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendMessageToNIM } from '../services/nimAPI';

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatAssistantProps {
  countryName: string;
  countryInfo: {
    capital: string;
    currency: string;
    continent: { name: string };
    phone: string;
    native: string;
    languages: { name: string }[];
  };
}

const ChatAssistant = ({ countryName, countryInfo }: ChatAssistantProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingLanguage, setAwaitingLanguage] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const cleanMessageFormat = (message: string): string => {
    return message
      .replace(/<think>.*?<\/think>/g, '')
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .trim();
  };

  useEffect(() => {
    const initialMessage = `Hi! I'm here to help you learn about ${countryName}. What would you like to know?
    
1: Get travel recommendations
2: Translate country information
    
Please type 1 or 2 or ask me any question about ${countryName}!`;
    
    setMessages([{ role: "assistant", content: initialMessage }]);
  }, [countryName]);

  const handleApiError = (error: any) => {
    console.error('API Error:', error);
    setError('Sorry, there was an error processing your request. Please try again.');
    setMessages(prev => [...prev, { 
      role: "assistant", 
      content: "I apologize, but I encountered an error. Please try again or ask a different question." 
    }]);
    setIsLoading(false);
  };

  const handleTranslationRequest = async (language: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const countryInfoText = `
        Country: ${countryName}
        🏙 Capital: ${countryInfo.capital}
        💰 Currency: ${countryInfo.currency}
        🌍 Continent: ${countryInfo.continent.name}
        📞 Phone Code: +${countryInfo.phone}
        🗣 Languages: ${countryInfo.languages.map(lang => lang.name).join(', ')}
        🛖 Native: ${countryInfo.native}
`;

      const response = await sendMessageToNIM(`Translate this information to ${language}:\n${countryInfoText}`);
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: cleanMessageFormat(response) }]);
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
      setAwaitingLanguage(false);
      setSelectedOption(null);
    }
  };

  const handleTravelRecommendations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `As a travel expert, provide comprehensive travel recommendations for ${countryName}. Include:
1. Best time to visit considering weather and local events
2. Top 3 must-visit places with brief descriptions
3. Local cuisine highlights and must-try dishes
4. Important cultural tips and customs
5. Transportation tips and getting around

Please provide detailed and specific information for ${countryName}.`;

      const response = await sendMessageToNIM(prompt);
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: cleanMessageFormat(response) }]);
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
      setSelectedOption(null);
    }
  };

  const handleGeneralQuery = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const prompt = `As a country expert, answer this question about ${countryName}: ${query}
      Please provide a detailed and accurate response based on current information.`;
      
      const response = await sendMessageToNIM(prompt);
      if (response) {
        setMessages(prev => [...prev, { role: "assistant", content: cleanMessageFormat(response) }]);
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setError(null);

    if (awaitingLanguage) {
      await handleTranslationRequest(input);
      return;
    }

    switch (input) {
      case "1":
        setSelectedOption("1");
        await handleTravelRecommendations();
        break;
      case "2":
        setSelectedOption("2");
        setAwaitingLanguage(true);
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Which language would you like the information to be translated to?" 
        }]);
        break;
      default:
        await handleGeneralQuery(input);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md h-[500px] bg-black text-white p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-white"
                }`}
                style={{ whiteSpace: 'pre-line' }}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.1, repeat: Infinity }}
              />
              <motion.div
                className="w-3 h-3 bg-blue-500 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center py-2">
            {error}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
          placeholder={awaitingLanguage ? "Enter language..." : "Type your message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default ChatAssistant;