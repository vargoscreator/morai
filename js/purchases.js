function handleResize() {
    const tables = document.querySelectorAll('.account__table');
    const isMobile = window.innerWidth < 768;

    tables.forEach(table => {
        const top = table.querySelector('.account__table-top');
        const items = table.querySelectorAll('.account__table-item');
        const headers = top.querySelectorAll('.account__table-name');

        if (isMobile) {
            top.style.display = 'none';

            items.forEach(item => {
                const existingHeaders = item.querySelectorAll('.mobile-header');
                existingHeaders.forEach(header => header.remove());

                const order = item.querySelector('.account__table-order');
                const date = item.querySelector('.account__table-date');
                const paid = item.querySelector('.account__table-paid');
                const token = item.querySelector('.account__table-token');

                const orderHeader = document.createElement('h4');
                orderHeader.className = 'account__table-name mobile-header';
                orderHeader.textContent = headers[0].textContent;
                order.before(orderHeader);

                const dateHeader = document.createElement('h4');
                dateHeader.className = 'account__table-name mobile-header';
                dateHeader.textContent = headers[1].textContent;
                date.before(dateHeader);

                const paidHeader = document.createElement('h4');
                paidHeader.className = 'account__table-name mobile-header';
                paidHeader.textContent = headers[2].textContent;
                paid.before(paidHeader);

                const tokenHeader = document.createElement('h4');
                tokenHeader.className = 'account__table-name mobile-header';
                tokenHeader.textContent = headers[3].textContent;
                token.before(tokenHeader);

                item.style.display = 'flex';
            });
        } else {
            top.style.display = 'flex';
            items.forEach(item => {
                const mobileHeaders = item.querySelectorAll('.mobile-header');
                mobileHeaders.forEach(header => header.remove());
                item.style.display = 'flex';
            });
        }
    });
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);


const sections = document.querySelectorAll('.account__content-selected');
const initialBuyBtn = document.querySelector('.purchases__none-buy');
const secondBuyBtn = document.querySelector('.purchase__form-buy[type="button"]');
const finalBuyBtn = document.querySelector('.purchase__form-buy[type="submit"]');
const amountInput = document.querySelector('#amount');
const tokensReceivedSpan = document.querySelector('.purchase__form-received span');
const totalAmount = document.querySelectorAll('.purchase__form-total-descr')[0];
const totalTokens = document.querySelectorAll('.purchase__form-total-descr')[1];
const form = document.querySelector('.account__content-purchases');
const successBlock = document.querySelector('.purchase__form-success');
const closeSuccessBtn = document.querySelector('.purchase__form-success--close');
function switchActiveSection(index) {
    sections.forEach(section => section.classList.remove('active'));
    sections[index].classList.add('active');
}
function updateTokenAmount() {
    const euroAmount = parseFloat(amountInput.value) || 0;
    const tokenAmount = euroAmount * 1000;
    tokensReceivedSpan.textContent = `${tokenAmount.toLocaleString()} tokens`;
    totalAmount.textContent = euroAmount.toString();
    totalTokens.textContent = tokenAmount.toLocaleString();
}
initialBuyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchActiveSection(1);
    updateTokenAmount();
});
secondBuyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    switchActiveSection(2);
    updateTokenAmount();
});
amountInput.addEventListener('input', () => {
    let value = parseFloat(amountInput.value) || 0;
    if (value < 1) {
        amountInput.value = 1;
    } else if (value > 100000000) {
        amountInput.value = 100000000;
    }        
    updateTokenAmount();
});
finalBuyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = {
        amount: amountInput.value,
        discount: document.querySelector('#discount').value,
        tokens: parseFloat(amountInput.value) * 1000
    };
    console.log('Отправка данных:', formData);
    successBlock.classList.remove('active-failed');
    successBlock.classList.add('active-success');
    
    /*
    fetch('/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Успешная покупка:', data);
        // Можно вернуться к начальному экрану
    })
    .catch(error => console.error('Ошибка:', error));
    */
});
closeSuccessBtn.addEventListener('click', () => {
    successBlock.classList.remove('active-success', 'active-failed');
});