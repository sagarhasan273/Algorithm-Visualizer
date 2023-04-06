var pos1 = 0,
    pos2 = 0,
    pos2 = 0,
    pos3 = 0,
    index = 0,
    array_size = 0;
var element = null;
var div_create = null;
var slots = null;
var slots_pos = null;
var value_array = null;
var array = null;
var slots_arrayClass = null;
var slots_arrayPos = null;
slots_arrayClass = new Array();
slots_arrayPos = new Array();
array = new Array();
var sloted = new Set();
var randomNumber = getRandomInt(1, 10);

fetch('./array/array.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.querySelector('.container_array');

        const div1 = doc.querySelector('.footer_array');

        const targetDiv = document.querySelector('#array-section');

        targetDiv.appendChild(div);
        targetDiv.appendChild(div1);

        slots = document.querySelector(".slots");
        slots_pos = slots.getBoundingClientRect();
        var array_string = "[";
        for (let i = 0; i < array_size; i++) {
            if (i + 1 != array_size)
                array_string += array[i] + ", ";
            else
                array_string += array[i]
        }
        array_string += "]";
        var python_code =
            `array = ${array_string}  # Array

print(array) # print array
`
        codeOutput(python_code);
    });

function reset() {
    pos1 = 0;
    pos2 = 0;
    pos2 = 0;
    pos3 = 0;
    index = 0;
    array_size = 0;
    value_array = null;
    const create_list_array_button = document.querySelector("#create-list-array-button");
    create_list_array_button.style.display = "block";
    const allslots = document.querySelectorAll(".slot");
    for (let i = 0; i < 15; i++) {
        let slt = "slot" + i;
        if (allslots[i].classList.contains(slt)) {
            document.querySelector("." + slt).style.backgroundColor = "black";
            allslots[i].querySelector(".value").remove();
            allslots[i].classList.remove(slt);
        }
    }
    if (element)
        element.style.display = "none";
    if (div_create)
        div_create.style.display = "block";
    array = null;
    element = null;
    div_create = null;
    array = new Array();
    slots_arrayClass = new Array();
    slots_arrayPos = new Array();
    arrayContainerUpdate(array);

    var array_string = "[";
    for (let i = 0; i < array_size; i++) {
        if (i + 1 != array_size)
            array_string += array[i] + ", ";
        else
            array_string += array[i]
    }
    array_string += "]";
    var python_code =
        `array = ${array_string}  # Array

print(array) # print array
`
    codeOutput(python_code);
}

function insert_array() {
    const values_array = document.querySelector("#values_array");
    if (values_array.value == "") {
        console.log("array none");
        return;
    }
    const arr = values_array.value.split(", ");
    const nums = arr.map(num => parseInt(num));
    console.log(nums);
    values_array.value = ""

    const create_list_array_button = document.querySelector("#create-list-array-button");
    create_list_array_button.style.display = "none";

    var array_string = "[";
    for (let i = 0; i < nums.length; i++) {
        if (i + 1 != nums.length)
            array_string += nums[i] + ", ";
        else
            array_string += nums[i]
    }
    array_string += "]";
    var python_code =
        `array = ${array_string}  # Array

print(array) # print array
`
    codeOutput(python_code);

    const allslots = document.querySelectorAll(".slot");

    for (let i = 0; i < nums.length; i++) {
        let slt = "slot" + i;
        allslots[i].classList.add(slt);
        slots_arrayClass.push(document.querySelector(".slot" + i));
        slots_arrayPos.push(slots_arrayClass[i].getBoundingClientRect());
        var p = document.createElement('p');
        p.classList.add("value");
        slots_arrayClass[i].appendChild(p);
        slots_arrayClass[i].style.color = "black";
        slots_arrayClass[i].style.backgroundColor = "#ffd400";
        var text = slots_arrayClass[i].querySelector(".value");
        text.textContent = nums[i];
        array.push(nums[i]);
        array_size += 1;
    }
    arrayContainerUpdate(array);
}


