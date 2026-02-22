<script setup lang="ts">
import { ref } from 'vue';

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
} from '@3df-spa/ui';

import MenubarDemoIde from './_components/MenubarDemoIde.vue';

const showBookmarks = ref(true);
const showFullUrls = ref(false);
const selectedProfile = ref('benoit');

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Menubar</h1>

    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Menubar completo — menús anidados, checkboxes, radios y shortcuts
      </h2>

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
                <MenubarItem @select="onAction('Search the web')"> Search the web… </MenubarItem>
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
            <MenubarItem inset @select="onAction('Hide Sidebar')"> Hide Sidebar </MenubarItem>
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
            <MenubarItem inset @select="onAction('Add Profile')"> Add Profile… </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <p class="text-muted-foreground mt-2 text-xs">
        Estado: Bookmarks={{ showBookmarks }}, Full URLs={{ showFullUrls }}, Perfil={{
          selectedProfile
        }}
      </p>
    </section>

    <MenubarDemoIde />
  </div>
</template>
