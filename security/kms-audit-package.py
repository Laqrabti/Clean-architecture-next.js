# Creating an example KMS audit package with sample files, CSVs, JSON policies, CloudTrail sample, and an Excel segregation sheet.
# Files will be written to /mnt/data/kms-audit-package/ and also zipped to /mnt/data/kms-audit-package.zip
import os, json, zipfile, textwrap
from pathlib import Path
import pandas as pd
from datetime import datetime
from caas_jupyter_tools import display_dataframe_to_user

outdir = Path("/mnt/data/kms-audit-package")
outdir.mkdir(parents=True, exist_ok=True)

# 1) key-inventory.csv (sample)
key_inventory = [
    {
        "alias":"alias/hipaa-app-cmk",
        "keyId":"1111aaaa-2222-bbbb-3333-cccc4444dddd",
        "arn":"arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd",
        "description":"App symmetric CMK for envelope encryption (AES_256)",
        "ownerTeam":"SecurityTeam",
        "createdAt":"2025-09-01T10:00:00Z",
        "keyUsage":"ENCRYPT_DECRYPT",
        "rotationEnabled":"true",
        "origin":"Customer-Managed"
    },
    {
        "alias":"alias/hipaa-sign-cmk",
        "keyId":"2222aaaa-3333-bbbb-4444-cccc5555eeee",
        "arn":"arn:aws:kms:us-east-1:123456789012:key/2222aaaa-3333-bbbb-4444-cccc5555eeee",
        "description":"Asymmetric CMK for JWT signing (RSA_2048)",
        "ownerTeam":"SecurityTeam",
        "createdAt":"2025-09-01T10:05:00Z",
        "keyUsage":"SIGN_VERIFY",
        "rotationEnabled":"false",
        "origin":"Customer-Managed (Asymmetric)"
    },
    {
        "alias":"alias/hipaa-hsm-cmk",
        "keyId":"3333aaaa-4444-bbbb-5555-cccc6666ffff",
        "arn":"arn:aws:kms:us-east-1:123456789012:key/3333aaaa-4444-bbbb-5555-cccc6666ffff",
        "description":"CloudHSM-backed CMK for regulatory HSM requirement",
        "ownerTeam":"SecurityTeam",
        "createdAt":"2025-08-20T09:00:00Z",
        "keyUsage":"ENCRYPT_DECRYPT",
        "rotationEnabled":"true",
        "origin":"CloudHSM (Custom Key Store)"
    }
]

df_inventory = pd.DataFrame(key_inventory)
csv_path = outdir / "key-inventory.csv"
df_inventory.to_csv(csv_path, index=False)

# Display dataframe to user
display_dataframe_to_user("Sample key inventory", df_inventory)

# 2) key-policy JSON for alias/hipaa-app-cmk
key_policy = {
  "Version": "2012-10-17",
  "Id": "key-policy-app-limited",
  "Statement": [
    {
      "Sid": "AllowRootAndAdmins",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:root" },
      "Action": "kms:*",
      "Resource": "*"
    },
    {
      "Sid": "AllowUseByAppRole",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/MyAppRole" },
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:GenerateDataKey",
        "kms:ReEncrypt*",
        "kms:DescribeKey"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowSecurityTeamAdmin",
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::123456789012:role/SecurityAdminRole" },
      "Action": [
        "kms:*"
      ],
      "Resource": "*"
    }
  ]
}

with open(outdir / "key-policy-alias-hipaa-app-cmk.json", "w") as f:
    json.dump(key_policy, f, indent=2)

# 3) IAM policies zip (two policies)
iam_dir = outdir / "iam-policies"
iam_dir.mkdir(exist_ok=True)
app_role_policy = {
    "Version":"2012-10-17",
    "Statement":[
        {
            "Effect":"Allow",
            "Action":[
                "kms:GenerateDataKey",
                "kms:Decrypt",
                "kms:DescribeKey"
            ],
            "Resource":[
                "arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd"
            ]
        }
    ]
}
secadmin_policy = {
    "Version":"2012-10-17",
    "Statement":[
        {
            "Effect":"Allow",
            "Action":"kms:*",
            "Resource":"*"
        }
    ]
}
with open(iam_dir / "MyAppRole-policy.json", "w") as f:
    json.dump(app_role_policy, f, indent=2)
