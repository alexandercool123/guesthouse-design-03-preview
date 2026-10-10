const dialog = document.querySelector('.image-dialog');
if (dialog) {
  let openedBy;
  document.querySelectorAll('[data-full-image]').forEach(button => {
    button.addEventListener('click', () => {
      openedBy = button;
      const source = button.querySelector('img');
      dialog.querySelector('img').src = button.dataset.fullImage;
      dialog.querySelector('img').alt = source.alt;
      dialog.querySelector('p').textContent = source.alt;
      dialog.showModal();
    });
  });
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => openedBy?.focus());
}

document.querySelectorAll('[data-photo-choice]').forEach(button => {
  button.addEventListener('click', () => {
    const image = document.querySelector('.main-photo');
    image.src = button.dataset.photoChoice;
    image.alt = button.querySelector('img').alt;
    document.querySelectorAll('[data-photo-choice]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  });
});
