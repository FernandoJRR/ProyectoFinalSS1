<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reporte de Movimientos de Ingresos y Egresos</h2>
            <p class="text-sm text-gray-500">Seleccione una fecha para ver los movimientos realizados en las cuentas
                bancarias</p>
        </div>

        <!-- Filtros para seleccionar la fecha -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <form @submit.prevent="filtrarMovimientos">
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
                    Filtrar Movimientos
                </button>
            </form>
        </div>

        <!-- Tabla con los resultados del reporte -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Movimientos hasta la fecha: {{ fechaFiltro }}</h3>

            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha
                            y Hora</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo
                            de Movimiento</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de Cuenta</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(movimiento, index) in movimientosFiltrados" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.fechaHora }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.tipo }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ formatoMoneda(movimiento.monto) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.numeroCuenta }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Mostrar un mensaje si no hay movimientos -->
            <p v-if="movimientosFiltrados.length === 0" class="mt-4 text-center text-gray-500">No se encontraron
                movimientos para la fecha seleccionada.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Estado para almacenar la fecha seleccionada y los movimientos filtrados
const fechaFiltro = ref('');
const movimientosFiltrados = ref([]);

// Datos simulados de movimientos de cuentas bancarias
const movimientos = ref([
    { fechaHora: '2024-10-01 09:30', tipo: 'Ingreso', monto: 100.00, numeroCuenta: 'user123.basic@bancocapital.com' },
    { fechaHora: '2024-10-01 10:15', tipo: 'Egreso', monto: 50.00, numeroCuenta: 'user123.basic@bancocapital.com' },
    { fechaHora: '2024-10-02 14:30', tipo: 'Ingreso', monto: 200.00, numeroCuenta: 'user456.premium@bancocapital.com' },
    { fechaHora: '2024-10-03 12:00', tipo: 'Egreso', monto: 75.00, numeroCuenta: 'user789.plus@bancocapital.com' },
    // Más movimientos simulados...
]);

// Método para filtrar los movimientos por la fecha seleccionada
const filtrarMovimientos = () => {
    if (fechaFiltro.value) {
        movimientosFiltrados.value = movimientos.value.filter(mov => mov.fechaHora.startsWith(fechaFiltro.value));
    }
};

// Método para formatear los montos como moneda
const formatoMoneda = (monto: number) => {
    return `Q${monto.toFixed(2)}`;
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>