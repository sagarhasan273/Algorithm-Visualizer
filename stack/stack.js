fetch('./stack/stack.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.querySelector('.container_stack');
        const targetDiv = document.querySelector('#stack-section');
        targetDiv.appendChild(div);

        const add_code = document.querySelector("#add_code");

        const python_code =
            `def function():
    print("Hello")
print(function())
        `
        add_code.innerHTML = python_code;
        hljs.initHighlightingOnLoad();

        const copy_btn = document.querySelector("#copy_btn");
        copy_btn.addEventListener("click", function() {
            const textarea = document.createElement("textarea");
            textarea.value = python_code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        });
    });