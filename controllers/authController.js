const jwt = require("jsonwebtoken");
const axios = require("axios");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");
const { promisify } = require("util");
const {
  GET_ME,
  GET_TOKEN,
} = require("../SPOTIFY_ENDPOINTS");

const JWT_SECRET = process.env.JWT_SECRET;
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
)}`;

// this function will return you jwt token
const signToken = (userId) => jwt.sign({ userId }, JWT_SECRET);

exports.login = catchAsync(async (req, res, next) => {
  try {
    const { state, code } = req.body;

    const data = new URLSearchParams();
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI);

    axios
      .post(GET_TOKEN, data, {
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        // Handle the response data
        const { access_token, token_type, expires_in, refresh_token, scope } =
          response.data;
        req.access_token = access_token;
        req.token_type = token_type;
        req.expires_in = expires_in;
        req.refresh_token = refresh_token;
        req.scope = scope;
        next();
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
        return res.status(400).json({
          status: 400,
          message: "Failed to Authenticate.",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to Authenticate.",
    });
  }
});

exports.fetchUser = catchAsync(async (req, res, next) => {
  try {
    const { access_token, token_type, expires_in, refresh_token, scope } = req;

    // Get User Data from Spotify

    axios
      .get(GET_ME, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(async (response) => {
        const {
          country,
          display_name,
          email,
          explicit_content,
          external_urls,
          followers,
          href,
          id,
          images,
          product,
          type,
          uri,
        } = response.data;

        // Check if this user exists in our collection
        const existing_user = await User.findOne({ spotify_id: id });
        if (existing_user) {
          // update user
          const updated_user = await User.findOneAndUpdate(
            { spotify_id: id },
            {
              country,
              display_name,
              email,
              explicit_content,
              external_urls,
              followers,
              href,
              spotify_id: id,
              images,
              product,
              type,
              uri,
              access_token,
              token_type,
              expires_in,
              refresh_token,
              scope,
            },
            { new: true, validateModifiedOnly: true }
          ).select(
            "-access_token -token_type -expires_in -refresh_token -scope"
          );

          // sign token
          const token = signToken(updated_user._id);

          return res.status(200).json({
            status: 200,
            message: "Authenticated Successfully!",
            data: {
              user: updated_user,
              token,
            },
          });
        } else {
          // => Create New User & Issue a JWT Token

          const new_user = await User.create({
            country,
            display_name,
            email,
            explicit_content,
            external_urls,
            followers,
            href,
            spotify_id: id,
            images,
            product,
            type,
            uri,
            access_token,
            token_type,
            expires_in,
            refresh_token,
            scope,
          });

          const selected_fields = await User.findById(new_user._id).select(
            "-access_token -token_type -expires_in -refresh_token -scope"
          );

          // sign token

          const token = signToken(new_user._id);

          return res.status(200).json({
            status: 200,
            message: "Authenticated Successfully!",
            data: {
              user: selected_fields,
              token,
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(400).json({
          status: 400,
          message: "Failed to Fetch User.",
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: "Failed to Fetch User.",
    });
  }
});

exports.gaurd = catchAsync(async (req, res, next) => {
  try {
    // 1) Getting token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in! Please log in to get access.",
      });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token does no longer exist.",
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: 401,
      message: "Unauthorised",
    });
  }
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { id } = req;

  // get current user

  const this_user = await User.findById(id);

  // Check if access_token is valid or not

  const { access_token, refresh_token } = this_user;

  axios
    .get(GET_ME, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => {
      // TODO : Set id and access_token on req => Forward Request to next middleware
      req.id = id;
      req.access_token = access_token;
      console.log(access_token);
      next();
    })
    .catch((error) => {
      console.log(error.response.data.error);
      // check if statusCode is 401
      if (error.response.data.error.status === 401) {
        // use refresh_token to get new token

        const data = new URLSearchParams();
        data.append("grant_type", "refresh_token");
        data.append("refresh_token", refresh_token);

        axios
          .post(GET_TOKEN, data, {
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then(async (response) => {
            const { access_token, token_type, expires_in, scope } =
              response.data;
            // TODO : Update User Record => Set id and access_token on req => Forward Request to next middleware
            await User.findByIdAndUpdate(id, {
              access_token,
              token_type,
              expires_in,
              scope,
            });
            req.id = id;
            req.access_token = access_token;
            alert(access_token);
            next();
          })
          .catch((error) => {
            console.error("Error refreshing access token:", error);
            return res
              .status(500)
              .json({ error: "Failed to refresh access token" });
          });
      }
    });
});

