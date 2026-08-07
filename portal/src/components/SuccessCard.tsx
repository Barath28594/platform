type Props = {
  requestId: string;
  deploymentPlan: string[];
};

export default function SuccessCard({
  requestId,
  deploymentPlan
}: Props) {

  if (!requestId) {
    return null;
  }

  return (

    <div className="success-card">

      <h3>✅ Request Accepted</h3>

      <p>
        <strong>Request ID:</strong> {requestId}
      </p>

      <p>
        Provision request submitted successfully.
      </p>

      <hr />

      <h4>Deployment Plan</h4>

      <ul>

        {deploymentPlan.map((resource) => (

          <li key={resource}>
            {resource}
          </li>

        ))}

      </ul>

    </div>

  );

}