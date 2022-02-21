import { addEmail, getEmail, getEmails } from "../../utils/db";

/*
 * Handler for endpoint /api/email to
 * return and set emails from the mongodb
 * database
 * @param req HTTP request
 * @param res HTTP response
 * */
export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      if (typeof req.body._id === "undefined") {
        const emails = await getEmails();
        res.status(200).json({ ...emails });
      } else {
        const email = await getEmail(req.body._id);
        res.status(200).json({ ...email });
      }
      break;
    }
    case "POST": {
      const result = addEmail(req.body);

      res.status(200).json({ result: "ok", id: result });

      break;
    }
    default: {
      res.status(405).send();
    }
  }
}
