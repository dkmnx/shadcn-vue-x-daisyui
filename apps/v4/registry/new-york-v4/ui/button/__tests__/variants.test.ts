import { describe, expect, it } from "vitest"
// apps/v4/registry/new-york-v4/ui/button/__tests__/variants.test.ts
import { buttonVariants } from "../index"

describe("buttonVariants", () => {
  it("should handle daisyui color variants", () => {
    const classes = buttonVariants({ variant: "daisy_primary" })
    expect(classes).toContain("bg-blue-500")
    expect(classes).toContain("text-white")
  })

  it("should handle daisyui subvariants", () => {
    const classes = buttonVariants({ variant: "daisy_primary", subvariant: "outline" })
    expect(classes).toContain("border-2")
    expect(classes).toContain("bg-transparent")
  })

  it("should maintain backward compatibility", () => {
    const classes = buttonVariants({ variant: "default" })
    expect(classes).toContain("bg-primary")
    expect(classes).toContain("text-primary-foreground")
  })
})
