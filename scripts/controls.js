// ===== 控制项配置 =====

const georgeControls = [
    {
        label: 'Width',
        min: 200,
        max: 2000,
        path: 'parameters.width',
    },
    {
        label: 'Size',
        min: 0.2,
        max: 3,
        step: 0.05,
        path: 'parameters.size',
    },
    {
        label: 'Spacing',
        min: 0,
        max: 1000,
        path: 'parameters.spacing',
    },
    {
        label: 'Radius',
        min: 20,
        max: 500,
        path: 'parameters.radius',
    },
    {
        label: 'Slant',
        min: -100,
        max: 100,
        path: 'parameters.slant',
    },
    {
        label: 'Cycles',
        min: 1,
        max: 20,
        path: 'parameters.gradientRepetition',
        step: 0.1,
        animate: true,
        animMin: 1.1,
        animMax: 4
    },
    {
        label: 'Steps',
        min: 0,
        max: 100,
        path: 'parameters.pixelSubdivision'
    }
]

const depthControls = [
    {
        label: 'Gradient Angle',
        min: 0,
        max: 360,
        path: 'parameters.gradientAngleOffset',
        animate: true,
        loop: true,
        easing: 'easeInOut',
        duration: 2000
    },
    {
        label: 'Trail Depth',
        min: 1,
        max: 30,
        path: 'parameters.copies.count',
    },
    {
        label: 'Trail Scale',
        min: -10,
        max: 20,
        path: 'parameters.copies.offset.scale',
    },
    {
        label: 'Scale Variation',
        min: 0,
        max: 100,
        path: 'parameters.charScaleVariation',
    },
    {
        label: 'Noise',
        min: 0,
        max: 50,
        path: 'parameters.noise',
    },
    {
        label: 'Wave Amplitude',
        min: 0,
        max: 100,
        path: 'parameters.waveAmplitude',
    },
    {
        label: 'Wave Frequency',
        min: 0,
        max: 100,
        path: 'parameters.waveFrequency',
    }
]

const colorNumberControls = [
    {
        label: 'Gradient Pos 1',
        min: 0,
        max: 100,
        path: 'parameters.offet0',
        animate: true
    },
    {
        label: 'Gradient Pos 2',
        min: 0,
        max: 100,
        path: 'parameters.offet1',
        animate: true
    },
    {
        label: 'Gradient Pos 3',
        min: 0,
        max: 100,
        path: 'parameters.offet2', 
        animate: true
    }
]

const controlsSwitch = [
    {
        label: 'Pixel Shape',
        path: 'parameters.pixelShape',
        value: 'square',
        options: [
            { label: 'Circle', value: 'circle' },
            { label: 'Square', value: 'square' }
        ]
    },
    {
        label: 'Gradient Type',
        path: 'parameters.gradientType',
        value: 'linear',
        options: [
            { label: 'Linear', value: 'linear' },
            { label: 'Radial', value: 'radial' }
        ]
    }
]

const controlsColor = [
    {
        label: 'Start Color',
        path: 'parameters.color0',
    },
    {
        label: 'Mid Color',
        path: 'parameters.color1',
    },
    {
        label: 'End Color',
        path: 'parameters.color2',
    }
]

// 1. 负空间颜色的配置
const zeroControlsColor = [
    {
        label: 'Void Start', 
        path: 'parameters.zeroColor0',
    },
    {
        label: 'Void Mid', 
        path: 'parameters.zeroColor1',
    },
    {
        label: 'Void End', 
        path: 'parameters.zeroColor2',
    }
]

// 2. 负空间位置滑块的配置
const zeroColorNumberControls = [
    {
        label: 'Gradient Pos 1', 
        min: 0,
        max: 100,
        path: 'parameters.zeroOffet0',
        animate: true
    },
    {
        label: 'Gradient Pos 2', 
        min: 0,
        max: 100,
        path: 'parameters.zeroOffet1',
        animate: true
    },
    {
        label: 'Gradient Pos 3', 
        min: 0,
        max: 100,
        path: 'parameters.zeroOffet2',
        animate: true
    }
]

// ===== 辅助函数 =====

function hslaToHex(hsla) {
    if (!hsla) return '#000000';
    if (hsla.startsWith('#')) return hsla;

    const match = hsla.match(/hsla?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%/)
    if (!match) return '#000000'
    
    const h = parseFloat(match[1])
    const s = parseFloat(match[2])
    const l = parseFloat(match[3])
    
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l / 100 - c / 2
    
    let r = 0, g = 0, b = 0
    
    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x
    }
    
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
}

function hexToHsla(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const l = (max + min) / 2
    
    let h = 0, s = 0
    
    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
            case g: h = ((b - r) / d + 2) / 6; break
            case b: h = ((r - g) / d + 4) / 6; break
        }
    }
    
    h = Math.round(h * 360)
    s = Math.round(s * 100)
    const lValue = Math.round(l * 100)
    
    return `hsla(${h}, ${s}%, ${lValue}%, 1.00)`
}

function getContrastColor(hexColor) {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq < 128) ? '#FFFFFF' : '#000000';
}

