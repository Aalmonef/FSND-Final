let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-login").disabled = isAuthenticated;
  
  if (isAuthenticated) {
    document.getElementById("welcome").classList.add("hidden");
    document.getElementById("btn-login").classList.add("hidden");
    document.getElementById("btn-logout").classList.remove("hidden");
    document.getElementById("gated-content").classList.remove("hidden");

    const claims = await auth0.getIdTokenClaims()
    document.getElementById('nickname').textContent = claims.nickname
  } 
  else {
    document.getElementById("gated-content").classList.add("hidden");
    document.getElementById("btn-logout").classList.add("hidden");
  }
};

window.onload = async () => {
  await configureClient();
  updateUI();
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0.handleRedirectCallback();
    updateUI();
    window.history.replaceState({}, document.title, "/");
  }
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};