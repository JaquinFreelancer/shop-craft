<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
        <h1 class="mb-6">Hello, Project Vue and Vuetify</h1>
        <v-btn color="primary" @click="handleClick">
          Haz clic aquí
        </v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const handleClick = () => {
  alert('¡Botón de Vuetify funcionando!')
}
</script>

<style scoped>
h1 {
  font-weight: 600;
}
</style>
