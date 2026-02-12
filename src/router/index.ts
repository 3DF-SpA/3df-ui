import { createRouter, createWebHistory } from 'vue-router';

const UiLayout = () => import('@/modules/ui/layouts/UiLayout.vue');
const ChartLayout = () => import('@/modules/charts/layouts/ChartLayout.vue');

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
          component: () => import('@/modules/ui/views/MyDropdown.vue'),
        },

        {
          path: '/popover',
          name: 'MyPopover',
          component: () => import('@/modules/ui/views/MyPopover.vue'),
        },

        {
          path: '/sonner',
          name: 'MySonner',
          component: () => import('@/modules/ui/views/MySonner.vue'),
        },

        {
          path: '/alerts',
          name: 'MyAlerts',
          component: () => import('@/modules/ui/views/MyAlerts.vue'),
        },
        {
          path: '/tooltip',
          name: 'MyTooltip',
          component: () => import('@/modules/ui/views/MyTooltip.vue'),
        },

        {
          path: '/toggle',
          name: 'MyToggle',
          component: () => import('@/modules/ui/views/MyToggle.vue'),
        },

        {
          path: '/tables',
          name: 'MyTables',
          component: () => import('@/modules/ui/views/MyTables.vue'),
        },

        {
          path: '/slider',
          name: 'MySlider',
          component: () => import('@/modules/ui/views/MySlider.vue'),
        },

        {
          path: '/skeleton',
          name: 'MySkeleton',
          component: () => import('@/modules/ui/views/MySkeleton.vue'),
        },

        {
          path: '/sidebar',
          name: 'MySidebar',
          component: () => import('@/modules/ui/views/MySidebar.vue'),
        },

        {
          path: '/sheet',
          name: 'MySheet',
          component: () => import('@/modules/ui/views/MySheet.vue'),
        },

        {
          path: '/separator',
          name: 'MySeparator',
          component: () => import('@/modules/ui/views/MySeparator.vue'),
        },

        {
          path: '/scroll-area',
          name: 'MyScrollArea',
          component: () => import('@/modules/ui/views/MyScrollArea.vue'),
        },

        {
          path: '/progress',
          name: 'MyProgress',
          component: () => import('@/modules/ui/views/MyProgress.vue'),
        },

        {
          path: '/pagination',
          name: 'MyPagination',
          component: () => import('@/modules/ui/views/MyPagination.vue'),
        },

        {
          path: '/navigation',
          name: 'MyNavigationMenu',
          component: () => import('@/modules/ui/views/MyNavigationMenu.vue'),
        },

        {
          path: '/menubar',
          name: 'MyMenubar',
          component: () => import('@/modules/ui/views/MyMenubar.vue'),
        },

        {
          path: '/kbd',
          name: 'MyKbd',
          component: () => import('@/modules/ui/views/MyKbd.vue'),
        },

        {
          path: '/item',
          name: 'MyItem',
          component: () => import('@/modules/ui/views/MyItem.vue'),
        },

        {
          path: '/otp',
          name: 'MyOtp',
          component: () => import('@/modules/ui/views/MyInputOtp.vue'),
        },

        {
          path: '/hover-card',
          name: 'MyHoverCard',
          component: () => import('@/modules/ui/views/MyHoverCard.vue'),
        },

        {
          path: '/empty',
          name: 'MyEmpty',
          component: () => import('@/modules/ui/views/MyEmpty.vue'),
        },

        {
          path: '/drawer',
          name: 'MyDrawer',
          component: () => import('@/modules/ui/views/MyDrawer.vue'),
        },

        {
          path: '/dialog',
          name: 'MyDialog',
          component: () => import('@/modules/ui/views/MyDialog.vue'),
        },

        {
          path: '/datepicker',
          name: 'MyDatePicker',
          component: () => import('@/modules/ui/views/MyDatePicker.vue'),
        },

        {
          path: '/context-menu',
          name: 'MyContextMenu',
          component: () => import('@/modules/ui/views/MyContextMenu.vue'),
        },

        {
          path: '/command',
          name: 'MyCommand',
          component: () => import('@/modules/ui/views/MyCommand.vue'),
        },

        {
          path: '/combo-box',
          name: 'MyCombobox',
          component: () => import('@/modules/ui/views/MyCombobox.vue'),
        },

        {
          path: '/collapsible',
          name: 'MyCollapsible',
          component: () => import('@/modules/ui/views/MyCollapsible.vue'),
        },

        {
          path: '/carousel',
          name: 'MyCarousel',
          component: () => import('@/modules/ui/views/MyCarousel.vue'),
        },

        {
          path: '/breadcrumb',
          name: 'MyBreadcrumb',
          component: () => import('@/modules/ui/views/MyBreadcrumb.vue'),
        },

        {
          path: '/avatar',
          name: 'MyAvatar',
          component: () => import('@/modules/ui/views/MyAvatar.vue'),
        },

        {
          path: '/alert-dialog',
          name: 'MyAlertDialog',
          component: () => import('@/modules/ui/views/MyAlertDialog.vue'),
        },

        {
          path: '/accordion',
          name: 'MyAccordion',
          component: () => import('@/modules/ui/views/MyAccordion.vue'),
        },

      ],
    },

    {
      path: '/charts',
      name: 'charts',
      component: ChartLayout,
      children: [
        {
          path: 'chartbar',
          name: 'chartbar',
          component: () => import('@/modules/charts/views/ChartBar.vue'),
        },
        {
          path: 'chartline',
          name: 'chartline',
          component: () => import('@/modules/charts/views/ChartLine.vue'),
        },
        {
          path: 'piechart',
          name: 'piechart',
          component: () => import('@/modules/charts/views/PieChart.vue'),
        },
        {
          path: 'radarchart',
          name: 'radarchart',
          component: () => import('@/modules/charts/views/RadarChart.vue'),
        },
        {
          path: 'scatterplot',
          name: 'scatterplot',
          component: () => import('@/modules/charts/views/ScatterPlot.vue'),
        },
        {
          path: 'gaugeradial',
          name: 'gaugeradial',
          component: () => import('@/modules/charts/views/GaugeRadial.vue'),
        },
      ],
    }
  ],
});

export default router;
