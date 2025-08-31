// Flags
let isDarkMode = false;
let isFormatted = true;

// DOM Elements
const darkModeToggle = document.getElementById('toggle-dark-mode');
const formatToggle = document.getElementById('toggle-format');
const fullscreenToggle = document.getElementById('toggle-fullscreen');
const exitFullscreenButton = document.getElementById('exit-fullscreen');
const chaptersContainer = document.getElementById('chapters');
const storyContent = document.getElementById('story-content');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackMessage = document.getElementById('feedbackMessage');
const submitFeedback = document.getElementById('submitFeedback');

// Chapter data
const chapters = [
  { title: "Chapter 1 — fade. PDF (Formatted)", type: "pdf", file: "1-Fade.pdf" },
  { title: "Chapter 1 — fade. PDF (Colorless)", type: "pdf", file: "1-Fade-Colorless.pdf" },
  { title: AI Document, type: "pdf", file: "ai.pdf" },
];

// Build chapter list
chapters.forEach((chapter) => {
  const chapterItem = document.createElement('div');
  chapterItem.classList.add('chapter-item');
  chapterItem.textContent = chapter.title;

  chapterItem.onclick = () => {
    if (chapter.type === "html") {
      loadHTMLChapter(chapter.file);
    } else if (chapter.type === "pdf") {
      loadPDFChapter(chapter.file);
    }
  };

  chaptersContainer.appendChild(chapterItem);
});

// Load HTML chapter (optional)
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

// Load PDF chapter
function loadPDFChapter(file) {
  storyContent.innerHTML = `<iframe src="${file}" width="100%" height="100%" style="border:none; min-height: 600px;"></iframe>`;
}

// Dark mode toggle
if (darkModeToggle) {
  darkModeToggle.onclick = () => {
    isDarkMode = !isDarkMode;
    document.body.style.backgroundColor = isDarkMode ? "#222" : "#fff";
    document.body.style.color = isDarkMode ? "#fff" : "#000";
    darkModeToggle.classList.toggle('light-mode', !isDarkMode);
  };
}

// Format toggle
if (formatToggle) {
  formatToggle.onclick = () => {
    isFormatted = !isFormatted;
    storyContent.style.color = isFormatted ? "inherit" : "#aaa";
    storyContent.innerHTML = isFormatted
      ? `<p>Formatted view enabled. Choose a chapter to load.</p>`
      : `<p>Plain text view enabled. Choose a chapter to load.</p>`;
  };
}

// Fullscreen toggle
if (fullscreenToggle) {
  fullscreenToggle.onclick = () => {
    storyContent.classList.add('fullscreen');
    exitFullscreenButton.style.display = "block";
  };
}

if (exitFullscreenButton) {
  exitFullscreenButton.onclick = () => {
    storyContent.classList.remove('fullscreen');
    exitFullscreenButton.style.display = "none";
  };
}

// Feedback handling
let feedbackData = [];

if (submitFeedback) {
  submitFeedback.onclick = () => {
    const pollSelection = document.querySelector('input[name="poll"]:checked');
    const comments = document.getElementById('comments')?.value.trim();

    if (!pollSelection) {
      feedbackMessage.innerText = "Please select a chapter in the poll.";
      feedbackMessage.style.color = "red";
      return;
    }

    if (!comments) {
      feedbackMessage.innerText = "Please leave a comment.";
      feedbackMessage.style.color = "red";
      return;
    }

    feedbackData.push({ poll: pollSelection.value, comments: comments });
    feedbackForm.reset();
    feedbackMessage.innerText = "Thank you for your feedback!";
    feedbackMessage.style.color = "green";

    displayFeedback();
  };
}

// Show submitted feedback
function displayFeedback() {
  const feedbackContainer = document.getElementById('feedbackMessage');
  feedbackContainer.innerHTML = "<h4>Submitted Feedback:</h4>";
  feedbackData.forEach((entry, index) => {
    const feedbackItem = document.createElement('div');
    feedbackItem.innerHTML = `
      <p><strong>Response ${index + 1}:</strong></p>
      <p>Poll: ${entry.poll}</p>
      <p>Comments: ${entry.comments}</p>
      <hr>
    `;
    feedbackContainer.appendChild(feedbackItem);
  });
}
