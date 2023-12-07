import React from 'react';
import "@/app/globals.css";

import { Input, Button } from "antd";


import {
    SearchOutlined,
    SaveOutlined,
    PlusOutlined,
    CloseOutlined,
    PrinterOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import {cn} from "@/app/(main)/task/_lib/utils";

export const Navbar = () =>{

    return(
        <div
            className={cn(
                "bg-white  justify-content-center w-full rounded-md shadow-md flex lg:grid-cols-10 md:grid-clos-7 gap-1 border m-0 p-3  dark:bg-black",
                "sticky-header"
            )}
        >
            <Button
                icon={<CloseOutlined />}
                className="dark:text-white"
                type="default"
            >
                Close
            </Button>
            <Button
                icon={<SaveOutlined />}
                className="dark:text-white"
                type="default"
            >
                Save
            </Button>
            <Button
                icon={<PlusOutlined />}
                className="dark:text-white"
                type="default"
            >
                New
            </Button>
            <div className="w-fit">
                <Input
                    showCount
                    placeholder="Search..."
                    style={{ width: "100%" }}
                    suffix={
                        <SearchOutlined
                            onClick={() => alert("Search successful")}
                        />
                    }
                />
            </div>
            <div>
                <Button className="dark:text-white" icon={<UploadOutlined />}>
                    Upload
                </Button>
            </div>
            <div>
                <Button
                    className="dark:text-white"
                    icon={<PrinterOutlined />}
                >
                    Print
                </Button>
            </div>
            <div className="bg-blue-500 text-white h-fit mt-[0.5px] rounded-md shadow-md dark:bg-white dark:text-black p-1 w-fit flex flex-row text-sm  md:hidden lg:block">
            </div>
            <div className="flex justify-center text-sm mt-[0.5px] align-middlebg-white rounded-md h-fit  w-fit p-1 text-black dark:text-white shadow-md md:hidden lg:block">
                <p>Welcome Bernard</p>
            </div>
            <div className="flex justify-center align-middle shadow-lg rounded-full w-fit h-fit">

            </div>
            </div>
    )
}
