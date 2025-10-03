#!/usr/bin/env bash
set -euo pipefail

# Usage:
# MY_REGION=us-east-1 BUCKET=my-tf-state-bucket DDB_TABLE=tfstate-locks KMS_ALIAS=alias/terraform-backend ./create-backend-resources.sh

REGION="${MY_REGION:-us-east-1}"
BUCKET="${BUCKET:-my-terraform-state-bucket-$(date +%s)}"
DDB_TABLE="${DDB_TABLE:-terraform-state-locks}"
KMS_ALIAS="${KMS_ALIAS:-alias/terraform-backend-key}"
ACCOUNT_ID="${ACCOUNT_ID:-$(aws sts get-caller-identity --query Account --output text --region "$REGION")}"

echo "Region: $REGION"
echo "Bucket: $BUCKET"
echo "DDB Table: $DDB_TABLE"
echo "KMS Alias: $KMS_ALIAS"
echo "Account: $ACCOUNT_ID"

# 1) Create S3 bucket if not exists
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "S3 bucket $BUCKET already exists"
else
  echo "Creating S3 bucket $BUCKET..."
  
  # Handle us-east-1 special case (no LocationConstraint)
  if [ "$REGION" = "us-east-1" ]; then
    aws s3api create-bucket \
      --bucket "$BUCKET" \
      --region "$REGION"
  else
    aws s3api create-bucket \
      --bucket "$BUCKET" \
      --region "$REGION" \
      --create-bucket-configuration LocationConstraint="$REGION"
  fi
fi

# 2) Enable versioning
aws s3api put-bucket-versioning --bucket "$BUCKET" --versioning-configuration Status=Enabled
echo "Enabled versioning on $BUCKET"

# 3) Block public access
aws s3api put-public-access-block \
  --bucket "$BUCKET" \
  --public-access-block-configuration 'BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true'
echo "Blocked public access on $BUCKET"

# 4) Create KMS key if alias not found
if aws kms describe-alias --alias-name "$KMS_ALIAS" --region "$REGION" 2>/dev/null; then
  echo "KMS alias $KMS_ALIAS already exists"
  KMS_KEY_ID=$(aws kms describe-alias --alias-name "$KMS_ALIAS" --region "$REGION" --query 'Alias.TargetKeyId' --output text)
else
  echo "Creating KMS key..."
  KMS_KEY_ID=$(aws kms create-key --description "Terraform remote state key for $BUCKET" --query KeyMetadata.KeyId --output text --region "$REGION")
  aws kms create-alias --alias-name "$KMS_ALIAS" --target-key-id "$KMS_KEY_ID" --region "$REGION"
  echo "Created KMS key id $KMS_KEY_ID and alias $KMS_ALIAS"
fi

KMS_ARN="arn:aws:kms:${REGION}:${ACCOUNT_ID}:key/${KMS_KEY_ID}"

# 5) Set bucket encryption to use KMS key
aws s3api put-bucket-encryption \
  --bucket "$BUCKET" \
  --server-side-encryption-configuration '{
    "Rules":[
      {
        "ApplyServerSideEncryptionByDefault":{
          "SSEAlgorithm":"aws:kms",
          "KMSMasterKeyID":"'"$KMS_KEY_ID"'"
        }
      }
    ]
  }'
echo "Configured SSE-KMS for $BUCKET with key $KMS_KEY_ID"

# 6) Create DynamoDB table if not exists
if aws dynamodb describe-table --table-name "$DDB_TABLE" --region "$REGION" >/dev/null 2>&1; then
  echo "DynamoDB table $DDB_TABLE already exists"
else
  echo "Creating DynamoDB table $DDB_TABLE..."
  aws dynamodb create-table \
    --table-name "$DDB_TABLE" \
    --attribute-definitions AttributeName=LockID,AttributeType=S \
    --key-schema AttributeName=LockID,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --region "$REGION"
  echo "Waiting for table to be active..."
  aws dynamodb wait table-exists --table-name "$DDB_TABLE" --region "$REGION"
fi

# 7) Create backend config file for Terraform
cat > backend.hcl <<EOF
bucket         = "$BUCKET"
region         = "$REGION"
dynamodb_table = "$DDB_TABLE"
encrypt        = true
kms_key_id     = "$KMS_ARN"
key            = "global/terraform.tfstate"
EOF

echo ""
echo "Done. Outputs:"
echo "S3_BUCKET=$BUCKET"
echo "DDB_TABLE=$DDB_TABLE"
echo "KMS_KEY_ID=$KMS_KEY_ID"
echo "KMS_ARN=$KMS_ARN"
echo ""
echo "Backend config file 'backend.hcl' has been generated."
echo "Use it with: terraform init -backend-config=backend.hcl"