export interface IDevice {
  _id: string;
  unique_id: string;
  name: string;
  note: string;
  location_id: number;
  category_id: number;
  space_id: number;
  date_created: string;
  active: boolean;
}
