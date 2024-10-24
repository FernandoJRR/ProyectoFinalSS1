<template>
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div class="flex justify-center mb-5">
                <img src="@/assets/img/logo.png" alt="Logo Banco Capital" class="h-40 w-auto md:h-60" />
            </div>
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <form @submit.prevent="handleLogin">
                    <div class="px-5 py-7">
                        <div class="mb-4">
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">Usuario</label>
                            <input v-model="user.username" type="text"
                                class="border rounded-lg px-3 py-2 mt-1 text-sm w-full" placeholder="Ingresa tu usuario"
                                required />
                        </div>
                        <div class="mb-4">
                            <label class="font-semibold text-sm text-gray-600 pb-1 block">PIN</label>
                            <input v-model="user.pin" type="password"
                                class="border rounded-lg px-3 py-2 mt-1 text-sm w-full" placeholder="Ingresa tu PIN"
                                required />
                        </div>
                        <button type="submit"
                            class="transition duration-200 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold text-center inline-block">
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                <div class="px-5 py-5">
                    <button @click="sendPinReminder"
                        class="text-blue-500 hover:underline text-sm font-semibold block text-center">
                        Recordatorio de PIN
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'LoginView',
    setup() {
        const user = ref({
            username: '',
            pin: '',
        });

        const handleLogin = () => {
            // Lógica para el inicio de sesión
            console.log('Iniciando sesión con:', user.value);
        };

        const sendPinReminder = () => {
            // Lógica para enviar el recordatorio de PIN
            console.log('Recordatorio de PIN enviado a:', user.value.username);
        };

        return {
            user,
            handleLogin,
            sendPinReminder,
        };
    },
});
</script>

<style scoped>
/* Puedes agregar más estilos personalizados aquí si lo necesitas */
</style>