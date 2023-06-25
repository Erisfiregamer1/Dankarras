/// GUN DEFINITIONS

const combineStats = function(arr) {
    try {
        // Build a blank array of the appropiate length
        let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        arr.forEach(function(component) {
            for (let i = 0; i < data.length; i++) {
                try {
                data[i] = data[i] * component[i];
                } catch (err) {
                    data[i] = 1
                }
            }  
        });
        return { 
            reload: data[0],
            recoil: data[1],
            shudder: data[2],
            size: data[3],
            health: data[4],
            damage: data[5],
            pen: data[6],
            speed: data[7], 
            maxSpeed: data[8],
            range: data[9],
            density: data[10],
            spray: data[11],
            resist: data[12], 
        };
    } catch (err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../../../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
        des: 10,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.45,   1,      4,      1,      1,      1,      5,      1],  
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      0.75,   1,      3,      1,      1,      1,      0.1,    1], 
    basic:              [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1],  
  /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    noDefence:          [1,     1,     1,      1,   0.01,      1,      0.01,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
    sniper:             [1.35,  1,     0.25,   1,      1,      0.8,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    0.8,    0.9,    1,      1,      1,      1,      2,      1],     
            srifle:     [0.95,  0.85,  1.6,    1,      1,      10,     0.5,    3,      1,      13,     4,      0.01,   8], 
        assass:         [1.65,  1,     0.25,   1,      1.15,   1,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1], 
        mini:           [0.75,  0.6,   1,      0.8,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [0.7,   0.3,   1,      1,      5,      2.5,      1,      1.5,    1,      2.5,    1,      2,      1],  
        shotgun:        [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      1,      2,      1,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],    
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.5,    1.1,    1,      0.6,    1,      1,      1,      1],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.8,   0.667, 0.9,    1,      1,      0.8,      0.8,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
    blockmach:          [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      2.5,      1.25], 
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    1.2,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
  //easy shoot settings
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    hellarecoil:        [1,     10,    1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morespray:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      2.7,      1],
    lessspray:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1.5,      1],
    bitlessspray:       [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1.2,      1],
    nosprayspray:       [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      0.1,      1],
    bitmorespray:       [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      2.6,      1], 
    tonsmorespray:      [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      3,      1],
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    tenxreload:         [0.1,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    big:                [1,     1,     1,      3,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    superbig:           [1,     1,     1,      5,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morereload:         [1.51,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    bitmorereload:      [1.25,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    bitlessreload:      [1.2,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lesspen:            [1.2,   1,     1,      1,      1,      1,      0.8,      1,      1,      1,      1,      1,      1],
    morepen:            [1.2,   1,     1,      1,      1,      1,      1.2,      1,      1,      1,      1,      1,      1], 
    bitmorepen:         [1.2,   1,     1,      1,      1,      1,      1.1,      1,      1,      1,      1,      1,      1], 
    craplotmoreknockback:[1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      8,      1,      1],
    tonsmoreknockback:  [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      5,      1,      1],
    lessknockback:      [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    moreknockback:      [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      3,      1,      1],
    zeroknockback:      [1,     0,     1,      1,      1,      1,      1,      1,      1,      1,      3,      1,      1],
    bitlesspen:         [1.2,   1,     1,      1,      1,      1,      0.9,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    alotreload:         [10,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitmorespeed:       [1,     1,     1,      1,      1,      1,      1,      1.1,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1],
    gottagofast:        [1,     1,     1,      1,      1,      1,      1,     2,   5,   1,      1,      1,      1],
    nospeed:            [10000, 1.4,   0.1,    1,      1,      0.75,   1,      0,      1,      1,      1,      15,     1], 
    moredamage:            [1,     1,     1,      1,      1,      1.2,    1,      1,      1,      1,      1,      1,      1],
    hecklotmoredamage:     [1,     1,     1,      1,      1,      2,    1,      1,      1,      1,      1,      1,      1],
    tonsmoredamage:        [1,     1,     1,      1,      1,      1.5,    1,      1,      1,      1,      1,      1,      1],
    bitmoredamage:         [1,     1,     1,      1,      1,      1.1,    1,      1,      1,      1,      1,      1,      1],
    NOWTHATSALOTOFDAMAGE:  [1.2,   0.3,     1,      1,      1,      10,     1,      1,      1,      1,      1,      1,      1],
    lessdamage:         [1,     1,     1,      1,      1,      0.7,    1,      1,      1,      1,      1,      1,      1],
    alotlessdamage:     [1,     1,     1,      1,      1,      0.5,    1,      1,      1,      1,      1,      1,      1],
    bitlessdamage:      [1,     1,     1,      1,      1,      0.8,    1,      1,      1,      1,      1,      1,      1],
    halfdamage:         [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    stronger:           [1,     1,     1,      1,      1.05,   1.05,   1,      1.1,    1,      1,      1,      1,      1],
    oneshot:            [1000,  1.4,   0.1,    1,      1,      0.75,   1,      0,      1,      1,      1,      15,     1],
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    reallydense:        [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      2,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1],
    lessrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.4,    1,      1,      1],
    morerange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.7,    1,      1,      1],
    muchrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      10,    1,      1,      1],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1], 
    silence:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,      0.5,     5,      1,      10], 
    destroyDominator:   [4,     0,     1,      0.975,  8,      8,      6.25,   0.5,    1,     1,       1,      0.5,    1],
    gunnerDominator:    [0.65,  0,     1,      0.5,    1.2,    1,      1.2,    1.25,   1,     0.7,     1,      1.25,   1],
    trapperDominator:   [0.85,  0,     0.25,   1.1,    1.2,    1.2,    1.2,    0.6,    2,     0.7,     1,      0.5,    1],
    mothership:         [2,     1,     1,      1,      1.1,    1.1,    1.1,    0.6,    0.6,    15,     1,      1,      1.25],
    skimboss:           [1,     0.5,   1,      0.9,    1.2,    1.2,    1.2,    1.1,    1,     0.7,     1,      1,      1],
    summoner:           [0.1,   0.5,   1,      0.333,  1.5,    1.5,    1.5,    1,      1,     0.5,     1,      1,      1],
    bigsniper:          [2,     1.2,   1.3,   1.3,     1,      1.2,     1,      1,     1,       1,     1,      0.5,     1],
    heavymachine:       [1.2,   0.6,   1,     1.25,     1,     1.5,     2,    0.8,     1,     3.5,     1,     3.5,     1],
    flankpound:         [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,     1,     1.5,    1,      1.15],
    shotgun3:           [0.5,   0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,     1,     1.2,    1.2,    1],
    gatling:            [0.66,  0.8,   2,      1,      1,      0.75,   1,      1,      0.8,     1.5,   1,      3,     1],
    hexapound:          [1.5,   1.4,   1,      1,      1,      1.5,    1,      0.85,   0.8,     1,     1.5,    1,      1.15],
    rocket:             [0.5,   2,     1.5,    0.85,   0.25,   0.25,   0.25,   0.75,   1,       0.5, 1, 1.25, 1],
    rocketr:            [2, 2, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    heatseek:           [0.1,    1.3,    1,     1,     1,      0.1,   0.1,   1,   1,     1,     1,     1,     1],
    webber:             [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    battle:             [1, 1, 1, 1, 1.25, 1.15, 1, 1, 0.85, 1, 1, 1, 1.1],
    sheild:             [0.2, 0, 1, 0.7, 1, 1, 1, 0.01, 1, 0.01, 1, 1, 1],
    flare:              [0.5,   1.3,   1.5,   0.85,   0.25,  0.25,   0.25,    0.75,    1,     0.5,    1,     1.25,      1],
    flarer:             [2, 1.3, 1, 1, 1.5, 0.9, 1, 0.15, 0.5, 1, 1, 1, 1],
    explosion:          [18,    1.4,   0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      1,     1], 
    lazer:              [0.1,    1.4,   0.1,    2,      1,      0.1,   1,      6,    1,      0.60,      1,      1,     1], 
    heatseekmach:       [0.5,   2, 1.5,   0.85, 0.25, 0.25, 0.25, 0.75, 1, 0.5, 1, 1.25, 1],
    nade:               [4.5,   5,     1,       1.5,    1,      1,     5,      1,      1,      1.1,    5,      0.01,      2],
    frag:               [1.35,  2,     0.25,    1,      20,     1.8,    0.8,    0.8,    1.5,    20,     1.5,    0.2,    1.15],
    trpfrag:            [1.35,  2,     0.25,    1,      20,     1.8,    0.8,    0.8,    1.5,    60,     1.5,    0.2,    1.15],
    bigfrag:            [1.35,  2,     0.25,    5,      20,     1.8,    0.8,    0,    1.5,    10,     1.5,    0.2,    1.15],
    flamer:             [0.8,    1.4,   0.1,    1,      1,      0.40,   1,      2,    1,      1,      1,      5,     1],  
    accel:              [1,    1.8,   0.1,    1.3,      8,      0.5,    2,      3,    10,      3,      1,      0.01,     3],
    c4:                 [100,   0,     1,       3,      20,     80,     1,      0,      1,      1,      10,      1,      1],
    bigger:             [1,     1,     1,      1.1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    match:              [1.375, 0.625, 0.625,  1,      0.625,  0.625,  0.625,  0.625,  0.625,  0.625,  0.625,  1,      1], 
    destroyDominator:   [4,     0,     1,      0.975,  8,      8,      6.25,   0.5,    1,     1,       1,      0.5,    1],
    gunnerDominator:    [0.65,  0,     1,      0.5,    1.2,    1,      1.2,    1.25,   1,     0.7,     1,      1.25,   1],
    trapperDominator:   [0.85,  0,     0.25,   1.1,    1.2,    1.2,    1.2,    0.6,    2,     0.7,     1,      0.5,    1],
  
};

const dfltskl = 9;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
    sword: 7,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6, 
    necro: 7,
    trap: 8,
};

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,  
    INVISIBLE: [0, 0],
    ALPHA: 1,
    WATER_PROOF: false,
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hexagon = {
  PARENT: [exports.food],
    FOOD: {
        LEVEL: 7,
    },
    LABEL: 'Hexagon',
    VALUE: 20000,
    SHAPE: 6,
    SIZE: 30,
    COLOR: 9,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 75 * basePolygonHealth,
        RESIST: Math.pow(1.75, 2.5),
        SHIELD: 30 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
  };
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.dentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Dented Pentagon',
    VALUE: 290,
    SHAPE: 106,
    SIZE: 15,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};

exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 13,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: 9,
        LABEL: "Gravel",
    };
    exports.platinum  = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'platinum',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 25,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.lapis = {
        PARENT: [exports.platinum],
        SIZE: 25,
        SHAPE: 4,
        LABEL: "lapis",
    }; 
exports.tree = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Tree',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: 4,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 23,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.bush = {
        PARENT: [exports.tree],
        SIZE: 25,
        SHAPE: 4,
        LABEL: "Bush",
    }; 
// WEAPONS
const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
//bullet
exports.bullet = { 
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.packedbullet = { 
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 103,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.pulsedbullet = { 
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 106,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.patherbullet = { 
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 102,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.speedshape = { 
    LABEL: 'Speedshape',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 103,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       10,      1.6,    0,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.doublereload, g.tonsmorrecoil]),
                TYPE: exports.bullet,
                
            },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    },
  ],
};
exports.speedshape2 = { 
    LABEL: 'Speedshape',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 121,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       10,      1.6,    0,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.doublereload, g.tonsmorrecoil]),
                TYPE: exports.bullet,
              
            },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    },
  ],
};
exports.gbulletfast = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.sbulletfast = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 4,
    MOTION_TYPE: 'shrink',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 0,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.abulletfast = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    MOTION_TYPE: 'accel',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullet2 = {
    LABEL: 'Bullet',
    TYPE: 'wall', 
    ACCEPTS_SCORE: false, 
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 0,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.telebullet = {
    LABEL: 'Tele-Bullet',
    TYPE: 'bullet', 
    ACCEPTS_SCORE: false, 
    PERSISTS_AFTER_DEATH: false, 
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 0,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    TELEPORTS: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };

exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    DIE_AT_RANGE: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
}
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: -4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };

exports.trap = {
    LABEL: 'Thrown Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.star = {
        PARENT: [exports.trap],
        LABEL: 'Star',
        TYPE: 'swarm',
        SHAPE: 1,
        HITS_OWN_TYPE: 'never',
        MOTION_TYPE: 'swarm',
        FACING_TYPE: 'turnWithSpeed',

    }
    exports.block = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,   
        },
    };   
exports.blockmach = {
        LABEL: 'Set Trap',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        BODY: {
            SPEED: 1,
            DENSITY: 5,   
        },
    };   

    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.defdrone = {
    PARENT: [exports.drone],
    LABEL: 'Defense Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       10,      1,      8,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            }, }, {
      POSITION: [    15,       10,      1,      8,      0,      60,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            }, }, { 
      POSITION: [    15,       10,      1,      8,      0,     300,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    BUFF_VS_FOOD: true,
    },
  ],
};
exports.speeddefdrone = {
    PARENT: [exports.drone],
    LABEL: 'Speed Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       10,      1.6,    8,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tonsmorrecoil]),
                TYPE: exports.bullet,
                
            }, }, {
       POSITION: [    15,       10,      1,      8,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            }, }, {
      POSITION: [    15,       10,      1,      8,      0,      60,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            }, }, { 
      POSITION: [    15,       10,      1,      8,      0,     300,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                TYPE: exports.bullet,
                
            },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    BUFF_VS_FOOD: true,
    },
  ],
};
exports.fastdrone = {
    PARENT: [exports.drone],
    LABEL: 'Speed Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       10,      1.6,    8,      0,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.tonsmorrecoil]),
                TYPE: exports.bullet,
                
            },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    BUFF_VS_FOOD: true,
    },
  ],
};
exports.recoildrone = {
    PARENT: [exports.drone],
    LABEL: 'Speed Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    GUNS: [ {  /*** LENGTH    WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [    15,       13,      0,    8,      0,     180,      0,   ], 
            PROPERTIES:{
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.tonsmorrecoil]),
                TYPE: exports.bullet,
                
            },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    BUFF_VS_FOOD: true,
    },
  ],
};
  
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES:{
                 
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES:{
                 
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster, 
            }, }, 
    ],
};
exports.boosterspawn = {
    PARENT: [exports.bullet],
    SHAPE: 0,
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
        },
    }, {
        POSITION: [13, 8, 1, 0, 0, 135, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
            
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 225, 0.6, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
            
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 145, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
            
        },
    }, {
        POSITION: [14, 8, 1, 0, 0, 215, 0.1, ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.lowpower, g.muchmorerecoil, g.morespeed,

                g.morespeed
            ]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true,
            }],
            STAT_CALCULATOR: gunCalcNames.thruster,
            
        },
    }, ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES:{
                 
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES:{
                 
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };

    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
//tank
exports.genericTank = { 
    LABEL: 'Unknown Class',
    TYPE: 'tank', 
    DAMAGE_CLASS: 2,
    DANGER: 5,
    SHAPE: 0,
    INVISIBLE: [0, 0],
    ALPHA: 1,
    WATER_PROOF: false,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS:[],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };
exports.odTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    SHAPE: 4,
};

exports.generalt = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
},
COLOR: 16,
SHAPE: 3,
};

exports.paratroop = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: -3,
};
exports.revitalt = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: 5,
};
exports.odrevitalt = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: -4,
};
exports.genrevitalt = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: -5,
};
exports.mastert = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: 1,
};
exports.god = {
PARENT:[exports.genericTank],
LABEL: 'Turret',
BODY: {
     FOV: 0.8
  },
COLOR: 16,
SHAPE: 106,
};

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                    
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                    
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                    
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

    //CONTROLLERS: ['nearestDifferentMaster'],
exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
                COLOR: 16,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                    
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
             FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                    
                }, }
        ],
    };
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    
                }, },
        ],
    };
    exports.sniper3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 5,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,     9,      1,      0,      0,      0,      0,   ], 
                PROPERTIES:{
                 
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.auto, g.assass, g.autosnipe]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,     9,     -1.5,    8,      0,      0,      0,   ], 
               PROPERTIES:{
                 
               },
            },
        ],
    };

    exports.autorailgun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  1,     8,      1,      10,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      15,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      20,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      25,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.morespeed]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  27,    2,      1,      0,      4,      0,      0, ],
                }, { 
                POSITION: [  27,    2,      1,      0,      -4,     0,      0, ],
            },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
 exports.bigauto3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };


exports.tritrapgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                  }, {
        POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.auto]),
                TYPE: exports.trap,
            }, },
    ],
};
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.landmineBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -8,
    INDEPENDENT: true,
};
exports.megamineBody = {
    LABEL: '',
    CONTROLLERS: ['fastspin'], 
    COLOR: 9,
    SHAPE: -8,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
exports.rocket = {
    PARENT: [exports.bullet],
    LABEL: 'Rocket',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [6, 10, 1.5, 9, 0, 180, 7.5],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.rocket]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.flarebullet = {
    PARENT: [exports.bullet],
    LABEL: 'Flare',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [  18,     8,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.basic, g.flare]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
        }
    }]
};
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.doublereload]),
                    TYPE: exports.flarebullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};

//Grenades

    exports.nade2 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (2)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };

    exports.nade3 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (3)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      60,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     300,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };

    exports.nade4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };
exports.nade4v2 = {      
        PARENT: [exports.bullet],
        LABEL: 'Grenade (4)',
        BODY: {
            RANGE: 5,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,  
        MOTION_TYPE: 'motor',     
        CONTROLLERS: ['alwaysFire', 'goToMasterTarget'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ],  
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };
exports.exploder = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1000000000000000,
        SPEED: 0, 
        RANGE: 12,
        SIZE: 0.68,
        DENSITY: 1.25,
        HEALTH: 100000000000000,
        DAMAGE: 10,
        PUSHABILITY: 0.3,
    },
    MOTION_TYPE: 'bigexplode',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: false,
};
exports.nadetest = {  
        PARENT: [exports.bullet],
        LABEL: 'Grenade test',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 111,
        INDEPENDENT: true,     
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    15,      1,      0,      0,      0,      3.25,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.bigfrag]),  
                    TYPE: [exports.exploder],
            }, }, 
        ],
    };
    exports.nade8 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (8)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      45,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     225,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     315,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     135,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.frag]),
                    TYPE: [exports.bullet],
            }, }, 
        ],
    };
exports.knockback = {
    PARENT: [exports.genericTank],
    LABEL: 'knockback',
    LEVEL: 60,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            TYPE: exports.bullet,
             SHOOT_SETTINGS: combineStats([g.basic, g.reallydense, g.reallydense, g.reallydense, g.reallydense, g.reallydense])
        }, }, 
    ],
};
    //Trap nades

    exports.trpnade2 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp2)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade3 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp3)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      60,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     300,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade4 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp4)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };

    exports.trpnade8 = {
        PARENT: [exports.bullet],
        LABEL: 'Grenade (trp8)',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        SHAPE: 0,
        //FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire'],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     8,      0,      0,      0,   ], 
            }, {
            POSITION: [   3,    10,      1,     12.5,   1.5,     0,      0,   ], 
            }, {
            POSITION: [   1,    10,      1,      0,      0,      90,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     270,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      0,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     180,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,      45,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     225,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     315,      6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, {
            POSITION: [   1,    10,      1,      0,      0,     135,     6.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op, g.trpfrag]),
                    TYPE: [exports.trap],
            }, }, 
        ],
    };
exports.nadethrower3 = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            INVISIBLE: [0.2, 0],
            LABEL: 'Super Nade Boi', 
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    8.5,     -1.2,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nadetest, 
                    }, }, {
                POSITION: [  18,    8.5,     -1.2,      0,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nadetest, 
                    }, }, {
                POSITION: [  18,    8.5,     -1.2,      0,      0,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nadetest, 
                    }, }, {
                POSITION: [  18,    8.5,     -1.2,      0,      0,      270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nadetest, 
                    }, }, {
                POSITION: [   5,    9.5,    -1.6,    8,      0,      0,      0,   ], 
                },  {
                POSITION: [   5,    9.5,    -1.6,    8,      0,     90,      0,   ], 
                },  {
                POSITION: [   5,    9.5,    -1.6,    8,      0,    180,      0,   ], 
                },  {
                POSITION: [   5,    9.5,    -1.6,    8,      0,    270,      0,   ], 
                },
            ],
        };
