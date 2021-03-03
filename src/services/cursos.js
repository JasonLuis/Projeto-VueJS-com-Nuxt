import { http } from './config'

export default {
  listar: () => {
    return http.get('cursos')
  },
  adicionarCursos: (cursos) => {
    return http.post('cursos', cursos)
  },
  atualizar: (cursos) => {
    return http.put('cursos', cursos)
  },
  deletar: (cursos) => {
    return http.delete(`cursos/${cursos.id}`)
  },
}
