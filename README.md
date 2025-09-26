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
- Node.js v22.16.0 + npm 10.9.2

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
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run server   # Start mock API server
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
