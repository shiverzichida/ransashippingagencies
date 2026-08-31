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
        setStatus(status, "Inquiry berhasil dikirim. Mengalihkan ke WhatsApp...");
        form.reset();

        // Construct WhatsApp message
        const waNumber = "628115750555";
        const companyStr = payload.company ? ` dari ${payload.company}` : "";
        let topicStr = "";
        if (payload.commodity) topicStr = `Komoditas: ${payload.commodity}\n`;
        if (payload.fleet_type) topicStr = `Tipe Armada: ${payload.fleet_type}\n`;
        if (payload.service) topicStr = `Layanan: ${payload.service}\n`;

        const waText = `Halo, saya ${payload.name}${companyStr}.\n\nSaya ingin menanyakan perihal divisi ${payload.division}.\n${topicStr}\nPesan:\n${getValue(data, "message")}\n\nKontak saya:\nEmail: ${payload.email}\nNo HP: ${payload.phone}`;
        
        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        window.location.href = waUrl;

      } catch (error) {
        setStatus(status, error instanceof Error ? error.message : "Inquiry gagal dikirim.");
      }
    });
  });
}

function getPayload(data) {
  const service = getValue(data, "service");
  const company = getValue(data, "company");
  const inquiryType = getValue(data, "inquiry_type");
  const messageParts = [
    company ? `Company: ${company}` : "",
    inquiryType ? `Inquiry Type: ${inquiryType}` : "",
    getValue(data, "message")
  ].filter(Boolean);
  return {
    division: getValue(data, "division") || service || "General Ransa Group",
    name: getValue(data, "name"),
    email: getValue(data, "email"),
    phone: getValue(data, "phone"),
    service,
    commodity: getValue(data, "commodity"),
    fleet_type: getValue(data, "fleet_type"),
    message: messageParts.join("\n\n")
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
