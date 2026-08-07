import { useEffect, useState } from "react";

import {
  createApplication,
  getCatalog,
  getBlueprints
} from "../services/api";

import ApplicationDetails from "./ApplicationDetails";
import InfrastructureDetails from "./InfrastructureDetails";
import BlueprintSelector from "./BlueprintSelector";
import SuccessCard from "./SuccessCard";

export default function ProvisionForm() {

  const [catalog, setCatalog] = useState<any>(null);
  const [blueprints, setBlueprints] = useState<any>(null);

  const [selectedBlueprint, setSelectedBlueprint] = useState("");

  const [applicationName, setApplicationName] = useState("");
  const [owner, setOwner] = useState("");
  const [team, setTeam] = useState("");

  const [cloud, setCloud] = useState("");
  const [region, setRegion] = useState("");
  const [environment, setEnvironment] = useState("");
  const [service, setService] = useState("");

  const [requestId, setRequestId] = useState("");

  const [deploymentPlan, setDeploymentPlan] = useState<string[]>([]);

  const [terraform, setTerraform] = useState<any>({});

  useEffect(() => {

    async function loadData() {

      const catalogData = await getCatalog();
      const blueprintData = await getBlueprints();

      setCatalog(catalogData);
      setBlueprints(blueprintData);

      const firstBlueprint = Object.keys(blueprintData)[0];

      setSelectedBlueprint(firstBlueprint);

      setCloud(blueprintData[firstBlueprint].cloud);
      setRegion(blueprintData[firstBlueprint].region);
      setEnvironment(blueprintData[firstBlueprint].environment);
      setService(blueprintData[firstBlueprint].service);

    }

    loadData();

  }, []);

  useEffect(() => {

    if (!blueprints || !selectedBlueprint) return;

    const blueprint = blueprints[selectedBlueprint];

    setCloud(blueprint.cloud);
    setRegion(blueprint.region);
    setEnvironment(blueprint.environment);
    setService(blueprint.service);

  }, [selectedBlueprint]);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const response = await createApplication({

      blueprint: selectedBlueprint,

      applicationName,

      owner,

      team,

      cloud,

      region,

      environment,

      service

    });

    setRequestId(response.requestId);

    setDeploymentPlan(response.deploymentPlan);

    setTerraform(response.terraform);

  }

  if (!catalog || !blueprints) {

    return <h3>Loading...</h3>;

  }

  return (

    <form onSubmit={handleSubmit}>

      <h2>Provision Application</h2>

      <BlueprintSelector

        blueprints={blueprints}

        selectedBlueprint={selectedBlueprint}

        setSelectedBlueprint={setSelectedBlueprint}

      />

      <ApplicationDetails

        applicationName={applicationName}

        owner={owner}

        team={team}

        setApplicationName={setApplicationName}

        setOwner={setOwner}

        setTeam={setTeam}

      />

      <InfrastructureDetails

        catalog={catalog}

        cloud={cloud}

        region={region}

        environment={environment}

        service={service}

        setCloud={setCloud}

        setRegion={setRegion}

        setEnvironment={setEnvironment}

        setService={setService}

      />

      <button type="submit">

        🚀 Provision

      </button>

      <SuccessCard

        requestId={requestId}

        deploymentPlan={deploymentPlan}

        terraform={terraform}

      />

    </form>

  );

}