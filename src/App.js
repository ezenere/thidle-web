import './components/reset.css';
import './components/main.css';
import { BrowserRouter } from "react-router-dom"
import LoginApp from './routes/login';

function App() {
    return (
        <BrowserRouter>
            <LoginApp/>
        </BrowserRouter>
    )
}

export default App;
