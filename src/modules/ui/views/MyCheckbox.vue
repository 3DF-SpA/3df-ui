<script setup lang="ts">
import { ref } from 'vue';

import { Checkbox, Label } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

// ── State ────────────────────────────────────────────────────────────────────
const terms = ref(false);
const newsletter = ref(true);

const selectAll = ref(false);
const indetermState = ref(false);
const optionA = ref(true);
const optionB = ref(false);
const optionC = ref(true);

const notifs = ref({
  email: true,
  push: false,
  sms: false,
});

// ── Props table ───────────────────────────────────────────────────────────────
const checkboxProps: PropItem[] = [
  { name: 'modelValue', type: 'boolean', default: 'false', description: 'Checked state (v-model).' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state — shows a dash instead of a checkmark.' },
  { name: 'size', type: "'sm' | 'default' | 'lg'", default: "'default'", description: 'Visual size of the checkbox.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction (native attr).' },
  { name: 'id', type: 'string', default: '—', description: 'Links the checkbox to a <Label> via the for attribute.' },
];

// ── Code snippets ─────────────────────────────────────────────────────────────
const basicCode = `<Checkbox id="terms" v-model="terms" />
<Label for="terms">Accept terms and conditions</Label>`;

const statesCode = `<!-- Unchecked -->
<Checkbox id="unchecked" v-model="unchecked" />

<!-- Checked (default true) -->
<Checkbox id="checked" v-model="checked" />

<!-- Indeterminate -->
<Checkbox id="mixed" :indeterminate="true" />

<!-- Disabled unchecked -->
<Checkbox id="dis-off" :model-value="false" disabled />

<!-- Disabled checked -->
<Checkbox id="dis-on" :model-value="true" disabled />`;

const sizesCode = `<Checkbox size="sm" v-model="value" />
<Checkbox size="default" v-model="value" />
<Checkbox size="lg" v-model="value" />`;

const closeScript = '</' + 'script>';
const indeterminateCode = `<script setup>
const selectAll = ref(false)
const indeterminate = ref(false)
const optionA = ref(true)
const optionB = ref(false)
const optionC = ref(true)

function onParentChange(checked) {
  optionA.value = checked
  optionB.value = checked
  optionC.value = checked
  indeterminate.value = false
}
${closeScript}

<Checkbox
  id="select-all"
  :model-value="selectAll"
  :indeterminate="indeterminate"
  @update:model-value="onParentChange"
/>
<Label for="select-all">Select all</Label>`;

const groupCode = `<div class="flex flex-col gap-3">
  <div v-for="item in items" :key="item.id" class="flex items-center gap-2">
    <Checkbox :id="item.id" v-model="item.checked" />
    <Label :for="item.id">{{ item.label }}</Label>
  </div>
</div>`;

// ── Indeterminate logic ───────────────────────────────────────────────────────
function updateParentState() {
  const checked = [optionA.value, optionB.value, optionC.value];
  const allTrue = checked.every(Boolean);
  const allFalse = checked.every((v) => !v);
  selectAll.value = allTrue;
  indetermState.value = !allTrue && !allFalse;
}

function onParentChange(val: boolean) {
  optionA.value = val;
  optionB.value = val;
  optionC.value = val;
  selectAll.value = val;
  indetermState.value = false;
}
</script>

<template>
  <div class="flex flex-col gap-12">
    <DocHeader
      title="Checkbox"
      description="Accessible checkbox component with support for checked, unchecked, indeterminate and disabled states. Pairs with Label for accessible forms."
      import-code="import { Checkbox } from '@3df-spa/ui'"
    />

    <!-- Basic -->
    <DocShowcase
      title="Basic Usage"
      description="Checkbox linked to a Label via matching id / for attributes."
      :code="basicCode"
    >
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <Checkbox id="terms" v-model="terms" />
          <Label for="terms">Accept terms and conditions</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="newsletter" v-model="newsletter" />
          <Label for="newsletter">Receive weekly newsletter</Label>
        </div>
        <p class="text-muted-foreground text-sm">
          Terms: <strong>{{ terms }}</strong> · Newsletter: <strong>{{ newsletter }}</strong>
        </p>
      </div>
    </DocShowcase>

    <!-- States -->
    <DocShowcase
      title="All States"
      description="Visual states: unchecked, checked, indeterminate, disabled unchecked and disabled checked."
      :code="statesCode"
    >
      <div class="flex flex-wrap gap-6">
        <div class="flex items-center gap-2">
          <Checkbox id="s-off" :model-value="false" />
          <Label for="s-off">Unchecked</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="s-on" :model-value="true" />
          <Label for="s-on">Checked</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="s-mixed" :model-value="false" :indeterminate="true" />
          <Label for="s-mixed">Indeterminate</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="s-dis-off" :model-value="false" disabled />
          <Label for="s-dis-off" :disabled="true">Disabled</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="s-dis-on" :model-value="true" disabled />
          <Label for="s-dis-on" :disabled="true">Disabled checked</Label>
        </div>
      </div>
    </DocShowcase>

    <!-- Sizes -->
    <DocShowcase
      title="Sizes"
      description="Three size variants: sm (3.5×3.5), default (4×4) and lg (5×5) in rem units."
      :code="sizesCode"
    >
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <Checkbox id="sz-sm" :model-value="true" size="sm" />
          <Label for="sz-sm" class="text-sm">Small</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="sz-default" :model-value="true" size="default" />
          <Label for="sz-default">Default</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="sz-lg" :model-value="true" size="lg" />
          <Label for="sz-lg" class="text-base">Large</Label>
        </div>
      </div>
    </DocShowcase>

    <!-- Indeterminate / Select all -->
    <DocShowcase
      title="Indeterminate — Select All"
      description="Parent checkbox reflects mixed state when children are partially selected."
      :code="indeterminateCode"
    >
      <div class="flex max-w-xs flex-col gap-3">
        <div class="flex items-center gap-2 pb-1">
          <Checkbox
            id="select-all"
            :model-value="selectAll"
            :indeterminate="indetermState"
            @update:model-value="onParentChange"
          />
          <Label for="select-all" class="font-semibold">Select all</Label>
        </div>
        <div class="border-border ml-1 flex flex-col gap-2 border-l pl-4">
          <div class="flex items-center gap-2">
            <Checkbox id="opt-a" v-model="optionA" @update:model-value="updateParentState" />
            <Label for="opt-a">Option A</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="opt-b" v-model="optionB" @update:model-value="updateParentState" />
            <Label for="opt-b">Option B</Label>
          </div>
          <div class="flex items-center gap-2">
            <Checkbox id="opt-c" v-model="optionC" @update:model-value="updateParentState" />
            <Label for="opt-c">Option C</Label>
          </div>
        </div>
      </div>
    </DocShowcase>

    <!-- Notification group -->
    <DocShowcase
      title="In a Form — Notification Preferences"
      description="Practical example of checkboxes in a settings card."
      :code="groupCode"
    >
      <div class="bg-card border-ui border-border rounded-lg p-6">
        <p class="mb-4 font-medium">Notification channels</p>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-3">
            <Checkbox id="notif-email" v-model="notifs.email" class="mt-0.5" />
            <div>
              <Label for="notif-email" class="font-medium">Email</Label>
              <p class="text-muted-foreground text-sm">Receive updates in your inbox.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Checkbox id="notif-push" v-model="notifs.push" class="mt-0.5" />
            <div>
              <Label for="notif-push" class="font-medium">Push notifications</Label>
              <p class="text-muted-foreground text-sm">Desktop and mobile browser alerts.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <Checkbox id="notif-sms" v-model="notifs.sms" class="mt-0.5" />
            <div>
              <Label for="notif-sms" class="font-medium">SMS</Label>
              <p class="text-muted-foreground text-sm">Text messages to your phone number.</p>
            </div>
          </div>
        </div>
        <p class="text-muted-foreground mt-4 text-xs">
          Active: {{ Object.entries(notifs).filter(([, v]) => v).map(([k]) => k).join(', ') || 'none' }}
        </p>
      </div>
    </DocShowcase>

    <DocPropsTable :props="checkboxProps" />
  </div>
</template>
