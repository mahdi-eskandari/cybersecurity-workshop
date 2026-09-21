import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("privacy");
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}