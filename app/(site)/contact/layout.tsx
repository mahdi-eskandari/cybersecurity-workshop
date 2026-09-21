import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("contact");
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}