function createDiv() {
    const create_list_array_button = document.querySelector("#create-list-array-button");
    create_list_array_button.style.display = "none";

    div_create = document.getElementById('create-box-array');
    div_create.style.display = "none";

    element = document.createElement('div');
    element_pos = element.getBoundingClientRect();
    element.classList.add('box');
    element.style.position = "absolute";

    const allslots = document.querySelectorAll(".slot");
    let i = array.length;
    let slt = "slot" + i;
    allslots[i].classList.add(slt);
    slots_arrayClass.push(document.querySelector(".slot" + i));
    slots_arrayPos.push(slots_arrayClass[i].getBoundingClientRect());
    var p = document.createElement('p');
    p.classList.add("value");
    slots_arrayClass[i].appendChild(p);

    slots.appendChild(element);
    value_array = document.getElementById("value_array");
    randomNumber = getRandomInt(1, 500);
    if (value_array.value == "") {
        value_array.value = randomNumber;
    }
    var p = document.createElement('p');
    p.classList.add("pera");
    p.innerHTML = value_array.value;
    p.style.padding = "auto";

    update_slots_position(1);
    element.appendChild(p);
    element.addEventListener("mousedown", dragMouseMove);

    var array_string = "[";
    for (let i = 0; i < array_size; i++) {
        if (i + 1 != array_size)
            array_string += array[i] + ", ";
        else
            array_string += array[i]
    }
    array_string += "]";
    var python_code =
        `array = ${array_string}  # Array

print(array) # print array
`
    codeOutput(python_code);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function update_slots_position(t) {
    slots = document.querySelector(".slots");
    slots_pos = slots.getBoundingClientRect();
    for (let i = 0; i < array_size + t; i++) {
        if (document.querySelector(".slot" + i))
            slots_arrayPos[i] = document.querySelector(".slot" + i).getBoundingClientRect();
    }
}

function arrayContainerUpdate(update_array) {
    for (let i = 0; i < update_array.length; i++) {
        if (update_array[i] == null) {
            slots_arrayClass[i].style.color = "black";
            slots_arrayClass[i].style.backgroundColor = "black";
            continue;
        }
        slots_arrayClass[i].style.color = "black";
        slots_arrayClass[i].style.backgroundColor = "#ffd400";
        var text = slots_arrayClass[i].querySelector(".value");
        text.textContent = update_array[i];
    }

}

function dragMouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    update_slots_position();
    document.addEventListener('mouseup', closeMouseElement);
    document.addEventListener('mousemove', mouseMove);
}

function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

function transformScaleSlot(index) {
    for (let i = 0; i < slots_arrayClass.length; i++) {
        if (i == index) {
            slots_arrayClass[i].style.transform = "scale(1.13)";
            slots_arrayClass[i].style.color = "rgb(255 129 0)";
            var text = slots_arrayClass[index].querySelector(".value");
            text.style.color = "black";
            slots_arrayClass[i].style.backgroundColor = "rgb(255 129 0)";
        } else {
            slots_arrayClass[i].style.transform = "scale(1.0)";
        }
    }
}


function codeOutput(python_code) {
    const add_code = document.querySelector("#add_code");
    add_code.innerHTML = python_code;
    hljs.initHighlightingOnLoad();
    var copy_btn = document.querySelector("#copy_btn");
    copy_btn.style.display = "block";
    copy_btn.addEventListener("click", function() {
        const textarea = document.createElement("textarea");
        textarea.value = python_code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    });

}

