import { createRouter, createWebHistory } from 'vue-router';

const AppLayout = () => import('@/layouts/AppLayout.vue');

const uiRoutes = [

  { path: 'button', name: 'Button', component: () => import('@/modules/ui/views/MyButton.vue'), meta: { group: 'General' } },
  { path: 'badge', name: 'Badge', component: () => import('@/modules/ui/views/MyBadges.vue'), meta: { group: 'General' } },
  { path: 'avatar', name: 'Avatar', component: () => import('@/modules/ui/views/MyAvatar.vue'), meta: { group: 'General' } },
  { path: 'kbd', name: 'Kbd', component: () => import('@/modules/ui/views/MyKbd.vue'), meta: { group: 'General' } },
  { path: 'separator', name: 'Separator', component: () => import('@/modules/ui/views/MySeparator.vue'), meta: { group: 'General' } },
  { path: 'skeleton', name: 'Skeleton', component: () => import('@/modules/ui/views/MySkeleton.vue'), meta: { group: 'General' } },
  { path: 'logos', name: 'Logos', component: () => import('@/modules/ui/views/MyLogos.vue'), meta: { group: 'General' } },
  { path: 'hero', name: 'Hero', component: () => import('@/modules/ui/views/MyHero.vue'), meta: { group: 'General' } },

  { path: 'card', name: 'Card', component: () => import('@/modules/ui/views/MyCards.vue'), meta: { group: 'Layout' } },
  { path: 'accordion', name: 'Accordion', component: () => import('@/modules/ui/views/MyAccordion.vue'), meta: { group: 'Layout' } },
  { path: 'collapsible', name: 'Collapsible', component: () => import('@/modules/ui/views/MyCollapsible.vue'), meta: { group: 'Layout' } },
  { path: 'carousel', name: 'Carousel', component: () => import('@/modules/ui/views/MyCarousel.vue'), meta: { group: 'Layout' } },
  { path: 'scroll-area', name: 'ScrollArea', component: () => import('@/modules/ui/views/MyScrollArea.vue'), meta: { group: 'Layout' } },
  { path: 'table', name: 'Table', component: () => import('@/modules/ui/views/MyTables.vue'), meta: { group: 'Layout' } },
  { path: 'sidebar', name: 'Sidebar', component: () => import('@/modules/ui/views/MySidebar.vue'), meta: { group: 'Layout' } },
  { path: 'item', name: 'Item', component: () => import('@/modules/ui/views/MyItem.vue'), meta: { group: 'Layout' } },
  { path: 'empty', name: 'Empty', component: () => import('@/modules/ui/views/MyEmpty.vue'), meta: { group: 'Layout' } },
  { path: 'banner', name: 'Banner', component: () => import('@/modules/ui/views/MyBanners.vue'), meta: { group: 'Layout' } },

  { path: 'input', name: 'Input / Textarea', component: () => import('@/modules/ui/views/MyForms.vue'), meta: { group: 'Formularios' } },
  { path: 'combobox', name: 'Combobox', component: () => import('@/modules/ui/views/MyCombobox.vue'), meta: { group: 'Formularios' } },
  { path: 'datepicker', name: 'DatePicker', component: () => import('@/modules/ui/views/MyDatePicker.vue'), meta: { group: 'Formularios' } },
  { path: 'slider', name: 'Slider', component: () => import('@/modules/ui/views/MySlider.vue'), meta: { group: 'Formularios' } },
  { path: 'toggle', name: 'Toggle', component: () => import('@/modules/ui/views/MyToggle.vue'), meta: { group: 'Formularios' } },
  { path: 'otp', name: 'Input OTP', component: () => import('@/modules/ui/views/MyInputOtp.vue'), meta: { group: 'Formularios' } },

  { path: 'breadcrumb', name: 'Breadcrumb', component: () => import('@/modules/ui/views/MyBreadcrumb.vue'), meta: { group: 'Navegación' } },
  { path: 'navigation-menu', name: 'NavigationMenu', component: () => import('@/modules/ui/views/MyNavigationMenu.vue'), meta: { group: 'Navegación' } },
  { path: 'menubar', name: 'Menubar', component: () => import('@/modules/ui/views/MyMenubar.vue'), meta: { group: 'Navegación' } },
  { path: 'pagination', name: 'Pagination', component: () => import('@/modules/ui/views/MyPagination.vue'), meta: { group: 'Navegación' } },
  { path: 'command', name: 'Command', component: () => import('@/modules/ui/views/MyCommand.vue'), meta: { group: 'Navegación' } },

  { path: 'dialog', name: 'Dialog', component: () => import('@/modules/ui/views/MyDialog.vue'), meta: { group: 'Overlay' } },
  { path: 'drawer', name: 'Drawer', component: () => import('@/modules/ui/views/MyDrawer.vue'), meta: { group: 'Overlay' } },
  { path: 'sheet', name: 'Sheet', component: () => import('@/modules/ui/views/MySheet.vue'), meta: { group: 'Overlay' } },
  { path: 'alert-dialog', name: 'AlertDialog', component: () => import('@/modules/ui/views/MyAlertDialog.vue'), meta: { group: 'Overlay' } },
  { path: 'dropdown', name: 'Dropdown', component: () => import('@/modules/ui/views/MyDropdown.vue'), meta: { group: 'Overlay' } },
  { path: 'context-menu', name: 'ContextMenu', component: () => import('@/modules/ui/views/MyContextMenu.vue'), meta: { group: 'Overlay' } },
  { path: 'popover', name: 'Popover', component: () => import('@/modules/ui/views/MyPopover.vue'), meta: { group: 'Overlay' } },
  { path: 'hover-card', name: 'HoverCard', component: () => import('@/modules/ui/views/MyHoverCard.vue'), meta: { group: 'Overlay' } },
  { path: 'tooltip', name: 'Tooltip', component: () => import('@/modules/ui/views/MyTooltip.vue'), meta: { group: 'Overlay' } },

  { path: 'alert', name: 'Alert', component: () => import('@/modules/ui/views/MyAlerts.vue'), meta: { group: 'Feedback' } },
  { path: 'sonner', name: 'Sonner (Toast)', component: () => import('@/modules/ui/views/MySonner.vue'), meta: { group: 'Feedback' } },
  { path: 'progress', name: 'Progress', component: () => import('@/modules/ui/views/MyProgress.vue'), meta: { group: 'Feedback' } },
];

