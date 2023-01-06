import './components/reset.css';
import './components/main.css';
import './components/app/app.css';
import { BrowserRouter } from "react-router-dom"
import LoginApp from './routes/login';
import MainApp from './routes/app';
import { ModalsContext } from './contexts/modals';


function App() {
    const logged = 
        window.localStorage.getItem('t') &&
        window.localStorage.getItem('r') &&
        window.localStorage.getItem('k');

    return (
        <BrowserRouter>
            {logged ? <ModalsContext><MainApp/></ModalsContext> : <LoginApp/>}
        </BrowserRouter>
    )
}

export default App;
