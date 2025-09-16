"use server";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  // Dummy login
  if (username === "admin" && password === "admin123") {
    // Simpan ke cookie
    "use server";
    const token = "dummy_token_123";
    return { success: true, token };
  }

  return { success: false, message: "Invalid credentials" };
}