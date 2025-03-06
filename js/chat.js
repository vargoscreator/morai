document.addEventListener('DOMContentLoaded', function() {
    const filterNames = document.querySelectorAll('.contentChat__filter-name');
    filterNames.forEach(name => {
        name.addEventListener('click', function() {
            const filterBox = this.closest('.contentChat__filter-box');
            if (filterBox && filterBox.classList.contains('contentChat__filter-more')) {
                filterBox.classList.toggle('show');
            }
        });
    });


    const filterBoxes = document.querySelectorAll('.contentChat__filter-box');    
    filterBoxes.forEach(box => {
        const allCheckbox = box.querySelector('.contentChat__filter-all input[type="checkbox"]');
        const itemCheckboxes = box.querySelectorAll('.contentChat__filter-item input[type="checkbox"]');
        allCheckbox.addEventListener('change', function() {
            const isChecked = this.checked;
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = isChecked;
            });
        });        
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (!this.checked) {
                    allCheckbox.checked = false;
                }
                const allItemsChecked = Array.from(itemCheckboxes).every(cb => cb.checked);
                if (allItemsChecked) {
                    allCheckbox.checked = true;
                }
            });
        });
    });

    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const lowBalance = document.querySelector('.lowbalance');
    const lowBalanceClose = document.querySelector('.lowbalance__close');
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMessage = messageInput.value.trim();
        if (!userMessage) return;
        lowBalance.classList.add('show');
    });

    lowBalanceClose.addEventListener('click', function() {
        lowBalance.classList.remove('show');
    });

});