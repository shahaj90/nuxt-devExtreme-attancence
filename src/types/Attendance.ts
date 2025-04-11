export interface AttendanceRecord {
  id: number;
  typeOfReason: string;
  reason: string;
  newStartDateTime: Date;
  newOfficeOpeningDateTime: Date;
  newOfficeReEntryDateTime: Date;
  newReturnWorkDateTime: Date;
  notes: string;
  document: File;
  status: string;
  type: string;
}

export interface SearchForm {
  id: string;
  name: string;
  display: string;
}

export interface Form {
  id: number;
  typeOfReason: string;
  reason: string;
  newStartDateTime: Date;
  newOfficeOpeningDateTime: Date;
  newOfficeReEntryDateTime: Date;
  newReturnWorkDateTime: Date;
  notes: string;
  document: File;
}
