/**
 * Centralized CSS styles for onboarding components
 * Eliminates redundancy across all component style blocks
 */

export const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap');`;

export const BASE_STYLES = `
  ${FONT_IMPORT}

  .setup-bg {
    background: linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf5ff 100%);
  }

  .welcome-bg {
    background: linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf5ff 100%);
    position: relative;
  }

  .font-modern {
    font-family: 'Sora', sans-serif;
  }
`;

export const FLOATING_SHAPES_STYLES = `
  .abstract-shape {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 8s ease-in-out infinite;
  }

  .shape-1 {
    width: 350px;
    height: 350px;
    background: linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 100%);
    top: -80px;
    right: -80px;
    animation-delay: 0s;
  }

  .shape-2 {
    width: 280px;
    height: 280px;
    background: linear-gradient(135deg, #fecaca 0%, #fcd6bb 100%);
    bottom: -40px;
    left: -40px;
    animation-delay: -2s;
  }

  .shape-3 {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 100%);
    top: 50%;
    left: 5%;
    animation-delay: -4s;
  }

  .shape-4 {
    width: 220px;
    height: 220px;
    background: linear-gradient(135deg, #bbf7d0 0%, #a7f3d0 100%);
    top: 15%;
    right: 15%;
    animation-delay: -6s;
  }
`;

export const ANIMATION_STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(1.03); }
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(24px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOutDown {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(16px); }
  }
`;

export const FADE_IN_CLASSES = `
  .fade-in-1 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; opacity: 0; }
  .fade-in-2 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards; opacity: 0; }
  .fade-in-3 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards; opacity: 0; }
  .fade-in-4 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }
  .fade-in-5 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }
  .fade-in-6 { animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards; opacity: 0; }
`;

export const GRAIN_OVERLAY_STYLES = `
  .grain-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }
`;

export const SECTION_CARD_STYLES = `
  .section-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
  }
`;

export const SCROLLBAR_STYLES = `
  .posts-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .posts-scroll::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .posts-scroll::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border-radius: 4px;
  }
  .posts-scroll::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const ICON_STYLES = `
  .check-icon {
    color: #22c55e;
  }
  .x-icon {
    color: #9ca3af;
  }
`;

export const UPLOAD_ZONE_STYLES = `
  .upload-zone {
    border: 2px dashed #d1d5db;
    transition: all 0.2s ease;
  }
  .upload-zone:hover {
    border-color: #a5b4fc;
    background: rgba(165, 180, 252, 0.05);
  }
  .upload-zone.dragging {
    border-color: #818cf8;
    background: rgba(129, 140, 248, 0.1);
  }
  .upload-zone.has-file {
    border-color: #22c55e;
    border-style: solid;
    background: rgba(34, 197, 94, 0.05);
  }
`;

export const FEATURED_BADGE_STYLES = `
  .featured-badge {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border: 1px solid #f59e0b;
  }
`;

export const POST_ITEM_STYLES = `
  .post-item {
    animation: fadeInUp 0.3s ease-out forwards;
  }
`;

export const PAGE_TRANSITION_STYLES = `
  .page-enter {
    animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .page-exit {
    animation: fadeOutDown 0.5s cubic-bezier(0.55, 0, 1, 0.45) forwards;
  }
`;

export const WELCOME_TEXT_STYLES = `
  .title-text {
    animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
    opacity: 0;
    font-weight: 400;
    letter-spacing: -0.02em;
  }
  .subtitle-text {
    animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards;
    opacity: 0;
    font-weight: 500;
    letter-spacing: -0.03em;
  }
  .description-text {
    animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards;
    opacity: 0;
    font-weight: 400;
    letter-spacing: 0;
  }
`;

export const SKIP_BUTTON_STYLES = `
  .skip-button {
    opacity: 0;
    animation: fadeInUp 0.5s ease-out 0.3s forwards;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: all 0.25s ease;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.5);
    padding: 8px 16px;
    border-radius: 20px;
  }
  .skip-button:hover {
    background: rgba(255, 255, 255, 0.8);
    color: #1e293b !important;
  }
`;

// Composite style blocks for different components
export const ONBOARDING_STYLES = `
  ${BASE_STYLES}
  ${FLOATING_SHAPES_STYLES}
  ${ANIMATION_STYLES}
  ${FADE_IN_CLASSES}
  ${GRAIN_OVERLAY_STYLES}
  ${SECTION_CARD_STYLES}
  ${SCROLLBAR_STYLES}
  ${ICON_STYLES}
`;

export const PROFILE_SETUP_STYLES = `
  ${BASE_STYLES}
  ${FLOATING_SHAPES_STYLES}
  ${ANIMATION_STYLES}
  ${FADE_IN_CLASSES}
  ${GRAIN_OVERLAY_STYLES}
  ${UPLOAD_ZONE_STYLES}
`;

export const POST_HISTORY_STYLES = `
  ${BASE_STYLES}
  ${FLOATING_SHAPES_STYLES}
  ${ANIMATION_STYLES}
  ${FADE_IN_CLASSES}
  ${GRAIN_OVERLAY_STYLES}
  ${SCROLLBAR_STYLES}
  ${POST_ITEM_STYLES}
  ${FEATURED_BADGE_STYLES}
`;

export const WELCOME_STYLES = `
  ${BASE_STYLES}
  ${FLOATING_SHAPES_STYLES}
  ${ANIMATION_STYLES}
  ${GRAIN_OVERLAY_STYLES}
  ${PAGE_TRANSITION_STYLES}
  ${WELCOME_TEXT_STYLES}
  ${SKIP_BUTTON_STYLES}
`;

export const DASHBOARD_STYLES = `
  ${BASE_STYLES}
  ${ANIMATION_STYLES}
  ${FADE_IN_CLASSES}
`;
