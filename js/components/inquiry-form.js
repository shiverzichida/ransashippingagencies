export function setupInquiryForm() {
  const form = document.querySelector("[data-inquiry-form]");
  const status = document.querySelector("[data-form-status]");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      if (status) {
        status.textContent = "Mohon lengkapi semua field wajib.";
      }
      return;
    }
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.message ?? "Inquiry gagal dikirim.");
      }
      if (status) {
        status.textContent = "Inquiry berhasil masuk ke routing Ransa.";
      }
      form.reset();
    } catch (error) {
      if (status) {
        status.textContent = error instanceof Error ? error.message : "Inquiry gagal dikirim.";
      }
    }
  });
}
