export interface KioskType {
  id: String;
  serialKey: String;
  description: String;
  isKioskClosed: Boolean;
  storeOpensAt: Date;
  storeClosesAt: Date;
}

export interface TableProps {
  items: KioskType[];
  edit: Function;
  remove: Function;
}

export interface ServerCrudResponse {
  data: { message: string, id?:string };
}

export interface ThProps {
  children: React.ReactNode;
}

export interface TdProps {
  children: React.ReactNode;
}

export interface TitleProps {
  children: React.ReactNode;
}

export interface AlertParams {
  text: string;
  type: "info" | "danger" | "success" | "warning";
}

export type AlertColorTypes = "blue" | "red" | "green" | "yellow";

export type ViewType = "list" | "crud";

export interface CheckCallback {
  (enabled: boolean): void;
}

export interface TimePickerCallback {
  (time: Date): void;
}

export interface FormCallback {
  (kiosk: KioskType, isEditing: boolean): void;
}

export interface FormProps {
  callback: FormCallback;
  alert?: AlertParams;
}

export interface CheckProps {
  enabled: Boolean;
  labels: string[];
  callback: CheckCallback;
}

export interface TimePickerProps {
  label: string;
  callback: TimePickerCallback;
  defaultValue: Date;
}

export type Meridiem = "AM" | "PM";

export interface CardStatsProps {
  statSubtitle: string;
  statTitle: string;
  statDescripiron: string;
  statIconName: string;
  statIconColor: string;
}