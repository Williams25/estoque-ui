import { http } from './config'

export default {
    listarProdutos() {
        return http.get(`produto`)
    },
    produtoId(id) {
        return http.get(`produto/${id}`)
    },
    apagarProduto(id) {
        return http.delete(`produto/${id}`)
    }
}