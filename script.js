const darkModeToggle = document.getElementById('toggle-dark-mode');
const formatToggle = document.getElementById('toggle-format');
const fullscreenToggle = document.getElementById('toggle-fullscreen');
const exitFullscreenButton = document.getElementById('exit-fullscreen');
const chaptersContainer = document.getElementById('chapters');
const storyContent = document.getElementById('story-content');

// Define chapters with both HTML and PDF options
const chapters = [
 // { title: "Chapter 1 — fade. HTML", type: "html", file: "fade.html" },
//  { title: "Chapter 1 — fade. (archived) HTML", type: "html", file: "fade2.html" },
  { title: "Chapter 1 — fade. PDF (Formatted)", type: "pdf", file: "1-Fade.pdf" },
  { title: "Chapter 1 — fade. PDF (Colorless)", type: "pdf", file: "1-Fade-Colorless.pdf" },
  { title: "Chapter 1 — fade. (archived) PDF (Formatted)", type: "pdf", file: "1-Fade-Archived-Version.pdf" },
  { title: "Chapter 1 — fade. (archived) PDF (Colorless)", type: "pdf", file: "1-Fade-Archived-Version-Colorless.pdf" }
];

// Populate chapter list dynamically
chapters.forEach((chapter) => {
  const chapterItem = document.createElement('div');
  chapterItem.classList.add('chapter-item');
  chapterItem.textContent = chapter.title;

  // Set up click behavior
  chapterItem.onclick = () => {
    if (chapter.type === "html") {
      loadHTMLChapter(chapter.file);
    } else if (chapter.type === "pdf") {
      loadPDFChapter(chapter.file);
    }
  };

  chaptersContainer.appendChild(chapterItem);
});

// Function to load HTML chapters dynamically
function loadHTMLChapter(file) {
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

// Function to load PDF chapters in an iframe
function loadPDFChapter(file) {
  storyContent.innerHTML = `<iframe src="${file}" width="100%" height="100%"></iframe>`;
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
