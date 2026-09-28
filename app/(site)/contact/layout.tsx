import Header from "@/components/Header";
import { getPageMetadata } from "../../../lib/seo";
import Footer from "@/components/Footer";

export async function generateMetadata() {
  return getPageMetadata("contact");
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   return (
       <div>
   
         <Header />
   
         <main className="flex-1">
           {children}
         </main>
   
         <Footer />
       </div>
     );
}