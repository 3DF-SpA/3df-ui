<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeAutoPos = `<!-- align="end" / "center" / "start" -->
<DropdownMenuContent align="end">
  <DropdownMenuItem>Se ajusta al viewport</DropdownMenuItem>
</DropdownMenuContent>

<!-- Auto-flip vertical: si no hay espacio abajo, abre arriba -->
<DropdownMenuContent>
  <DropdownMenuItem>Se reposiciona automáticamente</DropdownMenuItem>
</DropdownMenuContent>`;
</script>

<template>
  <DocShowcase
    title="Auto-positioning (flip + shift)"
    :description="t('demo.dropdown.autoPositionDesc')"
    :code="codeAutoPos"
  >
    <div class="flex flex-col gap-6">
      <div class="flex items-start justify-between gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">{{ t('demo.dropdown.leftEdge') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{{ t('demo.dropdown.autoFlipHorizontal') }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{{ t('demo.dropdown.adjustsIfNoSpace') }}</DropdownMenuItem>
            <DropdownMenuItem>{{ t('demo.dropdown.toTheLeft') }}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">{{ t('demo.dropdown.center') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>{{ t('demo.dropdown.centeredRespect') }}</DropdownMenuItem>
            <DropdownMenuItem>{{ t('demo.dropdown.toTrigger') }}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">{{ t('demo.dropdown.rightEdge') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>{{ t('demo.dropdown.autoFlipHorizontal') }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{{ t('demo.dropdown.adjustsIfNoSpace') }}</DropdownMenuItem>
            <DropdownMenuItem>{{ t('demo.dropdown.toTheRight') }}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <p class="text-muted-foreground mb-3 text-xs">
          {{ t('demo.dropdown.autoFlipNote') }}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">{{ t('demo.dropdown.autoFlipVertical') }}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{{ t('demo.dropdown.opensDown') }}</DropdownMenuItem>
            <DropdownMenuItem>{{ t('demo.dropdown.opensUp') }}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{{ t('demo.dropdown.scrollToTest') }}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </DocShowcase>
</template>