function renderNumberControl(control, container) {
    const initialValue = _.get(bitmapFont, control.path)

    const wrapper = document.createElement('div')
    wrapper.className = 'control-item-wrapper'
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'column'
    wrapper.style.marginBottom = '8px'
    wrapper.style.width = '100%'
    wrapper.style.paddingLeft = '16px'
    wrapper.style.paddingRight = '16px'

    const labelRow = document.createElement('div')
    labelRow.className = 'label-row'
    labelRow.style.width = '100%'
    labelRow.style.marginBottom = '2px'
    labelRow.style.display = 'flex'
    labelRow.style.justifyContent = 'space-between'
    labelRow.style.alignItems = 'center'

    const label = document.createElement('label')
    label.style.display = 'block'
    label.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"
    label.style.fontWeight = '500'
    label.style.fontSize = '14px' 
    label.style.letterSpacing = '1px'
    label.style.textAlign = 'left'
    label.style.whiteSpace = 'nowrap'
    label.style.color = 'var(--text-color)'
    label.textContent = control.label

    const valueSpan = document.createElement('span')
    valueSpan.className = 'control-value' 
    valueSpan.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"
    valueSpan.style.fontWeight = '500'
    valueSpan.style.fontSize = '14px' 
    valueSpan.style.letterSpacing = '1px'
    valueSpan.style.textAlign = 'right'
    valueSpan.style.minWidth = '40px'
    valueSpan.style.whiteSpace = 'nowrap'
    valueSpan.style.color = 'var(--text-color)'
    valueSpan.textContent = Math.round(initialValue * 100) / 100

    labelRow.appendChild(label)
    labelRow.appendChild(valueSpan)

    const inputRow = document.createElement('div')
    inputRow.className = 'input-row'
    inputRow.style.width = 'calc(100% + 32px)'
    inputRow.style.marginLeft = '-16px'
    inputRow.style.marginRight = '-16px'
    inputRow.style.paddingLeft = '16px'
    inputRow.style.paddingRight = '16px'
    inputRow.style.display = 'flex'
    inputRow.style.alignItems = 'center'
    inputRow.style.gap = control.animate ? '8px' : '0'

    const slider = document.createElement('input')
    slider.type = 'range'
    slider.min = control.min
    slider.max = control.max
    slider.value = initialValue
    slider.id = control.path
    slider.style.width = '100%'
    slider._valueSpan = valueSpan
    slider._stopAnimation = () => {}

    if (control.step !== undefined) {
        slider.step = control.step
    }

    const updateValue = (val) => {
        const displayValue = Math.round(val * 100) / 100
        valueSpan.textContent = displayValue
        _.set(bitmapFont, control.path, val)
        if (control.path === 'parameters.charScaleVariation') {
            bitmapFont.parameters.charScaleRandomness = {}
        }
        emptyCanvas()
        renderGrid()
        renderText()
    }

    let animationFrame = null
    let isPlaying = false
    let animationDirection = 1
    let lastTimestamp = 0

    slider.oninput = (e) => {
        const val = parseFloat(e.currentTarget.value)
        updateValue(val)
        if (control.animate) {
            lastTimestamp = 0
        }
    }

    if (control.animate) {
        const playBtn = document.createElement('button')
        playBtn.className = 'offset-play-btn'
        playBtn.type = 'button'
        playBtn.textContent = '▶'
        inputRow.appendChild(playBtn)
        slider._playBtn = playBtn

        const halfCycleMs = 2000
        let currentAnimationVal = 0;

        const stopAnimation = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame)
            }
            animationFrame = null
            isPlaying = false
            lastTimestamp = 0
            playBtn.classList.remove('playing')
            playBtn.textContent = '▶'
        }

        const step = (timestamp) => {
            if (!isPlaying) return
            if (!lastTimestamp) lastTimestamp = timestamp
            const delta = timestamp - lastTimestamp
            lastTimestamp = timestamp

            const animMin = control.animMin !== undefined ? control.animMin : control.min
            const animMax = control.animMax !== undefined ? control.animMax : control.max
            const range = animMax - animMin
            const duration = control.duration || 2000

             // Easing Logic
            const easingFunctions = {
                easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                linear: t => t
            }

            let nextVal;

            if (control.easing && easingFunctions[control.easing] && control.loop) {
                if (!slider._animationTime) slider._animationTime = 0
                slider._animationTime += delta
                const t = (slider._animationTime % duration) / duration
                const easedT = easingFunctions[control.easing](t)
                nextVal = animMin + range * easedT
                currentAnimationVal = nextVal
            } else {
                const speedPerMs = range / duration
                nextVal = currentAnimationVal + animationDirection * speedPerMs * delta
                if (control.loop) {
                    if (nextVal >= animMax) nextVal = animMin
                } else {
                    if (nextVal >= animMax) {
                        nextVal = animMax
                        animationDirection = -1
                        lastTimestamp = timestamp
                    } else if (nextVal <= animMin) {
                        nextVal = animMin
                        animationDirection = 1
                        lastTimestamp = timestamp
                    }
                }
                currentAnimationVal = nextVal
            }

            slider.value = nextVal
            updateValue(nextVal)
            animationFrame = requestAnimationFrame(step)
        }

        playBtn.addEventListener('click', () => {
            if (isPlaying) {
                stopAnimation()
            } else {
                isPlaying = true
                playBtn.classList.add('playing')
                playBtn.textContent = '⏸'
                currentAnimationVal = parseFloat(slider.value)
                const animMin = control.animMin !== undefined ? control.animMin : control.min
                const animMax = control.animMax !== undefined ? control.animMax : control.max
                const range = animMax - animMin
                const duration = control.duration || 2000

                if (control.easing && control.loop) {
                    const normalized = (currentAnimationVal - animMin) / range
                    const y = Math.max(0, Math.min(1, normalized))
                    let t = 0
                    if (control.easing === 'easeInOut') {
                         if (y < 0.5) t = Math.pow(y / 4, 1/3)
                         else t = 1 - Math.pow(2 * (1 - y), 1/3) / 2
                    } else {
                         t = normalized
                    }
                    if (isNaN(t)) t = 0
                    slider._animationTime = t * duration
                }

                if (control.loop) animationDirection = 1
                else animationDirection = currentAnimationVal >= animMax ? -1 : currentAnimationVal <= animMin ? 1 : animationDirection
                
                lastTimestamp = 0
                animationFrame = requestAnimationFrame(step)
            }
        })

        slider._stopAnimation = stopAnimation
    }

    inputRow.appendChild(slider)
    wrapper.appendChild(labelRow)
    wrapper.appendChild(inputRow)
    container.appendChild(wrapper)
}

