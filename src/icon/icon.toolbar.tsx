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

export const IconNodeText = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <path d="M5 6V5h14v1" />
        <path d="M12 5v14" />
        <path d="M9 19h6" />
    </svg>
);

export const IconNodeList = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <circle cx="5" cy="7" r="1" fill="currentColor" />
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="5" cy="17" r="1" fill="currentColor" />
        <path d="M9 7h11" />
        <path d="M9 12h11" />
        <path d="M9 17h11" />
    </svg>
);

export const IconNodeImage = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M20.5 15.5l-4.5-4.5L6 19.5" />
    </svg>
);
