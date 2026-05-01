import { useEffect, useState } from 'react';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const load = () => fetch(`${API}/tasks`).then(r => r.json()).then(setTasks);
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!input.trim()) return;
    await fetch(`${API}/tasks`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: input }) });
    setInput(''); load();
  };

  const toggle = async (t) => {
    await fetch(`${API}/tasks/${t.id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title: t.title, done: !t.done }) });
    load();
  };

  const del = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method:'DELETE' });
    load();
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Todo List</h1>
      <div style={{ display:'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && add()} style={{ flex:1, padding:'8px 12px' }} placeholder="New task..." />
        <button onClick={add} style={{ padding:'8px 16px' }}>Add</button>
      </div>
      <ul style={{ listStyle:'none', padding:0, marginTop:16 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 0', borderBottom:'1px solid #eee' }}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t)} />
            <span style={{ flex:1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
            <button onClick={() => del(t.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}