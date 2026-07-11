/* ==========================================================================
   STATE MANAGEMENT & CONSTANTS
   ========================================================================== */
const STATE = {
    // Core inputs
    lifeExp: 72.0,
    meanSchool: 8.5,
    expectedSchool: 12.0,
    gni: 12000,
    
    // Inequality Adjusted
    ihdiEnabled: false,
    ineqHealth: 0,
    ineqEducation: 0,
    ineqIncome: 0,

    // Policy target
    targetHdi: 0.800,
    currentPath: 'balanced' // balanced, social, economic
};

// Preset Scenarios
const PRESETS = {
    'very-high': {
        lifeExp: 81.0,
        expectedSchool: 16.0,
        meanSchool: 12.0,
        gni: 45000,
        ihdiEnabled: false,
        ineqHealth: 0,
        ineqEducation: 0,
        ineqIncome: 0
    },
    'medium': {
        lifeExp: 71.0,
        expectedSchool: 12.0,
        meanSchool: 7.5,
        gni: 7000,
        ihdiEnabled: false,
        ineqHealth: 0,
        ineqEducation: 0,
        ineqIncome: 0
    },
    'low': {
        lifeExp: 59.0,
        expectedSchool: 9.0,
        meanSchool: 4.5,
        gni: 1500,
        ihdiEnabled: false,
        ineqHealth: 0,
        ineqEducation: 0,
        ineqIncome: 0
    },
    // Real Countries Data
    'norway': {
        lifeExp: 83.2,
        expectedSchool: 18.2,
        meanSchool: 13.0,
        gni: 66000,
        ihdiEnabled: true,
        ineqHealth: 3,
        ineqEducation: 2,
        ineqIncome: 6
    },
    'japan': {
        lifeExp: 84.8,
        expectedSchool: 15.2,
        meanSchool: 12.8,
        gni: 42000,
        ihdiEnabled: true,
        ineqHealth: 3,
        ineqEducation: 3,
        ineqIncome: 8
    },
    'brazil': {
        lifeExp: 72.8,
        expectedSchool: 15.6,
        meanSchool: 8.3,
        gni: 14600,
        ihdiEnabled: true,
        ineqHealth: 13,
        ineqEducation: 16,
        ineqIncome: 22
    },
    'india': {
        lifeExp: 67.2,
        expectedSchool: 11.9,
        meanSchool: 6.7,
        gni: 6900,
        ihdiEnabled: true,
        ineqHealth: 19,
        ineqEducation: 28,
        ineqIncome: 18
    },
    'kenya': {
        lifeExp: 61.4,
        expectedSchool: 10.7,
        meanSchool: 6.7,
        gni: 4500,
        ihdiEnabled: true,
        ineqHealth: 22,
        ineqEducation: 25,
        ineqIncome: 24
    },
    'niger': {
        lifeExp: 61.6,
        expectedSchool: 7.0,
        meanSchool: 2.1,
        gni: 1200,
        ihdiEnabled: true,
        ineqHealth: 34,
        ineqEducation: 38,
        ineqIncome: 32
    }
};

/* ==========================================================================
   DOM ELEMENTS
   ========================================================================== */
const DOM = {
    // Inputs & Sliders
    lifeExpSlider: document.getElementById('life-exp-slider'),
    lifeExpInput: document.getElementById('life-exp-input'),
    meanSchoolSlider: document.getElementById('mean-school-slider'),
    meanSchoolInput: document.getElementById('mean-school-input'),
    expectedSchoolSlider: document.getElementById('expected-school-slider'),
    expectedSchoolInput: document.getElementById('expected-school-input'),
    gniSlider: document.getElementById('gni-slider'),
    gniInput: document.getElementById('gni-input'),

    // Inequality Toggles & Sliders
    ihdiToggle: document.getElementById('ihdi-toggle'),
    ineqSliders: document.querySelectorAll('.inequality-slider-container'),
    ineqHealthSlider: document.getElementById('ineq-health-slider'),
    ineqHealthVal: document.getElementById('ineq-health-val'),
    ineqEducationSlider: document.getElementById('ineq-education-slider'),
    ineqEducationVal: document.getElementById('ineq-education-val'),
    ineqIncomeSlider: document.getElementById('ineq-income-slider'),
    ineqIncomeVal: document.getElementById('ineq-income-val'),

    // Presets
    presetBtns: document.querySelectorAll('.btn-preset'),
    countryPresets: document.getElementById('country-presets'),

    // Outputs
    gaugeFill: document.getElementById('gauge-fill'),
    hdiScoreVal: document.getElementById('hdi-score-value'),
    hdiTierName: document.getElementById('hdi-tier-name'),
    hdiLabel: document.getElementById('hdi-label'),
    rangeBars: document.querySelectorAll('.range-bar'),

    // Breakdown Elements
    leiValue: document.getElementById('lei-value'),
    leiProgress: document.getElementById('lei-progress'),
    leiNote: document.getElementById('lei-note'),
    
    eiValue: document.getElementById('ei-value'),
    eiProgress: document.getElementById('ei-progress'),
    mysIndexNote: document.getElementById('mys-index-note'),
    eysIndexNote: document.getElementById('eys-index-note'),

    iiValue: document.getElementById('ii-value'),
    iiProgress: document.getElementById('ii-progress'),
    iiNote: document.getElementById('ii-note'),

    // Radar Chart
    canvas: document.getElementById('dimension-radar-chart'),
    bottleneckIndicator: document.getElementById('bottleneck-indicator'),
    bottleneckText: document.getElementById('bottleneck-text'),

    // Policy target Elements
    hdiTargetSlider: document.getElementById('hdi-target-slider'),
    hdiTargetVal: document.getElementById('hdi-target-val'),
    pathTabs: document.querySelectorAll('.tab-btn'),
    pathwayTitle: document.getElementById('pathway-title'),
    pathwayDesc: document.getElementById('pathway-desc'),
    policyTargetsContainer: document.getElementById('policy-targets-container'),

    // Header / Utilities
    themeToggle: document.getElementById('theme-toggle'),
    themeIconDark: document.getElementById('theme-icon-dark'),
    themeIconLight: document.getElementById('theme-icon-light'),
    exportLinkBtn: document.getElementById('export-link'),
    exportReportBtn: document.getElementById('export-report'),
    shareToast: document.getElementById('share-toast'),
    toastMsg: document.getElementById('toast-message')
};

