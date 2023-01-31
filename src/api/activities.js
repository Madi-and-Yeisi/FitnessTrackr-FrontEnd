// activities fetches


export async function activitiesFetch() {
    try {
        const response = await fetch(
            'http://localhost:3001/api/activities',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        const data = await response.json();
        console.log("activities data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function newActivityFetch( name, description, imageUrl ) {
    try {
        const response = await fetch(
            'http://localhost:3001/api/activities',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    imageUrl: imageUrl
                })
            }
        )
        const data = await response.json();
        console.log("new activity data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export async function editActivityFetch(activityId, name, description, imageUrl) {
    try {
        const response = await fetch(
            `http://localhost:3001/api/activities/${activityId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    imageUrl: imageUrl
                })
            }
        )

        const data = await response.json();
        console.log("edit activity data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}