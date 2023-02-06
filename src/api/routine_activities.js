// routine activities api fetches


export async function editRoutineActivityFetch(routineActivityId, count, duration) {
    try {
        const response = await fetch(
            `https://my-fitness-trackr.onrender.com/api/routine_activities/${routineActivityId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    count: count,
                    duration: duration
                })
            }
        )

        const data = await response.json();
        // console.log("edit routine activity data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function deleteRoutineActivityFetch(routineActivityId) {
    try {
        const response = await fetch(
            `https://my-fitness-trackr.onrender.com/api/routine_activities/${routineActivityId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )

        const data = await response.json();
        // console.log("delete routine activity data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}
