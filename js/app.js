import * as client from './client.js'
import * as model from './model.js'

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
        client.importData();
        
        const accounts = model.getAccounts();
        const transactions = model.getCurrentTransactions();

        return `
            <section class="card">
                <h1>Logged in as '${client.getCurrentUser()}'</h1>
            </section>

            <section class="card">
                <h1>Accounts</h1>
                ${accounts.map(a =>`
                    <div class="account">
                        <p>${a.name} (${a.type})</p>
                        <p>${a.currentBalance}</p>
                    </div>
                `).join('')}
            </section>
            
            <section class="card">
                <h1>Recent Transactions</h1>
                ${transactions.map(t =>`
                    <div class="transaction">
                        <p class="align-left">${t.date}</p>
                        <p class="align-left">${t.account}</p>
                        <p class="align-right">${t.increase ? t.amount : -t.amount}</p>
                    </div>
                `).join('')}
            </section>
        `;
    } catch (error) {
        console.error(error);
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

const appElem = document.querySelector('.app');

if (client.getCurrentUser()) {
    appElem.innerHTML = getHomePageHTML();
} else {
    appElem.innerHTML = getLoginPageHTML();
}