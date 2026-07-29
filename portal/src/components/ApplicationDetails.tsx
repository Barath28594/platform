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
    </>
  );
}