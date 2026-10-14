# AgriGuide AI 🌱
> **Smart Farming, Better Tomorrow.**

AgriGuide AI is a full-stack, AI-powered smart farming web application designed to help farmers improve crop productivity, practice sustainable and organic agriculture, monitor real-time weather forecasts, diagnose crop diseases from photos, track regional market commodity prices, and manage field schedules.

The visual interface is built to faithfully reproduce the high-density agricultural SaaS design system with a deep forest-green navigation sidebar (`#154734`), mint/emerald accent cards, and responsive multi-column layouts.

---

## 🌾 Key Features

### 1. Home Dashboard
- **Your Farm Banner**: Displays farm name (e.g. *Green Valley Farm*), cultivated area (1.2 ha), soil type (*Loam*), and one-click access to farm details.
- **Live Weather Preview Widget**: Real-time temperature (e.g. 24°C Partly Cloudy), humidity (68%), rain probability (20%), and wind speed (12 km/h) powered by live Open-Meteo API.
- **Organic Farming Quick Card**:
  - Replaces the generic recommendations shortcut per master requirements.
  - Highlights the 5 foundational agronomic benefits and previews the 10-step beginner transition process.
  - Direct "Learn More" navigation to the dedicated Organic Farming module.
- **Feature Shortcuts**: Instant access to AI Assistant, Market Prices, and Crop Health scanner.
- **Upcoming Tasks**: Interactive task list with category badges (*Fertilizer*, *Weather*, *Irrigation*), real-time completion toggles, and modal to add new farm activities.
- **Quick Tips**: Evidence-based biological soil health and manure application guidelines.

### 2. My Farm & Onboarding (Panel 2)
- Multi-step interactive registration & editing wizard:
  1. **Farm Details**: Name, country selector, state/region, district, cultivated area with hectare/acre unit conversion.
  2. **Soil Info**: Soil texture (Loam, Clay, Sandy, Silt, Peaty, Chalky), slider-adjusted soil pH, organic matter status, NPK levels, lab report upload dropzone, and "mark unknown" fallback.
  3. **Crop Preferences & Growing Conditions**: Irrigation systems (Rain-fed, Drip, Sprinkler, Surface), farmer goals (Higher Yield, Maximize Profit, Organic Transition, Water Conservation), experience levels, and organic conversion status.
- Persists to database with validated Zod schemas.

### 3. Crop Planner & AI Recommendations (Panel 3)
- Multi-criteria agronomic decision engine calculating suitability scores based on:
  - Soil compatibility & drainage
  - Seasonal temperature & historical climate
  - Water availability vs irrigation infrastructure
  - Market liquidity and farmer's goal
- Ranked crop cards (*Maize 92%*, *Tomato 85%*, *Beans 78%*, *Lettuce 72%*) with suitability scores, climate match notes, duration, and bulleted highlights.
- **Side-by-Side Comparison Matrix**: Select and compare up to 3 crops simultaneously.
- **Detailed Crop Modal**: View planting windows, agronomic risks, and recommended alternative crops.

### 4. Crop Calendar & Lifecycle (Panel 4)
- Horizontal stage timeline with connected circular nodes:
  - *Land Prep* (Day 1–7)
  - *Sowing* (Day 8–14)
  - *Vegetative* (Day 15–30)
  - *Flowering* (Day 31–45)
  - *Fruiting* (Day 46–70)
  - *Harvest* (Day 71–80)
- Detailed Schedule table with status checkboxes, target dates, dosage instructions, and modal for editing or scheduling custom activities.

### 5. Dedicated Organic Farming Module
- Complete dedicated section with 6 tabbed sub-modules:
  1. **Fundamentals & 5 Core Benefits**: Soil structure, biodiversity & pollinators, synthetic input reduction, soil-cover & moisture retention, and premium market quality.
  2. **Interactive 10-Step Transition Checklist**: Step-by-step progress tracking bar from baseline soil assessment to official certification.
  3. **Composting & Vermicomposting Science**: 30:1 Carbon-to-Nitrogen brown/green ratios, 55–65°C thermophilic heating, moisture guidelines, and *Eisenia fetida* earthworm rearing.
  4. **Natural Integrated Pest Management (IPM)**: Biological control agents (*Trichoderma*, *Bt*), companion planting matrix, and botanical formulations (Neem seed kernel extract).
  5. **Global & Regional Certification Standards**: PGS-India, USDA Organic, EU Organic, and Kenya Organic Standards (KOSt).
  6. **Frequently Asked Questions & Realistic Limitations**: Explains yield transitions and proper organic pesticide handling.

