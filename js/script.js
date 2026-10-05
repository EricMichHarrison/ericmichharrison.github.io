if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('my-work-section').scrollIntoView({behavior: "smooth"})
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
let lastScrollPosition = window.scrollY;

window.addEventListener('scroll', () => {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > navbar.offsetHeight) {
    navbar.classList.add('navbar-hidden');
  } else {
    navbar.classList.remove('navbar-hidden');
  }

  lastScrollPosition = currentScrollPosition;
}, { passive: true });