// 预设配置管理器
const PRESETS = {
    // 1. 新 Preset 1 (使用的是原 Preset 4 的数据：红色圆点)
    preset1: {
        name: 'Preset 1', // 名称改为 1
        parameters: {
            // Geometry
            width: 1004,
            size: 0.85,
            spacing: 0,
            radius: 100,
            slant: 100,
            pixelSubdivision: 0,
            
            showGrid: true,

            // Grid Layout (Custom Logic: Squeezed center)
            colPositions: [0, 0.22, 0.44, 0.56, 0.78, 1],
            rowPositions: [0, 0.25, 0.38, 0.48, 0.52, 0.62, 0.75, 1],

            // Depth & Effects
            gradientAngleOffset: 0,
            copies: {
                count: 1,
                offset: {
                    scale: 0,
                    x: 0,
                    y: 0,
                }
            },
            charScaleVariation: 0,
            noise: 0,
            waveAmplitude: 0,
            waveFrequency: 0,

            // Color
            offet0: 0,
            offet1: 200,
            offet2: 100,
            
            pixelShape: 'circle',
            gradientType: 'linear',
            
            color0: '#FF94EB', // Red
            color1: '#000000', // Dark Olive/Yellow-Green
            color2: '#050505', // Almost Black
            
            showNegativeSpace: true,
            // Zero Pixels colors (Hidden or Visible depending on UI state)
            zeroColor0: '#D9D9D9', // Light Grey
            zeroColor1: '#D9D9D9', // Very Light Grey
            zeroColor2: '#D9D9D9', // Medium Grey

            // Zero Pixels Offsets (important for the sliders to move)
            zeroOffet0: 20, 
            zeroOffet1: 40,
            zeroOffet2: 60,
            
            backgroundColor: '#000000' // Black Background
            
        }
    },
    // 2. Preset 2 保持不变
    preset2: {
        name: 'Preset 2',
        parameters: {
            // Geometry
            width: 1004,
            size: 1.05,
            spacing: 150,
            radius: 101,
            slant: 0,
            gradientRepetition: 1,
            pixelSubdivision: 0,

            showGrid: true,
            randomGrid: true, 

            // Depth & Effects
            gradientAngleOffset: 0,
            copies: {
                count: 1,
                offset: {
                    scale: 0,
                    x: 0,
                    y: 0,
                }
            },
            charScaleVariation: 0,
            noise: 0,
            waveAmplitude: 0,
            waveFrequency: 10,

            // Color
            offet0: 25,
            offet1: 20.84,
            offet2: 100,
            
            pixelShape: 'square',
            gradientType: 'linear',
            
            color0: '#000000', // Black
            color1: '#FFFFFF', // White
            color2: 'hsla(0, 0%, 0%, 0)', // Transparent
            
            backgroundColor: '#ffffff',
            
            // Auto-play animation
            _animates: ['parameters.offet1']
        }
    },
    // 3. Preset 3 保持不变
    preset3: {
        name: 'Preset 3',
        parameters: {
            // Geometry
            width: 918,
            size: 1.1,
            spacing: 312,
            radius: 253,
            slant: 0,
            pixelSubdivision: 0,
            
            showGrid: true,
            randomGrid: false, 
            
            // Depth & Effects
            gradientAngleOffset: 285.01,
            copies: {
                count: 1, 
                offset: {
                    scale: -10, 
                    x: 0,
                    y: 0,
                }
            },
            charScaleVariation: 84,
            noise: 0,
            waveAmplitude: 0,
            waveFrequency: 10,

            // Color
            offet0: 18,
            offet1: 0,
            offet2: 100,
            
            pixelShape: 'circle',
            gradientType: 'radial',
            
            color0: '#000000',
            color1: '#FFFFFF',
            color2: '#FFFFFF',
            
            backgroundColor: '#00B140', // Green Background
            
            // Auto-play list
            _animates: ['parameters.gradientAngleOffset']
        }
    },
    // 4. 新 Preset 4 (使用的是原 Preset 1 的数据：绿色方块)
    preset4: {
        name: 'Preset 4', // 名称改为 4
        parameters: {
            // Geometry
            width: 989,
            size: 0.95,
            spacing: 214.9,
            radius: 100.3,
            slant: 0,
            pixelSubdivision: 0,
            gradientRepetition: 1,
            
            showGrid: true,
            randomGrid: false, 

            // Depth & Effects
            gradientAngleOffset: 0,
            copies: {
                count: 16,
                offset: {
                    scale: 10,
                    x: 0,
                    y: 0,
                }
            },
            charScaleVariation: 0,
            noise: 0,
            waveAmplitude: 0,
            waveFrequency: 0,

            // Color
            offet0: 1,
            offet1: 66,
            offet2: 56,
            
            pixelShape: 'square',
            gradientType: 'linear', 
            
            color0: '#bbff00',
            color1: '#001fbd', // Transparent
            color2: 'hsl(0, 0%, 0%)', // Transparent

            // Zero Pixels colors
            zeroColor0: 'hsla(0, 0%, 0%, 0)',
            zeroColor1: 'hsla(0, 0%, 0%, 0)',
            zeroColor2: 'hsla(0, 0%, 0%, 0)',
            
            backgroundColor: '#000000',
            
            _animates: []
        }
    },
    // 5. Preset 5 保持不变
    preset5: {
        name: 'Preset 5',
        parameters: {
            spacing: 389,
            gradientAngleOffset: 0,
            width: 950,
            radius: 266,
            size: 1,
            copies: {
                count: 1,
                offset: {
                    scale: -9,
                    x: 0,
                    y: 0,
                }
            },
            offet0: 20,
            offet1: 200,
            offet2: 60,
            characterScaleVariation: 0,
            showGrid: true,
            pixelShape: 'square',
            color0: 'hsl(0, 71%, 26%)', // Yellow
            color1: 'hsla(299, 99%, 70%, 1.00)', // Purple
            color2: 'hsla(0, 0%, 0%, 1.00)', // Black
            backgroundColor: '#000000'
        }
    },
    // 6. Preset 6 保持不变
    preset6: {
        name: 'Preset 6',
        parameters: {
            // Geometry
            width: 1139,
            size: 1,
            spacing: 161,
            radius: 88,
            slant: 0,
            pixelSubdivision: 0,
            
            showGrid: true,
            randomGrid: false, 

            // Depth & Effects
            gradientAngleOffset: 0,
            copies: {
                count: 13, 
                offset: {
                    scale: -2, 
                    x: -35,
                    y: 0,
                }
            },
            charScaleVariation: 0,
            noise: 0,
            waveAmplitude: 0,
            waveFrequency: 10,

            // Color
            offet0: 58,
            offet1: 0,
            offet2: 87,
            
            pixelShape: 'square',
            gradientType: 'linear',
            
            color0: '#AEAEAE', // Light Grey
            color1: '#000000', // Black
            color2: '#000000', // Black
            
            backgroundColor: '#000000'
        }
    }
};

