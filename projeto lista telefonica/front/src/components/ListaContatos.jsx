import React from 'react'

export default function ListaContatos({ contatos, aoEditar, aoExcluir }) {
    return (
        <div>
            {contatos.length === 0 && <p>Nenhum contato cadastrado.</p>}
            <ul>
                {contatos.map(c => (
                    <li key={c.id} style={{ display: 'flex', gap: 8, padding: 6, alignItems: 'center', borderBottom: '1px solid #eee' }}>
                        <div style={{ flex: 1 }}>
                            <strong>{c.nome}</strong><br />
                            <small>{c.telefone}</small>
                        </div>
                        <div>
                            <button onClick={() => aoEditar(c)} style={{ marginRight: 6 }}>Editar</button>
                            <button onClick={() => aoExcluir(c.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}