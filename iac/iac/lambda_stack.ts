import { Construct } from "constructs";
import { envs } from "../../src/envs";
import { stage } from "../get_stage_app";
import * as lambda from "aws-cdk-lib/aws-lambda"
import path from "path"
import { CfnOutput, Duration } from "aws-cdk-lib";

const stackName = envs.STACK_NAME
const EMAIL_LOGIN = envs.EMAIL_LOGIN
const EMAIL_PASSWORD = envs.EMAIL_PASSWORD

export class LambdaStack extends Construct {
  lambdaHandler: lambda.Function
  nodeModulesLayer: lambda.LayerVersion

  constructor(scope: Construct, environmentVariables: Record<string, string>) {
    super(scope, `${stackName}-${stage}`)

    this.nodeModulesLayer = new lambda.LayerVersion(this, `${stackName}-${stage}-node-modules-Layer`, {
      code: lambda.Code.fromAsset(path.join(__dirname, "../dependencies")),
      compatibleRuntimes: [lambda.Runtime.NODEJS_20_X],
      description: "Node modules layer to use deps in lambda functions for APPROLE Mail Service",
    })

    this.lambdaHandler = new lambda.Function(this, `${stackName}-${stage}-lambda-handler`, {
      functionName: `${stackName}-${stage}-lambda-handler`,
      code: lambda.Code.fromAsset(path.join(__dirname, "../../build")),
      handler: "server.handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: environmentVariables,
      layers: [this.nodeModulesLayer],
      timeout: Duration.seconds(30),
      memorySize: 256,
    })

    const lambdaUrl = this.lambdaHandler.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedHeaders: ["GET", "POST", "OPTIONS"],
        allowedMethods: [lambda.HttpMethod.GET, lambda.HttpMethod.POST, lambda.HttpMethod.OPTIONS],
        maxAge: Duration.seconds(3600),
      }
    })

    new CfnOutput(this, `${stackName}-${stage}-lambda-url`, {
      value: lambdaUrl.url,
      description: "The URL to access the lambda function"
    })
  }
}