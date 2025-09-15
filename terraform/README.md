# Terraform Infrastructure

## Structure
├── modules/          # Reusable components
│   ├── vpc/
│   ├── ec2/ 
│   ├── s3/
│   └── security/
├── environments/     # Environment-specific configs
│   ├── dev/
│   ├── staging/
│   └── prod/
├── providers.tf      # Provider configurations
├── variables.tf      # Global variables
└── outputs.tf        # Global outputs
