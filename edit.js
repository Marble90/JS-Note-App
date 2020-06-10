const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const timeElement = document.querySelector('#time-stamp')
const timeStamp = moment().valueOf();
const noteId = location.hash.substr(1);
console.log(noteId)
let notes = getSavedNotes();
let note = notes.find( (note) => note.id === noteId);


if (!note){
    note = [];
    const id = uuidv4();
    location.assign(`./edit.html#${id}`);

}else{
// timeElement.textContent = generateLastEdited(note.updatedAt);
timeElement.textContent = "Last Edited" + " " + moment(note.updateAt).fromNow()
timeElement.classList.add('list-item__subtitle')
titleElement.value = note.title;
bodyElement.value = note.body;
id = note.id;

}

//  const id = uuidv4();
//     location.assign(`./edit.html#${id}`);

   
titleElement.addEventListener('input', () => {
    note.title = titleElement.value
    note.updateAt = moment().valueOf();
    timeElement.textContent = generateLastEdited(note.updateAt);
    timeElement.classList.add('list-item__subtitle')
})

bodyElement.addEventListener('input', () => {
    note.body = bodyElement.value
    note.updateAt = moment().valueOf();
    timeElement.textContent = generateLastEdited(note.updateAt);
    timeElement.classList.add('list-item__subtitle')
    })

document.querySelector('#save-note').addEventListener('click',() => {
        if (!note.title){
            alert("The Title is empty")
    
        } else if (!note.body){
            alert("The Body is empty")
    
        }
        if (note.title && note.body){

            const index = notes.findIndex( (note) => note.id === id)

            if (index === -1) { 
                notes.push({
                    id : id ,
                    title : note.title ,
                    body : note.body ,
                    createAt: timeStamp,
                    updateAt : timeStamp
                })
                
            } else {
                notes[index].title = note.title;
                notes[index].body = note.body;
                updateAt = timeStamp;
            }
        saveNotes(notes);
        location.assign(`./note.html`);
        console.log(notes)
     }
   
    })

document.querySelector('#remove-note').addEventListener( 'click' , () => {
     removeNote(note.id);
     saveNotes(notes);
    location.assign('./note.html');
})

