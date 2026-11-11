export const DOMAIN = {
    // DATA_BASE:'https://server-thoughtmap.onrender.com'
    DATA_BASE:import.meta.env.VITE_API_URL
};

export const CLIENT_SNB = {
    WIDTH:300
};

export const API_PASS = {
    LOGIN:DOMAIN.DATA_BASE + '/auth/login',
    SIGN_UP:DOMAIN.DATA_BASE + '/auth/signup',
    AUTH_ME:DOMAIN.DATA_BASE + '/auth/me',
    AUTH_ME_REFRESH:DOMAIN.DATA_BASE + '/auth/refresh',
    CANVAS_LIST:DOMAIN.DATA_BASE + '/canvases',
};

export const CLIENT_PASS = {
    LOGIN:'/',
    SIGN_UP:'/signup',
    CANVAS:'/canvas'
}

export const DASHBOARD = {
    MIN:-10000,
    MAX:10000,
    GRID:50,
    MIN_SCALE:0.1,
    MAX_SCALE:5,
    ZOOM_SPEED:0.02
}

export const QUERY_KEY={
    CANVAS_LIST:'canvasList',
    CANVAS_DISPATCH:'canvasDispatched',
    CANVAS_NODES:(canvasId:string)=>['canvasNodes',canvasId],
}

export const NODE = {
    WIDTH_PRESET:(type:'S'|'L')=> {
        if(type === 'S') return 200;
        return 320
    },
    PADDING:16,
    MIN_HEIGHT:100,
    MAX_HEIGHT:500,
    ROUND:5,
    FONT_FAMILY:'Pretendard Variable, sans-serif',
    FONT_LETTER_SPACING:'-0.08em',
    FONT_LINE_HEIGHT:20,
    FONT_TITLE:'600 15px',
    FONT_TEXT:'400 13px',
    FONT_COLOR_TITLE:'#F4F4F5',
    FONT_COLOR_TEXT:'#A1A1AA',
}