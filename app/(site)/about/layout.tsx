import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("about");
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}