import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const genres = await prisma.genre.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json({
    users: genres,
  });
}
