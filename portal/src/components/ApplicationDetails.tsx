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
  setTeam
}: Props) {
  return (
    <>
      <div className="field">
        <label>
          Application Name
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. inventory-api"
          value={applicationName}
          onChange={(e) =>
            setApplicationName(e.target.value)
          }
          required
        />
      </div>

      <div className="field">
        <label>
          Application Owner
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. CloudOps"
          value={owner}
          onChange={(e) =>
            setOwner(e.target.value)
          }
          required
        />
      </div>

      <div className="field">
        <label>
          Infrastructure Team
          <span className="required">*</span>
        </label>

        <input
          type="text"
          placeholder="e.g. gisocc"
          value={team}
          onChange={(e) =>
            setTeam(e.target.value)
          }
          required
        />
      </div>
    </>
  );
}