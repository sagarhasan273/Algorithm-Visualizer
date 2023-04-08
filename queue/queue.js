var container = document.querySelector('.brick-queue');
var container_queue_list = document.querySelector('.container_queue_list');
var addBoxButton = document.querySelector('#add_queue_box');
var delete_queue_box = document.querySelector('#delete_queue_box');
var queue = new Array();
var i = 0;

fetch('./queue/queue.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.querySelector('.container_queue');
        const targetDiv = document.querySelector('#queue-section');
        targetDiv.appendChild(div);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './queue/queue.css';
        link.id = 'queue_css';
        document.head.appendChild(link);

        container = document.querySelector('.brick-queue');
        container_queue_list = document.querySelector('.container_queue_list');
        addBoxButton = document.querySelector('#add_queue_box');
        delete_queue_box = document.querySelector('#delete_queue_box');
        queue_input_value = document.querySelector('#queue_input_value');

        addBoxButton.addEventListener('click', () => {
            if (i == 15) {
                return;
            }
            var randomNumber = getRandomInt(1, 999);
            if (queue_input_value.value != "") {
                randomNumber = queue_input_value.value;
            }
            queue.push(randomNumber);
            setQueue_slots_and_brick();

            // queue push code ------------------
            var queue_string = "[";
            for (let i = 0; i < queue.length - 1; i++) {
                if (i + 1 != queue.length - 1)
                    queue_string += queue[i] + ", ";
                else
                    queue_string += queue[i]
            }
            queue_string += "]";
            var python_code =
                `# Python doesn't have queue but deque
# Deque can be worked as queue
queue = deque(${queue_string}) 
queue.append(${queue[queue.length-1]}) # Enqueue

print(list(queue)) # print queue
`
            codeOutput(python_code);


            i += 1;
        });

        delete_queue_box.addEventListener('click', () => {
            i -= 1;
            if (i < 0) {
                i = 0;
                return;
            }
            var first_value = queue.shift();
            setQueue_slots_and_brick();


            // queue pop code ------------------
            var queue_string = "[";
            for (let i = 0; i < queue.length; i++) {
                if (i + 1 != queue.length)
                    queue_string += queue[i] + ", ";
                else
                    queue_string += queue[i]
            }
            queue_string += "]";
            var python_code =
                `# Python doesn't have queue but deque
# Deque can be worked as queue
queue = deque(${queue_string})  

# This method will return first value ${first_value} from queue
queue.popleft() # Dequeue

print(list(queue)) # print queue
`
            codeOutput(python_code);
        });


    });

function setQueue_slots_and_brick() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    while (container_queue_list.firstChild) {
        container_queue_list.removeChild(container_queue_list.firstChild);
    }
    for (let j = 0; j < queue.length; j++) {
        var value = document.createElement('div');
        value.classList.add('value');


        var box = document.createElement('div');
        box.classList.add('brick');
        box.classList.add('brick' + j);
        container.appendChild(box);
        value.innerHTML = queue[j];
        value.style.fontSize = "30px";
        document.querySelector("." + 'brick' + j).appendChild(value);

        var value = document.createElement('div');
        value.classList.add('value');
        var index = document.createElement('div');
        index.classList.add('index');

        var slot = document.createElement('div');
        slot.classList.add('queue_slots');
        slot.classList.add('queue_slots' + j);
        value.innerHTML = queue[j];
        index.innerHTML = j;
        slot.appendChild(index);
        slot.appendChild(value);
        container_queue_list.appendChild(slot);
    }
    i = queue.length;
}

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