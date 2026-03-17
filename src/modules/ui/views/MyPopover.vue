<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import PopoverDemoRichContent from './_components/PopoverDemoRichContent.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('popover');

const { t } = useI18n();

const popoverProps = computed<PropItem[]>(() => [
  {
    name: 'Popover: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'Popover: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'PopoverContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: propDesc('align'),
  },
  {
    name: 'PopoverContent: side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: propDesc('side'),
  },
  {
    name: 'PopoverContent: sideOffset',
    type: 'number',
    default: '8',
    description: propDesc('sideOffset'),
  },
  {
    name: 'PopoverContent: viewportPadding',
    type: 'number',
    default: '8',
    description: propDesc('viewportPadding'),
  },
]);

const basicCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Abrir popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p class="text-sm">Contenido del popover.</p>
  </PopoverContent>
</Popover>`;

const formCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Configuración</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="grid gap-3">
      <div class="grid grid-cols-3 items-center gap-4">
        <Label class="text-right">Ancho</Label>
        <Input class="col-span-2 h-8" value="100%" />
      </div>
    </div>
  </PopoverContent>
</Popover>`;

const alignCode = `<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`;

const sideCode = `<PopoverContent side="top">
  Se abre hacia arriba. Si no cabe, auto-flip a abajo.
</PopoverContent>`;

const anatomyCode = `<Popover>
  <PopoverTrigger />
  <PopoverContent>
    <!-- contenido -->
  </PopoverContent>
</Popover>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Popover"
      :description="description"
      import-code="import { Popover, PopoverTrigger, PopoverContent } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">{{ t('demo.openPopover') }}</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div class="flex flex-col gap-2">
            <h3 class="text-sm font-medium">{{ t('demo.popover.dimensions') }}</h3>
            <p class="text-muted-foreground text-sm">{{ t('demo.popover.dimensionsDesc') }}</p>
          </div>
        </PopoverContent>
      </Popover>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withForm')" :code="formCode">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">{{ t('demo.popover.settings') }}</Button>
        </PopoverTrigger>
        <PopoverContent class="w-80">
          <div class="flex flex-col gap-4">
            <div>
              <h3 class="text-sm font-medium">{{ t('demo.popover.dimensions') }}</h3>
              <p class="text-muted-foreground text-sm">{{ t('demo.popover.dimensionsDesc') }}</p>
            </div>
            <div class="grid gap-3">
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">{{ t('demo.popover.width') }}</Label>
                <Input class="col-span-2 h-8" value="100%" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">{{ t('demo.popover.maxWidth') }}</Label>
                <Input class="col-span-2 h-8" value="300px" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">{{ t('demo.popover.height') }}</Label>
                <Input class="col-span-2 h-8" value="25px" />
              </div>
              <div class="grid grid-cols-3 items-center gap-4">
                <Label class="text-right">{{ t('demo.popover.maxHeight') }}</Label>
                <Input class="col-span-2 h-8" value="none" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('alignment')" :code="alignCode">
      <div class="flex gap-4">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align start</Button>
          </PopoverTrigger>
          <PopoverContent align="start">
            <p class="text-sm">{{ t('demo.popover.alignedStart') }}</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align center</Button>
          </PopoverTrigger>
          <PopoverContent align="center">
            <p class="text-sm">{{ t('demo.popover.alignedCenter') }}</p>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline" size="sm">Align end</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p class="text-sm">{{ t('demo.popover.alignedEnd') }}</p>
          </PopoverContent>
        </Popover>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('openUp')" :code="sideCode">
      <div class="mt-24">
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">{{ t('demo.popover.openAbove') }}</Button>
          </PopoverTrigger>
          <PopoverContent side="top">
            <div class="flex flex-col gap-2">
              <h3 class="text-sm font-medium">Side="top"</h3>
              <p class="text-muted-foreground text-sm">
                {{ t('demo.popover.opensUpDesc') }}
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </DocShowcase>

    <PopoverDemoRichContent />

    <DocPropsTable :props="popoverProps" />
  </div>
</template>
