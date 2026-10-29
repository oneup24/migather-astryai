/* ==========================================================================
   暖星谷 Astry Valley — HK website mockup
   Internal draft v1 · 27 Oct 2026 · Migather
   No dependencies. Static mockup behaviour only.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- mobile nav ---------- */
  var mobileNav = $('#mobileNav');
  var burger = $('.burger');
  function closeMobile() {
    if (!mobileNav) return;
    mobileNav.classList.remove('on');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burger) burger.addEventListener('click', function () {
    if (!mobileNav) return;
    var open = !mobileNav.classList.contains('on');
    mobileNav.classList.toggle('on', open);
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  $$('.mn-close').forEach(function (b) { b.addEventListener('click', closeMobile); });
  $$('.mobile-nav a').forEach(function (a) { a.addEventListener('click', closeMobile); });

  /* ---------- bag drawer ---------- */
  var drawer = $('#drawer');
  var scrim = $('#scrim');
  var drawerBody = $('#drawerBody');
  var cartEmpty = $('#cartEmpty');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('on');
    if (scrim) scrim.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('on');
    if (scrim) scrim.classList.remove('on');
    if (!mobileNav || !mobileNav.classList.contains('on')) document.body.style.overflow = '';
  }
  $$('.bag-btn').forEach(function (b) { b.addEventListener('click', openDrawer); });
  $$('.drawer-close').forEach(function (b) { b.addEventListener('click', closeDrawer); });
  if (scrim) scrim.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeDrawer(); closeMobile(); }
  });

  /* ---------- cart (local mock) ---------- */
  var CART_KEY = 'astry_mock_cart';
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function setCart(c) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch (e) {}
    renderCart();
  }
  function renderCart() {
    var items = getCart();
    $$('.bag-count').forEach(function (n) { n.textContent = items.reduce(function (a, i) { return a + i.qty; }, 0); });
    if (!drawerBody) return;
    if (!items.length) {
      if (cartEmpty) cartEmpty.style.display = 'block';
      $$('.cart-line', drawerBody).forEach(function (n) { n.remove(); });
      return;
    }
    if (cartEmpty) cartEmpty.style.display = 'none';
    $$('.cart-line', drawerBody).forEach(function (n) { n.remove(); });
    items.forEach(function (it) {
      var row = document.createElement('div');
      row.className = 'cart-line';
      row.innerHTML =
        '<img src="' + it.img + '" alt="">' +
        '<div style="flex:1">' +
          '<div style="font-weight:800">' + it.name + '</div>' +
          '<div class="small muted">' + it.price + ' × ' + it.qty + '</div>' +
        '</div>' +
        '<button class="icon-btn cart-rm" aria-label="移除" style="width:32px;height:32px">✕</button>';
      row.querySelector('.cart-rm').addEventListener('click', function () {
        setCart(getCart().filter(function (x) { return x.key !== it.key; }));
      });
      drawerBody.appendChild(row);
    });
  }

  var addBtn = $('#addBtn');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      var qty = parseInt(($('#qty') && $('#qty').textContent) || '1', 10) || 1;
      var priceEl = $('.price');
      var price = priceEl ? priceEl.textContent.trim() : 'HK$xxx';
      var nameEl = $('.pdp-info .h1');
      var cart = getCart();
      var key = 'goodnight-sheep';
      var found = cart.filter(function (x) { return x.key === key; })[0];
      if (found) { found.qty += qty; }
      else {
        cart.push({
          key: key,
          name: (nameEl ? nameEl.textContent.trim() : '晚安羊') + ' · 星之子第一代',
          price: price,
          qty: qty,
          img: 'assets/img/pdp-sheep-main.jpg'
        });
      }
      setCart(cart);
      addBtn.textContent = '已加入 ✓';
      setTimeout(function () { addBtn.textContent = '加入購物袋'; }, 1600);
      openDrawer();
    });
  }

  /* ---------- qty ---------- */
  var qtyEl = $('#qty');
  if (qtyEl) {
    $('#qtyMinus').addEventListener('click', function () {
      qtyEl.textContent = Math.max(1, (parseInt(qtyEl.textContent, 10) || 1) - 1);
    });
    $('#qtyPlus').addEventListener('click', function () {
      qtyEl.textContent = (parseInt(qtyEl.textContent, 10) || 1) + 1;
    });
  }

  /* ---------- gallery ---------- */
  var galMain = $('#galMain');
  $$('.thumb').forEach(function (t) {
    t.addEventListener('click', function () {
      if (!galMain) return;
      galMain.src = t.getAttribute('data-src');
      $$('.thumb').forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
    });
  });

  /* ---------- swatches ---------- */
  $$('.swatch').forEach(function (s) {
    s.addEventListener('click', function () {
      $$('.swatch').forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-checked', 'false'); });
      s.classList.add('on');
      s.setAttribute('aria-checked', 'true');
    });
  });

  /* ---------- faq accordion ---------- */
  $$('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var panel = item.querySelector('.faq-a');
      var open = item.classList.contains('open');
      $$('.faq-item.open').forEach(function (o) {
        o.classList.remove('open');
        var p = o.querySelector('.faq-a');
        if (p) p.style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- store filters ---------- */
  var chips = $$('.chip[data-filter]');
  var cards = $$('#retailGrid .retail-card');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); });
      c.classList.add('on');
      var f = c.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = (f === 'all') || (card.getAttribute('data-type') === f);
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- language toggle (mock) ---------- */
  $$('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.lang button').forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      if (b.getAttribute('data-lang') === 'en') {
        var t = document.createElement('div');
        t.textContent = 'English copy pending licensor sign-off — mockup shows 繁體中文 as the base.';
        t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:9998;' +
          'background:#2B2450;color:#FBF6E8;font:600 13.5px/1.5 ' + (getComputedStyle(document.body).fontFamily) +
          ';padding:13px 22px;border-radius:999px;box-shadow:0 12px 34px rgba(43,36,80,.35);max-width:88vw;text-align:center';
        document.body.appendChild(t);
        setTimeout(function () { t.remove(); }, 4200);
      }
    });
  });

  /* ---------- wishlist (local mock) ---------- */
  $$('.wish').forEach(function (b) {
    b.addEventListener('click', function () {
      var on = b.classList.toggle('on');
      b.textContent = on ? '♥' : '♡';
      b.setAttribute('aria-label', on ? '取消收藏' : '加入收藏');
    });
  });

  /* ---------- placeholder highlight (press P) ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'p' || e.key === 'P') {
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      document.body.classList.toggle('show-ph');
    }
  });

  /* ---------- chrome height var + header stuck state ---------- */
  var chrome = $('.chrome');
  var head = $('.site-head');

  function measureChrome() {
    if (!chrome) return;
    document.documentElement.style.setProperty('--chrome-h', chrome.offsetHeight + 'px');
  }
  measureChrome();
  window.addEventListener('resize', measureChrome);
  window.addEventListener('load', measureChrome);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureChrome);

  function onScroll() {
    if (!head) return;
    var stuck = window.scrollY > 40;
    head.classList.toggle('is-stuck', stuck);
    if (!document.body.classList.contains('page-home')) {
      head.style.boxShadow = stuck ? '0 6px 24px rgba(70,52,31,.09)' : 'none';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- hero parallax ---------- */
  var heroMedia = $('.hero-media');
  if (heroMedia && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var raf = null;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var y = Math.min(window.scrollY, 1100) * 0.05;
        heroMedia.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      });
    }, { passive: true });
  }

  /* ---------- reveal on scroll ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$('.feature, .step, .world-card, .drop-card, .cal-row, .retail-card, .safety-item, .plat').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .55s ease, transform .55s cubic-bezier(.2,.9,.3,1)';
      io.observe(el);
    });
  }

  renderCart();
})();
