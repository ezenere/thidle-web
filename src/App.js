import './components/reset.css';
import './components/main.css';
import './components/app/app.css';
import { BrowserRouter } from "react-router-dom"
import LoginApp from './routes/login';
import MainApp from './routes/app';
import ReactGA from 'react-ga';


function App() {
    ReactGA.initialize('G-ZCM1BYEMRS');

    return (
        <BrowserRouter>
            {window.localStorage.thidleSession ? <MainApp/> : <LoginApp/>}
        </BrowserRouter>
    )
}

export default App;
