<template>
  <v-container>
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="20"
        filled
        label="Nome"
        equired@input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </v-text-field>
      <v-textarea
        v-model="preco"
        :error-messages="precoErrors"
        :counter="50"
        name="input-7-1"
        filled
        label="Preço"
        auto-grow
        required@input="$v.preco.$touch()"
        @blur="$v.preco.$touch()"
      >
      </v-textarea>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
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
    preco: { required, maxLength: maxLength(50) },
  },

  data: () => ({
    name: undefined,
    preco: undefined,
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
      !this.$v.preco.required && errors.push('Comentario é obrigatorio.')
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
        this.preco === ''
      ) {
        return
      }
      this.$emit('add-todo', {
        name: this.name,
        preco: this.preco,
      })
      this.clear()
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.preco = ''
    },
  },
}
</script>
