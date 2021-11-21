import React from "react";

const fakeAuthProvider = {
    isAuthenticated: false,
    signIn(VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(100);
    },
    signOut(VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(100);
    }
};

export { fakeAuthProvider}