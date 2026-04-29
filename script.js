/* ══════════════════════════════════════════════════════════
   Math&Poli Nerd — Script
══════════════════════════════════════════════════════════ */

/* ── Page navigation ──────────────────────────────────────
   Maps page IDs to their nav-link index so the correct
   nav item gets the "active" class when switching pages.
─────────────────────────────────────────────────────────── */
function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show the requested page
  document.getElementById('page-' + id).classList.add('active');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const map = { home: 0, about: 1, blogs: 2, contact: 3 };
  const links = document.querySelectorAll('.nav-links .nav-link');
  if (links[map[id]]) links[map[id]].classList.add('active');

  // Scroll to top and trigger reveal animations on new page
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 100);
}

/* ── Navbar scroll shadow ─────────────────────────────────
   Adds a subtle shadow to the navbar once the user
   has scrolled past 20 px.
─────────────────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile hamburger menu ────────────────────────────────
   Toggles the mobile nav drawer and animates the
   hamburger icon into an ✕.
─────────────────────────────────────────────────────────── */
function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ── Scroll-reveal ────────────────────────────────────────
   Uses IntersectionObserver to fade-slide elements with
   the .reveal class into view as they enter the viewport.
   Called once on load and again whenever a page changes.
─────────────────────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.page.active .reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each element by 80 ms
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => observer.observe(el));
}

/* ── Blog category filter ─────────────────────────────────
   Shows/hides blog rows based on their data-cat attribute.
   'all' reveals every row.
─────────────────────────────────────────────────────────── */
function filterPosts(btn, cat) {
  // Toggle active state on filter buttons
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show or hide each blog row
  document.querySelectorAll('.blog-row').forEach(row => {
    const show = cat === 'all' || row.dataset.cat === cat;
    row.style.display = show ? 'grid' : 'none';
    row.style.opacity = show ? '1' : '0';
  });
}

/* ── Contact form submission ──────────────────────────────
   Validates required fields, shows a success banner,
   then clears the form after 5 s.
─────────────────────────────────────────────────────────── */
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!fname || !email || !msg) {
    alert('Please fill in your name, email, and message.');
    return;
  }

  // Show success banner
  const successMsg = document.getElementById('successMsg');
  successMsg.style.display = 'block';

  // Clear all form fields
  ['fname', 'lname', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).value = '';
  });

  // Auto-hide banner after 5 seconds
  setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
}

/* ── Initialise on DOM ready ──────────────────────────────
   Mark the Home nav link as active and run the first
   reveal pass for the default (home) page.
─────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const firstLink = document.querySelector('.nav-links .nav-link');
  if (firstLink) firstLink.classList.add('active');
  initReveal();
});