'use client';
import { useState, useEffect } from 'react';
import { fetchHolidays } from '@/app/(main)/_UI/lib/functions';
import { Holiday } from '../lib/definitions';

// 22-02-05
// Hook to fetch holidays
/**
 * Custom hook to fetch holidays between a start and end date.
 * @param start - The start date in string format.
 * @param end - The end date in string format.
 * @returns An array of holidays between the start and end date.
 */
export const useGetHolidays = (start: string, end: string) => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);

    /**
     * Fetches holiday data from the server and updates the holidays state.
     */
    const fetchHolidayData = async () => {
        const holidayData = await fetchHolidays(start, end);
        setHolidays(holidayData);
    };

    useEffect(() => {
        if (start && end) {
            fetchHolidayData();
        }
    }, [start, end]);

    return holidays.filter(
        (holiday) =>
            holiday.date.split("-")[2] >= start.split("-")[2] &&
            holiday.date.split("-")[2] <= end.split("-")[2]
    );
};