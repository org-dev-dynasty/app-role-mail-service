import * as cdk from 'aws-cdk-lib'
import { envs } from '../src/envs'
import { IacStack } from './iac/iac_stack'
import { stage } from './get_stage_app'

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

new IacStack(app, `${stackName}-${stage}`, {
  env: {
    account: awsAccount,
    region: awsRegion,
  },
  tags: tags
})

app.synth()