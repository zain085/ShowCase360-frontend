import React, { useState } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([
    { from: 'admin', text: 'Hello! Welcome to the EventSphere platform.', time: '10:00 AM' },
    { from: 'you', text: 'Thanks! Looking forward to the event.', time: '10:02 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setMessages([...messages, { from: 'you', text: newMessage, time: 'Now' }]);
    setNewMessage('');
  };

  return (
    <div className="container py-4">
      <h3 className="text-light mb-4">Messages</h3>

      <div className="card bg-dark-custom border-purple text-light shadow" style={{ height: '70vh' }}>
        <div className="card-body d-flex flex-column">
          {/* Message List */}
          <div className="flex-grow-1 overflow-auto mb-3 px-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`d-flex mb-2 ${msg.from === 'you' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-2 rounded px-3 ${msg.from === 'you' ? 'bg-purple text-white' : 'bg-secondary text-white'}`}
                >
                  <div>{msg.text}</div>
                  <div className="text-end text-light small mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="d-flex border-top pt-3">
            <input
              type="text"
              className="form-control bg-dark text-light me-2"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-purple">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
