import { useEffect, useState } from "react";
import { createApplication, getCatalog } from "../services/api";

export default function ProvisionForm() {

  const [applicationName, setApplicationName] = useState("");
  const [owner, setOwner] = useState("");
  const [team, setTeam] = useState("");

  const [catalog, setCatalog] = useState<any>(null);

  const [cloud, setCloud] = useState("");
  const [region, setRegion] = useState("");
  const [environment, setEnvironment] = useState("");
  const [service, setService] = useState("");

  const [requestId, setRequestId] = useState("");

  useEffect(() => {

    async function loadCatalog() {

      const data = await getCatalog();

      setCatalog(data);

      setCloud(data.clouds[0]);
      setRegion(data.regions[data.clouds[0]][0]);
      setService(data.services[data.clouds[0]][0]);
      setEnvironment(data.environments[0]);

    }

    loadCatalog();

  }, []);

  async function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    const response = await createApplication({

      applicationName,
      owner,
      team,

      cloud,
      region,
      environment,
      service

    });

    setRequestId(response.requestId);

  }

  return (

    <form onSubmit={handleSubmit}>

      <h2>Provision Application</h2>

      <input
        placeholder="Application Name"
        value={applicationName}
        onChange={(e) => setApplicationName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />

      <br /><br />

      <select
        value={cloud}
        onChange={(e) => {

          const selectedCloud = e.target.value;

          setCloud(selectedCloud);

          setRegion(catalog.regions[selectedCloud][0]);

          setService(catalog.services[selectedCloud][0]);

        }}
      >

        {catalog?.clouds.map((cloudName: string) => (

          <option
            key={cloudName}
            value={cloudName}
          >
            {cloudName}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >

        {catalog?.regions[cloud]?.map((regionName: string) => (

          <option
            key={regionName}
            value={regionName}
          >
            {regionName}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={environment}
        onChange={(e) => setEnvironment(e.target.value)}
      >

        {catalog?.environments.map((env: string) => (

          <option
            key={env}
            value={env}
          >
            {env}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
      >

        {catalog?.services[cloud]?.map((serviceName: string) => (

          <option
            key={serviceName}
            value={serviceName}
          >
            {serviceName}
          </option>

        ))}

      </select>

      <br /><br />

      <button type="submit">
        Provision
      </button>

      {requestId && (

        <div className="success-card">

          <h3>✅ Request Accepted</h3>

          <p>
            Request ID:
            <strong> {requestId}</strong>
          </p>

          <p>
            Provision request submitted successfully.
          </p>

        </div>

      )}

    </form>

  );

}