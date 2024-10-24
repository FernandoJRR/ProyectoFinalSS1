<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado del Dashboard -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reporte de Movimientos</h2>
            <p class="text-sm text-gray-500">Consulta de ingresos y egresos de cuentas bancarias</p>
        </div>

        <!-- Filtros de búsqueda -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between">
            <div class="w-full md:w-1/3 mb-4 md:mb-0">
                <label class="block text-sm font-medium text-gray-700">Número de cuenta</label>
                <input v-model="filters.accountNumber" type="text"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Ej: user123.basic@bancocapital.com" />
            </div>
            <div class="w-full md:w-1/3 mb-4 md:mb-0">
                <label class="block text-sm font-medium text-gray-700">Fecha límite</label>
                <input v-model="filters.endDate" type="date"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="w-full md:w-1/3 mb-4 md:mb-0">
                <label class="block text-sm font-medium text-gray-700">Tipo de cuenta</label>
                <select v-model="filters.accountType"
                    class="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm">
                    <option value="">Todos</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="plus">Plus</option>
                </select>
            </div>
            <button @click="fetchReport"
                class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                Generar Reporte
            </button>
        </div>

        <!-- Sección de resumen -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div class="bg-white p-6 shadow-md rounded-lg">
                <h3 class="text-lg font-medium text-gray-700">Total Ingresos</h3>
                <p class="mt-2 text-2xl font-semibold text-green-500">{{ formatCurrency(report.totalIngresos) }}</p>
            </div>
            <div class="bg-white p-6 shadow-md rounded-lg">
                <h3 class="text-lg font-medium text-gray-700">Total Egresos</h3>
                <p class="mt-2 text-2xl font-semibold text-red-500">{{ formatCurrency(report.totalEgresos) }}</p>
            </div>
            <div class="bg-white p-6 shadow-md rounded-lg">
                <h3 class="text-lg font-medium text-gray-700">Saldo Neto</h3>
                <p class="mt-2 text-2xl font-semibold" :class="netBalanceClass">{{ formatCurrency(netBalance) }}</p>
            </div>
        </div>

        <!-- Tabla de movimientos -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hora
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tipo de Movimiento
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monto
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de cuenta
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(movimiento, index) in report.movimientos" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.fecha }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.hora }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.tipo }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ formatCurrency(movimiento.monto) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ movimiento.numeroCuenta }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Datos simulados para el reporte
const filters = ref({
    accountNumber: '',
    endDate: '',
    accountType: '', // nuevo filtro para el tipo de cuenta
});

const report = ref({
    totalIngresos: 0,
    totalEgresos: 0,
    movimientos: [
        { fecha: '2024-10-10', hora: '14:30', tipo: 'Ingreso', monto: 5000, numeroCuenta: 'user123.basic@bancocapital.com' },
        { fecha: '2024-10-11', hora: '10:00', tipo: 'Egreso', monto: 1200, numeroCuenta: 'user456.premium@bancocapital.com' },
        { fecha: '2024-10-12', hora: '08:45', tipo: 'Ingreso', monto: 3000, numeroCuenta: 'user789.plus@bancocapital.com' },
        { fecha: '2024-10-13', hora: '16:00', tipo: 'Egreso', monto: 1500, numeroCuenta: 'user123.basic@bancocapital.com' },
    ],
});

const fetchReport = () => {
    // Aquí iría la lógica para generar el reporte basado en los filtros ingresados.
    console.log('Generando reporte para:', filters.value);
    // Simulación de datos:
    report.value.totalIngresos = 8000;
    report.value.totalEgresos = 2700;
};

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-GT', { style: 'currency', currency: 'GTQ' }).format(value);
};

const netBalance = computed(() => report.value.totalIngresos - report.value.totalEgresos);

const netBalanceClass = computed(() => {
    return netBalance.value >= 0 ? 'text-green-500' : 'text-red-500';
});
</script>

<style scoped>
/* Estilos adicionales si lo necesitas */
</style>