import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarFilme } from '../services/filmesApi';

export default function Criar() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        nome: '',
        genero: '',
        ano: '',
    });
    const [erro, setErro] = useState('');
    const [salvando, setSalvando] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErro('');
        setSalvando(true);

        criarFilme(values)
            .then(() => navigate('/'))
            .catch(() => {
                setErro('Não foi possível cadastrar o filme.');
                setSalvando(false);
            });
    };

    return (
        <main className="conteudo">

            <h1>Cadastrar filme</h1>

            <form className="card formulario" onSubmit={handleSubmit}>

                <div className="campo">
                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        placeholder="Digite o nome do filme"
                        value={values.nome}
                        onChange={e => setValues({ ...values, nome: e.target.value })}
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="genero">Gênero</label>
                    <input
                        id="genero"
                        name="genero"
                        type="text"
                        placeholder="Digite o gênero"
                        value={values.genero}
                        onChange={e => setValues({ ...values, genero: e.target.value })}
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="ano">Ano</label>
                    <input
                        id="ano"
                        name="ano"
                        type="text"
                        placeholder="Digite o ano"
                        value={values.ano}
                        onChange={e => setValues({ ...values, ano: e.target.value })}
                        required
                    />
                </div>

                {erro && <p className="mensagem-erro">{erro}</p>}

                <div className="acoes">
                    <button className="botao" type="submit" disabled={salvando}>
                        {salvando ? 'Criando...' : 'Criar'}
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

        </main>
    );
}
