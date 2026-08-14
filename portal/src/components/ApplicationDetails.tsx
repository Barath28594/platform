type Props = {
  applicationName: string;
  owner: string;
  team: string;
  setApplicationName: (value: string) => void;
  setOwner: (value: string) => void;
  setTeam: (value: string) => void;
};

export default function ApplicationDetails({
  applicationName,
  owner,
  team,
  setApplicationName,
  setOwner,
  setTeam,
}: Props) {
  return (
    <section className="provision-section">
      <div className="section-heading">
        <div className="section-icon">◇</div>
        <div>
          <h3 className="section-title">Application Details</h3>
          <p className="section-description">
            Define the ownership and identity of your application.
          </p>
        </div>
      </div>

      <div className="application-fields">
        <div className="form-field">
          <label className="field-label">Application Name *</label>
          <input
            type="text"
            placeholder="e.g. inventory-api"
            value={applicationName}
            onChange={(e) => setApplicationName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="field-label">Application Owner *</label>
          <input
            type="text"
            placeholder="e.g. CloudOps"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label className="field-label">Infrastructure Operator *</label>
          <input
            type="text"
            placeholder="e.g. gisocc"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
