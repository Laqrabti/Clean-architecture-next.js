resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name

  tags = {
    Environment = var.bucket_name == "" ? "unknown" : replace(var.bucket_name, "/-.*/", "")
  }
}
