import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, marketingConsent, analysisResult, meta } = await req.json();

    const webhookUrl = process.env.GHL_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("GHL_WEBHOOK_URL is not configured");
      return NextResponse.json({ success: true, warning: "CRM sync failed" });
    }

    // Server-side values for Meta CAPI
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || req.headers.get("x-real-ip")
      || "";
    const userAgent = req.headers.get("user-agent") || "";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Contact info
        firstName,
        lastName,
        email,
        phone,
        marketingConsent,
        source: "MEDfacials NeoGen Skin Analysis App",
        tags: ["neogen-skin-analysis-lead", ...(marketingConsent ? ["marketing-consent-given"] : [])],

        // Analysis results
        suitabilityScore: analysisResult?.suitabilityScore,
        suitabilityTier: analysisResult?.suitabilityTier,
        fitzpatrickType: analysisResult?.fitzpatrickType,
        overallSummary: analysisResult?.overallSummary,
        concerns: analysisResult?.concerns,

        // Meta Conversion API fields
        meta_fbp: meta?.fbp || null,
        meta_fbc: meta?.fbc || null,
        meta_fbclid: meta?.fbclid || null,
        meta_event_id: meta?.eventId || null,
        meta_event_name: meta?.eventName || "Lead",
        meta_page_url: meta?.pageUrl || null,
        meta_client_ip: clientIp,
        meta_user_agent: userAgent,
      }),
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
