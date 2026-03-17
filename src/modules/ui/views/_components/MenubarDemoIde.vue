<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@3df-spa/ui';

const showStatusBar = ref(true);
const showActivityBar = ref(true);
const showPanel = ref(false);
const selectedProfile = ref('name');

const { t } = useI18n();

function onAction(action: string) {
  alert(t('demo.actionAlert', { action }));
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      {{ t('demo.ideMenubar') }}
    </h2>

    <Menubar class="w-fit">
      <MenubarMenu value="ide-file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem @select="onAction('New File')">
            New File <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem @select="onAction('Open File')">
            Open File… <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem @select="onAction('Open Folder')"> Open Folder… </MenubarItem>
          <MenubarSeparator />
          <MenubarItem @select="onAction('Save')">
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem @select="onAction('Save As')">
            Save As… <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem @select="onAction('Close Editor')">
            Close Editor <MenubarShortcut>⌘W</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="ide-view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem v-model:checked="showStatusBar"> Status Bar </MenubarCheckboxItem>
          <MenubarCheckboxItem v-model:checked="showActivityBar">
            Activity Bar
          </MenubarCheckboxItem>
          <MenubarCheckboxItem v-model:checked="showPanel"> Panel </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Appearance</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem @select="onAction('Zoom In')">
                Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
              </MenubarItem>
              <MenubarItem @select="onAction('Zoom Out')">
                Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
              </MenubarItem>
              <MenubarItem @select="onAction('Reset Zoom')">
                Reset Zoom <MenubarShortcut>⌘0</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem @select="onAction('Fullscreen')">
                Fullscreen <MenubarShortcut>F11</MenubarShortcut>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="ide-terminal">
        <MenubarTrigger>Terminal</MenubarTrigger>
        <MenubarContent>
          <MenubarItem @select="onAction('New Terminal')">
            New Terminal <MenubarShortcut>⌃`</MenubarShortcut>
          </MenubarItem>
          <MenubarItem @select="onAction('Split Terminal')">
            Split Terminal <MenubarShortcut>⌃⇧5</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Run Task</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem @select="onAction('Build')">Build</MenubarItem>
              <MenubarItem @select="onAction('Test')">Test</MenubarItem>
              <MenubarItem @select="onAction('Lint')">Lint</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="ide-help">
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem @select="onAction('Documentation')"> Documentation </MenubarItem>
          <MenubarItem @select="onAction('Release Notes')"> Release Notes </MenubarItem>
          <MenubarSeparator />
          <MenubarItem @select="onAction('About')"> About </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>

    <p class="text-muted-foreground mt-2 text-xs">
      {{ t('demo.menubarIdeStatus', { statusBar: showStatusBar, activityBar: showActivityBar, panel: showPanel }) }}
    </p>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">
      {{ t('demo.compactMenubar') }}
    </h2>

    <Menubar class="w-fit">
      <MenubarMenu value="actions">
        <MenubarTrigger>Actions</MenubarTrigger>
        <MenubarContent>
          <MenubarItem @select="onAction('Duplicate')">
            Duplicate <MenubarShortcut>⌘D</MenubarShortcut>
          </MenubarItem>
          <MenubarItem @select="onAction('Archive')">
            Archive <MenubarShortcut>⌘A</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem @select="onAction('Delete')" class="text-destructive">
            Delete <MenubarShortcut>⌫</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu value="sort">
        <MenubarTrigger>Sort</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup v-model="selectedProfile">
            <MenubarRadioItem value="name">By Name</MenubarRadioItem>
            <MenubarRadioItem value="date">By Date</MenubarRadioItem>
            <MenubarRadioItem value="size">By Size</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </section>
</template>
