section_active_id = "";

function load_js(term, id1) {
    var secScript = document.getElementById(id1);
    var scriptSrc = term + '.js';
    var script = document.createElement('script');
    script.src = scriptSrc;
    script.id = "script_" + id1;
    secScript.appendChild(script);
}

function sidebar_hide_show(hide_show_id) {
    const hide_show_section = document.querySelector("#" + hide_show_id);
    var fullscreenBtn = hide_show_section.querySelector('.sidebar_hide_show');
    var sidebar = document.querySelector(".sidebar");
    if (fullscreenBtn.classList[2] == "fa-bars") {
        sidebar.style.display = "block";
        fullscreenBtn.classList.remove("fa-bars");
        fullscreenBtn.classList.add("fa-chevron-left");
    } else {
        fullscreenBtn.classList.remove("fa-chevron-left");
        fullscreenBtn.classList.add("fa-bars");
        sidebar.style.display = "none";
    }
}

// }

function removeElementThatAdded() {
    if (document.querySelector("#container_array")) {
        document.querySelector("#script_array-section").remove();
        document.querySelector("#container_array").remove();
        document.querySelector(".footer_array").remove();
    }
    if (document.querySelector("#container_stack")) {
        document.querySelector("#script_stack-section").remove();
        document.querySelector("#container_stack").remove();
    }
}

function showSection(event, id1, id2, term) {
    const notavails = new Map([
        ["a15", 1],
    ]);
    if (notavails.get(id2)) {
        var section_available = document.getElementById("section_available");
        section_available.innerHTML = "Not available yet!";
        section_available.style.display = "block";
        section_available.style.left = (event.pageX + 30) + "px";
        section_available.style.top = (event.pageY - 40) + "px";
        section_available.style.zIndex = 1;
    } else {
        var section = document.getElementById(id1);
        document.getElementsByClassName('container')[0].style.backgroundImage = "None";
        var sections = document.getElementsByClassName('section');
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].classList.contains('active')) {
                sections[i].classList.remove('active');
                removeElementThatAdded();
            }
        }
        section.classList.add('active');
        var a = document.getElementById(id2);
        var as = document.getElementsByClassName('a');
        for (var i = 0; i < as.length; i++) {
            as[i].classList.remove('active');
        }
        a.classList.add('active');
        load_js(term, id1);
    }
}

document.getElementById("homebtn").addEventListener("click", function() {
    window.location.href = './index.html';
});
document.addEventListener("mouseout", function() {
    var section_available = document.getElementById("section_available");
    section_available.style.display = "none";
});

function startMenu() {
    var start = document.getElementsByClassName("sidebar")[0].style;

    if (start.display == "block") {
        start.display = "none";
    } else {
        start.display = "block";
    }
}