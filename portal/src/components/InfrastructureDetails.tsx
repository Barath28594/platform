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

  return (
    <>

      <select
        value={cloud}
        onChange={(e) => {

          const selectedCloud = e.target.value;

          setCloud(selectedCloud);

          setRegion(
            catalog.regions[selectedCloud][0]
          );

          setService(
            catalog.services[selectedCloud][0]
          );

        }}
      >

        {catalog?.clouds.map((cloudName: string) => (

          <option
            key={cloudName}
            value={cloudName}
          >
            {cloudName}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >

        {catalog?.regions[cloud]?.map((regionName: string) => (

          <option
            key={regionName}
            value={regionName}
          >
            {regionName}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={environment}
        onChange={(e) => setEnvironment(e.target.value)}
      >

        {catalog?.environments.map((env: string) => (

          <option
            key={env}
            value={env}
          >
            {env}
          </option>

        ))}

      </select>

      <br /><br />

      <select
        value={service}
        onChange={(e) => setService(e.target.value)}
      >

        {catalog?.services[cloud]?.map((serviceName: string) => (

          <option
            key={serviceName}
            value={serviceName}
          >
            {serviceName}
          </option>

        ))}

      </select>

      <br /><br />

    </>
  );

}