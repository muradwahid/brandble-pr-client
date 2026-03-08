import { loadStripe } from "@stripe/stripe-js";
import config from "../config";
export const stripe = loadStripe(config.stripeKey)