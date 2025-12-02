import React, { useEffect, useState } from 'react'
import ListaContatos from './componentes/ListaContatos'
import FormularioContato from './componentes/FormularioContato'
import * as api from './api'

export default function App() {
    const [contatos, setContatos] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [editando, setEditando] = useState(null)

    useEffect(() => { carregarContatos() }, [])

    async function carregarContatos() {
        setCarregando(true)
        try {
            const dados = await api.buscarContatos()
            setContatos(dados)
        } catch (err) {
            console.error(err)
            alert('Erro ao carregar os contatos.')
        } finally {
            setCarregando(false)
        }
    }

    async function salvarContato(dados) {
        if (!dados.nome || !dados.telefone) {
            return alert('Preencha nome e telefone.')
        }

        try {
            if (dados.id) {
                // Atualizar
                const atualizado = await api.atualizarContato(dados.id, dados)
                setContatos(lista =>
                    lista.map(c => c.id === atualizado.id ? atualizado : c)
                )
                setEditando(null)
            } else {
                // Criar novo
                const criado = await api.criarContato(dados)
                setContatos(lista => [criado, ...lista])
            }
        } catch (err) {
            if (err.status === 409) {
                return alert('Já existe um contato com esse telefone.')
            }
            console.error(err)
            alert('Erro ao salvar o contato.')
        }
    }

    async function excluirContato(id) {
        const confirmar = window.confirm('Deseja realmente excluir este contato?')

        if (!confirmar) return

        try {
            await api.excluirContato(id)
            setContatos(lista => lista.filter(c => c.id !== id))
        } catch (err) {
            console.error(err)
            alert('Erro ao excluir o contato.')
        }
    }

    return (
        <div style={{
            maxWidth: 800,
            margin: '30px auto',
            padding: 20,
            background: '#f6f6f6',
            borderRadius: 10
        }}>
            <h1 style={{ textAlign: 'center' }}>📞 Agenda Telefônica</h1>

            <FormularioContato
                aoSalvar={salvarContato}
                editando={editando}
                aoCancelar={() => setEditando(null)}
            />

            {carregando ? (
                <p style={{ textAlign: 'center' }}>Carregando contatos...</p>
            ) : (
                <ListaContatos
                    contatos={contatos}
                    aoEditar={c => setEditando(c)}
                    aoExcluir={excluirContato}
                />
            )}
        </div>
    )
}
