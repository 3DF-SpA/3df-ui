import { createRouter, createWebHistory } from 'vue-router';

import UiLayout from '@/modules/ui/UiLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ui',
      component: UiLayout,
      children: [
        {
          path: '',
          name: 'MyButtons',
          component: () => import('@/modules/ui/views/MyButton.vue'),
        },

        {
          path: '/badges',
          name: 'MyBadges',
          component: () => import('@/modules/ui/views/MyBadges.vue'),
        },

        {
          path: '/forms',
          name: 'MyForms',
          component: () => import('@/modules/ui/views/MyForms.vue'),
        },

        {
          path: '/cards',
          name: 'MyCards',
          component: () => import('@/modules/ui/views/MyCards.vue'),
        },

        {
          path: '/dropdown',
          name: 'MyDropdown',
          component: () => import('@/modules/ui/views/MyDrapdown.vue'),
        },
      ],
    },
  ],
});

export default router;
