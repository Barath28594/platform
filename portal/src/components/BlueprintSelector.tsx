type Props = {
  blueprints: any;
  selectedBlueprint: string;
  setSelectedBlueprint: (value: string) => void;
};

export default function BlueprintSelector({
  blueprints,
  selectedBlueprint,
  setSelectedBlueprint,
}: Props) {
  return (
    <select
      id="blueprint"
      value={selectedBlueprint}
      onChange={(e) =>
        setSelectedBlueprint(e.target.value)
      }
    >
      {Object.keys(blueprints).map((blueprintName) => (
        <option
          key={blueprintName}
          value={blueprintName}
        >
          {blueprintName}
        </option>
      ))}
    </select>
  );
}