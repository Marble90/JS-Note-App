let notes = getSavedNotes();
// const timeStamp = moment().valueOf();

// const d = new Date();
// timeStamp1 = d.getTime();
console.log(notes);

const filters = {
  searchText: '',
  sortBy: 'byEdit'
};

prepareNotes(notes,filters);


document.querySelector('#create-note').addEventListener('click',() => {
    // console.log(id)
    // const id = uuidv4();
    // notes.push({
    //     id : id ,
    //     title : '' ,
    //     body : '' ,
    //     createAt: timeStamp,
    //     updateAt : timeStamp
    // })
    
    //  location.assign(`./edit.html#${id}`);
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  prepareNotes(notes, filters)
})

document.querySelector('#search').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  prepareNotes(notes, filters)
 })


// function createUniqueId() {
//     var dt = new Date().getTime();
//     var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = (dt + Math.random()*16)%16 | 0;
//         dt = Math.floor(dt/16);
//         return (c=='x' ? r :(r&0x3|0x8)).toString(16);
//     });
//     return uuid;
// }


  