import { CREATE_ROOM, END_LOADING, GET_ROOMS, START_LOADING, FILTER_ROOMS } from "../constants/constants"


const url = process.env.REACT_APP_API_URL + 'room';

export const createRoom = async (room, user, dispatch) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json', authorization: `Bearer ${user?.token}`},
            body: JSON.stringify(room)
        });
        const data = await response.json();
        dispatch({type: CREATE_ROOM, payload:data.result})
        return data.success;
    } catch (error) {
        console.log(error)
        return false;
    }
}


export const getRooms = async (dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch({type: GET_ROOMS, payload: data.result})
    } catch (error) {
        console.log(error)
    }
    dispatch({type: END_LOADING})
}

export const getRoom = async (roomId, dispatch) => {
    dispatch({type: START_LOADING})
    try {
        const response = await fetch(`${url}/${roomId}`);
        const data = await response.json();
        dispatch({type: END_LOADING})
        if(data.success) return data.result
        return {} 
    } catch (error) {
        console.log(error)
        dispatch({type: END_LOADING})
        return {}
    }
}


export const getCities = async () => {
    try {
        const response = await fetch( process.env.REACT_APP_API_URL + 'city')
        const data = await response.json();
        if(data.success) return data.result
        return []
    } catch (error) {
        console.log(error)
        return []
    }
}

export const filterRooms = (rooms, city, price, dispatch) => {
    const filteredRooms = rooms.filter(room => {
        return (room.price <= price) && ( !city || room.city === city )
    })
    dispatch({ type: FILTER_ROOMS , payload: filteredRooms})
}