// Canvas 2D Context
const ctx = DOM.canvas.getContext('2d');

/* ==========================================================================
   MATH CALCULATIONS
   ========================================================================== */

/**
 * Normalized Life Expectancy Index
 */
function getHealthIndex(lifeExp) {
    // Bounds: 20 to 85
    return Math.max(0, Math.min(1, (lifeExp - 20) / 65));
}

/**
 * Normalized Education Index
 */
function getEducationIndex(meanSchool, expectedSchool) {
    // Mean School Bounds: 0 to 15
    const mysi = Math.max(0, Math.min(1, meanSchool / 15));
    // Expected School Bounds: 0 to 18
    const eysi = Math.max(0, Math.min(1, expectedSchool / 18));
    // Education Index is arithmetic mean
    return {
        mysi: mysi,
        eysi: eysi,
        ei: (mysi + eysi) / 2
    };
}

/**
 * Normalized Income Index (Log Scale)
 */
function getIncomeIndex(gni) {
    // Bounds: $100 to $75,000
    const lnGni = Math.log(Math.max(100, Math.min(75000, gni)));
    const lnMin = Math.log(100);
    const lnMax = Math.log(75000);
    return Math.max(0, Math.min(1, (lnGni - lnMin) / (lnMax - lnMin)));
}

/**
 * Calculate full HDI stats based on current inputs
 */
function calculateHDI() {
    const healthIndexRaw = getHealthIndex(STATE.lifeExp);
    const eduObj = getEducationIndex(STATE.meanSchool, STATE.expectedSchool);
    const eduIndexRaw = eduObj.ei;
    const incomeIndexRaw = getIncomeIndex(STATE.gni);

    let lei = healthIndexRaw;
    let ei = eduIndexRaw;
    let ii = incomeIndexRaw;

    // Apply inequality discount if enabled
    if (STATE.ihdiEnabled) {
        lei = lei * (1 - STATE.ineqHealth / 100);
        ei = ei * (1 - STATE.ineqEducation / 100);
        ii = ii * (1 - STATE.ineqIncome / 100);
    }

    // Geometric mean
    const hdi = Math.cbrt(lei * ei * ii);

    return {
        hdi: hdi,
        lei: lei,
        leiRaw: healthIndexRaw,
        ei: ei,
        eiRaw: eduIndexRaw,
        mysi: eduObj.mysi,
        eysi: eduObj.eysi,
        ii: ii,
        iiRaw: incomeIndexRaw
    };
}

/* ==========================================================================
   GNI SLIDER INTERPOLATION (LOGARITHMIC TRACK)
   ========================================================================== */

/**
 * Logarithmic mapping from slider (0 - 1000) to GNI ($100 - $75,000)
 */
function sliderToGni(val) {
    // GNI = 100 * 750^(x/1000)
    return Math.round(100 * Math.pow(750, val / 1000));
}

/**
 * Inverse mapping GNI -> Slider value
 */
function gniToSlider(gni) {
    return Math.round(1000 * Math.log(gni / 100) / Math.log(750));
}

/* ==========================================================================
   DASHBOARD UPDATE & RENDERING
   ========================================================================== */

/**
 * Primary UI updater
 */
