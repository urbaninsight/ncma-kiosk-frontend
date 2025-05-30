import MuseumObjectScreen from "@/components/museum-object-screen/museum-object-screen";
import SuspenseWrapper from "@/components/suspense-wrapper/suspense-wrapper";
import MuseumObjectContextWrapper from "@/context/museum-object-context";

interface AnnotatedImagePageProps {
  params: {
    annotatedImageId: string;
  };
}

export default async function AnnotatedImagePage({
  params,
}: AnnotatedImagePageProps) {
  const { annotatedImageId } = params;

  return (
    <MuseumObjectContextWrapper>
      <SuspenseWrapper>
        <MuseumObjectScreen annotatedImageId={annotatedImageId} />
      </SuspenseWrapper>
    </MuseumObjectContextWrapper>
  );
}

export async function generateStaticParams() {
  // Create basic auth headers for direct Drupal API call
  const credentials = Buffer.from(
    `${process.env.WP_API_UNAME}:${process.env.WP_API_PASS}`,
  ).toString("base64");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image`,
    {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      next: { revalidate: 60 * 60 * 6 }, // Revalidate every 6 hours
    },
  );

  if (!res.ok) {
    console.error("Failed to fetch annotated image IDs");
    return [{ annotatedImageId: "13" }]; // Fallback to default ID
  }

  const data = await res.json();

  return data.map((id: number) => ({
    annotatedImageId: id.toString(),
  }));
}
