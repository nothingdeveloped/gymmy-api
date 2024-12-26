"use strict";
const admin = require("firebase-admin");

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

module.exports = {
  decodeJWTPayload(token) {
    try {
      // Split the token into parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      // Decode the payload (second part)
      const payload = Buffer.from(parts[1], "base64").toString();
      return JSON.parse(payload);
    } catch (error) {
      console.error("Error decoding token:", error);
      throw error;
    }
  },

  async mobileAuth(ctx) {
    try {
      const { access_token: idToken } = ctx.request.body;

      if (!idToken) {
        return ctx.badRequest("ID token is required");
      }

      // Verify the Firebase ID token
      const decodeInfo = this.decodeJWTPayload(idToken);

      const { email, name, sub: googleId, email_verified } = decodeInfo;

      if (!email) {
        return ctx.badRequest("Email not found in token");
      }

      if (!email_verified) {
        return ctx.badRequest("Email not verified");
      }

      // Find or create user
      let user = await strapi.query("plugin::users-permissions.user").findOne({
        where: { email },
      });

      if (!user) {
        // Create new user
        user = await strapi.query("plugin::users-permissions.user").create({
          data: {
            username: name, // Using email as username
            email,
            provider: "firebase",
            password: strapi.service("admin::auth").hashPassword(googleId), // Using Google ID as password base
            confirmed: true,
            blocked: false,
            googleId,
            role: 1, // Make sure this matches your authenticated role ID
          },
        });
      }

      // Generate Strapi JWT token
      const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
        id: user.id,
      });

      // Return user info and token
      return {
        jwt,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          provider: user.provider,
          confirmed: user.confirmed,
          blocked: user.blocked,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          documentId: user.documentId,
          publishedAt: user.publishedAt,
        },
      };
    } catch (error) {
      console.error("Authentication error:", error);

      // Handle specific Firebase Auth errors
      if (error.code === "auth/id-token-expired") {
        return ctx.badRequest("Token has expired. Please sign in again.");
      }
      if (error.code === "auth/id-token-revoked") {
        return ctx.badRequest("Token has been revoked. Please sign in again.");
      }
      if (error.code === "auth/invalid-id-token") {
        return ctx.badRequest("Invalid token. Please sign in again.");
      }

      return ctx.throw(500, `Authentication failed: ${error.message}`);
    }
  },
};
