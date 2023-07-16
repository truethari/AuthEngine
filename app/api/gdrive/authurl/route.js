import { NextResponse } from "next/server";
import { google } from "googleapis";
const { OAuth2 } = google.auth;

export async function POST(request) {
  const url = request.url;
  const host = url.split("/api")[0];

  let requestBody;

  if (request.headers.get("content-type") !== "application/json")
    return NextResponse.json({ message: "Invalid content-type" }, { status: 400 });

  try {
    requestBody = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!requestBody.clientId)
    return NextResponse.json({ message: "Missing client_id" }, { status: 400 });
  if (!requestBody.clientSecret)
    return NextResponse.json({ message: "Missing client_secret" }, { status: 400 });
  if (!requestBody.scopes) return NextResponse.json({ message: "Missing scopes" }, { status: 400 });
  if (!Array.isArray(requestBody.scopes))
    return NextResponse.json({ message: "Scopes must be an array" }, { status: 400 });

  const credentials = {
    client_id: requestBody.clientId,
    client_secret: requestBody.clientSecret,
    redirect_uris: [`${host}/google/oauth/callback`],
  };

  const oAuth2Client = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.redirect_uris[0],
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: requestBody.scopes,
  });

  return NextResponse.json({ authUrl });
}
