<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado de la vista -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Zona de Cuentas</h2>
            <p class="text-sm text-gray-500">Administración de cuentas bancarias</p>
        </div>

        <!-- Formulario para crear o editar cuentas -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">{{ isEditing ? 'Editar Cuenta' : 'Crear Cuenta' }}</h3>
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
                    <input v-model="cuenta.nombreUsuario" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Nombre del usuario" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Tipo de cuenta</label>
                    <select v-model="cuenta.tipoCuenta"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                        @change="updateTarifa">
                        <option value="basic">Basic (Quetzales)</option>
                        <option value="premium">Premium (Dólares)</option>
                        <option value="plus">Plus (Euros)</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Nombre del Banco</label>
                    <input v-model="cuenta.nombreBanco" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: Banco Capital" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Email de Contacto</label>
                    <input v-model="cuenta.email" type="text"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Ej: correo@correo.com" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Tarifa para abrir cuenta</label>
                    <p class="mt-1 text-lg font-semibold">{{ tarifaApertura }}</p>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Notificar por correo (NotifyMe)</label>
                    <input v-model="cuenta.notifyMe" type="checkbox" class="mt-1" />
                    <span class="ml-2 text-sm text-gray-600">Enviar correos electrónicos por cada ingreso o
                        egreso</span>
                </div>
                <button type="submit"
                    class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all">
                    {{ isEditing ? 'Guardar Cambios' : 'Crear Cuenta' }}
                </button>
                <button v-if="isEditing" @click="cancelEdit" type="button"
                    class="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-all">
                    Cancelar
                </button>
            </form>
        </div>

        <!-- Listado de cuentas -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-4">Listado de Cuentas</h3>
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cuenta</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banco
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            NotifyMe</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(cuenta, index) in cuentas" :key="index">
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.cuenta }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ tipoCuentaLabel(cuenta.tipoCuenta) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.nombreBanco }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">{{ cuenta.notifyMe ? 'Sí' : 'No' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="editCuenta(index)"
                                class="bg-yellow-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-yellow-600 transition-all">
                                Editar
                            </button>
                            <button @click="confirmarEliminacion(index)"
                                class="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:bg-red-600 transition-all ml-2">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalClosingMotive :isVisible="isModalVisible" @confirmar="eliminarCuenta" @cancelar="cerrarModal" />
    </div>
</template>

<script setup lang="ts">
import ModalClosingMotive from '@/components/ModalClosingMotive.vue';
import { ref } from 'vue';

// Datos simulados para las cuentas
const cuentas = ref([
    { nombreUsuario: 'user123', cuenta: 'user123.basic@bancocapital.com', tipoCuenta: 'basic', email: 'correo@correo.com', nombreBanco: 'Banco Capital', notifyMe: true },
    { nombreUsuario: 'user456', cuenta: 'user456.premium@bancocapital.com', tipoCuenta: 'premium', email: 'correo@correo.com', nombreBanco: 'Banco Capital', notifyMe: false },
    { nombreUsuario: 'user789', cuenta: 'user789.plus@bancocapital.com', tipoCuenta: 'plus', email: 'correo@correo.com', nombreBanco: 'Banco Capital', notifyMe: true },
]);

const isEditing = ref(false);
const cuenta = ref({
    nombreUsuario: '',
    cuenta: '',
    email: '',
    tipoCuenta: 'basic',
    nombreBanco: '',
    notifyMe: false,
});
const editIndex = ref<number | null>(null);

// Estado del modal y cuenta seleccionada
const isModalVisible = ref(false);
const cuentaSeleccionada = ref<number | null>(null);

const confirmarEliminacion = (index: number) => {
    cuentaSeleccionada.value = index;
    isModalVisible.value = true;
};

const eliminarCuenta = (motivo: string) => {
    if (cuentaSeleccionada.value !== null) {
        // Eliminar la cuenta y procesar el motivo
        console.log('Cuenta eliminada:', cuentas.value[cuentaSeleccionada.value]);
        console.log('Motivo de cierre:', motivo);
        cuentas.value.splice(cuentaSeleccionada.value, 1);
        cerrarModal();
    }
};

const cerrarModal = () => {
    isModalVisible.value = false;
};
// Tarifa de apertura basada en el tipo de cuenta
const tarifaApertura = ref('Q200.00');

const fomatearNombreBanco = (nombre: string) => {
    // Eliminar cualquier espacio adicional o caracteres especiales y convertir a un array de letras
    const letras = nombre.replace(/\s+/g, '').split('');

    // Formato "anbece"
    const formatoJunto = letras.join('').toLowerCase();

    return formatoJunto;
}

const handleSubmit = () => {
    if (isEditing.value && editIndex.value !== null) {
        cuentas.value[editIndex.value] = { ...cuenta.value };
    } else {
        const nombreBanco = fomatearNombreBanco(cuenta.value.nombreBanco);
        cuenta.value.cuenta = `${cuenta.value.nombreUsuario.toLowerCase()}.${cuenta.value.tipoCuenta}@${nombreBanco}.com`
        cuentas.value.push({ ...cuenta.value });
    }
    resetForm();
};


const editCuenta = (index: number) => {
    isEditing.value = true;
    editIndex.value = index;
    cuenta.value = { ...cuentas.value[index] };
    updateTarifa();
};

const cancelEdit = () => {
    resetForm();
};

const resetForm = () => {
    cuenta.value = { nombreUsuario: '', cuenta: '', tipoCuenta: 'basic', email: '', nombreBanco: '', notifyMe: false };
    isEditing.value = false;
    editIndex.value = null;
    updateTarifa();
};

// Helper para mostrar el tipo de cuenta en formato legible
const tipoCuentaLabel = (tipoCuenta: string) => {
    switch (tipoCuenta) {
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

// Actualiza la tarifa de apertura según el tipo de cuenta
const updateTarifa = () => {
    switch (cuenta.value.tipoCuenta) {
        case 'basic':
            tarifaApertura.value = 'Q200.00';
            break;
        case 'premium':
            tarifaApertura.value = '$50.00';
            break;
        case 'plus':
            tarifaApertura.value = '€50.00';
            break;
        default:
            tarifaApertura.value = 'Desconocido';
    }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>