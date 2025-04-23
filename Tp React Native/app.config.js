export default {
    expo: {
      // Vos autres configurations...
      extra: {
        // Cette ligne expose la variable EAS_BUILD_PLATFORM
        easBuildPlatform: process.env.EAS_BUILD_PLATFORM,
        
        // Ces lignes exposent vos variables Firebase pour les builds EAS
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
        firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
        firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID,
        firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      },
    },
  };