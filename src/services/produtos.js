import { http } from './config'

export default {
  listarProdutos: (id_usuario) => {
    return http.get(`produto/usuario/${id_usuario}`)
  },
  produtoId: (id) => {
    return http.get(`produto/${id}`)
  },
  apagarProduto: (id) => {
    return http.delete(`produto/${id}`)
  },
  editarProduto: (produto) => {
    return http.put(`produto`, produto)
  },
  cadastrarProduto: (produto) => {
    return http.post(`produto`, produto)
  }
}