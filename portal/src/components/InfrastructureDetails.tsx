type Props = {
  catalog: any;

  cloud: string;
  region: string;
  environment: string;
  service: string;

  setCloud: (value: string) => void;
  setRegion: (value: string) => void;
  setEnvironment: (value: string) => void;
  setService: (value: string) => void;
};

export default function InfrastructureDetails({
  catalog,
  cloud,
  region,
  environment,
  service,

  setCloud,
  setRegion,
  setEnvironment,
  setService
}: Props) {
  function handleCloudChange(
    selectedCloud: string
  ) {
    setCloud(selectedCloud);

    setRegion(
      catalog.regions[selectedCloud][0]
    );

    setService(
      catalog.services[selectedCloud][0]
    );
  }

  return (
    <>
      <div className="field">
        <label>
          Cloud Provider
          <span className="required">*</span>
        </label>

        <select
          value={cloud}
          onChange={(e) =>
            handleCloudChange(e.target.value)
          }
          required
        >
          {catalog?.clouds?.map(
            (cloudName: string) => (
              <option
                key={cloudName}
                value={cloudName}
              >
                {cloudName}
              </option>
            )
          )}
        </select>
      </div>

      <div className="field">
        <label>
          Region
          <span className="required">*</span>
        </label>

        <select
          value={region}
          onChange={(e) =>
            setRegion(e.target.value)
          }
          required
        >
          {catalog?.regions?.[cloud]?.map(
            (regionName: string) => (
              <option
                key={regionName}
                value={regionName}
              >
                {regionName}
              </option>
            )
          )}
        </select>
      </div>

      <div className="field">
        <label>
          Environment
          <span className="required">*</span>
        </label>

        <select
          value={environment}
          onChange={(e) =>
            setEnvironment(e.target.value)
          }
          required
        >
          {catalog?.environments?.map(
            (env: string) => (
              <option
                key={env}
                value={env}
              >
                {env}
              </option>
            )
          )}
        </select>
      </div>

      <div className="field">
        <label>
          Service
          <span className="required">*</span>
        </label>

        <select
          value={service}
          onChange={(e) =>
            setService(e.target.value)
          }
          required
        >
          {catalog?.services?.[cloud]?.map(
            (serviceName: string) => (
              <option
                key={serviceName}
                value={serviceName}
              >
                {serviceName}
              </option>
            )
          )}
        </select>
      </div>
    </>
  );
}