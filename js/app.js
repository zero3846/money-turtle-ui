import * as client from './client.js'
import * as data from './data.js'

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

        const categories = data.getCategories();
        const savingsBalance = data.getSavingsBalance().entries();

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
                <p>Savings Balance: ${savingsBalance}</p>
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
    const incomeEarned = data.addCategory("Income Earned", "savings");
    const groceries = data.addCategory("Groceries", "expense");
    data.submitEarn('Acme Bank', incomeEarned, 1200, 'USD', new Date());
    data.submitSpend('Acme Bank', groceries, 12, 'USD', new Date());
}

const appElem = document.querySelector('.app');

if (client.getCurrentUser()) {
    appElem.innerHTML = getHomePageHTML();
} else {
    appElem.innerHTML = getLoginPageHTML();
}