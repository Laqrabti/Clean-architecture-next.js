terraform {
  backend "s3" {
    bucket = "your-bucket-production"
    key    = "terraform/production/terraform.tfstate"
    region = "us-east-1"
  }
}
