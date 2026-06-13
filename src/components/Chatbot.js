"use client";

import { useState } from "react";

export default function Chatbot() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const botKnowledge = [
    { keywords: ["service", "what do you do", "offer"], response: "We offer Web Development, Software Development, and IT Services." },
    { keywords: ["founder", "team", "who are you", "about"], response: "The Intelliverse is a dynamic software development company led by our expert founders." },
    { keywords: ["contact", "email", "phone"], response: "You can email us at theintelliverse@gmail.com. All details are on the contact section." },
    { keywords: ["price", "quote", "cost"], response: "Pricing varies by project. Please use the contact form for a detailed quote." },
    { keywords: ["hello", "hi", "hey"], response: "Hello! How can I help you today?" }
  ];

  const quickReplies = ["What services do you offer?", "Who are the founders?", "How can I get a quote?"];

  const handleChatSend = (customText) => {
    const text = typeof customText === "string" ? customText.trim() : chatInput.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lowerInput = text.toLowerCase();
      let botResponse = "I can answer questions about our services and founders. For more, please use the contact form.";

      for (const item of botKnowledge) {
        if (item.keywords.some((keyword) => lowerInput.includes(keyword))) {
          botResponse = item.response;
          break;
        }
      }
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([{ text: "Hello! How can I help you today?", sender: "bot" }]);
  };

  return (
    <div id="chatbot-container">
      <div id="chatbot-window" className={chatbotOpen ? "open" : ""}>
        <div id="chat-header" className="flex justify-between items-center select-none">
          <span>Intelliverse Assistant</span>
          <button onClick={handleClearChat} className="text-xs text-gray-400 hover:text-white">
            Clear
          </button>
        </div>
        <div id="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot-message typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <div id="quick-replies-container">
          <div className="quick-replies">
            {quickReplies.map((replyText, idx) => (
              <button
                key={idx}
                onClick={() => handleChatSend(replyText)}
                className="quick-reply"
              >
                {replyText}
              </button>
            ))}
          </div>
        </div>
        <div id="chat-input-container">
          <input
            type="text"
            id="chat-input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
            placeholder="Ask a question..."
          />
          <button id="chat-send" onClick={() => handleChatSend()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
      <div id="chatbot-bubble" className="chatbot-pulse-container" onClick={() => setChatbotOpen(!chatbotOpen)}>
        <i className="fas fa-comment-dots text-2xl"></i>
      </div>
    </div>
  );
}
