import Title from "../components/Works/Title";
import WorksList from "../components/Works/WorksList";
import "../styles/Works.css";


const WorksPage = () => {
  return (
    <section >
      <div className="container-fluid py-5 px-4 px-lg-5">
        <Title/>
        <div className="row align-items-start g-4 g-lg-5 mx-0">
            <WorksList/>
        </div>
      </div>
    </section>
  );
}

export default WorksPage;
