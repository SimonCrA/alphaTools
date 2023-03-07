const { ipcRenderer, clipboard } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const textArea = document.getElementById('text-area')

  textArea.addEventListener('input', function () {
    const wordCounter = document.getElementById('word-counter')
    const characterCounter = document.getElementById('character-counter')
    const spaceCounter = document.getElementById('space-counter')
    const paragraphCounter = document.getElementById('paragraph-counter')

    const words = textArea.value.trim().split(/\s+/).length
    const characters = textArea.value.length
    const spaces = textArea.value.split(' ').length - 1
    const paragraphs = textArea.value.split(/\r\n|\r|\n/).length == 0 ? 1 : textArea.value.split(/\r\n|\r|\n/).length

    wordCounter.textContent = characters == 0 ? 0 : words
    characterCounter.textContent = characters == 0 ? 0 : characters
    spaceCounter.textContent = characters == 0 ? 0 : spaces
    paragraphCounter.textContent = characters == 0 ? 0 : paragraphs

    // Send a message to the main process with the updated word, character, and line counts
    // ipcRenderer.send('update-counts', { words, characters, spaces, lines })
  })
})
