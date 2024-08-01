export const getLoginToken = async () => {

    const { default: fetch } = await import('node-fetch');
    const response = await fetch('http://localhost:2221/api/login', {
        method: "POST",
        body: JSON.stringify({"username": "admin","password": "Admin123"})
    });

    if (response.status !== 200) {
        throw new Error("An Error trying to get login token")
    }

    const data = await response.json();

    return data
}