function renderXYPad(container) {
    const wrapper = document.createElement('div')
    wrapper.className = 'xy-pad-wrapper'

    const label = document.createElement('span')
    label.className = 'xy-pad-label'
    label.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif"
    label.style.fontWeight = '500'
    label.style.letterSpacing = '1px'
    label.style.fontSize = '14px' 
    label.textContent = 'Direction'

    const padContainer = document.createElement('div')
    padContainer.className = 'xy-pad-container'
    padContainer.style.width = '100%'
    padContainer.style.height = '240px'
    padContainer.style.backgroundColor = 'transparent'
    padContainer.style.border = '1px solid #555555'
    padContainer.style.borderRadius = '4px'
    padContainer.style.margin = '0'

    const axisH = document.createElement('div')
    axisH.className = 'xy-pad-axis-h'
    axisH.style.backgroundColor = '#555555'

    const axisV = document.createElement('div')
    axisV.className = 'xy-pad-axis-v'
    axisV.style.backgroundColor = '#555555'

    const handle = document.createElement('div')
    handle.className = 'xy-pad-handle'

    padContainer.appendChild(axisH)
    padContainer.appendChild(axisV)
    padContainer.appendChild(handle)

    wrapper.appendChild(label)
    wrapper.appendChild(padContainer)
    container.appendChild(wrapper)

    const rangeX = { min: -100, max: 100 }
    const rangeY = { min: -100, max: 100 }

    function updateHandle() {
        const xVal = _.get(bitmapFont, 'parameters.copies.offset.x')
        const yVal = _.get(bitmapFont, 'parameters.copies.offset.y')
        const left = ((xVal - rangeX.min) / (rangeX.max - rangeX.min)) * 100
        const top = ((yVal - rangeY.min) / (rangeY.max - rangeY.min)) * 100
        handle.style.left = `${left}%`
        handle.style.top = `${top}%`
    }

    updateHandle()
    padContainer._updateHandle = updateHandle;

    let isDragging = false

    function handleMove(e) {
        if (!isDragging) return
        const rect = padContainer.getBoundingClientRect()
        let x = e.clientX - rect.left
        let y = e.clientY - rect.top
        x = Math.max(0, Math.min(x, rect.width))
        y = Math.max(0, Math.min(y, rect.height))
        const xPct = x / rect.width
        const yPct = y / rect.height
        const xVal = rangeX.min + xPct * (rangeX.max - rangeX.min)
        const yVal = rangeY.min + yPct * (rangeY.max - rangeY.min)
        _.set(bitmapFont, 'parameters.copies.offset.x', xVal)
        _.set(bitmapFont, 'parameters.copies.offset.y', yVal)
        updateHandle()
        emptyCanvas()
        renderGrid()
        renderText(bitmapFont.preview.character)
    }

    padContainer.addEventListener('mousedown', (e) => {
        isDragging = true
        handleMove(e)
    })

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', () => {
        isDragging = false
    })
}

// ===== DOM 生成 =====

const controlWrapper = document.getElementById('controls')

// GEOMETRY 部分
const georgeDetails = document.createElement('details')
const georgeSummary = document.createElement('summary')
georgeSummary.textContent = 'GEOMETRY'
georgeDetails.appendChild(georgeSummary)

const georgeContent = document.createElement('div')
georgeDetails.appendChild(georgeContent)
controlWrapper.appendChild(georgeDetails)

const georgeControlFragment = document.createDocumentFragment()
georgeControls.forEach((control) => {
    renderNumberControl(control, georgeControlFragment)
})
georgeContent.appendChild(georgeControlFragment)

// Depth & Effects 部分
const depthDetails = document.createElement('details')
depthDetails.open = false
const depthSummary = document.createElement('summary')
depthSummary.textContent = 'DEPTH & EFFECTS'
depthDetails.appendChild(depthSummary)

const depthContent = document.createElement('div')
depthDetails.appendChild(depthContent)
controlWrapper.appendChild(depthDetails)

depthControls.forEach((control) => {
    renderNumberControl(control, depthContent)
    if (control.label === 'Trail Scale') {
        renderXYPad(depthContent)
    }
})

// Color 部分
const colorDetails = document.createElement('details')
colorDetails.open = true
const colorSummary = document.createElement('summary')
colorSummary.textContent = 'COLOR'
colorDetails.appendChild(colorSummary)

const colorContent = document.createElement('div')
colorDetails.appendChild(colorContent)
controlWrapper.appendChild(colorDetails)

// 背景颜色
const bgRow = document.createElement('div')
bgRow.className = 'control-row'
bgRow.style.borderTop = 'none' 
bgRow.style.marginTop = '12px'
bgRow.style.marginBottom = '12px'

bgRow.style.paddingLeft = '16px'
bgRow.style.paddingRight = '16px'

const bgLabel = document.createElement('span')
bgLabel.className = 'control-label'
bgLabel.style.letterSpacing = '1px' 
bgLabel.style.fontSize = '14px' 
bgLabel.textContent = 'Background'

const bgInput = document.createElement('input')
bgInput.type = 'color'
bgInput.className = 'color-palette-input'
bgInput.id = 'backgroundColor'
bgInput.value = bitmapFont.parameters.backgroundColor

bgInput.style.setProperty('width', 'calc((100% - 8px) / 3)', 'important')
bgInput.style.setProperty('height', '30px', 'important')
bgInput.style.setProperty('margin-left', 'auto', 'important')
bgInput.style.cursor = 'pointer'
bgInput.style.border = '1px solid #555555' 

bgInput.addEventListener('input', (e) => {
    const color = e.currentTarget.value
    bitmapFont.parameters.backgroundColor = color
    const mainElement = document.getElementById('main')
    if (mainElement) mainElement.style.backgroundColor = color
    const asideElement = document.querySelector('aside')
    if (asideElement) asideElement.style.backgroundColor = color
    document.documentElement.style.setProperty('--panel-bg-color', color)
    
    // 根据背景色动态计算文字颜色
    const textColor = getContrastColor(color)
    document.documentElement.style.setProperty('--text-color', textColor)

    // 如果文字是白色，胶囊保持灰色；如果文字是黑色，胶囊变成黑色
    const summaryColor = (textColor === '#FFFFFF') ? '#9AA3A9' : '#000000'
    document.documentElement.style.setProperty('--summary-text-color', summaryColor)

    // 强制更新所有文本颜色
    document.querySelectorAll('.control-label, .control-value, .xy-pad-label, .pixel-shape-label, .preset-header, label, span').forEach(el => {
        el.style.setProperty('color', textColor, 'important')
    })

    if (window.gridControllerInstance) {
        window.gridControllerInstance.drawGrid()
    }
})

bgRow.appendChild(bgLabel)
bgRow.appendChild(bgInput)
colorContent.appendChild(bgRow)

// 颜色选择器
const paletteContainer = document.createElement('div')
paletteContainer.style.display = 'flex'
paletteContainer.style.gap = '8px'
paletteContainer.style.padding = '0 16px'
paletteContainer.style.marginTop = '16px'
paletteContainer.style.marginBottom = '20px'
paletteContainer.style.width = '100%'

