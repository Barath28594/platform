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
    <>
      <div className="section-heading">
        <div className="section-icon">◇</div>

        <div className="section-heading-content">
          <h3>Application Details</h3>

          <p>
            Define the ownership and identity of your application.
          </p>
        </div>
      </div>

      <div className="fields-stack">

        <div className="field-group">
          <label htmlFor="application-name">
            Application Name
            <span className="required">*</span>
          </label>

          <input
            id="application-name"
            type="text"
            placeholder="e.g. inventory-api"
            value={applicationName}
            onChange={(e) => setApplicationName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="field-group">
          <label htmlFor="application-owner">
            Application Owner
            <span className="required">*</span>
          </label>

          <input
            id="application-owner"
            type="text"
            placeholder="e.g. CloudOps"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="field-group">
          <label htmlFor="infrastructure-operator">
            Infrastructure Operator
            <span className="required">*</span>
          </label>

          <input
            id="infrastructure-operator"
            type="text"
            placeholder="e.g. gisocc"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            autoComplete="off"
          />
        </div>

      </div>
    </>
  );
}