<template>
    <!-- Modal Container -->
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <!-- Background overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>

        <!-- Modal box -->
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 z-60 relative">
            <h3 class="text-lg font-semibold mb-4">Motivo de Cierre</h3>
            <textarea v-model="motivo" placeholder="Escribe el motivo de cierre"
                class="w-full h-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div class="mt-4 flex justify-end space-x-2">
                <button @click="cancelar"
                    class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all">
                    Cancelar
                </button>
                <button @click="confirmar"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
                    Confirmar Cierre
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
    isVisible: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['confirmar', 'cancelar']);

const motivo = ref('');

const confirmar = () => {
    emit('confirmar', motivo.value);
    motivo.value = '';
};

const cancelar = () => {
    emit('cancelar');
    motivo.value = '';
};
</script>

<style scoped>
/* Estilos para asegurar la superposición */
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}
</style>