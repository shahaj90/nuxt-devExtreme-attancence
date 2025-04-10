export interface AttendanceRecord {
  id: number;
  dateGetToWork: string;
  dateOutOfOffice: string;
  dateReenterOffice: string;
  dateBackToWork: string;
  status: string;
  type: string;
}
