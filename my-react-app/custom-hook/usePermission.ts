// /** @format */

// import { useMemo } from "react";

// export type Permission = "admin" | "editor" | "viewer";

// export function usePermission(
//   userPermissions: Permission[] = [],
//   required: Permission | Permission[]
// ) {
//   return useMemo(() => {
//     if (!userPermissions || userPermissions.length === 0) return false;

//     if (Array.isArray(required)) {
//       return required.some((perm) => userPermissions.includes(perm));
//     }

//     return userPermissions.includes(required);
//   }, [userPermissions, required]);
// }
