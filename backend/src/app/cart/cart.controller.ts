import { RequestHandler } from "express";
import { cartService } from "./car.service";

export const addToCart: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await cartService.addToCart(data);

    res.status(201).json({
      status: 201,
      message: "mobile add to cart successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await cartService.getAllFromCart(userId);

    res.status(200).json({
      status: 200,
      message: "all cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleFromCart: RequestHandler = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const result = await cartService.getSingleCart(cartId);

    res.status(200).json({
      status: 200,
      message: "single cart retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const data = req.body;

    const result = await cartService.updateSingleCart(cartId, data);

    res.status(200).json({
      status: 200,
      message: "single cart updated successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleCart: RequestHandler = async (req, res, next) => {
  try {
    const cartId = req.params.id;
    const result = await cartService.deleteSingleCart(cartId);

    res.status(200).json({
      status: 200,
      message: "single cart deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const removeAllFromCart: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const result = await cartService.removeAllFromCart(userId);

    res.status(200).json({
      status: 200,
      message: "all cart deleted successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
