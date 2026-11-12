import { getUser, getToken, setSession, clearSession, apiPost } from '/src/js/api.js';

// Always enforce dark theme on the login screen
document.documentElement.setAttribute('data-theme', 'dark');

// Check URL parameters for session messages (e.g. ?expired=1)
const urlParams = new URLSearchParams(window.location.search);
const isExplicitLogout = urlParams.get('expired') || urlParams.get('loggedOut');

if (urlParams.get('expired') || urlParams.get('loggedOut')) {
  const sessionNotice = document.getElementById('sessionNotice');
  const sessionNoticeText = document.getElementById('sessionNoticeText');
  if (sessionNotice && sessionNoticeText) {
    sessionNoticeText.textContent = urlParams.get('expired')
      ? 'Your session has expired. Please sign in again.'
      : 'You have been signed out successfully.';
    sessionNotice.style.display = 'flex';
  }
}

// Remember Me pre-fill
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('rememberMe');
try {
  const savedEmail = localStorage.getItem('ci360_saved_email');
  if (savedEmail && emailInput && rememberCheckbox) {
    emailInput.value = savedEmail;
    rememberCheckbox.checked = true;
    if (passwordInput) passwordInput.focus();
  }
} catch (e) {}

// Automatic persistent login: If user is already logged in, immediately redirect to their dashboard!
(function initSessionUI() {
  const u = getUser();
  const token = getToken();

  if (u && token && !isExplicitLogout) {
    const isSuper = u.role === 'superadmin' || u.role === 'admin';
    const isEkta = (u.name && u.name.toLowerCase().includes('ekta')) || (u.email && u.email.toLowerCase().includes('ekta'));
    const target = isSuper ? '/admin' : (u.role === 'accounts' || isEkta ? '/accounts' : (u.role === 'employee' ? '/employee' : '/client'));
    window.location.replace(target);
    return;
  }

  const banner = document.getElementById('activeSessionBanner');
  const nameEl = document.getElementById('activeSessionName');
  const roleEl = document.getElementById('activeSessionRole');
  const goBtn = document.getElementById('activeSessionGoBtn');
  const clearBtn = document.getElementById('activeSessionClearBtn');

  if (u && token && banner && nameEl && roleEl && goBtn && clearBtn) {
    const isSuper = u.role === 'superadmin' || u.role === 'admin';
    const isEkta = (u.name && u.name.toLowerCase().includes('ekta')) || (u.email && u.email.toLowerCase().includes('ekta'));
    const target = isSuper ? '/admin' : (u.role === 'accounts' || isEkta ? '/accounts' : (u.role === 'employee' ? '/employee' : '/client'));
    const roleTitle = isSuper ? 'Administrator' : (u.role === 'accounts' || isEkta ? 'Accounts & Finance' : (u.role === 'employee' ? 'Team Member' : 'Client'));

    nameEl.textContent = `Signed in as ${u.name || u.email || 'Active User'}`;
    roleEl.textContent = `${roleTitle} Workspace`;
    banner.style.display = 'flex';

    goBtn.onclick = () => {
      window.location.href = target;
    };

    clearBtn.onclick = () => {
      clearSession();
      banner.style.display = 'none';
    };
  }
})();

const EYE_OPEN = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
const EYE_OFF  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;

function setupPwToggle(btnId, inputId) {
  const btn = document.getElementById(btnId);
  const inp = document.getElementById(inputId);
  if (btn && inp) {
    btn.innerHTML = EYE_OPEN;
    btn.onclick = () => {
      const isPw = inp.type === 'password';
      inp.type = isPw ? 'text' : 'password';
      btn.innerHTML = isPw ? EYE_OFF : EYE_OPEN;
    };
  }
}

setupPwToggle('togglePasswordBtn', 'password');
setupPwToggle('toggleResetNewPwBtn', 'resetNewPassword');
setupPwToggle('toggleResetConfirmPwBtn', 'resetConfirmPassword');

// Switch between Sign In and Reset Password views
const signInView = document.getElementById('signInView');
const resetPwView = document.getElementById('resetPasswordView');
const dividerText = document.getElementById('viewDividerText');

