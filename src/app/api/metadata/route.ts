/**
 * This is a proxy route that forwards requests to the Drupal API while adding basic auth.
 * It handles requests for object metadata.
 */
import { NextRequest } from "next/server";

const DRUPAL_API_BASE = process.env.NEXT_PUBLIC_DRUPAL_API_URL;

// Basic auth headers
const credentials = Buffer.from(
  `${process.env.WP_API_UNAME}:${process.env.WP_API_PASS}`,
).toString("base64");
const headers = {
  Authorization: `Basic ${credentials}`,
};

export async function GET(request: NextRequest) {
  // Get the ID from the URL search params
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const url = `${DRUPAL_API_BASE}/wp-json/ncma/v1/ncma-annotated-image/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching from Drupal:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
