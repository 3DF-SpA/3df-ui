<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@3df-spa/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import SheetDemoReference from './_components/SheetDemoReference.vue';

import { useDocPage } from '@/i18n/composables/useDocPage';

const { description, propDesc, showcaseTitle } = useDocPage('sheet');

const { t } = useI18n();

const controlledOpen = ref(false);

const sheetProps = computed<PropItem[]>(() => [
  {
    name: 'Sheet: open',
    type: 'boolean',
    default: '-',
    description: propDesc('open'),
  },
  {
    name: 'Sheet: defaultOpen',
    type: 'boolean',
    default: 'false',
    description: propDesc('defaultOpen'),
  },
  {
    name: 'SheetContent: side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'right'",
    description: propDesc('side'),
  },
  {
    name: 'SheetContent: showClose',
    type: 'boolean',
    default: 'true',
    description: propDesc('showClose'),
  },
  {
    name: 'SheetContent: closeLabel',
    type: 'string',
    default: "'Close'",
    description: propDesc('closeLabel'),
  },
  {
    name: 'SheetTitle: as',
    type: 'string',
    default: "'h2'",
    description: propDesc('titleAs'),
  },
]);

const anatomyCode = `<Sheet>
  <SheetTrigger />
  <SheetContent>
    <SheetHeader>
      <SheetTitle />
      <SheetDescription />
    </SheetHeader>
    <!-- content -->
    <SheetFooter>
      <SheetClose />
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const basicCode = `<Sheet>
  <SheetTrigger>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>Make changes to your profile.</SheetDescription>
    </SheetHeader>
    <div class="flex flex-col gap-4 py-4">
      <Label for="name">Name</Label>
      <Input id="name" value="Pedro Duarte" />
    </div>
    <SheetFooter>
      <SheetClose><Button variant="outline">Cancel</Button></SheetClose>
      <SheetClose><Button>Save changes</Button></SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const sidesCode = `<Sheet v-for="side in ['top', 'right', 'bottom', 'left']" :key="side">
  <SheetTrigger>
    <Button variant="outline">{{ side }}</Button>
  </SheetTrigger>
  <SheetContent :side="side">
    <SheetHeader>
      <SheetTitle>Sheet from {{ side }}</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`;

const controlledCode = `const open = ref(false)

<Sheet v-model:open="open">
  <SheetTrigger>
    <Button>Open controlled</Button>
  </SheetTrigger>
  <SheetContent side="left">
    <SheetHeader>
      <SheetTitle>Controlled sheet</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>

<Button @click="open = !open">External toggle</Button>`;

const noCloseCode = `<SheetContent :show-close="false">
  <!-- Only closes with Escape, overlay, or own button -->
</SheetContent>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Sheet"
      :description="description"
      import-code="import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@3df-spa/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ t('demo.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="vue" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">{{ t('demo.sheet.openSheet') }}</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{{ t('demo.sheet.editProfile') }}</SheetTitle>
            <SheetDescription>
              {{ t('demo.sheet.editProfileDesc') }}
            </SheetDescription>
          </SheetHeader>
          <div class="flex flex-col gap-4 py-4">
            <div class="flex flex-col gap-2">
              <Label for="name">{{ t('demo.name') }}</Label>
              <Input id="name" value="Pedro Duarte" />
            </div>
            <div class="flex flex-col gap-2">
              <Label for="username">Username</Label>
              <Input id="username" value="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose>
              <Button variant="outline">{{ t('common.cancel') }}</Button>
            </SheetClose>
            <SheetClose>
              <Button>{{ t('demo.sheet.saveChanges') }}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('sides')" :code="sidesCode">
      <div class="flex flex-wrap gap-4">
        <Sheet v-for="side in ['top', 'right', 'bottom', 'left'] as const" :key="side">
          <SheetTrigger>
            <Button variant="outline" class="capitalize">{{ side }}</Button>
          </SheetTrigger>
          <SheetContent :side="side">
            <SheetHeader>
              <SheetTitle>{{ t('demo.sheet.sheetFromSide', { side }) }}</SheetTitle>
              <SheetDescription>
                {{ t('demo.sheet.sidePanelDescPre') }} <strong>{{ side }}</strong>{{ t('demo.sheet.sidePanelDescPost') }}
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">{{ t('demo.sheet.content') }}</p>
            </div>
            <SheetFooter>
              <SheetClose>
                <Button variant="outline">{{ t('common.close') }}</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('controlled')" :code="controlledCode">
      <div class="flex items-center gap-4">
        <Sheet v-model:open="controlledOpen">
          <SheetTrigger>
            <Button>{{ t('demo.sheet.openControlled') }}</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{{ t('demo.sheet.controlledTitle') }}</SheetTitle>
              <SheetDescription>
                {{ t('demo.sheet.controlledDesc') }}
              </SheetDescription>
            </SheetHeader>
            <div class="py-4">
              <p class="text-muted-foreground text-sm">
                {{ t('demo.sheet.currentState') }} <strong>{{ controlledOpen ? t('demo.sheet.open') : t('demo.sheet.closed') }}</strong>
              </p>
            </div>
            <SheetFooter>
              <SheetClose>
                <Button variant="outline">{{ t('common.close') }}</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <span class="text-muted-foreground text-sm">
          {{ t('demo.sheet.stateLabel') }} <code class="text-foreground font-mono">{{ controlledOpen }}</code>
        </span>
        <Button variant="ghost" size="sm" @click="controlledOpen = !controlledOpen">
          {{ t('demo.sheet.externalToggle') }}
        </Button>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('noCloseButton')" :code="noCloseCode">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">{{ t('demo.sheet.noCloseButton') }}</Button>
        </SheetTrigger>
        <SheetContent :show-close="false">
          <SheetHeader>
            <SheetTitle>{{ t('demo.sheet.noCloseTitle') }}</SheetTitle>
            <SheetDescription>
              {{ t('demo.sheet.noCloseDescBefore') }}
              <kbd class="border-border bg-muted rounded border px-1 py-0.5 text-xs">Escape</kbd>{{ t('demo.sheet.noCloseDescAfter') }}
            </SheetDescription>
          </SheetHeader>
          <div class="flex-1" />
          <SheetFooter>
            <SheetClose>
              <Button class="w-full">{{ t('demo.closeSheet') }}</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </DocShowcase>

    <SheetDemoReference />

    <DocPropsTable :props="sheetProps" />
  </div>
</template>
