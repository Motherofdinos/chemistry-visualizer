export const TOPICS = [
    {
        id: 'oxygen-simple',
        title: 'Властивості кисню (прості речовини)',
        reactions: [
            {
                id: 'h2-o2',
                title: 'Горіння водню',
                equation: '2H₂ + O₂ → 2H₂O',
                reactants: [{ formula: 'H2', count: 2 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'H2O', count: 2 }],
                // Flat atom indices: reactants [H2×2, O2×1] → products [H2O×2]
                // H2[0]: atoms 0,1 | H2[1]: atoms 2,3 | O2[0]: atoms 4,5
                // H2O[0]: atoms 0(O),1(H),2(H) | H2O[1]: atoms 3(O),4(H),5(H)
                atomMapping: [[0,1],[1,2],[2,4],[3,5],[4,0],[5,3]]
            },
            {
                id: 'c-o2',
                title: 'Горіння вуглецю',
                equation: 'C + O₂ → CO₂',
                reactants: [{ formula: 'C', count: 1 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'CO2', count: 1 }],
                // C[0]: atom 0 | O2[0]: atoms 1,2 → CO2[0]: atoms 0(C),1(O),2(O)
                atomMapping: [[0,0],[1,1],[2,2]]
            }
        ]
    },
    {
        id: 'oxygen-complex',
        title: 'Властивості кисню (складні речовини)',
        reactions: [
            {
                id: 'ch4-o2',
                title: 'Горіння метану',
                equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O',
                reactants: [{ formula: 'CH4', count: 1 }, { formula: 'O2', count: 2 }],
                products: [{ formula: 'CO2', count: 1 }, { formula: 'H2O', count: 2 }],
                // CH4: atoms 0(C),1-4(H) | O2[0]: 5,6 | O2[1]: 7,8
                // CO2: atoms 0(C),1,2(O) | H2O[0]: 3(O),4,5(H) | H2O[1]: 6(O),7,8(H)
                atomMapping: [[0,0],[1,4],[2,5],[3,7],[4,8],[5,1],[6,2],[7,3],[8,6]]
            }
        ]
    },
    {
        id: 'alcohols',
        title: 'Хімічні властивості спиртів',
        reactions: [
            {
                id: 'ethanol-o2',
                title: 'Горіння етанолу',
                equation: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O',
                reactants: [{ formula: 'C2H5OH', count: 1 }, { formula: 'O2', count: 3 }],
                products: [{ formula: 'CO2', count: 2 }, { formula: 'H2O', count: 3 }],
                // C2H5OH: 0(C1),1(C2),2(O),3-8(H) | O2[0]:9,10 | O2[1]:11,12 | O2[2]:13,14
                // CO2[0]:0(C),1,2(O) | CO2[1]:3(C),4,5(O) | H2O[0]:6(O),7,8(H) | H2O[1]:9(O),10,11(H) | H2O[2]:12(O),13,14(H)
                atomMapping: [[0,0],[1,3],[2,6],[3,7],[4,8],[5,10],[6,11],[7,13],[8,14],[9,1],[10,2],[11,4],[12,5],[13,9],[14,12]]
            }
        ]
    }
];

export const MOLECULES = {
    'H2': {
        atoms: [
            { type: 'H', pos: [0, 0, -0.37] },
            { type: 'H', pos: [0, 0, 0.37] }
        ],
        bonds: [[0, 1]]
    },
    'O2': {
        atoms: [
            { type: 'O', pos: [0, 0, -0.6] },
            { type: 'O', pos: [0, 0, 0.6] }
        ],
        bonds: [[0, 1, 2]] // double bond
    },
    'H2O': {
        atoms: [
            { type: 'O', pos: [0, 0, 0] },
            { type: 'H', pos: [0.96, 0, 0] },
            { type: 'H', pos: [0.96 * Math.cos(104.5 * Math.PI / 180), 0.96 * Math.sin(104.5 * Math.PI / 180), 0] }
        ],
        bonds: [[0, 1], [0, 2]]
    },
    'C': {
        atoms: [{ type: 'C', pos: [0, 0, 0] }],
        bonds: []
    },
    'CO2': {
        atoms: [
            { type: 'C', pos: [0, 0, 0] },
            { type: 'O', pos: [0, 0, -1.16] },
            { type: 'O', pos: [0, 0, 1.16] }
        ],
        bonds: [[0, 1, 2], [0, 2, 2]]
    },
    'CH4': {
        atoms: [
            { type: 'C', pos: [0, 0, 0] },
            { type: 'H', pos: [1, 1, 1] },
            { type: 'H', pos: [-1, -1, 1] },
            { type: 'H', pos: [-1, 1, -1] },
            { type: 'H', pos: [1, -1, -1] }
        ],
        bonds: [[0, 1], [0, 2], [0, 3], [0, 4]]
    },
    'C2H5OH': {
        atoms: [
            { type: 'C', pos: [0, 0, 0] }, // C1
            { type: 'C', pos: [1.54, 0, 0] }, // C2
            { type: 'O', pos: [2, 1.4, 0] }, // O
            { type: 'H', pos: [2.9, 1.4, 0] }, // H of OH
            { type: 'H', pos: [-0.5, 0.5, 0.8] }, // H of CH3
            { type: 'H', pos: [-0.5, 0.5, -0.8] }, // H of CH3
            { type: 'H', pos: [-0.5, -1, 0] }, // H of CH3
            { type: 'H', pos: [1.8, -0.5, 0.8] }, // H of CH2
            { type: 'H', pos: [1.8, -0.5, -0.8] }  // H of CH2
        ],
        bonds: [[0, 1], [1, 2], [2, 3], [0, 4], [0, 5], [0, 6], [1, 7], [1, 8]]
    }
};

export const ATOMS = {
    'H': { color: 0xffffff, radius: 0.3 },
    'O': { color: 0xff0000, radius: 0.5 },
    'C': { color: 0x333333, radius: 0.6 },
    'Na': { color: 0x8800ff, radius: 0.8 }
};
