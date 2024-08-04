import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { stage } from "../get_stage_app";
import { LambdaStack } from "./lambda_stack";

export class IacStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environments = {
      'STAGE': stage
    }

    new LambdaStack(this, environments)
  }
}