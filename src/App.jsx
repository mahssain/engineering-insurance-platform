
// This is the starter frontend code for your insurance platform
// Built with React + Tailwind CSS + Supabase client

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    selected_policies: [],
  });

  const policies = [
    "Contractors All Risk (CAR)",
    "Erection All Risk (EAR)",
    "Contractors Plant & Machinery (CPM)",
    "Machinery Breakdown (MB)",
    "Loss of Profit due to MB (MLOP)",
    "Electronic Equipment (EE)",
    "Deterioration of Stock (DOS)",
    "General Public Liability (GPL)"
  ];

  const handleNext = async () => {
    if (step === 1) {
      const { error } = await supabase.from("quotes").insert([formData]);
      if (!error) {
        alert("Quote submitted! Our team will contact you soon.");
        setStep(0);
        setFormData({
          company_name: "",
          contact_person: "",
          email: "",
          phone: "",
          selected_policies: [],
        });
      }
    } else {
      setStep(step + 1);
    }
  };

  if (step === 0) {
    return (
      <div className="p-10 space-y-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">Insurance Portal</h1>
        <button onClick={() => setStep(1)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Direct Quote
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded">Tender Quote (Coming Soon)</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Book a Call (Coming Soon)</button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="p-10 max-w-xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Direct Quote Request</h2>
        <input
          type="text"
          placeholder="Company Name"
          className="w-full p-2 border mb-2"
          value={formData.company_name}
          onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact Person"
          className="w-full p-2 border mb-2"
          value={formData.contact_person}
          onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-2"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-2 border mb-4"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <label className="block mb-2 font-medium">Select Policies:</label>
        {policies.map((p, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              checked={formData.selected_policies.includes(p)}
              onChange={(e) => {
                const selected = formData.selected_policies;
                if (e.target.checked) selected.push(p);
                else selected.splice(selected.indexOf(p), 1);
                setFormData({ ...formData, selected_policies: [...selected] });
              }}
            /> {p}
          </div>
        ))}
        <button onClick={handleNext} className="bg-green-600 text-white px-4 py-2 rounded mt-4">
          Submit
        </button>
      </div>
    );
  }

  return null;
}
