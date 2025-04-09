import React, { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };
  };

  const handleSend = async (message = input) => {
    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message,
      });
      const reply = res.data.reply;
      setResponse(reply);

      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>💬 Luna AI</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        cols={50}
      />
      <br />
      <button onClick={() => handleSend()}>Send</button>
      <button onClick={handleVoiceInput} style={{ marginLeft: 10 }}>
        🎤 Speak
      </button>
      <p><strong>Luna:</strong> {response}</p>
    </div>
  );
}

export default App;
