<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Aumentar/Reducir Saldo</h2>
            <p class="text-sm text-gray-500">Busque una cuenta para modificar su saldo</p>
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

        <!-- Formulario para aumentar/reducir saldo (solo si se encontró la cuenta) -->
        <div v-if="cuentaEncontrada" class="bg-white shadow-md rounded-lg p-6">
            <form @submit.prevent="ajustarSaldo">
                <!-- Monto para aumentar/reducir -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Monto</label>
                    <input v-model.number="monto" type="number" step="0.01"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: 100.00" required />
                </div>

                <!-- Seleccionar si se aumenta o reduce el saldo -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Acción</label>
                    <select v-model="accion"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required>
                        <option value="aumentar">Aumentar Saldo</option>
                        <option value="reducir">Reducir Saldo</option>
                    </select>
                </div>

                <!-- Botón para guardar los cambios -->
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    Confirmar Ajuste de Saldo
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Simulación de cuentas existentes
const cuentas = ref([
    { cuenta: 'user123.basic@bancocapital.com', tipoCuenta: 'basic', saldo: 200 },
    { cuenta: 'user456.premium@bancocapital.com', tipoCuenta: 'premium', saldo: 500 },
    { cuenta: 'user789.plus@bancocapital.com', tipoCuenta: 'plus', saldo: 1000 },
]);

// Estado para la búsqueda de la cuenta y el ajuste de saldo
const busqueda = ref('');
const cuentaEncontrada = ref<any | null>();
const error = ref('');
const monto = ref(0.00);
const accion = ref('aumentar'); // 'aumentar' o 'reducir'

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

// Método para ajustar el saldo
const ajustarSaldo = () => {
    if (cuentaEncontrada.value) {
        if (accion.value === 'aumentar') {
            cuentaEncontrada.value.saldo += monto.value;
            alert(`Se ha aumentado el saldo de la cuenta ${cuentaEncontrada.value.cuenta} en Q${monto.value}. Saldo actual: Q${cuentaEncontrada.value.saldo}`);
        } else if (accion.value === 'reducir') {
            cuentaEncontrada.value.saldo -= monto.value;
            if (cuentaEncontrada.value.saldo < 0) cuentaEncontrada.value.saldo = 0; // No permitir saldo negativo
            alert(`Se ha reducido el saldo de la cuenta ${cuentaEncontrada.value.cuenta} en Q${monto.value}. Saldo actual: Q${cuentaEncontrada.value.saldo}`);
        }
    }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>