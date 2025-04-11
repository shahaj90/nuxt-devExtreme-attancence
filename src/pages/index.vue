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
          :editor-options="{ stylingMode: 'outlined' }"
        />
        <DxSimpleItem
          data-field="name"
          editor-type="dxTextBox"
          :label="{ text: 'Nama' }"
          :editor-options="{ stylingMode: 'outlined' }"
        />
        <DxSimpleItem
          data-field="display"
          editor-type="dxSelectBox"
          :label="{ text: 'Record Display' }"
          :editor-options="{
            items: ['Daily', 'Weekly'],
            stylingMode: 'outlined',
          }"
        />
        <DxItem
          :button-options="buttonOptions"
          item-type="button"
          css-class="mt-6"
          horizontal-alignment="left"
        />
      </DxForm>
    </fieldset>

    <!-- DataGrid with Export & Print -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">List of Competency Owner Attendance Records</h2>
      <DataGrid
        :attendanceRecords="attendanceStore.records"
        @addNewRecord="addNewRecord"
        @onEdit="onEdit"
      />
    </div>

    <!-- Popup -->
    <DxPopup
      v-model:visible="popupVisible"
      :width="700"
      :height="600"
      :show-title="true"
      :drag-enabled="true"
      :close-on-outside-click="true"
    >
      <template #default>
        <fieldset
          class="border border-gray-300 rounded-lg p-4 mb-6 relative bg-white w-full max-w-7xl mx-auto"
        >
          <legend class="font-semibold text-lg px-2 ml-2">Attendance Record Search</legend>
          <DxForm
            :form-data="form"
            label-location="top"
            :col-count="2"
            :min-col-width="200"
            :align-item-labels="true"
            :show-colon-after-label="true"
            class="search-form mb-4"
          >
            <DxSimpleItem
              data-field="typeOfReason"
              editor-type="dxTextBox"
              :label="{ text: 'Types Of Reasons' }"
              :editor-options="{ stylingMode: 'outlined' }"
              :validation-rules="[{ type: 'required', message: 'Type of reason is required' }]"
            />
            <DxSimpleItem
              data-field="reason"
              editor-type="dxTextBox"
              :label="{ text: 'Reason' }"
              :editor-options="{ stylingMode: 'outlined' }"
              :validation-rules="[{ type: 'required', message: 'Reason is required' }]"
            />
            <DxSimpleItem
              data-field="newStartDateTime"
              editor-type="dxDateBox"
              :label="{ text: 'New Start Date & Time' }"
              :editor-options="{
                type: 'datetime',
                displayFormat: 'dd/MM/yyyy HH:mm',
                stylingMode: 'outlined',
              }"
              :validation-rules="[{ type: 'required', message: 'Start date & time is required' }]"
            />
            <DxSimpleItem
              data-field="newOfficeOpeningDateTime"
              editor-type="dxDateBox"
              :label="{ text: 'New Office Opening Date & Time' }"
              :editor-options="{
                type: 'datetime',
                displayFormat: 'dd/MM/yyyy HH:mm',
                stylingMode: 'outlined',
              }"
              :validation-rules="[
                { type: 'required', message: 'Office opening date & time is required' },
              ]"
            />
            <DxSimpleItem
              data-field="newOfficeReEntryDateTime"
              editor-type="dxDateBox"
              :label="{ text: 'New Office Re-Entry Date & Time' }"
              :editor-options="{
                type: 'datetime',
                displayFormat: 'dd/MM/yyyy HH:mm',
                stylingMode: 'outlined',
              }"
              :validation-rules="[
                { type: 'required', message: 'Re-entry date & time is required' },
              ]"
            />
            <DxSimpleItem
              data-field="newReturnWorkDateTime"
              editor-type="dxDateBox"
              :label="{ text: 'New Return to Work Date & Time' }"
              :editor-options="{
                type: 'datetime',
                displayFormat: 'dd/MM/yyyy HH:mm',
                stylingMode: 'outlined',
              }"
              :validation-rules="[
                { type: 'required', message: 'Return to work date & time is required' },
              ]"
            />
            <DxTextArea
              data-field="notes"
              :input-attr="{ 'aria-label': 'Notes' }"
              :validation-rules="[{ type: 'required', message: 'Notes are required' }]"
            />
            <DxSimpleItem
              data-field="notes"
              editor-type="dxTextArea"
              :editor-options="{
                height: 90,
                stylingMode: 'outlined',
              }"
              :input-attr="{ 'aria-label': 'Notes' }"
              :validation-rules="[{ type: 'required', message: 'Notes are required' }]"
            />
            <DxFileUploader accept="image/*"> </DxFileUploader>
            <DxSimpleItem
              data-field="file"
              editor-type="dxFileUploader"
              :editor-options="{
                selectButtonText: 'Select file',
                uploadButtonText: 'Upload file',
                showFileList: false,
                multiple: false,
                accept: '*',
              }"
            />
            <DxItem
              :button-options="saveButtonOptions"
              item-type="button"
              css-class="mt-6"
              horizontal-alignment="left"
            />
            <DxItem
              :button-options="closeButtonOptions"
              item-type="button"
              css-class="mt-6"
              horizontal-alignment="right"
            />
          </DxForm>
        </fieldset>
      </template>
    </DxPopup>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Attendance",
});

