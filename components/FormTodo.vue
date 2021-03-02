<template>
<v-container >
  <form>
    <v-text-field 
      v-model="name"
      :error-messages="nameErrors"
      :counter="20"
      filled
      label="Nome"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>

    <v-textarea
      v-model="comment"
      :error-messages="commentErrors"
      :counter="50"
      name="input-7-1"
      filled
      label="Comentarios"
      auto-grow
      required
       @input="$v.comment.$touch()"
      @blur="$v.comment.$touch()"
    ></v-textarea>
    <v-btn
      class="mr-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      Limpar
    </v-btn>
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
      comment: { required, maxLength: maxLength(50) }
    },

    data: () => ({
      name: undefined,
      comment: undefined,
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Nome não pode ter mais de 20 caracteres')
        !this.$v.name.required && errors.push('Nome é obrigatorio.')
        return errors
      },
      commentErrors() {
        const errors = []
        if (!this.$v.comment.$dirty) return errors
        !this.$v.comment.maxLength && errors.push('Um comentario não pode ter mais de 50 caracteres')
        !this.$v.comment.required && errors.push('Comentario é obrigatorio.')
        return errors
      },
    },

    methods: {
      submit () {
        
        if(this.name.trim() === '' || this.comment.trim() === ''){
          return 
        }else{
          this.$emit('add-todo', {
            name: this.name,
            comment: this.comment,
          });
          this.clear();
        }

        
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.comment = ''
      },
    },
  }
</script>

