# Catálogo de Filmes

Aplicação React para gerenciar um catálogo de filmes com operações de listagem, leitura, cadastro, alteração e exclusão.

## Autores

Trabalho desenvolvido por Luana Giovana Monteiro e Luan Marqueti para a disciplina SCL PRW2 - Programação para Web 2.

## Tecnologias

- React
- Vite
- React Router DOM
- Axios
- MockAPI

## Páginas

- `/` - lista os filmes cadastrados
- `/ler/:id` - exibe todos os dados de um filme
- `/criar` - cadastra um novo filme
- `/alterar` - busca um filme pelo ID e permite alterar seus dados
- `/apagar` - busca um filme pelo ID e permite removê-lo

## API

Os dados são armazenados no MockAPI:

```text
https://6ade32804e88f1bba4a50502.mockapi.io/filmes
```

Cada filme possui os campos `id`, `nome`, `genero` e `ano`.

## Como executar

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```
