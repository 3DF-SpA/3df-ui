<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@3df-spa/ui';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  popular?: boolean;
}

const { t } = useI18n();

const plans = computed<Plan[]>(() => [
  {
    name: 'Free',
    description: t('demo.cards.freeDesc'),
    price: '$0',
    features: [
      { text: t('demo.cards.feature1Project'), included: true },
      { text: t('demo.cards.feature100MB'), included: true },
      { text: t('demo.cards.featureCommunitySupport'), included: true },
      { text: t('demo.cards.featureCustomDomain'), included: false },
      { text: t('demo.cards.featureAdvancedAnalytics'), included: false },
    ],
    buttonText: t('demo.cards.startFree'),
    buttonVariant: 'outline',
  },
  {
    name: 'Pro',
    description: t('demo.cards.proDesc'),
    price: '$19',
    features: [
      { text: t('demo.cards.feature10Projects'), included: true },
      { text: t('demo.cards.feature10GB'), included: true },
      { text: t('demo.cards.featurePrioritySupport'), included: true },
      { text: t('demo.cards.featureCustomDomain'), included: true },
      { text: t('demo.cards.featureAdvancedAnalytics'), included: false },
    ],
    buttonText: t('demo.cards.subscribe'),
    buttonVariant: 'default',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: t('demo.cards.enterpriseDesc'),
    price: '$79',
    features: [
      { text: t('demo.cards.featureUnlimitedProjects'), included: true },
      { text: t('demo.cards.feature100GB'), included: true },
      { text: t('demo.cards.featureDedicatedSupport'), included: true },
      { text: t('demo.cards.featureCustomDomain'), included: true },
      { text: t('demo.cards.featureAdvancedAnalytics'), included: true },
    ],
    buttonText: t('demo.cards.contactSales'),
    buttonVariant: 'outline',
  },
]);
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.cards.pricingCards') }}</h2>
    <div class="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="plan in plans"
        :key="plan.name"
        :class="plan.popular ? 'border-primary relative border-ui' : ''"
      >
        <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>{{ t('demo.cards.mostPopular') }}</Badge>
        </div>
        <CardHeader>
          <CardTitle>{{ plan.name }}</CardTitle>
          <CardDescription>{{ plan.description }}</CardDescription>
          <div class="mt-2">
            <span class="text-3xl font-bold">{{ plan.price }}</span>
            <span class="text-muted-foreground text-sm">{{ t('demo.cards.perMonth') }}</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul class="flex flex-col gap-3 text-sm">
            <li
              v-for="feature in plan.features"
              :key="feature.text"
              class="flex items-center gap-2"
              :class="{ 'text-muted-foreground': !feature.included }"
            >
              <svg
                v-if="feature.included"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-primary shrink-0"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="shrink-0 opacity-40"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
              {{ feature.text }}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button :variant="plan.buttonVariant" class="w-full">{{ plan.buttonText }}</Button>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
