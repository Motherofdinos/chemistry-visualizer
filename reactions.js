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
                // H2[0]:0,1 | H2[1]:2,3 | O2:4,5 → H2O[0]:0(O),1,2(H) | H2O[1]:3(O),4,5(H)
                atomMapping: [[0,1],[1,2],[2,4],[3,5],[4,0],[5,3]]
            },
            {
                id: 'c-o2',
                title: 'Горіння вуглецю',
                equation: 'C + O₂ → CO₂',
                reactants: [{ formula: 'C', count: 1 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'CO2', count: 1 }],
                // C:0 | O2:1,2 → CO2:0(C),1,2(O)
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
                // CH4:0(C),1-4(H) | O2[0]:5,6 | O2[1]:7,8
                // CO2:0(C),1,2(O) | H2O[0]:3(O),4,5(H) | H2O[1]:6(O),7,8(H)
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
                // C2H5OH:0(C1),1(C2),2(O),3-8(H) | O2[0]:9,10 | O2[1]:11,12 | O2[2]:13,14
                // CO2[0]:0(C),1,2(O) | CO2[1]:3(C),4,5(O) | H2O[0]:6(O),7,8(H) | H2O[1]:9(O),10,11(H) | H2O[2]:12(O),13,14(H)
                atomMapping: [[0,0],[1,3],[2,6],[3,7],[4,8],[5,10],[6,11],[7,13],[8,14],[9,1],[10,2],[11,4],[12,5],[13,9],[14,12]]
            }
        ]
    },
    {
        id: 'water',
        title: 'Вода та її властивості',
        reactions: [
            {
                id: 'h2o-decomp',
                title: 'Розклад води (електроліз)',
                equation: '2H₂O → 2H₂ + O₂',
                reactants: [{ formula: 'H2O', count: 2 }],
                products: [{ formula: 'H2', count: 2 }, { formula: 'O2', count: 1 }],
                // H2O[0]:0(O),1,2(H) | H2O[1]:3(O),4,5(H)
                // H2[0]:0,1(H) | H2[1]:2,3(H) | O2:4,5(O)
                atomMapping: [[0,4],[1,0],[2,1],[3,5],[4,2],[5,3]]
            },
            {
                id: 'na-h2o',
                title: 'Натрій + вода',
                equation: '2Na + 2H₂O → 2NaOH + H₂',
                reactants: [{ formula: 'Na', count: 2 }, { formula: 'H2O', count: 2 }],
                products: [{ formula: 'NaOH', count: 2 }, { formula: 'H2', count: 1 }],
                // Na[0]:0 | Na[1]:1 | H2O[0]:2(O),3,4(H) | H2O[1]:5(O),6,7(H)
                // NaOH[0]:0(Na),1(O),2(H) | NaOH[1]:3(Na),4(O),5(H) | H2:6,7(H)
                atomMapping: [[0,0],[1,3],[2,1],[3,2],[4,6],[5,4],[6,5],[7,7]]
            }
        ]
    },
    {
        id: 'ammonia',
        title: 'Синтез аміаку (Габер)',
        reactions: [
            {
                id: 'n2-h2-nh3',
                title: 'Синтез аміаку',
                equation: 'N₂ + 3H₂ → 2NH₃',
                reactants: [{ formula: 'N2', count: 1 }, { formula: 'H2', count: 3 }],
                products: [{ formula: 'NH3', count: 2 }],
                // N2:0,1(N) | H2[0]:2,3 | H2[1]:4,5 | H2[2]:6,7(H)
                // NH3[0]:0(N),1,2,3(H) | NH3[1]:4(N),5,6,7(H)
                atomMapping: [[0,0],[1,4],[2,1],[3,2],[4,3],[5,5],[6,6],[7,7]]
            },
            {
                id: 'nh3-decomp',
                title: 'Розклад аміаку',
                equation: '2NH₃ → N₂ + 3H₂',
                reactants: [{ formula: 'NH3', count: 2 }],
                products: [{ formula: 'N2', count: 1 }, { formula: 'H2', count: 3 }],
                // NH3[0]:0(N),1,2,3(H) | NH3[1]:4(N),5,6,7(H)
                // N2:0,1(N) | H2[0]:2,3 | H2[1]:4,5 | H2[2]:6,7(H)
                atomMapping: [[0,0],[1,2],[2,3],[3,4],[4,1],[5,5],[6,6],[7,7]]
            }
        ]
    },
    {
        id: 'redox',
        title: 'Окисно-відновні реакції',
        reactions: [
            {
                id: 'mg-o2',
                title: 'Горіння магнію',
                equation: '2Mg + O₂ → 2MgO',
                reactants: [{ formula: 'Mg', count: 2 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'MgO', count: 2 }],
                // Mg[0]:0 | Mg[1]:1 | O2:2,3 → MgO[0]:0(Mg),1(O) | MgO[1]:2(Mg),3(O)
                atomMapping: [[0,0],[1,2],[2,1],[3,3]]
            },
            {
                id: 'c-o2-redox',
                title: 'Горіння вуглецю (окиснення)',
                equation: 'C + O₂ → CO₂',
                reactants: [{ formula: 'C', count: 1 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'CO2', count: 1 }],
                atomMapping: [[0,0],[1,1],[2,2]]
            }
        ]
    }
];