with open(iam_dir / "SecurityAdminRole-policy.json", "w") as f:
    json.dump(secadmin_policy, f, indent=2)

# Zip the iam policies
zip_path = outdir / "iam-policies.zip"
with zipfile.ZipFile(zip_path, "w") as zf:
    zf.write(iam_dir / "MyAppRole-policy.json", arcname="MyAppRole-policy.json")
    zf.write(iam_dir / "SecurityAdminRole-policy.json", arcname="SecurityAdminRole-policy.json")

# 4) kms-cloudtrail.json (sample events)
cloudtrail_events = [
    {
        "eventVersion":"1.08",
        "userIdentity":{"type":"AssumedRole","arn":"arn:aws:iam::123456789012:role/MyAppRole","principalId":"ABCDEFG..."},
        "eventTime":"2025-09-22T09:15:00Z",
        "eventName":"GenerateDataKey",
        "awsRegion":"us-east-1",
        "sourceIPAddress":"10.0.0.5",
        "requestParameters":{"keyId":"arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd","keySpec":"AES_256"},
        "responseElements":{"ciphertextBlob":"<REDACTED_BASE64>"},
        "resources":[{"arn":"arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd","type":"AWS::KMS::Key"}]
    },
    {
        "eventVersion":"1.08",
        "userIdentity":{"type":"AssumedRole","arn":"arn:aws:iam::123456789012:role/MyAppRole","principalId":"ABCDEFG..."},
        "eventTime":"2025-09-22T09:16:12Z",
        "eventName":"Decrypt",
        "awsRegion":"us-east-1",
        "sourceIPAddress":"10.0.0.5",
        "requestParameters":{"ciphertextBlob":"<REDACTED_BASE64>"},
        "responseElements":{"plaintext":"<REDACTED_BASE64>"},
        "resources":[{"arn":"arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd","type":"AWS::KMS::Key"}]
    }
]
with open(outdir / "kms-cloudtrail.json", "w") as f:
    json.dump(cloudtrail_events, f, indent=2)

# 5) rotation-evidence.txt (sample outputs)
rotation_text = textwrap.dedent(f"""\
    AWS KMS rotation evidence (sample)
    Retrieved at: {datetime.utcnow().isoformat()}Z

    aws kms get-key-rotation-status --key-id 1111aaaa-2222-bbbb-3333-cccc4444dddd
    RotationEnabled: true

    aws kms get-key-rotation-status --key-id 2222aaaa-3333-bbbb-4444-cccc5555eeee
    RotationEnabled: false  (asymmetric keys don't auto-rotate)
""")
with open(outdir / "rotation-evidence.txt", "w") as f:
    f.write(rotation_text)

# 6) segregation.xlsx (mapping of key admins vs users)
seg_df = pd.DataFrame([
    {"Principal":"arn:aws:iam::123456789012:role/MyAppRole","Type":"Role","Access":"Use (Encrypt/Decrypt/GenerateDataKey)","Team":"AppTeam"},
    {"Principal":"arn:aws:iam::123456789012:role/SecurityAdminRole","Type":"Role","Access":"Admin (kms:*)","Team":"SecurityTeam"},
    {"Principal":"arn:aws:iam::123456789012:user/alice","Type":"User","Access":"KeyAudit","Team":"AuditTeam"}
])
seg_path = outdir / "segregation.xlsx"
seg_df.to_excel(seg_path, index=False, sheet_name="SegregationOfDuties")

