import AddPet from "../../components/AddPet/AddPet";
import PetView from "../../components/PetView/PetView";
import PetsAllView from "../../components/PetsAllView/PetsAllView";

export default async function Page({ params }) {
  const { pet: id } = await params;

  if (id === "new") {
    return <AddPet />;
  }

  if (id === "all") {
    return <PetsAllView />;
  }

  return <PetView id={id} />;
}
