import './components/reset.css';
import './components/main.css';
import { BrowserRouter } from "react-router-dom"
import LoginApp from './routes/login';
import MainApp from './routes/app';

function App() {
    return (
        <BrowserRouter>
            {window.thidle.loggedIn ? <MainApp/> : <LoginApp/>}
        </BrowserRouter>
    )
}

export default App;
