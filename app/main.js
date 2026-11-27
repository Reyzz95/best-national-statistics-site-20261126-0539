// Nusantara Stats — Main Application Router & Event Controller
import { Views } from './views.js';

class NusantaraApp {
  constructor() {
    this.state = {
      economyRange: '10',
      provinceSearch: '',
      compareProvA: 0,
      compareProvB: 1,
      calcAmount: 1000000,
      calcYear: 2024
    };
    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.route());
    window.addEventListener('DOMContentLoaded', () => this.route());
    // Also trigger immediately if already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      this.route();
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
      });
      // Close menu on click link
      navLinks.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => navLinks.classList.remove('active'));
      });
    }
  }

  route() {
    const hash = window.location.hash || '#/';
    const container = document.getElementById('app-view');
    if (!container) return;

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '#/' && href === '#/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Render view based on route
    if (hash === '#/' || hash === '#') {
      container.innerHTML = Views.renderOverview();
    } else if (hash === '#/economy') {
      container.innerHTML = Views.renderEconomy(this.state.economyRange);
      this.bindEconomyEvents();
    } else if (hash === '#/population') {
      container.innerHTML = Views.renderPopulation();
    } else if (hash === '#/trade') {
      container.innerHTML = Views.renderTrade();
    } else if (hash === '#/provinces') {
      container.innerHTML = Views.renderProvinces(this.state.provinceSearch);
      this.bindProvincesEvents();
    } else if (hash === '#/compare') {
      container.innerHTML = Views.renderCompare(
        this.state.compareProvA,
        this.state.compareProvB,
        this.state.calcAmount,
        this.state.calcYear
      );
      this.bindCompareEvents();
    } else if (hash === '#/about') {
      container.innerHTML = Views.renderAbout();
    } else {
      container.innerHTML = Views.renderOverview();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  bindEconomyEvents() {
    const btn5 = document.getElementById('btn-range-5');
    const btn10 = document.getElementById('btn-range-10');
    if (btn5) {
      btn5.addEventListener('click', () => {
        this.state.economyRange = '5';
        this.route();
      });
    }
    if (btn10) {
      btn10.addEventListener('click', () => {
        this.state.economyRange = '10';
        this.route();
      });
    }
  }

  bindProvincesEvents() {
    const searchInput = document.getElementById('province-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.provinceSearch = e.target.value;
        const container = document.getElementById('app-view');
        // Re-render provinces view preserving cursor
        const currentScroll = window.scrollY;
        container.innerHTML = Views.renderProvinces(this.state.provinceSearch);
        this.bindProvincesEvents();
        // Refocus input
        const newInput = document.getElementById('province-search');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
        window.scrollTo({ top: currentScroll });
      });
    }
  }

  bindCompareEvents() {
    const selA = document.getElementById('compare-prov-a');
    const selB = document.getElementById('compare-prov-b');
    const amtInput = document.getElementById('calc-amount');
    const yrSelect = document.getElementById('calc-year');

    if (selA) {
      selA.addEventListener('change', (e) => {
        this.state.compareProvA = Number(e.target.value);
        this.route();
      });
    }
    if (selB) {
      selB.addEventListener('change', (e) => {
        this.state.compareProvB = Number(e.target.value);
        this.route();
      });
    }
    if (amtInput) {
      amtInput.addEventListener('input', (e) => {
        this.state.calcAmount = Number(e.target.value) || 0;
        // Update just the currency box to avoid losing focus
        const container = document.getElementById('app-view');
        const currentScroll = window.scrollY;
        container.innerHTML = Views.renderCompare(
          this.state.compareProvA,
          this.state.compareProvB,
          this.state.calcAmount,
          this.state.calcYear
        );
        this.bindCompareEvents();
        const newAmt = document.getElementById('calc-amount');
        if (newAmt) {
          newAmt.focus();
          newAmt.setSelectionRange(newAmt.value.length, newAmt.value.length);
        }
        window.scrollTo({ top: currentScroll });
      });
    }
    if (yrSelect) {
      yrSelect.addEventListener('change', (e) => {
        this.state.calcYear = Number(e.target.value);
        this.route();
      });
    }
  }
}

new NusantaraApp();
