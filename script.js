const nameInput = document.getElementById('name');
const urlInput = document.getElementById('url');
const saveBtn = document.getElementById('save-btn');
const bookmarksList = document.getElementById('bookmarks');

saveBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();

    if (name && url) {
        const bookmark = { name, url };
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        alert('Bookmark saved!');
        nameInput.value = '';
        urlInput.value = '';
        displayBookmarks();
    } else {
        alert('Please enter both name and URL.');
    }
});

function displayBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarksList.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const rmBtn = document.createElement('button');
        rmBtn.id = 'remove-btn';
        rmBtn.textContent = 'Remove';
        a.href = bookmark.url;
        a.textContent = bookmark.name;
        a.target = '_blank';
        li.appendChild(a);
        li.appendChild(rmBtn);
        rmBtn.addEventListener('click', () => {
            bookmarks.splice(index, 1);
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            displayBookmarks();
        });
        bookmarksList.appendChild(li);
    });
}

window.onload = displayBookmarks();