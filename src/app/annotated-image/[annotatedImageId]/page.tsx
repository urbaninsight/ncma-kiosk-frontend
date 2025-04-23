import MuseumObjectScreen from "@/components/museum-object-screen/museum-object-screen";
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
      <MuseumObjectScreen annotatedImageId={annotatedImageId} />
    </MuseumObjectContextWrapper>
  );
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image`,
  );
  const data = await res.json();

  return data.map((item: { id: number }) => ({
    annotatedImageId: item.id.toString(),
  }));
}
