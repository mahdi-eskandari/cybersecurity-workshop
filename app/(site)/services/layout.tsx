import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("services");
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}