<script setup lang="ts">
import { computed } from 'vue';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

import FormsDemoCheckbox from './_components/FormsDemoCheckbox.vue';
import FormsDemoComplete from './_components/FormsDemoComplete.vue';
import FormsDemoInputs from './_components/FormsDemoInputs.vue';
import FormsDemoRadioSwitch from './_components/FormsDemoRadioSwitch.vue';
import FormsDemoTextareaSelect from './_components/FormsDemoTextareaSelect.vue';

const { description, propDesc } = useDocPage('forms');

const formProps = computed<PropItem[]>(() => [
  {
    name: 'Input: modelValue',
    type: 'string | number',
    default: "''",
    description: propDesc('inputModelValue'),
  },
  {
    name: 'Input: size',
    type: "'default' | 'sm' | 'lg'",
    default: "'default'",
    description: propDesc('inputSize'),
  },
  {
    name: 'Select: modelValue',
    type: 'string',
    default: "''",
    description: propDesc('selectModelValue'),
  },
  {
    name: 'Select: placeholder',
    type: 'string',
    default: "'Select an option'",
    description: propDesc('placeholder'),
  },
  {
    name: 'Select: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('selectDisabled'),
  },
  { name: 'SelectItem: value', type: 'string', description: propDesc('selectItemValue') },
  {
    name: 'SelectItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('selectItemDisabled'),
  },
  {
    name: 'Checkbox: modelValue',
    type: 'boolean',
    default: 'false',
    description: propDesc('checkboxModelValue'),
  },
  {
    name: 'Checkbox: indeterminate',
    type: 'boolean',
    default: 'false',
    description: propDesc('indeterminate'),
  },
  {
    name: 'Textarea: modelValue',
    type: 'string',
    default: "''",
    description: propDesc('Textarea: modelValue'),
  },
  {
    name: 'Radio: modelValue',
    type: 'string',
    description: propDesc('Radio: modelValue'),
  },
  { name: 'Radio: value', type: 'string', description: propDesc('Radio: value') },
  {
    name: 'Switch: modelValue',
    type: 'boolean',
    default: 'false',
    description: propDesc('Switch: modelValue'),
  },
  {
    name: 'Label: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('Label: disabled'),
  },
]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Formularios"
      :description="description"
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
