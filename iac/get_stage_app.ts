import { envs } from "../src/envs";

let stage: string;

if (envs.GITHUB_REF_NAME?.includes('prod')) {
  stage = 'PROD';
} else if (envs.GITHUB_REF_NAME?.includes('homolog')) {
  stage = 'HOMOLOG';
} else if (envs.GITHUB_REF_NAME?.includes('dev')) {
  stage = 'DEV';
} else {
  stage = 'TEST';
}

export { stage };