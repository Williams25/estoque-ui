import { http } from "./config";

export default {
    login:(usuario, senha) => {
        return http.get(`usuario/${usuario}/${senha}`)
    },
    cadastrarUsuario:(usuario) => {
        return http.post(`usuario`, usuario)
    }   
}