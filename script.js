const darkModeToggle = document.getElementById('toggle-dark-mode');
const formatToggle = document.getElementById('toggle-format');
const fullscreenToggle = document.getElementById('toggle-fullscreen');
const exitFullscreenButton = document.getElementById('exit-fullscreen');
const storyContent = document.getElementById('story-content');
const chaptersContainer = document.getElementById('chapters');

// Define chapters with separate HTML files
const chapters = [
  { title: "Chapter 1 — Fade", file: "chapter1.html" },
  { title: "Chapter 2 — The Archive", file: "chapter2.html" }
];

let isDarkMode = false;
let isFormatted = true;

// Populate chapter list
chapters.forEach((chapter) => {
  const chapterItem = document.createElement('div');
  chapterItem.classList.add('chapter-item');
  chapterItem.textContent = chapter.title;
  chapterItem.onclick = () => {
    loadChapter(chapter.file);
  };
  chaptersContainer.appendChild(chapterItem);
});

// Load chapter dynamically
function loadChapter(file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load ${file}`);
      return response.text();
    })
    .then((html) => {
      storyContent.innerHTML = html;
    })
    .catch((error) => {
      storyContent.innerHTML = `<p>Error loading chapter: ${error.message}</p>`;
    });
}

// Toggle dark mode
darkModeToggle.onclick = () => {
  isDarkMode = !isDarkMode;
  document.body.style.backgroundColor = isDarkMode ? "#222" : "#fff";
  document.body.style.color = isDarkMode ? "#fff" : "#000";
  darkModeToggle.classList.toggle('light-mode', !isDarkMode);
};

// Toggle text format
formatToggle.onclick = () => {
  isFormatted = !isFormatted;
  storyContent.style.color = isFormatted ? "inherit" : "#aaa"; // Example: lighten/darken text color
  storyContent.innerHTML = isFormatted
    ? `<p>Formatted view enabled. Choose a chapter to load.</p>`
    : `<p>Plain text view enabled. Choose a chapter to load.</p>`;
};

// Enable full screen
fullscreenToggle.onclick = () => {
  storyContent.classList.add('fullscreen');
  exitFullscreenButton.style.display = "block";
};

// Exit full screen
exitFullscreenButton.onclick = () => {
  storyContent.classList.remove('fullscreen');
  exitFullscreenButton.style.display = "none";
};
