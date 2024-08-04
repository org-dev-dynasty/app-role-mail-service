import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import path from "path";
import { CfnOutput, Duration } from "aws-cdk-lib";

export class LambdaStack extends Construct {
  lambdaHandler: lambda.Function;
  nodeModulesLayer: lambda.LayerVersion;

  constructor(scope: Construct, environmentVariables: Record<string, string>) {
    super(
      scope,
      `${environmentVariables.STACK_NAME}-${environmentVariables.STAGE}`
    );

    this.nodeModulesLayer = new lambda.LayerVersion(
      this,
      `${environmentVariables.STACK_NAME}-${environmentVariables.STAGE}-node-modules-Layer`,
      {
        code: lambda.Code.fromAsset(path.join(__dirname, "../dependencies")),
        compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
        description:
          "Node modules layer to use deps in lambda functions for APPROLE Mail Service",
      }
    );

    this.lambdaHandler = new lambda.Function(
      this,
      `${environmentVariables.STACK_NAME}-${environmentVariables.STAGE}-lambda-handler`,
      {
        functionName: `${environmentVariables.STACK_NAME}-${environmentVariables.STAGE}-lambda-handler`,
        code: lambda.Code.fromAsset(path.join(__dirname, "../../build")),
        handler: "server.handler",
        runtime: lambda.Runtime.NODEJS_20_X,
        environment: environmentVariables,
        layers: [this.nodeModulesLayer],
        timeout: Duration.seconds(30),
        memorySize: 256,
      }
    );

    const lambdaUrl = this.lambdaHandler.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new CfnOutput(
      this,
      `${environmentVariables.STACK_NAME}-${environmentVariables.STAGE}-lambda-url`,
      {
        value: lambdaUrl.url,
        description: "The URL to access the lambda function",
      }
    );
  }
}
