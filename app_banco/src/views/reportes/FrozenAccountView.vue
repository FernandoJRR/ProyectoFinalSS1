<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reporte de Cuentas Congeladas</h2>
            <p class="text-sm text-gray-500">Seleccione una fecha para ver las cuentas que no han tenido movimiento
                desde su apertura</p>
        </div>

        <!-- Filtros para seleccionar la fecha -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <form @submit.prevent="filtrarCuentasCongeladas">
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
                    Filtrar Cuentas Congeladas
                </button>
            </form>
        </div>

        <!-- Tabla con los resultados del reporte -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Cuentas Congeladas hasta la fecha: {{ fechaFiltro }}
            </h3>

            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de Cuenta</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre del Usuario</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha
                            de Creación</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saldo
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(cuenta, index) in cuentasCongeladas" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.numeroCuenta }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.nombreUsuario }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.fechaCreacion }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ formatoMoneda(cuenta.saldo) }}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Mostrar un mensaje si no hay cuentas congeladas -->
            <p v-if="cuentasCongeladas.length === 0" class="mt-4 text-center text-gray-500">No se encontraron cuentas
                congeladas para la fecha seleccionada.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Estado para la fecha de filtro y las cuentas congeladas
const fechaFiltro = ref('');
const cuentasCongeladas = ref([]);

// Datos simulados de cuentas bancarias
const cuentas = ref([
    { numeroCuenta: 'user123.basic@bancocapital.com', nombreUsuario: 'user123', fechaCreacion: '2023-05-01', saldo: 200, ultimoMovimiento: '2023-05-02' },
    { numeroCuenta: 'user456.premium@bancocapital.com', nombreUsuario: 'user456', fechaCreacion: '2023-06-10', saldo: 500, ultimoMovimiento: '2023-06-15' },
    { numeroCuenta: 'user789.plus@bancocapital.com', nombreUsuario: 'user789', fechaCreacion: '2023-07-20', saldo: 1000, ultimoMovimiento: '2023-07-20' },
    { numeroCuenta: 'user234.basic@bancocapital.com', nombreUsuario: 'user234', fechaCreacion: '2023-08-01', saldo: 150, ultimoMovimiento: '2023-08-01' },
    { numeroCuenta: 'user567.premium@bancocapital.com', nombreUsuario: 'user567', fechaCreacion: '2023-04-15', saldo: 0, ultimoMovimiento: '2023-04-15' },
]);

// Método para filtrar las cuentas que no han tenido movimientos desde su apertura
const filtrarCuentasCongeladas = () => {
    if (fechaFiltro.value) {
        cuentasCongeladas.value = cuentas.value.filter(cuenta => {
            // Considerar la cuenta congelada si su último movimiento es igual a la fecha de creación
            // y si no ha tenido movimientos después de esa fecha hasta la fecha de filtro.
            return new Date(cuenta.ultimoMovimiento) <= new Date(fechaFiltro.value) &&
                new Date(cuenta.ultimoMovimiento).getTime() === new Date(cuenta.fechaCreacion).getTime();
        });
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