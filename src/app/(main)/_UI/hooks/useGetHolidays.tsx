'use client';
import {useState,useEffect} from 'react';
// import {Holiday} from './lib/definitions'
import {fetchHolidays} from '@/app/(main)/_UI/lib/functions';
import { Holiday } from '../lib/definitions';

//22-02-05
//hook to fetch holidays
export const useGetHolidays = (start: String, end: String) => {
    const [holidays,setHolidays] = useState<Holiday[]>([]);

    useEffect(() => {
        const fetchHolidayData =  async () => {
            const holidayData = await fetchHolidays(start, end);
            setHolidays( holidayData);
        };
    
        if (start && end) {
          fetchHolidayData();
        }
      }, [start, end]);

      return holidays;
}
