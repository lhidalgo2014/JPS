import './App.css';
import { transactAccountMoney, registerSorteo, getSorteos } from './database'

function App() {
  return (
    <div className="App">
      <button onClick={() => transactAccountMoney('chances', 'deposit', 1500)}> transactAccountMoney </button>
      <button onClick={() => registerSorteo('chances', [])}> registerSorteo </button>
      <button onClick={() => getSorteos()}> getSorteos </button>
    </div>
  );
}

export default App;
