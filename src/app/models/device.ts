export interface IDevice {
  _id: string;
  unique_id: string;
  name: string;
  note: string;
  location_id: number;
  space_id: number;
  hours_view_id: number;
  category_id: number;
  latest_update: string;
  active: boolean;
}
