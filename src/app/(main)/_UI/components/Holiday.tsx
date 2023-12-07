import React from 'react';
import {Holiday} from "@/app/(main)/_UI/lib/definitions";

export const HolidayComponent =  ({holidays}:{holidays:Holiday[]}) =>{
    return (
        <div className="p-1 rounded-md  bg-white justify-center  w-fit m-auto">
            {/*<h4 className="text-blue-500 text-sm">Holidays within Task Timeframe</h4>*/}
            <table className="table">
                <thead className="">
                <th className="m-1 text-sm">Holiday</th>
                <th className="m-1 text-sm">Date</th>
                </thead>
                <tbody>
                {holidays.map((holiday:any) => (
                    <tr key={holiday.id} className="table-row">
                        <td className="text-sm table-cell" key={holiday.id}>{holiday.name}</td>
                        <td className="text-sm table-cell" key={holiday.id}>{holiday.date}</td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}

