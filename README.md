# Flame App

A minimalistic mobile dating application prototype built with **React Native Expo** for the Lead/Senior React Native Developer Technical Assessment.

## Project Architecture

We use a feature-based structure to organize the codebase cleanly and modularly:
* **`src/app/`**: Thin routing layer (Expo Router). Holds route configurations and entry files that delegate rendering to features.
* **`src/features/`**: Domain-driven feature directories containing feature-specific components, hooks, and screens.
* **`src/shared/`**: Global reusable UI components, hooks, types, theme tokens, and data.

### Architectural Justification
* **Modular Domain Isolation**: I kept `src/app/` as a thin routing layer and isolated feature logic into `src/features/` so each screen's concerns are self-contained, while truly reusable pieces live in `src/shared/`.
* **Native Thread Swipe Performance**: The swipe card deck is optimized for fluid visual performance by prioritizing **native thread animation execution** through the combination of `react-native-gesture-handler` and `react-native-reanimated`.
  - All physics calculations, card transformations, rotation, and stamp opacity interpolation run fully on the **native UI thread**, completely avoiding JS-bridge communication bottleneck latency during card tracking.
  - To prevent thread blockages, interactive callbacks and navigation events are delegated to the JS thread asynchronously using `scheduleOnRN` from `react-native-worklets` only after the card is released and the swipe completes.

---

## Application Requirements

The application is structured to fulfill the following core specifications:

### 1. Welcome / Discover Screen
* Serving as the main entry point to the application.
* Features custom branding/app title, welcome message, and clear call-to-action button.
* **Path**: `src/features/welcome/screens/welcome-screen.tsx` (routed via `src/app/index.tsx`).

### 2. Swipe Match Screen
* Tinder-like swiping behavior (left/right gestures) utilizing smooth animations.
* Display profile cards populated with name, age, bio, interests, and profile images.
* Loaded from shared mock profile data using Unsplash placeholders.
* **Path**: `src/features/swipe/screens/swipe-screen.tsx` (routed via `src/app/explore.tsx`).

### 3. Match / Profile Details Screen
* Better profile presentation detailing the selected/matched profile.
* Includes specialized interaction areas such as messaging triggers, like indicators, and match confirmations.
* **Path**: `src/features/profile/screens/profile-detail-screen.tsx` (routed via `src/app/profile.tsx`).

---

## Design System & Style Requirements

The application adheres to a **minimalistic design style**:
* **Background / Primary**: White
* **Secondary**: Grey
* **Contrast / Texts**: Black
* **Accent Color**: Red

The user experience focuses on being clean, modern, consistent, and easy to navigate.

---

## Tech Stack
* **Framework**: React Native Expo (SDK 56)
* **Routing**: Expo Router (file-based routing via `src/app`)
* **Gestures & Animations**: React Native Gesture Handler, React Native Reanimated
* **Media & Iconography**: Expo Image, Expo Symbols
* **Language**: TypeScript

---

## Setup & Installation

### Prerequisites
* Node.js (v18 or higher recommended)
* npm or yarn
* Expo Go app installed on your physical device (or iOS Simulator/Android Emulator configured)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Morizuq/flick-app.git
   cd flick-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Expo development server:
   ```bash
   npm run start
   ```
4. Open the app:
   * Press `i` to open in iOS Simulator.
   * Press `a` to open in Android Emulator.
   * Scan the QR code displayed in the terminal with the Expo Go app to test on a physical device.

---

## APK Download Information
* **Google Drive Link**: _To be added upon generation_
* **Download Instructions**:
  1. Open the Google Drive link provided.
  2. Download the `.apk` file to your Android device.
  3. Locate the file in your device's downloads and tap to install (you may need to allow installations from unknown sources in settings).
  4. Launch the app from the app drawer.

---

## Assumptions & Limitations
* **Assumptions**: The prototype operates entirely with local mock data for user profiles and does not connect to a live database or authentication backend.
* **Known Limitations**: User matches, likes, passes, and stack history are managed client-side in transient component state. Swipes and reset states are not persisted across application restarts.

---

## Submission Checklist
- [ ] gideonchukwuoma added as contributor
- [x] React Native Expo (SDK 56) used
- [x] Folder structure setup completed
- [x] Navigation configured
- [x] 3 required screens completed
- [x] Tinder-style swipe feature implemented
- [x] Minimalistic design followed
- [ ] APK created
- [ ] APK uploaded to Google Drive
- [ ] README.md completed with active links
- [x] Gideon updated throughout progress
- [x] Repository accessible
- [ ] App builds and runs successfully