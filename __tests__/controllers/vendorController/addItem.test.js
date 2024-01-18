// const app = require('../../../index');
// const {addItem} = require('../../../controllers/vendorController');
// const mongoose = require('mongoose');
// require("dotenv").config();
// const request = require('supertest');

// beforeEach(async () => {
//   await mongoose.connect(process.env.CONNECTION_STRING);
// });

// afterEach(async () => {
//   await mongoose.connection.close();
// });

// describe('POST /api/v1/vendor/menuitems', ()=>{
//   it('Add an item to the menu', async()=>{
//     const res = await request(app)
//     .post('/api/v1/vendor/menuitems')
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTdkYTk5ZGZiOWYyM2Q3ZTE5YjI1YiJ9.TKFTXTvxD2aE4b0L3yo5JbPLAK788RUEg51OOX7mLN4')
//     .send({
//       "name": "Chesse Pizza",
//        "is_veg": true,
//        "image_url": "https://i.ibb.co/NjmfCct/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
//        "price": 99,
//        "description": "A delicious cheese pizza with all cheese burst crust.",
//        "quantity": 10,
//        "rating": 4.8,
//        "number_of_ratings": 50,
//        "tags": ["Pizza", "Cheese"],
//        "category": "Pizza",
//        "is_available": true,
//        "nutritional_values": "Calories: 500, Protein: 25g, Fat: 20g",
//        "is_healthy": false,
//        "on_offer": true,
//        "offer_price": 99
//    })
//    .expect(401)
//   } )
// })