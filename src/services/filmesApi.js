import axios from 'axios';

const filmesApi = axios.create({
    baseURL: 'https://6ade288b4e88f1bba4a4fc00.mockapi.io',
});

export const listarFilmes = () => filmesApi.get('/filmes');

export const buscarFilme = (id) => filmesApi.get(`/filmes/${id}`);

export const criarFilme = (filme) => filmesApi.post('/filmes', filme);

export const alterarFilme = (id, filme) => filmesApi.put(`/filmes/${id}`, filme);

export const apagarFilme = (id) => filmesApi.delete(`/filmes/${id}`);