export const MOLECULES = {
    'H2': {
        atoms: [
            { type: 'H', pos: [0, 0, -0.37] },
            { type: 'H', pos: [0, 0,  0.37] }
        ],
        bonds: [[0, 1]]
    },
    'O2': {
        atoms: [
            { type: 'O', pos: [0, 0, -0.6] },
            { type: 'O', pos: [0, 0,  0.6] }
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
            { type: 'C', pos: [0,  0,  0] },
            { type: 'O', pos: [0,  0, -1.16] },
            { type: 'O', pos: [0,  0,  1.16] }
        ],
        bonds: [[0, 1, 2], [0, 2, 2]]
    },
    'CH4': {
        atoms: [
            { type: 'C', pos: [ 0,  0,  0] },
            { type: 'H', pos: [ 1,  1,  1] },
            { type: 'H', pos: [-1, -1,  1] },
            { type: 'H', pos: [-1,  1, -1] },
            { type: 'H', pos: [ 1, -1, -1] }
        ],
        bonds: [[0,1],[0,2],[0,3],[0,4]]
    },
    'C2H5OH': {
        atoms: [
            { type: 'C', pos: [0,    0,    0] },   // C1
            { type: 'C', pos: [1.54, 0,    0] },   // C2
            { type: 'O', pos: [2,    1.4,  0] },   // O
            { type: 'H', pos: [2.9,  1.4,  0] },   // H of OH
            { type: 'H', pos: [-0.5, 0.5,  0.8] }, // H of CH3
            { type: 'H', pos: [-0.5, 0.5, -0.8] }, // H of CH3
            { type: 'H', pos: [-0.5, -1,   0] },   // H of CH3
            { type: 'H', pos: [1.8, -0.5,  0.8] }, // H of CH2
            { type: 'H', pos: [1.8, -0.5, -0.8] }  // H of CH2
        ],
        bonds: [[0,1],[1,2],[2,3],[0,4],[0,5],[0,6],[1,7],[1,8]]
    },
    // ── Нові молекули ──────────────────────────────────────────────────────
    'N2': {
        atoms: [
            { type: 'N', pos: [0, 0, -0.55] },
            { type: 'N', pos: [0, 0,  0.55] }
        ],
        bonds: [[0, 1, 3]] // triple bond
    },
    'NH3': {
        // Pyramidal, N-H bond ~1.01, angle ~107°
        atoms: [
            { type: 'N', pos: [ 0,    0,     0] },
            { type: 'H', pos: [ 1.0,  0,    -0.38] },
            { type: 'H', pos: [-0.5,  0.866, -0.38] },
            { type: 'H', pos: [-0.5, -0.866, -0.38] }
        ],
        bonds: [[0,1],[0,2],[0,3]]
    },
    'Na': {
        atoms: [{ type: 'Na', pos: [0, 0, 0] }],
        bonds: []
    },
    'NaOH': {
        atoms: [
            { type: 'Na', pos: [0,   0, 0] },
            { type: 'O',  pos: [1.8, 0, 0] },
            { type: 'H',  pos: [2.8, 0, 0] }
        ],
        bonds: [[0,1],[1,2]]
    },
    'Mg': {
        atoms: [{ type: 'Mg', pos: [0, 0, 0] }],
        bonds: []
    },
    'MgO': {
        atoms: [
            { type: 'Mg', pos: [-0.9, 0, 0] },
            { type: 'O',  pos: [ 0.9, 0, 0] }
        ],
        bonds: [[0, 1]]
    }
};

export const ATOMS = {
    'H':  { color: 0xffffff, radius: 0.30 },
    'O':  { color: 0xff3333, radius: 0.50 },
    'C':  { color: 0x333333, radius: 0.60 },
    'N':  { color: 0x3399ff, radius: 0.55 },
    'Na': { color: 0xaa44ff, radius: 0.80 },
    'Mg': { color: 0x00cc66, radius: 0.75 },
};
