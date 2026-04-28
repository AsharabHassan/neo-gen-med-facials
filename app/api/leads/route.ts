import { NextRequest, NextResponse } from "next/server";
import type { SkinConcern } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, marketingConsent, analysisResult, meta } = await req.json();

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GHL_WEBHOOK_URL is not configured");
      return NextResponse.json({ success: true, warning: "CRM sync failed" });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "";
    const userAgent = req.headers.get("user-agent") || "";

    const concerns: SkinConcern[] = analysisResult?.concerns ?? [];
    const concernFields: Record<string, string | number | null> = {};
    for (let i = 0; i < 8; i++) {
      const slot = i + 1;
      const c = concerns[i];
      concernFields[`concern_${slot}_id`] = c?.id ?? null;
      concernFields[`concern_${slot}_name`] = c?.name ?? null;
      concernFields[`concern_${slot}_finding`] = c?.finding ?? null;
      concernFields[`concern_${slot}_benefit`] = c?.neoGenBenefit ?? null;
      concernFields[`concern_${slot}_severity`] = c?.severity ?? null;
      concernFields[`concern_${slot}_icon`] = c?.icon ?? null;
    }

    const payload = {
      // Native GHL contact fields
      firstName,
      lastName,
      email,
      phone,
      source: "MEDfacials NeoGen Skin Analysis App",
      tags: ["neogen-skin-analysis-lead", ...(marketingConsent ? ["marketing-consent-given"] : [])],

      // Consent
      marketing_consent: marketingConsent ? "Yes" : "No",

      // Skin analysis — one value per GHL custom field
      suitability_score: analysisResult?.suitabilityScore ?? null,
      suitability_tier: analysisResult?.suitabilityTier ?? null,
      fitzpatrick_type: analysisResult?.fitzpatrickType ?? null,
      overall_summary: analysisResult?.overallSummary ?? null,

      // Concerns flattened into 8 slots × 6 fields = 48 custom fields
      ...concernFields,

      // Meta Conversion API fields
      meta_fbp: meta?.fbp || null,
      meta_fbc: meta?.fbc || null,
      meta_fbclid: meta?.fbclid || null,
      meta_event_id: meta?.eventId || null,
      meta_event_name: meta?.eventName || "Lead",
      meta_page_url: meta?.pageUrl || null,
      meta_client_ip: clientIp,
      meta_user_agent: userAgent,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text().catch(() => "");
      console.error("GHL webhook error:", errorData);
      return NextResponse.json({ success: true, warning: "CRM sync failed" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json({ success: true, warning: "CRM sync failed" });
  }
}
