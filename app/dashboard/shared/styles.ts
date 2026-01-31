/**
 * Shared dashboard styles
 * Eliminates CSS duplication across dashboard pages
 */

export const DASHBOARD_PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');

  .font-modern {
    font-family: 'Sora', sans-serif;
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(16px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .fade-in { animation: fadeInUp 0.4s ease-out forwards; opacity: 0; }
  .fade-in-1 { animation: fadeInUp 0.4s ease-out 0.1s forwards; opacity: 0; }
  .fade-in-2 { animation: fadeInUp 0.4s ease-out 0.2s forwards; opacity: 0; }
  .fade-in-3 { animation: fadeInUp 0.4s ease-out 0.3s forwards; opacity: 0; }
  .fade-in-4 { animation: fadeInUp 0.4s ease-out 0.4s forwards; opacity: 0; }

  @keyframes pulse-ring {
    0% { transform: scale(0.95); opacity: 1; }
    50% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(0.95); opacity: 1; }
  }

  .score-ring {
    animation: pulse-ring 3s ease-in-out infinite;
  }
`;

/**
 * Shared loading spinner component markup
 */
export const LOADING_SPINNER_CLASSES =
  "w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin";
