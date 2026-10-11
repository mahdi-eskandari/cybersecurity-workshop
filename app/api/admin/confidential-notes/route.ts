import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Types } from "mongoose";
import connectDB from "@/lib/mongodb";
import User from "../../../model/User";
import ConfidentialNote from "../../../model/ConfidentialNote";

interface JwtPayload {
  userId: string;
  username?: string;
  role?: string;
}

async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not configured");

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

  if (!decoded.userId || !Types.ObjectId.isValid(decoded.userId)) return null;

  const user = await User.findById(decoded.userId).select("_id username name role").lean();

  if (user) {
    if (user.role !== "admin") return null;
    return {
      id: user._id.toString(),
      username: user.username || user.name || decoded.username || "ادمین",
    };
  }

  // کاربر تو این کالکشن پیدا نشد؛ به نقش داخل توکن امضاشده اعتماد می‌کنیم
  if (decoded.role !== "admin") return null;
  return {
    id: decoded.userId,
    username: decoded.username || "ادمین",
  };
}

export async function GET(request: Request) {
  try {
    await connectDB();
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!reportId || !Types.ObjectId.isValid(reportId)) {
      return NextResponse.json({ error: "reportId is required" }, { status: 400 });
    }

    const notes = await ConfidentialNote.find({ reportId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load confidential notes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await request.json();
    const reportId = String(body?.reportId || "");
    const text = String(body?.text || "").trim();

    if (!Types.ObjectId.isValid(reportId)) {
      return NextResponse.json({ error: "Invalid reportId" }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: "Text is too long" }, { status: 400 });
    }

    const note = await ConfidentialNote.create({
      reportId,
      authorId: admin.id,
      authorName: admin.username,
      text,
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create confidential note" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectDB();
    const admin = await getAdmin();
    if (!admin) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await request.json();
    const id = String(body?.id || "");
    const text = String(body?.text || "").trim();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid note id" }, { status: 400 });
    }

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 5000) {
      return NextResponse.json({ error: "Text is too long" }, { status: 400 });
    }

    const note = await ConfidentialNote.findOneAndUpdate(
      { _id: id, authorId: admin.id },
      { $set: { text } },
      { new: true, runValidators: true }
    ).lean();

    if (!note) {
      return NextResponse.json({ error: "Note not found or not owned by this admin" }, { status: 404 });
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update confidential note" }, { status: 500 });
  }
}