function showSignIn() {
  resetPwView.style.display = 'none';
  signInView.style.display = 'block';
  dividerText.textContent = 'Sign in with credentials';
  document.getElementById('loginError').style.display = 'none';
}

function showResetPassword() {
  signInView.style.display = 'none';
  resetPwView.style.display = 'block';
  dividerText.textContent = 'Password Recovery';
  document.getElementById('resetError').style.display = 'none';
  document.getElementById('resetSuccess').style.display = 'none';
  const emailVal = document.getElementById('email').value.trim();
  if (emailVal) document.getElementById('resetEmail').value = emailVal;
}

const forgotPwLink = document.getElementById('forgotPwLink');
if (forgotPwLink) forgotPwLink.onclick = showResetPassword;
const switchToResetBtn = document.getElementById('switchToResetBtn');
if (switchToResetBtn) switchToResetBtn.onclick = showResetPassword;
const backToSignInBtn = document.getElementById('backToSignInBtn');
if (backToSignInBtn) backToSignInBtn.onclick = showSignIn;

// Handle Login Submit
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn    = document.getElementById('loginBtn');
  const errBox = document.getElementById('loginError');
  const errMsg = document.getElementById('errorMsgText');
  errBox.style.display = 'none';

  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> <span>Signing in…</span>`;

  try {
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    if (!email || !password) {
      throw new Error('Please enter both your email/username and password.');
    }

    // Persist remember me preference
    try {
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem('ci360_saved_email', email);
      } else {
        localStorage.removeItem('ci360_saved_email');
      }
    } catch (e) {}

    const data = await apiPost('/auth/login', { email, password });
    setSession(data.token, data.user);
    try {
      if (typeof window.registerPushSubscription === 'function') {
        window.registerPushSubscription().catch(() => {});
      }
    } catch (e) {}
    const isSuper = data.user.role === 'superadmin' || data.user.role === 'admin';
    const isEkta = (data.user.name && data.user.name.toLowerCase().includes('ekta')) || (data.user.email && data.user.email.toLowerCase().includes('ekta'));
    window.location.href = isSuper ? '/admin' : (data.user.role === 'accounts' || isEkta ? '/accounts' : (data.user.role === 'employee' ? '/employee' : '/client'));
  } catch (err) {
    errMsg.textContent = err.message || 'Invalid credentials. Please check and try again.';
    errBox.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <span>Sign In to Dashboard</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    `;
  }
});

// Handle Reset Password Submit
document.getElementById('resetPasswordForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn     = document.getElementById('resetSubmitBtn');
  const errBox  = document.getElementById('resetError');
  const errMsg  = document.getElementById('resetErrorMsgText');
  const succBox = document.getElementById('resetSuccess');
  const succMsg = document.getElementById('resetSuccessMsgText');

  errBox.style.display = 'none';
  succBox.style.display = 'none';

  const identifier = document.getElementById('resetEmail').value.trim();
  const newPassword = document.getElementById('resetNewPassword').value;
  const confirmPw   = document.getElementById('resetConfirmPassword').value;

  if (!identifier) {
    errMsg.textContent = 'Please enter your username or email address.';
    errBox.style.display = 'flex';
    return;
  }
  if (!newPassword || newPassword.length < 6) {
    errMsg.textContent = 'Password must be at least 6 characters long.';
    errBox.style.display = 'flex';
    return;
  }
  if (newPassword !== confirmPw) {
    errMsg.textContent = 'Passwords do not match. Please verify.';
    errBox.style.display = 'flex';
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> <span>Resetting Password…</span>`;

  try {
    const res = await apiPost('/auth/reset-password', {
      identifier,
      newPassword
    });

    succMsg.textContent = res.message || 'Password reset successfully! Returning to sign in…';
    succBox.style.display = 'flex';

    // Pre-fill login inputs
    document.getElementById('email').value = identifier;
    document.getElementById('password').value = newPassword;

    setTimeout(() => {
      showSignIn();
    }, 1600);
  } catch (err) {
    errMsg.textContent = err.message || 'Could not reset password. Please verify your email or username.';
    errBox.style.display = 'flex';
  } finally {
    btn.disabled = false;
    btn.innerHTML = `
      <span>Update &amp; Save Password</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
  }
});

