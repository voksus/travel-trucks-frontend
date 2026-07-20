# TravelTrucks Frontend App

A modern, responsive React-based web application for campervan rental services. Built as a frontend client that integrates with a REST API to search, filter, and book campervans.

## 🌟 Key Features

* **Home Page:** Dynamic landing page with a Call to Action pointing directly to the catalog.
* **Interactive Catalog:** Displays available campervans with lazy load pagination ("Load More").
* **Advanced Multi-Criteria Filtering:**
  * Location text search.
  * Body type selection (exclusive single choice: panel truck, fully integrated, alcove).
  * Equipment filtering (multiple choice: AC, kitchen, bathroom, TV, radio, refrigerator, microwave, gas, water).
* **"No Campers Found" State:** Friendly visual indication when filter combinations yield zero results, featuring quick buttons to reset filters or reload all campers.
* **Detailed Camper Profiles (`/catalog/:id`):** 
  * Displays complete specs, dimensions (length, width, tank, consumption), and layout configurations.
  * Image gallery of the camper.
  * Customer reviews rated on a 5-star scale.
  * Fully validated **Booking Form** with real-time field validation and success notifications.
* **⚡ Real-Time Cross-Tab Favorites Synchronization:** Campers can be favorited from either the catalog cards or the details page. Favorites are stored in local storage and managed via Redux. Changes instantly sync across multiple open browser tabs/windows using a custom `storage` and `focus` listener interface.
* **404 Not Found Page:** Custom styled page handling invalid routes ("Lost in the Digital Wilderness") with a redirection back to home.
* **Async Indicators:** Global spinner loaders managing pending API requests to ensure a smooth user experience.

## 🛠️ Technology Stack

* **Core Framework:** React 18 with Vite build tool.
* **State Management:** Redux Toolkit (managing slice states for campers list, filtering criteria, and synchronized favorites).
* **Routing:** React Router v6.
* **API Calls:** Axios client with base configurations.
* **Styling:** Vanilla CSS with CSS Modules for component scoping.
* **Icons:** React Icons (`fa6`, `im`, `bs`, `gi`, `lu`, `bi`, `md`, `fi`).

## ⚙️ Architecture & Technical Highlights

* **MockAPI 404 Interceptor:** Axios response interceptor custom-built to catch MockAPI's 404 responses when filters yield 0 results, resolving them gracefully as `{ items: [], total: 0 }`.
* **DRY (Don't Repeat Yourself):** Reusable utilities for string formatting, location normalization, and localized price representation are structured in `src/utils/formatters.js`.
* **Component-Driven Development:** Decoupled, reusable components (Header, Catalog, Sidebar, CamperCard, CamperDetails) organized cleanly under `src/components/`.
* **Centralized API Services:** API interactions are localized in `src/services/api.js` using Axios configurations.
* **Redux Architecture:** Clear separation of asynchronous operations (`operations.js`), selectors (`selectors.js`), and slice reducers (`slice.js`).

## 🚀 Installation & Local Development

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/voksus/travel-trucks-frontend
   cd travel-trucks-frontend
