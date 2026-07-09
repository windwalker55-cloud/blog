  const searchInput = document.getElementById('searchInput');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const articleGrid = document.getElementById('articleGrid');
  const itemsPerPage = 10;

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function openEditForm(id) {
    document.querySelectorAll('.edit-form-container').forEach(function(form) {
      form.classList.remove('active');
    });
    const editForm = document.getElementById('editForm_' + id);
    if (editForm) {
      editForm.classList.add('active');
      editForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function closeEditForm(id) {
    const editForm = document.getElementById('editForm_' + id);
    if (editForm) {
      editForm.classList.remove('active');
    }
  }

  function initializeCards() {
    const items = document.querySelectorAll('.grid-item');
    items.forEach(function(item, index) {
      if (index >= itemsPerPage) {
        item.classList.add('hidden-article');
      }
    });
  }

  function loadMoreCards() {
    const hiddenItems = document.querySelectorAll('.grid-item.hidden-article');
    let count = 0;
    hiddenItems.forEach(function(item) {
      if (count < itemsPerPage) {
        item.classList.remove('hidden-article');
        count++;
      }
    });
    const remaining = document.querySelectorAll('.grid-item.hidden-article');
    if (remaining.length === 0) {
      loadMoreBtn.classList.add('hidden');
    }
  }

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const items = document.querySelectorAll('.grid-item');
    items.forEach(function(item) {
      const title = item.getAttribute('data-title');
      if (title && title.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  loadMoreBtn.addEventListener('click', loadMoreCards);

  articleGrid.addEventListener('click', function(e) {
    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      const id = editBtn.getAttribute('data-id');
      openEditForm(id);
    }
    const cancelBtn = e.target.closest('.cancel-btn');
    if (cancelBtn) {
      const id = cancelBtn.getAttribute('data-id');
      closeEditForm(id);
    }
  });

  document.querySelectorAll('.edit-form-container form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      showToast('Updating article...');
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    initializeCards();
    const totalItems = document.querySelectorAll('.grid-item').length;
    if (totalItems <= itemsPerPage) {
      loadMoreBtn.classList.add('hidden');
    }
  });
