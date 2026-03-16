<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.reference.title') }}</h2>

    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-border border-b">
            <th class="pr-4 pb-2 font-medium">{{ t('demo.component') }}</th>
            <th class="pr-4 pb-2 font-medium">{{ t('demo.navigationMenu.reference.element') }}</th>
            <th class="pr-4 pb-2 font-medium">Props</th>
            <th class="pb-2 font-medium">{{ t('demo.description') }}</th>
          </tr>
        </thead>
        <tbody class="text-muted-foreground">
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenu</td>
            <td class="py-2 pr-4"><code>&lt;nav&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuDesc') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuList</td>
            <td class="py-2 pr-4"><code>&lt;ul&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuListDesc') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuItem</td>
            <td class="py-2 pr-4"><code>&lt;li&gt;</code></td>
            <td class="py-2 pr-4">value, class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuItemDesc') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuTrigger</td>
            <td class="py-2 pr-4"><code>&lt;button&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuTriggerDesc') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuContent</td>
            <td class="py-2 pr-4"><code>&lt;div&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuContentDesc') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuLink</td>
            <td class="py-2 pr-4"><code>&lt;a&gt;</code></td>
            <td class="py-2 pr-4">as, active, class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuLinkDesc') }}</td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">NavigationMenuViewport</td>
            <td class="py-2 pr-4"><code>&lt;div&gt;</code></td>
            <td class="py-2 pr-4">class</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.navigationMenuViewportDesc') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="space-y-4">
    <h2 class="text-xl font-semibold">{{ t('demo.navigationMenu.reference.interactionTitle') }}</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-border border-b">
            <th class="pr-4 pb-2 font-medium">{{ t('demo.navigationMenu.reference.action') }}</th>
            <th class="pb-2 font-medium">{{ t('demo.navigationMenu.reference.behavior') }}</th>
          </tr>
        </thead>
        <tbody class="text-muted-foreground">
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Hover trigger</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.hoverTriggerBehavior') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Hover content</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.hoverContentBehavior') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Click trigger</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.clickTriggerBehavior') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Click outside</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.clickOutsideBehavior') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Enter / Space</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.enterSpaceBehavior') }}</td>
          </tr>
          <tr class="border-border/50 border-b">
            <td class="py-2 pr-4 font-mono text-xs">Arrow Down</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.arrowDownBehavior') }}</td>
          </tr>
          <tr>
            <td class="py-2 pr-4 font-mono text-xs">Escape</td>
            <td class="py-2">{{ t('demo.navigationMenu.reference.escapeBehavior') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
