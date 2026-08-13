function hclString(value) {
    return JSON.stringify(
        value === undefined || value === null
            ? ""
            : String(value)
    );
}


function generateEC2Terraform(application) {

    const applicationName =
        application.applicationName || "velocity-application";

    const owner =
        application.owner || "unknown";

    const team =
        application.team || "unknown";

    const environment =
        application.environment || "dev";

    const region =
        application.region || "ap-south-1";


    return {

        /*
         * =====================================================
         * versions.tf
         * =====================================================
         */

        "versions.tf": `
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}
`.trim(),


        /*
         * =====================================================
         * provider.tf
         * =====================================================
         */

        "provider.tf": `
provider "aws" {
  region = var.aws_region
}
`.trim(),


        /*
         * =====================================================
         * variables.tf
         * =====================================================
         */

        "variables.tf": `
variable "aws_region" {
  description = "AWS region where the application will be deployed"
  type        = string
  default     = ${hclString(region)}
}

variable "application_name" {
  description = "Application name"
  type        = string
  default     = ${hclString(applicationName)}
}

variable "application_owner" {
  description = "Application owner"
  type        = string
  default     = ${hclString(owner)}
}

variable "team" {
  description = "Application team"
  type        = string
  default     = ${hclString(team)}
}

variable "environment" {
  description = "Application environment"
  type        = string
  default     = ${hclString(environment)}
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "ssh_cidr" {
  description = "CIDR allowed to access SSH. Empty disables SSH ingress."
  type        = string
  default     = ""
}
`.trim(),


        /*
         * =====================================================
         * data.tf
         * =====================================================
         */

        "data.tf": `
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

data "aws_ssm_parameter" "amazon_linux" {
  name = "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64"
}
`.trim(),


        /*
         * =====================================================
         * main.tf
         * =====================================================
         */

        "main.tf": `
resource "aws_security_group" "velocity_ec2" {

  name = "\${var.application_name}-sg"

  description = "Security group for Velocity provisioned EC2 instance"

  vpc_id = data.aws_vpc.default.id

  dynamic "ingress" {

    for_each = var.ssh_cidr == "" ? [] : [var.ssh_cidr]

    content {
      description = "SSH"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = [ingress.value]
    }
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "\${var.application_name}-sg"
    ManagedBy   = "Velocity"
    Application = var.application_name
    Environment = var.environment
  }
}


resource "aws_instance" "application" {

  ami = data.aws_ssm_parameter.amazon_linux.value

  instance_type = var.instance_type

  subnet_id = data.aws_subnets.default.ids[0]

  vpc_security_group_ids = [
    aws_security_group.velocity_ec2.id
  ]

  associate_public_ip_address = true

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  tags = {
    Name        = var.application_name
    ManagedBy   = "Velocity"
    Application = var.application_name
    Owner       = var.application_owner
    Team        = var.team
    Environment = var.environment
    Service     = "EC2"
  }
}
`.trim(),


        /*
         * =====================================================
         * outputs.tf
         * =====================================================
         */

        "outputs.tf": `
output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.application.id
}

output "instance_public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.application.public_ip
}

output "instance_private_ip" {
  description = "EC2 private IP"
  value       = aws_instance.application.private_ip
}

output "instance_type" {
  description = "EC2 instance type"
  value       = aws_instance.application.instance_type
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.velocity_ec2.id
}
`.trim()
    };
}


module.exports = {
    generateEC2Terraform
};