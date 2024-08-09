document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    const perPageSelect = document.getElementById('per-page');
    const sortOrderSelect = document.getElementById('sort-order');
    const postCountElement = document.getElementById('post-count');
    const postList = document.getElementById('post-list');
    const navLinks = document.querySelectorAll('.nav-menu');
    let lastScrollTop = 0;
    const originalBgColor = 'rgba(249, 101, 1, 1)';
    const transparentBgColor = 'rgba(249, 101, 1, 0.8)';

    const activePage = 'ideas';
    const defaultMenu = document.querySelector(`.nav-menu[data-page="${activePage}"]`);
    defaultMenu.classList.add('active');

    const savedPerPage = localStorage.getItem('perPage') || '10';
    const savedSortOrder = localStorage.getItem('sortOrder') || 'newest';
    const savedPageNumber = localStorage.getItem('pageNumber') || '1';

    perPageSelect.value = savedPerPage;
    sortOrderSelect.value = savedSortOrder;

    updatePosts(savedPageNumber);

    window.addEventListener("scroll", function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            header.classList.add('hidden-header');
        } else if (currentScroll > 0) {
            header.classList.remove('hidden-header');
            header.style.backgroundColor = transparentBgColor;
        } else {
            header.classList.remove('hidden-header');
            header.style.backgroundColor = originalBgColor;
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    document.querySelectorAll('img.lazyload').forEach(img => {
        img.src = img.src;
    });

    perPageSelect.addEventListener('change', function() {
        localStorage.setItem('perPage', perPageSelect.value);
        updatePosts('1');
    });

    sortOrderSelect.addEventListener('change', function() {
        localStorage.setItem('sortOrder', sortOrderSelect.value);
        updatePosts(savedPageNumber);
    });

    function updatePosts(pageNumber) {
        const perPage = parseInt(perPageSelect.value, 10);
        const sortOrder = sortOrderSelect.value;
        const totalPosts = postList ? postList.children.length : 100;

        if (postList) {
            let postsArray = Array.from(postList.children);
            postsArray.sort((a, b) => {
                const dateA = new Date(a.querySelector('.post-date').textContent);
                const dateB = new Date(b.querySelector('.post-date').textContent);

                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });

            postList.innerHTML = '';
            postsArray.forEach(post => postList.appendChild(post));
        }

        const startPost = (pageNumber - 1) * perPage + 1;
        const endPost = Math.min(pageNumber * perPage, totalPosts);

        postCountElement.textContent = `Showing ${startPost} - ${endPost} of ${totalPosts}`;

        localStorage.setItem('pageNumber', pageNumber);
    }

    document.querySelectorAll('.page-number').forEach(page => {
        page.addEventListener('click', function() {
            const pageNumber = this.textContent;
            updatePosts(pageNumber);

            document.querySelector('.page-number.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
