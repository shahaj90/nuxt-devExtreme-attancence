<template>
  <DxDataGrid
    ref="dataGridRef"
    :data-source="attendanceRecords"
    :show-borders="true"
    :key-expr="'id'"
    :height="500"
  >
    <DxExport :enabled="true" :allow-export-selected-data="true" />

    <DxToolbar>
      <DxItem
        location="before"
        widget="dxButton"
        :options="{
          icon: 'add',
          text: 'Add New Record',
          onClick: addNewRecord,
        }"
      />
      <DxItem name="searchPanel" />
      <DxItem
        location="after"
        widget="dxButton"
        :options="{
          icon: 'export',
          onClick: onExportToExcel,
        }"
      />
      <DxItem
        location="after"
        widget="dxButton"
        :options="{
          icon: 'print',
          onClick: onPrintGrid,
        }"
      />
    </DxToolbar>

    <DxSelection mode="multiple" show-check-boxes-mode="always" />
    <DxSearchPanel :visible="true" :width="240" />
    <DxPaging :page-size="10" />
    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[10, 20, 50]" :show-info="true" />
    <DxFilterRow :visible="true" />
    <DxColumn
      data-field="newStartDateTime"
      data-type="datetime"
      :format="{ type: 'shortDateShortTime' }"
      caption="Date & Time Get to Start Work"
    />
    <DxColumn
      data-field="newOfficeOpeningDateTime"
      data-type="datetime"
      :format="{ type: 'shortDateShortTime' }"
      caption="Date & Time Open of Office"
    />
    <DxColumn
      data-field="newOfficeReEntryDateTime"
      data-type="datetime"
      :format="{ type: 'shortDateShortTime' }"
      caption="Date & Time After Break the Office"
    />
    <DxColumn
      data-field="newReturnWorkDateTime"
      data-type="datetime"
      :format="{ type: 'shortDateShortTime' }"
      caption="Date & Time to Return Work"
    />
    <DxColumn data-field="status" caption="Status" />
    <DxColumn data-field="type" caption="Type" />

    <DxColumn caption="Action" width="80" :cell-template="actionCellTemplate" />
  </DxDataGrid>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import {
  DxDataGrid,
  DxExport,
  DxToolbar,
  DxItem,
  DxSelection,
  DxSearchPanel,
  DxPaging,
  DxPager,
  DxColumn,
  DxFilterRow,
} from "devextreme-vue/data-grid";
import type { AttendanceRecord } from "@/types/Attendance";

defineProps<{
  attendanceRecords: AttendanceRecord[];
}>();

// Define event emitter
const emit = defineEmits<{
  (e: "addNewRecord"): void;
  (e: "onEdit", record: AttendanceRecord): void;
}>();

const dataGridRef = ref<DxDataGrid | null>(null);

const actionCellTemplate = (
  cellElement: HTMLElement,
  cellInfo: { data: AttendanceRecord }
): void => {
  const button = document.createElement("div");
  button.className = "dx-button dx-button-normal dx-button-mode-contained dx-button-has-icon";
  button.innerHTML = '<i class="dx-icon dx-icon-edit"></i>';
  button.style.cursor = "pointer";
  button.onclick = () => onEdit(cellInfo.data);
  cellElement.appendChild(button);
};

const onEdit = (record: AttendanceRecord): void => {
  emit("onEdit", record);
};

const addNewRecord = (): void => {
  emit("addNewRecord");
};

const onPrintGrid = () => {
  const gridInstance = dataGridRef.value?.instance;
  const gridElement = gridInstance?.element();
  if (gridElement) {
    const printWindow = window.open("", "", "width=800,height=600");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Print</title>");
      printWindow.document.write(
        '<link rel="stylesheet" type="text/css" href="https://cdn3.devexpress.com/jslib/23.2.3/css/dx.light.css" />'
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(gridElement.outerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 1000);
    }
  }
};

const onExportToExcel = () => {
  const gridInstance = dataGridRef.value?.instance;
  if (gridInstance) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance Records");

    const data = gridInstance.getDataSource();
    if (!data || data.length === 0) {
      return;
    }

    if (Array.isArray(data._items)) {
      const formattedData = data._items.map((item) => Object.values(item)); // Convert objects to arrays of values
      worksheet.addRows(formattedData);
    }

    workbook.xlsx
      .writeBuffer()
      .then((data) => {
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "AttendanceRecords.xlsx");
      })
      .catch((error) => {
        console.error("Error generating Excel file:", error);
      });
  }
};
</script>
