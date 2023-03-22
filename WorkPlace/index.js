function showSection(event, id1, id2) {
    // Unavailable display
    const notavails = new Map([
        ["a15", 1],
    ]);
    if (notavails.get(id2)) {
        var tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = "Not available yet!";
        tooltip.style.display = "block";
        tooltip.style.left = (event.pageX + 30) + "px";
        tooltip.style.top = (event.pageY - 45) + "px";
    } else {
        var section = document.getElementById(id1);
        var sections = document.getElementsByClassName('section');
        for (var i = 0; i < sections.length; i++) {
            sections[i].classList.remove('active');
        }
        section.classList.add('active');

        var a = document.getElementById(id2);
        var as = document.getElementsByClassName('a');

        for (var i = 0; i < as.length; i++) {
            as[i].classList.remove('active');
        }
        a.classList.add('active');
    }
}

document.addEventListener("mouseout", function() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
});