function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,      0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}

let counter = 0,
    counter1 = 0;
function makeAutoN(type, sides = 3, name = -1, options = {}) {
    let misc = {
        swivel: false,
        stat: g.blank
    };
    if (options.swivel != null) misc.swivel = options.swivel;
    if (options.stat != null) misc.stat = options.stat;
    let output = JSON.parse(JSON.stringify(type));
    exports['_auto' + counter] = JSON.parse(JSON.stringify(type));
    let tank = exports['_auto' + counter];
    tank.TURRETS = type.TURRETS;
    for (let i = 0; i < tank.GUNS.length; i++) try {
        let gun = tank.GUNS[i].PROPERTIES.SHOOT_SETTINGS;
        tank.GUNS[i].PROPERTIES.SHOOT_SETTINGS = combineStats([[
            gun.reload,
            gun.recoil,
            gun.shudder,
            gun.size,
            gun.health,
            gun.damage,
            gun.pen,
            gun.speed,
            gun.maxSpeed,
            gun.range,
            gun.density,
            gun.spray,
            gun.resist
        ], g.auto, misc.stat]);
        exports['_weapon_type' + counter1] = output.GUNS[i].PROPERTIES.TYPE;
        exports['_weapon_type' + counter1].TURRETS = type.GUNS[i].PROPERTIES.TYPE.TURRETS;
        tank.GUNS[i].PROPERTIES.TYPE = exports['_weapon_type' + counter1];
        counter1++;
    } catch (e) {}
    tank.DANGER = 'auto turret';
    let a = 0,
        turret = a => ([{
            POSITION: [misc.swivel ? 8 * (Math.pow(Math.sqrt(0.625, 4), sides - 3)) + 1 : 10 * (Math.pow(Math.sqrt(0.78, 4), sides - 3)) + 1, misc.swivel ? 7 : 9, 0, a, misc.swivel ? 360 : 360 / sides + 65, misc.swivel ? 1 : 0],
            TYPE: [tank, {
                LABEL: '',
                BODY: {
                    FOV: 2.5
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                COLOR: 16
            }]
        }]);
    if (type.DANGER != null) output.DANGER = (type.DANGER >= 7 || type.DANGER + sides - 1 >= 7) ? 7 : type.DANGER + sides - 1;
    output.TURRETS = [];
    for (let i = 0; i < sides; i++) {
        output.TURRETS = output.TURRETS.concat(turret(a));
        a += 360 / sides;
    };
    output.LABEL = name === -1 ? type.LABEL + '-' + sides : name;
    output.FACING_TYPE = 'autospin';
    output.GUNS = [];
    counter++;
    return output;
}

function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
function makeCaltrop(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let trap1 = {
        POSITION: [16, 6, 1, 0, 0, 140, 0, ],
    }
    let trap2 = {
        POSITION: [2, 6, 1.1, 16, 0, 140, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.arty, g.fast]),
            TYPE: exports.block,
        },
    }
    let trap3 = {
        POSITION: [16, 6, 1, 0, 0, 220, 0, ],
    }
    let trap4 = {
        POSITION: [2, 6, 1.1, 16, 0, 220, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.arty, g.fast]),
            TYPE: exports.block,
        },
    }
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS == null) {
        output.GUNS = [trap1, trap2, trap3, trap4];
    } else {
        output.GUNS = [...type.GUNS, trap1, trap2, trap3, trap4];
    }
    if (name == -1) {
        output.LABEL = 'Caltrop ' + type.LABEL;
    } else {
        output.LABEL = name;
    }
    return output;
}
exports.oddrone = makeAuto(exports.drone, 'Auto-Drone', {type: exports.heavy3gun, size: 15,});
exports.paradrone = makeAuto(exports.fastdrone, 'Sanic-Auto-Drone', {type: exports.heavy3gun, size: 15,});
exports.oddefdrone = makeAuto(exports.fastdrone, 'Auto-Defense-Drone', {type: exports.heavy3gun, size: 15,});
exports.thegodofdrone = makeAuto(exports.speeddefdrone, 'Speedy-Auto-Defense-Drone', {type: exports.heavy3gun, size: 15,});
exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    LEVEL: 0,   
    SHAPE: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            
        }, }, 
    ],
};
exports.bluerunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Blue Runner',
    LEVEL: 0,
    SHAPE: 118,
};
exports.spikedrunner = {
    PARENT: [exports.genericTank],
    LABEL: 'Spiked Runner',
    LEVEL: 0,
    SHAPE: 120,
};
exports.sting = {
    PARENT: [exports.genericTank],
    LABEL: 'Stinger',
    LEVEL: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.speedshape2,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.test99 = {
    PARENT: [exports.genericTank],
    LABEL: 'Test',
    LEVEL: 0,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.doublereload, g.NOWTHATSALOTOFDAMAGE]),
                        TYPE: exports.packedbullet,
                    }, }, { 
        POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.doublereload, g.NOWTHATSALOTOFDAMAGE]),
                        TYPE: exports.pulsedbullet,
                    }, }, { 
       POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.doublereload, g.NOWTHATSALOTOFDAMAGE]),
                        TYPE: exports.patherbullet,
                    }, }, 
            ],
        };
exports.Aball = {
    PARENT: [exports.genericTank],
    LABEL: 'Ball',
      BODY: {
        HEALTH: base.HEALTH + 10, 
        DAMAGE: base.DAMAGE + 10, 
        PENETRATION: base.PENETRATION + 10, 
        SHIELD: base.SHIELD + 10,
        REGEN: base.REGEN - 2,
        FOV: base.FOV + 0.3,
      },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
          TYPE: exports.bullet,
    }, },
],
      };
exports.ball = {
    PARENT: [exports.genericTank],
    LABEL: 'Ball',
    GUNS:[],
    BODY: {
        HEALTH: base.HEALTH + 10, 
        DAMAGE: base.DAMAGE + 10, 
        PENETRATION: base.PENETRATION + 10, 
        SHIELD: base.SHIELD + 10,
        REGEN: base.REGEN - 2,
        FOV: base.FOV,
    },
}
exports.auto1 = makeAuto(exports.Aball, 'Auto-1');
exports.clock = makeAuto(exports.auto1, 'Clock', {type: exports.shieldTurret});
exports.auto2 = makeAuto(exports.Aball, 'Auto-2', { type: exports.autoSmasherTurret});
exports.trapauto = makeAuto(exports.Aball, 'Trap Auto-1', {type: exports.shieldTurret});
exports.quartBack = makeCaltrop(exports.ball, 'Quarter Back')
exports.quartBack.STAT_NAMES = statnames.trap
exports.bbone = makeHybrid(exports.basic, 'Back Bone');
           exports.testbed = {
            PARENT: [exports.genericTank],
            RESET_UPGRADES: true,
            LABEL: 'Testbed',
            LEVEL: 60,
            SHAPE: 125,
            BODY: { // def
                SHIELD: 10000,
                REGEN: 100,
                HEALTH: 10000,
                DAMAGE: 10,
                DENSITY: 40, //20,
                SPEED: 10,
                FOV: 4, //15,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.abulletfast, { SHAPE: 5, }],
                }, }, 
            ],
        };
           exports.testbedPG2 = {
            PARENT: [exports.genericTank],
            RESET_UPGRADES: true,
            LABEL: 'Testbed',
            LEVEL: 1,
            SHAPE: 126,
            BODY: { // def
                SHIELD: 10000,
                REGEN: 100,
                HEALTH: 10000,
                DAMAGE: 10,
                DENSITY: 40, //20,
                SPEED: 10,
                FOV: 4, //15,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.abulletfast, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.testbedPG3 = {
            PARENT: [exports.genericTank],
            RESET_UPGRADES: true,
            LABEL: 'Testbed',
            LEVEL: 1,
            BODY: { // def
                SHIELD: 10000,
                REGEN: 100,
                HEALTH: 10000,
                DAMAGE: 10,
                DENSITY: 40, //20,
                SPEED: 10,
                FOV: 4, //15,
            },
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: [exports.abulletfast, { SHAPE: 5, }],
                }, }, 
            ],
        };
exports.starshoot = {
    PARENT: [exports.genericTank],
    LABEL: 'Star-Shooter',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    10,     -1.5,    0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.star,
        }, }, 
    ],
};
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };


            exports.autosin = makeAuto(exports.single , 'Auto-Single');
            exports.hybridsin = makeHybrid(exports.single, 'Blaster');
            exports.gsingle = {
                PARENT: [exports.genericTank],
                LABEL: 'Double',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  19,     8,      1,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      180,      0,   ],                            
                    }
                ],
            };  


        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.megamine = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Mine',
                INVISIBLE: [0.065, 0.01],
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1.075,
                    FOV: base.FOV * 1.075,
                    DENSITY: base.DENSITY * 3,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }, {
                    POSITION: [  24,     0,      0,      30,     360,  0,], 
                    TYPE: exports.megamineBody,
                }],
            };
            exports.landmine = {
                PARENT: [exports.genericTank],
                LABEL: 'Landmine',
                INVISIBLE: [0.06, 0.01],
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.smasherBody,
                }, { 
                    POSITION: [  21.5,   0,      0,      30,     360,  0,],
                    TYPE: exports.landmineBody,
                }],
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    DAMAGE: base.DAMAGE * 1.15,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 1.5,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };                   
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher');
            exports.autosmash.SKILL_CAP = [smshskl, dfltskl, dfltskl, dfltskl, dfltskl, smshskl, smshskl, smshskl, smshskl, smshskl,];
            exports.twinautosmash = makeAuto(exports.smash, 'TwinAuto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.twinautosmash.SKILL_CAP = [smshskl, dfltskl, dfltskl, dfltskl, dfltskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };
 exports.expander = {
        PARENT: [exports.genericTank],
        LABEL: 'Expander',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.gbulletfast,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.gbulletfast,
            }, },
        ],
    };
exports.rocketblast = {
        PARENT: [exports.genericTank],
        LABEL: 'Rocket Shot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessdamage]),
                            TYPE: exports.rocket,
                        }, }, {
              POSITION: [  2,      3,      1,     12,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessdamage]),
                            TYPE: exports.rocket,
                        }, }, {
              POSITION: [  2,      3,      1,     13,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.lessdamage]),
                            TYPE: exports.rocket,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [4,    12,    1.7,      21,    0,    0,      0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
            }, },
        ],
    };
exports.shotgun1 = {
        PARENT: [exports.genericTank],
        LABEL: 'Shotgun',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.trishot = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Shotgun',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  2,      3,     1,     11,     -3,      120,      0,   ], 
                          PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     120,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     120,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                          }, }, {
                     POSITION: [  2,      3,     1,     11,     -3,      240,      0,   ], 
                          PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     240,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     240,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.flankshot = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Shotgun',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  2,      3,     1,     11,     -3,      180,      0,   ], 
                          PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     180,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.scatter2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Splatter',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  2,      3,      1,     11,      2,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                      POSITION: [  3,      4,      1,     11,      -3,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  3,      3,      1,     12,      0,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0.3,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0.3,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  18,     4,      1,      0,     5,     0,      0,   ], 
                           }, {
                    POSITION: [  18,     4,      1,      0,    0,     0,      0,  ],  
                           }, {
                    POSITION: [  18,     4,      1,      0,    -5,     0,      0,  ],  
                           }, {
                    POSITION: [  2,     16,      1,      18,    0,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.scatter = {
        PARENT: [exports.genericTank],
        LABEL: 'Scattershot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  2,      3,      1,     11,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                      POSITION: [  3,      4,      1,     11,      -3,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  3,      3,      1,     12,      0,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     4,      1,      0,     5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     4,      1,      0,    0,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                           }, }, {
                    POSITION: [  21,     4,      1,      0,    -5,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.offset2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Pulser',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                      POSITION: [  3,      4,      1,     11,      -3,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  3,      3,      1,     12,      0,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
        POSITION: [4,    12,    1.7,      18,    0,    0,      0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.morereload]),
            TYPE: exports.bullet,
        }, }, {
                    POSITION: [  18,     4,      1.2,      0,     5,     0,      0,   ], 
                           }, {
                    POSITION: [  18,     4,      1.2,      0,    0,     0,      0,  ],  
                           }, {
                    POSITION: [  18,     4,      1.2,      0,    -5,     0,      0,  ],  
            },
        ],
    };
exports.offset = {
        PARENT: [exports.genericTank],
        LABEL: 'Pump Gun',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                      POSITION: [  3,      4,      1,     11,      -3,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  3,      3,      1,     12,      0,      0,      0.1,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0.2,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     4,      1,      0,     5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,     4,      1,      0,    0,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                           }, }, {
                    POSITION: [  18,     4,      1,      0,    -5,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.pelletshot = {
        PARENT: [exports.genericTank],
        LABEL: 'Pellet Shot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      2,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      2,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      2,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morereload, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.morereload, g.morereload]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  24,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake, g.morereload, g.morereload]), 
                            TYPE: exports.bullet,
                        }, }, {
            POSITION: [   5,    11,    -1.6,    7,      0,      0,      0,   ],
            }, 
        ],
    };
exports.thunder = {
        PARENT: [exports.genericTank],
        LABEL: 'Thunder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     13,      0,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     12,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     13,     -3,     0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     12,     1,      0,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed, g.morespeed, g.lessrange, g.lessrange, g.morespeed, g.lessdamage]),
                            TYPE: exports.casing,
                        }, }, {  
                        POSITION: [  21,     3,      1,      0,    -2,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                           }, }, {  
                      POSITION: [  21,     3,      1,      0,    -5,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                          }, }, {
                          POSITION: [  21,     3,      1,      0,    2,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),  
                            TYPE: exports.bullet,
                           }, }, {             
                    POSITION: [  21,     3,      1,      0,     5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                       POSITION: [  12,      7,      1,     0,     0,  90,      0,   ],
                 }, {
                       POSITION: [  12,      7,      1,     0,      0, -90,      0,   ],
                    }, {
                       POSITION: [  9,      13,      -1.4,     4,      0, 0,      0,   ],
            }, 
        ],
    };
exports.fielder = {
        PARENT: [exports.genericTank],
        LABEL: 'Pellet Spread',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     13,      0,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     12,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     13,     -3,     0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     12,     1,      0,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     13,     3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                           POSITION: [  2,      3,  1,    11,     -2,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                          }, }, {
                       POSITION: [  12,      7,      1,     0,     0,  90,      0,   ],
                 }, {
                       POSITION: [  12,      7,      1,     0,      0, -90,      0,   ],
            }, 
        ],
    };
exports.punter = {
        PARENT: [exports.genericTank],
        LABEL: 'Punter',
  BODY: { 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     13,      0,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     12,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     13,     -3,     0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     12,     1,      0,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      3,      1,     13,     3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                           POSITION: [  2,      3,   1,   11,     -2,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                          }, }, {
                       POSITION: [  12,      7,      1,     0,     0,  90,      0,   ],
                 }, {
                       POSITION: [  12,      7,      1,     0,      0, -90,      0,   ],
                 }, {
                    POSITION: [  14,    16,    1,      0,      0,      0,      0,   ],
            }, 
        ],
    };
exports.fielder2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Wildfowler',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      2,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      2,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                               }, }, {
                    POSITION: [  2,      2,      1,     12,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      2,      1,     11,      -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      2,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      2,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      2,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      2,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      2,      1,     13,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {
                    POSITION: [  2,      2,      1,     12,     1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                           }, }, {                
                    POSITION: [  2,      2,      1,     13,     3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                                 /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                           POSITION: [  2,      2,      0,    11,     -2,      0,    0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                            POSITION: [  2,      2,     0, 12,     0,    0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,      0, 10,     2,     0,        0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,      0, 11,     1,    0,         0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,      0, 10,     -2,    0,         0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,      0, 13,     2,    0,        0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,      0, 10,     -1,    0,        0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,     0, 10,     3,    0,        0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                          POSITION: [  2,      2,     0, 10,     -3,    0,        0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,       0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                  }, }, {
                    POSITION: [  18,     3,      -1.2,      0,    0,     0,      0,  ], 
                       }, {
                       POSITION: [  12,      7,      1,     0,     0,  90,      0,   ],
                 }, {
                       POSITION: [  12,      7,      1,     0,      0, -90,      0,   ],
            }, 
        ],
    };
exports.shotguninvis = {
        PARENT: [exports.genericTank],
        LABEL: 'Reaper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        INVISIBLE: [0.08, 0.03],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  24,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
                POSITION: [  14,    14,    1,      0,      0,      180,      0,   ],

            }, 
        ],
    };

exports.snipeshotgun4 = {
        PARENT: [exports.genericTank],
        LABEL: 'Dead-eye',
        BODY: {
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  27,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  27,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
                   POSITION: [  14,    16,    1,      0,      0,      0,      0,   ],
            }, 
        ],
    };
exports.snipeshotgun = {
        PARENT: [exports.genericTank],
        LABEL: 'Stinger',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.3,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  24,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.assassshotgun = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper Shotgun',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.3,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.morespeed, g.bitmorespeed]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  27,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  27,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
        ],
    };
exports.storm = {
        PARENT: [exports.genericTank],
        LABEL: 'Storm',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      7,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.moredamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      7,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.moredamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.bitmoredamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.bitmoredamage]),
                            TYPE: exports.bullet,
                        }, }, {                
                    POSITION: [  2,      5,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.bitmoredamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1.2,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1.2,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]), 
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [   6,     12,    -1.2,    8,     0,      180,    0,   ], 
            }, 
        ],
    };
exports.bucket = {
        PARENT: [exports.genericTank],
        LABEL: 'BuckShot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      5,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {                
                    POSITION: [  2,      5,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]), 
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [   6,     12,    -1.2,    8,     0,      180,    0,   ], 
            }, 
        ],
    };