controlsColor.forEach((control) => {
    const initialValue = _.get(bitmapFont, control.path)
    
    const wrapper = document.createElement('div')
    wrapper.className = 'color-input-wrapper'
    wrapper.style.flex = '1'
    wrapper.style.position = 'relative'
    wrapper.style.height = '34px'
    
    const isTransparent = (val) => {
        return val && (val.includes(', 0)') || val.includes(', 0.00)'));
    }

    const transparencyBg = document.createElement('div')
    transparencyBg.className = 'transparency-bg'
    wrapper.appendChild(transparencyBg)

    const input = document.createElement('input')
    input.type = 'color'
    input.className = 'color-palette-input' 
    input.id = control.path
    input.value = hslaToHex(initialValue)
    input.style.opacity = isTransparent(initialValue) ? '0' : '1'
    
    const updateState = (hslaVal) => {
        _.set(bitmapFont, control.path, hslaVal)
        input.value = hslaToHex(hslaVal)
        input.style.opacity = isTransparent(hslaVal) ? '0' : '1'
        emptyCanvas()
        renderGrid()
        renderText(bitmapFont.preview.character)
    }

    input.oninput = (e) => {
        const hexColor = e.currentTarget.value
        const hslaColor = hexToHsla(hexColor)
        updateState(hslaColor)
    }
    wrapper.appendChild(input)

    const clearBtn = document.createElement('div')
    clearBtn.className = 'clear-color-btn'
    clearBtn.title = "Set Transparent"
    clearBtn.onclick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        updateState('hsla(0, 0%, 0%, 0)')
    }
    wrapper.appendChild(clearBtn)

    paletteContainer.appendChild(wrapper)
})

colorContent.appendChild(paletteContainer)

// 梯度偏移控件
colorNumberControls.forEach((control) => {
    renderNumberControl(control, colorContent)
})

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// NEGATIVE SPACE (Negative Space 区域 - 带开关)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const zeroHeaderProp = document.createElement('div')
zeroHeaderProp.style.padding = '0 16px'
zeroHeaderProp.style.marginTop = '24px'
zeroHeaderProp.style.marginBottom = '12px'
zeroHeaderProp.style.borderTop = '1px solid #444'
zeroHeaderProp.style.paddingTop = '16px'
zeroHeaderProp.style.display = 'flex'
zeroHeaderProp.style.alignItems = 'center'
zeroHeaderProp.style.gap = '10px'

// Toggle Checkbox
const zeroToggle = document.createElement('input')
zeroToggle.type = 'checkbox'
zeroToggle.id = 'toggleNegativeSpace'
zeroToggle.checked = bitmapFont.parameters.showNegativeSpace === true
zeroToggle.style.margin = '0'
zeroToggle.style.width = '16px'
zeroToggle.style.height = '16px'
zeroToggle.style.cursor = 'pointer'
zeroToggle.style.accentColor = 'var(--text-color)'

// Label
const zeroLabel = document.createElement('label')
zeroLabel.htmlFor = 'toggleNegativeSpace'
zeroLabel.className = 'control-label'
zeroLabel.style.fontSize = '14px'
zeroLabel.style.fontWeight = 'bold'
zeroLabel.style.color = 'var(--text-color)'
zeroLabel.style.cursor = 'pointer'
zeroLabel.textContent = 'NEGATIVE SPACE'

zeroHeaderProp.appendChild(zeroToggle)
zeroHeaderProp.appendChild(zeroLabel)
colorContent.appendChild(zeroHeaderProp)

// Wrapper for collapsible content
const zeroContentWrapper = document.createElement('div')
zeroContentWrapper.style.transition = 'opacity 0.3s ease, max-height 0.3s ease, margin-bottom 0.3s ease'
zeroContentWrapper.style.overflow = 'hidden'

// 初始化状态
if (zeroToggle.checked) {
    zeroContentWrapper.style.opacity = '1'
    zeroContentWrapper.style.maxHeight = '500px'
    zeroContentWrapper.style.pointerEvents = 'auto'
    zeroContentWrapper.style.marginBottom = '20px'
} else {
    zeroContentWrapper.style.opacity = '0'
    zeroContentWrapper.style.maxHeight = '0px'
    zeroContentWrapper.style.pointerEvents = 'none'
    zeroContentWrapper.style.marginBottom = '0px'
}
colorContent.appendChild(zeroContentWrapper)

// A. Negative Space 颜色选择器
const zeroPaletteContainer = document.createElement('div')
zeroPaletteContainer.style.display = 'flex'
zeroPaletteContainer.style.gap = '8px'
zeroPaletteContainer.style.padding = '0 16px'
zeroPaletteContainer.style.marginBottom = '20px'
zeroPaletteContainer.style.width = '100%'

zeroControlsColor.forEach((control) => {
    let initialValue = _.get(bitmapFont, control.path)
    if (!initialValue) {
         if(control.path.includes('zeroColor0')) initialValue = 'hsla(0, 0%, 90%, 1.00)';
         if(control.path.includes('zeroColor1')) initialValue = 'hsla(0, 0%, 95%, 1.00)';
         if(control.path.includes('zeroColor2')) initialValue = 'hsla(0, 0%, 85%, 1.00)';
         _.set(bitmapFont, control.path, initialValue); 
    }

    const wrapper = document.createElement('div')
    wrapper.className = 'color-input-wrapper'
    wrapper.style.flex = '1'
    wrapper.style.position = 'relative'
    wrapper.style.height = '34px'
    
    const isTransparent = (val) => {
        return val && (val.includes(', 0)') || val.includes(', 0.00)'));
    }

    const transparencyBg = document.createElement('div')
    transparencyBg.className = 'transparency-bg'
    wrapper.appendChild(transparencyBg)

    const input = document.createElement('input')
    input.type = 'color'
    input.className = 'color-palette-input' 
    input.id = control.path
    input.value = hslaToHex(initialValue)
    input.style.opacity = isTransparent(initialValue) ? '0' : '1'
    
    const updateState = (hslaVal) => {
        _.set(bitmapFont, control.path, hslaVal)
        input.value = hslaToHex(hslaVal)
        input.style.opacity = isTransparent(hslaVal) ? '0' : '1'
        emptyCanvas()
        renderGrid()
        renderText(bitmapFont.preview.character)
    }

    input.oninput = (e) => {
        const hexColor = e.currentTarget.value
        const hslaColor = hexToHsla(hexColor)
        updateState(hslaColor)
    }
    wrapper.appendChild(input)

    const clearBtn = document.createElement('div')
    clearBtn.className = 'clear-color-btn'
    clearBtn.title = "Set Transparent"
    clearBtn.onclick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        updateState('hsla(0, 0%, 0%, 0)')
    }
    wrapper.appendChild(clearBtn)

    zeroPaletteContainer.appendChild(wrapper)
})
zeroContentWrapper.appendChild(zeroPaletteContainer)

