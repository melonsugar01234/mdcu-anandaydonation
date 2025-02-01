import { PersonalInfoForm } from "../components/PersonalInfoForm";
import StepNavigation from "../components/StepNavigation";
import Navbar from "../../components/Navbar";

export default function PersonalInfoPage() {
  return (
    <>
      <Navbar />
      <div className="mt-0 flex flex-col rounded-lg bg-white p-4 xs:p-0">
        <PersonalInfoForm />
        <StepNavigation />
      </div>
    </>
  );
}