import { onMounted, ref } from "vue";
import { DxItem } from "devextreme-vue/data-grid";
import { DxForm, DxSimpleItem } from "devextreme-vue/form";
import DataGrid from "@/components/ui/DataGrid.vue";
import type { AttendanceRecord, Form, SearchForm } from "@/types/Attendance";
import { useHead } from "nuxt/app";
import { DxPopup } from "devextreme-vue/popup";
import { DxTextArea } from "devextreme-vue/text-area";
import { DxFileUploader } from "devextreme-vue/file-uploader";
import { useAttendanceStore } from "@/stores/attendance";
import notify from "devextreme/ui/notify";

const popupVisible = ref(false);
const operationType = ref("Add");
const attendanceStore = useAttendanceStore();

onMounted(() => {
  attendanceStore.loadRecords(attendanceRecords.value);
});

const saveButtonOptions = {
  text: "Save",
  useSubmitBehavior: true,
  type: "default",
  stylingMode: "contained",
  icon: "save",
  class: "mt-4",
  onClick: () => {
    addRecord(operationType.value);
  },
};

const closeButtonOptions = {
  text: "Cancel",
  useSubmitBehavior: true,
  type: "danger",
  stylingMode: "contained",
  icon: "close",
  class: "mt-4",
  onClick: () => {
    popupVisible.value = false;
  },
};

const buttonOptions = {
  text: "Search",
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
  display: "",
});

const form = ref<Form>({
  typeOfReason: "",
  reason: "",
  newStartDateTime: new Date(),
  newOfficeOpeningDateTime: new Date(),
  newOfficeReEntryDateTime: new Date(),
  newReturnWorkDateTime: new Date(),
  notes: "",
  document: {
    type: Object,
    default: () => ({}) as File,
  },
});

