const input = document.getElementById('note-text');
const addButton = document.getElementById('add-note');
const container = document.getElementById('notes-container');
const notes = JSON.parse(localStorage.getItem('notes')) || [];

function save() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function render() {
    container.innerHTML = ''; // Clear existing notes
    notes.forEach((note, i) => {
        const div = document.createElement('div');
        div.classList.add('note-item');

        div.innerHTML = `
            <div class="note-text">${note}</div>
            <div class="note-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Edit Button Functionality
        div.querySelector('.edit-btn').onclick = () => {
            const editedNote = prompt('Edit note:', note);
            if (editedNote) {
                notes[i] = editedNote;
                save();
                render();
            }
        };

        // Delete Button Functionality
        div.querySelector('.delete-btn').onclick = () => {
            notes.splice(i, 1);
            save();
            render();
        };

        container.appendChild(div);
    });
}

addButton.onclick = () => {
    const noteText = input.value.trim();
    if (noteText) {
        notes.push(noteText);
        save();
        render();
        input.value = '';
    }
};

// Initial Render
render();
