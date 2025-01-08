import { Separator } from "@/components/ui/separator";

export default function Highlights() {
    return (
        <div className="text-xs text-muted-foreground">
            <ul className="space-y-4">
                <li>
                    <strong>Dark Mode/Sys Theme 🌓</strong>
                    <p>Toggle between dark mode and system theme.</p>
                </li>
                <li>
                    <strong>Horizontal Flip (icon)</strong>
                    <p>Adjust horizontal orientation.</p>
                </li>
                <Separator />
                <li className="space-y-4">
                    <strong>Share your thoughts 💬</strong>
                    <br />
                    <br />
                    <br />
                </li>
            </ul>
        </div>
    )
}