// 2. Zero 梯度偏移控件
zeroColorNumberControls.forEach((control) => {
    renderNumberControl(control, zeroContentWrapper)
})

// Toggle Event
zeroToggle.addEventListener('change', (e) => {
    const isActive = e.target.checked;
    bitmapFont.parameters.showNegativeSpace = isActive;
    
    if (isActive) {
        zeroContentWrapper.style.maxHeight = '500px'; 
        zeroContentWrapper.style.opacity = '1';
        zeroContentWrapper.style.marginBottom = '20px';
        zeroContentWrapper.style.pointerEvents = 'auto';
    } else {
        zeroContentWrapper.style.maxHeight = '0px'; 
        zeroContentWrapper.style.opacity = '0';
        zeroContentWrapper.style.marginBottom = '0px';
        zeroContentWrapper.style.pointerEvents = 'none';
    }
    
    emptyCanvas();
    renderGrid();
    if(bitmapFont.preview && bitmapFont.preview.text) {
        renderText(); 
    } else {
        renderText(bitmapFont.preview.character);
    }
})

// ===== Advanced Settings 部分 =====

const advancedDetails = document.createElement('details')
advancedDetails.open = false
const advancedSummary = document.createElement('summary')
advancedSummary.textContent = 'PIXEL SETTINGS'
advancedDetails.appendChild(advancedSummary)

const advancedContent = document.createElement('div')
advancedDetails.appendChild(advancedContent)
controlWrapper.appendChild(advancedDetails)

// Pixel Shape 下拉菜单
controlsSwitch.forEach((control) => {
    const initialValue = _.get(bitmapFont, control.path)

    if (control.options) {
        const group = document.createElement('div')
        group.className = 'pixel-shape-group'

        const label = document.createElement('span')
        label.className = 'pixel-shape-label'
        label.style.letterSpacing = '1px'
        label.style.fontSize = '14px' 
        label.textContent = control.label

        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'pixel-shape-buttons'

        control.options.forEach((option) => {
            const btn = document.createElement('button')
            btn.className = `pixel-shape-btn ${option.value}-btn`
            
            if (control.label === 'Gradient Type') {
                btn.textContent = option.label;
                btn.style.width = 'auto';
                btn.style.minWidth = '48px';
                btn.style.padding = '0 8px';
                btn.style.fontSize = '11px';
                btn.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
                btn.style.fontWeight = '500';
            }

            if (option.value === initialValue) {
                btn.classList.add('active')
            }

            btn.addEventListener('click', () => {
                buttonContainer.querySelectorAll('.pixel-shape-btn').forEach(b => {
                    b.classList.remove('active')
                })
                btn.classList.add('active')

                const value = option.value
                _.set(bitmapFont, control.path, value)
                emptyCanvas()
                renderGrid()
                renderText(bitmapFont.preview.character)
            })

            buttonContainer.appendChild(btn)
        })

        group.appendChild(label)
        group.appendChild(buttonContainer)
        advancedContent.appendChild(group)
    }
})

// ===== Grid Controller Logic =====

class GridDragController {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.touchAction = 'none';
        this.canvas.style.cursor = 'default';
        this.container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.params = bitmapFont.parameters;
        
        this.isDragging = false;
        this.dragType = null;
        this.dragIndex = -1;
        this.hitRadius = 8;
        this.isHovering = false;

