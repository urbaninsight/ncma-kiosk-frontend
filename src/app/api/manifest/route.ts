/**
 * This is a proxy route that forwards requests to the Drupal API while adding basic auth.
 * It handles requests for IIIF manifests. The route is static but accepts query parameters
 * at runtime to avoid needing dynamic route segments for static export.
 */
import { NextResponse } from "next/server";

const DRUPAL_API_BASE = process.env.NEXT_PUBLIC_DRUPAL_API_URL;

// Basic auth headers
const credentials = Buffer.from(
  `${process.env.WP_API_UNAME}:${process.env.WP_API_PASS}`,
).toString("base64");
const headers = {
  Authorization: `Basic ${credentials}`,
};

// Config to enable static rendering
export const dynamic = "force-static";

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Missing id in request body" },
      { status: 400 },
    );
  }

  const url = `${DRUPAL_API_BASE}/wp-json/ncma/v1/ncma-annotated-image/${id}/IIIF`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "force-cache", // Force static generation
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Drupal:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
