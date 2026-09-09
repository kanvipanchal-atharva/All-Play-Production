import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`founder and theatre pages navigate and refresh at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.getByRole("link", { name: "Read more about our founder" }).click();
    await expect(page).toHaveURL(/\/founder$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Mrs. Varsha Rane");
    await page.reload();
    await expect(page.getByText(/Bol Bol Rani/)).toBeVisible();
    if (width < 768) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About the Theatre", exact: true }).click();
    } else {
      await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About the Theatre", exact: true }).click();
    }
    await expect(page).toHaveURL(/\/about-theatre$/);
    await page.reload();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("A Carnival of Joy");
    await expect(page.locator(".theatre-stats")).toContainText("600+");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const footer = page.locator("#page-footer");
    if (width < 768) await footer.getByRole("button", { name: "Explore", exact: true }).click();
    await footer.getByRole("link", { name: "Founder", exact: true }).click();
    await expect(page).toHaveURL(/\/founder$/);
    await page.locator("header").getByRole("link", { name: "All Play Productions home" }).click();
    await page.getByRole("link", { name: "Read more about the theatre" }).click();
    await expect(page).toHaveURL(/\/about-theatre$/);
    await page.getByRole("link", { name: "Enquire About Programs" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator(".enquiry-form")).toBeVisible();
  });
}
