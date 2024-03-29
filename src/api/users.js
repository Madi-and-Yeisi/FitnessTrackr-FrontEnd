// users API fetches


export async function registerFetch(username, password) {
    try {
        const response = await fetch(
            'https://my-fitness-trackr.onrender.com/api/users/register',
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
        // console.log("register data:", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function loginFetch(username, password) {
    try {
        const response = await fetch(
            'https://my-fitness-trackr.onrender.com/api/users/login',
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
        // console.log("login data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function meFetch() {    
    try {
        const response = await fetch(
            'https://my-fitness-trackr.onrender.com/api/users/me',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            
        const data = await response.json();
        // console.log("users/me data: ", data);
        return data;

    } catch(error) {
        console.log(error);
    }
}


export async function myRoutinesFetch() {    
    try {
        const response = await fetch(
            'https://my-fitness-trackr.onrender.com/api/users/my-routines',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            })
            
        const data = await response.json();
        // console.log("my routines data: ", data);
        return data;

    } catch(error) {
        console.log(error);
    }
}


export async function userRoutinesFetch(username) {
    try {
        const response = await fetch(
            `https://my-fitness-trackr.onrender.com/api/users/${username}/routines`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await response.json();
        // console.log(`users/${username}/routines data: `, data);
        return data;

    } catch (error) {
        console.log(error);
    }
}