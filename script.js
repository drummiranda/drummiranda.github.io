const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const modal = document.querySelector('.modal');
const modalArt = document.querySelector('.modal-art');
const modalTitle = document.querySelector('.modal-title');
const modalType = document.querySelector('.modal-type');
const modalDesc = document.querySelector('.modal-desc');
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    cards.forEach(card => {
      const show = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !show);
    });
  });
});

cards.forEach(card => {
  const button = card.querySelector('.project-image');
  button.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalType.textContent = card.dataset.type;
    modalDesc.textContent = card.dataset.desc;
    modalArt.className = `modal-art ${[...button.classList].find(c => c.startsWith('art-')) || ''}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