function updateDashboard() {
    const stats = calculateHDI();
    const score = stats.hdi;

    // 1. Update score numerical displays
    DOM.hdiScoreVal.innerText = score.toFixed(3);
    DOM.leiValue.innerText = stats.lei.toFixed(3);
    DOM.eiValue.innerText = stats.ei.toFixed(3);
    DOM.iiValue.innerText = stats.ii.toFixed(3);

    DOM.leiProgress.style.width = `${stats.lei * 100}%`;
    DOM.eiProgress.style.width = `${stats.ei * 100}%`;
    DOM.iiProgress.style.width = `${stats.ii * 100}%`;

    // Notes
    DOM.leiNote.innerText = `Life Expectancy Index: ${stats.leiRaw.toFixed(3)}${STATE.ihdiEnabled ? ` (Inequality Discount: -${STATE.ineqHealth}%)` : ''}`;
    DOM.mysIndexNote.innerText = `Mean Schooling: ${stats.mysi.toFixed(3)}`;
    DOM.eysIndexNote.innerText = `Expected Schooling: ${stats.eysi.toFixed(3)}`;
    DOM.iiNote.innerText = `Income Index: ${stats.iiRaw.toFixed(3)}${STATE.ihdiEnabled ? ` (Inequality Discount: -${STATE.ineqIncome}%)` : ''}`;
    
    if (STATE.ihdiEnabled) {
        DOM.hdiLabel.innerText = "IHDI SCORE";
        DOM.leiNote.innerHTML += `<br>Adjusted Health Index: <strong>${stats.lei.toFixed(3)}</strong>`;
        DOM.iiNote.innerHTML += `<br>Adjusted Income Index: <strong>${stats.ii.toFixed(3)}</strong>`;
        DOM.mysIndexNote.innerHTML = `MYS Index: ${stats.mysi.toFixed(3)}`;
        DOM.eysIndexNote.innerHTML = `EYS Index: ${stats.eysi.toFixed(3)} (Education Index Discounted: -${STATE.ineqEducation}%)`;
    } else {
        DOM.hdiLabel.innerText = "HDI SCORE";
    }

    // 2. Classify and style development tiers
    let tierClass = 'tier-low';
    let tierText = 'Low Development';
    let activeTier = 'low';
    let themeColor = 'var(--color-low)';

    if (score >= 0.800) {
        tierClass = 'tier-very-high';
        tierText = 'Very High Development';
        activeTier = 'very-high';
        themeColor = 'var(--color-very-high)';
    } else if (score >= 0.700) {
        tierClass = 'tier-high';
        tierText = 'High Development';
        activeTier = 'high';
        themeColor = 'var(--color-high)';
    } else if (score >= 0.550) {
        tierClass = 'tier-medium';
        tierText = 'Medium Development';
        activeTier = 'medium';
        themeColor = 'var(--color-medium)';
    }

    DOM.hdiTierName.className = `tier-indicator ${tierClass}`;
    DOM.hdiTierName.innerText = tierText;

    // Range bar active states
    DOM.rangeBars.forEach(bar => {
        if (bar.dataset.tier === activeTier) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });

    // 3. Update Gauge SVG Fill
    // Arc length is 251.2
    const offset = 251.2 - (251.2 * score);
    DOM.gaugeFill.style.strokeDashoffset = offset;
    DOM.gaugeFill.style.stroke = themeColor;

    // 4. Bottleneck & Gap analysis
    const dimensions = [
        { name: 'Health (LEI)', val: stats.lei },
        { name: 'Education (EI)', val: stats.ei },
        { name: 'Income (II)', val: stats.ii }
    ];
    dimensions.sort((a, b) => a.val - b.val);

    const bottleneck = dimensions[0];
    const strength = dimensions[2];
    const gap = strength.val - bottleneck.val;

    if (gap > 0.12) {
        DOM.bottleneckIndicator.className = "bottleneck-banner";
        DOM.bottleneckText.innerHTML = `<strong>Bottleneck Alert:</strong> ${bottleneck.name} index (${bottleneck.val.toFixed(3)}) is significantly dragging down your score. Focus investments here.`;
    } else {
        DOM.bottleneckIndicator.className = "bottleneck-banner no-bottleneck";
        DOM.bottleneckText.innerHTML = `<strong>Balanced Profile:</strong> Indices are balanced. Proportional development strategies are recommended.`;
    }

    // 5. Draw radar chart
    drawRadarChart(stats.lei, stats.ei, stats.ii, bottleneck.name);

    // 6. Run Pathway calculations
    calculatePathways();
}

/**
 * Draw custom canvas radar chart representing Health, Education, Income normalized index balances
 */
