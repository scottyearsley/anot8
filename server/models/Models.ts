export interface Skin {
  id: string;
  title?: string;
  url?: string;
  hotspots: Hotspot[];
  fabric?: any;
}
export interface Hotspot {
  id: string;
  url: string;
  tooltip?: string;
}
