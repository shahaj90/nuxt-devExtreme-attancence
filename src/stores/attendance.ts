import type { AttendanceRecord } from "@/types/Attendance";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttendanceStore = defineStore("attendance", () => {
  const records = ref<AttendanceRecord[]>([]);

  function loadRecords(data: AttendanceRecord[]) {
    records.value = data;
  }

  function addRecord(record: AttendanceRecord) {
    records.value.push({ ...record, id: Date.now() }); // Generate unique ID
  }

  function updateRecord(updated: AttendanceRecord) {
    const index = records.value.findIndex((r) => r.id === updated.id);
    if (index !== -1) records.value[index] = updated;
  }

  function deleteRecord(id: number) {
    records.value = records.value.filter((r) => r.id !== id);
  }

  return { records, loadRecords, addRecord, updateRecord, deleteRecord };
});
