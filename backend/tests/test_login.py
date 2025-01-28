import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


# Test function should be prefixed with 'test_'
def test_login_functionality():
    # Set up the web driver
    driver = webdriver.Firefox()

    try:
        # Open the login page
        driver.get('http://localhost:4200/login')

        # Wait for the username field to be visible and interactable
        username_field = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.NAME, 'username'))
        )

        # Wait for the password field to be visible and interactable
        password_field = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.NAME, 'password'))
        )

        # Wait for the login button to be clickable
        login_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button[type="submit"]'))
        )

        # Input the username and password
        username_field.send_keys('root')
        password_field.send_keys('root')

        # Submit the form by clicking the login button
        login_button.click()

        # Wait for the page to load after the login and check if login was successful
        # Replace '.some-success-element' with an actual element that confirms successful login
        success_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.green-container'))
        )
        assert success_element is not None  # Optional: Assert that success element is found
        print("Login successful!")

    except Exception as e:
        print(f"Test failed: {e}")
        assert False, f"Test failed: {e}"

    finally:
        # Close the driver after the test is done
        driver.quit()
