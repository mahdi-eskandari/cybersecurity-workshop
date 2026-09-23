import { headers } from "next/headers";
import AuthorsClient, { type Post } from "./AuthorsClient";

async function getPosts(): Promise<Post[]> {
  try {
    const h = await headers();
    const host = h.get("host");

    if (!host) {
      return [];
    }

    const protocol = h.get("x-forwarded-proto") ?? "http";
    const response = await fetch(`${protocol}://${host}/api/posts`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("خطا در دریافت پست‌ها");
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("فرمت اطلاعات پست‌ها صحیح نیست");
    }

    return data as Post[];
  } catch (error) {
    console.error("GET /api/posts error:", error);
    return [];
  }
}

const parsePage = (value?: string) => {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
};

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const params = await searchParams;
  const posts = await getPosts();
  const showAllPosts = params.view === "all";
  const currentPage = parsePage(params.page);

  return (
    <AuthorsClient
      posts={posts}
      authorSlug="mohammadreza-yousefi"
      showAllPosts={showAllPosts}
      currentPage={currentPage}
    />
  );
}
