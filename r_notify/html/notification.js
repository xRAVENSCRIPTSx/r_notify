var ICONS = {
  ["error"]: '<i class="fas fa-times"></i>',
  ["success"]: '<i class="fas fa-check"></i>',
  ["info"]: '<i class="fas fa-info"></i>',
  ["warning"]: '<i class="fas fa-exclamation"></i>',
};

window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.type === 'notification') {
    showNotification(data.options.text, data.options); // <-- text kell, nem message
  }
});

function showNotification(text, options = {}) {
  const notification = $('<div>').addClass('notification');
  const position = options.style || 'top-right'; // Lua oldalról style-ként jön

  const type = options.type || 'info';

  // Ikon + szöveg
  notification.html(`
    ${ICONS[type] || ''}
    <span>${text || 'Üres értesítés'}</span>
    <div class="notification-progress-bar"></div>
  `);

  notification.addClass(`notification-${type}`);

  // Ha nincs ilyen align container, akkor létrehozzuk
  let container = $(`.align-${position}`);
  if (container.length === 0) {
    container = $('<div>').addClass(`align-${position}`);
    $('#notifications-container').append(container);
  }

  container.append(notification);

  // Progress bar animáció
  const timeout = options.length || 5000;
  const interval = 10;
  const increment = (interval / timeout) * 100;

  let currentWidth = 100;
  const progressBar = notification.find('.notification-progress-bar');
  const progressBarInterval = setInterval(() => {
    currentWidth -= increment;
    progressBar.css('width', `${currentWidth}%`);
  }, interval);

  setTimeout(() => {
    clearInterval(progressBarInterval);
    notification.remove();
  }, timeout);
}
