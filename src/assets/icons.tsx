/**
 * ---------------------------------------------------------------------------
 * ICON ASSETS — single source of truth for every bottom-nav icon.
 * ---------------------------------------------------------------------------
 * All icons are inline SVG (not image files), so:
 *   - zero extra network requests / zero image weight
 *   - color is controlled purely with CSS `color` (they all use
 *     `fill="currentColor"`), so the SAME icon can be dark-on-white
 *     (inactive) or white-on-red (active) without shipping two assets
 *   - crisp at any size / any screen density (phone, tablet, desktop)
 *
 * To add an icon for a future page: drop a new component below following
 * the same pattern (viewBox="0 0 1280 1280", fill="currentColor") and
 * export it. See README.md → "Adding a new page" for the full flow.
 * ---------------------------------------------------------------------------
 */
import { useId, type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function HomeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1280 1280" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M 490 65
           C 570 -10, 710 -10, 790 65
           L 1255 520
           C 1285 550, 1275 605, 1210 605
           C 1210 800, 1205 920, 1185 1015
           C 1160 1150, 1060 1240, 940 1255
           L 818 1267
           L 820 1000
           C 820 950, 815 830, 700 823
           L 580 823
           C 470 830, 465 940, 465 1000
           L 466 1267
           L 340 1255
           C 220 1240, 130 1150, 110 1015
           C 92 920, 90 800, 92 605
           L 72 605
           C 15 605, -5 555, 25 525
           Z"
      />
    </svg>
  );
}

export function ActivityIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1280 1280" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M 248 210 L 248 197 C 225 175 225 135 255 108 L 345 25 C 372 0 410 0 437 25 L 615 197 L 615 210 Z" />
      <path d="M 1032 210 L 1032 197 C 1055 175 1055 135 1025 108 L 935 25 C 908 0 870 0 843 25 L 665 197 L 665 210 Z" />
      <rect x="5" y="197" width="1270" height="316" rx="128" />
      <path
        d="M 107 640
           C 107 606 140 577 175 577
           L 305 577
           C 340 577 370 606 370 640
           L 370 835
           C 370 930 430 967 505 967
           C 545 967 580 948 605 932
           L 640 909
           L 675 932
           C 700 948 735 967 775 967
           C 850 967 907 930 907 835
           L 907 640
           C 907 606 937 577 972 577
           L 1105 577
           C 1140 577 1173 606 1173 640
           L 1173 1010
           C 1173 1155 1055 1273 910 1273
           L 370 1273
           C 225 1273 107 1155 107 1010
           Z"
      />
      <path
        d="M 437 640
           C 437 606 468 577 503 577
           L 772 577
           C 807 577 838 606 838 640
           L 838 838
           C 838 888 782 918 738 892
           L 680 855
           C 655 838 625 838 600 855
           L 542 892
           C 498 918 437 888 437 838
           Z"
      />
    </svg>
  );
}

export function PromotionIcon(props: IconProps) {
  // Uses a <mask>, so give it a unique id per render to stay valid
  // even if this icon is ever mounted more than once on the same page.
  const maskId = useId();
  return (
    <svg viewBox="0 0 1280 1280" fill="currentColor" aria-hidden="true" {...props}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="1280">
          <rect width="1280" height="1280" fill="#fff" />
          <path
            d="M 168 985 C 155 1080 190 1190 220 1295"
            fill="none"
            stroke="#000"
            strokeWidth={34}
            strokeLinecap="round"
          />
        </mask>
      </defs>

      <g stroke="currentColor" strokeWidth={98} strokeLinecap="round" fill="none">
        <line x1="640" y1="52" x2="640" y2="218" />
        <line x1="295" y1="178" x2="411" y2="295" />
        <line x1="985" y1="178" x2="869" y2="295" />
      </g>

      <g mask={`url(#${maskId})`}>
        <circle cx="280" cy="525" r="135" />
        <path
          d="M 100 1280
             C 60 1280 30 1258 22 1220
             C 5 1150 0 1080 2 1020
             C 6 850 130 685 280 685
             C 320 685 340 692 365 692
             C 430 685 480 600 505 560
             C 520 535 540 520 558 520
             C 600 520 640 565 640 600
             C 640 660 590 750 527 823
             L 508 790
             C 503 780 490 775 482 788
             C 478 795 480 800 483 806
             C 540 920 550 1080 540 1210
             C 535 1250 505 1280 465 1280
             Z"
        />
      </g>
      <g mask={`url(#${maskId})`} transform="matrix(-1 0 0 1 1280 0)">
        <circle cx="280" cy="525" r="135" />
        <path
          d="M 100 1280
             C 60 1280 30 1258 22 1220
             C 5 1150 0 1080 2 1020
             C 6 850 130 685 280 685
             C 320 685 340 692 365 692
             C 430 685 480 600 505 560
             C 520 535 540 520 558 520
             C 600 520 640 565 640 600
             C 640 660 590 750 527 823
             L 508 790
             C 503 780 490 775 482 788
             C 478 795 480 800 483 806
             C 540 920 550 1080 540 1210
             C 535 1250 505 1280 465 1280
             Z"
        />
      </g>
    </svg>
  );
}

export function AccountIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 1280 1280" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="630" cy="308" r="308" />
      <path
        d="M 390 620
           C 440 620 520 716 635 716
           C 750 716 830 620 890 620
           C 1080 620 1172 850 1172 1050
           C 1172 1200 1080 1280 940 1280
           L 335 1280
           C 195 1280 105 1200 105 1050
           C 105 850 200 620 390 620
           Z"
      />
    </svg>
  );
}
