import Header from "../../components/Header";
import Footer from "../../components/Footer";
// import {ThemeProvider} from "../../components/ThemeProvider"

export default function SiteLayout({ children }) {
  return (

      <div >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />

        </div>
  );
}
