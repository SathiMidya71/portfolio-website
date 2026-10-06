"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { profile } from "@/lib/content"

export function CopyEmailButton() {
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      toast.success("Email copied!")
    } catch {
      toast(profile.email)
    }
  }

  return (
    <Button onClick={copy} className="h-10 rounded-lg px-3.5 text-sm font-semibold">
      Copy my email
    </Button>
  )
}
