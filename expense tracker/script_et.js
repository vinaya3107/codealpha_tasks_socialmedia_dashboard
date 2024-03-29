// script_et.js
document.addEventListener('DOMContentLoaded', function() {
    const expenseList = document.getElementById('expense-list');
    const expenseForm = document.getElementById('expense-form');
    const itemNameInput = document.getElementById('item-name');
    const itemExpenseInput = document.getElementById('item-expense');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = [];

    function renderExpenses() {
        expenseList.innerHTML = '';
        let totalAmount = 0;
        expenses.forEach((expense, index) => {
            totalAmount += expense.amount;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount}</td>
                <td>
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
        totalAmountDisplay.textContent = totalAmount;
    }

    function addExpense(event) {
        event.preventDefault();
        const name = itemNameInput.value.trim();
        const amount = parseFloat(itemExpenseInput.value);
        if (name && !isNaN(amount)) {
            expenses.push({ name, amount });
            renderExpenses();
            itemNameInput.value = '';
            itemExpenseInput.value = '';
        }
    }

    function deleteExpense(index) {
        expenses.splice(index, 1);
        renderExpenses();
    }

    function editExpense(index) {
        const newName = prompt('Enter new name:');
        const newAmount = parseFloat(prompt('Enter new amount:'));
        if (newName && !isNaN(newAmount)) {
            expenses[index].name = newName;
            expenses[index].amount = newAmount;
            renderExpenses();
        }
    }

    expenseForm.addEventListener('submit', addExpense);

    expenseList.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('delete-button')) {
            deleteExpense(parseInt(target.dataset.index));
        } else if (target.classList.contains('edit-button')) {
            editExpense(parseInt(target.dataset.index));
        }
    });
});
