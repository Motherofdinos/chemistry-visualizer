// Color themes for Chemistry Visualizer
// Each theme defines: scene background, C atom color, and a CSS data-theme id
export const THEMES = {
    dark: {
        id: 'dark',
        name: 'Темна',
        icon: '🌑',
        sceneBg: 0x111111,
        atomC: 0x666666,
    },
    light: {
        id: 'light',
        name: 'Світла',
        icon: '☀️',
        sceneBg: 0xe8f4f8,
        atomC: 0x222222,
    },
    lab: {
        id: 'lab',
        name: 'Лаборат.',
        icon: '🔬',
        sceneBg: 0x1a2a1a,
        atomC: 0x888888,
    },
    space: {
        id: 'space',
        name: 'Космос',
        icon: '🚀',
        sceneBg: 0x050510,
        atomC: 0xaaaaaa,
    },
};
