Cryptocurrency Tracker - Setup Guide

This guide will help you set up and run the Cryptocurrency Tracker project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Git

To check if you have Node.js and npm installed, run:
```bash
node --version
npm --version
```

## Step 1: Clone the Repository

1. Open your terminal
2. Clone the repository:
   ```bash
   git clone https://github.com/akriti-kesarwani/crypto_price-_tracker.git
   ```
3. Navigate to the project directory:
   ```bash
   cd crypto_price-_tracker
   ```

## Step 2: Install Dependencies

1. Install all required packages:
   ```bash
   npm install
   ```

2. If you encounter any issues, try:
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and package-lock.json
   rm -rf node_modules package-lock.json
   
   # Reinstall dependencies
   npm install
   ```

## Step 3: Environment Setup

1. Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

2. Add the following environment variables:
   ```env
   VITE_API_URL=your_api_url
   VITE_API_KEY=your_api_key
   ```
   (Contact the project administrator for the actual API credentials)

## Step 4: Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and visit:
   ```
   http://localhost:5173
   ```

The application should now be running with the cyberpunk-themed interface.

## Step 5: Building for Production

If you need to create a production build:

1. Create the build:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Common Issues and Solutions

1: Port Already in Use
If port 5173 is already in use:
```bash
# Kill the process using the port
lsof -i :5173
kill -9 [PID]
```

 2: Dependencies Not Found
If you see module not found errors:
```bash
# Remove node_modules
rm -rf node_modules
# Clear npm cache
npm cache clean --force
# Reinstall dependencies
npm install
```


Additional Commands

- Run ESLint:
  ```bash
  npm run lint
  ```

- Fix ESLint issues:
  ```bash
  npm run lint -- --fix
  ```
Project Structure

```
crypto-tracker/
├── src/                    
│   ├── app/              
│   ├── components/       
│   ├── features/         
│   └── assets/          
├── public/               
└── package.json         
```
![image](https://github.com/user-attachments/assets/4147b217-0b69-4301-97d3-14e3ca81f22c)




  
