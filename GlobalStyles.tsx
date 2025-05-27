
'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Custom scrollbar styling */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
    border-radius: 0;
  }

  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border: 2px solid #000000;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FD5A1E;
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: #4d4d4d #000000;
  }

  body {
    background-color: #000000;
    color: #F5F5F5;
    overflow-x: hidden;
  }


/* Industrial typography system */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', 'Roboto', sans-serif;
  font-weight: 700;
  color: var(--color-whitesmoke);
  letter-spacing: -0.025em;
}

body {
  font-family: 'Inter', 'Roboto', sans-serif;
  line-height: 1.6;
  color: var(--color-silver);
  background-color: var(--color-black);
}

/* Modern gradient text */
.gradient-text {
  background: linear-gradient(to right, var(--color-whitesmoke), var(--color-silver));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.glass-effect {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(164, 172, 172, 0.3);
  border-radius: 0.75rem;
}


.gradient-overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6), transparent);
}

.button-gradient {
  background: linear-gradient(to right, #FD5A1E, rgba(253, 90, 30, 0.8));
}

.industrial-shadow {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.6);
}

.orange-glow {
  box-shadow: 0 4px 20px rgba(253, 90, 30, 0.25);
}

/* Subtle hover transitions */
.hover-scale {
  transition: transform 500ms ease, box-shadow 500ms ease;
}

.hover-scale:hover {
  transform: scale(1.03);
  box-shadow: 0 20px 25px -5px rgba(253, 90, 30, 0.1), 0 8px 10px -6px rgba(253, 90, 30, 0.1);
}

/* Gradient line transitions */
.gradient-line {
  height: 1px;
  background: linear-gradient(to right, transparent, var(--color-silver), transparent);
  width: 0;
  transition: width 300ms ease;
}

.card:hover .gradient-line {
  width: 100%;
}

.metal-button {
  background: linear-gradient(145deg, #4d4d4d, #333333);
  color: var(--color-whitesmoke);
  border: 1px solid var(--color-edward-gray);
  border-radius: 9999px;
  padding: 0.5rem 1.25rem;
  font-weight: 500;
  transition: all 200ms ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.metal-button:hover {
  background: linear-gradient(145deg, #FD5A1E, #e04b17);
  border-color: #FD5A1E;
}

.category-pill {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 200ms ease;
  white-space: nowrap;
}

.category-pill.active {
  background-color: var(--color-orange);
  color: white;
  box-shadow: 0 4px 12px rgba(253, 90, 30, 0.25);
}

.category-pill:not(.active) {
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--color-whitesmoke);
  border: 1px solid var(--color-edward-gray);
}

.badge {
  position: absolute;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  backdrop-filter: blur(4px);
}

.badge-popular {
  background-color: var(--color-orange);
  color: white;
  top: 0.5rem;
  left: 0.5rem;
}

.badge-healthy {
  background-color: #10b981; /* Green */
  color: white;
  top: 0.5rem;
  right: 0.5rem;
}

/* Mobile-first approach */
.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

/* Tablet */
@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Horizontal scroll for mobile filters */
.filter-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  padding-bottom: 1rem;
  margin: 0 -1rem;
  padding: 0 1rem;
}

.filter-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}


  // Homepage
@keyframes slow-pulse {
  0% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(1); }
}

@keyframes slow-pulse-delay {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 0.3; transform: scale(1); }
}

.animate-slow-pulse {
  animation: slow-pulse 8s infinite ease-in-out;
}

.animate-slow-pulse-delay {
  animation: slow-pulse-delay 12s infinite ease-in-out;
  animation-delay: 2s;
}
`;
  

export default GlobalStyles;