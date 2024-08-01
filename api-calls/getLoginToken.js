export const getLoginToken = async (username, password) => {

    const { default: fetch } = await import('node-fetch');
    const response = await fetch('http://localhost:2221/api/login', {
        method: "POST",
        body: JSON.stringify({"username": username, "password": password})
    });

    if (response.status !== 200) {
        throw new Error("An Error trying to get login token")
    }

    const data = await response.json();
    return data
}