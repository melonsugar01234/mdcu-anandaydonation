export interface Province {
  id: string;
  name_th: string;
  name_en: string;
  geography_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface District {
  id: string;
  name_th: string;
  name_en: string;
  province_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface SubDistrict {
  id: string;
  postal_code: string;
  name_th: string;
  name_en: string;
  district_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
