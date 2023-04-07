var container = document.querySelector('.brick-stack');
var container_stack_list = document.querySelector('.container_stack_list');
var addBoxButton = document.querySelector('#add_stack_box');
var delete_stack_box = document.querySelector('#delete_stack_box');
var i = 0;

fetch('./stack/stack.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.querySelector('.container_stack');
        const targetDiv = document.querySelector('#stack-section');
        targetDiv.appendChild(div);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './stack/stack.css';
        link.id = 'stack_css';
        document.head.appendChild(link);

        container = document.querySelector('.brick-stack');
        container_stack_list = document.querySelector('.container_stack_list');
        addBoxButton = document.querySelector('#add_stack_box');
        delete_stack_box = document.querySelector('#delete_stack_box');

        addBoxButton.addEventListener('click', () => {
            if (i == 15) {
                return;
            }
            var randomNumber = getRandomInt(1, 999);
            var value = document.createElement('div');
            value.classList.add('value');


            var box = document.createElement('div');
            box.classList.add('brick');
            box.classList.add('brick' + i);
            container.appendChild(box);
            value.innerHTML = randomNumber;
            document.querySelector("." + 'brick' + i).appendChild(value);

            var value = document.createElement('div');
            value.classList.add('value');
            var index = document.createElement('div');
            index.classList.add('index');

            var slot = document.createElement('div');
            slot.classList.add('stack_slots');
            slot.classList.add('stack_slots' + i);
            value.innerHTML = randomNumber;
            index.innerHTML = i;
            slot.appendChild(index);
            slot.appendChild(value);
            container_stack_list.appendChild(slot);

            i += 1;
        });

        delete_stack_box.addEventListener('click', () => {
            i -= 1;
            if (i < 0) {
                i = 0;
                return;
            }
            var brick_delete = document.querySelector("." + 'brick' + i);
            container.removeChild(brick_delete);

            var stack_slots_delete = document.querySelector("." + 'stack_slots' + i);
            container_stack_list.removeChild(stack_slots_delete);

        });

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    });