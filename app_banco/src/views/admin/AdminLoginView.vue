<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div class="flex justify-center mb-5">
                <img src="@/assets/img/logo.png" alt="Banco Capital" class="h-40 w-auto md:h-60" />
            </div>
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form @submit.prevent="handleAdminLogin">
                    <div class="px-5 py-7">
                        <div class="mb-4">
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">Usuario Administrador</label>
                            <input v-model="admin.username" type="text"
                                class="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                                placeholder="Ingresa tu usuario de administrador" required />
                        </div>
                        <div class="mb-4">
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">Contraseña</label>
                            <input v-model="admin.password" type="password"
                                class="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                                placeholder="Ingresa tu contraseña" required />
                        </div>
                        <button type="submit"
                            class="transition duration-200 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block">
                            Iniciar Sesión como Administrador
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const admin = ref({
    username: '',
    password: '',
});

const handleAdminLogin = () => {
    // Lógica para el inicio de sesión del administrador
    console.log('Iniciando sesión como administrador:', admin.value);
};
</script>

<style scoped>
/* Estilos adicionales si lo necesitas */
</style>