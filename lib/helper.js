const BASE_URL = "http://localhost:3000/"

// All user
export const getUsers = async () => {
    const response = await fetch(`${BASE_URL}api/users`)
    const json = await response.json()

    return json;
}

// //single user

export const getUser = async (userid) => {
    const response = await fetch(`${BASE_URL}api/users/${userid}`);
    const json = await response.json()

    if (json) return json;
    return {}
}

//posting a new user

export async function addUser(formData) {
    try {
        const Options = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(formData)
        }
        const response = await fetch(`${BASE_URL}api/users`, Options)
        const json = await response.json()

        return json;
    } catch (error) {
        return error;
    }
}

// //update a new user
export async function updateUser(userid, formData) {
    const Options = {
        method: 'PUT',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(formData)
    }
    const response = await fetch(`${BASE_URL}api/users/${userid}`, Options)
    const json = await response.json()

    return json;

}

// //delete a new user

export async function deleteUser(userid) {
    const Options = {
        method: 'DELETE',
        headers: { 'Content-Type': "application/json" },

    }
    const response = await fetch(`${BASE_URL}api/users/${userid}`, Options)
    const json = await response.json()

    return json;
}

