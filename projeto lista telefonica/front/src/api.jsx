const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function buscarContatos() {
    const res = await fetch(`${BASE}/api/contatos`);
    if (!res.ok) throw new Error('Erro ao buscar contatos');
    return res.json();
}

export async function criarContato(dados) {
    const res = await fetch(`${BASE}/api/contatos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    if (!res.ok) throw res;
    return res.json();
}

export async function atualizarContato(id, dados) {
    const res = await fetch(`${BASE}/api/contatos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    });
    if (!res.ok) throw res;
    return res.json();
}

export async function excluirContato(id) {
    const res = await fetch(`${BASE}/api/contatos/${id}`, { method: 'DELETE' });
    if (!res.ok) throw res;
    return true;
}