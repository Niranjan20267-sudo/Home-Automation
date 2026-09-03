const API_URL = "http://localhost:5000/api";

// ========================================
// SIGNUP
// ========================================

export async function signup(userData) {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  return response.json();
}

// ========================================
// LOGIN
// ========================================

export async function login(credentials) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  return response.json();
}

// ========================================
// GET USERS
// ========================================

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`);

  return response.json();
}

// ========================================
// TEST DATABASE
// ========================================

export async function testDatabase() {
  const response = await fetch(`${API_URL}/test-db`);

  return response.json();
}