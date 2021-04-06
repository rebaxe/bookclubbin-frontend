import './App.css';
import Search from './components/Search/Search.js'

function App() {
  const hello = 'Hello, World!'
  return (
    <div className="App">
      <h1>{ hello }</h1>
      <Search />
    </div>
  );
}

export default App;
