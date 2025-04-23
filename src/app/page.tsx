import MuseumObjectScreen from "@/components/museum-object-screen/museum-object-screen";
import MuseumObjectContextWrapper from "@/context/museum-object-context";

// TODO: replace with real homescreen?
export default function Home() {
  return (
    <MuseumObjectContextWrapper>
      <MuseumObjectScreen annotatedImageId="13" />
    </MuseumObjectContextWrapper>
  );
}
