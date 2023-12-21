import React, { useState } from 'react';
import Link from 'next/link';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import {
    BiLogoDigitalocean,
    BiNotification,
    BiSolidNotification,
    BiUserCircle,
    BiSolidUserCircle,
} from "react-icons/bi";

import { RiTaskLine, RiTaskFill } from "react-icons/ri";
import { FaRegStickyNote, FaStickyNote } from "react-icons/fa";
import { GoHome as HomeIcon, GoHomeFill as HomeFillIcon } from "react-icons/go";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BsGrid ,BsFillGridFill} from "react-icons/bs";
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link href="/">Home</Link>, '1', <HomeIcon />),
    getItem('Tasks', 'sub1', <RiTaskLine />, [
        getItem(<Link href="/task/all">All Tasks</Link>, '4', <RiTaskFill />),
        getItem(<Link href="/task/create">Create Task</Link>, '5', <FaRegStickyNote />),
        getItem(<Link href="/task/update">Update Task</Link>, '6', <FaStickyNote />),
        getItem(<Link href="/task/edit">Edit Task</Link>, '7', <HiOutlineArrowRightCircle />),
        getItem(<Link href="/task/dashboard">Dashboard</Link>, 'sub2', <BsFillGridFill />, ),
    ]),
    getItem(<Link href="/dashboard">Dashboard</Link>, 'sub2', <BsFillGridFill />, ),
    getItem(<Link href="/settings">Settings</Link>, 'sub3', <IoSettingsOutline />, ),
    getItem(<Link href="/notifications">Notifications</Link>, 'sub4', <BiSolidNotification />, ),
    getItem(<Link href="/profile">Profile</Link>, 'sub5', <BiSolidUserCircle />, ),
    getItem(<Link href="/notes">Notes</Link>, 'sub6', <FaStickyNote />, ),
];

const SidebarMenu: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                onClick={(menuInfo) => {
                    if (menuInfo.key) {
                        window.location.href = menuInfo.key as string;
                    }
                }}
            />
        </>
    );
};

export default SidebarMenu;
