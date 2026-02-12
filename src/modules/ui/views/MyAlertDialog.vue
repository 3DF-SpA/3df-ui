<script setup lang="ts">
import { ref } from 'vue';

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@3df-spa/ui';

const deleteResult = ref('');
const programmaticOpen = ref(false);

function handleDelete() {
  deleteResult.value = 'Cuenta eliminada (simulado)';
  setTimeout(() => {
    deleteResult.value = '';
  }, 3000);
}
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Alert Dialog</h1>

    <!-- Delete Confirmation -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Delete Confirmation</h2>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">Eliminar cuenta</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente tu
              cuenta y removerá todos tus datos de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" @click="handleDelete">
              Sí, eliminar cuenta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p v-if="deleteResult" class="text-sm text-destructive">{{ deleteResult }}</p>
    </section>

    <!-- Confirmación genérica -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Confirmación genérica</h2>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="outline">Enviar formulario</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar envío</AlertDialogTitle>
            <AlertDialogDescription>
              Estás a punto de enviar este formulario. Una vez enviado, no podrás
              modificar los datos ingresados. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>

    <!-- Controlado programáticamente -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Controlado (v-model)</h2>
      <Button @click="programmaticOpen = true">Abrir programáticamente</Button>
      <AlertDialog v-model:open="programmaticOpen">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
            <AlertDialogDescription>
              Tu sesión ha expirado por inactividad. Serás redirigido a la página
              de inicio de sesión.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Iniciar sesión</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  </div>
</template>