# 7) cmk-origin.csv
cmk_origin = [
    {"alias":"alias/hipaa-app-cmk","origin":"Customer-Managed","notes":""},
    {"alias":"alias/hipaa-sign-cmk","origin":"Customer-Managed (Asymmetric)","notes":"Used for JWT signing"},
    {"alias":"alias/hipaa-hsm-cmk","origin":"CloudHSM (Custom Key Store)","notes":"Regulatory HSM requirement"}
]
pd.DataFrame(cmk_origin).to_csv(outdir / "cmk-origin.csv", index=False)

# 8) rds-config.txt and s3-config.txt (example CLI commands)
rds_cfg = textwrap.dedent("""\
    # Example CLI to create encrypted RDS instance
    aws rds create-db-instance \\
      --db-instance-identifier hipaa-db \\
      --db-instance-class db.t3.medium \\
      --engine postgres \\
      --allocated-storage 20 \\
      --master-username dbadmin \\
      --master-user-password 'ChangeMe123!' \\
      --storage-encrypted \\
      --kms-key-id arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd
""")
with open(outdir / "rds-config.txt", "w") as f:
    f.write(rds_cfg)

s3_cfg = textwrap.dedent("""\
    # Example CLI to create S3 bucket with default encryption using CMK
    aws s3api create-bucket --bucket hipaa-app-bucket --create-bucket-configuration LocationConstraint=us-east-1
    aws s3api put-bucket-encryption --bucket hipaa-app-bucket --server-side-encryption-configuration '{
      "Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"aws:kms","KMSMasterKeyID":"arn:aws:kms:us-east-1:123456789012:key/1111aaaa-2222-bbbb-3333-cccc4444dddd"}}]
    }'
""")
with open(outdir / "s3-config.txt", "w") as f:
    f.write(s3_cfg)

# 9) snapshot-list.csv (sample encrypted snapshots)
snapshots = [
    {"snapshotId":"rds:sample-snapshot-2025-09-01","dbIdentifier":"hipaa-db","encrypted":"true","kmsKeyId":"1111aaaa-2222-bbbb-3333-cccc4444dddd","createdAt":"2025-09-01T12:00:00Z"},
    {"snapshotId":"rds:sample-snapshot-2025-06-01","dbIdentifier":"hipaa-db-old","encrypted":"true","kmsKeyId":"3333aaaa-4444-bbbb-5555-cccc6666ffff","createdAt":"2025-06-01T10:00:00Z"}
]
pd.DataFrame(snapshots).to_csv(outdir / "snapshot-list.csv", index=False)

# 10) key-compromise-playbook.txt
playbook = textwrap.dedent("""\
    Key compromise playbook (summary)
    --------------------------------
    1) Detection:
       - CloudTrail alerts for unusual KMS Decrypt/GenerateDataKey calls
       - SIEM alerts from GuardDuty/CloudWatch for suspicious principal activity

    2) Immediate containment:
       - Disable key (ScheduleKeyDeletion after approval?) or grant denial
       - If key is in a custom key store (CloudHSM), isolate HSM cluster

    3) Recovery / rotation:
       - Create a new CMK and update application to use new CMK for new data
       - Re-encrypt existing data by decrypting with old key (if possible) and encrypting with new data keys generated under new CMK, OR restore from encrypted snapshots using KMS re-encrypt where supported
       - Update key inventory and rotation evidence

    4) Notification & audit:
       - Notify Security/Legal/Compliance (per incident response plan)
       - Produce full CloudTrail event export for forensic analysis
       - Prepare remediation evidence for auditors/regulators

    Contacts:
    - Security on-call: security@example.com
    - Backup team: backup@example.com
    - CloudOps: cloudops@example.com
""")
with open(outdir / "key-compromise-playbook.txt", "w") as f:
    f.write(playbook)

# Create a zip of the audit package
zipf = Path("/mnt/data/kms-audit-package.zip")
with zipfile.ZipFile(zipf, "w", zipfile.ZIP_DEFLATED) as zf:
    for p in sorted(outdir.rglob("*")):
        zf.write(p, arcname=str(p.relative_to(outdir)))

print("Created audit package at:", zipf)
print("Files created in:", outdir)

# Return paths for user to download
{"archive": str(zipf), "files_dir": str(outdir)}

