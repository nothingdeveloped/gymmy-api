"use strict";

const request = require("google-oauth-jwt").requestWithJWT;
const util = require("util");
const { JWT, GoogleAuth } = require("google-auth-library");
const server = require("../../../../config/server");
const { default: axios } = require("axios");

let urlPattern = process.env.PURCHASE_VERIFY_URL;
let subscriptionUrlPattern = process.env.PURCHASE_SUBSCRIBE_VERIFY_URL;
let subscriptionAckPattern = process.env.PURCHASE_SUBSCRIBE_ACKNOWLEDGE_URL;

let options = {
  email: process.env.PURCHASE_EMAIL,
  key: process.env.PURCHASE_PRIVATE_KEY,
};

module.exports = () => ({
  async getCoins(user_id) {
    try {
      const wallet = await strapi.query("api::wallet.wallet").findOne({
        where: {
          user: user_id,
        },
      });
      if (!wallet) {
        return {
          error: false,
          coins: 0,
        };
      }
      return {
        error: false,
        coins: parseInt(wallet.coins),
      };
    } catch (error) {
      console.log(error);
    }
  },

  async verifyPurchase(user_id, receipt) {
    let finalUrl = util.format(
      subscriptionUrlPattern,
      encodeURIComponent(receipt.packageName),
      // encodeURIComponent(receipt.productId),
      encodeURIComponent(receipt.purchaseToken)
    );

    let ackUrl = util.format(
      subscriptionAckPattern,
      encodeURIComponent(receipt.packageName),
      encodeURIComponent(receipt.productId),
      encodeURIComponent(receipt.purchaseToken)
    );
    console.log(receipt);

    const verifiedInfo = await this.verify(finalUrl, ackUrl);
    console.log("verifiedInfo", verifiedInfo);
    console.log("done");
    // Subscription
    // if (verifiedInfo != null) {

    try {
      console.log({
        purchased_at: verifiedInfo.startTime,
        token: receipt.purchaseToken,
        last_order_id: verifiedInfo.latestOrderId,
        region: verifiedInfo.regionCode,
        email: decodeURIComponent(
          verifiedInfo.externalAccountIdentifiers.obfuscatedExternalAccountId
        ),
        user: user_id,
        product_id: verifiedInfo.lineItems[0].productId,
        expire_time: verifiedInfo.lineItems[0].expiryTime,
      });
      const subscription = await strapi
        .query("api::subscription.subscription")
        .create({
          data: {
            purchased_at: verifiedInfo.startTime,
            token: receipt.purchaseToken,
            last_order_id: verifiedInfo.latestOrderId,
            region: verifiedInfo.regionCode,
            email: decodeURIComponent(
              verifiedInfo.externalAccountIdentifiers
                .obfuscatedExternalAccountId
            ),
            user: user_id,
            product_id: verifiedInfo.lineItems[0].productId,
            expire_time: verifiedInfo.lineItems[0].expiryTime,
          },
        });

      await strapi.query("plugin::users-permissions.user").update({
        where: {
          id: user_id,
        },
        data: {
          subscribed: true,
          subscriber: true,
          subscription_expire_time: verifiedInfo.lineItems[0].expiryTime,
        },
      });
    } catch (error) {
      console.log(error);
    }

    return verifiedInfo;

    // Consumables
    if (verifiedInfo != null) {
      const subscription = await strapi
        .query("api::subscription.subscription")
        .create({
          data: {
            purchased_at: verifiedInfo.purchaseTimeMillis,
            order_id: verifiedInfo.orderId,
            region: verifiedInfo.regionCode,
            user: user_id,
          },
        });
      const wallet = await strapi.query("api::wallet.wallet").findOne({
        where: {
          user: user_id,
        },
      });
      let walletInfo = null;
      if (wallet) {
        walletInfo = await strapi.query("api::wallet.wallet").update({
          where: {
            user: user_id,
          },
          data: {
            coins: parseInt(wallet.coins) + verifiedInfo.coins,
          },
        });
      } else {
        // create
        walletInfo = await strapi.query("api::wallet.wallet").create({
          data: {
            user: user_id,
            coins: verifiedInfo.coins,
          },
        });
      }
      return walletInfo;
      return subscription;
    }
    return verifiedInfo;
  },

  isValidJson(string) {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  },

  async verify(finalUrl, ackUrl) {
    try {
      const client = new JWT({
        email: options.email,
        key: options.key,
        clientId: "102268904510161475935",
        keyId: "4de538e0c2d4d6982363eafaa65116aa29f344f7",
        scopes: ["https://www.googleapis.com/auth/androidpublisher"],
      });
      const infoUrl = finalUrl;
      const response = await client.request({
        url: infoUrl,
      });
      var purchaseInfo = response.data;
      console.log(purchaseInfo);
      if (purchaseInfo) {
        if (
          purchaseInfo.acknowledgementState == "ACKNOWLEDGEMENT_STATE_PENDING"
        ) {
          await client.request({
            method: "POST",
            url: ackUrl,
            // data : {
            //   developerPayload :
            // }
          });
          purchaseInfo = {
            coins: 30,
            ...purchaseInfo,
          };
          return purchaseInfo;
        }
      }
      return purchaseInfo;
    } catch (error) {
      console.error("Error making request:", error);
      return null;
    }
  },
});

// {
//   purchaseTimeMillis: '1706372512194',
//   purchaseState: 0,  //0. Purchased 1. Canceled 2. Pending
//   consumptionState: 1, // 0. Yet to be consumed 1. Consumed
//   developerPayload: '',
//   orderId: 'GPA.3311-1170-3356-60051',
//   purchaseType: 0,
//   acknowledgementState: 1,
//   kind: 'androidpublisher#productPurchase',
//   regionCode: 'IN'
// }

// {
//   kind: 'androidpublisher#subscriptionPurchaseV2',
//   startTime: '2024-02-26T07:33:30.598Z',
//   regionCode: 'IN',
//   subscriptionState: 'SUBSCRIPTION_STATE_ACTIVE',
//   latestOrderId: 'GPA.3360-8510-8304-53962',
//   testPurchase: {},
//   acknowledgementState: 'ACKNOWLEDGEMENT_STATE_PENDING',
//   externalAccountIdentifiers: { obfuscatedExternalAccountId: 'useremailId' },
//   lineItems: [
//     {
//       productId: 'three_months_pack',
//       expiryTime: '2024-02-26T07:43:27.435Z',
//       autoRenewingPlan: [Object],
//       offerDetails: [Object]
//     }
//   ]
// }
