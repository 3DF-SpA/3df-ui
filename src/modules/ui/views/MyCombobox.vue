<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Combobox } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('combobox');
const { t } = useI18n();

const selectedFramework = ref('');
const selectedLanguage = ref('ts');

const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
];

const languages = [
  { value: 'ts', label: 'TypeScript' },
  { value: 'js', label: 'JavaScript' },
  { value: 'py', label: 'Python' },
  { value: 'rs', label: 'Rust' },
  { value: 'go', label: 'Go' },
  { value: 'java', label: 'Java', disabled: true },
];

const comboboxProps = computed<PropItem[]>(() => [
  {
    name: 'modelValue',
    type: 'string',
    default: "''",
    description: propDesc('modelValue'),
  },
  {
    name: 'options',
    type: 'ComboboxOption[]',
    description: propDesc('options'),
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "'Select option...'",
    description: propDesc('placeholder'),
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    default: "'Search...'",
    description: propDesc('searchPlaceholder'),
  },
  {
    name: 'emptyMessage',
    type: 'string',
    default: "'No results found.'",
    description: propDesc('emptyMessage'),
  },
]);

const basicCode = computed(() => `<Combobox
  v-model="selectedFramework"
  :options="frameworks"
  placeholder="${t('demo.combobox.frameworkPlaceholder')}"
  search-placeholder="${t('demo.combobox.searchFrameworkPlaceholder')}"
  empty-message="${t('demo.combobox.emptyFrameworkMessage')}"
/>`);

const defaultValueCode = computed(() => `<Combobox
  v-model="selectedLanguage"
  :options="languages"
  placeholder="${t('demo.combobox.languagePlaceholder')}"
  search-placeholder="${t('demo.combobox.searchLanguagePlaceholder')}"
  empty-message="${t('demo.combobox.emptyLanguageMessage')}"
/>`);

const multipleCode = computed(() => `<div class="flex flex-wrap gap-4">
  <Combobox
    v-model="selectedFramework"
    :options="frameworks"
    placeholder="${t('demo.combobox.frameworkShortPlaceholder')}"
    class="w-[200px]"
  />
  <Combobox
    v-model="selectedLanguage"
    :options="languages"
    placeholder="${t('demo.combobox.languageShortPlaceholder')}"
    class="w-[200px]"
  />
</div>`);
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      :title="t('views.combobox.title')"
      :description="description"
      import-code="import { Combobox } from '@3df/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('basic')"
      :description="showcaseDesc('basic')"
      :code="basicCode"
    >
      <div class="flex max-w-sm flex-col gap-2">
        <Combobox
          v-model="selectedFramework"
          :options="frameworks"
          :placeholder="t('demo.combobox.frameworkPlaceholder')"
          :search-placeholder="t('demo.combobox.searchFrameworkPlaceholder')"
          :empty-message="t('demo.combobox.emptyFrameworkMessage')"
        />
        <p class="text-muted-foreground text-sm">
          {{ t('demo.combobox.selection') }} <strong>{{ selectedFramework || t('demo.combobox.noSelection') }}</strong>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('defaultValue')"
      :description="showcaseDesc('defaultValue')"
      :code="defaultValueCode"
    >
      <div class="flex max-w-sm flex-col gap-2">
        <Combobox
          v-model="selectedLanguage"
          :options="languages"
          :placeholder="t('demo.combobox.languagePlaceholder')"
          :search-placeholder="t('demo.combobox.searchLanguagePlaceholder')"
          :empty-message="t('demo.combobox.emptyLanguageMessage')"
        />
        <p class="text-muted-foreground text-sm">
          {{ t('demo.combobox.selection') }} <strong>{{ selectedLanguage || t('demo.combobox.noSelection') }}</strong>
        </p>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('multiple')"
      :description="showcaseDesc('multiple')"
      :code="multipleCode"
    >
      <div class="flex flex-wrap gap-4">
        <Combobox
          v-model="selectedFramework"
          :options="frameworks"
          :placeholder="t('demo.combobox.frameworkShortPlaceholder')"
          class="w-[200px]"
        />
        <Combobox
          v-model="selectedLanguage"
          :options="languages"
          :placeholder="t('demo.combobox.languageShortPlaceholder')"
          class="w-[200px]"
        />
      </div>
    </DocShowcase>

    <DocPropsTable :props="comboboxProps" />
  </div>
</template>

