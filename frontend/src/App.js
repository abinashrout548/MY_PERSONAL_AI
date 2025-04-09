import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [listening, setListening] = useState(false);
  const user_id = "abinash"; // custom user memory support

  const messagesEndRef = useRef(null);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
        user_id: user_id,
      });

      const reply = res.data.response;
      setMessages((prev) => [...prev, { sender: "luna", text: reply }]);
      speak(reply);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "luna", text: "Oops, something went wrong!" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <div className="chat-box">
        <h1>💖 My Personal AI</h1>

        <div className="messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === "user" ? "user" : "luna"}`}
            >
              <div className="avatar">
                {msg.sender === "user" ? "🧑‍💻" : "💋"}
              </div>
              <div className="text">{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="message luna">
              <div className="avatar">💋</div>
              <div className="text typing">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="controls">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message to Luna..."
          />
          <div className="button-group">
            <button onClick={sendMessage}>Send</button>
            <button onClick={handleVoiceInput}>
              {listening ? "🎙️ Listening..." : "🎙️ Speak"}
            </button>
            <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
              😍 Emoji
            </button>
            <button onClick={() => setDarkMode((prev) => !prev)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
        {showEmojiPicker && (
          <EmojiPicker onEmojiClick={handleEmojiClick} theme={darkMode ? "dark" : "light"} />
        )}
      </div>
    </div>
  );
}

export default App;
