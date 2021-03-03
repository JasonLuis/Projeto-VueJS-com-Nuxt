<template>
  <v-row justify="center" align="center">
    <FormTodo @add-todo="addCurso"></FormTodo>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="cursos"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template #top>
          <v-toolbar flat>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-toolbar color="dark" class="text-center" dark>
                  Deseja excluir esse item?
                </v-toolbar>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="deleteItemConfirm">
                    Sim
                  </v-btn>
                  <v-btn color="blue" text @click="closeDelete"> Não </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.name`]="{ value }"> {{ value }}</template>
        <template #[`item.preco`]="{ value }">{{ value }} </template>
        <template #[`item.action`]="{ item }">
          <v-btn color="primary darken-2" fab x-small dark>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="error darken-2"
            fab
            x-small
            dark
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-container>
  </v-row>
</template>

<script>
import Cursos from '../src/services/cursos'
import FormTodo from './FormTodo.vue'

export default {
  components: {
    FormTodo,
  },
  data() {
    return {
      dialogDelete: false,
      confirmeDelete: undefined,
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'preco', value: 'preco' },
        { text: 'action', value: 'action' },
      ],
      cursos: [],
    }
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      Cursos.listar().then((res) => {
        this.cursos = res.data
      })
    },
    addCurso(cursos) {
      Cursos.adicionarCursos(cursos).then(() => {
        this.listar()
      })
    },
    deleteItem(item) {
      this.confirmeDelete = item
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      Cursos.deletar(this.confirmeDelete).then(() => {
        this.listar()
      })
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
    },
  },
}
</script>
