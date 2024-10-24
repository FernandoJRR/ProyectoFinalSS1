<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Cambiar Tipo de Cuenta</h2>
            <p class="text-sm text-gray-500">Busque una cuenta para cambiar su tipo de cuenta</p>
        </div>

        <!-- Buscador de cuenta -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Buscar Cuenta</label>
                <div class="flex space-x-2">
                    <input v-model="busqueda" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: user123.basic@bancocapital.com" />
                    <button @click="buscarCuenta"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                        Buscar
                    </button>
                </div>
                <p v-if="cuentaEncontrada" class="mt-2 text-sm text-green-600">Cuenta encontrada: {{
                    cuentaEncontrada.cuenta }} ({{ cuentaEncontrada.tipoCuenta }})</p>
                <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
            </div>
        </div>

        <!-- Formulario para cambiar el tipo de cuenta (solo si se encontró la cuenta) -->
        <div v-if="cuentaEncontrada" class="bg-white shadow-md rounded-lg p-6">
            <form @submit.prevent="cambiarTipoCuenta">
                <!-- Mostrar información de saldo actual -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Saldo Actual</label>
                    <p class="mt-1 text-lg font-semibold">Q{{ cuentaEncontrada.saldo }}</p>
                </div>

                <!-- Seleccionar el nuevo tipo de cuenta -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Nuevo Tipo de Cuenta</label>
                    <select v-model="nuevoTipoCuenta"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required>
                        <option v-for="(tipo, index) in tiposDeCuentaValidos" :key="index" :value="tipo">{{
                            tipoLabel(tipo) }}</option>
                    </select>
                </div>

                <!-- Selección de eliminación o conservación de cuenta anterior -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">¿Desea conservar la cuenta anterior?</label>
                    <select v-model="conservarCuentaAnterior"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <!-- Botón para cambiar el tipo de cuenta -->
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    Confirmar Cambio de Tipo de Cuenta
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// Simulación de cuentas existentes
const cuentas = ref([
    { cuenta: 'user123.basic@bancocapital.com', tipoCuenta: 'basic', saldo: 200 },
    { cuenta: 'user456.premium@bancocapital.com', tipoCuenta: 'premium', saldo: 500 },
    { cuenta: 'user789.plus@bancocapital.com', tipoCuenta: 'plus', saldo: 1000 },
]);

// Tasa de cambio simulada
const tasasCambio = {
    basic: 1, // 1 quetzal
    premium: 7.50, // 1 dólar = 7.50 quetzales
    plus: 10.00, // 1 euro = 10.00 quetzales
};

// Estado para la búsqueda de la cuenta
const busqueda = ref('');
const cuentaEncontrada = ref<any | null>();
const error = ref('');

// Estado para el nuevo tipo de cuenta
const nuevoTipoCuenta = ref('basic');
const conservarCuentaAnterior = ref('si');

const tiposDeCuenta = ['basic', 'premium', 'plus'];

const tiposDeCuentaValidos = computed(() => {
    return tiposDeCuenta.filter(tipo => tipo !== cuentaEncontrada.value?.tipoCuenta);
});

const tipoLabel = (tipo: string) => {
    switch (tipo) {
        case 'basic':
            return 'Basic (Quetzales)';
        case 'premium':
            return 'Premium (Dólares)';
        case 'plus':
            return 'Plus (Euros)';
        default:
            return 'Desconocido';
    }
};

// Método para buscar la cuenta
const buscarCuenta = () => {
    const cuenta = cuentas.value.find(c => c.cuenta.toLowerCase() === busqueda.value.toLowerCase());
    if (cuenta) {
        cuentaEncontrada.value = cuenta;
        error.value = ''; // Limpiar el mensaje de error
    } else {
        cuentaEncontrada.value = null;
        error.value = 'Cuenta no encontrada. Por favor, verifique el número de cuenta.';
    }
};

// Método para cambiar el tipo de cuenta
const cambiarTipoCuenta = () => {
    if (cuentaEncontrada.value) {
        const saldoActual = cuentaEncontrada.value.saldo;
        const tipoActual = cuentaEncontrada.value.tipoCuenta;
        const tasaActual = tasasCambio[tipoActual];
        const tasaNueva = tasasCambio[nuevoTipoCuenta.value];

        // Convertir el saldo actual al nuevo tipo de cuenta
        const saldoConvertido = (saldoActual / tasaActual) * tasaNueva;

        // Actualizar la cuenta con el nuevo tipo y saldo
        cuentaEncontrada.value.tipoCuenta = nuevoTipoCuenta.value;
        cuentaEncontrada.value.saldo = saldoConvertido;

        alert(`La cuenta ${cuentaEncontrada.value.cuenta} ha sido cambiada a ${nuevoTipoCuenta.value}. Nuevo saldo: ${nuevoTipoCuenta.value === 'basic' ? 'Q' : (nuevoTipoCuenta.value === 'premium' ? '$' : '€')}${saldoConvertido.toFixed(2)}`);

        // Si el administrador decide no conservar la cuenta anterior, puede eliminarla
        if (conservarCuentaAnterior.value === 'no') {
            const index = cuentas.value.indexOf(cuentaEncontrada.value);
            if (index !== -1) {
                cuentas.value.splice(index, 1);
            }
        }
    }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>