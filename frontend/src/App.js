import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${apiBase}/api/items`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, [apiBase]);

  const addItem = async () => {
    if (!input) return;
    const res = await fetch(`${apiBase}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: input })
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setInput('');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Three-Tier Task App</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="New item name..." />
      <button onClick={addItem}>Add Item</button>
      <ul>{items.map((item, idx) => <li key={idx}>{item.name}</li>)}</ul>
    </div>
  );
}

export default App;
