resource "google_cloud_run_service" "app" {

  name = var.application_name

  location = var.region

}