exports.buckethy = makeHybrid(exports.bucket, 'Blunder Buss');
exports.bucket2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Bucaneer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,      5,     1,     11,     -3,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      3,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     12,     -1,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      1,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {                
                    POSITION: [  2,      5,      1,     13,     -1,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     5,      1,      0,     3,     0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  24,     5,      1,      0,    -3,     0,      0.5,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]), 
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [   6,     12,    -1.2,    8,     0,      180,    0.5,   ], 
                    }, {
                      POSITION: [  2,      5,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      5,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {                
                    POSITION: [  2,      5,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  24,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  24,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.hexapound, g.fake]), 
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [   6,     12,    -1.2,    8,     0,      180,    0,   ], 
            }, 
        ],
    };
    exports.twinangle = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Tri-angle',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
               }, }, {
           POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, },
        ],
    };
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };

        exports.gunnerflank = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                   }, }, {
                        TYPE: exports.bullet,
                POSITION: [  12,    3.5,     1,      0,     7.25,    180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    180,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    180,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
      exports.battery = {
        PARENT: [exports.genericTank],
            LABEL: 'Battery',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,    3.5,     1,      0,      0,      0,     0.90, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                  },  },
            ],
        };

            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
  exports.spammer = {
                PARENT: [exports.genericTank],
                LABEL: 'Spammer',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     2,     4.0,     -6,    -7.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     2,     4.0,     -6,     7.5,    0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     2,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     2,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     2,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     2,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  13,     2,     3.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Double Twin',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };

  exports.tripleangle = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet-Triangle',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, {
                 POSITION: [  18,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.assult = {
        PARENT: [exports.genericTank],
        LABEL: 'Assult',
        INVISIBLE: [0.08, 0.04],
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    8.5,     1.5,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.snipertriple = {
        PARENT: [exports.genericTank],
        LABEL: 'Triple Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  24,    8.5,     1,      0,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
              POSITION: [  24,    8.5,     1,      0,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };

 exports.twinsnipe = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,    -5.5,     0,    0.675, ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      5.5,     0,      0,    ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
           }, },
        ],
    };

   exports.bigsniper = {
        PARENT: [exports.genericTank],
        DANGER: 7,
        LABEL: 'Howitzer',
        BODY:{
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.3,
            SPEED: base.SPEED * 0.95
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  27,    9.5,    1.5,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload ]),
                TYPE: exports.bullet,
            }, },
        ],
    };

      exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

      exports.srifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Sniper Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5, 
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [   8,    10.5,    -1.6,   5,      0,      0,      0,   ],
                        }, {
                    POSITION: [  26,     5.5,    1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.srifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

       exports.rifle2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Sniper Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                  POSITION: [  25,    10.5,    1,      0,      0,      0,      0,   ]
                } , {
                 POSITION: [   8,    10.5,    -1.6,    5,      0,      0,      0,   ],
                }, {
                 POSITION: [  28,     7,      1,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
 exports.unnamed = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
            FOV: base.FOV * 1.225,
        },
        LABEL: 'Far N Close',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
                ALT_FIRE: true,
            }, },
        ],
    };
        exports.hybridrif = makeHybrid(exports.rifle, 'Tomahawk');
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.assassin2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Fast Assassin',
            BODY: {
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    9,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
        exports.nadethrower2 = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            LABEL: 'Linger-bomber',
            BODY: {
                ACCELERATION: base.ACCEL * 0.85,
                SPEED: base.SPEED * 0.75, 
                FOV: base.FOV * 1.05,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,    8.5,     1.2,    0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nade4v2,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
exports.nadethrower = {
            PARENT: [exports.genericTank],
            DANGER: 8,
            LABEL: 'Semi-bomber',
            BODY: {
                ACCELERATION: base.ACCEL * 0.85,
                SPEED: base.SPEED * 0.75, 
                FOV: base.FOV * 1.05,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1.2,    0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.nade]), 
                        TYPE: exports.nade4,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };

            exports.hybridassa = makeHybrid(exports.assassin, 'Hardscope');
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin, "Auto-Assassin");

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.shifter = {
            PARENT: [exports.genericTank],
            LABEL: 'Shifter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter2, g.morereload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.morereload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };


 exports.hunter4 = {
            PARENT: [exports.genericTank],
            LABEL: 'Heavy Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     11,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.pound, g.lessreload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    13,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.pound, g.lessreload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.manager = {
        PARENT: [exports.genericTank],
        LABEL: 'Manager',  
        STAT_NAMES: statnames.drone,
        DANGER: 8,
        INVISIBLE: [0.05, 0.08],
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 6,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
   exports.watcher = {
        PARENT: [exports.genericTank],
        LABEL: 'Watcher',  
        STAT_NAMES: statnames.drone,
        DANGER: 8,
        INVISIBLE: [0.05, 0.08],
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 6,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, {
            POSITION: [   6,     12,    1.2,     8,      0,     180,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };
 exports.dlord = {
            PARENT: [exports.genericTank],
            LABEL: 'Drone Lord',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        MAX_CHILDREN: 8,
                        
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                        
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                        
                    }, },
            ],
        };
exports.dronegod= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     240,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,
                        MAX_CHILDREN: 1,
                        
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    120,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true, 
                        MAX_CHILDREN: 1,
                        
                    }, }, {
                      POSITION: [   6,     12,    1.2,     8,      0,     60,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        MAX_CHILDREN: 1,
                        
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                        
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,     0,     0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.defdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        MAX_CHILDREN: 1,
                        
                    }, }, {
                      POSITION: [   5,     12,    1.2,     8,      0,     300,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip,]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            MAX_CHILDREN: 3,
                            
                        }, }, {
                          POSITION: [   5,     11,      1,      10.5,   0,      180,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.paradrone,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 1,
                            
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      180,      0,   ], 
                    }
            ],
        }, 'Drone God', {type: exports.god, size: 11});
exports.revitalist= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.gottagofast, g.NOWTHATSALOTOFDAMAGE]),
                        TYPE: exports.defdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.gottagofast, g.NOWTHATSALOTOFDAMAGE]),
                        TYPE: exports.defdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true, 
                        
                    }, },
            ],
        }, 'Revitalist', {type: exports.revitalt, size: 11});
exports.revitalizer= makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.4,
                },
                MAX_CHILDREN: 5,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.defdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.defdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.defdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.defdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
        }, 'Revitalizer', {type: exports.revitalt, size: 11});
exports.general= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,  
                        
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true, 
                        
                    }, },
            ],
        }, 'General', {type: exports.generalt, size: 9});
exports.paratrooper= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.paradrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.paradrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Paratrooper', {type: exports.paratroop, size: 7});
exports.odrevital= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddefdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddefdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Revitaldrive', {type: exports.odrevitalt, size: 9});
exports.courtmarsh= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.speeddefdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.speeddefdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Court Marshal', {type: exports.genrevitalt, size: 11});
exports.dronemaster= makeAuto({
  PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 5,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.thegodofdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.thegodofdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Master Of Drones', {type: exports.mastert, size: 11});
            exports.sergeant= makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.4,
                },
                MAX_CHILDREN: 5,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
        }, 'Sergeant', {type: exports.generalt, size: 9});
        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overhunt = {
            PARENT: [exports.genericTank],
            LABEL: 'Overhunt',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     18,    1.2,     8,      0,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pound, g.lessreload]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
            exports.overdrive = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 4,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Overdrive', {type: exports.odTurret, size: 11});
            exports.manadrive = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hard-Drive',
                DANGER: 9,
                INVISIBLE: [0.05, 0.08],
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 4,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Hard-Drive', {type: exports.odTurret, size: 11});
            exports.overworker = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overdrive',
                DANGER: 6,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.1,
                    FOV: base.FOV * 1.4,
                },
                MAX_CHILDREN: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
        }, 'Overworker', {type: exports.odTurret, size: 11});

            exports.gundrive = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            }, 'Gundrive', {type: exports.odTurret, size: 11});

             exports.trapdrive = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2, 
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            },'Trapdrive',{type: exports.odTurret, size: 11});
          
            exports.driver = makeAuto({
              PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 1,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 1,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.oddrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 1,   
                        }, }, 
                    ]
            }, 'Driver',{type: exports.odTurret, size: 11});
            
            exports.drivehunt = makeAuto({
              PARENT: [exports.genericTank],
            LABEL: 'Overhunt',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     18,    1.2,     8,      0,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pound, g.lessreload]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Drive-Hunt',{type: exports.odTurret, size: 11});
            
            exports.autodrive = makeAuto(exports.overdrive, "AutoDrive");

exports.cheif = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hard-Drive',
                DANGER: 9,
                INVISIBLE: [0.05, 0.08],
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 1.0,
                    FOV: base.FOV * 1.3,
                },
                MAX_CHILDREN: 4,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Cheif', {type: exports.generalt, size: 11});
           
            exports.colonel = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            }, 'Colonel', {type: exports.generalt, size: 11});

             exports.deployist = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2, 
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            },'Deployist',{type: exports.generalt, size: 11});
          
            exports.navyist = makeAuto({
              PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 1,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 1,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.fastdrone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 1,   
                        }, }, 
                    ]
            }, 'Navyist',{type: exports.generalt, size: 11});
            
            exports.corp = makeAuto({
              PARENT: [exports.genericTank],
            LABEL: 'Overhunt',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 5,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     18,    1.2,     8,      0,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.pound, g.lessreload]),
                        TYPE: exports.fastdrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Corporal',{type: exports.generalt, size: 11});
            
            exports.trooper = makeAuto(exports.general, "Trooper");

            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
 
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Auto-seer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
 exports.heavycruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Mega Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    9.5,    0.6,     7,      4,      -40,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    9.5,    0.6,     7,     -4,      40,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.pound]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
exports.sounder = {
            PARENT: [exports.genericTank],
            LABEL: 'Sounder',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   12,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.sniper]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   12,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.sniper]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
exports.sailor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sailor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.gunnshi = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner ship',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
               POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                }, },
            ],
        };
exports.sailor2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pirate',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.sailor4 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Spead Ship',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
               POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
exports.sailorxl = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Warrior',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                     POSITION: [7,    7.5,    0.6,     5.5,      4,      45,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                },
            ],
        };
exports.sailortrap = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sailor Trapper',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  13,     4,      1,      0,      -4,      0,     0,   ],
                    }, {
                POSITION: [   2.5,     4,     1.7,    13,      -4,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
            POSITION: [  13,     4,      1,      0,      4,      0,     0,   ],
                    }, {
                POSITION: [   2.5,     4,     1.7,    13,      4,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.sailorpunt = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner Sailor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
             POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.halfrecoil]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                },
            ],
        };


            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };

 exports.invader = {
                PARENT: [exports.genericTank],
                LABEL: 'Invader',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    8.5,    0.6,     7,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',               
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,     -90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   8,    8.5,    0.6,     7,      0,      0,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous' ,              
                        }, },
                ],
            };

            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "autocrusier");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
   exports.fortress2 = {
                PARENT: [exports.genericTank],
                LABEL: 'WarShip', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                      POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  18,     8,      1,      0,      0,      120,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                          POSITION: [  18,     8,      1,      0,      0,      240,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.morereload, g.morereload]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };



        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  4.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   1,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  3.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
exports.owl = {
    PARENT: [exports.genericTank],
    LABEL: 'Owl',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.85,
        FOV: base.FOV * 1.35,
    },
    INVISIBLE: [0.08, 0.03],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
            TYPE: exports.bullet,
            LABEL: 'Assassin',
            ALT_FIRE: true,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 150, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
            ALT_FIRE: false,
        },
    }, {
        POSITION: [16, 8, 1, 0, 0, 210, 0.1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
            ALT_FIRE: false,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
            ALT_FIRE: false,
        },
    }, ],
};   
            exports.autolil = makeAuto(exports.lilfact , "Auto-Spawner")
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                MAX_CHILDREN: 10,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ], 
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, }, {                        
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ], 
                    }
                ],
            };
    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.reloadmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Chain Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morereload, g.bitmorespeed]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    
    exports.automachine = makeAuto(exports.machine , "Auto-Machine Gun")

exports.heavymachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Heavy-Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     12,     1.7,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.heavymachine]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.heavymachine3 = {
        PARENT: [exports.genericTank],
        LABEL: '',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     12,     1.7,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.heavymachine, g.morereload, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.heavymachine2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Mega-Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10,     13,     2,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy, g.heavymachine]),
                TYPE: exports.bullet,
            }, },
        ],
    };
 
exports.flankpound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Flank Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankpound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,    12,      1,      0,      0,      180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flankpound]),
                TYPE: exports.bullet,
            }, },
        ],
    };

            exports.autoflankp = makeAuto(exports.flankpound, "Auto-Flank Pounder")
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.miniflank = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun Defender',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      180,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      180,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      180,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

            exports.automini = makeAuto(exports.mini , "Auto-Minigun")
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Streamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream,  g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.streamx = {
                PARENT: [exports.genericTank],
                LABEL: 'Smotherer',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                  POSITION: [  29,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                  POSITION: [  27,     8,      1,      0,      0,      0,      0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  25,     8,      1,      0,      0,      0,      0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream,  g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     1, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     1.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
           exports.pump = {
                PARENT: [exports.genericTank],
                LABEL: 'Pumper',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                  POSITION: [  29,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                  POSITION: [  27,     8,      1,      0,      0,      0,      0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  25,     8,      1,      0,      0,      0,      0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream,  g.lessdamage, g.lessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     1, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     1.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,     8,      1,      0,      0,      0,     1.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  13,     8,      1,      0,      0,      0,     1.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.bitlessdamage]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "Crop Duster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.multer = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.stronger]),
                TYPE: exports.bullet,
            }, },
        ],
    };
  exports.multer3 = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Silencer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.stronger]),
                TYPE: exports.bullet,
            }, }, {
             POSITION: [  3,    15.5,      1,      12,      0,      0,      0,   ], 
            }, {
             POSITION: [  3,    15.5,      1,      19,      0,      0,      0,   ], 

            }, 
        ],
    };
  exports.multer2 = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Heavy Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    14,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
 exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.flankmulter = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Flank Multer',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  25,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
                 POSITION: [  25,    12,      1,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper, g.lessreload, g.lessreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
   exports.titan = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Titan',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                           POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };

        exports.autopound = makeAuto(exports.pound, "Auto-Pounder")
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.manowar = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Man of War',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,    14,      1,      0,      0,      90,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                   POSITION: [  19,    14,      1,      0,      0,      -90,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                      }, }, {   
                POSITION: [  17,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  17,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                }, },
            ],
        };
 exports.greifer = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            INVISIBLE: [0.3, 0.01],
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Greifer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,    -1.25,    0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.greifer2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            INVISIBLE: [0.5, 0.01],
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Abliterator',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [ 20.5,  19.5,     -2,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
            exports.autodestroy = makeAuto(exports.destroy , "Auto-Destroyer")
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
            exports.portal = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'POrtal',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni,]),
                        TYPE: exports.telebullet,
                        
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Hive shooter',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
exports.payao = {
        PARENT: [exports.genericTank],
        LABEL: '',
        SIZE: 24,
        SHAPE: 4,
        VARIES_IN_SIZE: true,
    },
exports.opdestroy = {
            PARENT: [exports.payao],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'OPDestroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  0,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  0,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.weak, g.weak]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true,
                            LABEL: gunCalcNames.thruster,
                }, },
            ],
        };

exports.weakpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense, g.bitlessspeed]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.minipillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -3,
     CONTROLLERS: [ 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [ 10,     0,      0,      0,     360,  1],
            TYPE: exports.weakpillboxTurret,
        }
    ]
};

exports.arsenalmach = {
        PARENT: [exports.genericTank],
        LABEL: 'Armory',  
        BODY: {
          FOV: base.FOV * 1.15,
          SPEED: base.SPEED  * 0.9,
          ACCELERATON: base.ACCELERATION * 0.8
        },
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     10,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [  5,     13,      1,      5,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     10,     1.5,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.stronger, g.slow, g.threequartersrof, g.slow, g.mach, g.bitmorespray]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    }
exports.trapper2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Arsenal',  
        BODY: {
          FOV: base.FOV * 1.15,
          SPEED: base.SPEED  * 0.9,
          ACCELERATON: base.ACCELERATION * 0.8
        },
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     10,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [  5,     13,      1,      5,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     10,     1.5,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.stronger, g.slow, g.threequartersrof, g.slow]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    }
exports.megatrapper2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Holder',
        STAT_NAMES: statnames.trap,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     13,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [  5,     16,      1,      5,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     13,     1.5,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.stronger, g.slow, g.threequartersrof, g.pound, g.bigger, g.stronger, g.slow]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    }
exports.triarsenal = {
        PARENT: [exports.genericTank],
        LABEL: 'Castle',
        STAT_NAMES: statnames.trap,
      BODY: {
         FOV: base.FOV * 1.15,
        SPEED: base.SPEED * 0.7,
        ACCELERATON: base.ACCELERATION * 0.5,
      },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     10,      1,      0,      0,      0,      0,   ],
                }, {
            POSITION: [  5,     13,      1,      5,      0,      0,      0,   ],
                }, {
            POSITION: [   3,     10,     1.5,    15,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap,g.slow, g.threequartersrof, g.slow]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
               POSITION: [  15,     10,      1,      0,      0,      120,      0,   ],
                }, {
            POSITION: [  5,     13,      1,      5,      0,      120,      0,   ],
                }, {
            POSITION: [   3,     10,     1.5,    15,      0,      120,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap,g.slow, g.threequartersrof, g.slow]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
               POSITION: [  15,     10,      1,      0,      0,      240,      0,   ],
                }, {
            POSITION: [  5,     13,      1,      5,      0,      240,      0,   ],
                }, {
            POSITION: [   3,     10,     1.5,    15,      0,      240,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap,g.slow, g.threequartersrof, g.slow]),
                TYPE: exports.minipillbox, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
        ],
    }


exports.multitool = {
    PARENT: [exports.genericTank],
    LABEL: 'Multitool',
    DANGER: 8,
    BODY: {
      SPEED: base.SPEED * 0.85,
      FOV: 1.15,
      ACCELERATION: base.ACCELERATION * 0.8,
      },
    STAT_NAMES: statnames.generic,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.bitweak, g.bitlessreload, g.halfrecoil, g.twin]),
            TYPE: exports.bullet,
                             // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def
            MAX_CHILDREN: 0,            // def
            ALT_FIRE: false,            // def
            NEGATIVE_RECOIL: false,     // def
        }, }, {
         
      POSITION: [  12,     6,   -1.6,  0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.bitweak, g.halfrecoil, g.flank, g.twin]),
            TYPE: exports.swarm,
                              // def
            STAT_CALCULATOR: gunCalcNames.swarm,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def
            ALT_FIRE: false,            // def
            NEGATIVE_RECOIL: false,     // def
        }, }, {
         
        POSITION: [   6,     12,    1.2,     7,      0,      180,      0,   ],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta, g.lessreload, g.twin]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            MAX_CHILDREN: 3,
                }, }, {
     POSITION: [   6,     12,    1.2,     7,      0,      0,      0,   ],
          PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.sunchip, g.twin]),
            TYPE: exports.sunchip,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            MAX_CHILDREN: 6,
                }, }, {
                  POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ],
                        }, {
                    POSITION: [  17,    13,      1,      0,      0,      0,      0,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim, g.bitweak, g.twin, g.flank, g.bitlessreload, g.twin]),
                            TYPE: exports.lilmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, }, {
        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                }, {
        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ],
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.trap, g.bitweak, g.slow, g.flank, g.twin]),
              TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, }, {
              POSITION: [  4.5,    8,      1,     10.5,    0,      0,      0,   ],
                }, {
              POSITION: [   1,     10,      1,      15,     0,      0,      0,   ],
                PROPERTIES: {
                    MAX_CHILDREN: 1,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory, g.bitlessreload, g.bitweak, g.flank]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                }, }, {
                POSITION: [  3.5,    7,      1,      8,      0,      0,      0,   ], //Factory
                }, {
                POSITION: [  18,    7,      1,      0,      0,      180,      0,   ],
                }, {
                POSITION: [   2,    7,     1.1,     18,     0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.quadtrap, g.bitweak, g.bitlessreload, g.bitweak, g.twin]),
                        TYPE: exports.block,  
                        STAT_CALCULATOR: gunCalcNames.trap
                    }, }, {
                      POSITION: [  18,    7,      1,      0,      0,      0,      0,   ],
                }, {
                      POSITION: [   2,    7,     1.1,     18,     0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.twin, g.slow, g.lessreload, g.twin]),
                        TYPE: exports.minipillbox,
                      STAT_CALCULATOR: gunCalcNames.trap
                    }, }, {
                POSITION: [   4,    9,      1,      14,     0,      180,      0,   ], //Boomer
                        }, {
                POSITION: [   5,    9,    -1.5,      6,     0,      180,      0,   ], //Boomer
                        }, {
             //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                POSITION: [   2,    7,     1.3,     16,     0,      180,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.flank, g.flank, g.halfreload, g.bitweak, g.twin]),
                            TYPE: exports.boomerang,
                          STAT_CALCULATOR: gunCalcNames.trap
                        }, },
       
    ],
  TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     10,      0,      0,      140, 0],
                        TYPE: exports.bansheegun,
                            },
                ],
};
 exports.ayao = makeHybrid(exports.opdestroy, 'Ayao');

            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
            exports.megahybrid = makeHybrid(exports.anni, 'Mega Hybrid');

            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Heavy Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };
exports.burstshot = {
            PARENT: [exports.genericTank],
            LABEL: 'Swoosher',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  23,     4,      1,      0,     2,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  23,     4,      1,      0,    -2,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                        }, }, {
               POSITION: [  2,      3,     1,     11,     -3,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     6,      1,      0,     3,     0,      0.15,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  19,     6,      1,      0,    -3,     0,      0.15,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
                    }, },
            ],
        };
