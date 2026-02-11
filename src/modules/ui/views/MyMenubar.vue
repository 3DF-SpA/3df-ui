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
} from '@3df/ui';

// ── Estado reactivo ───────────────────────────────────────────
const showBookmarks = ref(true);
const showFullUrls = ref(false);
const showStatusBar = ref(true);
const showActivityBar = ref(true);
const showPanel = ref(false);
const selectedProfile = ref('benoit');

function onAction(action: string) {
  alert(`Acción: ${action}`);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Menubar</h1>

    <!-- 1. Menubar completo estilo aplicación -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Menubar completo — menús anidados, checkboxes, radios y shortcuts
      </h2>

      <Menubar>
        <!-- ── File ──────────────────────────── -->
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem @select="onAction('New Tab')">
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem @select="onAction('New Window')">
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              New Incognito Window
            </MenubarItem>
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

        <!-- ── Edit ──────────────────────────── -->
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
                <MenubarItem @select="onAction('Search the web')">
                  Search the web…
                </MenubarItem>
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

        <!-- ── View ──────────────────────────── -->
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
            <MenubarItem inset @select="onAction('Hide Sidebar')">
              Hide Sidebar
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <!-- ── Profiles ──────────────────────── -->
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
            <MenubarItem inset @select="onAction('Add Profile')">
              Add Profile…
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <p class="text-muted-foreground mt-2 text-xs">
        Estado: Bookmarks={{ showBookmarks }}, Full URLs={{ showFullUrls }},
        Perfil={{ selectedProfile }}
      </p>
    </section>

    <!-- 2. Menubar estilo IDE -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Menubar estilo IDE — configuración de paneles
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
            <MenubarItem @select="onAction('Open Folder')">
              Open Folder…
            </MenubarItem>
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
            <MenubarCheckboxItem v-model:checked="showStatusBar">
              Status Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem v-model:checked="showActivityBar">
              Activity Bar
            </MenubarCheckboxItem>
            <MenubarCheckboxItem v-model:checked="showPanel">
              Panel
            </MenubarCheckboxItem>
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
            <MenubarItem @select="onAction('Documentation')">
              Documentation
            </MenubarItem>
            <MenubarItem @select="onAction('Release Notes')">
              Release Notes
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem @select="onAction('About')">
              About
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <p class="text-muted-foreground mt-2 text-xs">
        Estado: StatusBar={{ showStatusBar }}, ActivityBar={{ showActivityBar }},
        Panel={{ showPanel }}
      </p>
    </section>

    <!-- 3. Menubar compacto -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">
        Menubar compacto — mínimo sin submenús
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
  </div>
</template>