export interface AttendanceRecord {
  id: number;
  typeOfReason: string;
  reason: string;
  newStartDateTime: Date;
  newOfficeOpeningDateTime: Date;
  newOfficeReEntryDateTime: Date;
  newReturnWorkDateTime: Date;
  notes: string;
  document: string;
  file?: File;
  status: string;
  type: string;
}

export interface SearchForm {
  type: string;
  status: string;
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
