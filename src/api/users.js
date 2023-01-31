// users API fetches


export async function registerFetch(username, password) {
    try {
        const response = await fetch(
            'http://localhost:3001/api/users/register',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        username: username,
                        password: password
                })
            }
        )
        const data = await response.json();
        console.log("register data:", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function loginFetch(username, password) {
    try {
        const response = await fetch(
            'http://localhost:3001/api/users/login',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        )
        const data = await response.json();
        console.log("login data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function userFetch() {    
    try {
        const response = await fetch(
            'http://localhost:3001/api/users/me',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            
        const data = await response.json();
        console.log("users/me data: ", data);
        return data;

    } catch(error) {
        console.log(error);
    }
}


export async function userRoutinesFetch(username) {
    try {
        const response = await fetch(
            `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await response.json();
        console.log(`users/${username}/routines data: `, data);
        return data;

    } catch (error) {
        console.log(error);
    }
}