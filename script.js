    const darkModeToggle = document.getElementById('toggle-dark-mode');
    const formatToggle = document.getElementById('toggle-format');
    const fullscreenToggle = document.getElementById('toggle-fullscreen');
    const exitFullscreenButton = document.getElementById('exit-fullscreen');
    const storyContent = document.getElementById('story-content');
    const chaptersContainer = document.getElementById('chapters');

    const chapters = [
      { title: "Chapter 1 — fade.", formatted: "1-Fade.pdf", raw: "1-Fade-Colorless.pdf" },
      { title: "Chapter 1 — fade. (archived)", formatted: "1-Fade-Archived-Version.pdf", raw: "1-Fade-Archived-Version-Colorless.pdf" }
      // Add more chapters as needed
    ];

    let isDarkMode = false;
    let isFormatted = true;

    // Populate chapter list
    chapters.forEach((chapter, index) => {
      const chapterItem = document.createElement('div');
      chapterItem.classList.add('chapter-item');
      chapterItem.textContent = chapter.title;
      chapterItem.onclick = () => {
        const link = isFormatted ? chapter.formatted : chapter.raw;
        storyContent.innerHTML = `<iframe src="${link}"></iframe>`;
      };
      chaptersContainer.appendChild(chapterItem);
    });

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
      storyContent.innerHTML = `<p>${isFormatted ? "Colored" : "Plain"} version selected. Choose a chapter to load.</p>`;
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
