import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store/store";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Navbar />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
