# Filter Dashboard

## Description
A modern React-based dashboard application that provides filtering capabilities for data visualization. Built with TypeScript and Vite, this application offers a user-friendly interface for data filtering and analysis.

## Features

- **Interactive Filtering**: Filter numbers based on their modulo values using dropdown selectors
- **Multiple Modulo Support**: 
  - Modulo 350 (values: 0, 1, 2)
  - Modulo 8000 (values: 0, 1, 2, 3)
  - Modulo 20002 (values: 0, 1, 2, 3, 4)
- **Real-time Updates**: Data table updates instantly as filters are applied
- **Responsive Design**: Works well on both desktop and mobile devices
- **Error Handling**: Robust error handling with error boundaries
- **Data Validation**: Ensures all data is properly validated before display
- **Pagination**: Efficient data display with pagination support
- **CSV Data Support**: Loads and processes data from CSV files

## Technical Stack

- React
- TypeScript
- Vite
- PapaParse for CSV processing
- React Select for enhanced dropdowns


## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
# Clone the repository
git clone https://github.com/Lovkesh13/filter-dashboard.git

# Navigate to the project directory
cd filter-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

# Build for production
npm run build

# Preview production build
npm run preview

1. The dashboard displays a table of numbers and their corresponding modulo values
2. Use the dropdown filters at the top to select specific modulo values
3. The table will automatically update to show only the numbers that match all selected filters
4. You can select multiple values for each modulo filter
5. The filters can be applied in any order

## Data Format

The application expects a CSV file with the following columns:
- number: The original number
- mod350: Modulo 350 value
- mod8000: Modulo 8000 value
- mod20002: Modulo 20002 value

## Configuration
The project uses TypeScript for type safety and better development experience. Key configuration files:
- `tsconfig.json` - TypeScript compiler options
- `vite.config.ts` - Vite bundler configuration
- `eslint.config.js` - ESLint rules and settings
