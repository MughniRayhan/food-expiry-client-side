import React, { use } from 'react'
import { AuthContext } from '../Providers/AuthProvider';
function UseAuth() {
    const authInfo = use(AuthContext);
    return authInfo;
}

export default UseAuth