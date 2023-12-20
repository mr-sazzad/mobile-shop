import { RequestHandler } from "express";
import { mobileService } from "./mobile.service";

export const addMobile: RequestHandler = async (req, res, next) => {
  try {
    const mobileData = req.body;
    const result = await mobileService.addMobile(mobileData);

    res.status(201).json({
      status: 201,
      message: "Mobile added successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllRecentMobiles: RequestHandler = async (req, res, next) => {
  try {
    const result = await mobileService.getAllRecentMobiles();

    res.status(200).json({
      status: 200,
      message: "Recent Mobiles returned successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllMobiles: RequestHandler = async (req, res, next) => {
  try {
    const result = await mobileService.getAllMobiles();

    res.status(200).json({
      status: 200,
      message: "Mobiles returned successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateMobile: RequestHandler = async (req, res, next) => {
  try {
    const mobileId = req.params.id;
    const mobileData = req.body;
    const result = await mobileService.updateMobile(mobileId, mobileData);

    res.status(200).json({
      status: 200,
      message: "Mobile updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteMobile: RequestHandler = async (req, res, next) => {
  try {
    const mobileId = req.params.id;
    const result = await mobileService.deleteMobile(mobileId);

    res.status(200).json({
      status: 200,
      message: "Mobile deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
