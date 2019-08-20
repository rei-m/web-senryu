// import * as functions from 'firebase-functions';
// import * as algoliasearch from 'algoliasearch';

// const ALGOLIA_ID = functions.config().algolia.app_id;
// const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// // const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

// const ALGOLIA_INDEX_NAME = 'dev_recipes';
// const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

// export const onRecipeCreated = functions.firestore
//   .document('recipes/{recipeId}')
//   .onCreate((snap, context) => {
//     const recipe = snap.data()!;

//     // Add an 'objectID' field which Algolia requires
//     recipe.objectID = context.params.recipeId;

//     // Write to the algolia index
//     const index = client.initIndex(ALGOLIA_INDEX_NAME);
//     return index.saveObject(recipe);
//   });
