function userIsAdminOrHigher(data, href) {
    if (data?.me?.role !== "guest" || data?.me?.role !== "member") href();
}

function userIsAdmin(data, href) {
    if (data?.me?.role !== "superadmin") href();
}

export {userIsAdminOrHigher, userIsAdmin}