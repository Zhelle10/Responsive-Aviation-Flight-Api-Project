# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Reflection

## Technical choices and reasons

I built the frontend using React because it makes creating interactive components easy. I used useState and useEffect to manage component state and handle side effects. Flight data is stored in localStorage, which makes it fast to access and filter. The backend is fully functional and handles API requests, returning flight data correctly. I used CSS for styling and Vite Testing Library to test components and ensure they work as expected. All frontend component files, PASSED.

## Strengths and weaknesses
The project works well: users can search, filter, and delete flights, and the backend communicates properly with the frontend. The testing ensures reliability. Weaknesses include a basic UI design, limited features, and full error handling.

## What I would do differently with more time
With more time, I would improve the UI and user experience, add more styling and more features. The app is also fully responsive for mobile devices and tablets.

## What I learned and how I can use it in the future
I learned how to connect frontend and backend, manage state in React, store and filter data in localStorage, and write tests for React components. This knowledge will help me in future projects to build full-stack web apps that are interactive, reliable, and easier to maintain.


AVIATION-TRACK-PROJ
 -backend
  node_modules
  .env
  errorHandler.js
  fetchFlight.js
  server.js
 -frontend
  src
  __tests__
   DeleteFlightButton.test.jsx
   ErrorMessage.test.jsx
   FlightDetails.test.jsx
   FlightLookup.test.jsx
   FlightSearch.test.jsx
  components
   DeleteFlightButton.jsx
   ErrorMessage.jsx
   FlightDetails.jsx
   FlightLookup.jsx
   FlightSearch.jsx
  styles
   DeleteFlightButton.css
   ErrorMessage.css
   FlightDetails.css
   FlightLookup.css
   FlightSearch.css
  App.jsx
  Index.css
  main.jsx
  setuptests.js
  .gitignore 


  I hid the API key inside the .env and then put it inside .gitignore so It would not be visible on github.
    
      