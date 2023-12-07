
export interface status {
    status_id: number;
    status_name: string;
}

export type Holiday = {
    name: string; // The name of the holiday.
    name_local?: string; // The local name of the holiday (optional).
    language?: string; // The language of the holiday name (optional).
    description?: string; // A description of the holiday (optional).
    country: string; // The country where the holiday is observed.
    location?: string; // The specific location within the country where the holiday is observed (optional).
    type: string; // The type of the holiday (e.g., National, Public, Observance).
    date: string; // The date of the holiday in format "DD/MM/YYYY".
    date_year: string; // The year of the holiday.
    date_month: string; // The month of the holiday (numeric value).
    date_day: string; // The day of the holiday (numeric value).
    week_day: string; // The day of the week the holiday falls on.
  }
  