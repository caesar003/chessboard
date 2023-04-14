const chars = {
  leftTopCorner: "A",
  leftBottomCorner: "D",
  rightBottomCorner: "F",
  rightTopCorner: "S",
  bottomBorder: "(",
  topBorder: '"',
  leftBorder: "$",
  rightBorder: "%",
  darkSquare: "+",
  lightSquare: "*",
  r: "t",
  R: "r",
  r: "t",
  R: "r",
  n: "m",
  N: "n",
  b: "v",
  B: "b",
  q: "w",
  Q: "q",
  k: "l",
  K: "k",
  p: "o",
  P: "p",
};

const boardElement = document.querySelector(".board");

class Board {
  constructor() {
    this.currentSource = null;
    this.sideToMove = "w";
    this.currentDest = null;
    this.fen = [
      ["r", "n", "b", "q", "k", "b", "n", "r"],
      ["p", "p", "p", "p", "p", "p", "p", "p"],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ];
  }

  render() {
    const { topBorder, bottomBorder } = this.getYBorders();
    boardElement.appendChild(topBorder);
    this.fen.forEach((row, idx) => {
      const rowEl = this.getRow(row, -idx + 8);
      boardElement.appendChild(rowEl);
    });
    boardElement.appendChild(bottomBorder);
  }
  getXBorders() {
    const { leftBorder: lb, rightBorder: rb } = chars;

    const leftBorder = document.createElement("span");
    const rightBorder = document.createElement("span");

    leftBorder.innerText = lb;
    rightBorder.innerText = rb;
    return { leftBorder, rightBorder };
  }
  getYBorders() {
    const {
      leftTopCorner: ltc,
      rightTopCorner: rtc,
      rightBottomCorner: rbc,
      leftBottomCorner: lbc,
      topBorder: tb,
      bottomBorder: bb,
    } = chars;
    const topBorder = document.createElement("div");
    const bottomBorder = document.createElement("div");
    const topInner = `${ltc}${tb}${tb}${tb}${tb}${tb}${tb}${tb}${tb}${rtc}`;
    const bottomInner = `${lbc}${bb}${bb}${bb}${bb}${bb}${bb}${bb}${bb}${rbc}`;

    topBorder.innerHTML = topInner;
    bottomBorder.innerHTML = bottomInner;
    return { topBorder, bottomBorder };
  }
  getRow(row, idx) {
    const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rowEl = document.createElement("div");
    const { leftBorder, rightBorder } = this.getXBorders();

    rowEl.classList.add("row");
    rowEl.appendChild(leftBorder);
    cols.forEach((col, _idx) => {
      const square = this.getSquare(row[_idx], col, idx);
      rowEl.appendChild(square);
    });
    rowEl.appendChild(rightBorder);
    return rowEl;
  }
  getSquare(piece, col, idx) {
    const { darkSquare: ds, lightSquare: ls } = chars;
    const squareColor = this.getSquareColor(`${col}${idx}`);
    const square = document.createElement("span");
    square.classList.add("square");
    square.setAttribute("id", `${col}${idx}`);

    if (!piece) {
      if (squareColor === "light") {
        square.innerText = ls;
      } else {
        square.innerText = ds;
      }
    } else {
      square.setAttribute("draggable", true);
      square.classList.add("piece");

      const _piece = document.createElement("span");

      if (squareColor === "light") {
        _piece.innerText = chars[piece];
      } else {
        _piece.innerText = chars[piece].toUpperCase();
      }
      square.appendChild(_piece);
    }
    return square;
  }
  getSquareColor(square) {
    if (
      (square.charCodeAt(0) % 2 == 1 && square.charCodeAt(1) % 2 == 1) ||
      (square.charCodeAt(0) % 2 == 0 && square.charCodeAt(1) % 2 == 0)
    )
      return "dark";
    else return "light";
  }

  getValidMoves() {
    return [];
  }

  isValidMove() {
    return false;
  }
}

const board = new Board();
board.render();
