const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const canvasNext = document.getElementById("next");
const ctxNext = canvas.getContext("2d");

let accountValues = {
  score: 0,
  level: 0,
  lines: 0,
};

function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});
