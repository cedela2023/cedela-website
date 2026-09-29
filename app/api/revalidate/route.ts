import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Optional safety net alongside Sanity Live. Point a Sanity GROQ webhook at
 * /api/revalidate (secret: SANITY_REVALIDATE_SECRET) and every publish will
 * also purge the full route cache, so content stays fresh even on hosts or
 * pages where no browser is holding a live connection.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation secret not configured" }, { status: 500 });

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });

    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}
