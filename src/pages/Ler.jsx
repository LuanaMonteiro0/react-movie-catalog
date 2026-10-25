import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarFilme } from '../services/filmesApi';

export default function Ler() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        buscarFilme(id)
            .then(res => setFilme(res.data))
            .catch(() => setErro('Não foi possível carregar o filme.'))
            .finally(() => setCarregando(false));
    }, [id]);

    return (
        <main className="conteudo">

            <h1>Detalhes do filme</h1>

            {carregando && <p>Carregando...</p>}

            {erro && <p className="mensagem-erro">{erro}</p>}

            {filme && (
                <div className="card">
                    <dl className="dados-filme">
                        <dt>ID</dt>
                        <dd>{filme.id}</dd>

                        <dt>Nome</dt>
                        <dd>{filme.nome}</dd>

                        <dt>Gênero</dt>
                        <dd>{filme.genero}</dd>

                        <dt>Ano</dt>
                        <dd>{filme.ano}</dd>
                    </dl>
                </div>
            )}

            <div className="acoes">
                <button
                    type="button"
                    className="botao secundario"
                    onClick={() => navigate('/')}
                >
                    Cancelar
                </button>
            </div>

        </main>
    );
}
