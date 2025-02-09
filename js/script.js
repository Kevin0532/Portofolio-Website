document.addEventListener('DOMContentLoaded', () => {
  const elementsToObserve = [
    document.querySelector('.introduction-name'),
    document.querySelector('.introduction-role'),
    document.querySelector('.rotating-text')
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elementsToObserve.forEach(element => {
    if (element) {
      observer.observe(element);
    }
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const socialIcons = document.querySelectorAll('.social-icon');

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      socialIcons.forEach(icon => {
        if (icon.alt === 'GitHub') {
          icon.src = '/images/github.png';
        } else if (icon.alt === 'Instagram') {
          icon.src = '/images/instagramv2.png';
        } else if (icon.alt === 'LinkedIn') {
          icon.src = '/images/linkedin.png';
        }
      });
    } else {
      socialIcons.forEach(icon => {
        if (icon.alt === 'GitHub') {
          icon.src = '/images/githubBlack.png';
        } else if (icon.alt === 'Instagram') {
          icon.src = '/images/instagramBlack.png';
        } else if (icon.alt === 'LinkedIn') {
          icon.src = '/images/linkedinBlack.png';
        }
      });
    }
  });

  // Navigation highlight
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  const highlightNav = () => {
    let index = sections.length;

    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[index].classList.add('active');
  };

  highlightNav();
  window.addEventListener('scroll', highlightNav);
});

"use strict";

let words = document.querySelectorAll(".word");
words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter) => {
    letter.className = "letter out";
  });

  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach((letter) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);