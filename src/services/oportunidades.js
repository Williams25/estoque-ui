import { http } from "./config";

export default {
    listar:() => {
        return http.get()
    },
    listarId:(id) => {
        return http.get(`/${id}`)
    },
    deletar:(id) => {
        return http.delete(`/${id}`)
    }
}