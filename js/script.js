if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}

if (document.getElementById('my-project-link')) {
  document.getElementById('my-project-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
  })
}
if (document.getElementById('my-hobbies-link')) {
  document.getElementById('my-hobbies-link').addEventListener('click', () => {
    document.getElementById('my-hobbies-section').scrollIntoView({behavior: "smooth"})
  })
}
const contactDialog = document.getElementById('contact-dialog');
const contactButton = document.getElementById('contact-me-button');
const closeContactDialogButton = document.getElementById('close-contact-dialog');

contactButton.addEventListener('click', () => contactDialog.showModal());

const closeContactDialog = () => {
  if (!contactDialog.open) {
    return;
  }

  contactDialog.classList.add('dialog-closing');
  contactDialogCloseTimeout = setTimeout(() => {
    contactDialog.classList.remove('dialog-closing');
    contactDialog.close();
  }, 200);
};

closeContactDialogButton.addEventListener('click', closeContactDialog);

contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) {
    closeContactDialog();
  }
});

contactDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeContactDialog();
});

const navbar = document.querySelector('.navbar');
const scrollToTopButton = document.getElementById('scroll-to-top');
let lastScrollPosition = window.scrollY;
let scrollToTopButtonCloseTimeout;
let isScrollToTopButtonVisible = false;

const showScrollToTopButton = () => {
  if (isScrollToTopButtonVisible) {
    return;
  }

  clearTimeout(scrollToTopButtonCloseTimeout);
  scrollToTopButton.hidden = false;
  scrollToTopButton.classList.remove('scroll-to-top-closing');
  scrollToTopButton.classList.add('scroll-to-top-visible');
  isScrollToTopButtonVisible = true;
};

const hideScrollToTopButton = () => {
  if (!isScrollToTopButtonVisible) {
    return;
  }

  scrollToTopButton.classList.remove('scroll-to-top-visible');
  scrollToTopButton.classList.add('scroll-to-top-closing');
  isScrollToTopButtonVisible = false;
  scrollToTopButtonCloseTimeout = setTimeout(() => {
    scrollToTopButton.hidden = true;
    scrollToTopButton.classList.remove('scroll-to-top-closing');
  }, 250);
};

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > navbar.offsetHeight) {
    navbar.classList.add('navbar-hidden');
  } else {
    navbar.classList.remove('navbar-hidden');
  }

  if (currentScrollPosition > 300) {
    showScrollToTopButton();
  } else {
    hideScrollToTopButton();
  }

  lastScrollPosition = currentScrollPosition;
}, { passive: true });

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});