<template>
    <div class="min-h-screen bg-gray-100 p-6">
        <!-- Encabezado -->
        <div class="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 class="text-2xl font-semibold text-gray-800">Reportes Financieros</h2>
            <p class="text-sm text-gray-500">Seleccione el tipo de reporte que desea consultar</p>
        </div>

        <!-- Accesos a los reportes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Acceso al reporte de movimiento ingresos/egresos -->
            <router-link to="/admin/reportes/movimientos"
                class="block bg-white shadow-md rounded-lg p-6 hover:bg-blue-50">
                <h3 class="text-lg font-semibold text-gray-800">Movimientos Ingresos/Egresos</h3>
                <p class="text-sm text-gray-500">Reporte detallado de los movimientos hasta una fecha específica</p>
            </router-link>

            <!-- Acceso al reporte de cuentas congeladas -->
            <router-link to="/admin/reportes/cuentas-congeladas"
                class="block bg-white shadow-md rounded-lg p-6 hover:bg-blue-50">
                <h3 class="text-lg font-semibold text-gray-800">Cuentas Congeladas</h3>
                <p class="text-sm text-gray-500">Cuentas sin movimiento desde su apertura</p>
            </router-link>

            <!-- Acceso al reporte de detalle de cuentas -->
            <router-link to="/admin/reportes/detalle-cuentas"
                class="block bg-white shadow-md rounded-lg p-6 hover:bg-blue-50">
                <h3 class="text-lg font-semibold text-gray-800">Detalle de Cuentas</h3>
                <p class="text-sm text-gray-500">Información detallada de una cuenta específica</p>
            </router-link>

            <!-- Acceso al reporte de cuentas agrupadas por estado -->
            <router-link to="/admin/reportes/cuentas-estado"
                class="block bg-white shadow-md rounded-lg p-6 hover:bg-blue-50">
                <h3 class="text-lg font-semibold text-gray-800">Cuentas Agrupadas por Estado</h3>
                <p class="text-sm text-gray-500">Resumen de cuentas activas, inactivas, y congeladas</p>
            </router-link>

            <!-- Acceso al reporte de cierre de cuentas -->
            <router-link to="/admin/reportes/cierre-cuentas"
                class="block bg-white shadow-md rounded-lg p-6 hover:bg-blue-50">
                <h3 class="text-lg font-semibold text-gray-800">Cierre de Cuentas</h3>
                <p class="text-sm text-gray-500">Reporte relacionado con el cierre de cuentas hasta una fecha</p>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
// Sin necesidad de lógica adicional en esta vista, solo el enrutamiento a los reportes
</script>

<style scoped>
/* Puedes agregar estilos adicionales si es necesario */
</style>