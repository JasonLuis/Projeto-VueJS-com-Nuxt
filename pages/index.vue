<template>
  <v-row justify="center" align="center">
    <v-main>
      <div class="container">
        <v-row>
          <h1>Cadastro de cursos</h1>
        </v-row>
        <v-row>
          <Comments />
        </v-row>
      </div>
    </v-main>
  </v-row>
</template>

<script>
import Comments from '~/components/Comments.vue'

export default {
  components: {
    Comments,
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
