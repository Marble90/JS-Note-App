'use strict'

// Read exisiting notes from localStorage
const getSavedNotes = () => {
    const noteJSON = localStorage.getItem("notes")

    try{
        return noteJSON ? JSON.parse(noteJSON) : [];

    } catch(e){
        return [];
    }
}

// Save notes to localStorage
const saveNotes = () => {
    localStorage.setItem("notes" , JSON.stringify(notes));
}

// Remove notes from localStorage by id
const removeNote = (id) => {
    const index = notes.findIndex( (note) => note.id === id)

    if (index > -1){
        notes.splice(index,1)
    }
}


const prepareNotes = (notes,filters) => {
    const notesElement = document.querySelector('#notes');
    notes = sortNotes (notes, filters.sortBy);
    
    // filterNotes is an array of objects like notes 
    const filteredNotes = notes.filter( (note) => {
        const title = note.title.toLowerCase();
        const filterTxt = filters.searchText.toLowerCase();
        return title.includes(filterTxt);
    })


    notesElement.innerHTML = '';
    // notes.forEach( (note) => {
    filteredNotes.forEach( (note) => {
    const p = generateDOM(note);
    notesElement.appendChild(p);
})
} // end of prepareNotes

const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdit'){
        return notes.sort((a,b) => a.updateAt > b.updateAt ? -1 : ((a.updateAt < b.updateAt) ? 1 : 0))
    } else if (sortBy === 'byCreate'){
        return notes.sort((a,b) => a.createAt > b.createAt ? -1 : ((a.createAt < b.createAt) ? 1 : 0))
    } else if (sortBy === 'byAlphabet'){
        return notes.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : ((a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 0))
    }
}


const generateDOM = (note) => {
    const noteEl = document.createElement('a'); //hyperlink
    const textEl = document.createElement('p'); // paragraph
    const statusEl = document.createElement('p')
    const statEl = document.createElement('p')
    
    // textEl.textContent = notes[0].title;
    textEl.textContent = note.title;
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl);
    
    noteEl.setAttribute('href', `./edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    
    // statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.textContent = "Last Edited" + " " + moment(note.updateAt).fromNow()
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    statEl.textContent = "Created" + " " + moment(note.createAt).fromNow()
    statEl.classList.add('list-item__sub')
    noteEl.appendChild(statEl)
  
    document.getElementById("notes").appendChild(noteEl)
    
      return noteEl;
    }

    // Generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;

