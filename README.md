# StyleSense

### AI Haute Couture & Fashion Intelligence Platform

[![Frontend](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-61DAFB?logo=react\&logoColor=white)](https://react.dev/)
[![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-8E75B2)](https://ai.google.dev/)
[![Analytics](https://img.shields.io/badge/Data%20Science-SARIMA%20%7C%20K--Means%20%7C%20CLV-111827)]()
[![License](https://img.shields.io/badge/License-MIT-111827.svg)]()

> A full-stack fashion technology platform combining luxury e-commerce, artificial intelligence, personalized styling, and predictive data science.

---

## Table of Contents

* [Overview](#overview)
* [Project Objectives](#project-objectives)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Platform Modules](#platform-modules)
* [Fashion Catalog](#fashion-catalog)
* [AI Intelligence](#ai-intelligence)
* [Recommendation Engine](#recommendation-engine)
* [Virtual Try-On](#virtual-try-on)
* [Fashion Concierge](#fashion-concierge)
* [Commerce Intelligence](#commerce-intelligence)
* [VIP Loyalty System](#vip-loyalty-system)
* [Data Science & Analytics](#data-science--analytics)
* [Dashboard](#dashboard)
* [Data Architecture](#data-architecture)
* [Application Flow](#application-flow)
* [Project Structure](#project-structure)
* [API Architecture](#api-architecture)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Running the Application](#running-the-application)
* [Screenshots](#screenshots)
* [Technical Considerations](#technical-considerations)
* [Future Development](#future-development)
* [License](#license)
* [Author](#author)

---

# Overview

**StyleSense** is a full-stack AI and data science platform developed around the concept of intelligent luxury fashion commerce.

Instead of limiting the application to conventional product browsing and checkout functionality, StyleSense integrates intelligent services throughout the fashion discovery and purchasing lifecycle.

The platform combines:

* Luxury fashion product discovery
* AI-assisted fashion styling
* Image-based visual search
* Seasonal undertone and color analysis
* Virtual fitting experiences
* Outfit recommendation
* Conversational fashion assistance
* Intelligent cart recommendations
* VIP loyalty management
* Customer segmentation
* Seasonal demand forecasting
* Customer lifetime value analysis
* Business intelligence dashboards

The application currently provides a curated catalog of **60 products** across three primary fashion collections.

---

# Project Objectives

The main objective of StyleSense is to demonstrate how **full-stack engineering, artificial intelligence, and data science** can be integrated into a single domain-specific application.

The platform focuses on four major objectives:

### 1. Intelligent Fashion Discovery

Provide users with more meaningful ways to discover fashion beyond conventional keyword-based search.

### 2. Personalized Styling

Use AI-driven logic to provide context-aware outfit and color recommendations.

### 3. Data-Driven Commerce

Use customer and transaction data to support segmentation, forecasting, and business intelligence.

### 4. Premium User Experience

Combine modern web technologies with a luxury-oriented interface and responsive shopping workflow.

---

# System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                     │
│                                                               │
│                React + Vite + Tailwind CSS                    │
│                React Router + Lucide Icons                    │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                       │
│                                                               │
│             Components · Pages · State · Services             │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                         API LAYER                             │
│                                                               │
│                    Node.js + Express.js                       │
│                       REST Architecture                       │
└───────────────┬─────────────────────────────┬─────────────────┘
                │                             │
                ▼                             ▼
┌────────────────────────────┐   ┌─────────────────────────────┐
│     AI INTELLIGENCE        │   │     DATA SCIENCE LAYER      │
│                            │   │                             │
│ • Gemini API               │   │ • SARIMA Forecasting        │
│ • Visual Search            │   │ • K-Means Clustering        │
│ • Undertone Analysis       │   │ • CLV Analytics             │
│ • Recommendation Logic     │   │ • Revenue Analytics         │
│ • Virtual Try-On           │   │ • Customer Intelligence     │
└────────────────────────────┘   └─────────────────────────────┘
                │                             │
                └──────────────┬──────────────┘
                               ▼
┌───────────────────────────────────────────────────────────────┐
│                     BUSINESS INTELLIGENCE                     │
│                                                               │
│             Fashion Analytics & VIP Dashboard                 │
└───────────────────────────────────────────────────────────────┘
```

---

# Technology Stack

| Layer               | Technologies                               |
| ------------------- | ------------------------------------------ |
| Frontend            | React 18, Vite                             |
| Styling             | Tailwind CSS                               |
| Routing             | React Router v6                            |
| Icons               | Lucide React                               |
| Backend             | Node.js, Express.js                        |
| API                 | REST                                       |
| Generative AI       | Google Gemini API                          |
| Visual Intelligence | Feature Representation & Vector Similarity |
| Color Intelligence  | Seasonal Undertone Analysis                |
| Recommendation      | Similarity & Ensemble Recommendation Logic |
| Forecasting         | SARIMA                                     |
| Segmentation        | K-Means Clustering                         |
| Customer Analytics  | Customer Lifetime Value                    |
| Version Control     | Git, GitHub                                |

---

# Platform Modules

| Module                 | Purpose                             |
| ---------------------- | ----------------------------------- |
| Fashion Catalog        | Product discovery and browsing      |
| Visual Search          | Image-based fashion matching        |
| Undertone Matcher      | Color and seasonal profile analysis |
| Virtual Try-On         | Garment visualization               |
| Complete My Look       | Three-piece outfit generation       |
| Fashion Concierge      | Conversational styling              |
| Smart Cart             | Contextual shopping assistance      |
| Checkout               | Multi-channel purchase workflow     |
| Loyalty System         | VIP customer progression            |
| Customer Segmentation  | Behavioral grouping                 |
| Demand Forecasting     | Seasonal demand prediction          |
| CLV Analytics          | Customer value estimation           |
| Intelligence Dashboard | Business analytics                  |

---

# Fashion Catalog

StyleSense contains a curated **60-piece catalog**.

| Collection            |  Items |
| --------------------- | -----: |
| Women's Atelier       |     20 |
| Men's Sartorial       |     20 |
| High Jewels & Accents |     20 |
| **Total**             | **60** |

The catalog supports:

* Category navigation
* Keyword search
* Dynamic filtering
* Responsive product cards
* Product detail views
* Add-to-cart functionality
* Collection-based browsing

## Category Routing

The platform supports category-specific navigation using query parameters:

```text
?cat=women
?cat=men
?cat=accessories
```

This allows collection navigation without requiring separate static pages for each category.

---

# AI Intelligence

StyleSense integrates artificial intelligence across multiple stages of the customer journey.

## AI Architecture

```text
                    USER INPUT
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Text Query      Image Input      User Profile
        │               │                │
        ▼               ▼                ▼
    Gemini /       Visual Feature    Undertone /
    Concierge      Representation    Style Profile
        │               │                │
        └───────────────┼────────────────┘
                        ▼
              Recommendation Layer
                        │
                        ▼
              Personalized Results
```

---

# Visual Fashion Search

The Visual Search module enables users to discover products through reference images or moodboards.

The system conceptually processes visual characteristics such as:

* Texture
* Silhouette
* Shape
* Visual structure
* Style similarity

## Processing Pipeline

```text
Reference Image
       │
       ▼
Visual Feature Extraction
       │
       ▼
Feature Representation
       │
       ▼
Vector Similarity
       │
       ▼
Catalog Matching
       │
       ▼
Ranked Results
```

The objective is to provide a more intuitive alternative to traditional text-only product search.

---

# Color & Undertone Intelligence

StyleSense includes a seasonal undertone analysis system designed to associate users with fashion-oriented color profiles.

Example profiles include:

* Warm Autumn
* Cool Winter

The profile can be used as an additional signal for color recommendations.

## Example Pipeline

```text
User Image / Profile
        │
        ▼
Color Characteristics
        │
        ▼
Undertone Classification
        │
        ▼
Seasonal Profile
        │
        ▼
Compatible Color Palette
        │
        ▼
Fashion Recommendations
```

---

# Virtual Try-On

## Neural Fitting Room

The Virtual Try-On module provides an interactive garment visualization experience.

Users can select:

* Warm avatar
* Cool avatar
* Sartorial avatar
* Uploaded user photograph

The selected garment is then presented within the fitting experience.

The module is designed to demonstrate the integration of fashion interfaces with visual AI concepts.

---

# Recommendation Engine

## Complete My Look

The **Complete My Look** module generates a three-piece ensemble.

```text
Base Garment
      │
      ▼
Complementary Garment
      │
      ▼
Accessory
      │
      ▼
Complete Ensemble
      │
      ▼
10% Bundle Saving
```

The recommendation process considers compatibility between the selected base product and complementary fashion items.

This feature serves both:

* Personalized styling
* Intelligent cross-selling

---

# AI Fashion Concierge

The Fashion Concierge provides a conversational interface for fashion-related queries.

Example use cases:

```text
"What should I wear to an evening event?"

"Which accessories match this dress?"

"What colors suit a warm undertone?"

"Build a complete luxury look for me."
```

The concierge can combine conversational AI with the StyleSense product context to provide more relevant fashion guidance.

---

# Commerce Intelligence

## Smart Cart

The shopping cart includes contextual intelligence rather than functioning only as a product container.

### Free Courier Threshold

StyleSense provides a dynamic progress indicator toward the **LKR 75,000** free islandwide courier threshold.

```text
Current Cart Value
        │
        ▼
Progress Calculation
        │
        ▼
LKR 75,000 Threshold
        │
        ├── Not Reached → Show Remaining Amount
        │
        └── Reached → Free Islandwide Courier
```

### Outfit Completion Nudges

When a customer selects apparel without complementary accessories, the cart can suggest relevant additions.

---

# Checkout

StyleSense provides a multi-channel checkout experience.

| Payment Method | Description                          |
| -------------- | ------------------------------------ |
| Card Payment   | Visa / Mastercard / American Express |
| Bank Transfer  | Direct elite bank transfer workflow  |
| COD            | Doorstep valet courier               |

The checkout interface is designed as a dedicated application workflow with clear separation between cart, customer information, and payment selection.

---

# VIP Loyalty System

The `/dashboard` module includes a tier-based loyalty system.

```text
Silver
   │
   ▼
Gold
   │
   ▼
Haute Privé VIP
   │
   ▼
Black Bespoke
```

The loyalty system tracks:

* Current tier
* Reward points
* Purchase history
* Progress toward next tier
* Customer activity

---

# Data Science & Analytics

The data science layer transforms commerce data into predictive and descriptive intelligence.

The primary analytical methods include:

* SARIMA
* K-Means Clustering
* Customer Lifetime Value
* Revenue Analytics
* Customer Acquisition Analysis

---

# SARIMA Demand Forecasting

Seasonal demand forecasting is designed to identify recurring demand patterns and estimate future demand.

## Forecasting Pipeline

```text
Historical Transaction Data
            │
            ▼
     Data Preparation
            │
            ▼
    Time-Series Analysis
            │
            ▼
      Seasonality Study
            │
            ▼
       SARIMA Model
            │
            ▼
    Forecast Generation
            │
            ▼
      Business Insight
```

Potential applications include:

* Inventory planning
* Seasonal collection planning
* Demand monitoring
* Stock allocation
* Product trend analysis

### Forecast Chart

Once actual SARIMA output is available, the README should include a chart such as:

```text
Historical Demand ───────────────┐
                                │
                                ▼
                         Forecast Horizon
                                │
                    ─ ─ ─ ─ ─ ─ ─ ─ ─
```

Recommended asset:

```text
docs/
└── assets/
    └── sarima-demand-forecast.png
```

---

# K-Means Customer Segmentation

K-Means clustering is used to identify customer groups based on behavioral characteristics.

Potential features include:

* Purchase frequency
* Total spending
* Average order value
* Product preferences
* Engagement patterns

## Segmentation Pipeline

```text
Customer Transactions
        │
        ▼
Feature Engineering
        │
        ▼
Feature Scaling
        │
        ▼
K-Means Clustering
        │
        ▼
Customer Segments
        │
        ▼
Business Interpretation
```

Example conceptual groups:

```text
Customer Population
        │
        ├── Occasional Shoppers
        │
        ├── Premium Buyers
        │
        └── Loyal / VIP Customers
```

Actual cluster names should be assigned after analyzing the characteristics of each cluster rather than assuming them beforehand.

---

# Customer Lifetime Value

Customer Lifetime Value analysis estimates the potential long-term value of customers or customer segments.

CLV can support:

* VIP identification
* Retention prioritization
* Marketing allocation
* Customer segmentation
* Revenue planning

```text
Purchase History
      │
      ▼
Customer Behavior
      │
      ▼
Value Estimation
      │
      ▼
Customer Lifetime Value
      │
      ▼
Business Decision
```

---

# Business Intelligence Dashboard

The Fashion Intelligence Dashboard consolidates descriptive and predictive metrics.

## Dashboard Categories

### Revenue Intelligence

* Gross revenue
* Sales performance
* Order activity
* Revenue trends

### Customer Intelligence

* Customer segments
* Acquisition history
* Purchase behavior
* CLV

### Predictive Intelligence

* Demand forecasts
* Seasonal trends
* Product demand patterns

### Loyalty Intelligence

* VIP tiers
* Reward points
* Customer progression

---

# Analytics Visualization Strategy

The dashboard should prioritize clear visual communication.

Recommended visualization types:

| Analysis                    | Recommended Chart     |
| --------------------------- | --------------------- |
| Revenue over time           | Line chart            |
| Product/category sales      | Bar chart             |
| Customer segments           | Scatter / bar chart   |
| Revenue composition         | Donut / pie chart     |
| SARIMA forecast             | Line chart            |
| Customer value distribution | Histogram / bar chart |
| Loyalty distribution        | Bar chart             |
| Acquisition trend           | Line chart            |

Charts should use a consistent visual language based on the StyleSense luxury interface.

### Recommended Brand Palette

```text
Obsidian Black     #0B0B0D
Ivory              #F5F1EA
Champagne Gold     #B89B5E
Soft Gold          #D8C7A3
Taupe              #6E6257
White              #FFFFFF
```

The palette should be used consistently across:

* Dashboard cards
* Chart accents
* Buttons
* Section highlights
* Data visualization
* Documentation screenshots

---

# Data Architecture

StyleSense uses a dual data retrieval architecture.

```text
                    Product Request
                          │
                          ▼
                    REST API
                     /     \
                    /       \
             Available     Unavailable
                │               │
                ▼               ▼
          Server Dataset   Client Fallback
                │               │
                └───────┬───────┘
                        ▼
                  Application UI
```

## Primary Data Source

The frontend retrieves application data through the Node.js/Express REST API.

## Client Fallback

A predefined client-side dataset ensures that the core shopping experience remains functional when the API is temporarily unavailable.

This provides a simple resilience mechanism for the current application architecture.

---

# Application Flow

```text
                         USER
                          │
                          ▼
                  Homepage / Discovery
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       Catalog       Visual Search     Concierge
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                 Product Discovery
                          │
                          ▼
                 AI Styling Signals
                          │
                          ▼
                Complete My Look
                          │
                          ▼
                        CART
                          │
                    Smart Nudges
                          │
                          ▼
                      CHECKOUT
                          │
                          ▼
                     PURCHASE
                          │
                          ▼
                  Transaction Data
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          K-Means        CLV         SARIMA
             │            │            │
             └────────────┼────────────┘
                          ▼
                 Intelligence Dashboard
```

---

# Project Structure

```text
StyleSense/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── data/
│   │   ├── hooks/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middleware/
│   ├── data/
│   └── server.js
│
├── analytics/
│   ├── forecasting/
│   │   └── sarima/
│   ├── segmentation/
│   │   └── kmeans/
│   ├── customer-value/
│   │   └── clv/
│   └── notebooks/
│
├── docs/
│   └── assets/
│       ├── architecture.png
│       ├── sarima-demand-forecast.png
│       ├── customer-segmentation.png
│       └── dashboard.png
│
├── .gitignore
├── README.md
└── package.json
```

---

# API Architecture

The backend follows a REST-oriented architecture.

```text
Client
  │
  ▼
HTTP Request
  │
  ▼
Express Router
  │
  ▼
Controller
  │
  ▼
Service Layer
  │
  ▼
Data / AI Logic
  │
  ▼
Response
  │
  ▼
React Client
```

The architecture separates:

* Routing
* Request handling
* Business logic
* AI services
* Data access
* Error handling

This separation allows individual services to evolve independently.

---

# Installation

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

---

## Clone Repository

```bash
git clone <repository-url>
cd StyleSense
```

---

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Install Backend Dependencies

```bash
cd ../backend
npm install
```

---

# Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit `.env` files containing credentials to GitHub.

Recommended `.gitignore` entry:

```gitignore
.env
.env.*
node_modules/
dist/
```

---

# Running the Application

## Start Backend

```bash
cd backend
npm run dev
```

## Start Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

The Vite development server will provide the local frontend URL.

---

# Screenshots

Screenshots should be stored under:

```text
docs/assets/
```

Recommended screenshots:

```text
docs/assets/
├── homepage.png
├── women-atelier.png
├── men-sartorial.png
├── accessories.png
├── product-detail.png
├── visual-search.png
├── undertone-matcher.png
├── virtual-try-on.png
├── complete-my-look.png
├── fashion-concierge.png
├── smart-cart.png
├── checkout.png
├── vip-dashboard.png
└── analytics-dashboard.png
```

Example README usage:

```markdown
## Application Preview

![StyleSense Homepage](docs/assets/homepage.png)

![AI Visual Search](docs/assets/visual-search.png)

![Fashion Intelligence Dashboard](docs/assets/analytics-dashboard.png)
```

---

# Technical Considerations

## Resilience

The application uses a server-first data retrieval strategy with a client-side fallback dataset.

## Modularity

Frontend, backend, AI, and analytics responsibilities are separated into logical modules.

## Scalability

The REST architecture allows additional services and external data sources to be integrated in future versions.

## AI Integration

AI capabilities are exposed as application features rather than existing independently from the commerce workflow.

## Data Science Integration

Analytics modules are designed to support business decisions rather than functioning solely as standalone machine learning demonstrations.

---

# Current Limitations

The current implementation is primarily a portfolio and prototype-oriented platform.

Potential production-level improvements include:

* Persistent production database integration
* Production authentication and authorization
* Real payment gateway integration
* Production-grade image embeddings
* Advanced computer vision models
* Real-time virtual try-on generation
* Automated model retraining
* Production monitoring and logging
* Cloud deployment
* Automated testing and CI/CD

These limitations provide a roadmap for future development.

---

# Future Development

Planned enhancements include:

### Artificial Intelligence

* Multimodal fashion embeddings
* Advanced visual retrieval
* Personalized recommendation models
* Improved conversational context
* Automated fashion trend detection

### Computer Vision

* Production-grade garment segmentation
* Real-time garment detection
* Improved virtual try-on generation

### Data Science

* Real-time demand forecasting
* Customer churn prediction
* Dynamic customer lifetime value
* Recommendation model evaluation
* Automated business insight generation

### Engineering

* Production database
* Authentication and authorization
* Payment gateway integration
* Cloud deployment
* CI/CD pipelines
* Automated testing
* Application monitoring

---

# Engineering Focus

StyleSense demonstrates the integration of several software engineering and data science disciplines.

### Frontend Engineering

* Component-based architecture
* Responsive interface design
* Client-side routing
* Interactive state management

### Backend Engineering

* REST API architecture
* Modular services
* Request handling
* Error management

### Artificial Intelligence

* Generative AI integration
* Visual similarity
* Conversational AI
* Fashion recommendation logic

### Data Science

* Time-series forecasting
* Customer clustering
* Customer lifetime value
* Business intelligence

---

# Project Vision

StyleSense is built around the idea that modern fashion platforms can move beyond traditional product catalogs.

The goal is to create an ecosystem where:

```text
Discovery
    ↓
Understanding
    ↓
Personalization
    ↓
Recommendation
    ↓
Purchase
    ↓
Analytics
    ↓
Prediction
```

Artificial intelligence supports the customer experience, while data science supports the business decision-making process.

The resulting platform connects **fashion, technology, and intelligence** within a single full-stack application.

---

# License

This project is licensed under the MIT License.

---

# Author

## Nipuni Theekshana

**BSc (Hons) Data Science**

Areas of interest:

`Artificial Intelligence` · `Machine Learning` · `Data Science` · `Full-Stack Development` · `Predictive Analytics` · `Generative AI`

---

<p align="center">
  <strong>StyleSense</strong><br>
  AI Haute Couture & Fashion Intelligence Platform
</p>
