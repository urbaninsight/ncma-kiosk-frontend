import MuseumObjectScreen from "@/components/museum-object-screen/museum-object-screen";
import SuspenseWrapper from "@/components/suspense-wrapper/suspense-wrapper";
import MuseumObjectContextWrapper from "@/context/museum-object-context";

// TODO: replace with real homescreen?
export default function Home() {
  return (
    <MuseumObjectContextWrapper>
      <SuspenseWrapper>
        <MuseumObjectScreen annotatedImageId="13" />
      </SuspenseWrapper>
    </MuseumObjectContextWrapper>
  );
}
