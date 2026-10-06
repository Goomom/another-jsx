import { useEffect, useState } from 'react'

// useEffect -> Serve para executar um efeito colateral no componente. Ex:

// const [qtd, set Qtd] = useState(0)
// useEffect(() => {
//  document.title = `Clicou ${qtd} vezes` },
// [qtd])
  
// <div>
//   <p>Quantidade: {qtd}</p>
//  <button onClick={e => setQtd(qtd + 1)}>Aumentar</button>
// </div>


// Importando o Css
import './App.css'

function App() {
  // Estado que irá armazenar os usuários.

  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [enviando, setEnviando] = useState(false)


  // Métodos HTTP
  // GET -> Busca informação
  // POST -> Cria uma informação
  // UPDATE -> Atualiza uma informação 
  // DELETE -> Deleta uma informação

  // GET com useEffect -> Busca as informações ao carregar a página
  useEffect(() => {
    // Async -> Garante que a minha função funcione de forma assícrona
  
    // Await -> FAz meu código esperar até que a operação naquela linha seja concluída.

    async function buscaUsuarios(){
      // try -> Tenta executar uma operação  que pode causar um erro
      try {
        // Busca as informações na API
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users')

        // Lança um erro caso ocorra algum problema nos dados.
        if (!resposta.ok) {
          throw new Error('Falha ao buscar os dados')
        }

        // Extrai os dados da resposta
        const dados = await resposta.json()

        setUsuarios(dados)

        //  catch -> Captura o erro caso ocorra.
      } catch (err) {
        setErro(err.message)
        // Finally -> Executa tanto se houver erro ou não
      } finally {
        setCarregando(false)
      }
    }

    buscaUsuarios()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

      console.log(nome, email)
  
      if (!nome || !email) {
        alert('Por favor, preencha pelo menos o Nome e E-mail.')
        return
      }    

      setEnviando(true)

      const novoUsuarioDado = {
        name: nome,
        email: email,
        company: { name: empresa || 'N/A'}
      }

      console.log(novoUsuarioDado)

      try {
        // Utilizando o método POST para enviar o novo usuário para a nossa API.
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
          // Método da requisição
          method: 'POST',
          // Cabeçalho
          headers: {
            // Tipo de conteúdo
            'Content-Type': 'aplication/json'
          },
          // Corpo da requisição com os dados a serem enviados
          body: JSON.stringify(novoUsuarioDado)
        })

        // Verifica se algo deu errado e lança uma exceção
        if (!resposta.ok) throw new Error('Erro ao cadastrar usuário')

          const usuarioCriado = await resposta.json()

          // Atualiza o estado local adicioanando o novo usuário no topo da lista

          setUsuarios([novoUsuarioDado, ...usuarios])

          // Limpa os estados
          setNome('')   
          setEmail('')   
          setEmpresa('')   
      } catch (e) {
        alert('Erro: $(e.message')
      } finally {
        setEnviando(false)
      }
  }
// Precisa ficar sozinho para não ter dempendências



  if (carregando) return <div className='status'>Carregando Usuários... Aguarde.</div>
  if (erro) return <div className='status-erro'>Erro: {erro}</div>
  return (
    <div className='container'>
      <h1>Gerenciador de Usuários</h1>

      {/* Formulário de criação */}
      <form className='form-card' onSubmit={handleSubmit}>
        <h2>Cadastrar Novo Usuário</h2>

      {/* Campo de nome */}
        <div className="form-grop">
          <label htmlFor="nome">Nome: </label>
          <input type="text" id='nome' 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder='Ex: Maria Silva'/>
        </div>

      {/* Campo de email */}
        <div className="form-grop">
          <label htmlFor="email">Email: </label>
          <input type="text" id='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Ex: mariasilva@exemplo.com'/>
        </div>

      {/* Campo de empresa */}
        <div className="form-grop">
          <label htmlFor="empresa">Empresa: </label>
          <input type="text" id='empresa' 
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder='Ex: Tech Fulanos'/>
        </div>

        <button type='submit' disabled={enviando}>
          {/* Se o estado enviando for true, o texto apareceçá como "Enviando...", se for falso, apareceçá como "Cadastrar Usuário"*/}
          {enviando ? 'Enviando...' : 'Cadastrar Usuário'}
        </button>
      </form>
      
      {/* {Rederizando os usuários} */}
      <h2>Listas de Usuários ({usuarios.length})</h2>
      <ul className='user-list'>
        {/* Mapeando cada usuário dentro da lista*/}
        { usuarios.map(usuario =>(
          <li key={usuario.id} className='user-card'>
            <h3>{usuario.name}</h3>

            <p><strong>E-mail:</strong>{usuario.email} </p>
            <p><strong>Empresa:</strong>{usuario.company?.name || 'Não informado'} </p>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default App
