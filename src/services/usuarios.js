import { http } from "./config";

export default {
    login: (usuario, senha) => {
        return http.get(`usuario/${usuario}/${senha}`)
    },
    cadastrarUsuario: (usuario) => {
        return http.post(`usuario`, usuario)
    },
    findUsuarioId: (usuario) => {
        return http.get(`/usuario/${usuario}`)
    }
}