function drawRadarChart(lei, ei, ii, bottleneckName) {
    const w = DOM.canvas.width;
    const h = DOM.canvas.height;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2 + 5;
    const maxRadius = 75;

    // Axes definitions (Angles: straight up, 30 deg, 150 deg)
    const axes = [
        { name: 'Health', angle: -Math.PI / 2, val: lei, color: '#f43f5e' },
        { name: 'Education', angle: Math.PI / 6, val: ei, color: '#6366f1' },
        { name: 'Income', angle: 5 * Math.PI / 6, val: ii, color: '#10b981' }
    ];

    // Read Theme Colors from document computed style (to allow Light Mode support)
    const style = getComputedStyle(document.documentElement);
    const gridColor = style.getPropertyValue('--card-border').trim() || 'rgba(255, 255, 255, 0.1)';
    const textColor = style.getPropertyValue('--text-secondary').trim() || '#94a3b8';

    // Draw background concentric grid concentric triangles (0.25, 0.5, 0.75, 1.0)
    ctx.lineWidth = 1;
    ctx.strokeStyle = gridColor;
    for (let r = 1; r <= 4; r++) {
        const radius = (maxRadius * r) / 4;
        ctx.beginPath();
        axes.forEach((axis, i) => {
            const x = cx + Math.cos(axis.angle) * radius;
            const y = cy + Math.sin(axis.angle) * radius;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.stroke();
    }

    // Draw Axes Lines from Center
    ctx.beginPath();
    axes.forEach(axis => {
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(axis.angle) * maxRadius, cy + Math.sin(axis.angle) * maxRadius);
    });
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = textColor;
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Label Adjustments
    axes.forEach(axis => {
        let labelX = cx + Math.cos(axis.angle) * (maxRadius + 14);
        let labelY = cy + Math.sin(axis.angle) * (maxRadius + 12);
        if (axis.name === 'Health') labelY -= 2;
        if (axis.name === 'Education') { labelX += 2; labelY += 2; }
        if (axis.name === 'Income') { labelX -= 2; labelY += 2; }
        ctx.fillText(axis.name, labelX, labelY);
    });

    // Draw Filled Polygon (Active Simulation Index Area)
    ctx.beginPath();
    axes.forEach((axis, i) => {
        const rad = axis.val * maxRadius;
        const x = cx + Math.cos(axis.angle) * rad;
        const y = cy + Math.sin(axis.angle) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
    
    // Transparent Area Fill
    ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw dots at index vertices
    axes.forEach(axis => {
        const rad = axis.val * maxRadius;
        const x = cx + Math.cos(axis.angle) * rad;
        const y = cy + Math.sin(axis.angle) * rad;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        
        // Highlight bottleneck dot
        if (bottleneckName.includes(axis.name)) {
            ctx.fillStyle = '#ef4444'; // Red for Bottleneck
            ctx.stroke();
            // Glow effect around bottleneck dot
            ctx.beginPath();
            ctx.arc(x, y, 7, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else {
            ctx.fillStyle = axis.color;
            ctx.stroke();
        }
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, 2 * Math.PI);
        ctx.fill();
    });
}

/* ==========================================================================
   POLICY GOAL PATHWAY PLANNER ("WHAT-IF" ENGINE)
   ========================================================================== */

/**
 * Core Policy Planner
 */
function calculatePathways() {
    const target = STATE.targetHdi;
    const stats = calculateHDI();
    const current = stats.hdi;

    // Select tab
    let path = STATE.currentPath;

    let textTitle = "";
    let textDesc = "";
    let solutions = [];

    // Helper: translate indices back to raw units
    function leiToLifeExp(lei) { return 20 + lei * 65; }
    function iiToGni(ii) { return Math.exp(ii * (Math.log(75000) - Math.log(100)) + Math.log(100)); }

    if (current >= target) {
        // Target already achieved
        DOM.policyTargetsContainer.innerHTML = `
            <div class="bottleneck-banner no-bottleneck">
                <span style="font-size:0.75rem;">🌟 Target HDI of ${target.toFixed(3)} is already achieved under the current setup!</span>
            </div>
        `;
        DOM.pathwayTitle.innerText = "Target Achieved";
        DOM.pathwayDesc.innerText = "Your simulated development scores are already equal to or exceed the targets set.";
        return;
    }

    if (path === 'balanced') {
        textTitle = "Balanced Policy Pathway";
        textDesc = "Distributes necessary development effort proportionally across all index dimensions. This is usually the most stable and realistic pathway for a developing nation.";

        // We scale all indexes by k such that Math.cbrt(k*lei * k*ei * k*ii) = target => k * current = target => k = target / current
        let k = target / current;

        // Scale
        let targetLei = Math.min(1, stats.lei * k);
        let targetEi = Math.min(1, stats.ei * k);
        let targetIi = Math.min(1, stats.ii * k);

        // Solver adjustment loop: If one index is capped at 1.0, redistribute multiplier to others
        for (let i = 0; i < 5; i++) {
            const product = targetLei * targetEi * targetIi;
            const diff = Math.cbrt(product) - target;
            if (Math.abs(diff) < 0.0001) break;
            
            const adjFactor = Math.cbrt(target / Math.cbrt(product));
            if (targetLei < 1.0) targetLei = Math.min(1.0, targetLei * adjFactor);
            if (targetEi < 1.0) targetEi = Math.min(1.0, targetEi * adjFactor);
            if (targetIi < 1.0) targetIi = Math.min(1.0, targetIi * adjFactor);
        }

        // Convert back
        let rawLifeExp = leiToLifeExp(targetLei);
        let rawGni = iiToGni(targetIi);

        // For schooling: Scale both MYS and EYS proportionally
        // We know Ei = (MYSI + EYSI)/2. If we scale Ei by targetEi / stats.ei, let's scale both MYSI and EYSI by the same factor
        let schoolScale = targetEi / stats.ei;
        let rawMYS = Math.min(15, STATE.meanSchool * schoolScale);
        let rawEYS = Math.min(18, STATE.expectedSchool * schoolScale);

        solutions = [
            { dim: 'health', name: 'Life Expectancy', targetVal: `${rawLifeExp.toFixed(1)} yrs`, change: rawLifeExp - STATE.lifeExp },
            { dim: 'education', name: 'Mean / Expected Schooling', targetVal: `${rawMYS.toFixed(1)} / ${rawEYS.toFixed(1)} yrs`, change: (rawMYS + rawEYS) - (STATE.meanSchool + STATE.expectedSchool) },
            { dim: 'income', name: 'GNI per Capita (PPP)', targetVal: `$${Math.round(rawGni).toLocaleString()}`, change: rawGni - STATE.gni }
        ];

    } else if (path === 'social') {
        textTitle = "Social & Human Capital First";
        textDesc = "Maintains the current economic output level (GNI is kept constant) and achieves the HDI target purely through aggressive social investments in healthcare and schools.";

        // GNI constant, so Income index stays constant
        const targetIi = stats.ii;
        
        // We need targetLei * targetEi = target^3 / targetIi
        const requiredSocialProduct = Math.pow(target, 3) / targetIi;

        if (requiredSocialProduct > 1.0) {
            // Social dimension alone cannot achieve target because even if Health and Education indices were 1.0, HDI would be cbrt(1 * 1 * ii) < target.
            DOM.policyTargetsContainer.innerHTML = `
                <div class="bottleneck-banner">
                    <span style="font-size:0.7rem;">⚠️ Mathematically impossible to reach target ${target.toFixed(3)} with current GNI levels. Increase GNI per capita to lift standard of living boundaries.</span>
                </div>
            `;
            DOM.pathwayTitle.innerText = "Social Focus Plan";
            DOM.pathwayDesc.innerText = "Investments in healthcare and schooling alone are insufficient if basic GNI/economic indicators remain at their current baseline.";
            return;
        }

        // We scale Health and Education indices by k
        const currentSocialProduct = stats.lei * stats.ei;
        const k = Math.sqrt(requiredSocialProduct / currentSocialProduct);

        let targetLei = Math.min(1.0, stats.lei * k);
        let targetEi = Math.min(1.0, stats.ei * k);

        // Capping correction loop
        for (let i = 0; i < 5; i++) {
            const product = targetLei * targetEi * targetIi;
            const diff = Math.cbrt(product) - target;
            if (Math.abs(diff) < 0.0001) break;
            
            const adjFactor = Math.sqrt(Math.pow(target, 3) / (targetLei * targetEi * targetIi));
            if (targetLei < 1.0) targetLei = Math.min(1.0, targetLei * adjFactor);
            if (targetEi < 1.0) targetEi = Math.min(1.0, targetEi * adjFactor);
        }

        let rawLifeExp = leiToLifeExp(targetLei);
        let schoolScale = targetEi / stats.ei;
        let rawMYS = Math.min(15, STATE.meanSchool * schoolScale);
        let rawEYS = Math.min(18, STATE.expectedSchool * schoolScale);

        solutions = [
            { dim: 'health', name: 'Life Expectancy', targetVal: `${rawLifeExp.toFixed(1)} yrs`, change: rawLifeExp - STATE.lifeExp },
            { dim: 'education', name: 'Mean / Expected Schooling', targetVal: `${rawMYS.toFixed(1)} / ${rawEYS.toFixed(1)} yrs`, change: (rawMYS + rawEYS) - (STATE.meanSchool + STATE.expectedSchool) },
            { dim: 'income', name: 'GNI per Capita (PPP)', targetVal: `$${Math.round(STATE.gni).toLocaleString()}`, change: 0 }
        ];

    } else if (path === 'economic') {
        textTitle = "Economic & GDP Focused Pathway";
        textDesc = "Maintains health policies and education standards at current baselines, focusing purely on economic policy and rapid GDP growth to reach the development target.";

        // Health and Education indices constant
        const targetLei = stats.lei;
        const targetEi = stats.ei;

        // We need targetIi = target^3 / (targetLei * targetEi)
        const targetIi = Math.pow(target, 3) / (targetLei * targetEi);

        if (targetIi > 1.0) {
            // Cannot be achieved purely through economic means (cap of 1.0, i.e., $75,000 GNI is reached and we're still short of target)
            DOM.policyTargetsContainer.innerHTML = `
                <div class="bottleneck-banner">
                    <span style="font-size:0.7rem;">⚠️ Target unreachable via economic growth alone. Even with GNI capped at $75,000, low health/education standards prevent achieving the target. Social investments are required.</span>
                </div>
            `;
            DOM.pathwayTitle.innerText = "Economic Focus Plan";
            DOM.pathwayDesc.innerText = "GNI increases alone cannot compensate for critical deficiencies in health infrastructure and schooling years.";
            return;
        }

        const rawGni = iiToGni(targetIi);

        solutions = [
            { dim: 'health', name: 'Life Expectancy', targetVal: `${STATE.lifeExp.toFixed(1)} yrs`, change: 0 },
            { dim: 'education', name: 'Mean / Expected Schooling', targetVal: `${STATE.meanSchool.toFixed(1)} / ${STATE.expectedSchool.toFixed(1)} yrs`, change: 0 },
            { dim: 'income', name: 'GNI per Capita (PPP)', targetVal: `$${Math.round(rawGni).toLocaleString()}`, change: rawGni - STATE.gni }
        ];
    }

    DOM.pathwayTitle.innerText = textTitle;
    DOM.pathwayDesc.innerText = textDesc;

    // Render solutions list
    DOM.policyTargetsContainer.innerHTML = "";
    solutions.forEach(sol => {
        let changeClass = "change-none";
        let changeText = "No Change";

        if (sol.change > 0.05) {
            changeClass = "change-up";
            changeText = `+${sol.dim === 'income' ? '$' + Math.round(sol.change).toLocaleString() : sol.change.toFixed(1)}`;
        } else if (sol.change < -0.05) {
            changeClass = "change-down";
            changeText = `-${sol.dim === 'income' ? '$' + Math.round(Math.abs(sol.change)).toLocaleString() : Math.abs(sol.change).toFixed(1)}`;
        }

        DOM.policyTargetsContainer.innerHTML += `
            <div class="policy-target-item p-${sol.dim}">
                <div class="policy-label-block">
                    <span class="p-dim-title">${sol.dim.toUpperCase()} SECTOR</span>
                    <span class="p-dim-detail">${sol.name}</span>
                </div>
                <div class="policy-val-block">
                    <span class="p-target-val">${sol.targetVal}</span>
                    <span class="p-target-change ${changeClass}">${changeText}</span>
                </div>
            </div>
        `;
    });
}

/* ==========================================================================
   EVENT HANDLERS & BINDINGS
   ========================================================================== */

/**
 * Apply input field updates back to STATE
 */
function handleInputChange(id, val) {
    let numVal = parseFloat(val);
    if (isNaN(numVal)) return;

    if (id === 'life-exp') {
        STATE.lifeExp = Math.max(20, Math.min(85, numVal));
        DOM.lifeExpSlider.value = STATE.lifeExp;
        DOM.lifeExpInput.value = STATE.lifeExp.toFixed(1);
    } else if (id === 'mean-school') {
        STATE.meanSchool = Math.max(0, Math.min(15, numVal));
        DOM.meanSchoolSlider.value = STATE.meanSchool;
        DOM.meanSchoolInput.value = STATE.meanSchool.toFixed(1);
    } else if (id === 'expected-school') {
        STATE.expectedSchool = Math.max(0, Math.min(18, numVal));
        DOM.expectedSchoolSlider.value = STATE.expectedSchool;
        DOM.expectedSchoolInput.value = STATE.expectedSchool.toFixed(1);
    } else if (id === 'gni') {
        STATE.gni = Math.max(100, Math.min(75000, numVal));
        DOM.gniSlider.value = gniToSlider(STATE.gni);
        DOM.gniInput.value = Math.round(STATE.gni);
    } else if (id === 'ineq-health') {
        STATE.ineqHealth = Math.max(0, Math.min(50, numVal));
        DOM.ineqHealthSlider.value = STATE.ineqHealth;
        DOM.ineqHealthVal.innerText = `${STATE.ineqHealth}%`;
    } else if (id === 'ineq-education') {
        STATE.ineqEducation = Math.max(0, Math.min(50, numVal));
        DOM.ineqEducationSlider.value = STATE.ineqEducation;
        DOM.ineqEducationVal.innerText = `${STATE.ineqEducation}%`;
    } else if (id === 'ineq-income') {
        STATE.ineqIncome = Math.max(0, Math.min(50, numVal));
        DOM.ineqIncomeSlider.value = STATE.ineqIncome;
        DOM.ineqIncomeVal.innerText = `${STATE.ineqIncome}%`;
    }

    updateDashboard();
}

/**
 * Bind DOM events
 */
function bindEvents() {
    // 1. Life Expectancy
    DOM.lifeExpSlider.addEventListener('input', e => handleInputChange('life-exp', e.target.value));
    DOM.lifeExpInput.addEventListener('change', e => handleInputChange('life-exp', e.target.value));

    // 2. Mean Schooling
    DOM.meanSchoolSlider.addEventListener('input', e => handleInputChange('mean-school', e.target.value));
    DOM.meanSchoolInput.addEventListener('change', e => handleInputChange('mean-school', e.target.value));

    // 3. Expected Schooling
    DOM.expectedSchoolSlider.addEventListener('input', e => handleInputChange('expected-school', e.target.value));
    DOM.expectedSchoolInput.addEventListener('change', e => handleInputChange('expected-school', e.target.value));

    // 4. GNI (Uses special sliderToGni mapping)
    DOM.gniSlider.addEventListener('input', e => {
        const rawGni = sliderToGni(parseFloat(e.target.value));
        STATE.gni = rawGni;
        DOM.gniInput.value = rawGni;
        updateDashboard();
    });
    DOM.gniInput.addEventListener('change', e => handleInputChange('gni', e.target.value));

    // 5. Inequality Checkbox & Sliders
    DOM.ihdiToggle.addEventListener('change', e => {
        STATE.ihdiEnabled = e.target.checked;
        DOM.ineqSliders.forEach(el => {
            if (STATE.ihdiEnabled) el.classList.remove('hidden');
            else el.classList.add('hidden');
        });
        updateDashboard();
    });

    DOM.ineqHealthSlider.addEventListener('input', e => handleInputChange('ineq-health', e.target.value));
    DOM.ineqEducationSlider.addEventListener('input', e => handleInputChange('ineq-education', e.target.value));
    DOM.ineqIncomeSlider.addEventListener('input', e => handleInputChange('ineq-income', e.target.value));

    // 6. Presets click
    DOM.presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const presetName = btn.dataset.preset;
            loadPreset(presetName);
            // Clear country dropdown
            DOM.countryPresets.value = "";
            
            // Highlight active preset
            DOM.presetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 7. Country Presets selection
    DOM.countryPresets.addEventListener('change', e => {
        const countryVal = e.target.value;
        if (countryVal) {
            loadPreset(countryVal);
            // Remove highlight preset buttons
            DOM.presetBtns.forEach(b => b.classList.remove('active'));
        }
    });

    // 8. Policy Goal target slider
    DOM.hdiTargetSlider.addEventListener('input', e => {
        const targetVal = parseFloat(e.target.value);
        STATE.targetHdi = targetVal;
        DOM.hdiTargetVal.innerText = targetVal.toFixed(3);
        calculatePathways();
    });

    // 9. Policy pathways tabs toggle
    DOM.pathTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.pathTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            STATE.currentPath = tab.dataset.path;
            calculatePathways();
        });
    });

    // 10. Theme toggle
    DOM.themeToggle.addEventListener('click', toggleTheme);

    // 11. Sharing Link creation
    DOM.exportLinkBtn.addEventListener('click', generateShareLink);

    // 12. Export report download
    DOM.exportReportBtn.addEventListener('click', downloadReportCard);
}

