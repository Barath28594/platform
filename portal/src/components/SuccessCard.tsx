type Props = {

    requestId: string;

    deploymentPlan: string[];

    terraform: any;

};

export default function SuccessCard({

    requestId,

    deploymentPlan,

    terraform

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

            <hr />

            <h4>Deployment Plan</h4>

            <ul>

                {deploymentPlan.map((step) => (

                    <li key={step}>{step}</li>

                ))}

            </ul>

            <hr />

            <h4>Terraform Generated</h4>

            <ul>

                {Object.keys(terraform).map((file) => (

                    <li key={file}>

                        📄 {file}

                    </li>

                ))}

            </ul>

        </div>

    );

}