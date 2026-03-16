<script setup lang="ts">
import { ref } from 'vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const tabsProps: PropItem[] = [
  {
    name: 'modelValue',
    type: 'string',
    default: 'undefined',
    description: 'Pestaña activa (modo controlado)',
  },
  {
    name: 'defaultValue',
    type: 'string',
    default: 'undefined',
    description: 'Pestaña activa inicial (modo no controlado)',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Orientación del conjunto de pestañas',
  },
];

const triggerProps: PropItem[] = [
  {
    name: 'value',
    type: 'string',
    default: '—',
    description: 'Valor único que identifica esta pestaña (requerido)',
  },
  {
    name: 'variant',
    type: "'underline' | 'pill' | 'card'",
    default: "'underline'",
    description: 'Estilo visual del trigger',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita la pestaña',
  },
];

const basicCode = `<Tabs default-value="cuenta">
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
<\/script>

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
</template>`;

const activeTab = ref('a');
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Tabs"
      description="Pestañas de navegación que organizan el contenido en secciones intercambiables."
      import-code="import { Tabs, TabsList, TabsTrigger, TabsContent } from '@3df/ui'"
    />

    <DocPropsTable title="Tabs props" :props="tabsProps" />
    <DocPropsTable title="TabsTrigger props" :props="triggerProps" />

    <DocShowcase
      title="Underline (default)"
      description="Estilo con línea inferior, ideal para navegación de contenido."
      :code="basicCode"
    >
      <Tabs default-value="cuenta">
        <TabsList>
          <TabsTrigger value="cuenta">Cuenta</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones" disabled>Notificaciones</TabsTrigger>
        </TabsList>
        <TabsContent value="cuenta">
          <p class="text-muted-foreground pt-2 text-sm">Gestiona la configuración de tu cuenta y preferencias de usuario.</p>
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
      title="Pill"
      description="Estilo de píldora con fondo activo, ideal para filtros o selectores compactos."
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
      title="Card"
      description="Estilo de tarjeta elevada, ideal para contenedores tipo preview/code."
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
      title="Vertical"
      description="Orientación vertical, ideal para paneles de configuración."
      :code="verticalCode"
    >
      <Tabs default-value="perfil" orientation="vertical">
        <TabsList class="h-auto w-36 flex-col items-start gap-0.5 border-b-0 pb-0">
          <TabsTrigger value="perfil" class="w-full justify-start">Perfil</TabsTrigger>
          <TabsTrigger value="privacidad" class="w-full justify-start">Privacidad</TabsTrigger>
          <TabsTrigger value="apariencia" class="w-full justify-start">Apariencia</TabsTrigger>
        </TabsList>
        <div class="flex-1 pt-0">
          <TabsContent value="perfil"><p class="text-muted-foreground text-sm">Configuración de perfil público y avatar.</p></TabsContent>
          <TabsContent value="privacidad"><p class="text-muted-foreground text-sm">Control de visibilidad y datos compartidos.</p></TabsContent>
          <TabsContent value="apariencia"><p class="text-muted-foreground text-sm">Selecciona tema claro, oscuro o personalizado.</p></TabsContent>
        </div>
      </Tabs>
    </DocShowcase>

    <DocShowcase
      title="Controlado (v-model)"
      description="Modo controlado con v-model para sincronizar el estado externamente."
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
