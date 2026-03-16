<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

import MenubarDemoIde from './_components/MenubarDemoIde.vue';

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const selectedProfile = ref('benoit');

function onAction(action: string) {
  alert(`Acción: ${action}`);
}

const { description, propDesc, showcaseTitle } = useDocPage('menubar');

const menubarProps = computed<PropItem[]>(() => [
  {
    name: 'MenubarMenu: value',
    type: 'string',
    default: 'auto-generado',
    description: propDesc('menuValue'),
  },
  {
    name: 'MenubarContent: align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    description: propDesc('contentAlign'),
  },
  {
    name: 'MenubarContent: side',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: propDesc('contentSide'),
  },
  {
    name: 'MenubarContent: sideOffset',
    type: 'number',
    default: '4',
    description: propDesc('contentSideOffset'),
  },
  {
    name: 'MenubarItem: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemDisabled'),
  },
  {
    name: 'MenubarItem: inset',
    type: 'boolean',
    default: 'false',
    description: propDesc('itemInset'),
  },
  {
    name: 'MenubarCheckboxItem: checked',
    type: 'boolean',
    default: 'false',
    description: propDesc('checkboxChecked'),
  },
  {
    name: 'MenubarRadioGroup: modelValue',
    type: 'string',
    default: "''",
    description: propDesc('radioGroupModelValue'),
  },
  {
    name: 'MenubarRadioItem: value',
    type: 'string',
    default: '(requerido)',
    description: propDesc('radioItemValue'),
  },
  {
    name: 'MenubarSubTrigger: disabled',
    type: 'boolean',
    default: 'false',
    description: propDesc('subTriggerDisabled'),
  },
]);

const completeCode = `<Menubar>
  <MenubarMenu value="file">
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem @select="onAction('New')">
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Share</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem>Email Link</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`;

const anatomyCode = `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@3df/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Menubar"
      :description="description"
      import-code="import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubTrigger, MenubarSubContent, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarLabel } from '@3df/ui'"
    />

    <DocShowcase :title="showcaseTitle('complete')" :code="completeCode">
      <Menubar>
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem @select="onAction('New Tab')">
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem @select="onAction('New Window')">
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled> New Incognito Window </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem @select="onAction('Email')">Email Link</MenubarItem>
                <MenubarItem @select="onAction('Messages')">Messages</MenubarItem>
                <MenubarItem @select="onAction('Notes')">Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem @select="onAction('Print')">
              Print… <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu value="edit">
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem @select="onAction('Undo')">
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem @select="onAction('Redo')">
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem @select="onAction('Search the web')">Search the web…</MenubarItem>
                <MenubarSeparator />
                <MenubarItem @select="onAction('Find')">
                  Find… <MenubarShortcut>⌘F</MenubarShortcut>
                </MenubarItem>
                <MenubarItem @select="onAction('Find and Replace')">
                  Find and Replace… <MenubarShortcut>⇧⌘H</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem @select="onAction('Cut')">
              Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem @select="onAction('Copy')">
              Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem @select="onAction('Paste')">
              Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu value="view">
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem v-model:checked="showBookmarks">
              Always Show Bookmarks Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem v-model:checked="showFullUrls">
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset @select="onAction('Reload')">
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem inset disabled>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset @select="onAction('Toggle Fullscreen')">
              Toggle Fullscreen
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset @select="onAction('Hide Sidebar')">Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu value="profiles">
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup v-model="selectedProfile">
              <MenubarLabel inset>People</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset @select="onAction('Edit')">
              Edit… <MenubarShortcut>⌘E</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset @select="onAction('Add Profile')">Add Profile…</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <p class="text-muted-foreground mt-3 text-xs">
        Estado: Bookmarks={{ showBookmarks }}, Full URLs={{ showFullUrls }}, Perfil={{
          selectedProfile
        }}
      </p>
    </DocShowcase>

    <MenubarDemoIde />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">Anatomía</h2>
      <DocCodeBlock :code="anatomyCode" language="typescript" />
    </section>

    <DocPropsTable :props="menubarProps" />
  </div>
</template>