exports.shotgun3 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'OP Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
                GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                    POSITION: [  4,      3,      1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  4,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  1,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      3,      1,     13,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,      2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  1,      2,      1,     13,     -2,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach,  g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [ 15,     14,      1,     6,       0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.fake, g.shotgun3]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  8,     14,    -1.3,    4,       0,      0,      0,   ], }
                ],
            };
        exports.waller2 =  {
                    PARENT: [exports.genericTank],
                    LABEL: 'Waller',
                    COLOR: 11,
                    SIZE: 5, 
                    SHAPE: 113,
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,               
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  11,     7,      1,      0,      0,      180,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    11,      0,      180,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.doublereload, g.auto]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                                                      }, },
                ],
            };
        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Trapper',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
exports.trappermach = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Planter',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1.3,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    14,     1.4,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.blockmach, g.mach, g.morespray, g.lessreload, g.bitlessreload]),
                        TYPE: exports.blockmach,
                    }, },
            ],
        };
 exports.waller = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'wall placer',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block, g.morespeed]),
                        TYPE: exports.block,
                    }, },
            ],
        };

        exports.gladiator = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gladiator',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                      }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };

exports.gatling = {
        PARENT: [exports.genericTank],
        LABEL: 'Gatling Gun', 
        BODY: {    
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.caliber = {
        PARENT: [exports.genericTank],
        LABEL: 'Caliber', 
        BODY: {    
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    16,     11,     1.5,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling, g.morereload, g.bitmorereload, g.bitmorespeed]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.halfnhalf = makeHybrid(exports.gatling,'Gatling-Hybrid')
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,  
                            DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
 exports.missilet = {
                PARENT: [exports.genericTank],
                LABEL: 'Rocket',
            
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     140,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     8,      1,      0,      0,     220,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.muchmorerecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                    POSITION: [  10,    14,     1,     8,      0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.thruster]),
                        TYPE: exports.bullet,
                      LABEL: 'Pounder Thruster',
                    }, },
                ],
            };


            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };

         exports.alphacon = {
                PARENT: [exports.genericTank],
                LABEL: 'Alpha Trapper',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.50,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    20,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct, g.anni, g.lessreload, g.lessreload]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };

            exports.protector = makeHybrid(exports.builder, 'Protector');
            exports.autobuilder = makeAuto(exports.builder);
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.bentboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Bent Boomer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   8,    10,      1,      8,     -2,     -35,     0,   ],
                        }, {
                    POSITION: [   8,    10,      1,      8,      2,      35,     0,   ],
                        }, {
                    POSITION: [   2,    10,     1.3,     16,    -2,     -35,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   2,    10,     1.3,     16,     2,      35,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.fast, g.twin]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
exports.heavyboomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Heavy Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [   5,    21,      1,       1.5,     0,      0,      0,   ],
                        }, {
                    POSITION: [   5,    14,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    14,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    14,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.pound, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
    exports.boomer3 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Tri Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   5,    10,      1,      14,     0,      120,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      120,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      120,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      120,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, }, {
                    POSITION: [   5,    10,      1,      14,     0,      240,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      240,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      240,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      240,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang, g.lessreload, g.lessreload]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'SteamPunk',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };
 exports.artillery = {  
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [17, 3, 1, 0, -6, -7, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        }, }, {
        POSITION: [17, 3, 1, 0, 6, 7, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
            TYPE: exports.bullet,
            LABEL: 'Secondary',
        },}, {
        POSITION: [19, 12, 1, 0, 0, 0, 0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.heavyart = {  
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Heavy Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     5,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, /*g.bitlessreload, g.moredamage*/]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     5,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, /*g.bitlessreload, g.moredamage*/]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
 exports.fieldgun = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Field Gun',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  9,     3,      1,      0,     -9,     -9,     0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  9,     3,      1,      0,      9,      9,     0.9,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,     -8,     -5,     0.45,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      5,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                       }, }, {
                  POSITION: [    10,     10,     1.1,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.hexapound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
 exports.spreadgun = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Wide Shot',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  9,     3,      1,      0,     -9,     -9,     0.75,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  9,     3,      1,      0,      9,      9,     0.9,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,     -8,     -5,     0.45,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      5,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                       }, }, {
                  POSITION: [  19,     3,      1,      0,     -4,     0,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     3,      1,      0,      4,      0,     0.15,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                          }, }, {
                    POSITION: [  21,     3,      1,      0,      0,      0,     0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Main Cannon',
                    }, },
            ],
        };
exports.artillerymg = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Infantry',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                  POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                    }, },
            ],
        };
  exports.artcrusier = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Marauder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      4,      180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, },
            ],
        };
            exports.militia= makeHybrid(exports.artillery, "Militia")
            exports.AutoArt = makeAuto(exports.artillery, "Auto-Artillery")
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
               ],
            };
 exports.siege = {
                PARENT: [exports.genericTank],
                LABEL: 'Siege',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                  POSITION: [  17,     3,      1,      0,     -7,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      7,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                        }, }, {
                     POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.arty]),
                    TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
           exports.spreadling = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadling',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };
 exports.spreadlet = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadlet',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 17.5,    6,      1,      0,    -2.4,    -30,    2/3,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spreadmain, g.moredamage]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     6,      1,      0,    -3.0,    -15,    1/3,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spreadmain, g.moredamage]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    6,      1,      0,     2.4,     30,    2/3,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spreadmain, g.moredamage]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     6,      1,      0,     3.0,     15,    1/3,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spreadmain, g.moredamage]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };
 
            exports.spread = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1.3,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

//arras.io flank guard

/*exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            /*POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };*/

//diep.io flank gaurd

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Hexa Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.heptatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Hepta-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })(),
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Hexa-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     60,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     60,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     300,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     300,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
              }, 'Hexa-Trapper');
        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
             ],
         };
exports.caltrop = makeCaltrop(exports.basic, 'Caltrop Basic')
exports.caltropMini = makeCaltrop(exports.mini, 'Caltrop MiniGun')
exports.caltropPound = makeCaltrop(exports.pound, 'Caltrop Pounder')
exports.caltropBent = makeCaltrop(exports.bent, 'Bent Caltrop')
exports.caltropSwarm = makeCaltrop(exports.cruiser, 'Swarm Caltrop')
exports.caltropBoomer = makeCaltrop(exports.boomer, 'Caltrop Boomer')
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.5,
                    SHIELD: base.SHIELD * 0.6,
                    DENSITY: base.DENSITY * 0.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     135,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     225,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.surfer = {
                PARENT: [exports.genericTank],
                LABEL: 'surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

exports.gmissile = {
    PARENT: [exports.genericTank],
    LABEL: 'Missile',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [16, 3.5, 1, 0, 3.75, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [16, 3.5, 1, 0, -3.75, 0, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [7.5, 9.5, 0.6, 7, 0, 180, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,
        },
    }, ],
        TURRETS: [{
        POSITION: [11, 0, 0, 0, 360, 1, ],
        TYPE: [exports.auto3gun, {
            INDEPENDENT: true,
        }]
    }, ],
};

            exports.autotri = makeAuto(exports.tri),   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            },   
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ],
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };

        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };

    exports.tripound = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Pounder',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  20,    12,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  20,    12,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
          
            exports.tritrap = {
                LABEL: 'Auto TriTrapper',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                PARENT: [exports.genericTank],
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.tritrapgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.tritrapgun,
                            },
                ],
            };
            exports.sniper3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Sniper-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.sniper3gun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.sniper3gun,
                            },
                ],
            };
 exports.railgun3 = { 
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'RailGun-3',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.25,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     8,      0,      0,     170, 0], 
                        TYPE: exports.autorailgun,
                            }, {
                    POSITION: [  13,     8,      0,     120,    170, 0], 
                        TYPE: exports.autorailgun,
                            }, {
                    POSITION: [  13,     8,      0,     240,    170, 0], 
                        TYPE: exports.autorailgun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };

  exports.shield = {
            PARENT: [exports.genericTank],
            LABEL: 'Trapper',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
  exports.shieldmach = {
            PARENT: [exports.genericTank],
            LABEL: 'Machine Trapper',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1.3,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     10,     2,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.bitmorespray]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
  exports.shieldmach2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Blazer',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1.3,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     10,     2,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.mach, g.morespray, g.morereload]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

exports.shield3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Burst Trap',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                           }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

 exports.tritrapper2 = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri Trapper',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                  }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      120,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
               POSITION: [  13,     8,      1,      0,      0,      240,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap
                    }, },
            ],
        };

        exports.huntertrap = {
            PARENT: [exports.genericTank],
            LABEL: 'MarksMan',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, }, { 
               POSITION: [  13,     9,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     9,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

exports.rifletrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Slayer',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                     }, }, {
                 POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };


            exports.autoflankt = makeAuto(exports.flanktrap, "auto-TrapGuard"),
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

 exports.hurricane = {
                PARENT: [exports.genericTank],
                LABEL: 'Hurricane',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,    3.5,     1,      0,        0,    0,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   30,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   60,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,   90,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  120,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  150,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  180,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  210,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  240,     0, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  270,   0.5, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  300,  0.25, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  15,    3.5,     1,      0,        0,  330,  0.75, ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast, g.stronger]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

            exports.hybridgunn = makeHybrid(exports.gunner, 'Attacker');

            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Snipe Guard',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,    8.5,     1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

   exports.twintrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Twin Trap Guard',
                STAT_NAMES: statnames.generic,
                DANGER: 6,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,     5.5,    190,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,     5.5,    190,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     8,      1,      0,    -5.5,    170,    0.5,  ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,    -5.5,    170,    0.5,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.twin]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

            exports.stalker = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                INVISIBLE: [0.08, 0.03],
                LABEL: 'Stalker',
                BODY: {
                    //ACCELERATION: base.ACCELERATION * 0.55,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.35,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     -2,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.blaster = {
        PARENT: [exports.genericTank],
        LABEL: 'Blaster',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.blastertwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Flamer',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.6,     12,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    9,     10,     1.6,     7,      0,      0,      1,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.Deleter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Deleter',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.80,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,    12,     -0.5,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   8,    12,    -1.3,    5,      0,      0,      0,   ],
                },
            ],
        };

exports.hotshot = {
            PARENT: [exports.genericTank],
            LABEL:'Eliminator',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     12,      1,      0,      0,      0,      0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     12,      1,      0,      0,      0,    0.333, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  16,     12,      1,      0,      0,      0,    0.667, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.pound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.Splasher = {
                PARENT: [exports.genericTank],
                LABEL: 'Splasher',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     9,      1.6,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  11,    12,     1.4,     8,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morespeed, g.threequartersrof]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };

       exports.poundangle = {
            PARENT: [exports.genericTank],
            LABEL: 'Slammer',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     12,      1,      0,      0,      0,      .6,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {
                POSITION: [  16,     12,      1,      0,      -2,     150,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  16,     12,      1,      0,      2,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.pound]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };

    exports.twinmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    13,     6.25,   1.4,     6,     5.6,     2,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    13,     6.25,   1.4,     6,    -5.6,    358,     0.4,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.bulletaccel = {
    PARENT: [exports.bullet],
    CONTROLLERS: ['alwaysFire'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,     0.0001,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.doublereload, g.tonsmorrecoil, g.weak]),
            TYPE: exports.bullet,
            AUTOFIRE: true,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def
            MAX_CHILDREN: 0,            // def
            ALT_FIRE: false,            // def
            NEGATIVE_RECOIL: false,     // def
        }, },
    ],
};

exports.gatlingaccel = {
        PARENT: [exports.genericTank],
        LABEL: 'Accelerator',
        BODY: {    
            FOV: 1.3,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    17,     9,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain, g.halfspeed, g.lessreload]),
                TYPE: exports.bulletaccel,
            }, },
        ],
    };

    exports.bentmachine = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Blaster',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10.5,   10,     1.4,     7,      2,     18,     0.4,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lessreload]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    10.5,   10,     1.4,     7,     -2,    -18,     0.4,  ],    
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lessreload]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [    12.5,   10,     1.4,     8,      0,     0,       0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lessreload]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.mach3gun = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun-3',
    BODY: {
        FOV: 5,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,     1.4,     0,      2.2,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.auto]),
                TYPE: exports.bullet,
                  }, }
        ],
    };
exports.mach3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Machine Gun-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  13,     8,      0,      0,     190, 0], 
                    TYPE: exports.mach3gun,
                        }, {
                POSITION: [  13,     8,      0,     120,    190, 0], 
                    TYPE: exports.mach3gun,
                        }, {
                POSITION: [  13,     8,      0,     240,    190, 0], 
                    TYPE: exports.mach3gun,
                        },
              ],
  };

 exports.hunter3 = {
            PARENT: [exports.genericTank],
            LABEL: 'Carnivore',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  26,     7,      1,      4,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  23,    11,      1,      4,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    10.5,    -1.6,    6,      0,      0,      0,   ], 
                    }, 
            ],
        };

   exports.hexapound = {
            PARENT: [exports.genericTank],
            LABEL: 'Death Star',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     10,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,      60,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     10,     1,      0,      0,     300,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.hexapound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };

exports.assapellet = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Buttbuttin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
              TYPE: exports.bullet, 
                   }, }, {
                  POSITION: [  13,    10.5,    1,      0,      0,      0,      0,   ],
                }, {
           POSITION: [      18,    4,       1,       0,    4.0,    180,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                   }, }, { 
            POSITION: [     18,    4,       1,       0,    -4.0,   180,   0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
              POSITION: [   12,   15,       1,       0,      0,     180,   0,   ],
                   }, 
            ],
        };

            exports.spreadsnipe = {
                PARENT: [exports.genericTank],
                LABEL: 'Dispencer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,     -3,     -9,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  15,     4,      1,      0,    -2.5,    -6,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     -2,     -3,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    4,       1,      0,      3,      9,      0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  15,    4,       1,      0,     2.5,     6,      0,    ], 
                        PROPERTIES: {  
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, { 
                    POSITION: [  16,    4,       1,      0,     2,      3,       0,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spread, g.sniper, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, { 
                    POSITION: [  25.5,     7,      1,      0,      0,     0,      0,   ], 
            PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.spread, g.lessreload]),
              TYPE: exports.bullet, 
                   }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                        }, 
                ],
            };

    exports.director2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Apprentice',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 10,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,     15,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.moredamage]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };

exports.Amissile = {
    PARENT: [exports.swarm],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 150,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  5,    10,     1.4,     8,      0,     180,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.thruster]),
                TYPE: [exports.bullet,]
                    }, },
          ],
};

    exports.machineflank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      180,     0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };

    exports.machinetri = {
        PARENT: [exports.genericTank],
        LABEL: 'Tri Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    12,     10,     1.4,     8,      0,      240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
      exports.basic3 = {
        PARENT: [exports.genericTank],
        LABEL: 'Heat Seeker',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [   7,    12.5,    0.6,     14,      0,      0,     0.5,  ], 
                  }, {
               POSITION: [14.5,  8,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.mach]),
                TYPE: exports.Amissile,
               }, }, {
                POSITION: [15,   16,     1,       0,       0,      0,      0,   ],
              }, 
        ],
    };

 exports.basic4 = {
        PARENT: [exports.genericTank],
        LABEL: 'Mini Heat Seeker',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
          POSITION: [14.5,  8,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessreload]),
                TYPE: exports.Amissile,
               }, }, {
           POSITION: [   7,    12.5,    0.6,     14,      0,      0,     0,],
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessreload, g.fake]),
                TYPE: exports.Amissile,
                   },
              }, 
        ],
    };

exports.fightermissile = {
     PARENT: [exports.bullet],
    LABEL: 'FighterBullet',
    INDEPENDENT: true,
  BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,     5,      1,      0,      0,    150,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [15,   5,      1,      0,      0,    -150,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, {
           POSITION: [  15,   5,     1,      0,      0,      90,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  15,  5,     1,      0,      0,     -90 ,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.thruster, g.morespeed, g.morereload]),
                TYPE: exports.bullet,
            }, }, 
    ],
};
         exports.fightershot = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Fighter Shot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     11,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.fightermissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };


exports.seek = {
	PARENT: [exports.genericTank],
	LABEL: 'Seeker',
	DANGER: 7,
	GUNS: [{
		POSITION: [19, 8, 1, 0, -2, -20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [19, 8, 1, 0, 2, 20, 0.5],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [24, 8.5, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
			TYPE: exports.bullet
		}
	}]
};

  exports.rocketeer = {
    PARENT: [exports.genericTank],
    LABEL: 'Rocketeer',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.rocketr]),
            TYPE: exports.rocket,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.5, 0, 0, 0, 0]
    }]
};

 exports.automgflank = makeAuto(exports.machineflank , "Auto-Flank Machine Gun ")

 exports.autobulletturret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.autobullet = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1],
            TYPE: exports.autobulletturret,
        }
    ]
};
exports.gbasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Auto Shot',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.autobullet,
        }, },
    ],
};
           exports.landmine = {
                PARENT: [exports.genericTank],
                LABEL: 'Landmine',
                DANGER: 7,
                INVISIBLE: [0.06, 0.01],
                BODY: {
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      0,     360,  0,],
                    TYPE: exports.smasherBody,
                }, { /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  21.5,   0,      0,      90,     360,  0,],
                    TYPE: exports.smasherBody,
                }],
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
            };

exports.pelletor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.hewnpelletor = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Hewn Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.webber2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Webber',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.gsplit = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Split',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     2,     10,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     10,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      10,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     -10,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -2,     -10,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      -10,      0,   ],
               }, {
            POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [ 18,     5,      1,      0,     0,      0,      0,],
              PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.lessreload, g.lessreload]),
              TYPE: exports.bullet,
              }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.doublehewn = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Double Hewn',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -20,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
            }, }, {
               POSITION: [  13,     2.5,      1,      0,     3.5,     200,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  13,     2.5,      1,      0,    -3.5,     -200,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      180,      0,   ],
                }, 
            ],
        };
exports.heptashot = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Hepta Shot',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  13,     4,      1,      0,     -3,    -30,    1.001, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  13,     4,      1,      0,      3,     30,    1.001, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
               POSITION: [  16,     4,      1,      0,     -3,    -20,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     4,      1,      0,      3,     20,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     -2,    -10,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     4,      1,      0,      2,     10,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     4,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                }, },
            ],
        };
exports.puntgun = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Punt Gun',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil,g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                }, 
            ],
        };
exports.puntgun2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Raider',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
             POSITION: [   7,    7.5,    0.6,     7,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
            POSITION: [   7,    7.5,    0.6,     7,      0,      -90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                }, },
            ],
        };
exports.puntgunlong = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sword',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  24,     5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  22,     5,      1,      0,    0,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  20,     5,      1,      0,     0,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     5,      1,      0,    0,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     5,      1,      0,     0,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     5,      1,      0,    0,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
              POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.autopuntgun = makeAuto(exports.puntgun,"Auto-Punt Gun")
exports.puntgunnner = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Punt Gunnner',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  20,     2.5,      1,      0,     3,     0,      1.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,    -3,     0,     3,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
                }, 
            ],
        };
exports.puntgunmini = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triplet Mini Gun',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,     0,     0,      0.9,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic,  g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,     0,     0,      1.5,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  16,     2.5,      1,      0,     0,     0,      3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen,g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      4.5,   ],
                }, 
            ],
        };

exports.bore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Borer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        }; 
exports.bore2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Sharp Shot',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     7.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -7.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  25,    6.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                }, },
            ],
        }; 

exports.hybore = makeHybrid(exports.bore,"Commando")
exports.commando = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Pearcer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
              POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.mbore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Scorpian',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  23,     3.5,      1,      0,     3.2,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.moredamage, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     3.5,      1,      0,    -3.2,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.moredamage, g.lessreload]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };
