export interface ICountryItem {
  timezone: string;
  start_time: string;
  end_time: string;
  is_base_timezone: boolean;
}
export interface ICountryMap {
  [key: string]: ICountryItem;
}

export const HOUR_LIST = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
