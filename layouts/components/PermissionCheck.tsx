import React, { useContext } from "react";
import { PermissionContext } from "../default";
interface IProps{
  children:any;
  permission:string;
}

const PermissionCheck = ({ children, permission }:IProps) => {
  const allowedPermissions:any = useContext(PermissionContext);

  if (allowedPermissions.permissions[permission]) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default PermissionCheck;