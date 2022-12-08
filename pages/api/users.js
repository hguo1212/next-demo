import { flow, prop } from 'lodash/fp';
import main from "../../database/connection";
import kitten from "../../database/schema";

export default function get_Users(req, res) {
  main().catch(error => console.error(error))
  const {method} = req;
  console.log('method',method);
  switch (method) {
    case 'GET': 
    kitten.find({}).then((docs)=>{
      res.status(200).json(docs)
    });
    break;
    case 'POST':
        console.log('req',req)
        const name = prop('body.inputVal')(req)
        const create = new kitten({name});
        create.save().then(()=> {
          res.status(200).json(create)
        })
    case 'DELETE':
      const id = prop('query.id')(req);
      kitten.deleteOne({_id: id}).then((xx)=> {
        console.log('xx',xx)
      })
    break;
    default: 
    res.setHeader('Allow', ['GET','POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
  
}