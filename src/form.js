function saveName() {
  let name = document.getElementById('name').value;
  localStorage.setItem('name', name);
}

function getName() {
  return localStorage.getItem('name');
}

const nameInput = document.getElementById('name');
nameInput.value = getName();

const gotoButton = document.getElementById('submit-login');
gotoButton.addEventListener('click', saveName);