### 6. AI Farming Assistant (Panel 5)
- Conversational chat interface with online status indicator.
- Capable of explaining fertilization timing, composting formulas, and organic pest remedies.
- **Actionable Calendar Chips**: AI recommendations include interactive `[📅 Add to Calendar]` buttons that automatically inject tasks into the user's active crop calendar.
- Configurable server-side route supporting external LLM keys or built-in agronomic intelligence.

### 7. Crop Health & Disease Scanner (Panel 6)
- Upload or drag-and-drop plant leaf photos.
- Diagnostic engine identifying diseases (e.g., *Early Blight - 87% confidence*), listing visible symptoms, and providing safe organic treatments.
- Direct `Add to Calendar` button for treatment sprays.

### 8. Weather Information (Panel 7)
- Real-time weather integration with Open-Meteo API (no API key required).
- 7-day daily forecast cards with minimum/maximum temperatures, condition icons, and rain probabilities.
- Field indicators: Humidity (%), Wind speed (km/h), Soil moisture status, and Solar radiation.
- Weather-triggered agricultural alerts (optimal spraying windows, heavy rainfall cautions).

### 9. Market Prices & Selling Decisions (Panel 8)
- Multi-crop tabs (*Maize*, *Tomato*, *Beans*, *Lettuce*).
- Interactive 30-day price trend chart powered by Recharts.
- Current wholesale price display with percentage weekly changes and official sources.
- Evidence-based selling recommendations (advising whether to sell immediately or store).
- **Compare Markets Modal**: Compares net realized prices across regional trading hubs factoring in transport distances.
- **Net Revenue Calculator**: Input expected harvest yields, packaging, transport, and commission costs to determine deterministic net profit per kilogram.

### 10. Complete Crop Plan & Expense Calculator (Panel 9)
- Comprehensive crop sheet for the selected crop (*Tomato - Local Hybrid*).
- 4 Tabs: *Overview*, *Calendar*, *Costs & Returns*, and *Notes*.
- **11-Category Production Budget Calculator**: Real-time deterministic computation of Seeds, Compost, Fertilizers, Labour, Irrigation, Pest Management, Equipment, Storage, and Transport expenses vs expected harvest gross return.

### 11. Settings & Localization
- Language selector: English, Kiswahili, Hindi, Español, Français.
- Currency selector: KSh, ₹, $, €, £.
- Measurement units: Metric (hectares, kg, °C) vs Imperial (acres, lbs, °F).
- AI Provider & API Key manager.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested with Node.js v20 LTS)
- npm or pnpm

### Installation

1. Navigate to the project directory:
```bash
cd c:\Users\N.TEJESWANI\Downloads\project
```

2. Dependencies are already installed. If needed:
```bash
npm install
```

3. Initialize the Prisma database:
```bash
npx prisma generate
npx prisma db push
```

4. Run the production build or development server:
```bash
# To run in production mode:
npm run build
npm run start

# Or to run in development mode with hot reloading:
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🧪 Automated Testing

Run the automated test suite with Vitest:
```bash
npm test
```
Or run the TypeScript compiler check:
```bash
npx tsc --noEmit
```

---

## ⚙️ Environment Variables (`.env`)

| Variable | Description | Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | Prisma database connection string | `"file:./dev.db"` (SQLite) |
| `AI_PROVIDER` | AI service provider (`mock`, `gemini`, `openai`, `anthropic`) | `"mock"` |
| `AI_API_KEY` | Secret API key for external LLM calls | `""` (Optional) |
| `AI_MODEL` | Target model name | `"gemini-1.5-pro"` |
| `WEATHER_PROVIDER`| Weather service adapter | `"open-meteo"` (Free, no key required) |
| `AUTH_SECRET` | Session secret key | `"agri-guide-secret-jwt-key-2025"` |
