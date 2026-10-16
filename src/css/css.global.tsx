import {css, Global} from "@emotion/react";

const reset = css`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body, #root {
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    img, svg, canvas, video {
        display: block; /* 인라인 요소 아래 생기는 몇 px 틈 제거 */
        max-width: 100%;
    }

    input, button, textarea, select {
        font: inherit; /* 폼 요소가 body 폰트를 따르게 */
    }

    button {
        border-radius: 0;
        background: none;
        border: none;
        cursor: pointer;
    }

    ul, ol {
        list-style: none;
    }

    a {
        text-decoration: none;
    }
`;

export default function CssGlobal() {
    return <Global styles={reset}/>
}