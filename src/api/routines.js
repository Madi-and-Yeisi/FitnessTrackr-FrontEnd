// routines api fetches

export async function fetchRoutines() {
    try {
        const response = await fetch(
            'https://fitnesstrac-kr.herokuapp.com/api/routines',
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
