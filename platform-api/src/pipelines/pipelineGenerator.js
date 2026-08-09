function generatePipeline(application) {

    if (application.cloud === "GCP") {

        return `
name: Velocity Terraform Pipeline

on:
  push:
    branches:
      - main

permissions:
  contents: read
  id-token: write

jobs:

  terraform:

    name: Terraform Validation and Plan

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v3
        with:
          workload_identity_provider: \${{ secrets.WIF_PROVIDER }}
          service_account: \${{ secrets.WIF_SERVICE_ACCOUNT }}


      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3


      - name: Terraform Format Check
        run: terraform fmt -check -recursive


      - name: Terraform Init
        run: terraform init


      - name: Terraform Validate
        run: terraform validate


      - name: Terraform Plan
        run: |
          terraform plan -out=tfplan
        env:
          TF_VAR_gcp_project: \${{ vars.GCP_PROJECT_ID }}
          TF_VAR_region: "${application.region}"
          TF_VAR_application_name: "${application.applicationName}"
          TF_VAR_container_image: \${{ vars.CONTAINER_IMAGE }}


      - name: Upload Terraform Plan
        uses: actions/upload-artifact@v4
        with:
          name: terraform-plan
          path: tfplan
`;

    }


    return `
name: Velocity Terraform Pipeline

on:
  push:
    branches:
      - main

permissions:
  contents: read
  id-token: write

jobs:

  terraform:

    name: Terraform Validation and Plan

    runs-on: ubuntu-latest

    steps:

      - name: Checkout Repository
        uses: actions/checkout@v4


      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3


      - name: Terraform Format Check
        run: terraform fmt -check -recursive


      - name: Terraform Init
        run: terraform init


      - name: Terraform Validate
        run: terraform validate


      - name: Terraform Plan
        run: terraform plan -out=tfplan
        env:
          TF_VAR_region: "${application.region}"
          TF_VAR_application_name: "${application.applicationName}"


      - name: Upload Terraform Plan
        uses: actions/upload-artifact@v4
        with:
          name: terraform-plan
          path: tfplan
`;
}


module.exports = {
    generatePipeline
};