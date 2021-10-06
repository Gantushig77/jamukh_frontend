const logout = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem("authenticated", "false")
            localStorage.removeItem("token")
            console.log('logged out')
            resolve();
        } catch(e) {
            reject(e);
        }
    })

}

export { logout }