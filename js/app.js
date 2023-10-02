import * as client from './client.js'

const appElem = document.querySelector('.app');
appElem.innerHTML = `<h1>Money Turtle</h1>`;

if (client.getCurrentUser()) {
    console.log(`Logged in as ${client.getCurrentUser()}`);
} else {
    console.log(`Logged out`);

    appElem.classList = 'app login';
    appElem.innerHTML = `
        <div class="flex column">
            <h1>Money Turtle</h1>
            <form class="login-form">
                <input id="username" placeholder="Username" type="text">
                <input id="password" placeholder="Password" type="password">
                <input class="button" type="submit" value="Login">
            </form>
        </div>
    `;
}