const express = require('express');
const { nanoid } = require('nanoid');
const app = express();

app.use(express.json());

inicializarBanco();

// 🔹 Função util para buscar contato
function encontrarContato(id, banco) {
    return banco.data.contatos.find(c => c.id === id);
}

// 🔹 Listar todos
app.get('/api/contatos', async (req, res) => {
    await banco.read();
    res.json(banco.data.contatos);
});

// 🔹 Buscar por ID
app.get('/api/contatos/:id', async (req, res) => {
    await banco.read();

    const contato = encontrarContato(req.params.id, banco);
    if (!contato) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    res.json(contato);
});

// 🔹 Criar
app.post('/api/contatos', async (req, res) => {
    await banco.read();

    const { nome, telefone } = req.body;

    if (!nome || !telefone) {
        return res.status(400).json({ erro: 'Nome e telefone são obrigatórios.' });
    }

    const telefoneJaExiste = banco.data.contatos.some(c => c.telefone === telefone);
    if (telefoneJaExiste) {
        return res.status(409).json({ erro: 'Telefone já cadastrado.' });
    }

    const novo = { id: nanoid(), nome, telefone };
    banco.data.contatos.push(novo);
    await banco.write();

    res.status(201).json(novo);
});

// 🔹 Atualizar
app.put('/api/contatos/:id', async (req, res) => {
    await banco.read();

    const { nome, telefone } = req.body;
    const contato = encontrarContato(req.params.id, banco);

    if (!contato) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    contato.nome = nome ?? contato.nome;
    contato.telefone = telefone ?? contato.telefone;

    await banco.write();
    res.json(contato);
});

// 🔹 Excluir
app.delete('/api/contatos/:id', async (req, res) => {
    await banco.read();

    const antes = banco.data.contatos.length;
    banco.data.contatos = banco.data.contatos.filter(c => c.id !== req.params.id);

    if (banco.data.contatos.length === antes) {
        return res.status(404).json({ erro: 'Contato não encontrado.' });
    }

    await banco.write();
    res.status(204).send();
});

// 🔹 Inicialização
const PORTA = process.env.PORT || 4000;
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
