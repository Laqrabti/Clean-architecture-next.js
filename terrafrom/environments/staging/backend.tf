# backend.tf
terraform {
  backend "s3" {
    # The name of your S3 bucket (from script output)
    bucket = "my-terraform-state-bucket-1758402360"

    # The path/to/your/state/file within the bucket
    # Use a unique key for each project/environment
    key = "nextjs-clean-architecture/terraform.tfstate"

    # The AWS region where resources are located
    region = "us-east-1"

    # The DynamoDB table for state locking (from script output)
    dynamodb_table = "terraform-state-locks"

    # Enable encryption
    encrypt = true

    # The KMS key ARN for encryption (from script output)
    kms_key_id = "arn:aws:kms:us-east-1:888178230181:key/9b442313-857d-4bec-ab1c-d45f6f0aed15"
  }
}