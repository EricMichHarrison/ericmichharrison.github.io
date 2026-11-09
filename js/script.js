if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({ behavior: "smooth" })
  })
}

if (document.getElementById('my-project-link')) {
  document.getElementById('my-project-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({ behavior: "smooth" })
  })
}
if (document.getElementById('my-hobbies-link')) {
  document.getElementById('my-hobbies-link').addEventListener('click', () => {
    document.getElementById('my-hobbies-section').scrollIntoView({ behavior: "smooth" })
  })
}
let contactDialogCloseTimeout;

const closeContactDialog = () => {
  const contactDialog = document.getElementById('contact-dialog');
  if (!contactDialog || !contactDialog.open) {
    return;
  }

  contactDialog.classList.add('dialog-closing');
  contactDialogCloseTimeout = setTimeout(() => {
    contactDialog.classList.remove('dialog-closing');
    contactDialog.close();
  }, 200);
};

document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  if (event.target.closest('#contact-me-button')) {
    document.getElementById('contact-dialog')?.showModal();
  } else if (event.target.closest('#close-contact-dialog')) {
    closeContactDialog();
  } else if (event.target.id === 'contact-dialog') {
    closeContactDialog();
  }
});

document.addEventListener('cancel', (event) => {
  if (event.target instanceof HTMLDialogElement && event.target.id === 'contact-dialog') {
    event.preventDefault();
    closeContactDialog();
  }
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


