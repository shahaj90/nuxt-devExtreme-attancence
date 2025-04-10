<template>
  <div class="p-4">
    <!-- Search Form -->
    <fieldset
      class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-7xl mx-auto"
    >
      <legend class="font-semibold text-lg px-2 ml-2">Attendance Record Search</legend>
      <DxForm
        :form-data="searchForm"
        label-location="top"
        :col-count="2"
        :min-col-width="200"
        :align-item-labels="true"
        :show-colon-after-label="true"
        class="search-form mb-4"
      >
        <DxSimpleItem
          data-field="id"
          editor-type="dxTextBox"
          :label="{ text: 'No. Kad Pengenalan' }"
          :editor-options="{ stylingMode: 'outlined', placeholder: 'Masukkan No. KP' }"
        />
        <DxSimpleItem
          data-field="name"
          editor-type="dxTextBox"
          :label="{ text: 'Nama' }"
          :editor-options="{ stylingMode: 'outlined', placeholder: 'Masukkan Nama' }"
        />
        <DxSimpleItem
          data-field="display"
          editor-type="dxSelectBox"
          :label="{ text: 'Record Display' }"
          :editor-options="{
            items: ['Daily', 'Weekly'],
            stylingMode: 'outlined',
            placeholder: 'Pilih Jenis Paparan',
          }"
        />
        <DxItem
          :button-options="buttonOptions"
          item-type="button"
          css-class="mt-6"
          horizontal-alignment="left"
        />
      </DxForm>
      <!-- <DxButtonItem data-field="display" :button-options="submitButtonOptions" />
      <DxButton
        text="Search"
        type="default"
        styling-mode="contained"
        icon="search"
        @click="onSearch"
        class="mb-4"
      /> -->

      <!-- <div class="flex items-end justify-end mt-4">
        <DxButton
          text="Search"
          type="default"
          styling-mode="contained"
          icon="search"
          @click="onSearch"
          class="mb-4"
        />
      </div> -->
    </fieldset>

    <!-- DataGrid with Export & Print -->
    <h2 class="text-2xl font-semibold mb-4">List of Competency Owner Attendance Records</h2>

    <div>
      <DataGrid
        :attendanceRecords="attendanceRecords"
        @add-new-record="() => console.log(1)"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Attendance",
});

import { ref } from "vue";
import { DxItem } from "devextreme-vue/data-grid";
import { DxForm, DxSimpleItem } from "devextreme-vue/form";
import DataGrid from "@/components/ui/DataGrid.vue";
import type { AttendanceRecord } from "@/types/AttendanceRecord";
import { useHead } from "nuxt/app";

interface SearchForm {
  id: string;
  name: string;
  display: string;
}

const buttonOptions = {
  text: "Submit the Form",
  useSubmitBehavior: true,
  type: "default",
  stylingMode: "contained",
  icon: "search",
  class: "mt-4",
  onClick: () => {
    onSearch();
  },
};

const searchForm = ref<SearchForm>({
  id: "",
  name: "",
  display: "Daily",
});

