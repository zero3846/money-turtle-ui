import * as client from './client.js'
import * as store from './store.js'

function getLoginPageHTML() {
    return `
        <div class="login">
            <h1>Money Turtle</h1>
            <form>
                <input id="username" placeholder="Username" type="text">
                <input id="password" placeholder="Password" type="password">
                <input class="button" type="submit" value="Login">
            </form>
        </div>
    `;
}

function getHomePageHTML() {
    try {
        loadUserData();

        const categories = store.getCategories();

        return `
            <section class="card">
                <h1>Logged in as '${client.getCurrentUser()}'</h1>
            </section>

            <section class="card">
                <h2>Budget</h2>
                <ul>${
                    categories.map(c =>
                        `<li>${c.name}: ${c.type}</li>`
                    ).join('')
                }</ul>
            </section>

            <section class="card">
                <h2>Accounts</h2>
            </section>
        `;
    } catch (error) {
        return `
            <section class="card">
                <h1>Logged in as '${client.getCurrentUser()}'</h1>
            </section>

            <section class="card">
                <p>ERROR: ${error}</p>
            </section>
        `;
    }
}

function loadUserData() {
    store.addCategory("Emergency Fund", "savings");
    store.addCategory("Groceries", "expense");
}

const appElem = document.querySelector('.app');

if (client.getCurrentUser()) {
    appElem.innerHTML = getHomePageHTML();
} else {
    appElem.innerHTML = getLoginPageHTML();
}