/**
 * Load predefined parameters into state and update sliders
 */
function loadPreset(name) {
    const data = PRESETS[name];
    if (!data) return;

    STATE.lifeExp = data.lifeExp;
    STATE.expectedSchool = data.expectedSchool;
    STATE.meanSchool = data.meanSchool;
    STATE.gni = data.gni;
    STATE.ihdiEnabled = data.ihdiEnabled;

    if (data.ihdiEnabled) {
        STATE.ineqHealth = data.ineqHealth;
        STATE.ineqEducation = data.ineqEducation;
        STATE.ineqIncome = data.ineqIncome;
    } else {
        STATE.ineqHealth = 0;
        STATE.ineqEducation = 0;
        STATE.ineqIncome = 0;
    }

    // Set UI values
    DOM.lifeExpSlider.value = STATE.lifeExp;
    DOM.lifeExpInput.value = STATE.lifeExp.toFixed(1);
    
    DOM.meanSchoolSlider.value = STATE.meanSchool;
    DOM.meanSchoolInput.value = STATE.meanSchool.toFixed(1);

    DOM.expectedSchoolSlider.value = STATE.expectedSchool;
    DOM.expectedSchoolInput.value = STATE.expectedSchool.toFixed(1);

    DOM.gniSlider.value = gniToSlider(STATE.gni);
    DOM.gniInput.value = Math.round(STATE.gni);

    DOM.ihdiToggle.checked = STATE.ihdiEnabled;
    DOM.ineqSliders.forEach(el => {
        if (STATE.ihdiEnabled) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });

    DOM.ineqHealthSlider.value = STATE.ineqHealth;
    DOM.ineqHealthVal.innerText = `${STATE.ineqHealth}%`;

    DOM.ineqEducationSlider.value = STATE.ineqEducation;
    DOM.ineqEducationVal.innerText = `${STATE.ineqEducation}%`;

    DOM.ineqIncomeSlider.value = STATE.ineqIncome;
    DOM.ineqIncomeVal.innerText = `${STATE.ineqIncome}%`;

    updateDashboard();
}

