import { useEffect, useState } from "react";

import {
  createApplication,
  getCatalog,
  getBlueprints,
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const catalogData = await getCatalog();
        const blueprintData = await getBlueprints();

        setCatalog(catalogData);
        setBlueprints(blueprintData);

        const firstBlueprint = Object.keys(blueprintData)[0];

        if (firstBlueprint) {
          setSelectedBlueprint(firstBlueprint);

          setCloud(blueprintData[firstBlueprint].cloud);
          setRegion(blueprintData[firstBlueprint].region);
          setEnvironment(blueprintData[firstBlueprint].environment);
          setService(blueprintData[firstBlueprint].service);
        }
      } catch (error) {
        console.error("Failed to load platform catalog:", error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!blueprints || !selectedBlueprint) {
      return;
    }

    const blueprint = blueprints[selectedBlueprint];

    if (!blueprint) {
      return;
    }

    setCloud(blueprint.cloud);
    setRegion(blueprint.region);
    setEnvironment(blueprint.environment);
    setService(blueprint.service);
  }, [selectedBlueprint, blueprints]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!applicationName.trim()) {
      alert("Application name is required.");
      return;
    }

    if (!owner.trim()) {
      alert("Application owner is required.");
      return;
    }

    if (!team.trim()) {
      alert("Infrastructure operator is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createApplication({
        blueprint: selectedBlueprint,
        applicationName,
        owner,
        team,
        cloud,
        region,
        environment,
        service,
      });

      setRequestId(response.requestId);
      setDeploymentPlan(response.deploymentPlan || []);
      setTerraform(response.terraform || {});
    } catch (error) {
      console.error("Provision request failed:", error);
      alert("Provision request failed. Please check the Platform API.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!catalog || !blueprints) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>

        <div>
          <strong>Loading platform catalog</strong>
          <span>Preparing available blueprints and infrastructure options...</span>
        </div>
      </div>
    );
  }

  return (
    <form className="provision-form" onSubmit={handleSubmit}>
      {/* =====================================================
          REQUEST HEADER
      ====================================================== */}

      <div className="provision-header">
        <div className="provision-header-content">
          <div className="section-eyebrow">PLATFORM REQUEST</div>

          <h2>Provision Application</h2>

          <p>
            Define your application and infrastructure requirements.
            Velocity will generate and provision the required cloud resources.
          </p>
        </div>

        <div className="request-status">
          <span className="status-dot"></span>
          <span>Ready to provision</span>
        </div>
      </div>

      {/* =====================================================
          BLUEPRINT
      ====================================================== */}

      <section className="form-section blueprint-section">
        <div className="section-heading">
          <div className="section-icon">✦</div>

          <div className="section-heading-content">
            <h3>Blueprint</h3>

            <p>
              Start with a predefined platform blueprint.
            </p>
          </div>
        </div>

        <div className="field-group blueprint-field">
          <label htmlFor="blueprint">
            Blueprint
          </label>

          <BlueprintSelector
            blueprints={blueprints}
            selectedBlueprint={selectedBlueprint}
            setSelectedBlueprint={setSelectedBlueprint}
          />
        </div>
      </section>

      {/* =====================================================
          DIVIDER
      ====================================================== */}

      <div className="form-divider"></div>

      {/* =====================================================
          DETAILS GRID
      ====================================================== */}

      <div className="details-grid">

        {/* APPLICATION */}

        <section className="form-section detail-section">
          <ApplicationDetails
            applicationName={applicationName}
            owner={owner}
            team={team}
            setApplicationName={setApplicationName}
            setOwner={setOwner}
            setTeam={setTeam}
          />
        </section>

        {/* INFRASTRUCTURE */}

        <section className="form-section detail-section">
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
        </section>

      </div>

      {/* =====================================================
          ACTION BAR
      ====================================================== */}

      <div className="provision-action">
        <div className="provision-action-copy">
          <div className="action-icon">✓</div>

          <div>
            <strong>Ready to provision?</strong>

            <span>
              Review your configuration and submit the request.
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="provision-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="button-spinner"></span>
              Processing Request...
            </>
          ) : (
            <>
              <span>🚀</span>
              Provision Application
            </>
          )}
        </button>
      </div>

      {/* =====================================================
          SUCCESS
      ====================================================== */}

      {requestId && (
        <div className="success-wrapper">
          <SuccessCard
            requestId={requestId}
            deploymentPlan={deploymentPlan}
            terraform={terraform}
          />
        </div>
      )}
    </form>
  );
}