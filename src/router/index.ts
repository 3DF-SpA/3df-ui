import { createRouter, createWebHistory } from 'vue-router';

import UiLayout from '@/modules/ui/UiLayout.vue';
import MyBadges from '@/modules/ui/views/MyBadges.vue';
import MyButton from '@/modules/ui/views/MyButton.vue';

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
          component: MyButton,
        },

        {
          path: '/badges',
          name: 'MyBadges',
          component: MyBadges,
        },
      ],
    },
  ],
});

export default router;