exports.gunbore = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Gunner Borer',
         BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     2.5,      1,      0,     4,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  20,     2.5,      1,      0,    -4,     0,     0.5,  ], 
            PROPERTIES: {
              SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
             POSITION: [  23,     2.5,      1,      0,     2,     0,      1,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  23,     2.5,      1,      0,    -2,     0,     0.25,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.lessreload]),
              TYPE: exports.bullet,
            }, }, { 
              POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
                }, 
            ],
        };

exports.pellettriptwin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triptwin Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     120,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      120,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     240,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      240,      0,   ],
                }, 
            ],
        };
exports.pellettriptwin2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Triptwin Pound Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     120,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     120,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      120,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     240,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     240,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      240,      0,   ],
                }, 
            ],
        };
exports.pellettriptwin3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Bird',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     3.5,      1,      0,     3,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      180,      0,   ],
                }, 
            ],
        };
exports.warlord = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'War Lord',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [   7,    7.5,    0.6,     7,      0,      90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     0,      -90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                }, },
            ],
        };
exports.pellettriptwin4 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Guard',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  13,     10,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     10,     1.7,    0,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                }, },
            ],
        };
exports.pelletquintuplet = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Quintuplet Pelletor',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     72,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     72,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      72,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     144,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     144,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      144,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     216,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     216,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      216,      0,   ],
            }, {
            POSITION: [  17,     2.5,      1,      0,     3,     288,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     288,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      288,      0,   ],
                }, 
            ],
        };

exports.grenade = {
    PARENT: [exports.bullet],
    LABEL: 'Grenade',
    INDEPENDENT: true,
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  15,     7,      1,      0,      0,     0,       0.5,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower, g.hexatrap, g.halfspeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
            }, }, {
        POSITION: [  15,     7,      1,      0,      0,     180,     0.5,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.lowpower, g.hexatrap, g.halfspeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],  
                   }, },
    ],
};

exports.skimmer2 = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Hammer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.grenade,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
exports.skimmer3 = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Glider',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    11,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.arty, g.arty, g.skim, g.morespeed]),
                            TYPE: exports.grenade,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

exports.gautobulletturret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heatseek, g.thruster, g.weak, g.weak, g.weak, g.morespeed]),
                TYPE: exports.bullet,
              LABEL: gunCalcNames.thruster,
            }, },
    ],
};
exports.gautobullet = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1],
            TYPE: exports.gautobulletturret,
        }
    ]
};
exports.abasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Guided Missle',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        }, 
    ],
};
exports.gautobulletturret2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: false,
    MOTION_TYPE: 'shrink',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      180,      10,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.heatseek, g.thruster, g.morespeed, g.halfreload, g.morerecoil]),
                TYPE: exports.bullet,
                AUTOFIRE: true,
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
exports.gautobullet2 = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1],
            TYPE: exports.gautobulletturret2,
        }
    ]
};
exports.abasic2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Guided Lazer',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet2,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        }, 
    ],
};
exports.bb_str = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 1,
};
exports.bb_gus = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: -2,
};
exports.bb_cir = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
};
exports.bb_lin = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: -1,
};
exports.bb_tri = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 3,
};
exports.bb_el_tri = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 30,
    LABEL: '',
    SHAPE: 3,
};
exports.bb_el_sp2 = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 30,
    LABEL: '',
    SHAPE: 5,
};
exports.bb_he_sq = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 26,
    LABEL: '',
    SHAPE: 4,
};
exports.bb_squ = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4,
};
exports.bb_cir = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
};
exports.bb_fr_squ = {
    PARENT: [exports.genericTank],
    CONTROLLERS: ['dontTurn'], 
    COLOR: 29,
    LABEL: '',
    SHAPE: 4,
};
exports.bb_pen = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 5,
};
exports.bb_hex = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 6,
};
exports.bb_hep = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 7,
};
exports.bb_oct = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 8,
};
exports.mod_fire = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  25,     32.5,      0,     0,    0,  1], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  12.5,     23,      -12,     0,    0,  0], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  10,     50,      -6.5,     0,    0,  0], //
            TYPE: exports.bb_fr_squ,
        },
    ],
};
exports.mod_fire2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  50,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_fr_squ,
        },
    ],
};
exports.mod_shock = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_el_tri,
        }, { 
        POSITION: [  25,     32.5,      0,     0,    0,  1], //
            TYPE: exports.bb_el_tri,
        },
    ],
};
exports.mod_health = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  30,     10,      0,     0,    0,  1], //
            TYPE: exports.bb_he_sq,
        }, {
        POSITION: [  30,     -10,      0,     0,    0,  1], //
            TYPE: exports.bb_he_sq,
            }, {
        POSITION: [  30,     0,      10,     0,    0,  1], //
            TYPE: exports.bb_he_sq,
                }, { 
        POSITION: [  30,     0,      -10,     0,    0,  1], //
            TYPE: exports.bb_he_sq,
                   }, { 
        POSITION: [  30,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_he_sq,
        },
    ],
};
exports.mod_missile = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_squ,
        }, { 
        POSITION: [  25,     32.5,      0,     0,    0,  1], //
            TYPE: exports.bb_tri,
        },
    ],
};
exports.splash = { 
     PARENT: [exports.bullet],
    LABEL: '',
  BODY: {
        RANGE: 90,
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     5,      1,      0,      0,    0,      0,   ],  
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.nospeed, g.oneshot]),
                ALT_FIRE: true, 
                TYPE: exports.exploder,
            }, }, 
    ],
};
exports.c4 = { 
    PARENT: [exports.block],
    LABEL: 'C4',
    SHAPE: -8,
    STAT_NAMES: statnames.trap,
    MAX_CHILDREN: 1,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     5,      1,      0,      0,    0,      0,   ],  
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.c4, g.nospeed]),
                ALT_FIRE: true, 
                TYPE: exports.exploder,
                LABEL: 'C4 Explosion',
            }, }, 
    ],
};

exports.missler = {
    PARENT: [exports.genericTank],
    LABEL: 'Missle',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessdamage, g.lessdamage, g.lessdamage, g.morespeed, g.morespeed, g.morespeed, g.morespeed]),
            TYPE: exports.splash,
          }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        },
    ],
};

exports.c4placer = {
    PARENT: [exports.genericTank],
    LABEL: 'C4 Maker',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessdamage, g.lessdamage, g.morespeed]),
            TYPE: exports.c4,
            MAX_CHILDREN: 8,
          }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        },
    ],
};

exports.quadabasic = {
    PARENT: [exports.genericTank],
    LABEL: 'Quaded Missle',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
                              }, {
                POSITION: [  17,     10,      1,      0,      0,      90,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      90,      0,   ], 
                              }, {
                                POSITION: [  17,     10,      1,      0,      0,      180,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      180,      180,   ], 
                              }, {
                                POSITION: [  17,     10,      1,      0,      0,      270,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.gautobullet,
                              }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      270,      0,   ], 
        }, 
    ],
};

exports.harrower = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.15,
    },
    LABEL: 'Harrower',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    12,    -0.5,     9,      0,      0,      0,  ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  13,    12,      1,      0,      0,      0,      0,  ],
            },
    ],
};

  exports.divergent = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Divergent',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [      18,    4,       1,       0,    4.0,    180,    0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                   }, }, { 
            POSITION: [     18,    4,       1,       0,    -4.0,   180,   0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
              POSITION: [   12,   15,       1,       0,      0,     180,   0,   ],
            }, 
        ],
    };
exports.sniperminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.6,
        SPEED: 2.75,
        ACCELERATION: 0.25,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  23,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.snipefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Sniper Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  6.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   3,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.sniperminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  5.5,    12,      1,      8,      0,      0,      0,   ],
                }, {
                POSITION: [   5,     12,      1,      19.5,   0,      0,      0,   ],
                }
            ],
        };
  exports.boomertrap = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Round Shot',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, }, {
                POSITION: [  13,     9,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     9,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.twinminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Sniper Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
       POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.twinfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  5.5,    16,      1,      8,      0,      0,      0,   ], 
            }, {
                POSITION: [  6.5,    10,      1,     10.5,    0,      0,      0,   ], 
                }, {
                POSITION: [   3,     12,      1,      15,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.twinminion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, }, {                        
                    POSITION: [  5.5,    12,      1,      8,      0,      0,      0,   ], 
                }
            ],
        };
exports.poundminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Pound Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [  20,    12,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.Poundfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Pound Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                   POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1.4,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                            TYPE: exports.poundminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.mgminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Machine Gun Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
     POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
        }, }, 
    ],
};
exports.machinefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Machine Gun Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.mgminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      18.5,   0,      0,      0,   ],
                }, 
            ],
        };
exports.trapperminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Trapper Gun Factory', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                    TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
        }, }, 
    ],
};
exports.trapperfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Trapper Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.trapperminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      -1.1,      8,      0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      18.5,   0,      0,      0,   ],
                }, 
            ],
        };

exports.flankminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
        }, }, 
    ],
};
exports.flankfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Flank Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      -1.3,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.flankminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.pelletorminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Pelletor Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
        },  
    ],
};
exports.pelletorfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Pelletor Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   4,     14,      -1.4,      8,      0,      0,      0,   ]
                        }, {
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.pelletorminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
exports.droneminion = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 2.5,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ],
                PROPERTIES: {
                    MAX_CHILDREN: 3,
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
        }, }, 
    ],
};
exports.dronefact = {
            PARENT: [exports.genericTank],
            LABEL: 'Drone Factory',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     11,      1,      10.5,   0,      0,      0,   ],
                        }, {
                    POSITION: [   2,     14,      1,      15.5,   0,      0,      0,   ],
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.droneminion,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                        }, }, {
                    POSITION: [   4,     14,      1,      8,      0,      0,      0,   ],
                }, 
            ],
        };
 exports.lilengineer = {
               PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Rookie',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,
                            DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.twinpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {
    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin,  g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ],
            PROPERTIES: {
             SHOOT_SETTINGS: combineStats([g.basic, g.twin,  g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};

exports.twinpillbox = {
    LABEL: ' Twin Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.twinpillboxTurret,
        }
    ]
};

exports.builder2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Builder',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     -1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.twinpillbox,        
                            SYNCS_SKILLS: true,   
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.machinepillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [ {
     POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.mgpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.machinepillboxTurret,
        }
    ]
};

exports.constructor2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1.3,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1.3,     15.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.mgpillbox,        
                            SYNCS_SKILLS: true, 
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.flankpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.minion, g.turret, g.power, g.auto, g.notdense]),
                    TYPE: exports.bullet,
            }, },
    ],
};
exports.flankpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.flankpillboxTurret,
        }
    ]
};

exports.architect = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Architect',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    16,      1.3,     15.5,     0,      0,      0,   ],  
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.flankpillbox,        
                            SYNCS_SKILLS: true,  
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
};


exports.sniperpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
 POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.sniperpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.sniperpillboxTurret,
        }
    ]
};

exports.draftman = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'DraftsMan',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    8,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    12,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   4,    12,      1,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.sniperpillbox,        
                            SYNCS_SKILLS: true,
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };

exports.trapperpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
    POSITION: [  13,    8.5,     1,      0,      0,     0,     0,   ],
                        }, {
                    POSITION: [   4,    8.5,    1.7,    13,      0,     0,     0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.minion, g.turret, g.power, g.auto, g.notdense]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.trapperpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.trapperpillboxTurret,
        }
    ]
};

exports.programmer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Programmer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    14,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   4,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.trapperpillbox,        
                            SYNCS_SKILLS: true, 
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.poundpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
POSITION: [  20,    12,      1,      0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.poundpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.poundpillboxTurret,
        }
    ]
};

exports.heavyengineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Inventor',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    14,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.poundpillbox,        
                            SYNCS_SKILLS: true, 
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.pelletorpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
   GUNS: [ {
  POSITION: [  17,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  17,     2.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.minion, g.turret, g.power, g.auto, g.notdense]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, 
    ],
};
exports.pelletorpillbox = {
    LABEL: ' Machine Gun Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pelletorpillboxTurret,
        }
    ]
};

exports.pelletorengineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Designer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    9,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    12,      1,     15.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 4,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pelletorpillbox,        
                            SYNCS_SKILLS: true, 
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    12,      1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.silo = {
            PARENT: [exports.genericTank],
            LABEL: 'Silo',
            DANGER: 6,
            BODY: {
                FOV: 1.3,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,     8,      1,      0,      0,      0,      0, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  23,     8,      1,      0,      0,      0,    0.333, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      0,      0,    0.667, ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                       POSITION: [   5,    8,    -1.6,    8,      0,      0,      0,   ],
                },
            ],
        };
 exports.cannoneer = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Cannon',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     0,     0.25,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      0,     0.75,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
