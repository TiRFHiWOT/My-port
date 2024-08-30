import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/store/store";
import "@/app/globals.css";
import { Poppins } from "next/font/google";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default MyApp;
