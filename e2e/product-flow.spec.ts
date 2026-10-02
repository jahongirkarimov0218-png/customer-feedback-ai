import { test, expect } from "@playwright/test";

test.describe("Founder-Grade Customer Feedback Intelligence E2E", () => {
  test("Complete product flow: preset -> analysis -> insights -> evidence modal -> priority matrix", async ({
    page,
  }) => {
    // 1. Visit homepage
    await page.goto("/");
    await expect(page).toHaveTitle(/Customer Feedback|Mijoz/i);

    // 2. Verify founder-first problem positioning (Outcome > Tech)
    const heroHeading = page.locator("h1");
    await expect(heroHeading).toContainText("Mijoz fikrlari tarqoq bo‘lganda");

    // Value pipeline verification
    await expect(page.locator("text=Mahsulot oqimi:")).toBeVisible();
    await expect(page.locator("text=1. Xom Feedback")).toBeVisible();
    await expect(page.locator("text=5. Ustuvor Harakat")).toBeVisible();

    // 3. Select a preset (E-Commerce preset)
    const ecommercePreset = page.locator("button:has-text('E-Commerce & Retail')");
    await expect(ecommercePreset).toBeVisible();
    await ecommercePreset.click();

    // 4. Verify textarea is populated and counter updates
    const textarea = page.locator("textarea");
    await expect(textarea).not.toBeEmpty();
    const textareaValue = await textarea.inputValue();
    expect(textareaValue.length).toBeGreaterThan(50);

    // 5. Trigger Analysis
    const analyzeButton = page.locator("button:has-text('Tahlil qilish')");
    await expect(analyzeButton).toBeEnabled();
    await analyzeButton.click();

    // 6. Verify Results appear
    const resultsSection = page.locator("#analysis-results");
    await expect(resultsSection).toBeVisible({ timeout: 15000 });

    // Verify Executive Summary & Spotlight
    await expect(page.locator("text=Executive Brief")).toBeVisible();
    await expect(page.locator("text=Mijoz Qoniqish Indeksi")).toBeVisible();

    // Verify Top Insights
    await expect(page.locator("text=Top 3 Strategik Xulosalar")).toBeVisible();

    // Verify Problems Table (5 Columns)
    await expect(
      page.locator("text=Muammo | Ta'sir | Dalil | Ustuvorlik | Tavsiya")
    ).toBeVisible();

    // 7. Test Evidence Modal Drill-down
    const evidenceButton = page
      .locator("button:has-text('dalil'), button:has-text('Dalillarni')")
      .first();
    await expect(evidenceButton).toBeVisible();
    await evidenceButton.click();

    // Modal should be open
    const modalDialog = page.locator("div[role='dialog']");
    await expect(modalDialog).toBeVisible();
    await expect(page.locator("text=Mijoz Dalillari (Evidence)")).toBeVisible();

    // Close modal
    const closeButton = modalDialog.locator("button[aria-label='Yopish']");
    await closeButton.click();
    await expect(modalDialog).not.toBeVisible();

    // 8. Test Priority Filters in Table
    const highFilterBtn = page.locator("button:has-text('Yuqori')").first();
    if (await highFilterBtn.isVisible()) {
      await highFilterBtn.click();
      // Should filter rows
      await page.waitForTimeout(200);
    }
  });

  test("Mobile responsive check & navigation", async ({ page }) => {
    await page.goto("/");
    // Check no horizontal document body overflow
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // tolerance for scrollbars
  });
});
