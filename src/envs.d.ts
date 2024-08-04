declare namespace NodeJS {
  interface ProcessEnv {
    AWS_ACCOUNT_ID: string
    STACK_NAME: string
    AWS_REGION: string
    GITHUB_REF: string
    STAGE: string
    EMAIL_LOGIN: string
    EMAIL_PASSWORD: string
  }
}