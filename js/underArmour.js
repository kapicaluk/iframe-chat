function hideElements(price) {
  let tiles = document.getElementsByClassName('tile');
  for (let i = 0; i < tiles.length; i++) {
    if (
      Number(tiles[i].children[5].innerText.slice(1)) > price
    ) {
      tiles[i].style.visibility = 'hidden';
    }
  }
}

hideElements(100);