/* ==========================================================================
   THEMING & UTILITIES
   ========================================================================== */

/**
 * Toggle Light vs Dark Theme custom variables
 */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.setAttribute('data-theme', 'light');
        DOM.themeIconDark.classList.add('hidden');
        DOM.themeIconLight.classList.remove('hidden');
    } else {
        html.setAttribute('data-theme', 'dark');
        DOM.themeIconDark.classList.remove('hidden');
        DOM.themeIconLight.classList.add('hidden');
    }
    // Re-draw radar chart because text colors change
    updateDashboard();
}

/**
 * Toast helper alert
 */
function showToast(message) {
    DOM.toastMsg.innerText = message;
    DOM.shareToast.classList.remove('hidden');
    
    // Animate out after 2.5s
    setTimeout(() => {
        DOM.shareToast.classList.add('hidden');
    }, 2500);
}

/**
 * Generate a shareable URL containing base64 simulation arguments
 */
function generateShareLink() {
    try {
        const payload = JSON.stringify({
            le: STATE.lifeExp,
            ms: STATE.meanSchool,
            es: STATE.expectedSchool,
            g: STATE.gni,
            ih: STATE.ihdiEnabled,
            h_in: STATE.ineqHealth,
            e_in: STATE.ineqEducation,
            i_in: STATE.ineqIncome,
            t: STATE.targetHdi
        });
        const encoded = btoa(payload);
        const shareUrl = `${window.location.origin}${window.location.pathname}#data=${encoded}`;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            showToast("Shareable simulation link copied to clipboard!");
        }).catch(() => {
            showToast("Failed to copy link automatically. Copy URL from address bar.");
        });
    } catch(err) {
        showToast("Error packing simulation configuration.");
    }
}

