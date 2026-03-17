<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('tabs');

const tabsProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    default: 'undefined',
    description: propDesc('modelValue'),
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    description: propDesc('defaultValue'),
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: propDesc('orientation'),
  },
]);

const triggerProps= computed<PropItem[]>(() => [
  {
    name: 'value',
    type: 'string',
    default: '—',
    description: propDesc('value'),
  },
  {
    name: 'variant',
    type: "'underline' | 'pill' | 'card'",
    default: "'underline'",
    description: propDesc('variant'),
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('disabled'),
  },
]);

const basicCode= `<Tabs default-value="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p class="text-muted-foreground text-sm">Manage your account settings.</p>
  </TabsContent>
  <TabsContent value="security">
    <p class="text-muted-foreground text-sm">Change your password and set up 2FA.</p>
  </TabsContent>
  <TabsContent value="notifications">
    <p class="text-muted-foreground text-sm">Choose what notifications you want to receive.</p>
  </TabsContent>
</Tabs>`;

const pillCode = `<Tabs default-value="day">
  <TabsList>
    <TabsTrigger value="day" variant="pill">Day</TabsTrigger>
    <TabsTrigger value="week" variant="pill">Week</TabsTrigger>
    <TabsTrigger value="month" variant="pill">Month</TabsTrigger>
  </TabsList>
  <TabsContent value="day">Day view</TabsContent>
  <TabsContent value="week">Week view</TabsContent>
  <TabsContent value="month">Month view</TabsContent>
</Tabs>`;

const cardCode = `<Tabs default-value="code">
  <TabsList class="bg-muted rounded-lg p-1">
    <TabsTrigger value="preview" variant="card">Preview</TabsTrigger>
    <TabsTrigger value="code" variant="card">Code</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Component preview</TabsContent>
  <TabsContent value="code">Source code here</TabsContent>
</Tabs>`;

const verticalCode = `<Tabs default-value="profile" orientation="vertical" class="gap-6">
  <TabsList class="flex-col h-auto w-40 border-r-ui border-border">
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="privacy">Privacy</TabsTrigger>
    <TabsTrigger value="appearance">Appearance</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile settings</TabsContent>
  <TabsContent value="privacy">Privacy options</TabsContent>
  <TabsContent value="appearance">Themes and colors</TabsContent>
</Tabs>`;

const controlledCode = `<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('a');
<` + `/script>


<template>
  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="a">Tab A</TabsTrigger>
      <TabsTrigger value="b">Tab B</TabsTrigger>
    </TabsList>
    <TabsContent value="a">Content A</TabsContent>
    <TabsContent value="b">Content B</TabsContent>
  </Tabs>
  <p>Active: {{ activeTab }}</p>
<` + `/template>`;

const activeTab = ref('a');
const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Tabs"
      :description="description"
      import-code="import { Tabs, TabsList, TabsTrigger, TabsContent } from '@3df/ui'"
    />

    <DocPropsTable title="Tabs props" :props="tabsProps" />
    <DocPropsTable title="TabsTrigger props" :props="triggerProps" />

    <DocShowcase
      :title="showcaseTitle('underline')"
      :description="showcaseDesc('underline')"
      :code="basicCode"
    >
      <Tabs default-value="cuenta">
        <TabsList>
          <TabsTrigger value="cuenta">{{ t('demo.tabs.account') }}</TabsTrigger>
          <TabsTrigger value="seguridad">{{ t('demo.tabs.security') }}</TabsTrigger>
          <TabsTrigger value="notificaciones" disabled>{{ t('demo.tabs.notifications') }}</TabsTrigger>
        </TabsList>
        <TabsContent value="cuenta">
          <p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.accountSettings') }}</p>
        </TabsContent>
        <TabsContent value="seguridad">
          <p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.securityDesc') }}</p>
        </TabsContent>
        <TabsContent value="notificaciones">
          <p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.notificationsTabDesc') }}</p>
        </TabsContent>
      </Tabs>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('pill')"
      :description="showcaseDesc('pill')"
      :code="pillCode"
    >
      <Tabs default-value="dia">
        <TabsList class="gap-1 border-none">
          <TabsTrigger value="dia" variant="pill">{{ t('demo.tabs.day') }}</TabsTrigger>
          <TabsTrigger value="semana" variant="pill">{{ t('demo.tabs.week') }}</TabsTrigger>
          <TabsTrigger value="mes" variant="pill">{{ t('demo.tabs.month') }}</TabsTrigger>
          <TabsTrigger value="year" variant="pill">{{ t('demo.tabs.year') }}</TabsTrigger>
        </TabsList>
        <TabsContent value="dia"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.dayData') }}</p></TabsContent>
        <TabsContent value="semana"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.weekData') }}</p></TabsContent>
        <TabsContent value="mes"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.monthData') }}</p></TabsContent>
        <TabsContent value="year"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.yearData') }}</p></TabsContent>
      </Tabs>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('card')"
      :description="showcaseDesc('card')"
      :code="cardCode"
    >
      <Tabs default-value="codigo">
        <TabsList class="bg-muted rounded-lg p-1 border-none gap-1">
          <TabsTrigger value="preview" variant="card">Preview</TabsTrigger>
          <TabsTrigger value="codigo" variant="card">{{ t('demo.tabs.codeTab') }}</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div class="bg-card border-ui border-border mt-2 rounded-lg p-6">
            <p class="text-muted-foreground text-sm">{{ t('demo.tabs.previewContent') }}</p>
          </div>
        </TabsContent>
        <TabsContent value="codigo">
          <div class="bg-muted mt-2 rounded-lg p-4 font-mono text-sm">
            &lt;Button&gt;Click&lt;/Button&gt;
          </div>
        </TabsContent>
      </Tabs>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('vertical')"
      :description="showcaseDesc('vertical')"
      :code="verticalCode"
    >
      <Tabs default-value="profile" orientation="vertical">
        <TabsList class="h-auto w-36 flex-col items-start gap-0.5 border-b-0 pb-0">
          <TabsTrigger value="profile" class="w-full justify-start">{{ t('demo.tabs.profile') }}</TabsTrigger>
          <TabsTrigger value="privacy" class="w-full justify-start">{{ t('demo.tabs.privacy') }}</TabsTrigger>
          <TabsTrigger value="appearance" class="w-full justify-start">{{ t('demo.tabs.appearance') }}</TabsTrigger>
        </TabsList>
        <div class="flex-1 pt-0">
          <TabsContent value="profile"><p class="text-muted-foreground text-sm">{{ t('demo.tabs.profileDesc') }}</p></TabsContent>
          <TabsContent value="privacy"><p class="text-muted-foreground text-sm">{{ t('demo.tabs.privacyDesc') }}</p></TabsContent>
          <TabsContent value="appearance"><p class="text-muted-foreground text-sm">{{ t('demo.tabs.appearanceDesc') }}</p></TabsContent>
        </div>
      </Tabs>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('controlled')"
      :description="showcaseDesc('controlled')"
      :code="controlledCode"
    >
      <div class="flex flex-col gap-3">
        <Tabs v-model="activeTab">
          <TabsList>
            <TabsTrigger value="a">{{ t('demo.tabs.tabA') }}</TabsTrigger>
            <TabsTrigger value="b">{{ t('demo.tabs.tabB') }}</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.tabAContent') }}</p></TabsContent>
          <TabsContent value="b"><p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.tabBContent') }}</p></TabsContent>
        </Tabs>
        <p class="text-muted-foreground text-xs">{{ t('demo.tabs.activeTab') }} <code class="text-foreground">{{ activeTab }}</code></p>
      </div>
    </DocShowcase>
  </div>
</template>
