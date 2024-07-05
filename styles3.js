// script.js
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  cell.classList.add('clicked');
  cell.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    showWinningLine();
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
  } else if (isDraw()) {
    setTimeout(() => alert('Draw!'), 100);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(currentPlayer) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function showWinningLine() {
  const winningCombination = winningCombinations.find(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
  const startCell = cells[winningCombination[0]];
  const endCell = cells[winningCombination[2]];

  const line = document.createElement('div');
  line.className = 'winning-line';
  document.querySelector('.board').appendChild(line);

  line.style.top = `${startCell.offsetTop + startCell.offsetHeight / 2}px`;
  line.style.left = `${startCell.offsetLeft}px`;
  line.style.width = `${endCell.offsetLeft - startCell.offsetLeft + endCell.offsetWidth}px`;

  setTimeout(() => {
    line.style.width = `${endCell.offsetLeft - startCell.offsetLeft + endCell.offsetWidth}px`;
  }, 10);
}
