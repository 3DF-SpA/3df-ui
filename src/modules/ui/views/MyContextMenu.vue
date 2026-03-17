<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('contextMenu');

const { t } = useI18n();

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const person = ref('pedro');

const contextMenuProps = computed<PropItem[]>(() => [
  {
    name: 'ContextMenuItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemDisabled'),
  },
  {
    name: 'ContextMenuItem: destructive',
    type: 'boolean',
    default: 'false',
    description: propDesc('destructive'),
  },
  {
    name: 'ContextMenuCheckboxItem: checked',
    type: 'boolean',
    default: 'false',
    description: propDesc('checked'),
  },
  {
    name: 'ContextMenuRadioGroup: modelValue',
    type: 'string',
    default: '-',
    description: propDesc('modelValue'),
  },
  {
    name: 'ContextMenuRadioItem: value',
    type: 'string',
    default: '-',
    description: propDesc('value'),
  },
  {
    name: 'ContextMenuLabel: inset',
    type: 'boolean',
    default: 'false',
    description: propDesc('inset'),
  },
]);

const basicCode = `<ContextMenu>
  <ContextMenuTrigger>
    <div class="flex h-[150px] items-center justify-center rounded-md border border-dashed">
      Right click here
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent class="w-64">
    <ContextMenuItem>Back <ContextMenuShortcut>⌘[</ContextMenuShortcut></ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem v-model:checked="checked">
      Show bookmarks
    </ContextMenuCheckboxItem>
    <ContextMenuLabel inset>People</ContextMenuLabel>
    <ContextMenuRadioGroup v-model="person">
      <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`;

const subMenuCode = `<ContextMenuSub>
  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
  <ContextMenuSubContent>
    <ContextMenuItem>Email</ContextMenuItem>
    <ContextMenuItem>Message</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>Copy link</ContextMenuItem>
  </ContextMenuSubContent>
</ContextMenuSub>`;

const anatomyCode = `<ContextMenu>
  <ContextMenuTrigger />
  <ContextMenuContent>
    <ContextMenuItem />
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem />
    <ContextMenuLabel />
    <ContextMenuRadioGroup>
      <ContextMenuRadioItem />
    </ContextMenuRadioGroup>
    <ContextMenuSub>
      <ContextMenuSubTrigger />
      <ContextMenuSubContent />
    </ContextMenuSub>
  </ContextMenuContent>
</ContextMenu>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Context Menu"
      :description="description"
      import-code="import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basicCheckboxRadio')" :code="basicCode">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="text-muted-foreground flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm"
          >
            {{ t('demo.contextMenu.rightClickHere') }}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem @select="() => {}">
            {{ t('demo.contextMenu.back') }}
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            {{ t('demo.contextMenu.forward') }}
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            {{ t('demo.contextMenu.reload') }}
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem v-model:checked="showBookmarks">
            {{ t('demo.contextMenu.showBookmarks') }}
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem v-model:checked="showFullUrls">
            {{ t('demo.showFullUrls') }}
          </ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuLabel inset>{{ t('demo.contextMenu.people') }}</ContextMenuLabel>
          <ContextMenuRadioGroup v-model="person">
            <ContextMenuRadioItem value="pedro">Pedro García</ContextMenuRadioItem>
            <ContextMenuRadioItem value="maria">María López</ContextMenuRadioItem>
            <ContextMenuRadioItem value="juan">Juan Martínez</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('subMenu')" :code="subMenuCode">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            class="text-muted-foreground flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm"
          >
            {{ t('demo.contextMenu.rightClickFileActions') }}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent class="w-56">
          <ContextMenuItem>
            {{ t('demo.contextMenu.edit') }}
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>{{ t('demo.contextMenu.duplicate') }}</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>{{ t('demo.contextMenu.share') }}</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Email</ContextMenuItem>
              <ContextMenuItem>{{ t('demo.contextMenu.message') }}</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>{{ t('demo.copyLink') }}</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem destructive>
            {{ t('demo.contextMenu.delete') }}
            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </DocShowcase>

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.contextMenu.reactiveState') }}</h2>
      <div class="space-y-1 rounded-md border p-4 text-sm">
        <p><strong>{{ t('demo.contextMenu.bookmarksLabel') }}</strong> {{ showBookmarks ? t('demo.contextMenu.visible') : t('demo.contextMenu.hidden') }}</p>
        <p><strong>{{ t('demo.contextMenu.fullUrlsLabel') }}</strong> {{ showFullUrls ? t('demo.contextMenu.yes') : t('demo.contextMenu.no') }}</p>
        <p><strong>{{ t('demo.contextMenu.personLabel') }}</strong> {{ person }}</p>
      </div>
    </section>

    <DocPropsTable :props="contextMenuProps" />
  </div>
</template>
