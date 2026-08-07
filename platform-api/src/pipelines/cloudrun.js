function generateCloudRunWorkflow() {

return `name: Velocity Terraform Pipeline

on:

  push:

    branches:

      - main

jobs:

  terraform:

    runs-on: ubuntu-latest

    permissions:

      contents: read

    steps:

      - name: Checkout Repository

        uses: actions/checkout@v4

      - name: Setup Terraform

        uses: hashicorp/setup-terraform@v3

      - name: Terraform Format

        run: terraform fmt -check

      - name: Terraform Init

        run: terraform init

      - name: Terraform Validate

        run: terraform validate

      - name: Terraform Plan

        run: terraform plan -out=tfplan

      - name: Upload Plan

        uses: actions/upload-artifact@v4

        with:

          name: terraform-plan

          path: tfplan
`;

}

module.exports = {

generateCloudRunWorkflow

};