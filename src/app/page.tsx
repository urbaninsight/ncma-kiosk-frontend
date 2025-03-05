import MuseumObjectScreen from "@/components/museum-object-screen/museum-object-screen";
import MuseumObjectContextWrapper from "@/context/museum-object-context";

export default function Home() {
  return (
    <MuseumObjectContextWrapper>
      <MuseumObjectScreen />
    </MuseumObjectContextWrapper>
  );
}
