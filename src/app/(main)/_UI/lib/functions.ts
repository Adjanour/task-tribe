import axios from "axios";
import {Holiday} from "./definitions"
export const fetchHolidays = async (startDate: String, endDate: String)=>
{
    const response = await axios.get(`https://holidayapi.com/v1/holidays?pretty&key=7e488581-b5cf-4f4a-8332-0aba5f353c31&country=GH&year=2022&month=${startDate ? startDate:12}`)
    const holidayData = response.data;
  const holidays = holidayData.holidays.map((holiday:Holiday,key:number) => {
    return {
      id: key,
      name: holiday.name,
      date: holiday.date,
    };
  });

  return holidays;

}