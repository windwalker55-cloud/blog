  const searchInput = document.getElementById('searchInput');
  const reloadBtn = document.getElementById('reloadBtn');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const cardsPerLoad = 8;
  let isLoading = false;

  function initializeCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      if (index >= cardsPerLoad) {
        card.classList.add('hidden-card');
      }
    });
  }

  function loadMoreCards() {
    if (isLoading) return;
    
    const hiddenCards = document.querySelectorAll('.card.hidden-card');
    if (hiddenCards.length === 0) {
      loadingSpinner.classList.remove('show');
      return;
    }
    
    isLoading = true;
    loadingSpinner.classList.add('show');
    
    setTimeout(() => {
      let count = 0;
      hiddenCards.forEach((card) => {
        if (count < cardsPerLoad) {
          card.classList.remove('hidden-card');
          count++;
        }
      });
      
      isLoading = false;
      loadingSpinner.classList.remove('show');
      
      const remaining = document.querySelectorAll('.card.hidden-card');
      if (remaining.length === 0) {
        loadingSpinner.classList.remove('show');
      }
    }, 500);
  }

  searchInput.addEventListener('input', function() {
    const query = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card) {
      const title = card.getAttribute('data-title');
      if (title && title.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });

  reloadBtn.addEventListener('click', function() {
    const icon = reloadBtn.querySelector('i');
    icon.classList.add('fa-spin');
    reloadBtn.disabled = true;
    
    setTimeout(function() {
      location.reload();
    }, 800);
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        loadMoreCards();
      }
    });
  }, {
    rootMargin: '0px 0px 200px 0px'
  });

  observer.observe(loadingSpinner);

  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition > documentHeight - 300) {
      loadMoreCards();
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    initializeCards();
    
    setTimeout(function() {
      const hiddenCards = document.querySelectorAll('.card.hidden-card');
      if (hiddenCards.length > 0 && hiddenCards.length <= cardsPerLoad) {
        loadMoreCards();
      }
    }, 500);
  });