        this._bindEvents();
        
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.container);
        
        setTimeout(() => this.resize(), 0);
    }

    resize() {
        if (!this.container) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        
        this.ctx.scale(dpr, dpr);
        this.width = width;
        this.height = height;
        
        this.drawGrid();
    }

    _bindEvents() {
        this.canvas.addEventListener('mousedown', this._onStart.bind(this));
        this.canvas.addEventListener('touchstart', this._onStart.bind(this), { passive: false });
        window.addEventListener('mousemove', this._onMove.bind(this));
        window.addEventListener('touchmove', this._onMove.bind(this), { passive: false });
        window.addEventListener('mouseup', this._onEnd.bind(this));
        window.addEventListener('touchend', this._onEnd.bind(this));
    }

    _getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const nx = (clientX - rect.left) / rect.width;
        const ny = (clientY - rect.top) / rect.height;

        return {
            x: nx * this.width,
            y: ny * this.height,
            nx: nx,
            ny: ny
        };
    }

    _onStart(e) {
        if (e.cancelable) e.preventDefault();
        
        const p = this._getPos(e);
        const { colPositions, rowPositions } = this.params;
        const width = this.width;
        const height = this.height;

        for (let i = 1; i < colPositions.length - 1; i++) {
            if (Math.abs(p.x - colPositions[i] * width) < this.hitRadius) {
                this.isDragging = true;
                this.dragType = 'col';
                this.dragIndex = i;
                return;
            }
        }

        for (let j = 1; j < rowPositions.length - 1; j++) {
            if (Math.abs(p.y - rowPositions[j] * height) < this.hitRadius) {
                this.isDragging = true;
                this.dragType = 'row';
                this.dragIndex = j;
                return;
            }
        }
    }

    _onMove(e) {
        const p = this._getPos(e);
        const { colPositions, rowPositions } = this.params;
        const width = this.width;
        const height = this.height;

        if (!this.isDragging) {
            let cursor = 'default';
            for (let i = 1; i < colPositions.length - 1; i++) {
                if (Math.abs(p.x - colPositions[i] * width) < this.hitRadius) cursor = 'col-resize';
            }
            if (cursor === 'default') {
                for (let j = 1; j < rowPositions.length - 1; j++) {
                    if (Math.abs(p.y - rowPositions[j] * height) < this.hitRadius) cursor = 'row-resize';
                }
            }
            this.canvas.style.cursor = cursor;
            return;
        }

        if (e.cancelable) e.preventDefault();

        if (this.dragType === 'col') {
            const i = this.dragIndex;
            const min = colPositions[i - 1] + 0.02;
            const max = colPositions[i + 1] - 0.02;
            colPositions[i] = Math.max(min, Math.min(max, p.nx));
        } else if (this.dragType === 'row') {
            const j = this.dragIndex;
            const min = rowPositions[j - 1] + 0.02;
            const max = rowPositions[j + 1] - 0.02;
            rowPositions[j] = Math.max(min, Math.min(max, p.ny));
        }

        this.drawGrid();
        
        if (typeof emptyCanvas === 'function') emptyCanvas();
        if (typeof renderGrid === 'function') renderGrid();
        if (typeof renderText === 'function') renderText();
    }

    _onEnd() {
        this.isDragging = false;
        this.dragType = null;
    }

    drawGrid() {
        if (!this.ctx || !this.width || !this.height) return;
        const ctx = this.ctx;
        const width = this.width;
        const height = this.height;
        const { colPositions, rowPositions } = this.params;
        const style = getComputedStyle(document.documentElement);
        const textColor = style.getPropertyValue('--text-color').trim() || '#000000';
        const gridLineColor = '#555555';
        
        ctx.clearRect(0, 0, width, height);
        
        colPositions.forEach((pos, idx) => {
            const isBound = idx === 0 || idx === colPositions.length - 1;
            
            if (!isBound) {
                const rawX = pos * width;
                const x = Math.floor(rawX) + 0.5;

                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                
                ctx.strokeStyle = gridLineColor;
                ctx.lineWidth = 1; 
                ctx.setLineDash([]);
                ctx.globalAlpha = 1.0;
                ctx.stroke();

                ctx.fillStyle = textColor; 
                ctx.beginPath();
                ctx.arc(rawX, height / 2, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        rowPositions.forEach((pos, idx) => {
            const isBound = idx === 0 || idx === rowPositions.length - 1;
            
            if (!isBound) {
                const rawY = pos * height;
                const y = Math.floor(rawY) + 0.5;
                
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                
                ctx.strokeStyle = gridLineColor;
                ctx.lineWidth = 1;
                ctx.setLineDash([]);
                ctx.globalAlpha = 1.0;
                ctx.stroke();
                
                ctx.fillStyle = textColor;
                ctx.beginPath();
                ctx.arc(width / 2, rawY, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }
}

// ===== Initialize Grid UI =====

function createGridControlPanel() {
    const details = document.createElement('details');
    details.open = true;
    const summary = document.createElement('summary');
    summary.textContent = 'GRID LAYOUT';
    details.appendChild(summary);

    const content = document.createElement('div');
    content.className = 'grid-control-content';
    content.style.padding = '12px 16px'; 
    
    const hint = document.createElement('div');
    hint.textContent = 'Drag Lines to Adjust Grid';
    
    hint.className = 'control-label';
    hint.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
    hint.style.fontWeight = '400';
    hint.style.fontSize = '13px'; 
    hint.style.letterSpacing = '0.5px';
    hint.style.color = 'var(--text-color)';
    hint.style.textAlign = 'left';
    hint.style.marginBottom = '12px';
    
    content.appendChild(hint);

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '300px'; 
    container.style.position = 'relative';
    container.style.backgroundColor = 'transparent'; 
    container.style.border = '1px solid #555555'; 
    container.style.marginBottom = '16px';
    container.style.borderRadius = '4px';
    container.style.overflow = 'hidden';
    content.appendChild(container);

    // 创建按钮容器
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '10px';
    content.appendChild(btnContainer);

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Grid';
    resetBtn.className = 'capsule-btn';
    resetBtn.style.fontFamily = "'IBM Plex Mono', monospace";
    resetBtn.style.fontWeight = '400';
    resetBtn.style.fontSize = '12px';
    resetBtn.style.padding = '6px 16px';
    resetBtn.style.border = '1px solid currentColor';
    resetBtn.style.borderRadius = '20px';
    resetBtn.style.backgroundColor = 'transparent';
    resetBtn.style.color = 'var(--text-color)';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.opacity = '0.8';
    resetBtn.onmouseover = () => resetBtn.style.opacity = '1';
    resetBtn.onmouseout = () => resetBtn.style.opacity = '0.8';
    
    resetBtn.onclick = () => {
        const { columns, rows } = bitmapFont.parameters;
        bitmapFont.parameters.colPositions = Array.from({length: parseInt(columns) + 1}, (_, i) => i / columns);
        bitmapFont.parameters.rowPositions = Array.from({length: parseInt(rows) + 1}, (_, i) => i / rows);
        
        if (window.gridControllerInstance) {
            window.gridControllerInstance.drawGrid();
        }
        emptyCanvas();
        renderGrid();
        renderText();
    };
    btnContainer.appendChild(resetBtn);

    const randomBtn = document.createElement('button');
    randomBtn.textContent = 'Random';
    randomBtn.className = 'capsule-btn';
    randomBtn.style.fontFamily = "'IBM Plex Mono', monospace";
    randomBtn.style.fontWeight = '400';
    randomBtn.style.fontSize = '12px';
    randomBtn.style.padding = '6px 16px';
    randomBtn.style.border = '1px solid currentColor';
    randomBtn.style.borderRadius = '20px';
    randomBtn.style.backgroundColor = 'transparent';
    randomBtn.style.color = 'var(--text-color)';
    randomBtn.style.cursor = 'pointer';
    randomBtn.style.opacity = '0.8';
    randomBtn.onmouseover = () => randomBtn.style.opacity = '1';
    randomBtn.onmouseout = () => randomBtn.style.opacity = '0.8';

    let randomAnimationId = null;

    randomBtn.onclick = () => {
        const { columns, rows } = bitmapFont.parameters;
        
        const generateRandoms = (count) => {
            const n = parseInt(count);
            // 只有一列/行时直接返回
            if (n <= 1) return [0, 1];

            // 设定最小间隔 (尝试 0.03 即 3%，如果段数多则自动缩小以保证不超过 85% 的总空间)
            let minGap = 0.03;
            if (n * minGap > 0.85) {
                minGap = 0.85 / n;
            }

            const availableSpace = 1.0 - (n * minGap);

            // 生成 n 个随机权重，用于分配剩余空间
            const weights = [];
            let totalWeight = 0;
            // 我们需要 n 个段的权重
            for(let i=0; i<n; i++) {
                // 使用 Math.random() + 0.2 避免某个间距过小(虽然有minGap，但加上一点随机底数更均匀)
                const w = Math.random() + 0.2; 
                weights.push(w);
                totalWeight += w;
            }

            let currentPos = 0;
            const result = [0]; // 起始点
            
            // 计算 n-1 个内部点的位置
            for(let i=0; i<n-1; i++) {
                // 当前段长度 = 最小间隔 + 该段分得的剩余空间
                const segment = minGap + (weights[i] / totalWeight) * availableSpace;
                currentPos += segment;
                result.push(currentPos);
            }
            
            result.push(1); // 终点
            return result;
        };

        const targetCols = generateRandoms(columns);
        const targetRows = generateRandoms(rows);

        // 如果已经在动画中，先停止
        if (randomAnimationId) {
            cancelAnimationFrame(randomAnimationId);
        }

        const startCols = [...(bitmapFont.parameters.colPositions || [])];
        const startRows = [...(bitmapFont.parameters.rowPositions || [])];
        
        // 确保起始数组存在且长度正确 (防御性编程)
        if (startCols.length !== targetCols.length) {
             const defaultCols = Array.from({length: parseInt(columns) + 1}, (_, i) => i / columns);
             bitmapFont.parameters.colPositions = [...defaultCols];
             startCols.length = 0; startCols.push(...defaultCols);
        }
        if (startRows.length !== targetRows.length) {
             const defaultRows = Array.from({length: parseInt(rows) + 1}, (_, i) => i / rows);
             bitmapFont.parameters.rowPositions = [...defaultRows];
             startRows.length = 0; startRows.push(...defaultRows);
        }

        const startTime = performance.now();
        const duration = 1200; // 动画持续时间 ms

        // 弹性缓动函数
        const easeOutElastic = (x) => {
            const c4 = (2 * Math.PI) / 6; // 修改：增加分母 (原为 4.5) 以进一步减小弹力和震荡频率
            return x === 0
              ? 0
              : x === 1
              ? 1
              : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
        };

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            let progress = elapsed / duration;

            if (progress >= 1) {
                progress = 1;
                bitmapFont.parameters.colPositions = targetCols;
                bitmapFont.parameters.rowPositions = targetRows;
                randomAnimationId = null;
            } else {
                const ease = easeOutElastic(progress);
                
                // 插值计算
                bitmapFont.parameters.colPositions = startCols.map((start, i) => {
                    const end = targetCols[i] !== undefined ? targetCols[i] : start;
                    return start + (end - start) * ease;
                });
                
                bitmapFont.parameters.rowPositions = startRows.map((start, i) => {
                    const end = targetRows[i] !== undefined ? targetRows[i] : start;
                    return start + (end - start) * ease;
                });
                
                randomAnimationId = requestAnimationFrame(animate);
            }

            if (window.gridControllerInstance) {
                window.gridControllerInstance.drawGrid();
            }
            emptyCanvas();
            renderGrid();
            renderText();
        };

        randomAnimationId = requestAnimationFrame(animate);
    };
    btnContainer.appendChild(randomBtn);
    
    details.appendChild(content);

    if (controlWrapper.children.length > 0) {
        controlWrapper.insertBefore(details, controlWrapper.children[1]);
    } else {
        controlWrapper.appendChild(details);
    }

    setTimeout(() => {
        window.gridControllerInstance = new GridDragController(container);
    }, 100);
    
    details.addEventListener('toggle', () => {
        if (details.open && window.gridControllerInstance) {
            window.gridControllerInstance.resize();
        }
    });
}

// Execute
const initApp = () => {
    createGridControlPanel();

    setTimeout(() => {
        if (typeof bitmapFont !== 'undefined') {
            const initialText = "ABCDEFG\nHIJKLMN\nOPQRSTU\nVWXYZ";
            bitmapFont.preview.text = initialText;
            
            // 修改：自动触发第一个预设
            const presetBtns = document.getElementById('preset-buttons');
            let hasTriggered = false;

            if (presetBtns && presetBtns.children.length > 0) {
                // nth-child(1) 是预设1
                const preset1 = presetBtns.children[0];
                if (preset1) {
                    console.log('Auto-triggering Preset 1');
                    preset1.click();
                    hasTriggered = true;
                    
                    // 强制修改 UI：改名为 Preset 1
                    preset1.textContent = "Preset 1";

                    // 强制覆盖：将 spacing 设为 0
                    setTimeout(() => {
                        bitmapFont.parameters.spacing = 0;
                        
                        // 同步 spacing 滑块显示
                        const spInput = document.getElementById('parameters.spacing');
                        if(spInput) {
                            spInput.value = 0;
                            if(spInput._valueSpan) spInput._valueSpan.textContent = '0';
                        }
                        
                        // 刷新渲染
                        emptyCanvas();
                        if (window.gridControllerInstance) window.gridControllerInstance.drawGrid();
                        if (typeof renderText === 'function') renderText();
                    }, 100);
                }
            }

            // 如果没有成功触发预设，则执行默认渲染
            if (!hasTriggered) {
                if (typeof emptyCanvas === 'function') emptyCanvas();
                
                if (window.gridControllerInstance) {
                    window.gridControllerInstance.drawGrid();
                }
                
                if (typeof renderGrid === 'function') renderGrid();
                
                if (typeof renderText === 'function') {
                    renderText(); 
                }
            }
        }
    }, 200);
};

window.addEventListener('load', initApp);

// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// 新增：预设同步逻辑 (Preset UI Synchronization)
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

function updateControlsDisplay() {
    
    // 1. 更新滑块 (Number Controls)
    const updateSliders = (controls) => {
        controls.forEach(ctl => {
            const input = document.getElementById(ctl.path);
            if (input && input._valueSpan) {
                const val = _.get(bitmapFont, ctl.path);
                if (val !== undefined) {
                    input.value = val;
                    input._valueSpan.textContent = Math.round(val * 100) / 100;
                }
            }
        });
    };

    updateSliders(georgeControls);
    updateSliders(depthControls);
    updateSliders(colorNumberControls);
    updateSliders(zeroColorNumberControls);

    // 2. 更新颜色输入框 (Color Inputs)
    const updateColors = (controls) => {
        controls.forEach(ctl => {
             const input = document.getElementById(ctl.path);
             if (input) {
                 let val = _.get(bitmapFont, ctl.path);
                 
                 // 如果预设没有包含 Zero Color 数据，使用默认值填补并同步数据
                 if (!val && ctl.path.includes('zeroColor')) {
                     if(ctl.path.endsWith('0')) val = 'hsla(0, 0%, 90%, 1.00)';
                     else if(ctl.path.endsWith('1')) val = 'hsla(0, 0%, 95%, 1.00)';
                     else if(ctl.path.endsWith('2')) val = 'hsla(0, 0%, 85%, 1.00)';
                     _.set(bitmapFont, ctl.path, val);
                 }
                
                // 修复：确保 color0, color1, color2 也能正确回显，解决预设4/6可能为空的问题
                if (!val && ctl.path === 'parameters.color0') val = 'hsla(0, 0%, 0%, 1.00)';
                if (!val && ctl.path === 'parameters.color1') val = 'hsla(0, 0%, 0%, 1.00)'; 
                if (!val && ctl.path === 'parameters.color2') val = 'hsla(0, 0%, 100%, 1.00)';

                 if (val) {
                     input.value = hslaToHex(val);
                     // 处理透明度显示
                     const isTrans = (val.includes(', 0)') || val.includes(', 0.00)'));
                     input.style.opacity = isTrans ? '0' : '1';
                 }
             }
        });
    };

    updateColors(controlsColor);
    updateColors(zeroControlsColor);
    // 👇👇👇【新增这段代码：同步 Negative Space 开关和面板】👇👇👇
    const zeroToggle = document.getElementById('toggleNegativeSpace');
    // 注意：zeroContentWrapper 变量是在上面定义的，这里可以直接用
    // 如果提示找不到，请确保这段代码在 zeroContentWrapper 定义之后
    
    if (zeroToggle) {
        const isActive = bitmapFont.parameters.showNegativeSpace === true;
        zeroToggle.checked = isActive;

        // 同时也必须触发面板的展开/收起动画
        if (typeof zeroContentWrapper !== 'undefined') {
            if (isActive) {
                zeroContentWrapper.style.maxHeight = '500px';
                zeroContentWrapper.style.opacity = '1';
                zeroContentWrapper.style.marginBottom = '20px';
                zeroContentWrapper.style.pointerEvents = 'auto';
            } else {
                zeroContentWrapper.style.maxHeight = '0px';
                zeroContentWrapper.style.opacity = '0';
                zeroContentWrapper.style.marginBottom = '0px';
                zeroContentWrapper.style.pointerEvents = 'none';
            }
        }
    }
    // 👆👆👆【新增结束】👆👆👆
    

    // 3. 更新背景颜色
    const bgInput = document.getElementById('backgroundColor');
    if (bgInput && bitmapFont.parameters.backgroundColor) {
        bgInput.value = bitmapFont.parameters.backgroundColor;
        
        // 触发样式更新事件
        const event = new Event('input');
        bgInput.dispatchEvent(event);
    }

    // 4. 更新 XY Pad 手柄位置
    const xyContainer = document.querySelector('.xy-pad-container');
    if (xyContainer && xyContainer._updateHandle) {
        xyContainer._updateHandle();
    }
    
    // 5. 更新开关按钮状态 (Switches)
    controlsSwitch.forEach(ctl => {
        const val = _.get(bitmapFont, ctl.path);
        if (val) {
             ctl.options.forEach(opt => {
                 // 查找对应的按钮
                 const btns = document.querySelectorAll(`.pixel-shape-btn.${opt.value}-btn`);
                 btns.forEach(btn => {
                     // 简单判断：如果当前值匹配，则激活；否则取消激活
                     // 这假设了 option.value 在全局是唯一的 (如 'circle' vs 'square', 'linear' vs 'radial')
                     if (opt.value === val) {
                         btn.classList.add('active');
                     } else {
                         // 需要确保只移除同组的互斥按钮
                         // 由于 linear/radial 和 circle/square 值不重叠，直接移除是安全的
                         btn.classList.remove('active');
                     }
                 });
             });
        }
    });

    // 6. 强制更新 Grid UI
    if (window.gridControllerInstance) {
        window.gridControllerInstance.drawGrid();
    }
    
    // 7. 强制刷新画布以确保颜色同步
    if (typeof renderText === 'function') {
        renderText();
    }
}

// 监听预设按钮点击
document.addEventListener('click', (e) => {
    // 检查是否点击了预设按钮
    if (e.target.closest('.preset-btn') || e.target.closest('#preset-panel button')) {
        // 给予少量延迟，等待预设逻辑应用数据后再刷新 UI
        setTimeout(() => {
            // 关键修复：点击预设时，确保 gradientType、pixelShape 等也能正确触发渲染
            // 有些预设可能设置了 radial gradient，需要同步 switch 状态
            
            // 修复：针对预设4和6可能存在的特殊字段缺失问题，进行数据完整性检查
            if(!bitmapFont.parameters.zeroColor0) bitmapFont.parameters.zeroColor0 = 'hsla(0, 0%, 90%, 1.00)';
            if(!bitmapFont.parameters.zeroColor1) bitmapFont.parameters.zeroColor1 = 'hsla(0, 0%, 95%, 1.00)';
            if(!bitmapFont.parameters.zeroColor2) bitmapFont.parameters.zeroColor2 = 'hsla(0, 0%, 85%, 1.00)';
            
            // 确保偏移量存在
            if(bitmapFont.parameters.zeroOffet0 === undefined) bitmapFont.parameters.zeroOffet0 = 20;
            if(bitmapFont.parameters.zeroOffet1 === undefined) bitmapFont.parameters.zeroOffet1 = 40;
            if(bitmapFont.parameters.zeroOffet2 === undefined) bitmapFont.parameters.zeroOffet2 = 60;
            
            updateControlsDisplay();
            emptyCanvas(); // 强制清空一次
            if (window.gridControllerInstance) window.gridControllerInstance.drawGrid();
            if (typeof renderText === 'function') renderText();
        }, 150); // 稍微增加延迟以确保 _.merge 完成
    }
});