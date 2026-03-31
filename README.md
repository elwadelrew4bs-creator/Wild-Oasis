# 🌴 The Wild Oasis 🏖️

![The Wild Oasis](https://img.shields.io/badge/React-19.2.4-blue) ![Vite](https://img.shields.io/badge/Vite-8.0.1-purple) ![Supabase](https://img.shields.io/badge/Supabase-2.100.1-green) ![Styled Components](https://img.shields.io/badge/Styled--Components-6.3.12-pink)

Welcome to **The Wild Oasis** - your ultimate hotel management dashboard! This modern, full-stack application empowers hotel staff to seamlessly manage bookings, cabins, guests, and operations with an intuitive and beautiful interface.

## ✨ Features

### 🏨 Core Functionality
- **Authentication System**: Secure login/signup with role-based access
- **Dashboard Analytics**: Real-time insights with interactive charts and statistics
- **Booking Management**: Complete booking lifecycle from creation to checkout
- **Cabin Management**: CRUD operations for hotel cabins with image uploads
- **Guest Management**: Comprehensive guest profiles and history
- **Check-in/Check-out**: Streamlined processes with automated workflows

### 📊 Advanced Features
- **Real-time Data**: Live updates using React Query for optimal performance
- **Responsive Design**: Beautiful UI that works perfectly on all devices
- **Dark/Light Mode**: Adaptive theming for comfortable viewing
- **Data Visualization**: Stunning charts for sales, occupancy, and trends
- **Search & Filter**: Powerful filtering across all data tables
- **Pagination**: Efficient handling of large datasets

### 🛠️ Technical Highlights
- **Modern React**: Built with React 19 and hooks
- **Fast Development**: Vite for lightning-fast builds and HMR
- **Styling**: Styled Components for maintainable CSS-in-JS
- **State Management**: React Query for server state management
- **Backend**: Supabase for database and authentication
- **Form Handling**: React Hook Form for robust forms
- **Date Management**: Date-fns for reliable date operations
- **Icons**: React Icons for consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project on [Supabase](https://supabase.com)
   - Copy your project URL and anon key
   - Create the necessary tables (check the data folder for sample data)

4. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   │   ├── authentication/
│   │   ├── bookings/
│   │   ├── cabins/
│   │   ├── check-in-out/
│   │   ├── dashboard/
│   │   └── settings/
│   └── pages/        # Page components
├── hooks/            # Custom React hooks
├── services/         # API services and Supabase client
├── styles/           # Global styles
├── utils/            # Helper functions
└── data/             # Sample data and upload utilities
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

The app features a comprehensive design system with:
- **Buttons**: Multiple variants (primary, secondary, danger, etc.)
- **Forms**: Robust form components with validation
- **Tables**: Sortable, filterable data tables
- **Modals**: Accessible modal dialogs
- **Charts**: Interactive data visualizations
- **Navigation**: Responsive sidebar and header

## 🔒 Authentication

Secure authentication with:
- User registration and login
- Password updates
- Profile management
- Role-based permissions

## 📈 Dashboard Insights

Get valuable insights with:
- **Sales Charts**: Revenue tracking over time
- **Occupancy Stats**: Real-time cabin availability
- **Booking Trends**: Duration and booking patterns
- **Guest Analytics**: Customer behavior insights

## 🌟 Key Technologies

- **Frontend**: React 19, Vite, Styled Components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form
- **Icons**: React Icons
- **Dates**: date-fns
- **Notifications**: React Hot Toast

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by the need for efficient hotel management
- Special thanks to the React and Supabase communities

---

**Made with passion for seamless hotel operations!** 🌟
