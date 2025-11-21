/** @format */

import { useMemo } from "react";
import { usePermission, Permission } from "./usePermission";

export interface TabItem {
  key: string;
  label: string;
  required?: Permission | Permission[];
}

export function usePermissionTabs(
  tabs: TabItem[],
  userPermissions: Permission[]
) {
  return useMemo(() => {
    return tabs.filter((tab) => {
      if (!tab.required) return true;
      return usePermission(userPermissions, tab.required);
    });
  }, [tabs, userPermissions]);
}
