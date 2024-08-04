import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { stage } from "../get_stage_app";
import { LambdaStack } from "./lambda_stack";
import { envs } from "../../src/envs";

export class IacStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environments = {
      'STAGE': stage,
      'EMAIL_LOGIN': envs.EMAIL_LOGIN,
      'EMAIL_PASSWORD': envs.EMAIL_PASSWORD,
    }

    new LambdaStack(this, environments)
  }
}