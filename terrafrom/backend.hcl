bucket         = "my-terraform-state-bucket-1758402360"
region         = "us-east-1"
dynamodb_table = "terraform-state-locks"
encrypt        = true
kms_key_id     = "arn:aws:kms:us-east-1:888178230181:key/9b442313-857d-4bec-ab1c-d45f6f0aed15"
key            = "global/terraform.tfstate"
