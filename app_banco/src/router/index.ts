import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginLayout from '@/layout/LoginLayout.vue'
import MainLayout from '@/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
          layout: LoginLayout
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/reporte',
      name: 'reporte',
      component: () => import('../views/ReportView.vue')
    },
    {
      path: '/admin/login',
      name: 'login-admin',
      meta: {
          layout: LoginLayout
      },
      component: () => import('../views/admin/AdminLoginView.vue')
    },
    {
      path: '/admin/cuentas',
      name: 'cuentas',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/admin/AccountsView.vue')
    },
    {
      path: '/admin/tipo-cambio',
      name: 'tipo-cambio',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/admin/ExchangeRateView.vue')
    },
    {
      path: '/admin/saldo-cuenta',
      name: 'saldo-cuenta',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/admin/AccountBalanceView.vue')
    },
    {
      path: '/admin/cambio-cuenta',
      name: 'cambio-cuenta',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/admin/AccountChangeView.vue')
    },
    {
      path: '/admin/reportes',
      name: 'reportes',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/reportes/ReportsView.vue')
    },
    {
      path: '/admin/reportes/movimientos',
      name: 'reportes-movimientos',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/reportes/MovementsView.vue')
    },
    {
      path: '/admin/reportes/cuentas-congeladas',
      name: 'reportes-cuentas-congeladas',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/reportes/FrozenAccountView.vue')
    },
    {
      path: '/admin/reportes/cuentas-estado',
      name: 'reportes-cuentas-estado',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/reportes/StateAccountView.vue')
    },
    {
      path: '/admin/reportes/cierre-cuentas',
      name: 'reportes-cierre-cuentas',
      meta: {
          layout: MainLayout
      },
      component: () => import('../views/reportes/CloseAccountView.vue')
    },
  ]
})

export default router