const attendanceRecords = ref<AttendanceRecord[]>([
  {
    id: 1,
    typeOfReason: "Medical",
    reason: "Recovering from surgery",
    newStartDateTime: new Date("2025-04-15T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-20T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-25T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-26T09:00:00"),
    notes: "Doctor advised extended rest.",
    document: new File([""], "medical_report.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 2,
    typeOfReason: "Personal",
    reason: "Family emergency",
    newStartDateTime: new Date("2025-04-12T08:30:00"),
    newOfficeOpeningDateTime: new Date("2025-04-18T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-21T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-22T09:00:00"),
    notes: "Need time to resolve family matters.",
    document: new File([""], "family_leave_doc.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 3,
    typeOfReason: "Relocation",
    reason: "Moving to new city",
    newStartDateTime: new Date("2025-04-10T10:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-15T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-19T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-20T09:00:00"),
    notes: "Awaiting logistics completion.",
    document: new File([""], "relocation_proof.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 4,
    typeOfReason: "Bereavement",
    reason: "Loss in family",
    newStartDateTime: new Date("2025-04-05T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-12T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-15T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-16T09:00:00"),
    notes: "Traveling out of country.",
    document: new File([""], "bereavement_doc.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 5,
    typeOfReason: "Medical",
    reason: "Mental health break",
    newStartDateTime: new Date("2025-04-08T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-14T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-18T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-19T09:00:00"),
    notes: "Recommendation from therapist.",
    document: new File([""], "mental_health_note.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 6,
    typeOfReason: "Vacation",
    reason: "Pre-approved annual leave",
    newStartDateTime: new Date("2025-04-20T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-27T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-30T09:00:00"),
    newReturnWorkDateTime: new Date("2025-05-01T09:00:00"),
    notes: "Trip with family.",
    document: new File([""], "vacation_plan.pdf"),
    status: "Approved",
    type: "Leave",
  },
  {
    id: 7,
    typeOfReason: "COVID-19",
    reason: "Tested positive",
    newStartDateTime: new Date("2025-04-01T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-10T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-15T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-16T09:00:00"),
    notes: "Under isolation.",
    document: new File([""], "covid_positive_report.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 8,
    typeOfReason: "Childcare",
    reason: "Newborn care",
    newStartDateTime: new Date("2025-04-03T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-17T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-24T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-25T09:00:00"),
    notes: "Maternity leave extension.",
    document: new File([""], "childcare_letter.pdf"),
    status: "Approved",
    type: "Leave",
  },
  {
    id: 9,
    typeOfReason: "Education",
    reason: "Attending a short course",
    newStartDateTime: new Date("2025-04-06T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-14T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-18T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-19T09:00:00"),
    notes: "Certificate course for upskilling.",
    document: new File([""], "course_enrollment.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 10,
    typeOfReason: "Marriage",
    reason: "Getting married",
    newStartDateTime: new Date("2025-04-10T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-20T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-25T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-26T09:00:00"),
    notes: "Requested wedding leave.",
    document: new File([""], "wedding_invitation.pdf"),
    status: "Approved",
    type: "Leave",
  },
  {
    id: 11,
    typeOfReason: "Legal",
    reason: "Court hearing",
    newStartDateTime: new Date("2025-04-05T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-10T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-12T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-13T09:00:00"),
    notes: "Legal obligation.",
    document: new File([""], "court_notice.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 12,
    typeOfReason: "Travel",
    reason: "Visa appointment",
    newStartDateTime: new Date("2025-04-07T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-12T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-15T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-16T09:00:00"),
    notes: "Travel plans confirmed.",
    document: new File([""], "visa_confirmation.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 13,
    typeOfReason: "Medical",
    reason: "Dental surgery",
    newStartDateTime: new Date("2025-04-04T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-08T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-10T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-11T09:00:00"),
    notes: "Recovery needed.",
    document: new File([""], "dental_surgery_note.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 14,
    typeOfReason: "Religious",
    reason: "Pilgrimage travel",
    newStartDateTime: new Date("2025-04-18T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-26T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-30T09:00:00"),
    newReturnWorkDateTime: new Date("2025-05-01T09:00:00"),
    notes: "Spiritual commitment.",
    document: new File([""], "pilgrimage_letter.pdf"),
    status: "Pending",
    type: "Leave",
  },
  {
    id: 15,
    typeOfReason: "Personal",
    reason: "House renovation",
    newStartDateTime: new Date("2025-04-09T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-16T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-20T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-21T09:00:00"),
    notes: "Noise disruption at home.",
    document: new File([""], "renovation_invoice.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 16,
    typeOfReason: "Weather",
    reason: "Flooding in area",
    newStartDateTime: new Date("2025-04-01T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-06T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-10T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-11T09:00:00"),
    notes: "Unsafe commute.",
    document: new File([""], "weather_alert.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 17,
    typeOfReason: "Transport",
    reason: "Vehicle breakdown",
    newStartDateTime: new Date("2025-04-02T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-07T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-09T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-10T09:00:00"),
    notes: "Awaiting repairs.",
    document: new File([""], "repair_receipt.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 18,
    typeOfReason: "Other",
    reason: "Internet outage",
    newStartDateTime: new Date("2025-04-03T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-08T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-10T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-11T09:00:00"),
    notes: "Network issues at home.",
    document: new File([""], "outage_report.pdf"),
    status: "Approved",
    type: "Request",
  },
  {
    id: 19,
    typeOfReason: "Caregiving",
    reason: "Taking care of elderly parent",
    newStartDateTime: new Date("2025-04-06T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-13T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-17T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-18T09:00:00"),
    notes: "Temporary caregiver unwell.",
    document: new File([""], "caregiving_note.pdf"),
    status: "Pending",
    type: "Request",
  },
  {
    id: 20,
    typeOfReason: "Military",
    reason: "Reservist duty",
    newStartDateTime: new Date("2025-04-05T09:00:00"),
    newOfficeOpeningDateTime: new Date("2025-04-15T09:00:00"),
    newOfficeReEntryDateTime: new Date("2025-04-20T09:00:00"),
    newReturnWorkDateTime: new Date("2025-04-21T09:00:00"),
    notes: "Government call-up.",
    document: new File([""], "military_orders.pdf"),
    status: "Approved",
    type: "Request",
  },
]);

const onSearch = () => {
  console.log("Search triggered with:", searchForm.value);
};

const onEdit = (record: AttendanceRecord) => {
  console.log(record);

  form.value = {
    id: record.id,
    typeOfReason: record.typeOfReason,
    reason: record.reason,
    newStartDateTime: record.newStartDateTime,
    newOfficeOpeningDateTime: record.newOfficeOpeningDateTime,
    newOfficeReEntryDateTime: record.newOfficeReEntryDateTime,
    newReturnWorkDateTime: record.newReturnWorkDateTime,
    notes: record.notes,
    document: { type: Object },
  };

  operationType.value = "edit";
  popupVisible.value = true;
};

const addNewRecord = () => {
  form.value = {
    typeOfReason: "",
    reason: "",
    newStartDateTime: new Date(),
    newOfficeOpeningDateTime: new Date(),
    newOfficeReEntryDateTime: new Date(),
    newReturnWorkDateTime: new Date(),
    notes: "",
    document: {
      type: Object,
    },
  };

  operationType.value = "add";
  popupVisible.value = true;
};

const addRecord = (type: string) => {
  const lastId =
    attendanceStore.records.length > 0
      ? attendanceStore.records[attendanceStore.records.length - 1].id
      : 0;

  const params: AttendanceRecord = {
    id: type === "add" ? lastId + 1 : form.value.id,
    typeOfReason: "Personal",
    reason: "Family emergency",
    newStartDateTime: form.value.newStartDateTime,
    newOfficeOpeningDateTime: form.value.newOfficeOpeningDateTime,
    newOfficeReEntryDateTime: form.value.newOfficeReEntryDateTime,
    newReturnWorkDateTime: form.value.newReturnWorkDateTime,
    notes: form.value.notes,
    document: form.value.document,
    status: "Approved",
    type: "Request",
  };

  const change: AttendanceRecord = {
    ...form.value,
    ...params,
  };

  let message = "Attendance records loaded successfully and will notify to your supervisor.";
  if (type === "add") {
    attendanceStore.addRecord(change);
  } else {
    message = "Attendance records updated successfully and will notify to your supervisor.";
    attendanceStore.updateRecord({ ...change, id: change.id });
  }

  attendanceStore.records = [...attendanceStore.records];
  popupVisible.value = false;
  notify({
    message: message,
    type: "success",
    displayTime: 3000,
    width: 600,
    position: {
      my: "top center",
      at: "top center",
      of: window,
    },
  });
};
</script>
