import type {SVGProps} from "react";

const base: SVGProps<SVGSVGElement> = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#fff',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const IconSelect = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <path d="M6 3.5 18.5 11.1 12.9 12.7 10 18.5Z" />
    </svg>
);

export const IconAddNode = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <rect x="3" y="4" width="13" height="10.5" rx="2.5" />
        <path d="M6.5 8h6M6.5 11h3.5M18.5 16v5M16 18.5h5" />
    </svg>
);