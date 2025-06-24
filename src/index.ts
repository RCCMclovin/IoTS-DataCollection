import express from 'express';
import dotenv from 'dotenv';
import validateEnv from './utils/validateEnv';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { InputType } from './types/input';
import { appendFile, writeFile } from 'fs';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 4444;
const OUTFILE = (process.env.OUT_PATH || "/home/code") + "/out.csv"

app.use(express.text());

app.post("/", (req: Request, res: Response) => {
    if (!req.body) {
        res.status(StatusCodes.BAD_REQUEST).send("Body is empty");
        return;
    }
    try {
        const inputs: InputType[] = req.body.split(";");
        inputs.forEach((reading: InputType) => {
            if (reading.length > 0) {
                appendFile(OUTFILE, reading + "\n", (err) => {
                    if (err) {
                        console.log("Error while writing file");
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
                    }
                    else {
                        res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
                    }
                });
            }
        })

    }
    catch (err) {
        res.status(StatusCodes.BAD_REQUEST).send("Input out of format");
    }
});

app.delete("/", (req: Request, res: Response) => {
    writeFile(OUTFILE, "Temperature, TDS, PH\n", (err) => {
        if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error writing file");
        else res.status(StatusCodes.ACCEPTED).send(ReasonPhrases.ACCEPTED);
    });
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile(OUTFILE, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error occurred while sending the file.');
        }
      });
})

app.listen(PORT, () => {
    console.log(`Express app iniciado na porta ${PORT}.`);
  });