/**
 * Read sharing hash arguments on initial load
 */
function loadHashScenario() {
    const hash = window.location.hash;
    if (hash.startsWith('#data=')) {
        try {
            const raw = hash.replace('#data=', '');
            const decoded = atob(raw);
            const data = JSON.parse(decoded);

            STATE.lifeExp = data.le;
            STATE.meanSchool = data.ms;
            STATE.expectedSchool = data.es;
            STATE.gni = data.g;
            STATE.ihdiEnabled = data.ih;
            STATE.ineqHealth = data.h_in || 0;
            STATE.ineqEducation = data.e_in || 0;
            STATE.ineqIncome = data.i_in || 0;
            STATE.targetHdi = data.t || 0.800;

            // Load values to UI controls
            DOM.lifeExpSlider.value = STATE.lifeExp;
            DOM.lifeExpInput.value = STATE.lifeExp.toFixed(1);
            
            DOM.meanSchoolSlider.value = STATE.meanSchool;
            DOM.meanSchoolInput.value = STATE.meanSchool.toFixed(1);

            DOM.expectedSchoolSlider.value = STATE.expectedSchool;
            DOM.expectedSchoolInput.value = STATE.expectedSchool.toFixed(1);

            DOM.gniSlider.value = gniToSlider(STATE.gni);
            DOM.gniInput.value = Math.round(STATE.gni);

            DOM.ihdiToggle.checked = STATE.ihdiEnabled;
            DOM.ineqSliders.forEach(el => {
                if (STATE.ihdiEnabled) el.classList.remove('hidden');
                else el.classList.add('hidden');
            });

            DOM.ineqHealthSlider.value = STATE.ineqHealth;
            DOM.ineqHealthVal.innerText = `${STATE.ineqHealth}%`;

            DOM.ineqEducationSlider.value = STATE.ineqEducation;
            DOM.ineqEducationVal.innerText = `${STATE.ineqEducation}%`;

            DOM.ineqIncomeSlider.value = STATE.ineqIncome;
            DOM.ineqIncomeVal.innerText = `${STATE.ineqIncome}%`;

            DOM.hdiTargetSlider.value = STATE.targetHdi;
            DOM.hdiTargetVal.innerText = STATE.targetHdi.toFixed(3);

            updateDashboard();
            showToast("Shared scenario configuration successfully loaded!");
        } catch (err) {
            console.error("Hash reading error: ", err);
        }
    }
}