exports.twinrifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    10,    1,      0,      5.5,    0,       0   ],
                }, {
                    POSITION: [  24,     7,      1,      0,      5.5,   0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.rifle, g.threequartersrof]),
                            TYPE: exports.bullet,
                        }, }, {
                     POSITION: [  20,    10,    1,      0,      -5.5,   0,      0,   ],
                        }, {
                    POSITION: [  24,     7,      1,      0,      -5.5,    0,      0.5,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper, g.rifle, g.threequartersrof]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.halfnhalf2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Half N` Half',
               BODY: {    
            FOV: 1.1,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  9,     10,      1.6,      8,      0,      180,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  15,    10,     1.4,     8,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.insect = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Insect',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     110,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,      70,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  21,    14,      1,      0,      0,     180,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     250,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  18,     8,      1,      0,      0,     290,     0.5, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.webber]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
exports.flankgatling = {
        PARENT: [exports.genericTank],
        LABEL: 'Double Gatling',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    15,     10,     1.4,     8,      0,     180,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gatling]),
                TYPE: exports.bullet,
            }, },
        ],
    };

exports.minimach = {
            PARENT: [exports.genericTank],
            LABEL: 'Mini Machine',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      2,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.mini, g.morereload]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.fastfire = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Fastfire',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  18,     2.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  18,     2.5,      1,      0,    -3,     0,     0.15,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  16,     2.5,      1,      0,     3,     0,      0.3,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  16,     2.5,      1,      0,    -3,     0,     0.45,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
               POSITION: [  14,     2.5,      1,      0,     3,     0,      0.6,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  14,     2.5,      1,      0,    -3,     0,     0.75,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.halfrecoil, g.mach, g.lessdamage, g.lessreload, g.lessreload, g.lesspen]),
              TYPE: exports.bullet,
            }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0.9,   ],
            }, {
            POSITION: [    9,     10,     1.4,     8,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
                }, },
            ],
        };  
exports.match = {
    PARENT: [exports.genericTank],
    LABEL: 'Stacker',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      0,      0,        0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.match]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,        0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.match]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.guardian = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Guardian',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */      
                    POSITION: [  14,     6,      1,      0,      0,     140,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     140,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     -140,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     -140,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                       POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                         }, {
                       POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                           PROPERTIES: {
                               SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                               TYPE: exports.block,
                        }, },
                ],
            };


  exports.flare = {
    PARENT: [exports.genericTank],
    LABEL: 'Flare',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [8, 16, 1, 5, 0, 0, 0],
    }, {
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.flarebullet,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.1, 0, 0, 0, 0]
    }]
};


exports.fastbullet = {
    PARENT: [exports.bullet],
    LABEL: 'Fast bullet',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{ /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,     5.5,     180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flare]),
                AUTOFIRE: true,
                TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true}]
            }, }, {
            POSITION: [  20,     8,      1,      0,    -5.5,     180,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.flare]),
                 AUTOFIRE: true,
                TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true}]
            }, },
        ],
};

  exports.accelerationsh = {
    PARENT: [exports.genericTank],
    LABEL: 'Acceleration Shot',
    DANGER: 7,
    BODY: {
        ACCELERATION: base.ACCEL * 0.65,
        SPEED: base.SPEED * 0.75,
        FOV: 1.25
    },
    GUNS: [{
        POSITION: [8, 17, 1, 5, 0, 0, 0],
    }, {
      POSITION: [11, 15, 1, 5, 0, 0, 0],
    }, {
        POSITION: [10, 12.5, -0.5, 9.5, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.fastbullet,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }, {
        POSITION: [16.5, 11.5, -1.1, 0, 0, 0, 0]
    }]
};

exports.homingbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 8,
        RANGE: 370,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'turnWithSpeed',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    SHAPE: 6,
    MOTION_TYPE: 'swarm',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.explosion = {
     PARENT: [exports.bullet],
    LABEL: 'Explosion',
    INDEPENDENT: true,
  BODY: {
        RANGE: 500,
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  2,     5,      1,      0,      0,    0,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [2,   5,      1,      0,      0,    72,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, {
           POSITION: [  2,   5,     1,      0,      0,      144,      0,   ], 
            PROPERTIES: {
              AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  2,  5,     1,      0,      0,     216,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  2,  5,     1,      0,      0,     288 ,    0,   ],  
              PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic]),
                TYPE: exports.bullet,
            }, }, 
    ],
};
exports.thinshell = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: -1,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 200,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.nuke = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    DIE_AT_RANGE: true,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
              POSITION: [  2,    12,     1,     0,      0,     0,     0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     20,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
            }, }, {
               POSITION: [  2,    12,     1,     0,      0,     40,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, { 
               POSITION: [  2,    12,     1,     0,      0,     60,     0,   ], 
             PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, { 
               POSITION: [  2,    12,     1,     0,      0,     80,     0,   ], 
             PROPERTIES: {
               SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, }, {
                POSITION: [  2,    12,     1,     0,     0,     100,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     120,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     140,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
              POSITION: [  2,    12,     1,     0,      0,     160,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     180,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     200,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     220,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     240,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     260,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     280,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     300,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     320,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
              }, }, {
                POSITION: [  2,    12,     1,     0,      0,     340,     0,   ],
              PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.explosion, g.weak, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
                TYPE: [exports.thinshell, { PERSISTS_AFTER_DEATH: true, }],
                ALT_FIRE: true,
             }, },
           ],
};
exports.gernader = {
        PARENT: [exports.genericTank],
        LABEL: 'Grenader',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [14.5,  12,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload]),
                TYPE: exports.nuke,
              }, },
        ],
    };     
  
exports.homingshot = {
        PARENT: [exports.genericTank],
        LABEL: 'HomingShot',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [14.5,  12,     1,       0,       0,      0,      0,   ],   
               PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.morespeed]),
                TYPE: exports.homingbullet,
                MAX_CHILDREN: 1,
              }, },
        ],
    }; 

exports.chimera = {
	PARENT: [exports.genericTank],
	LABEL: 'Chimera',
	DANGER: 7,
	GUNS: [{
		POSITION: [20, 8, 1, 0, 0, 0, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
			TYPE: exports.bullet
		}
	}, {
		POSITION: [6, 12, 1.2, 8, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
			TYPE: [exports.drone, {
				INDEPENDENT: true
			}],
			AUTOFIRE: true,
			SYNCS_SKILLS: true,
			STAT_CALCULATOR: gunCalcNames.drone,
			WAIT_TO_CYCLE: false,
			MAX_CHILDREN: 3
		}
	}, {
		POSITION: [13, 8, 1, 0, 0, 180, 0]
	}, {
		POSITION: [4, 8, 1.7, 13, 0, 180, 0],
		PROPERTIES: {
			SHOOT_SETTINGS: combineStats([g.trap]),
			TYPE: exports.trap,
			STAT_CALCULATOR: gunCalcNames.trap
		}
	}]
};
   
exports.rock2 = {
    LABEL: '',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -2,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.sheildTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: [],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.01,    20,      1,     -18,      0,      0,     0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.rock2,
            AUTOFIRE: true,
        },
    }, ],
};

exports.sheildTurret2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['reversespin'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.2,    10,      1,      0,      0,      0,      0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.rock2,
            AUTOFIRE: true,
        },
    }, ],
};
exports.doublesheild = {
    PARENT: [exports.genericTank],
    LABEL: 'Forcefield',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [20, 0, 0, 270, 360, 0, ],
        TYPE: exports.sheildTurret,
    }, { POSITION: [20, 0, 0, 90, 360, 0, ],
        TYPE: exports.sheildTurret,
    },],
    GUNS: [{
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',
            STAT_CALCULATOR: 0,
            WAIT_TO_CYCLE: false,
            AUTOFIRE: false,
            SYNCS_SKILLS: false,
            MAX_CHILDREN: 0,
            ALT_FIRE: false,
            NEGATIVE_RECOIL: false,
        },
    }],
};
exports.blocker = {
    TYPE: 'wall',
    LABEL: '',
  //FACING_TYPE: 'smoothWithMotion',
  // SHAPE: -2,
    SHAPE: 0,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.blockerpart1 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    CONTROLLERS: ['canRepel', 'mapAltToFire',],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.01,    20,      1,     -18,      0,      0,     0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.blocker,
            AUTOFIRE: true,
        },
    }, ],
};
exports.blockerpart2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['reversespin'],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.2,    30,      1,      0,      0,      0,      0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.blocker,
            AUTOFIRE: true,
        },
    }, ],
};
exports.defletor = {
    PARENT: [exports.genericTank],
    LABEL: 'Deflector',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [17, 0, 0, 180, 360, 0, ],
        TYPE: exports.blockerpart1,
    },],
    GUNS: [{
        POSITION: [18, 10, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.morereload]),
            TYPE: exports.bullet,
        },
    }],
};
/*exports.trapshield = {
    PARENT: [exports.genericTank],
    LABEL: 'Rejector',
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
       /* POSITION: [17, 0, 0, 180, 360, 0, ],
        TYPE: exports.blockerpart1,
    },],
    GUNS: [{ 
        STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               /* POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.morereload]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
        },
    }],
};*/
exports.snipershield = {
    PARENT: [exports.genericTank],
    LABEL: 'Shields Man',
    BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
    TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [17, 0, 0, 180, 360, 0, ],
        TYPE: exports.blockerpart1,
    },],
    GUNS: [{
        POSITION: [23, 8, 1, 0, 0, 0, 0.15, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morereload]),
            TYPE: exports.bullet,
        },
    }],
};
exports.grinder = {
        PARENT: [exports.genericTank],
        LABEL: 'Grinder',
BODY: {    
            FOV: 0.85,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9,     10,     1.8,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.Hflame = {
        PARENT: [exports.genericTank],
        LABEL: 'Heavy Flamer',
BODY: {    
            FOV: 0.85,
              },     
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [    9,     10,     1.8,     11,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.halfrecoil]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    9,     10,     1.8,     7,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.halfrecoil]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.grinder3 = {
        PARENT: [exports.genericTank],
        LABEL: '',
BODY: {    
            FOV: 0.75,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    9.5,     12,     1.8,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster, g.blaster, g.morereload, g.morereload]),
                TYPE: exports.bullet,
            }, },
        ],
    };
exports.grinder2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Devourer',
   GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
  POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
                   }, }, {
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
            }, },
        ],
    };
exports.falconback = {
        PARENT: [exports.genericTank],
        LABEL: 'Devourer',
   GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
  POSITION: [    9,     10,     1.6,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.blaster]),
                TYPE: exports.bullet,
                   }, }, {
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
            }, },
        ],
    };
exports.maxim = {
        PARENT: [exports.genericTank],
        LABEL: 'Maxim Gun',
        BODY: {    
            FOV: 1.1,
              },
      
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    15,     10,     1.4,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.chain]),
                TYPE: exports.bullet,
            }, },
        ],
    };
  exports.pistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Pistol',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
  exports.accpistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Velocity Pistol',
                DANGER: 7,
            BODY: {    
                FOV: 4.5,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.muchrange, g.accel, g.zeroknockback]),
                            TYPE: exports.abulletfast, 
                    }, }, {
                    POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                    POSITION: [  12,    12.5,    1,      0,      0,      180,      0,   ], 
                   }
           ],
  };
 exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                DANGER: 7,
    BODY: {    
            FOV: 1.2,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange, g.morespeed, g.morespeed, g.morespeed, g.morespeed, g.halfrange, g.lessdamage]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistoltrapperpound = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Coiler',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                       POSITION: [  20,    12,      1,      0,      0,      180,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                  }, },
           ],
  };
exports.pistoltrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Impuser',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                  }, },
           ],
  };  
exports.pistolsniper = {
                PARENT: [exports.genericTank],
                LABEL: 'Sniper Pistol',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Sharp pistol',
                DANGER: 7,
   BODY: {
    FOV: 1.2,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  26,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  16,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                    POSITION: [  13,    12,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.fastpistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Pistol',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1.2,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.halfrange, g.mach]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1.2,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.fasterpistol = {
                PARENT: [exports.genericTank],
                LABEL: 'Golden Shell',
                DANGER: 7,
            BODY: {    
            FOV: 0.8,
              },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1.2,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.halfrange, g.mach, g.morespeed, g.morereload]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1.2,      0,      0,      0,      0,   ],
                  }, {
                  POSITION: [  17,    10.5,    1.2,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolsniper2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Acc pistol',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange, g.sniper]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                  POSITION: [  16,    7,    1,      0,      0,      0,      0,   ],
                  },
           ],
  };
exports.pistolsnipertwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Block Shot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                  }, }, {
                    POSITION: [  25,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }
           ],
  };
exports.pistoltrapper2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Flank Impuser',
                DANGER: 7,
  BODY: {
    FOV: 0.8,
  },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
                  }, {
                POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                       POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                  }, },
           ],
  };
exports.muskminion
 = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: true,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
         POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
          },
    }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },
    }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, 
    ],
};
     
  exports.musketeer3 = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: '3 Musketeers',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
          POSITION: [0, 20, 0, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessreload, g.lessreload, g.lessreload, g.lessreload, g.lessreload]),
            TYPE: exports.muskminion,
            MAX_CHILDREN: 2,
        }, },
    ],
  };
exports.snipeCloser = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'sniper Closer',
    NAME: 'sniper Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    7,       1,     0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.sniper, g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.flankCloser = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'flank Closer',
    NAME: 'flank Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,    7,       1,     0,      0,      120,      0.5,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        },}, {
      POSITION: [  14,    7,       1,     0,      0,      240,      1,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        },}, {
      POSITION: [  14,    7,       1,     0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.arenaCloser2 = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'twin Closer',
    NAME: 'twin Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,    7,       1,     0,      5.5,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        },}, {
      POSITION: [  14,    7,       1,     0,      -5.5,      0,      0.5,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.machCloser = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'machine Closer',
    NAME: 'machine Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,    10,       1.4,     0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.mach, g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.poundCloser = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'pound Closer',
    NAME: 'pound Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  19,    16,       1,     0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.pound, g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.arenaCloser = {
              COLOR: 13,
     DRAW_HEALTH: false,
    CAN_GO_OUTSIDE_ROOM: true,
    CAN_BE_ON_LEADERBOARD: false,
    ACCEPTS_SCORE: false,
    PARENT: [exports.genericTank],
    LABEL: 'Arena Closer',
    NAME: 'Arena Closer',
    DANGER: 20,
    SIZE: 50,
    SKILL: skillSet({
        dam: 1,
        pen: 1,
        str: 1,
    }),
    BODY: { // def
        SHIELD: 1000000,
        REGEN: 100000,
        HEALTH: 1000000,
        DAMAGE: 50,
        DENSITY: 30,
        FOV: 2,
        SPEED: 20,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,    10,       1,     0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.halfreload, g.basic, g.op]),
            TYPE: exports.bullet,
        }, },
    ],
};
exports.musketeer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Musketeer',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, },
           ],
};
exports.hewngunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Hewn Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  12,    3.5,     1,      0,     7.25,    45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    -45,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.ghewngunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Terminator',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,     1,      0,     7.25,    45,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,    8,     1,      0,    -7.25,    -45,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, }, {
                      POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.musketeersideshot = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Twin Musketeers',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 1, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 30, 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
          POSITION: [4, 1.5, 1, 11, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, -30, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
            TYPE: exports.bullet,
        }, },
           ],
};
     exports.heavyrifle = {
            PARENT: [exports.genericTank],
            LABEL: 'Carbine',
            BODY: {
              FOV: 1.225,
            },
            DANGER: 7,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14.5,    1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  24,     10.5,      1,      0,      0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.pound]),
                            TYPE: exports.bullet,
                        }, },
            
            ],
        };
 exports.sparrow = {
            PARENT: [exports.genericTank],
            LABEL: 'Sparrow',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ],
                    }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.pentaguard = {
            PARENT: [exports.genericTank],
            LABEL: 'Penta Guard',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
        }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
            TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.raven = {
            PARENT: [exports.genericTank],
            LABEL: 'Raven',
            DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.8,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic]),
                    TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        };
 exports.eagle = {
                PARENT: [exports.genericTank],
                LABEL: 'Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
 exports.railgun = {
            PARENT: [exports.genericTank],
            LABEL: 'Railgun',
           BODY: {
                    FOV: 1.2,
                },
            GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  1,     8,      1,      10,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.bitlessspeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      15,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      20,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  1,     8,      1,      25,     0,      0,      0, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morespeed, g.morespeed, g.halfrange]),
                    TYPE: exports.bullet,
                }, }, { 
                POSITION: [  27,    2,      1,      0,      4,      0,      0, ],
                }, { 
                POSITION: [  27,    2,      1,      0,      -4,     0,      0, ],
                },
              ],
        };
exports.slime = {
   
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
       SHAPE:4,
    },
      SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 1,
        shi: 0,
        rgn: 0,
        mob: 0,       
    }),
    //COLOR: 17,
    NAME: "slime",
  CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion'
    ],
    AI: { STRAFE: true, },
};
exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 10,
    },
      SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 1,
        shi: 0,
        rgn: 0,
        mob: 0,       
    }),
    //COLOR: 17,
    NAME: "ai_",
  CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'moveInBigCircles'
    ],
    AI: { STRAFE: true, },
};
exports.test = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
   SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,       
    }),
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.beem = {
    LABEL: 'beem',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: -1,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.lazer = {
    PARENT: [exports.genericTank],
    LABEL: 'lazer',
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lazer, g.morespeed, g.morespeed, g.halfrange]),
            TYPE: exports.beem,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};

exports.thrusterstuff = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: false,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
           POSITION: [10, 15, 1.5, 9, 0, 180, 7.5],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.heatseekmach,]),
                TYPE: exports.bullet,
              LABEL: gunCalcNames.thruster,
            }, },
    ],
};
exports.thruster2 = {
    LABEL: 'Auto-Bullet',
    PARENT: [exports.bullet],
    CONTROLLERS: ['nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      180,     360,  1],
            TYPE: exports.thrusterstuff,
            ALT_FIRE: true,
        }
    ]
};
 exports.thrustshot = {
                PARENT: [exports.genericTank],
                LABEL: 'Thrust Shot',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.thruster2,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

 
exports.pillbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 8,
        RANGE: 370,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'turnWithSpeed',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    GUNS: [],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
             SHOOT_SETTINGS: combineStats([g.minion, g.turret, g.aimmissile]),
             FACING_TYPE: ['toTarget'], // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
             MOTION_TYPE: 'swarm',
             DRAW_HEALTH: true,
             ALT_FIRE: true,
             INDEPENDENT: false,
             STAT_CALCULATOR: gunCalcNames.sustained,
              },
       ],
};

exports.test2= {
    PARENT: [exports.genericTank],
    LABEL: 'Test2',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.pillbullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.bulleter = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Bulleter',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,     3.5,      1,      0,     3,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
              }, }, {
            POSITION: [  17,     3.5,      1,      0,    -3,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
              TYPE: exports.bullet,
            }, }, {
              POSITION: [  19,     3.5,      1,      0,     0,     1,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
                }, }, {
            POSITION: [   5,    9,    -1.6,    7,      0,      0,      0,   ],
            }, 
      ],
};

// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Crasher',
    VALUE: 2,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    HEALTH_WITH_LEVEL: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [],
    TURRETS: []
};
exports.vis = {
    TYPE: 'crasher',
    LABEL: 'Vis Destructia',
    VALUE: 100,
    COLOR: 1,
    SHAPE: 3,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    HEALTH_WITH_LEVEL: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 10,
        ACCELERATION: 1.4,
        HEALTH: 1,
        DAMAGE: 10,
        PENETRATION: 2,
        PUSHABILITY: 0,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [],
    TURRETS: []
};
exports.packer = {
    TYPE: 'crasher',
    LABEL: 'Packer',
    COLOR: 13,
    SHAPE: 103,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    HEALTH_WITH_LEVEL: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [],
    TURRETS: []
};
exports.pulsar = {
    TYPE: 'crasher',
    LABEL: 'Pulsar',
    COLOR: 20,
    SHAPE: 102,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    HEALTH_WITH_LEVEL: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [],
    TURRETS: []
};
exports.clutterer = {
    TYPE: 'crasher',
    LABEL: 'Clutterer',
    COLOR: 20,
    SHAPE: 121,
    SIZE: 7,
    VARIES_IN_SIZE: true,
    HEALTH_WITH_LEVEL: false,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: {
        NO_LEAD: true
    },
    BODY: {
        SPEED: 5,
        ACCELERATION: 1.4,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GUNS: [],
    TURRETS: []
};
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 5,
    SHAPE: 3,
    SIZE: 12,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
},
exports.pacsentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Packed Sentry',
    DANGER: 3,
    COLOR: 7,
    SHAPE: 103,
    SIZE: 12,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
},
exports.pulsentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Pulsated Sentry',
    DANGER: 3,
    COLOR: 7,
    SHAPE: 102,
    SIZE: 12,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
},
  exports.clutsentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Cluttered Sentry',
    DANGER: 3,
    COLOR: 7,
    SHAPE: 121,
    SIZE: 12,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
},
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
},
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
},
exports.pacsentrySwarm = {
    PARENT: [exports.pacsentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     0,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
},
exports.pulsentrySwarm = {
    PARENT: [exports.pulsentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     3,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
},
exports.clutsentrySwarm = {
    PARENT: [exports.clutsentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    7,    14,    0.6,     3,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
},

exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, }),
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, }),
exports.pacsentryGun = makeAuto(exports.pacsentry, 'Packed Sentry', { type: exports.heavy3gun, size: 12, }),
exports.pacsentryTrap = makeAuto(exports.pacsentry, 'Packed Sentry', { type: exports.trapTurret, size: 12, }),
exports.pulsentryGun = makeAuto(exports.pulsentry, 'Pulsated Sentry', { type: exports.heavy3gun, size: 12, }),
exports.pulsentryTrap = makeAuto(exports.pulsentry, 'Pulsated Sentry', { type: exports.trapTurret, size: 12, }),
exports.clutsentryGun = makeAuto(exports.clutsentry, 'Cluttered Sentry', { type: exports.heavy3gun, size: 12, }),
exports.clutsentryTrap = makeAuto(exports.clutsentry, 'Cluttered Sentry', { type: exports.trapTurret, size: 12, }),


  exports.ultimateminiboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.3,
        dam: 4, 
        pen: 10,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 200,
        shi: 1,
        rgn: 1,
        mob: 0,        
    }),
    LEVEL: 150,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A Boss has fallen',
},
  exports.ulitmate = {
        PARENT: [exports.ultimateminiboss],
        LABEL: 'Ultimate',
        COLOR: 5,
        SHAPE: 6,
        SIZE: 70,
        VARIES_IN_SIZE: true,
        VALUE: 250000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 4,
        },
    },
  
exports.bigtriauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
              POSITION: [  14,     5,      1,      0,    -4.5,     120,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     120,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      120,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
              POSITION: [  14,     5,      1,      0,    -4.5,    240,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,    240,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,     240,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
exports.autocrasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'AutoSpawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN:8,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.pound, g.lessreload, g.lessreload]),
                    TYPE: [exports.autoswarm, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.swarm,
                }, },
        ],
    };
 exports.ulitmate_destroyer = {
            PARENT: [exports.ulitmate],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    7,    11,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    7,    11,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    7,    11,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      0,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      120,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      120,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      240,     0,   ],
                    }, {
                POSITION: [   2,     8,     1.7,    11,      0,      240,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,

                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.autocrasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigtriauto4gun, { INDEPENDENT: true, COLOR: 5,  }],
                    }, 
            ],
        },

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,       
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has fallen',
},
   exports.minibossRam = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,       
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has fallen',
},
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.summoner = {
        PARENT: [exports.miniboss],
        LABEL: 'Summoner',
        SHAPE: 4,
        COLOR: 13,
        SIZE: 36,
        LEVEL: 105,
        MAX_CHILDREN: 48,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 300000,
        BODY: {
            FOV: 1.5,
            SPEED: base.SPEED * 0.075,
            HEALTH: base.HEALTH * 13,
            SHIELD: base.SHIELD,
            REGEN: base.REGEN * 0.5,
            DAMAGE: base.DAMAGE * 2.5,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.sunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.sunchip,
      
                  AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.necro,
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.autosunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    MAX_CHILDREN: 4,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    LABEL: 'Guard',
                }, }, {
            POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ],
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.summoner]),
                    TYPE: exports.autosunchip,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    MAX_CHILDREN: 4,
                    STAT_CALCULATOR: gunCalcNames.necro,
                    LABEL: 'Guard',
                }, },
            ],
    };
    exports.skimboss = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Skimmer',
        SHAPE: 3,
        COLOR: 2,
        SIZE: 30,
        FACING_TYPE: 'autospin',
        VARIES_IN_SIZE: true,
        VALUE: 250000,
        BODY: {
            FOV: 1.5,
            SPEED: base.SPEED * 0.1,
            HEALTH: base.HEALTH * 12,
            SHIELD: base.SHIELD,
            REGEN: base.REGEN * 0.5,
            DAMAGE: base.DAMAGE * 2.5,
        },
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0],
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0],
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0],
                TYPE: exports.skimturret,
                    },
        ],
    };
    exports.defender = {
            PARENT: [exports.miniboss],
            LABEL: 'Defender',
            COLOR: 2,
            SHAPE: 3,
            SIZE: 50,
            VARIES_IN_SIZE: true,
            VALUE: 150000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.25,
                HEALTH: base.HEALTH * 1.5,
                SHIELD: base.SHIELD * 1.25,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  13,     8,      1,      0,      0,      60,     0,   ],
                  }, {
                POSITION: [   4,     8,     1.7,    13,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,      180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
               POSITION: [  13,     8,      1,      0,      0,      300,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,      300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  7,     6.5,     0,      0,     360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  7,     6.5,     0,     120,    360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  7,     6.5,     0,     240,     360,   1, ],  
                    TYPE: [exports.bigauto3gun, { INDEPENDENT: true, COLOR: 2,  }]
                    }, 
            ],
        },
      exports.deltrablade = {
            PARENT: [exports.miniboss],
            LABEL: 'Deltrablade',
            COLOR: 2,
            SHAPE: 108,
            SIZE: 30,
            VARIES_IN_SIZE: true,
            VALUE: 200000,
            BODY: {
                FOV: 1.6,
                SPEED: base.SPEED * 0.20,
                HEALTH: base.HEALTH * 7,
                SHIELD: base.SHIELD * 1.30,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 2.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  8,     6,      1,      0,      0,      60,     0,   ],
                  }, {
                POSITION: [   4,     6,     1.7,    8,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  8,     6,      1,      0,      0,      180,     0,   ],
                    }, {
               POSITION: [   4,     6,     1.7,    8,      0,      180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
               POSITION: [  8,     6,      1,      0,      0,      300,     0,   ],
                    }, {
                POSITION: [   4,     6,     1.7,    8,      0,      300,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.pound]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  6,     7,     0,      0,     360,   1, ],  
                    TYPE: [exports.baseGunTurret, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  6,     7,     0,     120,    360,   1, ],  
                    TYPE: [exports.baseGunTurret, { INDEPENDENT: true, COLOR: 2,  }]
            }, {
                POSITION: [  6,     7,     0,     240,     360,   1, ],  
                    TYPE: [exports.baseGunTurret, { INDEPENDENT: true, COLOR: 2,  }]
                    }, 
            ],
        },
      exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 30,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    },
exports.dank = makeAuto({
                PARENT: [exports.miniboss],
                LABEL: 'Overdrive',
                COLOR: 11,
                SHAPE: 0,
                SIZE: 25,
                STAT_NAMES: statnames.drone,
                BODY: {
                    FOV: 1.3,
                    SPEED: 4,
                    HEALTH: 10000,
                    SHIELD: 1000,
                    REGEN: base.REGEN,
                    DAMAGE: base.DAMAGE * 1.1,
                },
                MAX_CHILDREN: 500,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.gottagofast, g.hecklotmoredamage]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.gottagofast, g.hecklotmoredamage]),
                        TYPE: exports.oddrone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        }, 'Ɗค̞̦ͥ́̊ͨ͊ᶇƙツ', {type: exports.odTurret, size: 11});
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy, g.morereload, g.morereload]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5,  }]
                    }, 
            ],
        },
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        },
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        },

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 60,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })(),
      exports.sailor3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Lancher',
             GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [7,    7.5,    0.6,     5.5,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     5.5,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.lessdamage, g.lessreload, g.lessreload]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
               POSITION: [8,     16,     1,     5,     0,    0,    0],
    }, {
        POSITION: [10,    12.5,    -0.5,    9.5,    0, 0,    0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.flarebullet,
            STAT_CALCULATOR: gunCalcNames.sustained
    }, }, {
        POSITION: [16.5,    11.5,    -1.1,    0,    0,    0,    0]
                },
            ],
        };
exports.shockEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 29,
    SHAPE: 0,
    SIZE: 3,
    CONTROLLERS: ['dontTurn'],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_shock,  
        },
    ],
};
exports.shockedflame = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    COLOR: 29,
    SHAPE: 4,
    SHOCK: true,
    SHOCK_TO_APPLY: 0,
    SHOWSHOCK: true,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: true,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.healEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 26,
    SHAPE: 0,
    SIZE: 3,
    CONTROLLERS: ['dontTurn'],
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_health,  
        },
    ],
};
exports.iceEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 24,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.icebullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    ICE: true,
    ICE_TO_APPLY: 0,
    SHOWICE: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.frozenflame = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    COLOR: 24,
    SHAPE: 4,
    ICE: true,
    ICE_TO_APPLY: 0,
    SHOWICE: true,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: true,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.frost = {
    PARENT: [exports.genericTank],
    LABEL: 'Frost Cannon',
    LEVEL: 60,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.icebullet,
        }, }, 
    ],
};
exports.burnEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 28,
    SHAPE: 0,
    SIZE: 3,
    CONTROLLERS: ['dontTurn'],
    MOTION_TYPE: 'littlegrow',
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_fire,
        },
    ],
};

exports.burnbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.flame = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    COLOR: 28,
    SHAPE: 4,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: true,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.flamer3 = {
        PARENT: [exports.genericTank],
        LABEL: 'Ball Lightning',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    1,     3,     5,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flamer, g.morereload, g.lessdamage, g.lessdamage]),
                TYPE: exports.shockedflame,
            }, }, {
             POSITION: [    25,     2,     1,     0,      -6,      0,      0,   ],
            }, {
             POSITION: [    7,     2,     1,     13,      -22,      45,      0,   ],
             PROPERTIES: {
                COLOR: 29,
            }, }, {
            POSITION: [    14.5,     3,     1,     0,      0,      0,      0,   ],
            PROPERTIES: {
                COLOR: 28,
            }, }, {
            POSITION: [    14,     4,     1,     -6,      -10,      0,      0,   ],
            },
      ],
};
exports.flamer2 = {
        PARENT: [exports.genericTank],
        LABEL: 'Freezerburn',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    1,     3,     5,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flamer, g.morereload, g.lessdamage, g.lessdamage]),
                TYPE: exports.frozenflame,
            }, }, {
             POSITION: [    25,     2,     1,     0,      -6,      0,      0,   ],
            }, {
             POSITION: [    7,     2,     1,     13,      -22,      45,      0,   ],
             PROPERTIES: {
                COLOR: 24,
            }, }, {
            POSITION: [    14.5,     3,     1,     0,      0,      0,      0,   ],
            PROPERTIES: {
                COLOR: 28,
            }, }, {
            POSITION: [    14,     4,     1,     -6,      -10,      0,      0,   ],
            },
      ],
};
exports.flamer = {
        PARENT: [exports.genericTank],
        LABEL: 'Flamethrower',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /***  L   W   A   X   Y   A   D */
            POSITION: [    1,  3,  5,  8,  0,  0,  0, ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flamer, g.morereload, g.lessdamage, g.lessdamage]),
                TYPE: exports.flame,
            }, }, {
             POSITION: [  25,  2,  1,  0, -6,  0,  0, ],
            }, {
             POSITION: [   7,  2,  1, 13,-22, 45,  0, ],
             PROPERTIES: {
                COLOR: 28,
            }, }, {
            POSITION: [ 14.5,  3,  1,  0,  0,  0,  0, ],
            PROPERTIES: {
                COLOR: 28,
            }, }, {
            POSITION: [   14,  4,  1, -6, -10, 0,  0, ],
            },
      ],
};
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 27,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poisonbullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    POISON: true,
    POISON_TO_APPLY: 0,
    SHOWPOISON: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poisonflame = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    COLOR: 27,
    SHAPE: 4,
    POISON: true,
    POISON_TO_APPLY: 0,
    SHOWPOISON: true,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: true,
    MOTION_TYPE: 'grow',
    BODY: {
        PENETRATION: 1,
        SPEED: 4,
        RANGE: 50,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.corroder = {
        PARENT: [exports.genericTank],
        LABEL: 'Chemical Flame',
        BODY: {  
            FOV: 1.1,
              },
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    1,     3,     5,     8,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.flamer, g.morereload]),
                TYPE: exports.poisonflame,
            }, }, {
            POSITION: [    25,     2,     1,     0,      -6,      0,      0,   ],
            }, {
            POSITION: [    7,     2,     1,     13,      -22,      45,      0,   ],
            PROPERTIES: {
                COLOR: 27,
            }, }, {
            POSITION: [    14.5,     3,     1,     0,      0,      0,      0,   ],
            PROPERTIES: {
                COLOR: 28,
            }, }, {
            POSITION: [    14,     4,     1,     -6,      -10,      0,      0,   ],
            },
      ],
};
exports.shotpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {
     POSITION: [  2,      3,     1,     11,     -3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      3,      1,     11,      3,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  2,      4,      1,     13,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     12,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {
                    POSITION: [  2,      4,      1,     11,      1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.casing,
                        }, }, {                
                    POSITION: [  2,      3,      1,     13,     -1,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  21,     5,      1,      0,     3,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]),
                            TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  21,     5,      1,      0,    -3,     0,      0,  ],  
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake]), 
                            TYPE: exports.bullet,
            }, },
    ],
};

exports.shotpillbox = {
    LABEL: ' Twin Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.shotpillboxTurret,
        }
    ]
};

exports.reworker = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'reworker',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     -1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.shotpillbox,        
                            SYNCS_SKILLS: true,  
                           DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.pistpillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {
     POSITION: [  23,     7,      1,      0,      0,     0,      0,   ], 
                  PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morespeed, g.moredamage, g.halfrange]),
                    TYPE: exports.bullet, 
                  }, }, {
                  POSITION: [  14,    10.5,    1,      0,      0,      0,      0,   ],
            }, 
    ],
};

exports.pistpillbox = {
    LABEL: ' Twin Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pistpillboxTurret,
        }
    ]
};

exports.reworker2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Weapon Crafter',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     -1.3,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pistpillbox,
                           SYNCS_SKILLS: true, 
                           DESTROY_OLDEST_CHILD: true,
                        }, }, {                            
                    POSITION: [   4,    14,      1,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.flarepillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ {
    POSITION: [10,    12.5,    -0.5,    9.5,    0, 0,    0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.flarer]),
            TYPE: exports.flarebullet,
            STAT_CALCULATOR: gunCalcNames.sustained
    }, }, {
        POSITION: [16.5,    11.5,    -1.1,    0,    0,    0,    0]
            }, 
    ],
};

exports.flarepillbox = {
    LABEL: ' Twin Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.flarepillboxTurret,
        }
    ]
};

exports.flareeng = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    11,      1,     10.5,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   3,    14,      1,     15.5,     0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 3,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.flarepillbox,        
                            SYNCS_SKILLS: true, 
                          DESTROY_OLDEST_CHILD: true,
                        }, }, {                           
                    POSITION: [   4,    14,      -1.3,      8,      0,      0,      0,   ]
                    }
                ],
            };
exports.flameexplode = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BURN: true,
    BURN_TO_APPLY: 0,
    SHOWBURN: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 0, 
        RANGE: 15,
        SIZE: 1,
        DENSITY: 1.25,
        HEALTH: 100000000000000 * wepHealthFactor,
        DAMAGE: 10 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    MOTION_TYPE: 'bigexplode',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.detection = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.05,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.nospeed]),
                TYPE: exports.flameexplode,
            }, },
    ],
};

exports.splash2 = {
    INVISIBLE: [0.3, 0.01],
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: 4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'DetectMaster'],
    INDEPENDENT: true,
    DANGER: 0,
    BODY: { 
        SPEED: 1,
        FOV: 0.05,
        DENSITY: 5, 
        HEALTH: 100000000000 * wepHealthFactor,
    },
    DIE_AT_RANGE: false, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.detection,
        }, 
    ],
};
exports.firecharger = {
    PARENT: [exports.genericTank],
    LABEL: 'Fire Charger',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessdamage, g.lessdamage, g.lessdamage, g.morespeed, g.morespeed, g.morespeed, g.morespeed, g.lessreload, g.lessreload, g.lessreload]),
            MAX_CHILDREN: 3,
            TYPE: exports.splash2,
            SYNCS_SKILLS: true,  
            DESTROY_OLDEST_CHILD: true,
          }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        },
    ],
};
exports.poisonexplode = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    POISON: true,
    POISON_TO_APPLY: 0,
    SHOWPOISON: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 0, 
        RANGE: 15,
        SIZE: 1,
        DENSITY: 1.25,
        HEALTH: 100000000000000 * wepHealthFactor,
        DAMAGE: 10 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    MOTION_TYPE: 'bigexplode',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.detection2 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.05,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.nospeed]),
                TYPE: exports.poisonexplode,
            }, },
    ],
};

exports.gasssplash = {
    INVISIBLE: [0.3, 0.01],
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: 4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'DetectMaster'],
    INDEPENDENT: true,
    DANGER: 0,
    BODY: { 
        SPEED: 1,
        FOV: 0.05,
        DENSITY: 5, 
        HEALTH: 100000000000 * wepHealthFactor,
    },
    DIE_AT_RANGE: false, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1],
            TYPE: exports.detection2,
        }, 
    ],
};
exports.gassminer = {
    PARENT: [exports.genericTank],
    LABEL: 'Gass Mine Placer',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessdamage, g.lessdamage, g.lessdamage, g.morespeed, g.morespeed, g.morespeed, g.morespeed, g.lessreload, g.lessreload, g.lessreload]),
            MAX_CHILDREN: 3,
            TYPE: exports.gasssplash,
             SYNCS_SKILLS: true,  
            DESTROY_OLDEST_CHILD: true,
          }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ], 
        },
    ],
};
/*exports.witch = {
    PARENT: [exports.genericTank],
    LABEL: 'witch',
    LEVEL: 60,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY *
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.spell,
        }, }, 
    ],
};*/
   exports.shockexplode = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHOCK: true,
    SHOCK_TO_APPLY: 1,
    SHOWSHOCK: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 0, 
        RANGE: 15,
        SIZE: 100,
        DENSITY: 1.25,
        HEALTH: 100000000000000 * wepHealthFactor,
        DAMAGE: 10 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.detection3 = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.05,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  1,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.nospeed, g.lessdamage, g.lessdamage, g.lessdamage]),
                TYPE: exports.shockexplode,
            }, },
    ],
};

exports.electrosplash = {
    INVISIBLE: [0.3, 0.01],
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: 4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'DetectMaster'],
    INDEPENDENT: true,
    DANGER: 0,
    BODY: { 
        SPEED: 1,
        FOV: 0.05,
        DENSITY: 5, 
        HEALTH: 100000000000 * wepHealthFactor,
    },
    DIE_AT_RANGE: false, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.detection3,
        }, 
    ],
};
exports.shockbullet = { 
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    PERSISTS_AFTER_DEATH: true, 
    SHAPE: 0,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        SHAPE: 4,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.detection3,
        }, 
    ],
};
exports.autoShock = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 29,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.shockbullet,
            }, },
    ],
};
exports.autospark = makeAuto(exports.Aball, 'Lil Sparky', {type: exports.autoShock});
exports.sentryShock = makeAuto(exports.sentry, 'Sentry', { type: exports.autoShock, size: 12, }),
exports.shockshooter = {
    PARENT: [exports.genericTank],
    LABEL: 'Shocker',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     10,      1,      0,      0,      0,      0,   ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.lessdamage, g.lessdamage, g.lessdamage, g.morespeed, g.morespeed, g.morespeed, g.morespeed, g.lessreload, g.lessreload, g.lessreload]),
            MAX_CHILDREN: 3,
          TYPE: exports.electrosplash,
            SYNCS_SKILLS: true,  
            DESTROY_OLDEST_CHILD: true,
          }, }, {
                POSITION: [   5,    10,    -1.6,    6,      0,      0,      0,   ],
        },
    ],
};
exports.medic = {
    PARENT: [exports.genericTank],
    LABEL: 'Medic',
    SHAPE: 0,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
         }, },
            ],
            TURRETS: [{
        POSITION: [  7,     2,      0,     0,    0,  1], //
            TYPE: exports.bb_squ,
        }, {
        POSITION: [  7,     -2,      0,     0,    0,  1], //
            TYPE: exports.bb_squ,
            }, {
        POSITION: [  7,     0,      2,     0,    0,  1], //
            TYPE: exports.bb_squ,
                }, { 
        POSITION: [  7,     0,      -2,     0,    0,  1], //
            TYPE: exports.bb_squ,
                   }, { 
        POSITION: [  7,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_squ,
                    }, 
            ],
        };
exports.fullautoflank2 = {
     PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
        SHAPE: 0,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     5,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     5,      1,      0,      0,      0,     180,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     180,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                   }, }, {
                  POSITION: [  15,     5,      1,      0,      0,      0,     90,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     90,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                   }, }, {
                  POSITION: [  15,     5,      1,      0,      0,      0,     270,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     270,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, },
        ],
    };

exports.fullautoflank = {
  PARENT: [exports.genericTank],
            LABEL: 'FullAuto-Quad',
            DANGER: 6,
            SHAPE: 0,
      TURRETS: [{
        POSITION: [  20,     0,      0,     0,    360,  0,], //
            TYPE: exports.fullautoflank2,
                    }, 
            ],
        };
exports.fullautomulti2 = {
     PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
        SHAPE: 0,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     5,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.fullautomulti = {
  PARENT: [exports.genericTank],
            LABEL: 'FullAuto-Multi',
            DANGER: 6,
            SHAPE: 0,
  FACING_TYPE: 'autospin',
      TURRETS: [{
        POSITION: [  20,     0,      0,     0,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,     120,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,    240,    190,  0,], //
            TYPE: exports.fullautomulti2,

                    }, 
            ],
        };

exports.fullautoloose = {
  PARENT: [exports.genericTank],
            LABEL: 'Multi Lock',
            DANGER: 6,
            SHAPE: 0,
  FACING_TYPE: 'autospin',
      TURRETS: [{
           POSITION: [  20,     0,      0,     0,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,     60,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,    120,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
          POSITION: [  20,     0,      0,    180,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,     -60,    190,  0,], //
            TYPE: exports.fullautomulti2,
      }, {
        POSITION: [  20,     0,      0,    -120,    190,  0,], //
            TYPE: exports.fullautomulti2,
                    }, 
            ],
        };
exports.fullautocannon = {
     PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
        SHAPE: 0,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  15,     5,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed,  g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  15,     10,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.morereload, g.morereload, g.morespeed, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.fullauto = {
  PARENT: [exports.genericTank],
            LABEL: 'FullAuto-Cannon',
            DANGER: 6,
            SHAPE: 0,
      TURRETS: [{
        POSITION: [  20,     0,      0,     0,    360,  0,], //
            TYPE: exports.fullautocannon
                    }, 
            ],
        };
exports.fullautosnipe = {
     PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
        SHAPE: 0,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  23,     8,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morereload, g.morespeed, g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  23,     8,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morereload, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }, {
                     POSITION: [  14,     12,      1,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morereload, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.fullautosniper = {
  PARENT: [exports.genericTank],
            LABEL: 'FullAuto-Sniper',
            DANGER: 6,
            SHAPE: 0,
      TURRETS: [{
        POSITION: [  20,     0,      0,     0,    360,  0,], //
            TYPE: exports.fullautosnipe
                    }, 
            ],
        };
exports.fullautomach = {
     PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 0.8,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
        SHAPE: 0,
    HAS_NO_RECOIL: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [ 17,     8,      1.3,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morereload, g.morespeed, g.auto]),
                    TYPE: exports.bullet,
                }, }, {
                  POSITION: [  17,     8,      1.3,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morereload, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }, {
                     POSITION: [  14,     12,      1.3,      0,      0,      0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.morereload, g.morespeed, g.auto, g.fake]),
                    TYPE: exports.bullet,
                }, }
        ],
    };

exports.fullautomachine = {
  PARENT: [exports.genericTank],
            LABEL: 'FullAuto-MachineGun',
            DANGER: 6,
            SHAPE: 0,
  TURRETS: [{
        POSITION: [  20,     0,      0,     0,    360,  0,], //
            TYPE: exports.fullautomach
                    }, 
            ],
        };
exports.guard2 = makeHybrid(exports.spreadling, 'Field Guard');

exports.marine = {
    PARENT: [exports.genericTank],
    LABEL: 'Marine',
    INVISIBLE: [0.08, 0.03],
    BODY: {
        HEALTH: base.HEALTH * 0.6,
        SHIELD: base.SHIELD * 0.6,
        DENSITY: base.DENSITY * 0.2,
    },
    DANGER: 7,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 8, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.muchmorerecoil]),
            TYPE: exports.bullet,
            LABEL: 'Front',
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 125, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, -125, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, {
        POSITION: [18, 8, 1, 0, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
            TYPE: exports.bullet,
            LABEL: gunCalcNames.thruster,
        },
    }, ],
};


//  sheild:             [0.2, 0, 1, 0.7, 1, 1, 1, 0.01, 1, 0.01, 1, 1, 1],
// tonsmoredamage:     [1,     1,     1,      1,      1,      1.5,    1,      1,      1,      1,      1,      1,      1],

exports.deflection = {
    TYPE: 'wall',
    LABEL: '',
    //FACING_TYPE: 'smoothWithMotion',
    SHAPE: -2,
    //SHAPE: 0,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.mod_swordfire = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 0,
    SIZE: 3,
    TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  40,     0,      0,     0,    0,  1], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  25,     32.5,      0,     0,    0,  1], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  12.5,     23,      -12,     0,    0,  0], //
            TYPE: exports.bb_fr_squ,
        }, { 
        POSITION: [  10,     50,      -6.5,     0,    0,  0], //
            TYPE: exports.bb_fr_squ,
        },
    ],
};
exports.burnEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 29,
    SHAPE: 0,
    SIZE: 2,
    CONTROLLERS: ['dontTurn'],
 // MOTION_TYPE: 'littlegrow',
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 8,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    DIE_AT_RANGE: true,
  TURRETS: [ { /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  25,     0,      0,     -90,    0,  1], //
            TYPE: exports.mod_swordfire,
        },
    ],
};
exports.visibleflameblade = {
    LABEL: '',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -2,
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: true,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.flameblade = {
    LABEL: '',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -2,
    BURN: true,
    BURN_TO_APPLY: 1,
    SHOWBURN: false,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 30,
        SHIELD: 30,
        REGEN: 10,
        DAMAGE: 1.2,
        RESIST: 1,
        STEALTH: 1,
        RANGE: 200
    },
    VALUE: 0,
    SIZE: 20,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
    HITS_OWN_TYPE: 'never',
};
exports.sword = {
    PARENT: [exports.genericTank],
    LABEL: 'Sword',
    BODY: {
        FOV: 0.8
    },
    CONTROLLERS: ['canRepel', 'mapAltToFire',], 
    COLOR: 16,
    CONTROLLERS: [],
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
      POSITION: [25,    1.5,      1,     13,     3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [23,    1.5,      1,     13,     3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [21,    1.5,      1,     13,     3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
      POSITION: [19,    1.5,      1,     13,     3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [17,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [15,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [13,    1.5,      1,     13,     3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [11,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [9,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [7,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {   
           POSITION: [5,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
           POSITION: [3,    1.5,      1,     13,      3,      0,     0, ],
         PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild, g.tonsmoredamage, g.tonsmoredamage,]),
            TYPE: exports.bullet,
         }, }, {
      POSITION: [25,    2,      -2,     13,      3,      0,     0, ],
        }, {
      POSITION: [6,    4,      1,     10,      3,      0,     0, ],
        }, {
      POSITION: [1.5,    10,      1,     14,      3,      0,     0, ],
        },
   ],
};
exports.deflectionsheild = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    CONTROLLERS: ['canRepel', 'mapAltToFire',],
    COLOR: 16,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [0.1,    20,      1,     -18,      0,      0,     0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sheild]),
            TYPE: exports.deflection,
            AUTOFIRE: true,
        }, }, {
       POSITION: [4,    20,      1,     -20.7,      0,      0,     0, ],
        },
     ],
};
let swordskl = 11;
exports.warrior = {
    PARENT: [exports.genericTank],
    LABEL: 'Warrior',
   STAT_NAMES: statnames.sword,
  //cut out bullet speed upgrade for this tank 
    SKILL_CAP: [swordskl, swordskl, swordskl, swordskl,  0, swordskl, 0, swordskl, swordskl, swordskl,],
  BODY: {            
        DAMAGE: 0.1,
        SPEED: base.SPEED * 2,
        FOV: base.FOV * 1.2,
    },
    TURRETS: [{ /** SIZE    X       Y     ANGLE    ARC */
        POSITION: [17,      0,      0,     180,    360,   0, ],
        TYPE: exports.deflectionsheild,
    }, {
        POSITION: [20,      0,     0,      90,    360,   0, ],
        TYPE: exports.sword,
    }], 
};
exports.warrior2 = {
    PARENT: [exports.genericTank],
    LABEL: 'Sparton',
   STAT_NAMES: statnames.sword,
  //cut out bullet speed upgrade for this tank
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, 0, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl,],
  BODY: {
        SPEED: base.SPEED * 2,
        FOV: base.FOV * 1.2,
    },
    TURRETS: [{ /** SIZE    X       Y     ANGLE    ARC */
        POSITION: [17,      0,      0,     180,    360,   0, ],
        TYPE: exports.deflectionsheild,
    }, {
        POSITION: [20,      0,     0,      90,    360,   0, ],
        TYPE: exports.sword,
    }],
};
exports.damage = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: '( ͡° ͜ʖ ͡°)',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20.5,  19.5,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni, g.NOWTHATSALOTOFDAMAGE, g.tenxreload]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.hexaswarm = {
    PARENT: [exports.genericTank],
    LABEL: 'Hexa Swarm',
    DANGER: 6,
    GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [18, 7.5, -1.6, 0, 0, 0, 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, {
        POSITION: [18, 7.5, -1.6, 0, 0, 120, 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, {
        POSITION: [18, 7.5, -1.6, 0, 0, 240, 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, {
        POSITION: [18, 7.5, -1.6, 0, 0, 60, 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, {
        POSITION: [18, 7.5, -1.6, 0, 0, 180, 2, ],
        PROPERTIES: { 
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, {
        POSITION: [18, 7.5, -1.6, 0, 0, 300, 2, ],
        PROPERTIES: { 
            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
            TYPE: exports.swarm,
        },
    }, ],
};
// TANK UPGRADES
exports.testbed.UPGRADES_TIER_1 = [exports.testbedPG2, exports.basic, exports.shotgun3, exports.gernader, exports.ayao, exports.doublesheild, exports.lazer, exports.railgun3, exports.srifle, exports.trpnade2, exports.trpnade3, exports.trpnade4, exports.trpnade8, exports.palisade, exports.nadethrower3, exports.expander, exports.accpistol, exports.dank]; // 17/22 
exports.testbedPG2.UPGRADES_TIER_1 = [exports.testbedPG3, exports.basic, exports.gassminer, exports.abasic2, exports.mod_health, exports.quartBack, exports.damage, exports.test99, exports.bluerunner, exports.spikedrunner, exports.portal]; // 14/22
exports.testbedPG3.UPGRADES_TIER_1 = [exports.testbed, exports.deltrablade, exports.waller2, exports.basic]; // 2/22

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.pound, exports.shield, exports.pelletor, exports.director, exports.flare, exports.pistol, exports.shotgun1, exports.medic, exports.auto1, exports.warrior];
        exports.basic.UPGRADES_TIER_2 = [exports.smash];
        exports.basic.UPGRADES_TIER_3 = [exports.single, exports.flamer];
        exports.flamer.UPGRADES_TIER_4 = [exports.corroder, exports.flamer2, exports.flamer3];
        exports.single.UPGRADES_TIER_3 = [exports.gsingle, exports.autosin, exports.hybridsin]; 
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.weirdspike, exports.landmine];
                exports.autosmash.UPGRADES_TIER_4 = [exports.twinautosmash];
                exports.megasmash.UPGRADES_TIER_4 = [exports.megamine];
                exports.landmine.UPGRADES_TIER_4 = [exports.megamine];

    exports.shotgun1.UPGRADES_TIER_2 = [exports.snipeshotgun, exports.bucket, exports.fielder, exports.musketeer, exports.pelletshot, exports.offset, exports.flankshot];
        exports.shotgun1.UPGRADES_TIER_3 = [exports.shotgun2, exports.rocketblast]; 
        exports.bucket.UPGRADES_TIER_3 = [exports.bucket2, exports.buckethy, exports.storm];
        exports.fielder.UPGRADES_TIER_3 = [exports.fielder2, exports.punter, exports.thunder];
        exports.snipeshotgun.UPGRADES_TIER_3 = [exports.assassshotgun, exports.shotguninvis, exports.snipeshotgun4];
        exports.offset.UPGRADES_TIER_3 = [exports.scatter, exports.scatter2, exports.offset2,  exports.burstshot]
        exports.pelletshot.UPGRADES_TIER_3 = [];
        exports.flankshot.UPGRADES_TIER_3 = [exports.trishot];
          
    exports.pistol.UPGRADES_TIER_2 = [exports.pistoltrapper, exports.pistolsniper, exports.fastpistol, exports.nadethrower, exports.fullauto];
        exports.pistolsniper.UPGRADES_TIER_3 = [exports.pistolranger, exports.pistolsniper2, exports.pistolsnipertwin,  exports.musket];
        exports.pistoltrapper.UPGRADES_TIER_3 = [exports.pistoltrapper2, exports.pistoltrapperpound];
        exports.fastpistol.UPGRADES_TIER_3 = [exports.fasterpistol];
        exports.fullauto.UPGRADES_TIER_3 = [exports.fullautosniper, exports.fullautomachine, exports.fullautoflank, exports.fullautomulti];
            exports.fullautomulti.UPGRADES_TIER_4 = [exports.fullautoloose];

    exports.auto1.UPGRADES_TIER_2 = [exports.auto2, exports.auto3, exports.autopound, exports.trapauto];
        exports.auto1.UPGRADES_TIER_3 = [exports.autosmash];
        exports.auto2.UPGRADES_TIER_3 = [exports.auto4];
            exports.auto2.UPGRADES_TIER_4 = [exports.twinautosmash];

    exports.quartBack.UPGRADES_TIER_2 = [exports.caltrop];
        exports.quartBack.UPGRADES_TIER_3 = [exports.quadtrapper];
        exports.caltrop.UPGRADES_TIER_3 = [exports.caltropMini, exports.caltropPound, exports.caltropBent, exports.caltropSwarm, exports.caltropBoomer];

    exports.flare.UPGRADES_TIER_2 = [exports.accelerationsh, exports.basic4, exports.skimmer3,exports.defletor, exports.frost];
        exports.accelerationsh.UPGRADES_TIER_3 = [exports.skimmer, exports.rocketeer, exports.fightershot,  exports.thrustshot, exports.sailor3];
        exports.basic4.UPGRADES_TIER_3 = [exports.basic3, exports.abasic, exports.homingshot];
            exports.abasic.UPGRADES_TIER_4 = [exports.quadabasic]
        exports.skimmer3.UPGRADES_TIER_3 = [exports.skimmer2];
        exports.nadethrower.UPGRADES_TIER_3 = [exports.shockshooter, exports.firecharger, exports.c4placer];
        exports.defletor.UPGRADES_TIER_3 = [exports.snipershield];

    exports.pelletor.UPGRADES_TIER_2 = [exports.pellettriptwin, exports.sailor, exports.bore, exports.puntgun, exports.hewnpelletor, exports.gunner, exports.bulleter];
        exports.bore.UPGRADES_TIER_3 = [exports.gunbore, exports.mbore, exports.commando, exports.hybore, exports.nailgun, exports.bore2];
        exports.puntgun.UPGRADES_TIER_3 = [exports.puntgunmini, exports.puntgunnner, exports.autopuntgun, exports.puntgunlong, exports.puntgun2, exports.fastfire];
        exports.pelletor.UPGRADES_TIER_3 = [exports.overgunner];
        exports.hewnpelletor.UPGRADES_TIER_3 = [exports.heptashot, exports.doublehewn, exports.gsplit, exports.split, exports.hewngunner, exports.ghewngunner];
        exports.pellettriptwin.UPGRADES_TIER_3 = [exports.pelletquintuplet, exports.pellettriptwin2, exports.pellettriptwin3, exports.pellettriptwin4];
        exports.sailor.UPGRADES_TIER_3 = [exports.sailorpunt, exports.sailortrap, exports.sailorxl, exports.sailor2, exports.gunnshi, exports.sailor3, exports.sailor4];
        exports.bulleter.UPGRADES_TIER_3 = [exports.warlord, exports.nailgun, exports.pellettriptwin3]; 

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.flankpound, exports.autopound, exports.artillery, exports.multer, exports.heavymachine];
        exports.destroy.UPGRADES_TIER_3 = [exports.anni, exports.hybrid, exports.shotgun2, exports.hiveshooter, exports.autodestroy, exports.rocketeer, exports.fightershot, exports.skimmer,  exports.skimmer2, exports.harrower, exports.missilet, exports.greifer, exports.manowar];
            exports.hybrid.UPGRADES_TIER_4 = [exports.megahybrid];
        exports.flankpound.UPGRADES_TIER_3 = [exports.conq, exports.heavy3, exports.autoflankp, exports.titan, exports.tripound, exports.poundangle, exports.hexapound];
        exports.autopound.UPGRADES_TIER_3 = [exports.autoflankp, exports.heavy3, exports.autodestroy];
        exports.pound.UPGRADES_TIER_3 = [exports.hotshot, exports.divergent]; 
        exports.multer.UPGRADES_TIER_3 = [exports.bigsniper, exports.Deleter, exports.flankmulter, exports.multer2, exports.multer3];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa, exports.triple, exports.spreadling];
        exports.twin.UPGRADES_TIER_3 = [exports.bentboomer, exports.twinsnipe, exports.twintrap, exports.ghewngunner, exports.match];
        exports.double.UPGRADES_TIER_3 = [exports.tripletwin, exports.split, exports.autodouble, exports.bentdouble];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spread, exports.benthybrid, exports.bentdouble, exports.bentmachine, exports.seek];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.gmissile, exports.hybridgunn, exports.battery, exports.gunnerflank, exports.hewngunner, exports.gunbore, exports.fieldgun, exports.spreadgun];
            exports.machinegunner.UPGRADES_TIER_4 = [exports.spammer];
        exports.triple.UPGRADES_TIER_3 = [exports.quint, exports.tripleangle, exports.puntgunmini];
       exports.spreadling.UPGRADES_TIER_3 = [exports.spread, exports.spreadgun, exports.fieldgun, exports.guard2, exports.spreadlet];

    exports.shield.UPGRADES_TIER_2 = [exports.builder, exports.flanktrap, exports.tritrapper2, exports.boomer,  exports.lilengineer, exports.musketeer, exports.trapper2, exports.shieldmach, exports.caltrop];
        exports.shield.UPGRADES_TIER_3 = [exports.starshoot];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.quadtrapper, exports.minitrap, exports.conq, exports.shield3, exports.twintrap, exports.gladiator, exports.protector, exports.alphacon, exports.guardian];
        exports.boomer.UPGRADES_TIER_3 = [exports.bentboomer, exports.boomertrap, exports.boomer3, exports.heavyboomer, exports.caltropBoomer];
        exports.lilengineer.UPGRADES_TIER_3 = [exports.engineer, exports.builder2, exports.constructor2, exports.architect, exports.draftman, exports.programmer, exports.heavyengineer, exports.pelletorengineer, exports.reworker, exports.reworker2, exports.flareeng];
        exports.tritrapper2.UPGRADES_TIER_3 = [exports.hexatrap, exports.tritrap, exports.quadtrapper, exports.minitrap, exports.twintrap, exports.fortress, exports.fortress2];
        exports.musketeer.UPGRADES_TIER_3 = [exports.musketeer3, exports.shield3, exports.musketeersideshot];
        exports.trapper2.UPGRADES_TIER_3 = [exports.megatrapper2, exports.triarsenal];
        exports.shieldmach.UPGRADES_TIER_3  = [exports.trappermach, exports.shieldmach2];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle, exports.sniper3, exports.snipertriple, exports.bore2, exports.silo, exports.railgun, exports.snipeshotgun, exports.twinsnipe,];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack,];
        exports.assassin.UPGRADES_TIER_3 = [exports.ranger, exports.falcon, exports.autoass, exports.hybridassa, exports.stalker, exports.hunter3, exports.assassin2 ];
        exports.hunter.UPGRADES_TIER_3 = [exports.overhunt, exports.preda, exports.poach, exports.sidewind, exports.huntertrap, exports.hunter3, exports.hunter4, exports.shifter, exports.burstshot];
        exports.rifle.UPGRADES_TIER_3 = [exports.rifle2, exports.hybridrif, exports.stalker, exports.rifletrap, exports.assapellet, exports.spreadsnipe, exports.twinrifle, exports.heavyrifle, exports.unnamed];
        exports.twinsnipe.UPGRADES_TIER_3 = [exports.seek];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner, exports.gatling, exports.twinmachine,exports.blaster, exports.machineflank, exports.automachine, exports.puntgun, exports.assult, exports.heavymachine];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];
        exports.heavymachine.UPGRADES_TIER_3 = [exports.heavymachine2, exports.heavymachine3];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spread, exports.AutoArt, exports.militia, exports.spreadsnipe, exports.artcrusier, exports.gsplit,  exports.cannoneer, exports.artillerymg, exports.fieldgun, exports.siege, exports.heavyart, exports.spreadgun];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.minitrap, exports.automini, exports.hotshot, exports.puntgunlong, exports.silo, exports.minimach, exports.miniflank, exports.railgun];
        exports.gatling.UPGRADES_TIER_3 = [exports.Splasher, exports.halfnhalf, exports.gatlingaccel, exports.halfnhalf2, exports.flankgatling, exports.caliber];
        exports.twinmachine.UPGRADES_TIER_3 = [exports.bentmachine, exports.mach3, exports.machinetri];
        exports.blaster.UPGRADES_TIER_3 = [exports.blastertwin, exports.halfnhalf2, exports.bentmachine, exports.grinder, exports.grinder2, exports.flamer];
            exports.grinder.UPGRADES_TIER_4 = [exports.grinder3, exports.Hflame];
            exports.stream.UPGRADES_TIER_4 = [exports.streamx];
                exports.streamx.UPGRADES_TIER_5 = [exports.pump];
        exports.automachine.UPGRADES_TIER_3 = [ exports.automgflank];
        exports.machineflank.UPGRADES_TIER_3 = [exports.machinetri, exports.automgflank];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.flankpound, exports.machineflank, exports.tritrapper2, exports.raven];
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.surfer, exports.tripleangle, exports.twinangle, exports.poundangle, exports.missilet, exports.manowar, exports.marine];
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hexatrap, exports.hexaswarm, exports.hurricane, exports.hexapound];
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.sniper3, exports.tritrap, exports.banshee, exports.gbasic, exports.mach3];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bushwhack, exports.guntrap, exports.fortress, exports.bomber, exports.conq, exports.autoflankt, exports.huntertrap, exports.commando, exports.puntgunlong, exports.rifletrap, exports.boomertrap];
        exports.raven.UPGRADES_TIER_3 = [exports.falcon, exports.eagle, exports.pentaguard, exports.sparrow, exports.grinder2, exports.sailor4];
            exports.falcon.UPGRADES_TIER_4 = [exports.owl]

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact, exports.bbone];
        exports.director.UPGRADES_TIER_3 = [exports.director2];
        exports.bbone.UPGRADES_TIER_3 = [exports.hybrid, exports.benthybrid, exports.buckethy, exports.hybore, exports.hybridassa, exports.hybridsin, exports.poach, exports.general, exports.hybridrif, exports.hybridgunn, exports.protector];// when you make a lvl 45 hybrid tank, add it to this branch
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.revitalist , exports.autoover, exports.overdrive, exports.overhunt, exports.general, exports.manager, exports.dlord, exports.banshee];
            exports.overlord.UPGRADES_TIER_4 = [exports.overworker, exports.sergeant, exports.revitalizer];
            exports.overdrive.UPGRADES_TIER_4 = [exports.overworker, exports.gundrive, exports.trapdrive, exports.manadrive, exports.drivehunt, exports.driver, exports.autodrive, exports.paratrooper, exports.odrevital]
            exports.overgunner.UPGRADES_TIER_4 = [exports.gundrive, exports.colonel];
            exports.overtrap.UPGRADES_TIER_4 = [exports.trapdrive, exports.deployist];
            exports.manager.UPGRADES_TIER_4 = [exports.manadrive, exports.watcher, exports.cheif];
            exports.banshee.UPGRADES_TIER_4 = [exports.driver, exports.navyist];
            exports.autoover.UPGRADES_TIER_4 = [exports.autodrive, exports.trooper];
            exports.overhunt.UPGRADES_TIER_4 = [exports.drivehunt, exports.corp];
            exports.general.UPGRADES_TIER_4 = [exports.sergeant, exports.paratrooper, exports.colonel, exports.deployist, exports.navyist, exports.trooper, exports.corp, exports.cheif, exports.courtmarsh];
            exports.revitalist.UPGRADES_TIER_4 = [exports.revitalizer, exports.courtmarsh, exports.odrevital];
            exports.courtmarsh.UPGRADES_TIER_5 = [exports.dronemaster];
            exports.odrevital.UPGRADES_TIER_5 = [exports.dronemaster];
            exports.paratrooper.UPGRADES_TIER_5 = [exports.dronemaster];
            exports.dlord.UPGRADES_TIER_5 = [exports.dronegod];
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.surfer, exports.autocruiser, exports.gmissile, exports.gladiator, exports.titan, exports.invader, exports.artcrusier, exports.warlord, exports.sounder,  exports.heavycruiser];
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autolil, exports.snipefact, exports.twinfact, exports.Poundfact, exports.machinefact, exports.trapperfact, exports.flankfact, exports.pelletorfact, exports.dronefact];