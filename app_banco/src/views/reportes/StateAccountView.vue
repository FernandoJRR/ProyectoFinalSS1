<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reporte de Cuentas Agrupadas por Estado</h2>
            <p class="text-sm text-gray-500">Seleccione una fecha para ver el estado de las cuentas agrupadas</p>
        </div>

        <!-- Filtros para seleccionar la fecha -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <form @submit.prevent="filtrarCuentas">
                <!-- Fecha -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Seleccionar Fecha</label>
                    <input v-model="fechaFiltro" type="date"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required />
                </div>
                <!-- Botón para filtrar -->
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    Filtrar Estado de Cuentas
                </button>
            </form>
        </div>

        <!-- Resultados del reporte -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Estado de Cuentas hasta la fecha: {{ fechaFiltro }}
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <!-- Total de cuentas activas -->
                <div class="bg-green-100 p-4 rounded-lg shadow">
                    <h4 class="text-xl font-semibold text-green-600">Cuentas Activas</h4>
                    <p class="mt-2 text-3xl font-bold">{{ cuentasActivas }}</p>
                </div>

                <!-- Total de cuentas inactivas -->
                <div class="bg-yellow-100 p-4 rounded-lg shadow">
                    <h4 class="text-xl font-semibold text-yellow-600">Cuentas Inactivas</h4>
                    <p class="mt-2 text-3xl font-bold">{{ cuentasInactivas }}</p>
                </div>

                <!-- Total de cuentas congeladas -->
                <div class="bg-blue-100 p-4 rounded-lg shadow">
                    <h4 class="text-xl font-semibold text-blue-600">Cuentas Congeladas</h4>
                    <p class="mt-2 text-3xl font-bold">{{ cuentasCongeladas }}</p>
                </div>
            </div>

            <!-- Mostrar un mensaje si no hay cuentas registradas -->
            <p v-if="totalCuentas === 0" class="mt-6 text-center text-gray-500">No se encontraron cuentas para la fecha
                seleccionada.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Estado para la fecha de filtro
const fechaFiltro = ref('');

// Datos simulados de cuentas bancarias
const cuentas = ref([
    { numeroCuenta: 'user123.basic@bancocapital.com', estado: 'activa', ultimoMovimiento: '2023-09-01' },
    { numeroCuenta: 'user456.premium@bancocapital.com', estado: 'inactiva', ultimoMovimiento: '2022-12-15' },
    { numeroCuenta: 'user789.plus@bancocapital.com', estado: 'congelada', ultimoMovimiento: '2023-07-20' },
    { numeroCuenta: 'user234.basic@bancocapital.com', estado: 'activa', ultimoMovimiento: '2023-08-01' },
    { numeroCuenta: 'user567.premium@bancocapital.com', estado: 'activa', ultimoMovimiento: '2023-08-15' },
]);

// Variables para almacenar los totales de cada estado
const cuentasActivas = ref(0);
const cuentasInactivas = ref(0);
const cuentasCongeladas = ref(0);

// Computed para el total de cuentas
const totalCuentas = computed(() => cuentasActivas.value + cuentasInactivas.value + cuentasCongeladas.value);

// Método para filtrar las cuentas por la fecha seleccionada y contar los estados
const filtrarCuentas = () => {
    if (fechaFiltro.value) {
        // Reiniciar contadores
        cuentasActivas.value = 0;
        cuentasInactivas.value = 0;
        cuentasCongeladas.value = 0;

        // Recorrer las cuentas y contar los estados
        cuentas.value.forEach(cuenta => {
            if (new Date(cuenta.ultimoMovimiento) <= new Date(fechaFiltro.value)) {
                switch (cuenta.estado) {
                    case 'activa':
                        cuentasActivas.value++;
                        break;
                    case 'inactiva':
                        cuentasInactivas.value++;
                        break;
                    case 'congelada':
                        cuentasCongeladas.value++;
                        break;
                }
            }
        });
    }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>