terraform {
  backend "s3" {
    bucket = "your-bucket-staging"
    key    = "terraform/staging/terraform.tfstate"
    region = "us-east-1"
  }
}
