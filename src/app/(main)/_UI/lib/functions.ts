import axios from "axios";
import {Holiday} from "./definitions";
import {CustomDate} from "@/app/(main)/task/_lib/definitions";

/**
 * Fetches holidays from the holiday API within a specified date range.
 * @param {string} startDate - The start date of the range in format 'yyyy-mm-dd'. If not provided, defaults to December of the current year.
 * @param {string} endDate - The end date of the range in format 'yyyy-mm-dd'.
 * @returns {Promise<Array<Object>>} - An array of holiday objects with id, name, and date properties.
 */
export const fetchHolidays = async (startDate: string, endDate: string): Promise<Holiday[]> => {
    try {
        // Make API request to get holiday data
        const response = await axios.get(`https://holidayapi.com/v1/holidays?pretty&key=7e488581-b5cf-4f4a-8332-0aba5f353c31&country=GH&year=2022&month=${startDate ? startDate.split('-')[1] : '12'}`);
        const holidayData = response.data;

        // Transform holiday data into desired format
        const holidays:Holiday[] = holidayData.holidays.map((holiday: Holiday, key: number) => ({
            id: key,
            name: holiday.name,
            date: holiday.date,
        }));

        return holidays;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching holidays');
    }
}
/**
 * Converts a CustomDate object to a string representation in the format "YYYY-MM-DD".
 * @param dateString - The CustomDate object to convert.
 * @returns The string representation of the CustomDate object.
 */
export function processDateString(dateString: CustomDate|any) {
    // Extract year, month, and day from the CustomDate object
    const year = dateString.$y;
    const month = dateString.$M + 1;
    const day = dateString.$D;

    // Format the extracted values as a string in the format "YYYY-MM-DD"
    const formattedDateString = `${year}-${month}-${day}`;

    return formattedDateString;
}
