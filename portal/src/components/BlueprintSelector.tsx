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
    <section className="blueprint-section">
      <div className="section-heading">
        <div className="section-icon">✦</div>
        <div>
          <h3 className="section-title">Blueprint</h3>
          <p className="section-description">
            Start with a predefined platform blueprint.
          </p>
        </div>
      </div>

      <div className="blueprint-field">
        <label className="field-label">Blueprint *</label>
        <select
          value={selectedBlueprint}
          onChange={(e) => setSelectedBlueprint(e.target.value)}
        >
          {Object.keys(blueprints).map((blueprint) => (
            <option key={blueprint} value={blueprint}>
              {blueprint}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
