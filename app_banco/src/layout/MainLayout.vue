<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navbar parametrizado según el rol del usuario -->
        <Navbar :isAdmin="isAdmin" />

        <!-- Contenido principal donde se renderizan las vistas -->
        <div class="flex-grow">
            <router-view />
        </div>

        <!-- Pie de página opcional -->
        <footer class="bg-gray-800 text-white text-center py-4">
            © 2024 Banco Capital - Todos los derechos reservados
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/MainNavbar.vue'; // El navbar parametrizado

// Simulación de si el usuario es administrador o no
const isAdmin = ref(true); // Cambiar dinámicamente según el rol del usuario
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>