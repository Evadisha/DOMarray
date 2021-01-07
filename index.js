const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

async function getRandomUser() {
    const res = await fetch(`https://randomuser.me/api`);
    const data = await res.json();
    const result = data.results[0];

    const newUser = {
        name: `${result.name.first} ${result.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    
    addUser(newUser);
}

function addUser(obj) {
    data.push(obj);
    uploadDOM();
}

function uploadDOM(providedData = data) {
    main.innerHTML = `<h2><strong>Personal</strong> Wealth</h2>`;
    
    providedData.forEach(item => {
        const element = document.createElement('div');
        const money = item.money.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
          });
        
        element.innerHTML = `<strong>${item.name}</strong>${money}`;
        element.classList.add('person');
        main.appendChild(element);
    })
}

addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', () => {
    data.map(item => {
        item.money*=2
    })
    uploadDOM();
})

showMillionairesBtn.addEventListener('click', () => {
    data = data.filter(item => item.money >= 1000000)
    uploadDOM();
})

sortBtn.addEventListener('click', () => {
    data.sort((a, b) => b.money - a.money)
    uploadDOM();
})

calculateWealthBtn.addEventListener('click', () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const money = wealth.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      });
    const wealthEl = document.createElement('div');    
    wealthEl.classList.add('person');
    wealthEl.classList.add('total');
    wealthEl.innerHTML = `<strong>Total Wealth: </strong>${money}`;
    main.appendChild(wealthEl);
})