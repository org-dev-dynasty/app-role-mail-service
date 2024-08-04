import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { stage } from "../get_stage_app";
import { LambdaStack } from "./lambda_stack";
import { envs } from "../../src/envs"; // Importe envs para obter as variáveis de ambiente

export class IacStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environmentVariables = {
      STACK_NAME: envs.STACK_NAME,
      EMAIL_LOGIN: process.env.EMAIL_LOGIN!,
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD!,
      AWS_REGION: process.env.AWS_REGION!,
      AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID!,
      GITHUB_REF: process.env.GITHUB_REF!,
      STAGE: stage,
    };

    new LambdaStack(this, environmentVariables);
  }
}
