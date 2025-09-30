# JPMorgan Inspired Loan Application

A modern loan application system built with React, TypeScript, and JPMorgan's Salt Design System. Currently features a comprehensive loan list page with search, filtering, and management capabilities. Additional features are planned for future releases.

## 🚀 Quick Start

### Prerequisites

- Node.js v22.16.0
- npm or yarn

### Installation & Setup

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd loan-application-form
   npm install
   ```

2. **Setup environment variables**

   Create a `.env` file in the root directory with the following configuration:

   ```bash
   # Create environment file
   touch .env

   # Add the configuration (copy the values below)
   ```

   **Required environment variables:**

   ```env
   VITE_PUBLIC_BACKEND_URL=http://localhost:5001
   VITE_PUBLIC_TANSTACK_STALE_TIME=300000
   VITE_PUBLIC_TANSTACK_GARBAGE_COLLECTION_TIME=600000
   VITE_PUBLIC_API_TIMEOUT=300000
   ```

3. **Start the application**

   ```bash
   # Terminal 1: Start the JSON Server
   npm run server

   # Terminal 2: Start the Frontend
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## ✨ Current Features

- **Loan List Management**: View and manage all loan applications
- **Advanced Search**: Real-time search by applicant name
- **Status Filtering**: Filter loans by status (All, Approved, Pending, Rejected, Draft)
- **Responsive Table**: Professional data display with sortable columns
- **Action Buttons**: Edit and delete functionality for each loan
- **Professional UI**: JPMorgan Salt Design System integration
- **Type Safety**: Full TypeScript implementation
- **Code Splitting**: Optimized performance with lazy loading
- **Security Features**: Comprehensive input sanitization and XSS protection
- **End-to-End Testing**: Playwright tests for cross-browser compatibility

## 🚧 Future Plans

- **3-Step Loan Form**: Personal info → Financial details → Review
- **Real-time Validation**: Instant feedback with meaningful errors
- **Loan Detail Pages**: Comprehensive loan information view
- **Form Persistence**: Data retention across form steps
- **Enhanced Error Handling**: User-friendly error messages
- **Analytics Dashboard**: Loan statistics and insights

## 🛠️ Tech Stack

- React 19.1.1 + TypeScript 5.8.3
- Vite 7.1.2 (Build Tool)
- JPMorgan Salt Design System 1.48.0
- TanStack Query 5.89.0 (State Management)
- React Router v7.9.1
- Tailwind CSS 4.1.13
- JSON Server 1.0.0-beta.3 (Mock API)
- Playwright 1.55.1 (End-to-End Testing)
- Node.js v22.16.0 + npm 10.9.2

## 🧪 Testing

This project includes comprehensive end-to-end testing using Playwright to ensure the application works correctly across different browsers and scenarios.

### Test Coverage

- **Header Component**: Tests header rendering, navigation, and styling
- **Cross-Browser Testing**: Chrome, Firefox, and Safari compatibility
- **User Interactions**: Button clicks, navigation, and form interactions
- **Visual Regression**: Ensures UI consistency across browsers

## Future Test

### Planned Test Coverage

- **Search and Filter Functionality**: Advanced search and filtering behavior

### Running Tests

```bash
# Run all tests (headless)
npm run test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with interactive UI
npm run test:ui

# View detailed test report
npm run test:report
```

### Test Structure

```
playwright/
├── header.spec.ts          # Header component tests
└── example.spec.ts         # Example tests (can be removed)

playwright.config.ts        # Playwright configuration
```

## 🔒 Security Features

This application implements comprehensive security measures to protect against common web vulnerabilities:

### Input Sanitization

- **Multi-layer sanitization** for all user inputs
- **XSS prevention** through dangerous pattern blocking
- **Path traversal protection** for URL manipulation
- **Length limits** to prevent DoS attacks

### Security Measures

- **Query parameter validation** with allowlist-based filtering
- **Pathname sanitization** to prevent directory traversal
- **Search input cleaning** for safe search functionality
- **Comprehensive logging** for security monitoring

### Security Configuration

- **Centralized security constants** in `src/statics/security-config.ts`
- **Sanitization utilities** in `src/utils/security-sanitization.ts`
- **React hook integration** for consistent security application

## 🎯 How It Works

### Current Implementation

1. **Loan List View**: Browse all loan applications in a professional table
2. **Search Functionality**: Find specific loans by applicant name
3. **Status Management**: Filter and view loans by their current status
4. **Quick Actions**: Edit or delete loan applications directly from the list

### Planned Features

1. **Personal Information**: Name, email, phone validation
2. **Financial Details**: Income, loan amount, employment status
3. **Review & Submit**: Data summary with confirmation

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start mock API server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
npm run validate     # Run lint and type-check
npm run test         # Run Playwright tests
npm run test:headed  # Run tests with browser visible
npm run test:debug   # Run tests in debug mode
npm run test:ui      # Run tests with interactive UI
npm run test:report  # View test results report
```

## ⚠️ Known Limitations

### JSON Server Search Behavior

The current implementation uses JSON Server for the mock API, which has specific search limitations:

- **Exact Match Required**: The search functionality requires typing the complete name to get results
- **No Partial Matching**: JSON Server doesn't support partial text matching out of the box
- **Case Sensitive**: Search is case-sensitive by default

**Example**: To find "John Doe", you need to type the complete name "John Doe" rather than just "John" or "Doe".

**Workaround**: For development purposes, try typing the full name as it appears in the database for best results.

---

**Note**: This is a demonstration project inspired by JPMorgan's design principles.
