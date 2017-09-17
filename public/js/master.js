var logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', e => {
  axios.post('/logout').then(res => {
    if (res.status === 200) {
      window.location = '/';
    }
  });
});

function deleteClick(e) {
  axios({
    method: 'delete',
    url: '/deleteNote',
    data: {
      noteToDelete: e.target.previousElementSibling.textContent
    }
  }).then(res => {
    if (res.status === 200) {
      e.target.parentNode.remove();
    }else {
      alert('delete operation failed');
    }
  });
}

var notesList = document.getElementById('notesList')

document.forms.addNote.addEventListener('submit', e => {
  e.preventDefault();
  var newNote = document.forms.addNote.noteTextBox.value;
  axios({
    method: 'post',
    url: '/addNote',
    data: {
      note: newNote
    }
  }).then(res => {
    if (res.status === 200) {
      notesList.innerHTML += `<div class="noteItem"><li>${newNote}</li><button class="deleteNote">delete</button></div>`;
      document.forms.addNote.noteTextBox.value = "";
      for (btn of document.getElementsByClassName('deleteNote')) {
        btn.addEventListener('click', deleteClick);
      }
    }else {
      alert('add note operation failed');
    }
  });
});

for (btn of document.getElementsByClassName('deleteNote')) {
  btn.addEventListener('click', deleteClick);
}
