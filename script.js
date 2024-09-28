const tabsContainer = document.getElementById('tabs');
const textarea = document.getElementById('textarea');
const saveButton = document.getElementById('saveButton');

let activeTabIndex = 0;

tabsContainer.addEventListener('click', (event) => {
  const tab = event.target.closest('.tab');
  if (tab) {
    const index = parseInt(tab.getAttribute('data-index'));
    activateTab(index);
  }
});

function activateTab(index) {
  tabsContainer.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.remove('active');
  });
  tabsContainer.querySelector(`[data-index="${index}"]`).classList.add('active');
  textarea.setAttribute('data-index', index);
  textarea.value = localStorage.getItem(`editorText${index}`) || '';
  hljs.highlightBlock(textarea);
  activeTabIndex = index;
}

function addTab() {
  const newTabIndex = tabsContainer.children.length - 1;
  const newTab = document.createElement('div');
  newTab.classList.add('tab');
  newTab.setAttribute('data-index', newTabIndex);
  newTab.textContent = `File ${newTabIndex + 1}`;
  tabsContainer.insertBefore(newTab, tabsContainer.lastElementChild);
  activateTab(newTabIndex);
}

tabsContainer.querySelector('.add-tab').addEventListener('click', addTab);

textarea.addEventListener('input', () => {
  // Highlight syntax
  hljs.highlightBlock(textarea);
});

saveButton.addEventListener('click', () => {
  // Save text to local storage
  localStorage.setItem(`editorText${activeTabIndex}`, textarea.value);
});

// Load saved text
activateTab(0);

function findAndReplace() {
  const findText = document.getElementById('findInput').value;
  const replaceText = document.getElementById('replaceInput').value;
  const textArea = document.getElementById('textarea');
  
  // Get the current text in the textarea
  let newText = textArea.value;

  // Perform find and replace
  newText = newText.split(findText).join(replaceText);

  // Update the textarea with the new text
  textArea.value = newText;
}


