<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';
import { useDocPage } from '@/i18n/composables/useDocPage';

const controlledOpen = ref(false);

const { description, propDesc, showcaseTitle } = useDocPage('dialog');

const { t } = useI18n();

const dialogProps = computed<PropItem[]>(() => [
  {
    name: 'Dialog: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'Dialog: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'DialogContent: showClose',
    type: 'boolean',
    default: 'true',
    description: propDesc('showClose'),
  },
  {
    name: 'DialogContent: closeOnOverlay',
    type: 'boolean',
    default: 'true',
    description: propDesc('closeOnOverlay'),
  },
  {
    name: 'DialogContent: closeLabel',
    type: 'string',
    default: "'Close'",
    description: propDesc('closeLabel'),
  },
]);

const basicCode = `<Dialog>
  <DialogTrigger>
    <Button variant="outline">Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes to your profile.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const confirmCode = `<Dialog>
  <DialogTrigger>
    <Button variant="destructive">Delete account</Button>
  </DialogTrigger>
  <DialogContent class="max-w-md">
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose><Button variant="outline">Cancel</Button></DialogClose>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const controlledCode = `const open = ref(false)

<Dialog v-model:open="open">
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Controlled dialog</DialogTitle>
    </DialogHeader>
    <DialogFooter>
      <Button @click="open = false">Got it</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const noOverlayCode = `<DialogContent :close-on-overlay="false">
  <!-- Only closes with × or Escape -->
</DialogContent>`;

const noCloseCode = `<DialogContent :show-close="false" :close-on-overlay="false">
  <!-- Only closes with action buttons -->
</DialogContent>`;

const anatomyCode = `<Dialog>
  <DialogTrigger />
  <DialogContent>
    <DialogHeader>
      <DialogTitle />
      <DialogDescription />
    </DialogHeader>
    <DialogFooter>
      <DialogClose />
    </DialogFooter>
  </DialogContent>
</Dialog>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Dialog"
      :description="description"
      import-code="import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">{{ t('demo.dialog.editProfile') }}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ t('demo.dialog.editProfile') }}</DialogTitle>
            <DialogDescription>
              {{ t('demo.dialog.editProfileDescFull') }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">{{ t('demo.name') }}</Label>
              <Input class="col-span-3" :placeholder="t('demo.dialog.namePlaceholder')" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">{{ t('demo.dialog.usernameLabel') }}</Label>
              <Input class="col-span-3" :placeholder="t('demo.dialog.usernamePlaceholder')" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">{{ t('common.cancel') }}</Button>
            </DialogClose>
            <Button>{{ t('demo.dialog.saveChanges') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('destructiveConfirm')" :code="confirmCode">
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">{{ t('demo.deleteAccount') }}</Button>
        </DialogTrigger>
        <DialogContent class="max-w-md">
          <DialogHeader>
            <DialogTitle>{{ t('demo.dialog.areYouSure') }}</DialogTitle>
            <DialogDescription>
              {{ t('demo.dialog.deleteDesc') }}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">{{ t('common.cancel') }}</Button>
            </DialogClose>
            <Button variant="destructive">{{ t('demo.dialog.yesDelete') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('controlled')" :code="controlledCode">
      <p class="text-muted-foreground text-xs">
        Estado: <code class="text-foreground">{{ controlledOpen ? t('demo.dialog.statusOpen') : t('demo.dialog.statusClosed') }}</code>
      </p>
      <div class="flex gap-2">
        <Button variant="outline" @click="controlledOpen = true">{{ t('demo.openProgrammatically') }}</Button>
      </div>
      <Dialog v-model:open="controlledOpen">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ t('demo.dialog.controlledTitle') }}</DialogTitle>
            <DialogDescription>
              {{ t('demo.dialog.controlledDesc') }}
            </DialogDescription>
          </DialogHeader>
          <div class="py-4">
            <p class="text-muted-foreground text-sm">
              {{ t('demo.dialog.controlledContent') }}
            </p>
          </div>
          <DialogFooter>
            <Button @click="controlledOpen = false">{{ t('demo.dialog.understood') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('noOverlay')" :code="noOverlayCode">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">{{ t('demo.dialog.openNoOverlay') }}</Button>
        </DialogTrigger>
        <DialogContent :close-on-overlay="false">
          <DialogHeader>
            <DialogTitle>{{ t('demo.dialog.requiredActionTitle') }}</DialogTitle>
            <DialogDescription>
              {{ t('demo.dialog.requiredActionDesc') }}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button>{{ t('demo.dialog.accept') }}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('noCloseButton')" :code="noCloseCode">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">{{ t('demo.dialog.termsAndConditions') }}</Button>
        </DialogTrigger>
        <DialogContent :show-close="false" :close-on-overlay="false">
          <DialogHeader>
            <DialogTitle>{{ t('demo.dialog.termsOfService') }}</DialogTitle>
            <DialogDescription>
              {{ t('demo.dialog.termsOfServiceDesc') }}
            </DialogDescription>
          </DialogHeader>
          <div class="border-border max-h-60 overflow-y-auto rounded-md border p-4">
            <p class="text-muted-foreground text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">{{ t('demo.dialog.reject') }}</Button>
            </DialogClose>
            <DialogClose>
              <Button>{{ t('demo.dialog.accept') }}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DocShowcase>

    <DocPropsTable :props="dialogProps" />
  </div>
</template>
