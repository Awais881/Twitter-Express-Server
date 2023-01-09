import express from 'express';
import { userModel, tweetModel } from './../dbRepo/models.mjs'
import mongoose from 'mongoose';
const router = express.Router()


router.post("/api/v1/tweet", (req, res) => {

    const body = req.body;
    // validation
    if ( 
        !body.text
       
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
  
  
  
    
  
    tweetModel.create({
        text: body.text,
        owner: new mongoose.Types.ObjectId(body.token._id)
       
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);
  
                res.send({
                    message: "Tweet Post successfully"
                });
            } else {
                res.status(500).send({
                    message: "failed to Post Tweet"
                })
            }
        })
  })
  
router.get("/api/v1/tweetFeed", (req, res) =>{

    tweetModel.find(
        { isDeleted: false },
        {},
        {
            sort: { "_id": -1 },
            limit: 100,
            skip: 0
        }
        , (err, data) => {
            if (!err) {
                res.send({
                    message: "got all tweets successfully",
                    data: data
                })
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        });
})

router.get("/api/v1/tweets", (req, res) => {

    const userId = new mongoose.Types.ObjectId(req.body.token._id);

   tweetModel.find( 

        { owner: userId, isDeleted: false },
        {},
        {
            sort: { "_id": -1 },
            limit: 100,
            skip: 0,
            populate:
            {
                path: "owner",
                select: 'firstName lastName email'
            }
        },

        (err, data) => {

        if (!err) {
          res.send({
            message: "Got all Tweets successfully",
            data: data,
          
          });
        } else  {
            
          res.status(500).send({
            message: "Get tweets  error",
           
          });  
         
        }
  
      });

      });
  
router.delete('/api/v1/tweet/:id', (req, res) => {
      const id = req.params.id;
      const body = req.body;
  
      tweetModel.deleteOne({ _id: id,  owner: new mongoose.Types.ObjectId(body.token._id) },
        
        
        (err, deletedData) => {
          console.log("deleted: ", deletedData);
          if (!err) {
  
              if (deletedData.deletedCount !== 0) {
                  res.send({
                      message: "tweet has been deleted successfully",
                  })
              } else {
                  res.status(404);
                  res.send({
                      message: "No tweet found with this id: " + id,
                  })
              }
  
  
          } else {
              res.status(500).send({
                  message: "delete error"
              })
          }
      });
  })
  
router.put('/api/v1/tweet/:id', async (req, res) => {
  
      const body = req.body;
      const id = req.params.id;
  
      if (
          !body.text 
         
      ) {
          res.status(400).send(` required parameter missing. example request body:
          {
            "text": "value",
             
          }`)
          return;
      }
  
      try {
          let data = await tweetModel.findOneAndUpdate(
            {
                _id: id,
                owner: new mongoose.Types.ObjectId(body.token._id)
            },
            {
                text: body.text,
            },
            
              { new: true }
          ).exec();
  
          console.log('updated: ', data);
  
          res.send({
              message: "tweet modified successfully",
              data: data
          });
  
      } catch (error) {
          res.status(500).send({
              message: "update error"
          })
          console.log(error)
      }
  })
  
 router.get('/tweet/:id', (req, res) => {

    const id = req.params.id;

    tweetModel.findOne({ _id: id }, (err, data) => {
        if (!err) {
            if (data) {
                res.send({
                    message: `get tweet by id: ${data._id} success`,
                    data: data
                });
            } else {
                res.status(404).send({
                    message: "tweet not found",
                })
            }
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})





export default router