import { test, expect } from "@playwright/test";
for (const width of [320, 375, 768, 1024, 1440])
  test(`layout and assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Discover the");
    for (const id of [
      "about",
      "programs",
      "why-theatre",
      "performances",
      "gallery",
      "contact",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBeTruthy();
    }
    await expect(page.locator("img")).toHaveCount(21);
    expect(
      await page
        .locator("img")
        .evaluateAll((images) =>
          images.every((image) => image.complete && image.naturalWidth > 0),
        ),
    ).toBeTruthy();
    expect(errors).toEqual([]);
    await page.locator("#home").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `test-results/site-${width}.png`,
      fullPage: true,
    });
  });
test("mobile navigation supports keyboard, closes and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Our Programs", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page).toHaveURL(/#programs$/);
});
test("gallery has focus containment, arrow navigation and close restoration", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", {
    name: "View A world of imagination",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toContainText("Finding our voices");
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("dialog")).toContainText(
    "A world of imagination",
  );
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement.closest("dialog")),
    ).toBeTruthy();
  }
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});
test("all seven event categories and policy placeholders open", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore All Activities" }).click();
  await expect(
    page.getByRole("button", { name: "View Highlights" }),
  ).toHaveCount(7);
  await page.getByRole("button", { name: "View Highlights" }).first().click();
  await expect(page.getByRole("dialog")).toContainText(
    "sample highlights preview",
  );
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: "Privacy Policy", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText(
    "to be confirmed before launch",
  );
  await page.keyboard.press("Escape");
});
test("program preselection and form success/reset", async ({ page }) => {
  await page.goto("/");
  await page
    .locator(".program-card")
    .first()
    .getByRole("link", { name: "Enquire Now" })
    .click();
  await expect(page.getByLabel("Preferred Program")).toHaveValue("children");
  await page.getByRole("button", { name: "Submit Enquiry" }).click();
  await expect(page.getByText("Enter a name between")).toBeVisible();
  await page.getByLabel("Parent / Participant Name").fill("Test Parent");
  await page.getByLabel("Participant’s Age").fill("12");
  await page.getByLabel("Mobile Number").fill("+91 98765 43210");
  await page.getByLabel("Email Address").fill("parent@example.com");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit Enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("passed validation");
  await expect(page.getByLabel("Parent / Participant Name")).toHaveValue("");
  await expect(page.getByLabel("Preferred Program")).toHaveValue("");
});
test("network failures preserve form entries", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Parent / Participant Name").fill("Test Parent");
  await page.getByLabel("Participant’s Age").fill("12");
  await page.getByLabel("Mobile Number").fill("9876543210");
  await page.getByLabel("Email Address").fill("parent@example.com");
  await page.getByLabel("Preferred Program").selectOption("teen");
  await page.getByRole("checkbox").check();
  await page.route("**/api/enquiries", (route) => route.abort());
  await page.getByRole("button", { name: "Submit Enquiry" }).click();
  await expect(page.getByRole("alert")).toContainText("Unable to reach");
  await expect(page.getByLabel("Parent / Participant Name")).toHaveValue(
    "Test Parent",
  );
});
