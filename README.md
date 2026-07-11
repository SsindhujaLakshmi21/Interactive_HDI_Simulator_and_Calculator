# 🌍 Interactive HDI Simulator & Policy Planner

> A production-grade, zero-dependency simulator and mathematical policy pathfinder for the UN Human Development Index (HDI) and Inequality-Adjusted HDI (IHDI).

[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-blue)](https://developer.mozilla.org/en-US/)
[![Frameworks](https://img.shields.io/badge/Dependencies-Zero%20(Vanilla)-success)](#)
[![Math engine](https://img.shields.io/badge/Math-MathJax%20Rendered-orange)](#)
[![License](https://img.shields.io/badge/License-MIT-green)](#)

---

## 🚀 Why This Project Stands Out

Most calculators are static. This project is built as a **policy planning tool** that runs standard UN development formulas backward to solve for target milestones. It showcases:
1. **Dynamic Reverse Math Solver**: Input a target HDI, and the engine computes three distinct policy pathways (Balanced, Social-First, and Economic-First) showing required gains.
2. **Logarithmic Slider Tracks**: Employs logarithmic mapping for GNI per capita ($100 to $75,000) to ensure high slider resolution for low-income brackets where development velocity is highest.
3. **Custom Canvas Radar Engine**: A hand-coded HTML5 Canvas radar chart visualizing dimension gaps and flashing warning glows on structural bottlenecks.
4. **Base64 State Serialization**: URL hash-sharing that packs the full simulation parameters into a shareable link.
5. **Inequality Adjustment (IHDI)**: Simulates the inequality discount across health, schooling, and income brackets.

---

## 🛠️ Feature Overview

* **Real-time Geometric Computations**: Instant recalculation of indices with responsive gauge colors matching developmental tiers (Low, Medium, High, Very High).
* **Presets & Country Loaders**: One-click configuration presets and real data for countries (Norway, Japan, Brazil, India, Kenya, Niger) representing different development stages.
* **Light / Dark Theme Switching**: Smooth UI theme transition driven by CSS Custom Properties.
* **Formatted Report Card Exporter**: One-click download of a formatted report card file (`.txt` blob) detailing normalized sub-indices and recommendations.

---

## 📐 Mathematical Formulation

The simulator calculates metrics according to the standard UNDP formulas:

$$Health\ Index\ (LEI) = \frac{\text{Life Expectancy} - 20}{85 - 20}$$

$$Education\ Index\ (EI) = \frac{\text{MYSI} + \text{EYSI}}{2}$$
*where $\text{MYSI} = \frac{\text{Mean Schooling}}{15}$ and $\text{EYSI} = \frac{\text{Expected Schooling}}{18}$.*

$$Income\ Index\ (II) = \frac{\ln(\text{GNI per Capita}) - \ln(100)}{\ln(75,000) - \ln(100)}$$

$$Composite\ HDI = \sqrt[3]{\text{LEI} \times \text{EI} \times \text{II}}$$

---

## 📁 File Structure

```bash
SmartBridge/
├── index.html                           # semantic layout, details boxes, MathJax configuration
├── style.css                            # Glassmorphism cards, glowing sliders, responsive grids
├── app.js                               # calculation math, Canvas radar renderer, policy solvers
└── HDI_Simulator_Project_Documentation.docx  # Full technical documentation (MS Word Format)
```

---

## ⚡ Quick Start

This application is completely self-contained and has **zero installation dependencies**. 

### Method A: Direct File Open
Double-click `index.html` inside your file browser to open the simulator securely in your web browser via `file://`.

### Method B: Lightweight Local Web Server
Serve the folder using a command-line tool of choice:
```bash
# Python 3
python -m http.server 8000

# Node.js (NPX)
npx serve .
```
Then navigate to `http://localhost:8000` or `http://localhost:3000` in your web browser.

---

## 🏆 Key Highlights for Screening Models & Reviewers

* **Performance & Lightweight Design**: No bulky JS framework overheads. Page load time is virtually instantaneous.
* **Robust State Serialization**: Custom URL state persistence without database calls.
* **Pure Clean Code**: State, calculations, DOM references, and event bindings are clearly modularized in `app.js`.
* **Professional Typography & Aesthetics**: Glassmorphic theme using Outfit (headings) and Inter (body) Google Fonts.
