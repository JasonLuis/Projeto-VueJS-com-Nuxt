<template>
  <v-container>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="20"
        label="Nome do curso"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </v-text-field>
      <v-text-field
        v-model="preco"
        :error-messages="precoErrors"
        :counter="20"
        type="number"
        label="Preço"
        prefix="R$"
        required
        @input="$v.preco.$touch()"
        @blur="$v.preco.$touch()"
      >
      </v-text-field>
      <v-textarea
        v-model="conteudo"
        :error-messages="conteudoErrors"
        :counter="50"
        name="input-7-1"
        label="Conteudo abordado"
        auto-grow
        required
        @input="$v.conteudo.$touch()"
        @blur="$v.conteudo.$touch()"
      >
      </v-textarea>
      <v-btn color="success" class="mr-4" @click="submit">submit</v-btn>
      <v-btn color="error" @click="clear">Limpar</v-btn>
    </form>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    preco: { required, maxLength: maxLength(10) },
    conteudo: { required, maxLength: maxLength(500) },
  },

  data: () => ({
    name: undefined,
    preco: undefined,
    conteudo: undefined,
    curso: {
      image:
        'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg',
    },
  }),

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Nome não pode ter mais de 20 caracteres')
      !this.$v.name.required && errors.push('Nome é obrigatorio.')
      return errors
    },
    precoErrors() {
      const errors = []
      if (!this.$v.preco.$dirty) return errors
      !this.$v.preco.maxLength &&
        errors.push('Um comentario não pode ter mais de 50 caracteres')
      !this.$v.preco.required && errors.push('Necessario inserir o preço.')
      return errors
    },
    conteudoErrors() {
      const errors = []
      if (!this.$v.conteudo.$dirty) return errors
      !this.$v.conteudo.maxLength &&
        errors.push('O conteudo não pode ter mais de 50 caracteres')
      !this.$v.conteudo.required && errors.push('Conteudo é obrigatorio.')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
      if (
        this.name === undefined ||
        this.name === '' ||
        this.preco === undefined ||
        this.preco === '' ||
        this.conteudo === undefined ||
        this.conteudo === ''
      ) {
        return
      }
      this.curso.name = this.name
      this.curso.preco = this.preco
      this.curso.conteudo = this.conteudo

      this.$emit('add-todo', this.curso)
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.preco = ''
      this.conteudo = ''
    },
  },
}
</script>
