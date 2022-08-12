import { test, expect } from '@playwright/test';

test('Ticket Search E2E validation', async ({ page }) => {

  // Go to https://www.aviasales.com/
  await page.goto('https://www.aviasales.com/');

  // Select Night Theme
  await page.locator('[data-test-id="switch"] span >> nth=0').check();

  // Fill from input
  await page.locator('[data-test-id="origin-autocomplete-field"]').fill('NEW York');
  await page.locator('[data-test-id="suggest-JFKairport"] div:has-text("John F. Kennedy International Airport")').click();


  // Fill destination input
  await page.locator('[data-test-id="destination-autocomplete-field"]').fill('Berlin');


  // Select date
  await page.locator('[aria-label="Tue Aug 30 2022"] >> text=30').click();

  // Select no-return-ticket
  await page.locator('[data-test-id="no-return-ticket"]').click();

  // Select passengers
  await page.locator('[data-test-id="passengers-field"]').click();
  await page.locator('[data-test-id="passengers-adults-field"] svg').nth(1).click();

  // Click search
  await page.locator('[data-test-id="form-submit"]').click();

  //Validate new page is loaded
  const url = await page.url();
  await expect(url).toContain("JFK3008BER2");

  //wait till page loads
  await page.waitForLoadState('domcontentloaded'); 

  //validate from input
  const from = await page.locator('[data-test-id="origin-autocomplete-field"]');
  await expect(from).toHaveValue('John F. Kennedy International Airport');
  
  //validate destination input
  const to = await page.locator('[data-test-id="destination-autocomplete-field"]');
  await expect(to).toHaveValue('Berlin');
  
  //validate date input
  const date = await page.locator('[data-test-id="departure-date-input"]');
  await expect(date).toHaveValue('Tue, August 30');
  
  //validate return input
  const return_tiket = await page.locator('[data-test-id="return-date-field"]').innerText();
  await expect(return_tiket).toBe('');
  
  //validate passengers input
  const passengers = await page.locator('[data-test-id="passengers-field"]').innerText();
  await expect(passengers).toContain('2 passengers\neconomy');

  await page.close();  


});