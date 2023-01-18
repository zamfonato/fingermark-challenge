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
