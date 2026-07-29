import { useState } from "react";
import { createApplication } from "../services/api";

export default function ProvisionForm() {
  const [applicationName, setApplicationName] = useState("");
  const [owner, setOwner] = useState("");
  const [team, setTeam] = useState("");
  const [cloud, setCloud] = useState("GCP");
  const [environment, setEnvironment] = useState("dev");
  const [type, setType] = useState("API");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await createApplication({
      applicationName,
      owner,
      team,
      cloud,
      environment,
      type,
    });

    alert(`Request Accepted: ${response.requestId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Atlas Platform</h2>

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

      <select value={cloud} onChange={(e) => setCloud(e.target.value)}>
        <option>AWS</option>
        <option>GCP</option>
      </select>

      <br /><br />

      <select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
        <option>dev</option>
        <option>test</option>
        <option>prod</option>
      </select>

      <br /><br />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option>API</option>
        <option>Web</option>
        <option>Worker</option>
      </select>

      <br /><br />

      <button type="submit">Provision</button>
    </form>
  );
}