import React from "react";
import ReactDOM from "react-dom/client"; // Import API createRoot
import { Provider } from "react-redux";  // Import Provider dari react-redux
import { store } from "./redux/store";   // Import store Redux
import App from "./App";
import AuthProvider from "./context/AuthContext"; // Pastikan path benar
import "./styles/global.css";
import './index.css';

// Tambahkan impor Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Buat root dengan createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* Bungkus aplikasi dengan Redux dan AuthContext */}
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
