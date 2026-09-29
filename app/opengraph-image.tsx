import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "CEDELA Tech Park Solutions. Empowering Organizations. Securing the Future. Transforming Africa.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo/cedela-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#08123f", color: "white", padding: 80, fontFamily: "serif", position: "relative" }}>
        <div style={{ position: "absolute", right: -160, top: -160, width: 640, height: 640, borderRadius: 9999, background: "#0e1a57", display: "flex" }} />
        <img src={logoSrc} width={335} height={60} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 950 }}>Building Africa&apos;s Future Through Innovation, Technology & Digital Trust</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#77D4FC", fontStyle: "italic" }}>Empowering Organizations. Securing the Future. Transforming Africa.</div>
        </div>
      </div>
    ),
    size,
  );
}
