 const copyBtn = document.getElementById('copyLinkBtn');

  copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(window.location.href).then(function() {
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(function() {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<i class="fas fa-link"></i>';
      }, 1800);
    });
  });
