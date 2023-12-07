import React from 'react';
import { Button} from 'antd';

type prop ={
    text:string;
    formAction?:string;
    loading?:boolean;
    onClick?: () => void;
}
const ButtonComponent: React.FC<prop> = ({text,formAction,loading,onClick}) => (
    <Button htmlType='submit' formAction={formAction} loading={loading} className=" dark:text-white " onClick={onClick}>{text}</Button>
);

export default ButtonComponent;
