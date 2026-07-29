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

    <>

      <label>

        <strong>Blueprint</strong>

      </label>

      <br /><br />

      <select
        value={selectedBlueprint}
        onChange={(e) => setSelectedBlueprint(e.target.value)}
      >

        {

          Object.keys(blueprints).map((blueprint) => (

            <option
              key={blueprint}
              value={blueprint}
            >

              {blueprint}

            </option>

          ))

        }

      </select>

      <br /><br />

    </>

  );

}