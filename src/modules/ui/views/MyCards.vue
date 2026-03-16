<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useDocPage } from '@/i18n/composables/useDocPage';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectItem,
  Switch,
} from '@3df/ui';

import DocCodeBlock from '@/components/docs/DocCodeBlock.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import CardsDemoFeatures from './_components/CardsDemoFeatures.vue';
import CardsDemoPricing from './_components/CardsDemoPricing.vue';
import CardsDemoProducts from './_components/CardsDemoProducts.vue';

const notifications = ref(true);
const framework = ref('vue');

const { t } = useI18n();
const { description, propDesc, showcaseTitle } = useDocPage('cards');

const cardProps = computed<PropItem[]>(() => [
  {
    name: 'as',
    type: "'string' | Component",
    default: "'div'",
    description: propDesc('as'),
  },
  {
    name: 'variant',
    type: "'default'",
    default: "'default'",
    description: propDesc('variant'),
  },
]);

const subComponentProps = computed<PropItem[]>(() => [
  {
    name: 'CardTitle: as',
    type: "'string' | Component",
    default: "'h3'",
    description: propDesc('cardTitleAs'),
  },
]);

const basicCode = `<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descripción breve.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido principal.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">Acción</Button>
  </CardFooter>
</Card>`;

const formCode = `<Card>
  <CardHeader>
    <CardTitle>Crear proyecto</CardTitle>
    <CardDescription>Configura tu nuevo proyecto.</CardDescription>
  </CardHeader>
  <CardContent>
    <form class="flex flex-col gap-4">
      <Input placeholder="Mi proyecto" />
      <Select v-model="framework" placeholder="Framework">
        <SelectItem value="vue">Vue</SelectItem>
      </Select>
    </form>
  </CardContent>
  <CardFooter class="justify-between">
    <Button variant="ghost">Cancelar</Button>
    <Button>Crear</Button>
  </CardFooter>
</Card>`;

const notifCode = `<Card>
  <CardHeader>
    <CardTitle>Notificaciones</CardTitle>
    <CardDescription>Configura cómo recibirlas.</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium">Push</span>
      <Switch v-model="notifications" />
    </div>
  </CardContent>
</Card>`;

const badgeCode = `<Card>
  <CardHeader>
    <div class="flex items-center justify-between">
      <CardTitle>Deploy #1234</CardTitle>
      <Badge variant="success" size="sm">Exitoso</Badge>
    </div>
    <CardDescription>Desplegado hace 3 minutos.</CardDescription>
  </CardHeader>
</Card>`;

const hoverCode = `<Card class="cursor-pointer transition-shadow hover:shadow-md">
  <CardHeader>
    <CardTitle>Documentación</CardTitle>
    <CardDescription>Guías y ejemplos.</CardDescription>
  </CardHeader>
</Card>`;

const contentOnlyCode = `<Card>
  <CardContent class="pt-6">
    <p>Card solo con contenido, sin header ni footer.</p>
  </CardContent>
</Card>`;

const anatomyCode = `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@3df/ui'`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Card"
      :description="description"
      import-code="import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@3df/ui'"
    />

    <section class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold">{{ t('demo.cards.anatomy') }}</h2>
      <DocCodeBlock :code="anatomyCode" lang="typescript" />
    </section>

    <DocShowcase :title="showcaseTitle('basic')" :code="basicCode">
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{{ t('demo.cards.cardTitle') }}</CardTitle>
            <CardDescription>{{ t('demo.cards.cardBriefDescription') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm">
              {{ t('demo.cards.cardMainContent') }}
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">{{ t('demo.cards.action') }}</Button>
          </CardFooter>
        </Card>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withForm')" :code="formCode">
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{{ t('demo.cards.createProject') }}</CardTitle>
            <CardDescription>{{ t('demo.cards.configureProjectFull') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <Label for="project-name">{{ t('demo.cards.nameLabelCard') }}</Label>
                <Input id="project-name" :placeholder="t('demo.cards.projectNamePlaceholder')" />
              </div>
              <div class="flex flex-col gap-2">
                <Label for="project-framework">{{ t('demo.cards.frameworkLabel') }}</Label>
                <Select
                  id="project-framework"
                  v-model="framework"
                  :placeholder="t('demo.cards.selectFramework')"
                >
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt</SelectItem>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter class="justify-between">
            <Button variant="ghost">{{ t('demo.cards.cancel') }}</Button>
            <Button>{{ t('demo.cards.create') }}</Button>
          </CardFooter>
        </Card>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withNotifications')" :code="notifCode">
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{{ t('demo.notifications') }}</CardTitle>
            <CardDescription>{{ t('demo.cards.configureNotifications') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">{{ t('demo.tabs.push') }}</span>
                  <span class="text-muted-foreground text-xs">{{ t('demo.tabs.pushDesc') }}</span>
                </div>
                <Switch v-model="notifications" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">{{ t('demo.tabs.email') }}</span>
                  <span class="text-muted-foreground text-xs">{{ t('demo.tabs.emailDesc') }}</span>
                </div>
                <Switch :model-value="false" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">{{ t('demo.tabs.sms') }}</span>
                  <span class="text-muted-foreground text-xs">{{ t('demo.tabs.smsDesc') }}</span>
                </div>
                <Switch :model-value="false" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('withBadges')" :code="badgeCode">
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>{{ t('demo.cards.deployTitle') }}</CardTitle>
              <Badge variant="success" size="sm">{{ t('demo.cards.successful') }}</Badge>
            </div>
            <CardDescription>{{ t('demo.cards.deployedMinutesAgoFull') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t('demo.cards.branch') }}</span>
                <span class="font-mono text-xs">main</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t('demo.cards.commit') }}</span>
                <span class="font-mono text-xs">a3f8c2d</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">{{ t('demo.cards.duration') }}</span>
                <span>42s</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" class="w-full">{{ t('demo.cards.viewLogs') }}</Button>
          </CardFooter>
        </Card>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('interactive')" :code="hoverCode">
      <div class="grid max-w-md gap-4">
        <Card class="cursor-pointer transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>{{ t('demo.cards.documentation') }}</CardTitle>
            <CardDescription>{{ t('demo.cards.docDescription') }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              {{ t('demo.cards.docDescriptionFull') }}
            </p>
          </CardContent>
        </Card>
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('contentOnly')" :code="contentOnlyCode">
      <div class="grid max-w-md gap-4">
        <Card>
          <CardContent class="pt-6">
            <p class="text-sm">
              {{ t('demo.cards.cardWithContentOnly') }}
              <code class="bg-muted rounded px-1 py-0.5 text-xs">class="pt-6"</code>
              {{ t('demo.cards.paddingNote') }}
            </p>
          </CardContent>
        </Card>
      </div>
    </DocShowcase>

    <CardsDemoPricing />
    <CardsDemoProducts />
    <CardsDemoFeatures />

    <DocPropsTable :props="cardProps" />
    <DocPropsTable title="Sub-componentes" :props="subComponentProps" />
  </div>
</template>