function getContrastColor(hexColor) {
    if (!hexColor) return '#FFFFFF';
    if (hexColor.length === 4) {
        hexColor = '#' + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3];
    }
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
}

// 应用预设
function applyPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    // 更新所有参数
    const params = preset.parameters;
    
    if (bitmapFont && bitmapFont.parameters) {
        // Geometry
        bitmapFont.parameters.spacing = params.spacing;
        bitmapFont.parameters.width = params.width;
        bitmapFont.parameters.radius = params.radius;
        bitmapFont.parameters.size = params.size || 1;
        bitmapFont.parameters.pixelSubdivision = params.pixelSubdivision || 0;
        bitmapFont.parameters.slant = params.slant || 0;
        bitmapFont.parameters.gradientRepetition = params.gradientRepetition || 1;
        bitmapFont.parameters.showGrid = params.showGrid !== undefined ? params.showGrid : true;

        // Depth & Effects
        bitmapFont.parameters.gradientAngleOffset = params.gradientAngleOffset;
        bitmapFont.parameters.copies = JSON.parse(JSON.stringify(params.copies));
        bitmapFont.parameters.charScaleVariation = params.charScaleVariation || 0;
        bitmapFont.parameters.noise = params.noise || 0;
        bitmapFont.parameters.waveAmplitude = params.waveAmplitude || 0;
        bitmapFont.parameters.waveFrequency = params.waveFrequency || 0;
        
        // Colors
        bitmapFont.parameters.offet0 = params.offet0;
        bitmapFont.parameters.offet1 = params.offet1;
        bitmapFont.parameters.offet2 = params.offet2;
        
        bitmapFont.parameters.pixelShape = params.pixelShape;
        bitmapFont.parameters.gradientType = params.gradientType; 

        bitmapFont.parameters.color0 = params.color0;
        bitmapFont.parameters.color1 = params.color1;
        bitmapFont.parameters.color2 = params.color2;
        bitmapFont.parameters.backgroundColor = params.backgroundColor;

        // Apply Zero Pixels colors
        if (params.zeroColor0) bitmapFont.parameters.zeroColor0 = params.zeroColor0;
        if (params.zeroColor1) bitmapFont.parameters.zeroColor1 = params.zeroColor1;
        if (params.zeroColor2) bitmapFont.parameters.zeroColor2 = params.zeroColor2;
        // 👇👇👇【新增这段代码】👇👇👇
        // 必须手动把预设里的开关状态，同步到全局参数里
        if (params.showNegativeSpace !== undefined) {
        bitmapFont.parameters.showNegativeSpace = params.showNegativeSpace;
        } else {
         // 如果预设没写这个参数，默认关闭，防止状态残留
         bitmapFont.parameters.showNegativeSpace = false; 
        }
          // 👆👆👆【新增结束】👆👆👆
        if (params.zeroOffet0 !== undefined) bitmapFont.parameters.zeroOffet0 = params.zeroOffet0;
        if (params.zeroOffet1 !== undefined) bitmapFont.parameters.zeroOffet1 = params.zeroOffet1;
        if (params.zeroOffet2 !== undefined) bitmapFont.parameters.zeroOffet2 = params.zeroOffet2;
        // --- Grid Logic ---
        const cols = bitmapFont.parameters.columns || 10;
        const rows = bitmapFont.parameters.rows || 1;
        
        if (params.randomGrid) {
            const generateRandoms = (count) => {
                let arr = [];
                for(let i=0; i<parseInt(count)-1; i++) {
                    arr.push(0.05 + Math.random() * 0.9);
                }
                arr.sort((a, b) => a - b);
                return [0, ...arr, 1];
            };
            bitmapFont.parameters.colPositions = generateRandoms(cols);
            bitmapFont.parameters.rowPositions = generateRandoms(rows);
        } else if (params.colPositions) {
            bitmapFont.parameters.colPositions = [...params.colPositions];
            if(params.rowPositions) bitmapFont.parameters.rowPositions = [...params.rowPositions];
        } else {
            bitmapFont.parameters.colPositions = Array.from({length: parseInt(cols) + 1}, (_, i) => i / cols);
            bitmapFont.parameters.rowPositions = Array.from({length: parseInt(rows) + 1}, (_, i) => i / rows);
        }

        // --- UI Updates ---
        const bgColor = params.backgroundColor;
        const textColor = getContrastColor(bgColor);

        const mainElement = document.getElementById('main');
        if (mainElement) mainElement.style.backgroundColor = bgColor;
        
        const asideElement = document.querySelector('aside');
        if (asideElement) asideElement.style.backgroundColor = bgColor;
        
        document.documentElement.style.setProperty('--panel-bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);

        const summaryColor = (textColor === '#FFFFFF') ? '#9AA3A9' : '#000000';
        document.documentElement.style.setProperty('--summary-text-color', summaryColor);

        document.querySelectorAll('.control-label, .control-value, .xy-pad-label, .pixel-shape-label, .preset-header, label, span').forEach(el => {
            el.style.setProperty('color', textColor, 'important');
        });

        updateControlsUI(params._animates || []);

        // Render
        if (typeof emptyCanvas === 'function') emptyCanvas();
        if (typeof renderGrid === 'function') renderGrid();
        if (typeof renderText === 'function') renderText();

        updatePresetButtonStates(presetKey);

        if (window.gridControllerInstance) {
            if (window.gridControllerInstance.params !== bitmapFont.parameters) {
                window.gridControllerInstance.params = bitmapFont.parameters;
            }
            requestAnimationFrame(() => {
                window.gridControllerInstance.resize();
            });
        }
    }
}

