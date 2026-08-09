resource "google_project_service" "run" {
  project = var.gcp_project
  service = "run.googleapis.com"

  disable_on_destroy = false
}

resource "google_cloud_run_v2_service" "app" {
  name     = var.application_name
  location = var.region

  deletion_protection = false

  template {
    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }
    }
  }

  depends_on = [
    google_project_service.run
  ]
}
