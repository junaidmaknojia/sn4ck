import { getChannels } from './channels';
import { setGlbl } from './default';

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER
})



// thunks
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))

}

// get all users
export const listUsers = async() => {
    const response = await fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const allUsers = await response.json();
    return allUsers;
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(getChannels(data.channels));
    dispatch(setGlbl(data.glbl));
    dispatch(setUser(data.user));
    return {};
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (firstName, lastName, username, email, password, profilePicture) => async (dispatch)=> {
    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('image', profilePicture);
    formData.append('password', password);

    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
        },
        body: formData
    });
    const data = await response.json();
    dispatch(getChannels(data.channels))
    dispatch(setGlbl(data.glbl))
    dispatch(setUser(data.user));
    return {};
}

// reducer

const initialState = { user: null };

// useSelector(state => state.session.user)

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}
