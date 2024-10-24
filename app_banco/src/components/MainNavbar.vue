<template>
    <nav class="shadow-md">
        <div class="container mx-auto flex justify-between items-center p-4">
            <!-- Logo o Inicio -->
            <router-link to="/" class="text-2xl font-semibold hover:text-gray-300">Banco
                Capital</router-link>

            <!-- Menú de navegación -->
            <div class="flex space-x-6">
                <!-- Opciones según el rol del usuario -->
                <router-link v-if="isAdmin" to="/admin/dashboard"
                    class="bg-blue-100 hover:bg-blue-500 py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                    Dashboard Admin
                </router-link>

                <router-link v-if="!isAdmin" to="/cliente/movimientos"
                    class="bg-blue-100 hover:bg-blue-500 py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                    Mis Movimientos
                </router-link>

                <router-link v-if="isAdmin" to="/admin/cuentas"
                    class="bg-blue-100 hover:bg-blue-500 py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                    Administrar Cuentas
                </router-link>

                <router-link v-if="!isAdmin" to="/cliente/cuentas"
                    class="bg-blue-700 hover:bg-blue-500 py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                    Mis Cuentas
                </router-link>
            </div>

            <!-- Perfil y Cerrar sesión -->
            <div class="flex items-center space-x-6">
                <router-link to="/perfil"
                    class="bg-white hover:bg-gray-300 text-blue-600 py-2 px-4 rounded-md shadow-md transition-transform transform hover:scale-105">
                    Perfil
                </router-link>
                <button @click="logout"
                    class="bg-red-200 hover:bg-red-500 py-2 px-4 rounded-md shadow-lg transition-transform transform hover:scale-105">
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Propiedad que indica si el usuario es administrador o no
const props = defineProps({
    isAdmin: {
        type: Boolean,
        required: true,
    },
});

// Método de cierre de sesión (puede ser implementado según tu lógica)
const logout = () => {
    console.log('Cerrar sesión');
};
</script>

<style scoped>
/* Estilos adicionales para el fondo y la textura */
.nav-button {
    background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent);
    background-size: 20px 20px;
}
</style>