function slotsColorChange() {
    if (element == null) {
        return;
    }
    var xs, ys, index, array_string = "[";
    const newArray = new Array();
    for (let i = 0; i < array_size; i++) {
        newArray.push(array[i]);
        if (i + 1 != array_size)
            array_string += array[i] + ", ";
        else
            array_string += array[i]
    }
    array_string += "]";

    for (let i = 0; i < array_size + 1; i++) {
        xs = slots_arrayPos[i].left - slots_pos.left;
        ys = slots_arrayPos[i].top - slots_pos.top;
        update_slots_position(1);
        if (distance(element.offsetLeft, element.offsetTop - 30, xs, ys) < 25) {
            index = i;
        } else if (array_size <= i) {
            slots_arrayClass[i].style.color = "black";
            slots_arrayClass[i].style.backgroundColor = "black";
            var python_code =
                `array = ${array_string}  # Array

print(array) # print array
`
            codeOutput(python_code);
        }
    }
    if (array_size <= index) {
        var text = slots_arrayClass[index].querySelector(".value");
        slots_arrayClass[index].style.color = "rgb(255 129 0)";
        slots_arrayClass[index].style.backgroundColor = "rgb(255 129 0)";
        var python_code =
            `array = ${array_string} # Array 

def addElement(value):
    array.append(value) # add method
    return array # return array
        
print(addElement(${value_array.value})) # print array
`
        codeOutput(python_code);
        text.textContent = value_array.value;
        text.style.color = "black";
    } else if (array_size > index) {
        slots_arrayClass[array_size].style.color = "black";
        slots_arrayClass[array_size].style.backgroundColor = "black";
        var python_code =
            `array = ${array_string}  # Array
            
def insertion(index, value):
    array.insert(index, value) # insertion method
    return array # return array

print(insertion(${index}, ${value_array.value})) # print array
`
        codeOutput(python_code);
        newArray.splice(index, 0, value_array.value);
    }
    arrayContainerUpdate(newArray);
    transformScaleSlot(index);
}

function slotsSetOnChange() {
    if (element == null) {
        return;
    }
    var xs, ys;
    for (let i = 0; i < array.length + 1; i++) {
        xs = slots_arrayPos[i].left - slots_pos.left;
        ys = slots_arrayPos[i].top - slots_pos.top;

        update_slots_position(1);
        if (distance(element.offsetLeft, element.offsetTop - 30, xs, ys) < 25) {
            element.style.top = "27.5" + "px";
            element.style.left = xs + "px";
            element.style.display = "none";
            element.remove();
            element = null;

            const newArray = new Array();
            for (let i = 0; i < array_size; i++) {
                newArray.push(array[i]);
            }
            newArray.splice(i, 0, value_array.value);

            array_size += 1;
            for (let i = 0; i < array_size; i++) {
                array[i] = newArray[i];
            }
            arrayContainerUpdate(array);
            transformScaleSlot(array_size + 1);
            value_array.value = "";
            if (array.length < 15)
                div_create.style.display = "block";
            break;
        }
    }
}

function mouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    if (element == null) {
        return;
    }
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    slotsColorChange();

    const container_array = document.querySelector("#container_array");
    const box_ = document.querySelector(".box");
    const container_array_pos = container_array.getBoundingClientRect();
    const box_pos = box_.getBoundingClientRect();
    const x_max_min_move = container_array_pos.left < Math.ceil(box_pos.left) && Math.ceil(box_pos.left) < ((container_array_pos.width + container_array_pos.left) - 45);
    const y_max_min_move = container_array_pos.top < Math.ceil(box_pos.top) && Math.ceil(box_pos.top) < ((container_array_pos.height + container_array_pos.top) - 45);
    if ((x_max_min_move && y_max_min_move)) {
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
}


function closeMouseElement() {
    const container_array = document.querySelector("#container_array");
    const box_ = document.querySelector(".box");
    const container_array_pos = container_array.getBoundingClientRect();
    const box_pos = box_.getBoundingClientRect();
    const x_max_min_move = container_array_pos.left < Math.ceil(box_pos.left) && Math.ceil(box_pos.left) < ((container_array_pos.width + container_array_pos.left) - 45);
    const y_max_min_move = container_array_pos.top < Math.ceil(box_pos.top) && Math.ceil(box_pos.top) < ((container_array_pos.height + container_array_pos.top) - 45);
    if (!(x_max_min_move && y_max_min_move) && box_) {
        element.style.top = "125px";
        element.style.left = "377.5px";
    }
    slotsSetOnChange();
    document.removeEventListener('mouseup', closeMouseElement);
    document.removeEventListener('mousemove', mouseMove);
}