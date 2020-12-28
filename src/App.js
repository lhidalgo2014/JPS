import './App.css';
import { addStorteo } from './database'

function App() {
  return (
    <div className="App">
      <button onClick={addStorteo}> Save to database </button>
    </div>
  );
}

export default App;
