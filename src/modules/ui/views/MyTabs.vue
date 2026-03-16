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

const basicCode= `<Tabs default-value="cuenta">
  <TabsList>
    <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
    <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
    <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
  </TabsList>
  <TabsContent value="cuenta">
    <p class="text-muted-foreground text-sm">Gestiona la configuración de tu cuenta.</p>
  </TabsContent>
  <TabsContent value="seguridad">
    <p class="text-muted-foreground text-sm">Cambia tu contraseña y configura 2FA.</p>
  </TabsContent>
  <TabsContent value="notificaciones">
    <p class="text-muted-foreground text-sm">Elige qué notificaciones quieres recibir.</p>
  </TabsContent>
</Tabs>`;

const pillCode = `<Tabs default-value="dia">
  <TabsList>
    <TabsTrigger value="dia" variant="pill">Día</TabsTrigger>
    <TabsTrigger value="semana" variant="pill">Semana</TabsTrigger>
    <TabsTrigger value="mes" variant="pill">Mes</TabsTrigger>
  </TabsList>
  <TabsContent value="dia">Vista del día</TabsContent>
  <TabsContent value="semana">Vista de la semana</TabsContent>
  <TabsContent value="mes">Vista del mes</TabsContent>
</Tabs>`;

const cardCode = `<Tabs default-value="codigo">
  <TabsList class="bg-muted rounded-lg p-1">
    <TabsTrigger value="preview" variant="card">Preview</TabsTrigger>
    <TabsTrigger value="codigo" variant="card">Código</TabsTrigger>
  </TabsList>
  <TabsContent value="preview">Vista previa del componente</TabsContent>
  <TabsContent value="codigo">Código fuente aquí</TabsContent>
</Tabs>`;

const verticalCode = `<Tabs default-value="perfil" orientation="vertical" class="gap-6">
  <TabsList class="flex-col h-auto w-40 border-r-ui border-border">
    <TabsTrigger value="perfil">Perfil</TabsTrigger>
    <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
    <TabsTrigger value="apariencia">Apariencia</TabsTrigger>
  </TabsList>
  <TabsContent value="perfil">Configuración de perfil</TabsContent>
  <TabsContent value="privacidad">Opciones de privacidad</TabsContent>
  <TabsContent value="apariencia">Temas y colores</TabsContent>
</Tabs>`;

const controlledCode = `<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('a');
<` + `/script>


<template>
  <Tabs v-model="activeTab">
    <TabsList>
      <TabsTrigger value="a">Pestaña A</TabsTrigger>
      <TabsTrigger value="b">Pestaña B</TabsTrigger>
    </TabsList>
    <TabsContent value="a">Contenido A</TabsContent>
    <TabsContent value="b">Contenido B</TabsContent>
  </Tabs>
  <p>Activa: {{ activeTab }}</p>
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
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones" disabled>Notificaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="cuenta">
          <p class="text-muted-foreground pt-2 text-sm">{{ t('demo.tabs.accountSettings') }}</p>
        </TabsContent>
        <TabsContent value="seguridad">
          <p class="text-muted-foreground pt-2 text-sm">Cambia tu contraseña y activa la autenticación de dos factores.</p>
        </TabsContent>
        <TabsContent value="notificaciones">
          <p class="text-muted-foreground pt-2 text-sm">Elige qué notificaciones quieres recibir por email y push.</p>
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
          <TabsTrigger value="dia" variant="pill">Día</TabsTrigger>
          <TabsTrigger value="semana" variant="pill">Semana</TabsTrigger>
          <TabsTrigger value="mes" variant="pill">Mes</TabsTrigger>
          <TabsTrigger value="año" variant="pill">Año</TabsTrigger>
        </TabsList>
        <TabsContent value="dia"><p class="text-muted-foreground pt-2 text-sm">Datos del día de hoy.</p></TabsContent>
        <TabsContent value="semana"><p class="text-muted-foreground pt-2 text-sm">Datos de la semana actual.</p></TabsContent>
        <TabsContent value="mes"><p class="text-muted-foreground pt-2 text-sm">Datos del mes en curso.</p></TabsContent>
        <TabsContent value="año"><p class="text-muted-foreground pt-2 text-sm">Datos del año completo.</p></TabsContent>
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
          <TabsTrigger value="codigo" variant="card">Código</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div class="bg-card border-ui border-border mt-2 rounded-lg p-6">
            <p class="text-muted-foreground text-sm">Vista previa del componente aquí.</p>
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
          <TabsContent value="privacy"><p class="text-muted-foreground text-sm">{{ t('demo.tabs.privacy') }}</p></TabsContent>
          <TabsContent value="appearance"><p class="text-muted-foreground text-sm">{{ t('demo.tabs.appearance') }}</p></TabsContent>
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
            <TabsTrigger value="a">Pestaña A</TabsTrigger>
            <TabsTrigger value="b">Pestaña B</TabsTrigger>
          </TabsList>
          <TabsContent value="a"><p class="text-muted-foreground pt-2 text-sm">Contenido de la pestaña A.</p></TabsContent>
          <TabsContent value="b"><p class="text-muted-foreground pt-2 text-sm">Contenido de la pestaña B.</p></TabsContent>
        </Tabs>
        <p class="text-muted-foreground text-xs">Pestaña activa: <code class="text-foreground">{{ activeTab }}</code></p>
      </div>
    </DocShowcase>
  </div>
</template>
