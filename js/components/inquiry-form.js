export function setupInquiryForm() {
  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const payload = getPayload(data);
      if (!payload.name || !payload.email || !payload.message) {
        setStatus(status, "Mohon lengkapi nama, email, dan pesan.");
        return;
      }
      try {
        setStatus(status, "Mengirim inquiry...");
        const response = await fetch(form.action, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });
        const result = await response.json();
        if (!response.ok || !(result.ok || result.success)) {
          throw new Error(result.message ?? "Inquiry gagal dikirim.");
        }
        setStatus(status, "Inquiry berhasil dikirim. Tim Ransa akan menghubungi Anda.");
        form.reset();
      } catch (error) {
        setStatus(status, error instanceof Error ? error.message : "Inquiry gagal dikirim.");
      }
    });
  });
}

function getPayload(data) {
  const service = getValue(data, "service");
  return {
    division: getValue(data, "division") || service || "General Ransa Group",
    name: getValue(data, "name"),
    email: getValue(data, "email"),
    phone: getValue(data, "phone"),
    service,
    commodity: getValue(data, "commodity"),
    fleet_type: getValue(data, "fleet_type"),
    message: getValue(data, "message")
  };
}

function getValue(data, key) {
  return String(data.get(key) ?? "").trim();
}

function setStatus(status, message) {
  if (status) {
    status.textContent = message;
  }
}