const chartRoutes = [
  { path: 'bar', name: 'Bar Chart', component: () => import('@/modules/charts/views/ChartBar.vue'), meta: { group: 'Charts' } },
  { path: 'line', name: 'Line Chart', component: () => import('@/modules/charts/views/ChartLine.vue'), meta: { group: 'Charts' } },
  { path: 'pie', name: 'Pie Chart', component: () => import('@/modules/charts/views/PieChart.vue'), meta: { group: 'Charts' } },
  { path: 'radar', name: 'Radar Chart', component: () => import('@/modules/charts/views/RadarChart.vue'), meta: { group: 'Charts' } },
  { path: 'scatter', name: 'Scatter Plot', component: () => import('@/modules/charts/views/ScatterPlot.vue'), meta: { group: 'Charts' } },
  { path: 'gauge', name: 'Gauge / Radial', component: () => import('@/modules/charts/views/GaugeRadial.vue'), meta: { group: 'Charts' } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        { path: '', redirect: '/ui/button' },

        {
          path: 'ui',
          children: [
            { path: '', redirect: '/ui/button' },
            ...uiRoutes,
          ],
        },

        {
          path: 'charts',
          children: [
            { path: '', redirect: '/charts/bar' },
            ...chartRoutes,
          ],
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export { uiRoutes, chartRoutes };
export default router;
