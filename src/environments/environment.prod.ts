import packageJson from '../../package.json';
export const environment = {
  version: packageJson.version,
  branchName:'UnknownBranchName',
  commitId:'UnknownCommitId',
  production: true,
  host: 'https://webclip2.mytools.express/api'
};
