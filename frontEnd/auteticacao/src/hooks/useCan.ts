import { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';
import { validateUserPermissions } from '../services/utils/validateUserPermissions';

type UseCanParms = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions = [], roles = [] }: UseCanParms) {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validateUserPermissions({
    user: user as any,
    permissions,
    roles,
  });

  return userHasValidPermissions;
}
