'use client';
import { createGlobalStyle } from 'styled-components';

const NavbarStyles = createGlobalStyle`
  /* Ensure header is always on top */
  header {
    background-color: #000000 !important;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    z-index: 50;
  }
  
  /* Add transition effects for smooth shrinking */
  header.scrolled {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
  
  /* Custom scrollbar styling */
  body {
    scrollbar-width: thin;
    scrollbar-color: #4d4d4d #000000;
    /* Add padding top to prevent content from being hidden under the navbar */
    padding-top: 72px; /* Adjust to match your header height */
  }
  
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border: 2px solid #000000;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FD5A1E;
  }

  body {
    overflow-y: scroll;
    scrollbar-width: thin;
    scrollbar-color: #4d4d4d #000000;
  }
`;

export default NavbarStyles;