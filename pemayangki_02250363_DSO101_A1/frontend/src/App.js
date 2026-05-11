import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>Todo App - Auto Deploy Test</h1>

        <p>This change is for verifying auto deploy on Render</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          View React Docs
        </a>
      </header>
    </div>
  );
}

export default App;