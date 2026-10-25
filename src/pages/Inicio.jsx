import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listarFilmes } from '../services/filmesApi';

export default function Inicio() {

    const [filmes, setFilmes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        listarFilmes()
            .then(res => setFilmes(res.data))
            .catch(() => setErro('Não foi possível carregar os filmes.'))
            .finally(() => setCarregando(false));
    }, []);

    return (
        <main className="conteudo">

            <h1>Filmes cadastrados</h1>

            {carregando && <p>Carregando...</p>}

            {erro && <p className="mensagem-erro">{erro}</p>}

            {!carregando && !erro && (
                <div className="card">
                    {filmes.length === 0 ? (
                        <p>Nenhum filme cadastrado.</p>
                    ) : (
                        <table className="tabela">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filmes.map(filme => (
                                    <tr key={filme.id}>
                                        <td>{filme.id}</td>
                                        <td>
                                            <Link to={`/ler/${filme.id}`}>
                                                {filme.nome}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

        </main>
    );
}
