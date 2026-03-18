<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import TooltipDemoIcons from './_components/TooltipDemoIcons.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('tooltip');
const { t } = useI18n();

const tooltipProps = computed<PropItem[]>(() => [
  {
    name: 'Tooltip: delay',
    type: 'number',
    default: '300',
    description: propDesc('delay'),
  },
  {
    name: 'Tooltip: closeDelay',
    type: 'number',
    default: '150',
    description: propDesc('closeDelay'),
  },
  {
    name: 'TooltipContent: side',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: propDesc('side'),
  },
  {
    name: 'TooltipContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: propDesc('align'),
  },
  {
    name: 'TooltipContent: sideOffset',
    type: 'number',
    default: '6',
    description: propDesc('sideOffset'),
  },
  {
    name: 'TooltipContent: viewportPadding',
    type: 'number',
    default: '8',
    description: propDesc('viewportPadding'),
  },
]);

const anatomyCode = `<Tooltip>
  <TooltipTrigger />
  <TooltipContent>
    <!-- texto del tooltip -->
  </TooltipContent>
</Tooltip>`;

const basicCode = `<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover sobre mí</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Este es un tooltip básico</p>
  </TooltipContent>
</Tooltip>`;

const sidesCode = `<TooltipContent side="top">Arriba</TooltipContent>
<TooltipContent side="bottom">Abajo</TooltipContent>
<TooltipContent side="left">Izquierda</TooltipContent>
<TooltipContent side="right">Derecha</TooltipContent>`;

const alignCode = `<TooltipContent align="start">Inicio</TooltipContent>
<TooltipContent align="center">Centro</TooltipContent>
<TooltipContent align="end">Final</TooltipContent>`;

const delayCode = `<Tooltip :delay="0"><!-- Instantáneo --></Tooltip>
<Tooltip :delay="300"><!-- Normal (default) --></Tooltip>
<Tooltip :delay="1000"><!-- Lento --></Tooltip>`;

const richCode = `<TooltipContent class="max-w-xs">
  <div class="flex flex-col gap-1">
    <p class="font-semibold">Atajo de teclado</p>
    <p class="text-muted-foreground text-xs">
      Presiona <kbd>Ctrl+S</kbd> para guardar.
    </p>
  </div>
</TooltipContent>`;

const focusCode = `<!-- Los tooltips también aparecen al hacer focus con Tab -->
<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Navega con Tab</Button>
  </TooltipTrigger>
  <TooltipContent>Tooltip por focus</TooltipContent>
</Tooltip>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Tooltip"
      :description="description"
      import-code="import { Tooltip, TooltipTrigger, TooltipContent } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.tooltip.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">{{ t('demo.tooltip.hoverMe') }}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ t('demo.tooltip.basicTooltip') }}</p>
        </TooltipContent>
      </Tooltip>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('positions')" :code="sidesCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Top (default)</Button>
          </TooltipTrigger>
          <TooltipContent side="top">{{ t('demo.tooltip.tooltipTop') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{{ t('demo.tooltip.tooltipBottom') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">{{ t('demo.tooltip.tooltipLeft') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">{{ t('demo.tooltip.tooltipRight') }}</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('alignment')" :code="alignCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Start</Button>
          </TooltipTrigger>
          <TooltipContent align="start">{{ t('demo.tooltip.alignedStart') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">Center</Button>
          </TooltipTrigger>
          <TooltipContent align="center">{{ t('demo.tooltip.alignedCenter') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">End</Button>
          </TooltipTrigger>
          <TooltipContent align="end">{{ t('demo.tooltip.alignedEnd') }}</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <TooltipDemoIcons />

    <DocShowcase :title="showcaseTitle('customDelay')" :code="delayCode">
      <div class="flex flex-wrap gap-4">
        <Tooltip :delay="0">
          <TooltipTrigger>
            <Button variant="outline" size="sm">{{ t('demo.tooltip.instantBtn') }}</Button>
          </TooltipTrigger>
          <TooltipContent>{{ t('demo.tooltip.instantMsg') }}</TooltipContent>
        </Tooltip>

        <Tooltip :delay="300">
          <TooltipTrigger>
            <Button variant="outline" size="sm">{{ t('demo.tooltip.normalBtn') }}</Button>
          </TooltipTrigger>
          <TooltipContent>{{ t('demo.tooltip.normalMsg') }}</TooltipContent>
        </Tooltip>

        <Tooltip :delay="1000">
          <TooltipTrigger>
            <Button variant="outline" size="sm">{{ t('demo.tooltip.slowBtn') }}</Button>
          </TooltipTrigger>
          <TooltipContent>{{ t('demo.tooltip.slowMsg') }}</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('richContent')" :code="richCode">
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">{{ t('demo.tooltip.richContentBtn') }}</Button>
        </TooltipTrigger>
        <TooltipContent class="max-w-xs">
          <div class="flex flex-col gap-1">
            <p class="font-semibold">{{ t('demo.tooltip.keyboardShortcut') }}</p>
            <p class="text-muted-foreground text-xs">
              {{ t('demo.tooltip.savePrefix') }}
              <kbd class="border-border bg-muted rounded border px-1 py-0.5 font-mono text-[10px]"
                >Ctrl+S</kbd
              >
              {{ t('demo.tooltip.saveSuffix') }}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('focusActivation')"
      :description="showcaseDesc('focusActivation')"
      :code="focusCode"
    >
      <div class="flex gap-4">
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">{{ t('demo.tooltip.firstBtn') }}</Button>
          </TooltipTrigger>
          <TooltipContent>{{ t('demo.tooltip.focusTooltip') }}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" size="sm">{{ t('demo.tooltip.secondBtn') }}</Button>
          </TooltipTrigger>
          <TooltipContent>{{ t('demo.tooltip.focusTooltip2') }}</TooltipContent>
        </Tooltip>
      </div>
    </DocShowcase>

    <DocPropsTable :props="tooltipProps" />
  </div>
</template>
