var container = document.querySelector('.brick-stack');
var container_stack_list = document.querySelector('.container_stack_list');
var addBoxButton = document.querySelector('#add_stack_box');
var delete_stack_box = document.querySelector('#delete_stack_box');
var stack = new Array();
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
        stack_input_value = document.querySelector('#stack_input_value');

        addBoxButton.addEventListener('click', () => {
            if (i == 15) {
                return;
            }
            var randomNumber = getRandomInt(1, 999);
            if (stack_input_value.value != "") {
                randomNumber = stack_input_value.value;
            }
            var value = document.createElement('div');
            value.classList.add('value');


            var box = document.createElement('div');
            box.classList.add('brick');
            box.classList.add('brick' + i);
            container.appendChild(box);
            value.innerHTML = randomNumber;
            value.style.fontSize = "30px";
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

            stack.push(randomNumber);

            // stack push code ------------------
            var stack_string = "[";
            for (let i = 0; i < stack.length - 1; i++) {
                if (i + 1 != stack.length - 1)
                    stack_string += stack[i] + ", ";
                else
                    stack_string += stack[i]
            }
            stack_string += "]";
            var python_code =
                `stack = ${stack_string}  
stack.append(${stack[stack.length-1]})

print(stack) # print stack
`
            codeOutput(python_code);


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

            // stack pop code ------------------
            var stack_string = "[";
            for (let i = 0; i < stack.length; i++) {
                if (i + 1 != stack.length)
                    stack_string += stack[i] + ", ";
                else
                    stack_string += stack[i]
            }
            stack_string += "]";
            var python_code =
                `stack = ${stack_string}  
stack.pop() # This method return top value ${stack[stack.length-1]}

print(stack) # print stack
`
            codeOutput(python_code);
            stack.pop();
        });


    });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function codeOutput(python_code) {
    const add_code = document.querySelector("#add_code");
    add_code.innerHTML = python_code;
    hljs.initHighlightingOnLoad();
    var copy_btn = document.querySelector("#copy_btn");
    copy_btn.style.display = "block";

    const originalText = copy_btn.textContent;
    copy_btn.addEventListener('click', () => {
        navigator.clipboard.writeText(originalText)
            .then(() => {
                copy_btn.innerHTML = `<span class='fas fa-check-double' style='font-size:16px; color: green;'>Copied!</span>`;
                const textarea = document.createElement("textarea");
                textarea.value = python_code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    });
    copy_btn.addEventListener('mouseleave', () => {
        setTimeout(() => {
            copy_btn.textContent = originalText;
        }, 1500);
    });

}