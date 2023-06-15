"use strict";
const url = 'http://localhost:4800';
const storeName = 'Sample';
function main() {
    console.log('Loaded');
    let state = {};
    const formElement = document.querySelector('.login-form');
    const logoutElement = document.querySelector('.logout');
    const buttonElement = document.querySelector('.show-button');
    const store = localStorage.getItem(storeName);
    if (store) {
        state.token = JSON.parse(store).token;
        formElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
    }
    else {
        formElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    }
    const login = async (event) => {
        event.preventDefault();
        const { elements } = event.target;
        const data = {
            user: elements.namedItem('user').value,
            password: elements.namedItem('password').value,
        };
        const urlLogin = url + '/user/login';
        const res = await fetch(urlLogin, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        state = await res.json();
        localStorage.setItem(storeName, JSON.stringify({ token: state.token }));
        formElement?.setAttribute('hidden', 'true');
        logoutElement?.removeAttribute('hidden');
        console.log(state);
    };
    const logout = () => {
        localStorage.removeItem(storeName);
        state = {};
        formElement?.removeAttribute('hidden');
        logoutElement?.setAttribute('hidden', 'true');
    };
    const handleClick = async () => {
        if (!state.token)
            return;
        const urlFilm = url + '/film';
        const res = await fetch(urlFilm, {
            headers: {
                Authorization: 'Bearer ' + state.token,
            },
        });
        const result = await res.json();
        console.log(result);
    };
    formElement.addEventListener('submit', login);
    buttonElement?.addEventListener('click', handleClick);
    logoutElement?.addEventListener('click', logout);
}
document.addEventListener('DOMContentLoaded', main);
