type Props = {
  blueprints: any;
  selectedBlueprint: string;
  setSelectedBlueprint: (value: string) => void;
};

export default function BlueprintSelector({
  blueprints,
  selectedBlueprint,
  setSelectedBlueprint
}: Props) {
  return (
    <div className="blueprint-row">

      <label>
        Blueprint
      </label>

      <select
        value={selectedBlueprint}
        onChange={(e) =>
          setSelectedBlueprint(e.target.value)
        }
        required
      >
        {Object.keys(blueprints).map(
          (blueprint) => (
            <option
              key={blueprint}
              value={blueprint}
            >
              {blueprint}
            </option>
          )
        )}
      </select>

    </div>
  );
}