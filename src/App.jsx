import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Ler from './pages/Ler';
import Criar from './pages/Criar';
import Alterar from './pages/Alterar';
import Apagar from './pages/Apagar';
import './App.css';

function App() {

    return (
        <BrowserRouter>

            <Header />

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/ler/:id" element={<Ler />} />
                <Route path="/criar" element={<Criar />} />
                <Route path="/alterar" element={<Alterar />} />
                <Route path="/apagar" element={<Apagar />} />
                <Route
                    path="*"
                    element={<main className="conteudo"><h1>Página não encontrada!</h1></main>}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
