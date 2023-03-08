class Stack {
    constructor() {
        this.items = [10];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items.pop();
    }

    getItems() {
        return this.items;
    }
}

const stack = new Stack();

function renderStack(stack) {
    const container = document.getElementById('stack-container');
    container.innerHTML = '';

    const items = stack.getItems();

    items.forEach((item) => {
        const stackItem = document.createElement('div');
        stackItem.classList.add('stack-item');
        stackItem.innerText = item;
        container.appendChild(stackItem);
    });
}

renderStack(stack);

const pushButton = document.getElementById('push-button');
const popButton = document.getElementById('pop-button');

pushButton.addEventListener('click', () => {
    const input = document.getElementById('push-input');
    const value = input.value;
    stack.push(value);
    input.value = '';
    renderStack(stack);
});

popButton.addEventListener('click', () => {
    stack.pop();
    renderStack(stack);
});