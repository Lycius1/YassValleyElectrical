"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

type FormState = {
  name: string
  phone: string
  suburb: string
  jobType: string
  description: string
}

const initialForm: FormState = {
  name: "",
  phone: "",
  suburb: "",
  jobType: "",
  description: "",
}

const jobTypes = [
  { value: "general", label: "General Electrical" },
  { value: "switchboard", label: "Switchboard Upgrade" },
  { value: "ev", label: "EV Charger Installation" },
  { value: "smart", label: "Smart Home" },
  { value: "hotwater", label: "Hot Water System" },
  { value: "emergency", label: "Emergency Callout" },
  { value: "other", label: "Other" },
]


export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function setField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section
      id="contact"
      data-flame-section
      className="relative z-10 py-24 md:py-32 px-6 md:px-10"
      style={{ willChange: "opacity" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="section-label mb-4">Get in touch</p>
          <h2
            className="font-display font-light text-[#f5ede0] leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Let&apos;s Get<br />
            You Sorted.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Left — contact info */}
          <div className="flex flex-col gap-8">
            {/* Phone — large amber */}
            <div>
              <p className="section-label mb-2">Phone</p>
              <a
                href="tel:0412999842"
                className="font-display font-light text-flame-gradient hover:opacity-80 transition-opacity"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                0412 999 842
              </a>
            </div>

            {/* Email */}
            <div>
              <p className="section-label mb-2">Email</p>
              <a
                href="mailto:admin@yassvalleyelectrical.com.au"
                className="font-body text-sm text-[#a89070] hover:text-[#e8973a] transition-colors break-all"
              >
                admin@yassvalleyelectrical.com.au
              </a>
            </div>

            {/* Hours */}
            <div>
              <p className="section-label mb-2">Hours</p>
              <p className="font-body text-sm text-[#a89070]">
                Mon–Fri 7:00am–5:00pm
              </p>
              <p className="font-body text-xs text-[#a89070]/60 mt-1">
                Sat–Sun: Closed (emergency callouts available)
              </p>
            </div>

            {/* Note */}
            <div className="border-l border-[#c4701a30] pl-4">
              <p className="font-body text-xs text-[#a89070]/80 leading-relaxed">
                Licensed in NSW &amp; ACT — happy to travel across the region.
              </p>
            </div>

            {/* Service area */}
            <div>
              <p className="section-label mb-3">Service area</p>
              <p className="font-body text-sm text-[#a89070]/70 leading-loose tracking-wide">
                Yass · Murrumbateman · Canberra · Binalong ·{" "}
                Bowning · Gundaroo · Sutton · ACT
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full gap-4 py-12">
                <div className="text-[#e8973a] text-2xl">✦</div>
                <h3 className="font-display text-2xl font-light text-[#f5ede0]">
                  Thanks — Jack will be in touch shortly.
                </h3>
                <p className="font-body text-sm text-[#a89070]">
                  Usually responds within a few hours during business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="name"
                      className="section-label normal-case tracking-normal text-xs text-[#a89070]"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      required
                      className="flame-input h-10 rounded-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="phone"
                      className="section-label normal-case tracking-normal text-xs text-[#a89070]"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      required
                      className="flame-input h-10 rounded-none"
                      placeholder="04xx xxx xxx"
                    />
                  </div>
                </div>

                {/* Suburb */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="suburb"
                    className="section-label normal-case tracking-normal text-xs text-[#a89070]"
                  >
                    Suburb
                  </Label>
                  <Input
                    id="suburb"
                    value={form.suburb}
                    onChange={(e) => setField("suburb", e.target.value)}
                    className="flame-input h-10 rounded-none"
                    placeholder="Your suburb"
                  />
                </div>

                {/* Job Type */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="jobType"
                    className="section-label normal-case tracking-normal text-xs text-[#a89070]"
                  >
                    Job Type
                  </label>
                  <select
                    id="jobType"
                    value={form.jobType}
                    onChange={(e) => setField("jobType", e.target.value)}
                    className="h-10 w-full bg-[#1a1208] border border-[#c4701a20] text-[#f5ede0] px-3 text-sm outline-none focus:border-[#c4701a] transition-colors rounded-none appearance-none cursor-pointer"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" className="bg-[#1a1208]">
                      Select job type...
                    </option>
                    {jobTypes.map((t) => (
                      <option
                        key={t.value}
                        value={t.value}
                        className="bg-[#1a1208]"
                      >
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="description"
                    className="section-label normal-case tracking-normal text-xs text-[#a89070]"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                    className="flame-input rounded-none resize-none"
                    placeholder="Brief description of the job..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#c4701a] text-[#0d0805] font-body font-medium tracking-wider text-sm hover:bg-[#e8973a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {submitting ? "Sending..." : "Send Request →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
