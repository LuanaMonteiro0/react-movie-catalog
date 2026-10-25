import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { alterarFilme, buscarFilme } from '../services/filmesApi';

export default function Alterar() {

    const navigate = useNavigate();

    const [idBusca, setIdBusca] = useState('');
    const [filme, setFilme] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [naoEncontrado, setNaoEncontrado] = useState(false);
    const [erroBusca, setErroBusca] = useState('');
    const [erroSalvar, setErroSalvar] = useState('');
    const [salvando, setSalvando] = useState(false);

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

    const handleAlterar = (event) => {
        event.preventDefault();
        setErroSalvar('');
        setSalvando(true);

        const dados = {
            nome: filme.nome,
            genero: filme.genero,
            ano: filme.ano,
        };

        alterarFilme(filme.id, dados)
            .then(() => navigate('/'))
            .catch(() => {
                setErroSalvar('Não foi possível alterar o filme.');
                setSalvando(false);
            });
    };

    return (
        <main className="conteudo">

            <h1>Alterar filme</h1>

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
                <form className="card formulario" onSubmit={handleAlterar}>

                    <div className="campo">
                        <label htmlFor="nome">Nome</label>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            value={filme.nome}
                            onChange={e => setFilme({ ...filme, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="genero">Gênero</label>
                        <input
                            id="genero"
                            name="genero"
                            type="text"
                            value={filme.genero}
                            onChange={e => setFilme({ ...filme, genero: e.target.value })}
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="ano">Ano</label>
                        <input
                            id="ano"
                            name="ano"
                            type="text"
                            value={filme.ano}
                            onChange={e => setFilme({ ...filme, ano: e.target.value })}
                            required
                        />
                    </div>

                    {erroSalvar && <p className="mensagem-erro">{erroSalvar}</p>}

                    <div className="acoes">
                        <button className="botao" type="submit" disabled={salvando}>
                            {salvando ? 'Alterando...' : 'Alterar'}
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

        </main>
    );
}
