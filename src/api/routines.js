// routines api fetches

export async function fetchRoutines() {
    try {
        const response = await fetch(
            'http://localhost:3001/api/routines',
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        const data = await response.json();
        console.log("routines data: ", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}


export async function newRoutineFetch( name, goal, isPublic ) {
    try {
        const response = await fetch(
            'http://localhost:3001/api/routines',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: isPublic
                })
            }
        )
        const data = await response.json();
        console.log("new routine data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}


export async function editRoutineFetch(routineId, name, goal, isPublic) {
    try {
        const response = await fetch(
            `http://localhost:3001/api/routines/${routineId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: name,
                    goal: goal,
                    isPublic: isPublic
                })
            }
        )

        const data = await response.json();
        console.log("edit routine data: ", data);
        return data;
    } catch(error) {
        console.log(error);
    }
}