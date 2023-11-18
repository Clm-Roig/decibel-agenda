import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { mustBeAuthenticatedError, toResponse } from "@/domain/errors";
import prisma from "@/lib/prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { idOrSlug: string } },
) {
  const { idOrSlug: rawIdOrSlug } = params;
  const idOrSlug = decodeURIComponent(rawIdOrSlug);
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) {
    return toResponse(mustBeAuthenticatedError);
  }
  try {
    await prisma.gig.updateMany({
      where: {
        OR: [
          {
            id: {
              equals: idOrSlug,
            },
          },
          {
            slug: {
              equals: idOrSlug,
            },
          },
        ],
      },
      data: {
        isCanceled: true,
      },
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json(
        {
          message:
            "There was an error with your data when trying to cancel a gig.",
        },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occured." },
      { status: 500 },
    );
  }
}
