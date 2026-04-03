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
            },
            {
                id: 's-o2',
                title: 'Горіння сірки',
                equation: 'S + O₂ → SO₂',
                reactants: [{ formula: 'S', count: 1 }, { formula: 'O2', count: 1 }],
                products: [{ formula: 'SO2', count: 1 }],
                // S:0 | O2:1,2 → SO2:0(S),1,2(O)
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
            },
            {
                id: 'c3h8-o2',
                title: 'Горіння пропану',
                equation: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O',
                reactants: [{ formula: 'C3H8', count: 1 }, { formula: 'O2', count: 5 }],
                products: [{ formula: 'CO2', count: 3 }, { formula: 'H2O', count: 4 }],
                // C3H8:0(C1),1(C2),2(C3),3-10(H×8) | O2[0]:11,12 | [1]:13,14 | [2]:15,16 | [3]:17,18 | [4]:19,20
                // CO2[0]:0(C),1,2(O) | CO2[1]:3(C),4,5(O) | CO2[2]:6(C),7,8(O)
                // H2O[0]:9(O),10,11(H) | H2O[1]:12(O),13,14(H) | H2O[2]:15(O),16,17(H) | H2O[3]:18(O),19,20(H)
                atomMapping: [
                    [0,0],[1,3],[2,6],
                    [3,10],[4,11],[5,13],[6,14],[7,16],[8,17],[9,19],[10,20],
                    [11,1],[12,2],[13,4],[14,5],[15,7],[16,8],
                    [17,9],[18,12],[19,15],[20,18]
                ]
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
            },
            {
                id: 'cao-h2o',
                title: 'Оксид кальцію + вода',
                equation: 'CaO + H₂O → Ca(OH)₂',
                reactants: [{ formula: 'CaO', count: 1 }, { formula: 'H2O', count: 1 }],
                products: [{ formula: 'CaOH2', count: 1 }],
                // CaO:0(Ca),1(O) | H2O:2(O),3,4(H)
                // CaOH2:0(Ca),1(O),2(H),3(O),4(H)
                atomMapping: [[0,0],[1,1],[2,3],[3,2],[4,4]]
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
                id: 'al-o2',
                title: 'Горіння алюмінію',
                equation: '4Al + 3O₂ → 2Al₂O₃',
                reactants: [{ formula: 'Al', count: 4 }, { formula: 'O2', count: 3 }],
                products: [{ formula: 'Al2O3', count: 2 }],
                // Al[0]:0 | [1]:1 | [2]:2 | [3]:3 | O2[0]:4,5 | O2[1]:6,7 | O2[2]:8,9
                // Al2O3[0]:0(Al1),1(Al2),2(O),3(O),4(O) | Al2O3[1]:5(Al1),6(Al2),7(O),8(O),9(O)
                atomMapping: [[0,0],[1,1],[2,5],[3,6],[4,2],[5,3],[6,4],[7,7],[8,8],[9,9]]
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

export const MOLECULE_INFO = {
    'H2':     { name: 'Водень',              molarMass: 2.02   },
    'O2':     { name: 'Кисень',              molarMass: 32.00  },
    'H2O':    { name: 'Вода',                molarMass: 18.02  },
    'C':      { name: 'Вуглець',             molarMass: 12.01  },
    'CO2':    { name: 'Вуглекислий газ',     molarMass: 44.01  },
    'CH4':    { name: 'Метан',               molarMass: 16.04  },
    'C2H5OH': { name: 'Етанол',              molarMass: 46.07  },
    'C3H8':   { name: 'Пропан',              molarMass: 44.10  },
    'N2':     { name: 'Азот',                molarMass: 28.02  },
    'NH3':    { name: 'Аміак',               molarMass: 17.03  },
    'Na':     { name: 'Натрій',              molarMass: 22.99  },
    'NaOH':   { name: 'Гідроксид натрію',    molarMass: 40.00  },
    'Mg':     { name: 'Магній',              molarMass: 24.31  },
    'MgO':    { name: 'Оксид магнію',        molarMass: 40.30  },
    'S':      { name: 'Сірка',               molarMass: 32.07  },
    'SO2':    { name: 'Діоксид сірки',       molarMass: 64.07  },
    'CaO':    { name: 'Оксид кальцію',       molarMass: 56.08  },
    'CaOH2':  { name: 'Гідроксид кальцію',   molarMass: 74.09  },
    'Al':     { name: 'Алюміній',            molarMass: 26.98  },
    'Al2O3':  { name: 'Оксид алюмінію',      molarMass: 101.96 },
};

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
            { type: 'C', pos: [0,    0,    0] },
            { type: 'C', pos: [1.54, 0,    0] },
            { type: 'O', pos: [2,    1.4,  0] },
            { type: 'H', pos: [2.9,  1.4,  0] },
            { type: 'H', pos: [-0.5, 0.5,  0.8] },
            { type: 'H', pos: [-0.5, 0.5, -0.8] },
            { type: 'H', pos: [-0.5, -1,   0] },
            { type: 'H', pos: [1.8, -0.5,  0.8] },
            { type: 'H', pos: [1.8, -0.5, -0.8] }
        ],
        bonds: [[0,1],[1,2],[2,3],[0,4],[0,5],[0,6],[1,7],[1,8]]
    },
    'C3H8': {
        // Propane: C-C-C backbone opens downward (V shape ∨),
        // so all outward H atoms point away from the molecule center.
        // C-C-C angle ~112°, H-C-C angles ~109.5°.
        atoms: [
            { type: 'C', pos: [-1.28, -0.86,  0] },    // C1 — 0
            { type: 'C', pos: [ 0,     0,     0] },    // C2 — 1
            { type: 'C', pos: [ 1.28, -0.86,  0] },    // C3 — 2
            { type: 'H', pos: [-2.16, -0.21,  0] },    // H on C1 (outward) — 3
            { type: 'H', pos: [-1.30, -1.49,  0.89] }, // H on C1 — 4
            { type: 'H', pos: [-1.30, -1.49, -0.89] }, // H on C1 — 5
            { type: 'H', pos: [ 0,     0.65,  0.88] }, // H on C2 (upward) — 6
            { type: 'H', pos: [ 0,     0.65, -0.88] }, // H on C2 — 7
            { type: 'H', pos: [ 2.16, -0.21,  0] },    // H on C3 (outward) — 8
            { type: 'H', pos: [ 1.30, -1.49,  0.89] }, // H on C3 — 9
            { type: 'H', pos: [ 1.30, -1.49, -0.89] }, // H on C3 — 10
        ],
        bonds: [[0,1],[1,2],[0,3],[0,4],[0,5],[1,6],[1,7],[2,8],[2,9],[2,10]]
    },
    'N2': {
        atoms: [
            { type: 'N', pos: [0, 0, -0.55] },
            { type: 'N', pos: [0, 0,  0.55] }
        ],
        bonds: [[0, 1, 3]] // triple bond
    },
    'NH3': {
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
            { type: 'Na', pos: [0,   0,   0] },
            { type: 'O',  pos: [1.0, 0,   0] },
            { type: 'H',  pos: [1.4, 0.7, 0] }
        ],
        bonds: [[0,1],[1,2]]
    },
    'Mg': {
        atoms: [{ type: 'Mg', pos: [0, 0, 0] }],
        bonds: []
    },
    'MgO': {
        atoms: [
            { type: 'Mg', pos: [-0.55, 0, 0] },
            { type: 'O',  pos: [ 0.55, 0, 0] }
        ],
        bonds: [[0, 1]]
    },
    'S': {
        atoms: [{ type: 'S', pos: [0, 0, 0] }],
        bonds: []
    },
    'SO2': {
        // Bent molecule, ~119° angle, double bonds
        atoms: [
            { type: 'S', pos: [ 0,    0.6,  0] },
            { type: 'O', pos: [-1.0, -0.3,  0] },
            { type: 'O', pos: [ 1.0, -0.3,  0] }
        ],
        bonds: [[0,1,2],[0,2,2]]
    },
    'CaO': {
        atoms: [
            { type: 'Ca', pos: [-0.6, 0, 0] },
            { type: 'O',  pos: [ 0.6, 0, 0] }
        ],
        bonds: [[0, 1]]
    },
    'CaOH2': {
        // Ca(OH)₂ — two OH groups at ~109°
        atoms: [
            { type: 'Ca', pos: [0,    0,    0] },
            { type: 'O',  pos: [1.3,  0.6,  0] },
            { type: 'H',  pos: [1.8,  1.2,  0] },
            { type: 'O',  pos: [1.3, -0.6,  0] },
            { type: 'H',  pos: [1.8, -1.2,  0] }
        ],
        bonds: [[0,1],[1,2],[0,3],[3,4]]
    },
    'Al': {
        atoms: [{ type: 'Al', pos: [0, 0, 0] }],
        bonds: []
    },
    'Al2O3': {
        // Two Al bridged by 3 O atoms — compact so two instances don't overlap
        atoms: [
            { type: 'Al', pos: [-0.7,  0.6, 0] }, // Al1 — 0
            { type: 'Al', pos: [ 0.7,  0.6, 0] }, // Al2 — 1
            { type: 'O',  pos: [-1.2, -0.2, 0] }, // O1  — 2
            { type: 'O',  pos: [ 0,   -0.2, 0] }, // O2 bridging — 3
            { type: 'O',  pos: [ 1.2, -0.2, 0] }, // O3  — 4
        ],
        bonds: [[0,2],[0,3],[1,3],[1,4]]
    }
};

export const ATOMS = {
    'H':  { color: 0xffffff, radius: 0.30 },
    'O':  { color: 0xff3333, radius: 0.50 },
    'C':  { color: 0x333333, radius: 0.60 },
    'N':  { color: 0x3399ff, radius: 0.55 },
    'S':  { color: 0xffcc00, radius: 0.65 },
    'Na': { color: 0xaa44ff, radius: 0.80 },
    'Mg': { color: 0x00cc66, radius: 0.75 },
    'Ca': { color: 0x66aaff, radius: 0.80 },
    'Al': { color: 0xccccdd, radius: 0.72 },
};
