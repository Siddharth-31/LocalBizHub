
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "";

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    message: "",
  });
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/businesses`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load businesses");
        }
        return response.json();
      })
      .then(setBusinesses)
      .catch(() => {
        setError("Unable to connect to the server. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredBusinesses = businesses.filter((business) =>
    `${business.name} ${business.category} ${business.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function openEnquiry(business) {
    setSelectedBusiness(business);
    setEnquiryMessage("");
    setForm({
      customer_name: "",
      customer_email: "",
      message: "",
    });
  }

  async function submitEnquiry(event) {
    event.preventDefault();
    if (!selectedBusiness || submitting) return;

    setSubmitting(true);
    setEnquiryMessage("");

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business_id: selectedBusiness.id,
          customer_name: form.customer_name.trim(),
          customer_email: form.customer_email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit enquiry");
      }

      setEnquiryMessage("Enquiry submitted successfully!");
      setForm({
        customer_name: "",
        customer_email: "",
        message: "",
      });
    } catch (err) {
      setEnquiryMessage(
        err.message || "Unable to submit enquiry. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="/">
          LocalBizHub
        </a>
        <span>Discover local businesses</span>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">SUPPORT YOUR LOCAL COMMUNITY</p>
          <h1>
            Discover businesses
            <br />
            around you.
          </h1>
          <p>
            Find local services, explore small businesses,
            and connect with people in your community.
          </p>

          <input
            className="search"
            type="search"
            placeholder="Search business, category or city..."
            aria-label="Search businesses"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </section>

        <section className="directory">
          <h2>Explore local businesses</h2>
          <p className="subtitle">
            Find services and discover something local.
          </p>

          {loading && <p>Loading businesses...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <div className="business-grid">
              {filteredBusinesses.map((business) => (
                <article className="business-card" key={business.id}>
                  <div className="business-icon" aria-hidden="true">
                    {business.category === "Food"
                      ? "🍽️"
                      : business.category === "Technology"
                        ? "💻"
                        : "🎨"}
                  </div>

                  <span className="category">{business.category}</span>
                  <h3>{business.name}</h3>
                  <p className="location">
                    Location: {business.location}
                  </p>
                  <p className="description">{business.description}</p>

                  <button
                    type="button"
                    className="contact-button"
                    onClick={() => openEnquiry(business)}
                  >
                    Enquire now →
                  </button>
                </article>
              ))}

              {filteredBusinesses.length === 0 && (
                <p>No businesses found. Try another search.</p>
              )}
            </div>
          )}
        </section>

        {selectedBusiness && (
          <section className="enquiry-section" id="enquiry">
            <h2>Enquire about {selectedBusiness.name}</h2>
            <p className="subtitle">
              Complete the form to send your enquiry.
            </p>

            <form onSubmit={submitEnquiry}>
              <label htmlFor="customer-name">Your name</label>
              <input
                id="customer-name"
                type="text"
                maxLength={150}
                autoComplete="name"
                required
                value={form.customer_name}
                onChange={(event) =>
                  setForm({ ...form, customer_name: event.target.value })
                }
                placeholder="Enter your name"
              />

              <label htmlFor="customer-email">Email address</label>
              <input
                id="customer-email"
                type="email"
                maxLength={255}
                autoComplete="email"
                required
                value={form.customer_email}
                onChange={(event) =>
                  setForm({ ...form, customer_email: event.target.value })
                }
                placeholder="Enter your email"
              />

              <label htmlFor="customer-message">Your message</label>
              <textarea
                id="customer-message"
                maxLength={2000}
                required
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="How can this business help you?"
              />

              <button
                type="submit"
                className="submit-button"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit enquiry"}
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setSelectedBusiness(null);
                  setEnquiryMessage("");
                }}
              >
                Cancel
              </button>

              {enquiryMessage && (
                <p
                  className={
                    enquiryMessage.includes("successfully")
                      ? "success"
                      : "error"
                  }
                  role="status"
                >
                  {enquiryMessage}
                </p>
              )}
            </form>
          </section>
        )}
      </main>

      <footer>
        <strong>LocalBizHub</strong>
        <p>Discover local. Support small businesses.</p>
      </footer>
    </div>
  );
}

export default App;
