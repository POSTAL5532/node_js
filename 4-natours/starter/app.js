import express from "express";
import fs from "fs";
import path from 'path';
import {fileURLToPath} from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const simpleToursDBFilePath = `${__dirname}/dev-data/data/tours-simple.json`;
const apiPath = "/api/v1";

const generatePath = (path) => {
    return `${apiPath}${path}`
}

const app = express();
const tours = JSON.parse(fs.readFileSync(simpleToursDBFilePath, "utf-8"));

app.use(express.json());

const getAllTours = (req, resp) => {
    return resp.status(200).json({
        status: "success",
        results: tours.length,
        data: {tours}
    });
}

const getTour = (req, resp) => {
    const id = req.params.id * 1;
    const tour = tours.find(t => t.id === id);

    if (!tour) {
        return resp.status(404).json({
            status: "fail",
            message: `Tour with id: ${id} doesn't exist.`
        });
    }

    return resp.status(200).json({
        status: "success",
        data: {tour}
    });
}

const createTour = (req, resp) => {
    const newTourId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newTourId}, req.body);
    tours.push(newTour)

    return fs.writeFile(simpleToursDBFilePath, JSON.stringify(tours), () => {
        resp.status(201).json({status: "success", data: {newTour}});
    });
}

const updateTour = (req, resp) => {
    const id = req.params.id * 1;
    const tour = tours.find(t => t.id === id);

    if (!tour) {
        return resp.status(404).json({
            status: "fail",
            message: `Tour with id: ${id} doesn't exist.`
        });
    }

    return resp.status(200).json({
        status: "success",
        data: "UPDATED TOUR"
    });
}

const deleteTour = (req, resp) => {
    const id = req.params.id * 1;
    const tour = tours.find(t => t.id === id);

    if (!tour) {
        return resp.status(404).json({
            status: "fail",
            message: `Tour with id: ${id} doesn't exist.`
        });
    }

    return resp.status(200).json({
        status: "success"
    });
}

app.route(generatePath("/tours"))
    .get(getAllTours)
    .post(createTour);

app.route(generatePath("/tours/:id"))
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.listen(8000, () => {
    console.log("Application started on http://localhost:8000/");
});
