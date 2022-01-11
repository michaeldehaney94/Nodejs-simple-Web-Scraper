let id = (id) => document.getElementById(id);

const results = id('container');

fetch('http://localhost:3000/results')
.then(response => {
    return response.json();
})
.then(data => {
    data.forEach(list => {
        const listItem = `<h3>${list.title}</h3><br><p>${list.url}</p>`;
        results.insertAdjacentHTML('beforeend', listItem);
    });
})
.catch(err => console.error(err));
