
import StepNavigation from "../components/StepNavigation";
import Navbar from "../../components/Navbar";
import StepOneForm from "./StepOneForm";

export default function PersonalInfoPage() {
  return (
    <>
      <Navbar />
      <div className="mt-0 flex flex-col rounded-lg bg-white p-4 xs:p-0">
        <StepOneForm />
        <StepNavigation />
      </div>
    </>
  );
}
