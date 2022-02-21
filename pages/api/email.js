import { getEmails, getEmail, addEmail } from "../../utils/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      if (req.body._id === undefined) {
        let emails = await getEmails();
        res.status(200).json({ ...emails });
      } else {
        let email = await getEmail(req.body._id);
        res.status(200).json({ ...email });
      }
      break;
    }
    case "POST": {
      let result = addEmail(req.body);
      
      res.status(200).json({ result: "ok", id: result });

      break;
    }
    default: {
      res.status(405).send();
    }
  }
}
