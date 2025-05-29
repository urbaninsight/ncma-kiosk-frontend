import { Buffer } from "buffer";

export interface Env {
  WP_API_UNAME: string;
  WP_API_PASS: string;
  NEXT_PUBLIC_DRUPAL_API_URL: string;
}

export const onRequest = async (context: any) => {
  const { searchParams } = new URL(context.request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id parameter" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Create basic auth headers
  const credentials = Buffer.from(
    `${context.env.WP_API_UNAME}:${context.env.WP_API_PASS}`,
  ).toString("base64");

  const url = `${context.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error fetching from Drupal:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
