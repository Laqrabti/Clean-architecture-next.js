#!/bin/bash
# jq-aws-policy-analyzer.sh
# Comprehensive AWS IAM Policy Analysis with jq

JSON_FILE="data.json"

echo "=== AWS IAM POLICY ANALYSIS ==="
echo

# 1. Extract all actions (flattened list)
echo "1. ALL ACTIONS:"
jq -r '[.Statement[].Action[]] | .[]' "$JSON_FILE"
echo

# 2. Unique sorted actions
echo "2. UNIQUE ACTIONS (sorted):"
jq -r '[.Statement[].Action[]] | unique | sort | .[]' "$JSON_FILE"
echo

# 3. Actions grouped by statement
echo "3. ACTIONS BY STATEMENT:"
jq -r '.Statement[] | "\(.Sid): \(.Action | join(", "))"' "$JSON_FILE"
echo

# 4. Count actions per statement
echo "4. ACTION COUNT PER STATEMENT:"
jq -r '.Statement[] | "\(.Sid): \(.Action | length) actions"' "$JSON_FILE"
echo

# 5. Extract service names from actions
echo "5. UNIQUE AWS SERVICES USED:"
jq -r '[.Statement[].Action[] | split(":")[0]] | unique | sort | .[]' "$JSON_FILE"
echo

# 6. Check for specific action presence
echo "6. ACTION PRESENCE CHECK:"
check_action() {
    jq -r --arg action "$1" \
    'if any(.Statement[].Action[]; . == $action) then "✓ \($action) found" else "✗ \($action) not found" end' "$JSON_FILE"
}
check_action "s3:GetObject"
check_action "ec2:DescribeInstances"
echo

# 7. Resource patterns extraction
echo "7. RESOURCE PATTERNS:"
jq -r '.Statement[] | "\(.Sid): \(.Resource | if type == "array" then join(", ") else . end)"' "$JSON_FILE"
echo

# 8. Custom function: Get statement by SID
echo "8. FIND STATEMENT BY SID (DynamoDBLock):"
jq -r '.Statement[] | select(.Sid == "DynamoDBLock")' "$JSON_FILE"
echo

# 9. Custom function: Actions containing pattern
echo "9. ACTIONS CONTAINING 'Get':"
jq -r '[.Statement[].Action[] | select(contains("Get"))] | unique | .[]' "$JSON_FILE"
echo

# 10. Policy summary statistics
echo "10. POLICY SUMMARY:"
jq -r '
{
    "TotalStatements": (.Statement | length),
    "TotalActions": [.Statement[].Action[]] | length,
    "UniqueActions": [.Statement[].Action[]] | unique | length,
    "Services": [.Statement[].Action[] | split(":")[0]] | unique | sort
}' "$JSON_FILE"
echo

# 11. Safe extraction (handles null/missing values)
echo "11. SAFE ACTION EXTRACTION (with error handling):"
jq -r '.Statement[].Action? | select(. != null)[]?' "$JSON_FILE"
echo

# 12. Transform to minimal policy format
echo "12. MINIMAL POLICY FORMAT:"
jq '.Statement[] | {Sid, Effect, Action, Resource}' "$JSON_FILE"
echo

# 13. Custom function: Validate action format
echo "13. ACTION FORMAT VALIDATION:"
jq -r '[.Statement[].Action[] | select(test("^[a-z0-9-]+:[a-zA-Z*]+$") | not)] | 
       if length > 0 then "Invalid actions: \(.)" else "All actions have valid format" end' "$JSON_FILE"
echo

# 14. Extract all SIDs
echo "14. ALL STATEMENT IDs:"
jq -r '.Statement[].Sid' "$JSON_FILE"
echo

# 15. Custom function: Find statements with wildcard actions
echo "15. STATEMENTS WITH WILDCARD ACTIONS:"
jq -r '.Statement[] | select(.Action[] | contains("*")) | .Sid' "$JSON_FILE"