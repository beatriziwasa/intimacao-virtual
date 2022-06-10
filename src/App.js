import './App.css';
import { IntimacaoComponent } from './components/IntimacaoComponent';
import logoPCSC from './logo-policial-civil.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="Logo da PCSC" src={logoPCSC}/>
        <h1>INTIMAÇÃO VIRTUAL</h1>
        <h2>11ª Delegacia de Polícia da Capital - DPTUR</h2>
        <br/>
        <IntimacaoComponent />
      </header>
    </div>
  );
}

export default App;