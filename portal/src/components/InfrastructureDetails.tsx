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
  setService,
}: Props) {
  function handleCloudChange(selectedCloud: string) {
    setCloud(selectedCloud);

    const regions = catalog?.regions?.[selectedCloud] || [];
    const services = catalog?.services?.[selectedCloud] || [];

    if (regions.length > 0) {
      setRegion(regions[0]);
    }

    if (services.length > 0) {
      setService(services[0]);
    }
  }

  return (
    <>
      <div className="section-heading">
        <div className="section-icon">◇</div>

        <div className="section-heading-content">
          <h3>Infrastructure</h3>

          <p>
            Choose where and how your application will run.
          </p>
        </div>
      </div>

      <div className="infrastructure-fields">

        {/* CLOUD */}

        <div className="field-group">
          <label htmlFor="cloud-provider">
            Cloud Provider
            <span className="required">*</span>
          </label>

          <select
            id="cloud-provider"
            value={cloud}
            onChange={(e) =>
              handleCloudChange(e.target.value)
            }
          >
            {catalog?.clouds?.map((cloudName: string) => (
              <option
                key={cloudName}
                value={cloudName}
              >
                {cloudName}
              </option>
            ))}
          </select>
        </div>

        {/* REGION */}

        <div className="field-group">
          <label htmlFor="region">
            Region
            <span className="required">*</span>
          </label>

          <select
            id="region"
            value={region}
            onChange={(e) =>
              setRegion(e.target.value)
            }
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

        {/* ENVIRONMENT */}

        <div className="field-group">
          <label htmlFor="environment">
            Environment
            <span className="required">*</span>
          </label>

          <select
            id="environment"
            value={environment}
            onChange={(e) =>
              setEnvironment(e.target.value)
            }
          >
            {catalog?.environments?.map(
              (environmentName: string) => (
                <option
                  key={environmentName}
                  value={environmentName}
                >
                  {environmentName}
                </option>
              )
            )}
          </select>
        </div>

        {/* SERVICE */}

        <div className="field-group">
          <label htmlFor="service">
            Service
            <span className="required">*</span>
          </label>

          <select
            id="service"
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
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

      </div>
    </>
  );
}