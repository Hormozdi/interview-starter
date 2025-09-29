import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE = "lingano.bookmarks";
const secret = new TextEncoder().encode(process.env.BOOKMARKS_SECRET || "dev-secret"); // TODO: set real secret in prod

type Payload = { ids: number[] };

export async function readBookmarks(): Promise<number[]> {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return [];
  try {
    const { payload } = await jwtVerify<Payload>(raw, secret);
    return payload.ids || [];
  } catch {
    return [];
  }
}

export async function writeBookmarks(ids: number[]) {
  const token = await new SignJWT({ ids })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d") 
    .sign(secret);

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, 
    maxAge: 60 * 60 * 24 * 7,
  });
}
