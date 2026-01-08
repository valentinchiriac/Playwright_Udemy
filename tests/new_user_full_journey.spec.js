import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "./../page-objects/Navigation.js";
import { Checkout } from "./../page-objects/Checkout.js";
import { LoginPage } from "./../page-objects/LoginPage.js";
import { RegisterPage } from "./../page-objects/RegisterPage.js";
import { v4 as uuidv4 } from 'uuid';
import { DeliveryDetailsPage } from "./../page-objects/DeliveryDetailsPage.js"
import { deliveryDetails } from "./../data/deliveryDetails.js";
import { PaymentPage } from "./../page-objects/PaymentPage.js";
import { paymentDetails } from "./../data/paymentDetails.js";

test.only("New user full E2E test journey", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new Navigation(page);
  await navigation.goToCheckout();
  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.moveToSignup()

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com"
  const password = uuidv4()
  await registerPage.signUpNewUser(email, password)

  const deliveryDetailsPage = new DeliveryDetailsPage(page)
  await deliveryDetailsPage.fillDetails(deliveryDetails)
  //saving the details of the user
  await deliveryDetailsPage.saveDetails()

  //press Continue to Payment
  await deliveryDetailsPage.continueButton.click()

  //a new object for Payment Page and access to IFrame
  const paymentPage = new PaymentPage(page)
  await paymentPage.activateDiscount()
  await paymentPage.fillPaymentDetails(paymentDetails)
});
