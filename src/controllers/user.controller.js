import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidEmail } from "../utils/validations/emailValidation.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res, next) => {
  /**
   * @step_1 Get user Details
   * @step_2 Fields Validation
   * @step_3 Check from DB if user already exists: Email or Username
   * @step_4 check for images, check for avatar
   * @step_5 Upload image to cloudinary
   * @step_6 Create user object and Create db entry
   * @step_7 If success Send created user's reponse excluding refresh token and password from field
   **/

  const { username, email, password, fullname } = req.body;

  if ([username, email, password, fullname]?.some((d) => d?.trim === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter valid email");
  }

  const userAlreadyExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userAlreadyExists) {
    throw new ApiError(409, "User Already Exists");
  }

  let avatarLocalPath = (avatarLocalPath = req?.files?.avatar?.[0]?.path);
  let coverImageLocalPath;

  if (
    req?.files &&
    Array?.isArray(req?.files?.avatar) &&
    req?.files?.avatar?.length
  ) {
    coverImageLocalPath = req?.files?.avatar?.[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar is required");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    avatar: avatar?.url,
    coverimage: coverImage?.url || "",
    username: username?.toLowerCase(),
  });

  // This syntax is to remove fieldsx`
  const createdUser = await User?.findById(user?.id)?.select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User Registered Successfully!", true)
    );
});

export { registerUser };
