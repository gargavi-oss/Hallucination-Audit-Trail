/**
 * Design Token System — "Lumina Trace" by Stitch
 * Creative North Star: "The Digital Forensic Lab"
 * 
 * Generated from Stitch Design System API
 * Asset: assets/cb0f91b1279a4a66a2b11c35c6c43c29
 * Project: projects/15053128564110726334
 */

export const STITCH_TOKENS = {
  // ── Surface Hierarchy (Tonal Layering) ──
  surface: {
    background:           '#0f131c',
    dim:                  '#0f131c',
    lowest:               '#0a0e17',
    low:                  '#181b25',
    container:            '#1c1f29',
    high:                 '#262a34',
    highest:              '#31353f',
    bright:               '#353943',
    variant:              '#31353f',
    tint:                 '#bdc2ff',
  },

  // ── Primary (Indigo) ──
  primary: {
    main:                 '#bdc2ff',
    container:            '#7c87f3',
    fixed:                '#e0e0ff',
    fixedDim:             '#bdc2ff',
    onPrimary:            '#131e8c',
    onContainer:          '#081486',
  },

  // ── Secondary (Purple) ──
  secondary: {
    main:                 '#ddb7ff',
    container:            '#6f00be',
    fixed:                '#f0dbff',
    fixedDim:             '#ddb7ff',
    onSecondary:          '#490080',
    onContainer:          '#d6a9ff',
  },

  // ── Tertiary (Green/Emerald) ──
  tertiary: {
    main:                 '#4edea3',
    container:            '#00885d',
    fixed:                '#6ffbbe',
    fixedDim:             '#4edea3',
    onTertiary:           '#003824',
    onContainer:          '#000703',
  },

  // ── Error (Red) ──
  error: {
    main:                 '#ffb4ab',
    container:            '#93000a',
    onError:              '#690005',
    onContainer:          '#ffdad6',
  },

  // ── On-Surface ──
  onSurface: {
    main:                 '#dfe2ef',
    variant:              '#c7c4d7',
    inverse:              '#2c303a',
  },

  // ── Outline ──
  outline: {
    main:                 '#908fa0',
    variant:              '#464554',
  },

  // ── Inverse ──
  inverse: {
    surface:              '#dfe2ef',
    primary:              '#4953bc',
    onSurface:            '#2c303a',
  },
};

// ── Semantic Status Colors ──
// Maps claim statuses to Stitch token families
export const STATUS_TOKENS = {
  verified: {
    color:  STITCH_TOKENS.tertiary.main,        // #4edea3
    bg:     STITCH_TOKENS.tertiary.container,    // #00885d
    bgAlpha: 'rgba(78, 222, 163, 0.12)',
    borderAlpha: 'rgba(78, 222, 163, 0.3)',
    label:  'Verified',
    icon:   '✓',
  },
  unverified: {
    color:  '#eab308',                            // Yellow (custom, not in base palette)
    bg:     'rgba(234, 179, 8, 0.2)',
    bgAlpha: 'rgba(234, 179, 8, 0.12)',
    borderAlpha: 'rgba(234, 179, 8, 0.3)',
    label:  'Unverified',
    icon:   '?',
  },
  hallucinated: {
    color:  STITCH_TOKENS.error.main,             // #ffb4ab
    bg:     STITCH_TOKENS.error.container,        // #93000a
    bgAlpha: 'rgba(255, 180, 171, 0.12)',
    borderAlpha: 'rgba(255, 180, 171, 0.3)',
    label:  'Hallucinated',
    icon:   '✕',
  },
};

// ── Typography Scale ──
export const TYPOGRAPHY = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
  display: { size: '3.5rem', weight: 800, spacing: '-0.02em' },
  headline: { size: '1.5rem', weight: 700, spacing: '-0.01em' },
  title: { size: '1.125rem', weight: 600, spacing: '-0.005em' },
  body: { size: '1rem', weight: 400, spacing: '0' },
  label: { size: '0.75rem', weight: 500, spacing: '0.05em', transform: 'uppercase' },
};

// ── Shape ──
export const SHAPE = {
  sm: '0.25rem',  // 4px — data tags, chips
  md: '0.375rem', // 6px — buttons, cards
  lg: '0.5rem',   // 8px — panels
  xl: '0.75rem',  // 12px — modals
  full: '9999px',
};

// ── Spacing Scale ──
export const SPACING = {
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

export default STITCH_TOKENS;
