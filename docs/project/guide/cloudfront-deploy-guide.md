# CloudFront 자동 배포 워크플로우 가이드

## 개요

GitHub Actions를 사용하여 S3 + CloudFront로 정적 파일을 자동 배포하는 워크플로우 설정 가이드입니다.

---

## 배포 흐름

```
+--------------------------------------------------+
|           GitHub Actions 배포 흐름                |
+--------------------------------------------------+
|  1. Push to main branch (트리거)                 |
|  2. Checkout repository                          |
|  3. Configure AWS credentials                    |
|  4. Sync files to S3                             |
|  5. Invalidate CloudFront cache                  |
+--------------------------------------------------+
```

---

## 사전 준비

### 1. AWS 리소스

| 항목 | 설명 | 값 (placeholder) |
|------|------|------------------|
| S3 버킷 이름 | 정적 파일 저장소 | `<YOUR_S3_BUCKET_NAME>` |
| CloudFront 배포 ID | 캐시 무효화용 | `<YOUR_CLOUDFRONT_DISTRIBUTION_ID>` |
| AWS 리전 | S3 리전 | `<YOUR_AWS_REGION>` |

### 2. GitHub Secrets 설정

Repository > Settings > Secrets and variables > Actions에서 추가:

| Secret Name | 설명 |
|-------------|------|
| `AWS_ACCESS_KEY_ID` | AWS IAM Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM Secret Key |

---

## 워크플로우 파일 생성

### 단계 1: 디렉토리 생성

```bash
mkdir -p .github/workflows
```

### 단계 2: 워크플로우 파일 작성

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy to CloudFront

on:
  push:
    branches:
      - main  # 배포 트리거 브랜치

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. 코드 체크아웃
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. AWS 자격 증명 설정
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: <YOUR_AWS_REGION>

      # 3. S3에 파일 동기화
      - name: Sync files to S3
        run: |
          aws s3 sync ./ s3://<YOUR_S3_BUCKET_NAME> \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "node_modules/*" \
            --exclude "*.md" \
            --delete

      # 4. CloudFront 캐시 무효화
      - name: Invalidate CloudFront cache
        run: |
          aws cloudfront create-invalidation \
            --distribution-id <YOUR_CLOUDFRONT_DISTRIBUTION_ID> \
            --paths "/*"
```

---

## Placeholder 교체 목록

| Placeholder | 교체할 값 | 예시 |
|-------------|----------|------|
| `<YOUR_S3_BUCKET_NAME>` | S3 버킷 이름 | `my-static-site-bucket` |
| `<YOUR_CLOUDFRONT_DISTRIBUTION_ID>` | CloudFront 배포 ID | `E1A2B3C4D5E6F7` |
| `<YOUR_AWS_REGION>` | AWS 리전 | `ap-northeast-2` |

---

## 배포 흐름 다이어그램

```
[Developer]
    |
    | git push origin main
    v
+-------------------+
|   GitHub Actions  |
+-------------------+
    |
    | 1. Checkout
    | 2. AWS Configure
    |
    v
+-------------------+
|       S3          |  <- 파일 업로드
+-------------------+
    |
    | 3. Sync
    |
    v
+-------------------+
|   CloudFront      |  <- 캐시 무효화
+-------------------+
    |
    | 4. Invalidate
    |
    v
[사용자 접속] <- 최신 파일 제공
```

---

## IAM 권한 설정

배포에 필요한 최소 IAM 정책:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>",
        "arn:aws:s3:::<YOUR_S3_BUCKET_NAME>/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

---

## 선택적 설정

### 특정 파일만 배포

```yaml
- name: Sync specific files to S3
  run: |
    aws s3 cp ./index.html s3://<YOUR_S3_BUCKET_NAME>/
    aws s3 sync ./js s3://<YOUR_S3_BUCKET_NAME>/js/
    aws s3 sync ./css s3://<YOUR_S3_BUCKET_NAME>/css/
```

### 특정 경로만 캐시 무효화

```yaml
- name: Invalidate specific paths
  run: |
    aws cloudfront create-invalidation \
      --distribution-id <YOUR_CLOUDFRONT_DISTRIBUTION_ID> \
      --paths "/index.html" "/js/*"
```

### PR 미리보기 (선택)

```yaml
on:
  pull_request:
    branches:
      - main

# PR 번호로 별도 경로에 배포
- name: Deploy PR preview
  run: |
    aws s3 sync ./ s3://<YOUR_S3_BUCKET_NAME>/pr-${{ github.event.number }}/
```

---

## 트러블슈팅

| 문제 | 원인 | 해결 |
|------|------|------|
| Access Denied | IAM 권한 부족 | S3, CloudFront 권한 확인 |
| Bucket not found | 버킷 이름 오타 | placeholder 교체 확인 |
| Invalidation failed | 배포 ID 오류 | CloudFront 콘솔에서 ID 확인 |
| 캐시 갱신 안됨 | 무효화 경로 오류 | `/*` 또는 특정 경로 확인 |

---

## 참고 링크

- [AWS S3 CLI 문서](https://docs.aws.amazon.com/cli/latest/reference/s3/)
- [CloudFront 캐시 무효화](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
- [GitHub Actions AWS 설정](https://github.com/aws-actions/configure-aws-credentials)