// 更新 UI 函数
function updateControlsUI(activeAnimations = []) {
    // Sliders
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const path = slider.id;
        const value = _.get(bitmapFont, path);
        if (value !== undefined) {
            slider.value = value;
            if (slider._valueSpan) slider._valueSpan.textContent = Math.round(value * 100) / 100;
        }
        if (typeof slider._stopAnimation === 'function') slider._stopAnimation();
        if (slider._playBtn) {
            slider._playBtn.classList.remove('playing');
            slider._playBtn.textContent = '▶';
            if (activeAnimations.includes(path)) {
                setTimeout(() => { slider._playBtn.click(); }, 50);
            }
        }
    });

    // Color Inputs
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        const path = input.id;
        const value = _.get(bitmapFont, path);
        if (value) input.value = hslaToHex(value);
    });

    // Buttons (Pixel Shape / Gradient Type)
    const updateButtonState = (paramPath, currentValue) => {
        if (!currentValue) return;
        const targetBtnClass = `${currentValue}-btn`;
        if (paramPath === 'parameters.pixelShape') {
           document.querySelectorAll('.circle-btn, .square-btn').forEach(btn => {
               btn.classList.toggle('active', btn.classList.contains(targetBtnClass));
           });
        } else if (paramPath === 'parameters.gradientType') {
           document.querySelectorAll('.linear-btn, .radial-btn').forEach(btn => {
               btn.classList.toggle('active', btn.classList.contains(targetBtnClass));
           });
        }
    };
    updateButtonState('parameters.pixelShape', bitmapFont.parameters.pixelShape);
    updateButtonState('parameters.gradientType', bitmapFont.parameters.gradientType);

    // Selects
    document.querySelectorAll('select').forEach(select => {
        const path = select.id;
        const value = _.get(bitmapFont, path);
        if (value) select.value = value;
    });

    // Background Input
    const bgColorInput = document.getElementById('backgroundColor');
    if (bgColorInput) {
        bgColorInput.value = bitmapFont.parameters.backgroundColor;
    }
}

function updatePresetButtonStates(activePresetKey) {
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.preset === activePresetKey) btn.classList.add('active');
    });
}

function initPresetPanel() {
    const presetButtonsContainer = document.getElementById('preset-buttons');
    const presetHeader = document.querySelector('#preset-panel .preset-header');
    if (presetHeader) presetHeader.textContent = 'Presets';

    Object.keys(PRESETS).forEach(presetKey => {
        const preset = PRESETS[presetKey];
        const btn = document.createElement('button');
        btn.className = 'preset-btn';
        btn.textContent = preset.name;
        btn.dataset.preset = presetKey;
        btn.addEventListener('click', () => applyPreset(presetKey));
        presetButtonsContainer.appendChild(btn);
    });
}

function initializeApp() {
    initPresetPanel();
    // 自动应用 preset1 (现在是红色的那个)
    setTimeout(() => {
        applyPreset('preset1');
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}