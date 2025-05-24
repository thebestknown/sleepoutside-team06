export default class Alert {
  constructor(jsonPath = "/json/alerts.json", parentSelector = "main") {
    this.jsonPath = jsonPath;
    this.parent = document.querySelector(parentSelector);
  }

  async init() {
    try {
      const res = await fetch(this.jsonPath);
      if (!res.ok) throw new Error("Failed to fetch alerts.json");
      const alerts = await res.json();

      if (Array.isArray(alerts) && alerts.length > 0) {
        this.render(alerts);
      } else {
        console.log("No alerts to show.");
      }
    } catch (err) {
      console.error("Alert loading error:", err);
    }
  }

  render(alerts) {
    const section = document.createElement("section");
    section.classList.add("alert-list");

    alerts.forEach(alert => {
      const { message, background = "#333", color = "#fff" } = alert;
      const p = document.createElement("p");
      p.textContent = message;
      p.style.backgroundColor = background;
      p.style.color = color;
      section.appendChild(p);
    });

    this.parent.prepend(section);
  }
}