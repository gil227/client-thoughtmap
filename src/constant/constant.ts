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
    ZOOM_SPEED:0.01
}