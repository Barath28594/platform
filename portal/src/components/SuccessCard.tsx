type Props = {
  requestId: string;
};

export default function SuccessCard({ requestId }: Props) {

  if (!requestId) {
    return null;
  }

  return (

    <div className="success-card">

      <h3>✅ Request Accepted</h3>

      <p>

        Request ID:
        <strong> {requestId}</strong>

      </p>

      <p>
        Provision request submitted successfully.
      </p>

    </div>

  );

}