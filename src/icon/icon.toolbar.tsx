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
        <path d="M14 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5v-8" />
        <path d="M19 2.5v5M16.5 5h5" />
        <path d="M8 9.5V8.5h7v1" />
        <path d="M11.5 8.5v8" />
        <path d="M10 16.5h3" />
    </svg>
);

export const IconNodeList = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <path d="M14 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5v-8" />
        <path d="M19 2.5v5M16.5 5h5" />
        <circle cx="8" cy="9" r="1" fill="#fff" stroke="none" />
        <circle cx="8" cy="12.5" r="1" fill="#fff" stroke="none" />
        <circle cx="8" cy="16" r="1" fill="#fff" stroke="none" />
        <path d="M10.5 9h4.5M10.5 12.5h6M10.5 16h6" />
    </svg>
);

export const IconNodeImage = (props: SVGProps<SVGSVGElement>) => (
    <svg {...base} {...props}>
        <path d="M14 3.5H6A2.5 2.5 0 0 0 3.5 6v12A2.5 2.5 0 0 0 6 20.5h12a2.5 2.5 0 0 0 2.5-2.5v-8" />
        <path d="M19 2.5v5M16.5 5h5" />
        <circle cx="9" cy="9.5" r="1.4" />
        <path d="M6.5 17.5l4-4.2 2.5 2.5 1.5-1.4 3 3.1" />
    </svg>
);
