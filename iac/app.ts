import * as cdk from 'aws-cdk-lib'
import { envs } from '../src/envs'
import { IacStack } from './iac/iac_stack'

console.log('Starting the CDK')

const app = new cdk.App()

const awsAccount = envs.AWS_ACCOUNT_ID
const stackName = envs.STACK_NAME
const awsRegion = envs.AWS_REGION

const tags = {
  'project': 'APPROLE MailerService',
  'stack': 'BACKEND',
  'owner': 'DevDynastySolutions',
}

new IacStack(app, `${stackName}-${envs.STAGE}`, {
  env: {
    account: awsAccount,
    region: awsRegion,
  },
  tags: tags
})

app.synth()