/**
 * Format report details and trigger txt file download
 */
function downloadReportCard() {
    const stats = calculateHDI();
    const isI = STATE.ihdiEnabled;
    const typeLabel = isI ? "Inequality-Adjusted Human Development Index (IHDI)" : "Human Development Index (HDI)";
    
    let report = `========================================================================
HUMAN DEVELOPMENT INDEX (HDI) REPORT CARD
Generated on: ${new Date().toLocaleString()}
========================================================================

Simulation Profile Details:
----------------------------
Life Expectancy at Birth       : ${STATE.lifeExp.toFixed(1)} years
Mean Years of Schooling        : ${STATE.meanSchool.toFixed(1)} years
Expected Years of Schooling    : ${STATE.expectedSchool.toFixed(1)} years
GNI per Capita (PPP $)        : $${STATE.gni.toLocaleString()}

Inequality Discounts (IHDI Enabled: ${isI ? 'Yes' : 'No'}):
----------------------------------------
Health Inequality Discount     : ${STATE.ineqHealth}%
Education Inequality Discount  : ${STATE.ineqEducation}%
Income Inequality Discount     : ${STATE.ineqIncome}%

Standard Dimension Index Scores:
--------------------------------
Health Index (LEI)             : ${stats.leiRaw.toFixed(3)}
Education Index (EI)           : ${stats.eiRaw.toFixed(3)}
  - Mean Schooling Index       : ${stats.mysi.toFixed(3)}
  - Expected Schooling Index   : ${stats.eysi.toFixed(3)}
Income Index (II)              : ${stats.iiRaw.toFixed(3)}

${isI ? `Inequality-Adjusted Index Scores (IHDI):
------------------------------------------
Adjusted Health Index (LEI)    : ${stats.lei.toFixed(3)}
Adjusted Education Index (EI)  : ${stats.ei.toFixed(3)}
Adjusted Income Index (II)     : ${stats.ii.toFixed(3)}` : ''}

========================================================================
FINAL COMPOSITE SCORE          : ${stats.hdi.toFixed(3)}
Development Classification     : ${DOM.hdiTierName.innerText}
========================================================================

Policy Recommendations:
-----------------------
- Lowest Performing Sector    : ${stats.lei < stats.ei && stats.lei < stats.ii ? 'Health' : (stats.ei < stats.ii ? 'Education' : 'Standard of Living / Income')}
- Suggested Focus Area        : Target policy improvements to resolve structural bottleneck.

Methodology Note:
The HDI computes index scores across dimensions between 0 and 1, normalising metrics
against predefined global bounds, and calculates their geometric mean.
The Inequality-Adjusted HDI (IHDI) discounts each dimension's average value
according to its level of social inequality.

------------------------------------------------------------------------
HDI Simulator Project - Premium Development Dashboard.
========================================================================`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hdi-report-card-${stats.hdi.toFixed(3)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    // Default initial run - Load medium preset or check hash scenario
    loadPreset('medium');
    loadHashScenario();
    // Check if window hash changes dynamically
    window.addEventListener('hashchange', loadHashScenario);
});
