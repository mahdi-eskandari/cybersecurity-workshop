import { getPageMetadata } from "../../../lib/seo";

export async function generateMetadata() {
  return getPageMetadata("home");
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}