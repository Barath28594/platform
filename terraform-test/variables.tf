variable "gcp_project" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
}

variable "application_name" {
  description = "Application name"
  type        = string
}

variable "container_image" {
  description = "Container image"
  type        = string
}
