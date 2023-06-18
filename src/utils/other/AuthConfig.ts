const envSctructure: Record<string, string> = {
  production: 'production',
  staging: 'staging',
  development: 'development',
  local: 'local',
  prod: 'production',
  stg: 'staging',
  dev: 'development',
  prd: 'production',
  loc: 'local'
};
export default {
  getToken() {
    const userToken = localStorage.getItem("user");
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
  },
  
  checkToken () {
    return localStorage.getItem("user") || null
  },

  envTransform (env: string): string {
    return envSctructure[env]
  }
}