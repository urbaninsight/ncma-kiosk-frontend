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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_API_URL}/wp-json/ncma/v1/ncma-annotated-image`,
  );
  const data = await res.json();

  return data.map((id: number) => ({
    annotatedImageId: id.toString(),
  }));
}
