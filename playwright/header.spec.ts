import { test, expect } from "@playwright/test";

test.describe("Loan Application Header", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the loan application home page
    await page.goto("http://localhost:5173/");
  });

  test("should render header with title and description", async ({ page }) => {
    // Check if the header is visible
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Check if the main title is present using role selector
    await expect(
      page.getByRole("heading", { name: "Loan Applications" })
    ).toBeVisible();

    // Check if the description is present
    await expect(
      page.getByText("Manage and track all loan applications")
    ).toBeVisible();
  });

  test("should render New Application button in header", async ({ page }) => {
    // Check if the "New Application" button is visible
    const newApplicationButton = page.getByRole("button", {
      name: "New Application",
    });
    await expect(newApplicationButton).toBeVisible();
  });

  test("should navigate to create loan page when clicking New Application", async ({
    page,
  }) => {
    // Click the "New Application" button
    await page.getByRole("button", { name: "New Application" }).click();

    // Check if we're on the create loan page
    await expect(page).toHaveURL(/.*loan\/create/);
  });

  test("should navigate to home page when clicking the title link", async ({
    page,
  }) => {
    // Click the "New Application" button
    await page.getByRole("button", { name: "New Application" }).click();

    // Click the link that contains the title (more specific selector)
    await page.getByRole("link", { name: /Loan Applications/ }).click();

    // Check if we're on the home page
    await expect(page).toHaveURL("http://localhost:5173/");
  });
});
