import React, { useState, useEffect } from 'react';

export default function FormularioContato({ aoSalvar, editando }) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        if (editando) {
            setNome(editando.nome || '');
            setTelefone(editando.telefone || '');
        } else {
            setNome('');
            setTelefone('');
        }
    }, [editando]);

    function enviar(e) {
        e.preventDefault();

        if (!nome.trim() || !telefone.trim()) {
            return alert('Preencha nome e telefone.');
        }

        aoSalvar({
            id: editando?.id,
            nome: nome.trim(),
            telefone: telefone.trim()
        });
    }

    const estiloInput = {
        padding: 8,
        width: '100%',
        borderRadius: 6,
        border: '1px solid #ccc'
    };

    const estiloBotao = {
        padding: '8px 14px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        background: editando ? '#0077ff' : '#28a745',
        color: '#fff'
    };

    return (
        <form onSubmit={enviar} style={{ marginBottom: 12 }}>
            <div style={{ marginBottom: 8 }}>
                <input
                    style={estiloInput}
                    placeholder="Nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <input
                    style={estiloInput}
                    placeholder="Telefone"
                    value={telefone}
                    onChange={e => setTelefone(e.target.value)}
                />
            </div>

            <button style={estiloBotao} type="submit">
                {editando ? 'Salvar Alterações' : 'Adicionar Contato'}
            </button>
        </form>
    );
}
