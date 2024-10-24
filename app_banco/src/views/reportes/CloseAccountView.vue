<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reporte de Cierre de Cuentas</h2>
            <p class="text-sm text-gray-500">Seleccione una fecha para ver las cuentas que han sido cerradas hasta la
                fecha</p>
        </div>

        <!-- Filtros para seleccionar la fecha -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <form @submit.prevent="filtrarCuentasCerradas">
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
                    Filtrar Cuentas Cerradas
                </button>
            </form>
        </div>

        <!-- Tabla con los resultados del reporte -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Cuentas cerradas hasta la fecha: {{ fechaFiltro }}</h3>

            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de Cuenta</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre del Usuario</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha
                            de Cierre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Motivo de Cierre</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(cuenta, index) in cuentasCerradas" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.numeroCuenta }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.nombreUsuario }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.fechaCierre }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.motivoCierre }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Mostrar un mensaje si no hay cuentas cerradas -->
            <p v-if="cuentasCerradas.length === 0" class="mt-4 text-center text-gray-500">No se encontraron cuentas
                cerradas para la fecha seleccionada.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Estado para la fecha de filtro y las cuentas cerradas
const fechaFiltro = ref('');
const cuentasCerradas = ref([]);

// Datos simulados de cuentas cerradas
const cuentas = ref([
    { numeroCuenta: 'user123.basic@bancocapital.com', nombreUsuario: 'user123', fechaCierre: '2024-01-10', motivoCierre: 'Cambio a otro banco' },
    { numeroCuenta: 'user456.premium@bancocapital.com', nombreUsuario: 'user456', fechaCierre: '2024-01-15', motivoCierre: 'Problemas con el servicio' },
    { numeroCuenta: 'user789.plus@bancocapital.com', nombreUsuario: 'user789', fechaCierre: '2024-02-20', motivoCierre: 'Decisión personal' },
    { numeroCuenta: 'user234.basic@bancocapital.com', nombreUsuario: 'user234', fechaCierre: '2024-03-01', motivoCierre: 'Tarifas elevadas' },
    { numeroCuenta: 'user567.premium@bancocapital.com', nombreUsuario: 'user567', fechaCierre: '2024-03-05', motivoCierre: 'Fusión con otra cuenta' },
]);

// Método para filtrar las cuentas cerradas por la fecha seleccionada
const filtrarCuentasCerradas = () => {
    if (fechaFiltro.value) {
        cuentasCerradas.value = cuentas.value.filter(cuenta => new Date(cuenta.fechaCierre) <= new Date(fechaFiltro.value));
    }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>