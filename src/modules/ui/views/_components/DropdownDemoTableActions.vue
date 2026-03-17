<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  Badge,
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

const codeTable = `<table class="w-full text-sm">
  <thead>
    <tr class="border-b">
      <th>Nombre</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>María García</td>
      <td><Badge variant="success">Activo</Badge></td>
      <td>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
            <DropdownMenuItem :destructive="true">Suspender</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  </tbody>
</table>`;
</script>

<template>
  <DocShowcase
    :title="t('demo.dropdown.tableActionsTitle')"
    :description="t('demo.dropdown.tableActionsDesc')"
    :code="codeTable"
  >
    <div class="border-border max-w-2xl rounded-lg border">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-border bg-muted/50 border-b">
            <th class="px-4 py-3 text-left font-medium">{{ t('demo.name') }}</th>
            <th class="px-4 py-3 text-left font-medium">{{ t('demo.status') }}</th>
            <th class="px-4 py-3 text-left font-medium">{{ t('demo.dropdown.role') }}</th>
            <th class="px-4 py-3 text-right font-medium">{{ t('demo.dropdown.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-border border-b">
            <td class="px-4 py-3">María García</td>
            <td class="px-4 py-3"><Badge variant="success" size="sm">{{ t('demo.active') }}</Badge></td>
            <td class="text-muted-foreground px-4 py-3">Admin</td>
            <td class="px-4 py-3 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" class="size-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{{ t('demo.dropdown.actions') }}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{{ t('demo.viewProfile') }}</DropdownMenuItem>
                  <DropdownMenuItem>{{ t('demo.editUser') }}</DropdownMenuItem>
                  <DropdownMenuItem>{{ t('demo.dropdown.changeRole') }}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem :destructive="true">{{ t('demo.dropdown.suspend') }}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
          <tr class="border-border border-b">
            <td class="px-4 py-3">Carlos López</td>
            <td class="px-4 py-3"><Badge variant="warning" size="sm">{{ t('demo.pending') }}</Badge></td>
            <td class="text-muted-foreground px-4 py-3">Editor</td>
            <td class="px-4 py-3 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" class="size-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{{ t('demo.dropdown.actions') }}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{{ t('demo.viewProfile') }}</DropdownMenuItem>
                  <DropdownMenuItem>{{ t('demo.editUser') }}</DropdownMenuItem>
                  <DropdownMenuItem>{{ t('demo.dropdown.resendInvitation') }}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem :destructive="true">{{ t('demo.delete') }}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3">Ana Martínez</td>
            <td class="px-4 py-3"><Badge variant="destructive" size="sm">{{ t('demo.inactive') }}</Badge></td>
            <td class="text-muted-foreground px-4 py-3">Visor</td>
            <td class="px-4 py-3 text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon" class="size-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{{ t('demo.dropdown.actions') }}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{{ t('demo.viewProfile') }}</DropdownMenuItem>
                  <DropdownMenuItem>{{ t('demo.dropdown.reactivate') }}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem :destructive="true">{{ t('demo.dropdown.permanentDelete') }}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </DocShowcase>
</template>
