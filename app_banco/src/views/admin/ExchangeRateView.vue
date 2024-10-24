<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Ajuste del Tipo de Cambio</h2>
            <p class="text-sm text-gray-500">Modifique las tasas de cambio actuales para dólares y euros</p>
        </div>

        <!-- Formulario para ajustar el tipo de cambio -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <form @submit.prevent="guardarTipoDeCambio">
                <!-- Tipo de cambio para dólares -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Tipo de cambio (Dólares a Quetzales)</label>
                    <input v-model.number="tipoCambio.dolar" type="number" step="0.01"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: 7.50" required />
                </div>

                <!-- Tipo de cambio para euros -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Tipo de cambio (Euros a Quetzales)</label>
                    <input v-model.number="tipoCambio.euro" type="number" step="0.01"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: 10.00" required />
                </div>

                <!-- Botón para guardar los cambios -->
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    Guardar Cambios
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Estado para el tipo de cambio
const tipoCambio = ref({
    dolar: 7.50, // Valor por defecto
    euro: 10.00, // Valor por defecto
});

// Método para guardar el tipo de cambio
const guardarTipoDeCambio = () => {
    console.log('Nuevo tipo de cambio guardado:');
    console.log('Dólares a Quetzales:', tipoCambio.value.dolar);
    console.log('Euros a Quetzales:', tipoCambio.value.euro);
    // Aquí puedes hacer una llamada a la API o realizar otra acción para guardar los valores
};
</script>

<style scoped>
/* Estilos adicionales si lo necesitas */
</style>