const attendanceRecords = ref<AttendanceRecord[]>([
  {
    id: 1,
    dateGetToWork: "2025-04-10 08:00",
    dateOutOfOffice: "2025-04-10 12:00",
    dateReenterOffice: "2025-04-10 13:00",
    dateBackToWork: "2025-04-10 17:00",
    status: "Presence",
    type: "Non-compliance",
  },
  {
    id: 2,
    dateGetToWork: "2025-04-10 09:00",
    dateOutOfOffice: "2025-04-10 12:30",
    dateReenterOffice: "2025-04-10 13:30",
    dateBackToWork: "2025-04-10 18:00",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 3,
    dateGetToWork: "2025-04-09 08:15",
    dateOutOfOffice: "2025-04-09 12:15",
    dateReenterOffice: "2025-04-09 13:05",
    dateBackToWork: "2025-04-09 17:10",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 4,
    dateGetToWork: "2025-04-09 09:30",
    dateOutOfOffice: "2025-04-09 12:45",
    dateReenterOffice: "2025-04-09 14:00",
    dateBackToWork: "2025-04-09 18:30",
    status: "Late",
    type: "Non-compliance",
  },
  {
    id: 5,
    dateGetToWork: "2025-04-08 07:45",
    dateOutOfOffice: "2025-04-08 11:45",
    dateReenterOffice: "2025-04-08 12:45",
    dateBackToWork: "2025-04-08 16:30",
    status: "Early",
    type: "Compliance",
  },
  {
    id: 6,
    dateGetToWork: "2025-04-08 08:30",
    dateOutOfOffice: "2025-04-08 12:20",
    dateReenterOffice: "2025-04-08 13:25",
    dateBackToWork: "2025-04-08 17:45",
    status: "Presence",
    type: "Non-compliance",
  },
  {
    id: 7,
    dateGetToWork: "2025-04-07 08:05",
    dateOutOfOffice: "2025-04-07 12:10",
    dateReenterOffice: "2025-04-07 13:15",
    dateBackToWork: "2025-04-07 17:05",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 8,
    dateGetToWork: "2025-04-07 10:15",
    dateOutOfOffice: "2025-04-07 13:00",
    dateReenterOffice: "2025-04-07 14:30",
    dateBackToWork: "2025-04-07 19:00",
    status: "Late",
    type: "Non-compliance",
  },
  {
    id: 9,
    dateGetToWork: "2025-04-06 08:00",
    dateOutOfOffice: "2025-04-06 12:00",
    dateReenterOffice: "2025-04-06 13:00",
    dateBackToWork: "2025-04-06 17:00",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 10,
    dateGetToWork: "2025-04-06 08:45",
    dateOutOfOffice: "2025-04-06 12:30",
    dateReenterOffice: "2025-04-06 13:45",
    dateBackToWork: "2025-04-06 17:30",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 11,
    dateGetToWork: "2025-04-05 07:30",
    dateOutOfOffice: "2025-04-05 11:45",
    dateReenterOffice: "2025-04-05 12:30",
    dateBackToWork: "2025-04-05 16:00",
    status: "Early",
    type: "Compliance",
  },
  {
    id: 12,
    dateGetToWork: "2025-04-05 09:45",
    dateOutOfOffice: "2025-04-05 13:15",
    dateReenterOffice: "2025-04-05 14:45",
    dateBackToWork: "2025-04-05 19:15",
    status: "Late",
    type: "Non-compliance",
  },
  {
    id: 13,
    dateGetToWork: "2025-04-04 08:20",
    dateOutOfOffice: "2025-04-04 12:25",
    dateReenterOffice: "2025-04-04 13:30",
    dateBackToWork: "2025-04-04 17:45",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 14,
    dateGetToWork: "2025-04-04 08:00",
    dateOutOfOffice: "2025-04-04 12:00",
    dateReenterOffice: "2025-04-04 13:00",
    dateBackToWork: "2025-04-04 15:00",
    status: "Half Day",
    type: "Non-compliance",
  },
  {
    id: 15,
    dateGetToWork: "2025-04-03 08:10",
    dateOutOfOffice: "2025-04-03 12:15",
    dateReenterOffice: "2025-04-03 13:20",
    dateBackToWork: "2025-04-03 17:10",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 16,
    dateGetToWork: "2025-04-02 08:00",
    dateOutOfOffice: "2025-04-02 12:00",
    dateReenterOffice: "2025-04-02 13:00",
    dateBackToWork: "2025-04-02 17:00",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 17,
    dateGetToWork: "2025-04-02 08:05",
    dateOutOfOffice: "2025-04-02 12:10",
    dateReenterOffice: "2025-04-02 13:05",
    dateBackToWork: "2025-04-02 17:00",
    status: "Presence",
    type: "Compliance",
  },
  {
    id: 18,
    dateGetToWork: "2025-04-02 09:50",
    dateOutOfOffice: "2025-04-02 13:30",
    dateReenterOffice: "2025-04-02 14:45",
    dateBackToWork: "2025-04-02 19:30",
    status: "Late",
    type: "Non-compliance",
  },
  {
    id: 19,
    dateGetToWork: "2025-04-01 07:55",
    dateOutOfOffice: "2025-04-01 11:50",
    dateReenterOffice: "2025-04-01 12:55",
    dateBackToWork: "2025-04-01 16:45",
    status: "Early",
    type: "Compliance",
  },
  {
    id: 20,
    dateGetToWork: "2025-04-01 08:30",
    dateOutOfOffice: "2025-04-01 12:45",
    dateReenterOffice: "2025-04-01 13:50",
    dateBackToWork: "2025-04-01 17:30",
    status: "Presence",
    type: "Non-compliance",
  },
]);

const onSearch = () => {
  console.log("Search triggered with:", searchForm.value);
};

const onEdit = (record: AttendanceRecord) => {
  alert(`Editing record with ID: ${record.id}`);
};
</script>
