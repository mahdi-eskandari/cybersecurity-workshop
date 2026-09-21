import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("blogs");
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
