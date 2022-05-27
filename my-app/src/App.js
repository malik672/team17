import Header from './components/Header';
import Campaign from './components/Campaign';
import {useEffect} from "react"
import {useLocation} from "react-router-dom"
import './App.css';


function App() {
  return (
    <div className="App">
      <Header/>
      <Campaign/>
    </div>
  );
}

export default App;
