/** Etiqueta de estado con variantes: default, secondary, destructive, outline, success, warning, info. */
export { default as Badge } from './badges/UiBadge.vue';
export { badgeVariants } from './badges/badge-variants';

/** Contenedor de contenido estructurado con header, body y footer. */
export { default as Card } from './card/UiCard.vue';
export { default as CardHeader } from './card/UiCardHeader.vue';
export { default as CardTitle } from './card/UiCardTitle.vue';
export { default as CardDescription } from './card/UiCardDescription.vue';
export { default as CardContent } from './card/UiCardContent.vue';
export { default as CardFooter } from './card/UiCardFooter.vue';

/** Tabla HTML accesible con header sticky, filas hover y estado vacío. */
export { default as Table } from './table/UiTable.vue';
export { default as TableHeader } from './table/UiTableHeader.vue';
export { default as TableBody } from './table/UiTableBody.vue';
export { default as TableFooter } from './table/UiTableFooter.vue';
export { default as TableRow } from './table/UiTableRow.vue';
export { default as TableHead } from './table/UiTableHead.vue';
export { default as TableCell } from './table/UiTableCell.vue';
export { default as TableCaption } from './table/UiTableCaption.vue';
export { default as TableEmpty } from './table/UiTableEmpty.vue';
export * from './table/table-variants';

/** Tabla avanzada con sorting, skeleton y contexto compartido. */
export { default as DataTable } from './data-table/UiDataTable.vue';
export { default as DataTableHead } from './data-table/UiDataTableHead.vue';
export { default as DataTableRow } from './data-table/UiDataTableRow.vue';
export { default as DataTableCell } from './data-table/UiDataTableCell.vue';
export { default as DataTableSkeleton } from './data-table/UiDataTableSkeleton.vue';
export * from './data-table/data-table-variants';

/** Tabla panel con acentos de color, filas animadas y contexto de tamaño. */
export { default as PanelTable } from './panel-table/UiPanelTable.vue';
export { default as PanelTableHead } from './panel-table/UiPanelTableHead.vue';
export { default as PanelTableRow } from './panel-table/UiPanelTableRow.vue';
export { default as PanelTableCell } from './panel-table/UiPanelTableCell.vue';
export * from './panel-table/panel-table-variants';

/** Placeholder animado para contenido en carga. */
export { default as Skeleton } from './skeleton/UiSkeleton.vue';

/** Barra de progreso animada con valor accesible por aria. */
export { default as Progress } from './progress/UiProgress.vue';

/** Línea separadora horizontal o vertical. */
export { default as Separator } from './separator/UiSeparator.vue';

/** Área con scroll personalizado sin scrollbar nativo visible. */
export { default as ScrollArea } from './scroll-area/UiScrollArea.vue';

/** Atajo de teclado con estilo monospace. */
export { default as Kbd } from './kbd/UiKbd.vue';
export { kbdVariants, type KbdVariants } from './kbd/kbd-variants';

/** Fila de ítem reutilizable con label y descripción opcionales. */
export { default as Item } from './item/UiItem.vue';
export { default as ItemLabel } from './item/UiItemLabel.vue';
export { default as ItemDescription } from './item/UiItemDescription.vue';
export { itemVariants } from './item/item-variants';

/** Estado vacío con slot para ícono, título y descripción. */
export { default as EmptyState } from './empty-state/UiEmptyState.vue';

/** Imagen de perfil circular con fallback de iniciales o ícono. */
export { default as Avatar } from './avatar/UiAvatar.vue';
export { default as AvatarImage } from './avatar/UiAvatarImage.vue';
export { default as AvatarFallback } from './avatar/UiAvatarFallback.vue';
export { default as AvatarGroup } from './avatar/UiAvatarGroup.vue';
export { AVATAR_KEY, AVATAR_GROUP_KEY } from './avatar/avatar-types';
export type { AvatarContext, AvatarSize, AvatarGroupContext } from './avatar/avatar-types';

/** Alerta informativa con variantes: default, destructive, success, warning, info. */
export { default as Alert } from './alert/UiAlert.vue';
export { default as AlertTitle } from './alert/UiAlertTitle.vue';
export { default as AlertDescription } from './alert/UiAlertDescription.vue';
export { alertVariants } from './alert/alert-variants';
