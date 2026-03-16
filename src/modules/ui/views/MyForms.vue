<script setup lang="ts">
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';

import FormsDemoCheckbox from './_components/FormsDemoCheckbox.vue';
import FormsDemoComplete from './_components/FormsDemoComplete.vue';
import FormsDemoInputs from './_components/FormsDemoInputs.vue';
import FormsDemoRadioSwitch from './_components/FormsDemoRadioSwitch.vue';
import FormsDemoTextareaSelect from './_components/FormsDemoTextareaSelect.vue';

const formProps: PropItem[] = [
  {
    name: 'Input: modelValue',
    type: 'string | number',
    default: "''",
    description: 'Valor del input (v-model)',
  },
  {
    name: 'Input: size',
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    description: 'Tamaño del input',
  },
  {
    name: 'Select: modelValue',
    type: 'string',
    default: "''",
    description: 'Valor seleccionado (v-model)',
  },
  {
    name: 'Select: placeholder',
    type: 'string',
    default: "'Select an option'",
    description: 'Texto placeholder',
  },
  {
    name: 'Select: disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita el select',
  },
  { name: 'SelectItem: value', type: 'string', description: 'Valor de la opción' },
  {
    name: 'SelectItem: disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita la opción',
  },
  {
    name: 'Checkbox: modelValue',
    type: 'boolean',
    default: 'false',
    description: 'Estado checked (v-model)',
  },
  {
    name: 'Checkbox: indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Estado indeterminado',
  },
  {
    name: 'Textarea: modelValue',
    type: 'string',
    default: "''",
    description: 'Contenido del textarea (v-model)',
  },
  {
    name: 'Radio: modelValue',
    type: 'string',
    description: 'Valor seleccionado del grupo (v-model)',
  },
  { name: 'Radio: value', type: 'string', description: 'Valor de esta opción' },
  {
    name: 'Switch: modelValue',
    type: 'boolean',
    default: 'false',
    description: 'Estado on/off (v-model)',
  },
  {
    name: 'Label: disabled',
    type: 'boolean',
    default: 'false',
    description: 'Aplica estilo deshabilitado',
  },
];
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Formularios"
      description="Componentes de formulario: Input, Textarea, Select, Checkbox, Radio y Switch."
      import-code="import { Input, Label, Select, SelectItem, Checkbox, Radio, Switch, Textarea, Button } from '@3df/ui'"
    />
    <FormsDemoInputs />
    <FormsDemoTextareaSelect />
    <FormsDemoCheckbox />
    <FormsDemoRadioSwitch />
    <FormsDemoComplete />
    <DocPropsTable :props="formProps" />
  </div>
</template>
