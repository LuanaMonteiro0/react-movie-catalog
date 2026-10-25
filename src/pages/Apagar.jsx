import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apagarFilme, buscarFilme } from '../services/filmesApi';

export default function Apagar() {

    const navigate = useNavigate();

    const [idBusca, setIdBusca] = useState('');
    const [filme, setFilme] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [erroBusca, setErroBusca] = useState('');
    const [erroApagar, setErroApagar] = useState('');
    const [apagando, setApagando] = useState(false);

    const handleBuscar = (event) => {
        event.preventDefault();

        const id = idBusca.trim();
        setNaoEncontrado(false);
        setErroBusca('');
        setFilme(null);

        if (!id) {
            setErroBusca('Digite o ID do filme.');
            return;
        }

        setBuscando(true);

        buscarFilme(id)
            .then(res => setFilme(res.data))
            .catch(err => {
                if (err.response?.status === 404) {
                    setNaoEncontrado(true);
                } else {
                    setErroBusca('Não foi possível buscar o filme.');
                }
            })
            .finally(() => setBuscando(false));
    };

    const handleApagar = () => {
        const confirmar = window.confirm('Quer mesmo apagar este filme?');

        if (!confirmar) {
            return;
        }

        setErroApagar('');
        setApagando(true);

        apagarFilme(filme.id)
            .then(() => navigate('/'))
            .catch(() => {
                setErroApagar('Não foi possível apagar o filme.');
                setApagando(false);
            });
    };

    return (
        <main className="conteudo">

            <h1>Apagar filme</h1>

            {!filme && !naoEncontrado && (
                <form className="card formulario" onSubmit={handleBuscar}>

                    <div className="campo">
                        <label htmlFor="id">ID do filme</label>
                        <input
                            id="id"
                            name="id"
                            type="text"
                            inputMode="numeric"
                            placeholder="Digite o ID"
                            value={idBusca}
                            onChange={e => setIdBusca(e.target.value)}
                        />
                    </div>

                    {erroBusca && <p className="mensagem-erro">{erroBusca}</p>}

                    <div className="acoes">
                        <button className="botao" type="submit" disabled={buscando}>
                            {buscando ? 'Procurando...' : 'Procurar'}
                        </button>

                        <button
                            className="botao secundario"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                    </div>

                </form>
            )}

            {naoEncontrado && (
                <div className="card">
                    <p>Filme não encontrado.</p>

                    <div className="acoes">
                        <button
                            className="botao"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Voltar para o início
                        </button>
                    </div>
                </div>
            )}

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

                    {erroApagar && <p className="mensagem-erro">{erroApagar}</p>}

                    <div className="acoes">
                        <button
                            className="botao perigo"
                            type="button"
                            onClick={handleApagar}
                            disabled={apagando}
                        >
                            {apagando ? 'Apagando...' : 'Apagar'}
                        </button>

                        <button
                            className="botao secundario"
                            type="button"
                            onClick={() => navigate('/')}
                        >
                            Cancelar
                        </button>
                    </div>

                </div>
            )}

        </main>
    );
}
