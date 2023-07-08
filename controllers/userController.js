const { default: axios } = require("axios");
const { GET_USER_TOP_ITEMS } = require("../SPOTIFY_ENDPOINTS");
const catchAsync = require("../utils/catchAsync");

exports.getMe = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getTopItems = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { type, limit, offset, time_range } = req.params;

  axios
    .get(`${GET_USER_TOP_ITEMS}/${type}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        time_range,
        limit,
        offset,
      },
    })
    .then((response) => {
      // Handle the response data here
      return res.status(200).json({
        status: 200,
        data: response.data,
        message: `Top ${type} found successfully!`,
      });
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);
      return res.status(400).json(error.response.data.error);
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { user_id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.followPlaylist = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { playlist_id, public } = req.params;
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlist_id}/followers`,
      {
        public: Boolean(public),
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.unfollowPlaylist = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { playlist_id } = req.params;
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlist_id}/followers`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getFollowedArtists = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/following`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          type: "artist",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.follow = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { type, id } = req.params;
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/following?type=${type}&ids=${id}`,
      {
        ids: [id],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.unfollow = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { type, id } = req.params;
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/following?type=${type}&ids=${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        data: {
          ids: [id],
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.checkFollowingUserOrArtist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { type, id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/following/contains?type=${type}&ids=${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.checkUserFollowingPlaylist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id, user_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/followers/contains?ids=${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    console.log(error);
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});
