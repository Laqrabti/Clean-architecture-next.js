provider "aws" {
  region = "eu-south-2"  # Spain
}

resource "aws_s3_bucket" "test" {
  bucket = "hassan-ta-${random_id.suffix.hex}"  # Now unique
  force_destroy = true  # Allows easy cleanup
}

# Add this to generate random suffix
resource "random_id" "suffix" {
  byte_length = 4
}