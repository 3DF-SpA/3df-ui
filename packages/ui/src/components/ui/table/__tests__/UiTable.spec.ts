import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiTable from '../UiTable.vue';
import UiTableHeader from '../UiTableHeader.vue';
import UiTableBody from '../UiTableBody.vue';
import UiTableRow from '../UiTableRow.vue';
import UiTableHead from '../UiTableHead.vue';
import UiTableCell from '../UiTableCell.vue';

// ---------------------------------------------------------------------------
// UiTable
// ---------------------------------------------------------------------------
describe('UiTable', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiTable);
    expect(wrapper.exists()).toBe(true);
  });

  it('contiene un elemento <table> interior', () => {
    const wrapper = mount(UiTable);
    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('el <table> tiene clase w-full y text-sm', () => {
    const wrapper = mount(UiTable);
    const table = wrapper.find('table');
    expect(table.classes()).toContain('w-full');
    expect(table.classes()).toContain('text-sm');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTable, { slots: { default: '<tbody><tr><td>dato</td></tr></tbody>' } });
    expect(wrapper.text()).toContain('dato');
  });

  it('hace merge de clase extra en el <table>', () => {
    const wrapper = mount(UiTable, { attrs: { class: 'extra-table' } });
    expect(wrapper.find('table').classes()).toContain('extra-table');
  });
});

// ---------------------------------------------------------------------------
// UiTableHeader
// ---------------------------------------------------------------------------
describe('UiTableHeader', () => {
  it('renderiza un elemento <thead>', () => {
    const wrapper = mount(UiTableHeader);
    expect(wrapper.element.tagName.toLowerCase()).toBe('thead');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTableHeader, { slots: { default: '<tr><th>Col</th></tr>' } });
    expect(wrapper.text()).toContain('Col');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTableHeader, { attrs: { class: 'extra-thead' } });
    expect(wrapper.classes()).toContain('extra-thead');
  });
});

// ---------------------------------------------------------------------------
// UiTableBody
// ---------------------------------------------------------------------------
describe('UiTableBody', () => {
  it('renderiza un elemento <tbody>', () => {
    const wrapper = mount(UiTableBody);
    expect(wrapper.element.tagName.toLowerCase()).toBe('tbody');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTableBody, { slots: { default: '<tr><td>fila</td></tr>' } });
    expect(wrapper.text()).toContain('fila');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTableBody, { attrs: { class: 'extra-tbody' } });
    expect(wrapper.classes()).toContain('extra-tbody');
  });
});

// ---------------------------------------------------------------------------
// UiTableRow
// ---------------------------------------------------------------------------
describe('UiTableRow', () => {
  it('renderiza un elemento <tr>', () => {
    const wrapper = mount(UiTableRow);
    expect(wrapper.element.tagName.toLowerCase()).toBe('tr');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTableRow, { slots: { default: '<td>celda</td>' } });
    expect(wrapper.text()).toContain('celda');
  });

  it('contiene clase hover:bg-muted/50', () => {
    const wrapper = mount(UiTableRow);
    expect(wrapper.classes()).toContain('hover:bg-muted/50');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTableRow, { attrs: { class: 'extra-row' } });
    expect(wrapper.classes()).toContain('extra-row');
    expect(wrapper.classes()).toContain('hover:bg-muted/50');
  });
});

// ---------------------------------------------------------------------------
// UiTableHead
// ---------------------------------------------------------------------------
describe('UiTableHead', () => {
  it('renderiza un elemento <th>', () => {
    const wrapper = mount(UiTableHead);
    expect(wrapper.element.tagName.toLowerCase()).toBe('th');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTableHead, { slots: { default: 'Encabezado' } });
    expect(wrapper.text()).toContain('Encabezado');
  });

  it('contiene clases de alineación y tipografía', () => {
    const wrapper = mount(UiTableHead);
    expect(wrapper.classes()).toContain('text-left');
    expect(wrapper.classes()).toContain('font-medium');
    expect(wrapper.classes()).toContain('text-muted-foreground');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTableHead, { attrs: { class: 'extra-th' } });
    expect(wrapper.classes()).toContain('extra-th');
    expect(wrapper.classes()).toContain('font-medium');
  });
});

// ---------------------------------------------------------------------------
// UiTableCell
// ---------------------------------------------------------------------------
describe('UiTableCell', () => {
  it('renderiza un elemento <td>', () => {
    const wrapper = mount(UiTableCell);
    expect(wrapper.element.tagName.toLowerCase()).toBe('td');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiTableCell, { slots: { default: 'Valor' } });
    expect(wrapper.text()).toContain('Valor');
  });

  it('contiene clase p-4 y align-middle', () => {
    const wrapper = mount(UiTableCell);
    expect(wrapper.classes()).toContain('p-4');
    expect(wrapper.classes()).toContain('align-middle');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTableCell, { attrs: { class: 'extra-td' } });
    expect(wrapper.classes()).toContain('extra-td');
    expect(wrapper.classes()).toContain('p-4');
  });
});
