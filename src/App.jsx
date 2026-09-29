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
// Precisa ficar sozinho para não ter dempendências



  if (carregando) return <div className='status'>Carregando Usuários... Aguarde.</div>
  if (erro) return <div className='status erro'>Erro: {erro}</div>
  return (
    <div className='container'>
      
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
