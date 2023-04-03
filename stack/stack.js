fetch('./stack/stack.html')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const div = doc.querySelector('.container_stack');
        const targetDiv = document.querySelector('#stack-section');
        targetDiv.appendChild(div);
    });